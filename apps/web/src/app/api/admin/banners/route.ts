import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const isAuthorized = async (session: any) => {
    if (!session?.user?.email) return false;
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });
    return user && ['SUPER_ADMIN', 'ADMIN'].includes(user.role);
};

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const banners = await prisma.cmsBanner.findMany({
            orderBy: { order: 'asc' }
        });

        return NextResponse.json({ banners });
    } catch (error) {
        console.error('Error en la API de Banners:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, imageUrl, linkUrl, position, isActive } = body;

        const newBanner = await prisma.cmsBanner.create({
            data: {
                title,
                description,
                imageUrl,
                linkUrl,
                position: position || 'HOME_HERO',
                isActive: isActive ?? true
            }
        });

        return NextResponse.json(newBanner);
    } catch (error) {
        console.error('Error al crear Banner:', error);
        return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    // TODO: Implement DELETE logic extracting ID from URL
    // For now returning 501 Not Implemented to strictly follow REST
    return NextResponse.json({ message: 'Use dynamic route for delete' }, { status: 501 });
}
