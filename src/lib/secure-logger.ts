// ============================================
// SECURE SERVER-SIDE LOGGING UTILITY
// ============================================
// Este archivo proporciona logging seguro sin exponer datos sensibles

import { headers } from 'next/headers';

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

            // Mapeo básico de categorías
            let eventCategory: 'SECURITY' | 'LEGAL' | 'DATA' | 'TRANSACTION' = 'SECURITY';
            if (logEntry.message.includes('ADMIN_ACTION')) eventCategory = 'DATA';
            if (logEntry.message.includes('LEGAL')) eventCategory = 'LEGAL';

            await prisma.auditLog.create({
                data: {
                    userId: logEntry.userId || null,
                    action: logEntry.action || logEntry.event || 'unknown',
                    eventType: logEntry.level.toUpperCase(),
                    eventCategory: eventCategory,
                    eventData: logEntry,
                    ipAddress: logEntry.ip,
                    userAgent: logEntry.userAgent,
                    metadata: {
                        level: logEntry.level,
                        message: logEntry.message,
                        timestamp: logEntry.timestamp
                    }
                }
            });
        } catch (error: any) {
            console.error('⚠️ [SECURE LOGGER] Failed to save to DB:', {
                message: error.message,
                code: error.code,
                meta: error.meta,
                name: error.name
            });

            // FALLBACK: Intentar guardar sin campos complejos (Enum/Relation) si falla
            try {
                const { prisma } = await import("@/lib/prisma");
                await prisma.auditLog.create({
                    data: {
                        action: 'LOG_FALLBACK',
                        eventType: 'ERROR',
                        // Omitimos userId y eventCategory para aislar el error
                        metadata: {
                            originalError: error.message,
                            originalData: JSON.stringify(logEntry)
                        }
                    }
                });
                console.log('✅ [SECURE LOGGER] Fallback log saved.');
            } catch (fallbackError) {
                console.error('❌ [SECURE LOGGER] Fallback completely failed.');
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
            console.log(JSON.stringify(logEntry, null, 2));
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
