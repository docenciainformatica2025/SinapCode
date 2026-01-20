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

export async function PUT(
    request: Request,
    { params }: { params: { bannerId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, imageUrl, linkUrl, position, isActive, startDate, endDate, order } = body;

        const updatedBanner = await prisma.cmsBanner.update({
            where: { id: params.bannerId },
            data: {
                title,
                description,
                imageUrl,
                linkUrl,
                position,
                isActive,
                startDate,
                endDate,
                order
            }
        });

        return NextResponse.json(updatedBanner);
    } catch (error) {
        console.error('Update Banner Error:', error);
        return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { bannerId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await prisma.cmsBanner.delete({
            where: { id: params.bannerId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Banner Error:', error);
        return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
    }
}
