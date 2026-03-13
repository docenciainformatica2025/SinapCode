import { prisma } from "@/lib/prisma";
import { logUserChange } from "@/lib/audit-logger";
import { UserRole } from "@/domain/types/user";

export class UserAdminService {
    /**
     * Actualiza un usuario con validaciones de negocio y auditoría
     */
    static async updateUser(params: {
        adminId: string;
        adminRole: string;
        targetUserId: string;
        data: {
            name?: string;
            email?: string;
            role?: string;
        }
    }) {
        const { adminId, adminRole, targetUserId, data } = params;
        const { name, email, role } = data;

        // 1. Obtener usuario objetivo
        const existingUser = await prisma.user.findUnique({
            where: { id: targetUserId },
            select: { id: true, name: true, email: true, role: true, deletedAt: true }
        });

        if (!existingUser) throw new Error('NOT_FOUND');
        if (existingUser.deletedAt) throw new Error('CANNOT_EDIT_DELETED');

        // 2. Validaciones de Negocio y Seguridad
        if (role && role !== existingUser.role) {
            const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT', 'TEACHER', 'STUDENT', 'USER', 'COMPANY'];
            if (!validRoles.includes(role)) throw new Error('INVALID_ROLE');

            if (role === 'SUPER_ADMIN' && adminRole !== 'SUPER_ADMIN') throw new Error('UNAUTHORIZED_ROLE_ASSIGNMENT');
            if (existingUser.role === 'SUPER_ADMIN' && adminRole !== 'SUPER_ADMIN') throw new Error('UNAUTHORIZED_SUPERADMIN_EDIT');
        }

        // 3. Verificar Email único
        if (email && email !== existingUser.email) {
            const emailInUse = await prisma.user.findFirst({
                where: { email: email.trim().toLowerCase(), id: { not: targetUserId } }
            });
            if (emailInUse) throw new Error('EMAIL_IN_USE');
        }

        // 4. Ejecutar actualización
        const updatedUser = await prisma.user.update({
            where: { id: targetUserId },
            data: {
                ...(name && { name: name.trim() }),
                ...(email && { email: email.trim().toLowerCase() }),
                ...(role && { role: role as any }),
                updatedAt: new Date(),
            }
        });

        // 5. Auditar
        const changes: any = {};
        if (name && name !== existingUser.name) changes.name = { from: existingUser.name, to: name };
        if (email && email !== existingUser.email) changes.email = { from: existingUser.email, to: email };
        if (role && role !== existingUser.role) changes.role = { from: existingUser.role, to: role };

        if (Object.keys(changes).length > 0) {
            await logUserChange({
                adminId,
                targetUserId,
                action: 'update',
                changes
            });
        }

        return updatedUser;
    }

    /**
     * Ejecuta un soft-delete legislativo
     */
    static async softDeleteUser(params: {
        adminId: string;
        targetUserId: string;
        reason: string;
        reasonDetails?: string;
    }) {
        const { adminId, targetUserId, reason, reasonDetails } = params;

        if (adminId === targetUserId) throw new Error('CANNOT_SELF_DELETE');

        const userToDelete = await prisma.user.findUnique({
            where: { id: targetUserId },
            select: { id: true, role: true, email: true, name: true }
        });

        if (!userToDelete) throw new Error('NOT_FOUND');
        if (userToDelete.role === 'SUPER_ADMIN') throw new Error('CANNOT_DELETE_SUPERADMIN');

        const deletedUser = await prisma.user.update({
            where: { id: targetUserId },
            data: {
                deletedAt: new Date(),
                deletedBy: adminId,
                deletionReason: reasonDetails || reason,
                emailVerified: null,
            }
        });

        await prisma.session.deleteMany({ where: { userId: targetUserId } });

        await logUserChange({
            adminId,
            targetUserId,
            action: 'delete',
            reason: reasonDetails || reason
        });

        return { success: true };
    }
}
