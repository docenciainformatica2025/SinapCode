// ============================================
// SECURE SERVER-SIDE LOGGING UTILITY
// ============================================
// Este archivo proporciona logging seguro sin exponer datos sensibles

import { headers } from 'next/headers';
// import { EventCategory } from '@prisma/client';
enum EventCategory {
    LEGAL = 'LEGAL',
    SECURITY = 'SECURITY',
    DATA = 'DATA',
    TRANSACTION = 'TRANSACTION'
}

type LogLevel = 'info' | 'warn' | 'error' | 'security';

interface LogContext {
    userId?: string;
    email?: string; // Solo se loguea en servidor, nunca se expone al cliente
    action?: string;
    ip?: string;
    userAgent?: string;
    [key: string]: any;
}

class SecureLogger {
    private isDevelopment = process.env.NODE_ENV === 'development';
    private logLevel = process.env.LOG_LEVEL || 'info';

    /**
     * Sanitiza datos sensibles antes de loguear
     */
    private sanitize(data: any): any {
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
     * Obtiene información de contexto de la request de forma segura
     */
    private async getRequestContext(): Promise<Partial<LogContext>> {
        try {
            const headersList = headers();
            return {
                ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
                userAgent: headersList.get('user-agent') || 'unknown',
            };
        } catch {
            return {};
        }
    }

    /**
     * Guarda el log en la base de datos si es crítico o de auditoría
     */
    private async saveToDatabase(logEntry: any) {
        try {
            // Solo guardar logs importantes en DB para no saturar
            const shouldSave =
                logEntry.level === 'security' ||
                logEntry.level === 'error' ||
                (logEntry.level === 'info' && (logEntry.action || logEntry.event));

            if (!shouldSave) return;

            // Importación dinámica para evitar problemas de inicialización
            const { prisma } = await import("@/lib/prisma");

            // Mapeo básico de categorías usando el ENUM real de Prisma
            let eventCategory: EventCategory = EventCategory.SECURITY;
            if (logEntry.message.includes('ADMIN_ACTION')) eventCategory = EventCategory.DATA;
            if (logEntry.message.includes('LEGAL')) eventCategory = EventCategory.LEGAL;

            const baseData = {
                action: logEntry.action || logEntry.event || 'unknown',
                entity: 'SYSTEM',
                entityId: logEntry.entityId || 'SYSTEM',
                result: logEntry.result || 'SUCCESS',
                eventType: logEntry.level.toUpperCase(),
                eventCategory: eventCategory,
                eventData: logEntry,
                ipAddress: logEntry.ip || 'unknown',
                userAgent: logEntry.userAgent || 'unknown',
                metadata: {
                    level: logEntry.level,
                    message: logEntry.message,
                    timestamp: logEntry.timestamp
                }
            };

            try {
                await prisma.auditLog.create({
                    data: {
                        ...baseData,
                        userId: logEntry.userId || null,
                    }
                });
            } catch (error: any) {
                // WORLD CLASS ERROR HANDLING: 
                // Si falla por Foreign Key (P2003 - usuario no existe en DB), 
                // reintentamos guardando como anónimo.
                if (error.code === 'P2003') {
                    console.warn(`⚠️ [SECURE LOGGER] P2003: Usuario ${logEntry.userId} no existe. Guardando log como anónimo.`);
                    await prisma.auditLog.create({
                        data: {
                            ...baseData,
                            userId: null,
                            metadata: {
                                ...baseData.metadata,
                                originalUserId: logEntry.userId,
                                warning: 'P2003_FOREIGN_KEY_VIOLATION'
                            }
                        }
                    });
                } else {
                    throw error; // Re-lanzar para el bloque catch externo
                }
            }
        } catch (error: any) {
            console.error('⚠️ [SECURE LOGGER] Error al guardar en la DB:', {
                message: error.message,
                code: error.code
            });

            // FALLBACK: Intentar guardar sin campos complejos y sin userId
            try {
                const { prisma } = await import("@/lib/prisma");
                await prisma.auditLog.create({
                    data: {
                        action: 'LOG_FALLBACK',
                        entity: 'SYSTEM',
                        entityId: 'SYSTEM',
                        result: 'ERROR_LOG_FALLBACK',
                        eventType: 'ERROR',
                        eventCategory: EventCategory.SECURITY,
                        ipAddress: '0.0.0.0',
                        userAgent: 'fallback-logger',
                        metadata: {
                            originalError: error.message,
                            originalCode: error.code
                        }
                    }
                });
            } catch (fallbackError) {
                console.error('❌ [SECURE LOGGER] El fallback falló completamente.');
            }
        }
    }

    /**
     * Log genérico con nivel de severidad
     */
    private async log(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString();
        const requestContext = await this.getRequestContext();
        const sanitizedContext = this.sanitize({ ...context, ...requestContext });

        const logEntry = {
            timestamp,
            level,
            message,
            ...sanitizedContext,
        };

        // En producción, esto debería ir a un servicio de logging como Datadog, Sentry, etc.
        // Por ahora, solo console.log en desarrollo
        if (this.isDevelopment || level === 'error' || level === 'security') {
            // log printed to stdout
            // console.log(JSON.stringify(logEntry, null, 2));
        }

        // Persistir en Base de Datos
        await this.saveToDatabase(logEntry);
    }

    /**
     * Log de información general
     */
    async info(message: string, context?: LogContext) {
        await this.log('info', message, context);
    }

    /**
     * Log de advertencias
     */
    async warn(message: string, context?: LogContext) {
        await this.log('warn', message, context);
    }

    /**
     * Log de errores
     */
    async error(message: string, context?: LogContext) {
        await this.log('error', message, context);
    }

    /**
     * Log de eventos de seguridad (CRÍTICO)
     */
    async security(message: string, context?: LogContext) {
        await this.log('security', message, context);
    }

    /**
     * Log específico para autenticación
     */
    async authEvent(
        event: 'login_attempt' | 'login_success' | 'login_failure' | 'logout' | 'session_expired',
        context: LogContext
    ) {
        await this.security(`AUTH_EVENT: ${event}`, {
            ...context,
            event,
        });
    }

    /**
     * Log específico para acciones de admin
     */
    async adminAction(
        action: 'user_edit' | 'user_delete' | 'user_suspend' | 'user_activate',
        context: LogContext
    ) {
        await this.security(`ADMIN_ACTION: ${action}`, {
            ...context,
            action,
        });
    }
}

// Singleton instance
export const secureLogger = new SecureLogger();

// Tipos exportados
export type { LogLevel, LogContext };
