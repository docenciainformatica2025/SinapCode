import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: (session.user as any).id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 20
        });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error('[NOTIFICATIONS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        if (id) {
            // Mark single as read
            await prisma.notification.update({
                where: {
                    id: id,
                    userId: (session.user as any).id // Security check
                },
                data: {
                    isRead: true,
                    readAt: new Date()
                }
            });
        } else {
            // Mark all as read
            await prisma.notification.updateMany({
                where: {
                    userId: (session.user as any).id,
                    isRead: false
                },
                data: {
                    isRead: true,
                    readAt: new Date()
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[NOTIFICATIONS_PUT]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!session || !id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await prisma.notification.delete({
            where: {
                id: id,
                userId: (session.user as any).id
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[NOTIFICATIONS_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
