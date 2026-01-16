import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import rateLimit from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // 🛡️ Rate Limit: 20 requests per minute per IP
        // Getting IP in Next.js App Router (edge/node) can be tricky, fallback to 'CHECK' if undefined
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        await limiter.check(NextResponse, 20, ip);

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || 'all';

        const skip = (page - 1) * limit;

        const where = {
            AND: [
                status !== 'all' ? { status: { equals: status, mode: 'insensitive' } } : {},
                search ? {
                    OR: [
                        { description: { contains: search, mode: 'insensitive' } },
                        { providerTxId: { contains: search, mode: 'insensitive' } },
                        { user: { email: { contains: search, mode: 'insensitive' } } },
                        { user: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ]
        };

        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                where,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.transaction.count({ where })
        ]);

        return NextResponse.json({
            transactions,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page
            }
        });

    } catch (error) {
        console.error('[TRANSACTIONS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
