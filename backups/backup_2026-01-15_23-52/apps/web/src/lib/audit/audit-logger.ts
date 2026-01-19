// Tipos de acciones auditables
export type AuditAction =
    | 'USER_BAN'
    | 'USER_UNBAN'
    | 'ROLE_CHANGE'
    | 'SETTINGS_UPDATE'
    | 'EXPORT_DATA'
    | 'SYSTEM_ALERT';

export interface AuditLogEntry {
    id: string;
    timestamp: string;
    actorId: string;
    actorName: string;
    action: AuditAction;
    targetId?: string;
    targetName?: string;
    description: string;
    ipAddress?: string;
    metadata?: Record<string, any>;
}

// Simulamos una base de datos en memoria para el prototipo
let auditLogStore: AuditLogEntry[] = [];

export class AuditLogger {
    /**
     * Registra una acción administrativa
     */
    static async logAction(
        entry: Omit<AuditLogEntry, 'id' | 'timestamp'>
    ): Promise<void> {
        const newEntry: AuditLogEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...entry
        };

        // En producción, esto iría a Firestore/Postgres
        // console.log('🔒 [AUDIT LOG]', JSON.stringify(newEntry, null, 2));

        // Guardamos en memoria para mostrar en la demo
        auditLogStore.unshift(newEntry);

        // Mantenemos solo los últimos 100 registros
        if (auditLogStore.length > 100) {
            auditLogStore.pop();
        }
    }

    /**
     * Obtiene los logs (simulado)
     */
    static async getLogs(limit = 50): Promise<AuditLogEntry[]> {
        return auditLogStore.slice(0, limit);
    }

    /**
     * Seed inicial para demos
     */
    static seedMockData() {
        if (auditLogStore.length > 0) return;

        const mockActions: AuditLogEntry[] = [
            {
                id: '1',
                timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
                actorId: 'admin-1',
                actorName: 'Admin System',
                action: 'SYSTEM_ALERT',
                description: 'High traffic detected in LATAM region',
                targetId: 'server-latam-1'
            },
            {
                id: '2',
                timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
                actorId: 'admin-1',
                actorName: 'Super Admin',
                action: 'SETTINGS_UPDATE',
                description: 'Updated SEO meta tags for Landing Page',
                targetId: 'seo-config'
            },
            {
                id: '3',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                actorId: 'admin-1',
                actorName: 'Super Admin',
                action: 'USER_BAN',
                description: 'Suspended user for suspicious bot activity',
                targetId: 'user-882',
                targetName: 'Bot_x99'
            }
        ];

        auditLogStore = mockActions;
    }
}
