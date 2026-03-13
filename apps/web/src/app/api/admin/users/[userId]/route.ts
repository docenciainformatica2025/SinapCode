import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { UserAdminService } from "@/services/admin/user-admin-service";
import { prisma } from "@/lib/prisma";

async function getAdminSession() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true }
    });

    if (!user || !['SUPER_ADMIN', 'ADMIN'].includes(user.role)) return null;
    return user;
}

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const admin = await getAdminSession();
        if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

        const user = await prisma.user.findUnique({
            where: { id: params.userId },
            select: { id: true, name: true, email: true, role: true, emailVerified: true, image: true, createdAt: true, updatedAt: true }
        });

        if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const admin = await getAdminSession();
        if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

        const body = await request.json();
        const updatedUser = await UserAdminService.updateUser({
            adminId: admin.id,
            adminRole: admin.role,
            targetUserId: params.userId,
            data: body
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error: any) {
        const status = error.message === 'NOT_FOUND' ? 404 : 400;
        return NextResponse.json({ error: error.message }, { status });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const admin = await getAdminSession();
        if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

        const { reason, reasonDetails } = await request.json();
        await UserAdminService.softDeleteUser({
            adminId: admin.id,
            targetUserId: params.userId,
            reason,
            reasonDetails
        });

        return NextResponse.json({ success: true, message: 'Usuario eliminado (soft-delete)' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
