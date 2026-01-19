
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // Check Admin
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true }
        });

        if (!currentUser || !['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // DB Stats
        const userCount = await prisma.user.count();
        const flaggedUsers = await prisma.user.count({ where: { deletedAt: { not: null } } });

        // Connection Info (Masked)
        const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
        const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@'); // Hide password

        return NextResponse.json({
            status: 'online',
            environment: process.env.NODE_ENV,
            database: {
                url_masked: maskedUrl,
                total_users: userCount,
                soft_deleted_users: flaggedUsers,
            },
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true }
        });

        if (!currentUser || !['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { email } = body;

        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const targetUser = await prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                lastLoginAt: true
            }
        });

        return NextResponse.json({
            found: !!targetUser,
            user: targetUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
