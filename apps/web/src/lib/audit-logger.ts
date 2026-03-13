import { LoggingService } from '@/services/logging-service';
import { LogLevel } from '@/domain/logging/types';

interface AuditLogParams {
    userId?: string;
    eventType: string;
    eventCategory: 'LEGAL' | 'SECURITY' | 'DATA' | 'TRANSACTION';
    eventData: any;
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
}

/**
 * Crea un registro de auditoría en la base de datos
 * Cumplimiento: GDPR Art. 30 y estándares globales de privacidad de datos.
 */
export async function createAuditLog(params: AuditLogParams): Promise<void> {
    const { userId, eventType, eventCategory, eventData, ipAddress, userAgent, sessionId } = params;

    await LoggingService.saveToDatabase(
        'info',
        `AUDIT_LOG: ${eventType}`,
        {
            userId,
            action: eventType,
            event: eventType,
            eventCategory,
            ...eventData,
            ip: ipAddress,
            userAgent,
            sessionId
        }
    );
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
        },
        ipAddress,
        userAgent,
    });
}
