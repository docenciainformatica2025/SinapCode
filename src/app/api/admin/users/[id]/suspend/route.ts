import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/admin/users/[id]/suspend - Suspender cuenta
export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession();

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

        // Suspender usuario (invalidar email verification)
        const suspendedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                emailVerified: null,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
            }
        });

        // TODO: Cerrar todas las sesiones activas
        // TODO: Enviar email de notificación
        // TODO: Crear audit log

        return NextResponse.json({
            success: true,
            message: 'Usuario suspendido exitosamente',
            user: suspendedUser
        });

    } catch (error: any) {
        console.error('Error suspending user:', error);
        return NextResponse.json({ error: 'Error al suspender usuario' }, { status: 500 });
    }
}
