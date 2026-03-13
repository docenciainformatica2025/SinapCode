import { LogLevel, LogContext, EventCategory } from "@/domain/logging/types";

export class LoggingService {
    private isDevelopment = process.env.NODE_ENV === 'development';

    /**
     * Sanitiza datos sensibles antes de loguear
     */
    static sanitize(data: any): any {
        if (typeof data !== 'object' || data === null) return data;

        const sanitized = { ...data };
        const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'privateKey'];

        for (const key in sanitized) {
            if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof sanitized[key] === 'object') {
                sanitized[key] = this.sanitize(sanitized[key]);
            }
        }

        return sanitized;
    }

    /**
     * Guarda el log en la base de datos si es crítico o de auditoría
     */
    static async saveToDatabase(level: LogLevel, message: string, context: LogContext) {
        try {
            const shouldSave =
                level === 'security' ||
                level === 'error' ||
                (level === 'info' && (context.action || context.event));

            if (!shouldSave) return;

            const { prisma } = await import("@/lib/prisma");

            // Map categories
            let eventCategory: EventCategory = EventCategory.SECURITY;
            if (message.includes('ADMIN_ACTION')) eventCategory = EventCategory.DATA;
            if (message.includes('LEGAL')) eventCategory = EventCategory.LEGAL;

            const baseData = {
                action: context.action || context.event || 'unknown',
                entity: 'SYSTEM',
                entityId: context.entityId || 'SYSTEM',
                result: context.result || 'SUCCESS',
                eventType: level.toUpperCase(),
                eventCategory: eventCategory,
                eventData: context,
                ipAddress: context.ip || 'unknown',
                userAgent: context.userAgent || 'unknown',
                metadata: {
                    level,
                    message,
                    timestamp: new Date().toISOString()
                }
            };

            try {
                await prisma.auditLog.create({
                    data: {
                        ...baseData,
                        userId: context.userId || null,
                    }
                });
            } catch (error: any) {
                if (error.code === 'P2003') {
                    console.warn(`⚠️ [LOGGING SERVICE] P2003: Usuario ${context.userId} no existe. Guardando log como anónimo.`);
                    await prisma.auditLog.create({
                        data: {
                            ...baseData,
                            userId: null,
                            metadata: {
                                ...baseData.metadata,
                                originalUserId: context.userId,
                                warning: 'P2003_FOREIGN_KEY_VIOLATION'
                            }
                        }
                    });
                } else {
                    throw error;
                }
            }
        } catch (error: any) {
            console.error('⚠️ [LOGGING SERVICE] Error al guardar en la DB:', {
                message: error.message,
                code: error.code
            });
        }
    }
}
