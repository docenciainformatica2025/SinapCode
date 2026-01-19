/**
 * Tipos centralizados para el Panel Administrativo
 * Estos tipos aseguran consistencia en toda la aplicación
 */

// ============================================
// MODELO DE USUARIO PARA UI
// ============================================

export interface UIUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastLogin: string | null;
    createdAt?: string;
}

export type UserRole = 'STUDENT' | 'TEACHER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'active' | 'suspended' | 'pending';

// ============================================
// FUNCIONES DE NORMALIZACIÓN
// ============================================

/**
 * Normaliza datos de usuario desde cualquier fuente (API, DB, etc.)
 * Garantiza que siempre tengamos un objeto UIUser válido
 */
export function normalizeUser(raw: any): UIUser {
    // Validate required fields
    if (!raw || typeof raw !== 'object') {
        console.error('[normalizeUser] Invalid user data:', raw);
        return {
            id: crypto.randomUUID(),
            name: "Usuario Inválido",
            email: "invalid@error.com",
            role: "STUDENT",
            status: 'pending',
            lastLogin: null,
            createdAt: new Date().toISOString()
        };
    }

    // Normalize status with proper validation
    let status: UserStatus = 'pending';
    if (raw.status === 'active' || raw.status === 'suspended' || raw.status === 'pending') {
        status = raw.status;
    } else if (raw.emailVerified === true) {
        status = 'active';
    }

    // Normalize role
    const validRoles: UserRole[] = ['STUDENT', 'TEACHER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];
    let role: UserRole = 'STUDENT';
    if (validRoles.includes(raw.role)) {
        role = raw.role;
    }

    return {
        id: String(raw.id || crypto.randomUUID()),
        name: String(raw.name || raw.full_name || raw.user_metadata?.full_name || "Sin nombre"),
        email: String(raw.email || "sin-email@placeholder.com"),
        role,
        status,
        lastLogin: raw.lastLogin || raw.last_login || raw.lastLoginAt || null,
        createdAt: raw.createdAt || new Date().toISOString()
    };
}

// ============================================
// TIPOS PARA ESTADÍSTICAS
// ============================================

export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
    totalRevenue: number;
    activeCourses: number;
    conversionRate: number;
}

// ============================================
// TIPOS PARA AUDIT LOGS
// ============================================

export interface AuditLog {
    id: string;
    userId: string | null;
    eventType: string;
    eventCategory: 'LEGAL' | 'SECURITY' | 'DATA' | 'TRANSACTION';
    eventData: Record<string, any>;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: string;
}

// ============================================
// TIPOS PARA MODALES
// ============================================

export interface DeleteUserReason {
    value: string;
    label: string;
}

export const DELETION_REASONS: DeleteUserReason[] = [
    { value: 'GDPR_REQUEST', label: 'Solicitud del usuario (Derecho al olvido)' },
    { value: 'TOS_VIOLATION', label: 'Violación de términos de servicio' },
    { value: 'FRAUD', label: 'Actividad fraudulenta' },
    { value: 'DUPLICATE', label: 'Cuenta duplicada' },
    { value: 'COURT_ORDER', label: 'Orden judicial' },
    { value: 'INACTIVE', label: 'Cuenta inactiva (limpieza)' },
    { value: 'OTHER', label: 'Otro (especificar)' },
];
