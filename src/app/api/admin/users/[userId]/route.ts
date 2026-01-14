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
    { params }: { params: { userId: string } }
) {
    try {
        // 1. Validar parámetros de ruta
        if (!params.userId) {
            return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
        }

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        // 2. Verificar permisos de Administración
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true, id: true }
        });

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        // 3. Leer y Validar Body
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
        }

        const { name, email, role } = body;

        // 4. Validar Rol explícitamente (Enum safety)
        const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT', 'TEACHER', 'STUDENT', 'USER', 'COMPANY'];
        if (role && !validRoles.includes(role)) {
            return NextResponse.json({ error: `Rol inválido: ${role}` }, { status: 400 });
        }

        // 5. Obtener usuario objetivo
        const existingUser = await prisma.user.findUnique({
            where: { id: params.userId },
            select: { name: true, email: true, role: true, deletedAt: true }
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        if (existingUser.deletedAt) {
            return NextResponse.json({ error: 'No se puede editar un usuario eliminado' }, { status: 400 });
        }

        // 6. Validaciones de negocio
        if (name && name.trim().length < 2) {
            return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres' }, { status: 400 });
        }

        if (email && !email.includes('@')) {
            return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
        }

        // 7. Reglas de cambio de Rol
        if (role && role !== existingUser.role) {
            if (role === 'SUPER_ADMIN' && currentUser.role !== 'SUPER_ADMIN') {
                return NextResponse.json({ error: 'Solo un Super Administrador puede asignar ese rol' }, { status: 403 });
            }
            if (existingUser.role === 'SUPER_ADMIN' && currentUser.role !== 'SUPER_ADMIN') {
                return NextResponse.json({ error: 'No puedes cambiar el rol de un Super Administrador' }, { status: 403 });
            }
        }

        // 8. Verificar Email único
        if (email && email !== existingUser.email) {
            const emailInUse = await prisma.user.findFirst({
                where: {
                    email: email.trim().toLowerCase(),
                    id: { not: params.userId }
                }
            });

            if (emailInUse) {
                return NextResponse.json({ error: 'El email ya está en uso' }, { status: 400 });
            }
        }

        // 9. Actualizar Usuario (Core Operation)
        const updatedUser = await prisma.user.update({
            where: { id: params.userId },
            data: {
                ...(name && { name: name.trim() }),
                ...(email && { email: email.trim().toLowerCase() }),
                ...(role && { role }), // Prisma validará el enum aquí, pero ya lo pre-validamos
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

        // 10. Audit Log (No bloqueante)
        try {
            const changes: any = {};
            if (name && name !== existingUser.name) changes.name = { from: existingUser.name, to: name };
            if (email && email !== existingUser.email) changes.email = { from: existingUser.email, to: email };
            if (role && role !== existingUser.role) changes.role = { from: existingUser.role, to: role };

            if (Object.keys(changes).length > 0) {
                await prisma.auditLog.create({
                    data: {
                        userId: currentUser.id,
                        eventType: 'user.update',
                        eventCategory: 'DATA',
                        eventData: {
                            targetUserId: params.userId,
                            changes,
                        },
                        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
                        userAgent: request.headers.get('user-agent') || undefined,
                    }
                });
            }
        } catch (logError) {
            console.error('Audit Log failed but user updated:', logError);
            // No retornamos error, la acción principal tuvo éxito
        }

        return NextResponse.json({
            success: true,
            user: updatedUser
        }, {
            headers: { 'X-Debug-Admin-Put': 'true' }
        });

    } catch (error: any) {
        console.error('CRITICAL Error updating user:', error);

        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'El email ya está en uso' }, { status: 400 });
        }

        // DEBUG MODE: FORCE RETURN ERROR DETAILS
        return NextResponse.json({
            error: 'Error interno del servidor al actualizar usuario',
            debug_message: error.message,
            debug_code: error.code,
            debug_stack: error.stack
        }, {
            status: 500,
            headers: { 'X-Debug-Admin-Put': 'true' }
        });
    }
}

// DELETE - Eliminar usuario (soft delete con cumplimiento legal)
export async function DELETE(
    request: Request,
    { params }: { params: { userId: string } }
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
        if (currentUser.id === params.userId) {
            return NextResponse.json({ error: 'No puedes eliminarte a ti mismo' }, { status: 400 });
        }

        // Obtener datos del usuario a eliminar
        const userToDelete = await prisma.user.findUnique({
            where: { id: params.userId },
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
            where: { id: params.userId },
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
            where: { userId: params.userId }
        });

        // Crear audit log
        await prisma.auditLog.create({
            data: {
                userId: currentUser.id,
                eventType: 'user.delete',
                eventCategory: 'DATA',
                eventData: {
                    targetUserId: params.userId,
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
