import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/admin/users/[id]/activate - Activar cuenta
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
            select: { role: true }
        });

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        // Activar usuario
        const activatedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                emailVerified: new Date(),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
            }
        });

        // TODO: Enviar email de bienvenida/reactivación
        // TODO: Crear audit log

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
