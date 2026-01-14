import { prisma } from './prisma';
import { EventCategory } from '@prisma/client';

interface AuditLogParams {
    userId?: string;
    eventType: string;
    eventCategory: EventCategory;
    eventData: any;
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
}

/**
 * Crea un registro de auditoría en la base de datos
 * Cumplimiento: GDPR Art. 30, Ley 1581 Art. 17 (Colombia)
 */
export async function createAuditLog({
    userId,
    eventType,
    eventCategory,
    eventData,
    ipAddress,
    userAgent,
    sessionId,
}: AuditLogParams): Promise<void> {
    try {
        await prisma.auditLog.create({
            data: {
                userId,
                eventType,
                eventCategory,
                eventData,
                ipAddress,
                userAgent,
                sessionId,
                createdAt: new Date(),
            },
        });
    } catch (error) {
        console.error('❌ Error creating audit log:', error);
        // No lanzar error - los audit logs no deben bloquear operaciones
    }
}

/**
 * Crea un audit log para cambios en usuarios
 */
export async function logUserChange({
    adminId,
    targetUserId,
    action,
    changes,
    reason,
    ipAddress,
    userAgent,
}: {
    adminId: string;
    targetUserId: string;
    action: 'update' | 'delete' | 'suspend' | 'activate';
    changes?: any;
    reason?: string;
    ipAddress?: string;
    userAgent?: string;
}): Promise<void> {
    await createAuditLog({
        userId: adminId,
        eventType: `user.${action}`,
        eventCategory: 'DATA',
        eventData: {
            targetUserId,
            changes,
            reason,
            timestamp: new Date().toISOString(),
        },
        ipAddress,
        userAgent,
    });
}
