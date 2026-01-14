import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

// GET - Obtener detalles completos de un usuario
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        // Verificar permisos de admin
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true }
        });

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'];
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        // Obtener usuario
        const user = await prisma.user.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                image: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json(user);

    } catch (error: any) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 });
    }
}

// PUT - Actualizar usuario
export async function PUT(
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

        const body = await request.json();
        const { name, email, role } = body;

        // Validaciones
        if (name && name.trim().length < 2) {
            return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres' }, { status: 400 });
        }

        if (email && !email.includes('@')) {
            return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
        }

        // Actualizar usuario
        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                ...(name && { name: name.trim() }),
                ...(email && { email: email.trim().toLowerCase() }),
                ...(role && { role }),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                updatedAt: true,
            }
        });

        // TODO: Crear audit log
        // await createAuditLog({
        //     userId: currentUser.id,
        //     action: 'user.update',
        //     targetId: params.id,
        //     changes: body
        // });

        return NextResponse.json({
            success: true,
            user: updatedUser
        });

    } catch (error: any) {
        console.error('Error updating user:', error);

        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'El email ya está en uso' }, { status: 400 });
        }

        return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
    }
}

// DELETE - Eliminar usuario (soft delete)
export async function DELETE(
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

        // No permitir auto-eliminación
        if (currentUser.id === params.id) {
            return NextResponse.json({ error: 'No puedes eliminarte a ti mismo' }, { status: 400 });
        }

        // Soft delete - solo marcar como eliminado
        const deletedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                // TODO: Agregar campos deletedAt, deletedBy al schema
                // deletedAt: new Date(),
                // deletedBy: currentUser.id,
                emailVerified: null, // Invalidar email
                updatedAt: new Date(),
            }
        });

        // TODO: Enviar email de notificación al usuario
        // TODO: Crear audit log

        return NextResponse.json({
            success: true,
            message: 'Usuario eliminado exitosamente'
        });

    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
    }
}
