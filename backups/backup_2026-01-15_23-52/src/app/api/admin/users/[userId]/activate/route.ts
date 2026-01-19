import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

// POST /api/admin/users/[id]/activate - Activar cuenta
export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        // Verificar permisos
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true, id: true }
        });

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        // Verificar que el usuario existe y no está eliminado
        const userToActivate = await prisma.user.findUnique({
            where: { id: params.id },
            select: { deletedAt: true, name: true, email: true }
        });

        if (!userToActivate) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        if (userToActivate.deletedAt) {
            return NextResponse.json({ error: 'No se puede activar un usuario eliminado' }, { status: 400 });
        }

        // Activar usuario y limpiar campos de suspensión
        const activatedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                emailVerified: new Date(),
                suspendedAt: null,
                suspendedBy: null,
                suspensionReason: null,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
            }
        });

        // Crear audit log
        await prisma.auditLog.create({
            data: {
                userId: currentUser.id,
                eventType: 'user.activate',
                eventCategory: 'SECURITY',
                eventData: {
                    targetUserId: params.id,
                    targetUserEmail: userToActivate.email,
                    targetUserName: userToActivate.name,
                    activatedAt: new Date().toISOString(),
                },
                ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
                userAgent: request.headers.get('user-agent') || undefined,
            }
        });

        // TODO: Enviar email de reactivación/bienvenida

        return NextResponse.json({
            success: true,
            message: 'Usuario activado exitosamente',
            user: activatedUser
        });

    } catch (error: any) {
        console.error('Error activating user:', error);
        return NextResponse.json({ error: 'Error al activar usuario' }, { status: 500 });
    }
}
