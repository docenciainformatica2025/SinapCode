export type UserRole = 'STUDENT' | 'TEACHER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
    emailVerified: Date | null;
    deletedAt: Date | null;
    suspendedAt: Date | null;
    suspensionReason: string | null;
}

export interface UIUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastLogin: string | null;
    createdAt?: string;
}
