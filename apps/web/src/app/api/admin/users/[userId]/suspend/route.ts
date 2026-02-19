import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

// POST /api/admin/users/[id]/suspend - Suspender cuenta (con cumplimiento legal)
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

        // No permitir auto-suspensión
        if (currentUser.id === params.id) {
            return NextResponse.json({ error: 'No puedes suspenderte a ti mismo' }, { status: 400 });
        }

        // Obtener datos del usuario a suspender
        const userToSuspend = await prisma.user.findUnique({
            where: { id: params.id },
            select: { role: true, name: true, email: true, deletedAt: true }
        });

        if (!userToSuspend) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // No permitir suspender usuarios eliminados
        if (userToSuspend.deletedAt) {
            return NextResponse.json({ error: 'No se puede suspender un usuario eliminado' }, { status: 400 });
        }

        // No permitir suspender SUPER_ADMIN
        if (userToSuspend.role === 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'No se puede suspender un Super Administrador' }, { status: 403 });
        }

        // Obtener razón de suspensión del body
        const body = await request.json();
        const { reason, reasonDetails } = body;

        if (!reason) {
            return NextResponse.json({ error: 'La razón de suspensión es obligatoria' }, { status: 400 });
        }

        // Suspender usuario
        const suspendedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                suspendedAt: new Date(),
                suspendedBy: currentUser.id,
                suspensionReason: reasonDetails || reason,
                emailVerified: null, // Invalidar para prevenir login
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
            }
        });

        // Cerrar todas las sesiones activas
        const closedSessions = await prisma.session.deleteMany({
            where: { userId: params.id }
        });

        // Crear audit log
        await prisma.auditLog.create({
            data: {
                userId: currentUser.id,
                eventType: 'user.suspend',
                eventCategory: 'SECURITY',
                eventData: {
                    targetUserId: params.id,
                    targetUserEmail: userToSuspend.email,
                    targetUserName: userToSuspend.name,
                    reason,
                    reasonDetails,
                    suspendedAt: new Date().toISOString(),
                    closedSessions: closedSessions.count,
                },
                ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
                userAgent: request.headers.get('user-agent') || undefined,
            }
        });

        // TODO: Enviar email de notificación legal al usuario

        return NextResponse.json({
            success: true,
            message: 'Usuario suspendido exitosamente',
            user: suspendedUser,
            closedSessions: closedSessions.count,
        });

    } catch (error: any) {
        console.error('Error al suspender al usuario:', error);
        return NextResponse.json({ error: 'Error al suspender usuario' }, { status: 500 });
    }
}
