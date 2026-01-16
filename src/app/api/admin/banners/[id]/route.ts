
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        await limiter.check(NextResponse, 20, ip);

        const body = await req.json();
        const { id } = params;

        if (!body.title || !body.imageUrl) {
            return new NextResponse("Title and Image URL are required", { status: 400 });
        }

        const updateData: Prisma.BannerUpdateInput = {
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
            linkUrl: body.linkUrl,
            isActive: body.isActive,
            position: body.position,
            startDate: body.startDate ? new Date(body.startDate) : null,
            endDate: body.endDate ? new Date(body.endDate) : null,
            updatedAt: new Date(),
        };

        const banner = await (prisma as any).banner.update({
            where: { id },
            data: updateData
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: 'UPDATE_BANNER',
                details: `Banner updated: ${banner.title} (${banner.id})`,
                status: 'success',
                ipAddress: '127.0.0.1'
            }
        });

        return NextResponse.json(banner);
    } catch (error) {
        console.error('[BANNER_PUT]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { id } = params;

        const banner = await (prisma as any).banner.delete({
            where: { id }
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: 'DELETE_BANNER',
                details: `Banner deleted: ${banner.title} (${banner.id})`,
                status: 'warning',
                ipAddress: '127.0.0.1'
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[BANNER_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
