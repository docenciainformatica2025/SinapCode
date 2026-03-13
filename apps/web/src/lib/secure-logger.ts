import { headers } from 'next/headers';
import { LogLevel, LogContext } from '@/domain/logging/types';
import { LoggingService } from '@/services/logging-service';

class SecureLogger {
    private isDevelopment = process.env.NODE_ENV === 'development';

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
     * Log genérico con nivel de severidad
     */
    private async log(level: LogLevel, message: string, context?: LogContext) {
        const requestContext = await this.getRequestContext();
        const fullContext = { ...context, ...requestContext };
        const sanitizedContext = LoggingService.sanitize(fullContext);

        if (this.isDevelopment || level === 'error' || level === 'security') {
            // Keep console logs for dev visibility if needed
            // console.log(`[${level.toUpperCase()}] ${message}`, sanitizedContext);
        }

        // Persistir en Base de Datos vía Service
        await LoggingService.saveToDatabase(level, message, sanitizedContext);
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
