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

// PUT - Actualizar usuario (con validaciones mejoradas)
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

        // Obtener usuario actual para comparar cambios
        const existingUser = await prisma.user.findUnique({
            where: { id: params.id },
            select: { name: true, email: true, role: true, deletedAt: true }
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // No permitir editar usuarios eliminados
        if (existingUser.deletedAt) {
            return NextResponse.json({ error: 'No se puede editar un usuario eliminado' }, { status: 400 });
        }

        // Validaciones
        if (name && name.trim().length < 2) {
            return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres' }, { status: 400 });
        }

        if (email && !email.includes('@')) {
            return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
        }

        // Validar cambios de rol
        if (role && role !== existingUser.role) {
            // Solo SUPER_ADMIN puede asignar rol SUPER_ADMIN
            if (role === 'SUPER_ADMIN' && currentUser.role !== 'SUPER_ADMIN') {
                return NextResponse.json({ error: 'Solo un Super Administrador puede asignar ese rol' }, { status: 403 });
            }

            // No se puede cambiar el rol de un SUPER_ADMIN
            if (existingUser.role === 'SUPER_ADMIN' && currentUser.role !== 'SUPER_ADMIN') {
                return NextResponse.json({ error: 'No puedes cambiar el rol de un Super Administrador' }, { status: 403 });
            }
        }

        // Verificar que el email no esté en uso por otro usuario
        if (email && email !== existingUser.email) {
            const emailInUse = await prisma.user.findFirst({
                where: {
                    email: email.trim().toLowerCase(),
                    id: { not: params.id }
                }
            });

            if (emailInUse) {
                return NextResponse.json({ error: 'El email ya está en uso' }, { status: 400 });
            }
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

        // Crear audit log
        const changes: any = {};
        if (name && name !== existingUser.name) changes.name = { from: existingUser.name, to: name };
        if (email && email !== existingUser.email) changes.email = { from: existingUser.email, to: email };
        if (role && role !== existingUser.role) changes.role = { from: existingUser.role, to: role };

        await prisma.auditLog.create({
            data: {
                userId: currentUser.id,
                eventType: 'user.update',
                eventCategory: 'DATA',
                eventData: {
                    targetUserId: params.id,
                    changes,
                },
                ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
                userAgent: request.headers.get('user-agent') || undefined,
            }
        });

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

// DELETE - Eliminar usuario (soft delete con cumplimiento legal)
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

        // Obtener datos del usuario a eliminar
        const userToDelete = await prisma.user.findUnique({
            where: { id: params.id },
            select: { role: true, name: true, email: true }
        });

        if (!userToDelete) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // No permitir eliminar SUPER_ADMIN
        if (userToDelete.role === 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'No se puede eliminar un Super Administrador' }, { status: 403 });
        }

        // Obtener razón de eliminación del body
        const body = await request.json();
        const { reason, reasonDetails } = body;

        if (!reason) {
            return NextResponse.json({ error: 'La razón de eliminación es obligatoria' }, { status: 400 });
        }

        // Soft delete - marcar como eliminado
        const deletedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                deletedAt: new Date(),
                deletedBy: currentUser.id,
                deletionReason: reasonDetails || reason,
                emailVerified: null, // Invalidar email
                updatedAt: new Date(),
            }
        });

        // Cerrar todas las sesiones activas
        await prisma.session.deleteMany({
            where: { userId: params.id }
        });

        // Crear audit log
        await prisma.auditLog.create({
            data: {
                userId: currentUser.id,
                eventType: 'user.delete',
                eventCategory: 'DATA',
                eventData: {
                    targetUserId: params.id,
                    targetUserEmail: userToDelete.email,
                    targetUserName: userToDelete.name,
                    reason,
                    reasonDetails,
                    deletedAt: new Date().toISOString(),
                },
                ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
                userAgent: request.headers.get('user-agent') || undefined,
            }
        });

        // TODO: Enviar email de notificación al usuario
        // TODO: Programar purga automática después de 90 días

        return NextResponse.json({
            success: true,
            message: 'Usuario eliminado exitosamente (soft delete)',
            retentionPeriod: '90 días',
        });

    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
    }
}
