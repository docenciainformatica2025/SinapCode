export enum EventCategory {
    LEGAL = 'LEGAL',
    SECURITY = 'SECURITY',
    DATA = 'DATA',
    TRANSACTION = 'TRANSACTION'
}

export type LogLevel = 'info' | 'warn' | 'error' | 'security';

export interface LogContext {
    userId?: string;
    email?: string;
    action?: string;
    ip?: string;
    userAgent?: string;
    [key: string]: any;
}

export interface AuditLogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context: LogContext;
}
