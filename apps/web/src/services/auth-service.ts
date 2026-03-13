import { User, UserRole } from "@/domain/types/user";
import { LoginCredentials } from "@/domain/schemas/auth";
import { secureLogger } from "@/lib/secure-logger";
import { compare } from "bcryptjs";

export class AuthService {
    /**
     * Authorizes a user based on credentials
     */
    static async authorize(credentials: LoginCredentials): Promise<User | null> {
        const { email, password } = credentials;
        const normalizedEmail = email.toLowerCase().trim();

        const { prisma } = await import("@/lib/prisma");

        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                emailVerified: true,
                deletedAt: true,
                suspendedAt: true,
                suspensionReason: true,
            }
        });

        if (!user) {
            console.error('❌ [AUTH SERVICE] Usuario no encontrado:', normalizedEmail);
            await secureLogger.authEvent('login_failure', {
                email: normalizedEmail,
                action: 'user_not_found'
            });
            throw new Error("Credenciales inválidas");
        }

        if (!user.password) {
            console.error('❌ [AUTH SERVICE] Usuario sin contraseña (OAuth user?)');
            throw new Error("Este correo está registrado vía Google. Usa el botón 'Continuar con Google'.");
        }

        if (!user.emailVerified) {
            console.error('❌ [AUTH SERVICE] Email no verificado:', normalizedEmail);
            throw new Error("AUTH_EMAIL_NOT_VERIFIED");
        }

        if (user.deletedAt) {
            console.error('❌ [AUTH SERVICE] Usuario eliminado');
            await secureLogger.security('LOGIN_ATTEMPT_DELETED_USER', {
                userId: user.id,
                email: user.email,
                deletedAt: user.deletedAt.toISOString()
            });
            throw new Error("Tu cuenta fue eliminada. Regístrate de nuevo.");
        }

        if (user.suspendedAt) {
            console.error('❌ [AUTH SERVICE] Usuario suspendido');
            await secureLogger.security('LOGIN_ATTEMPT_SUSPENDED_USER', {
                userId: user.id,
                email: user.email,
                suspendedAt: user.suspendedAt.toISOString(),
                suspensionReason: user.suspensionReason
            });
            throw new Error("Tu cuenta ha sido suspendida. Contacta a soporte.");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            console.error('❌ [AUTH SERVICE] Contraseña inválida:', normalizedEmail);
            await secureLogger.authEvent('login_failure', {
                userId: user.id,
                email: user.email,
                action: 'invalid_password'
            });
            throw new Error("Credenciales inválidas");
        }

        await secureLogger.authEvent('login_success', {
            userId: user.id,
            email: user.email,
            role: user.role
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as UserRole,
            emailVerified: user.emailVerified,
            deletedAt: user.deletedAt,
            suspendedAt: user.suspendedAt,
            suspensionReason: user.suspensionReason
        };
    }

    /**
     * Checks if a user is valid (not deleted or suspended)
     */
    static async validateUserStatus(userId: string): Promise<{ role: UserRole } | null> {
        const { prisma } = await import("@/lib/prisma");
        const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true, suspendedAt: true, deletedAt: true }
        });

        if (!dbUser || dbUser.deletedAt || dbUser.suspendedAt) {
            return null;
        }
        return { role: dbUser.role as UserRole };
    }

    /**
     * Checks if a user has administrative roles
     */
    static async checkAdminRole(userId: string): Promise<boolean> {
        const { prisma } = await import("@/lib/prisma");
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) return false;

        const adminRoles: UserRole[] = ['SUPER_ADMIN', 'ADMIN' as UserRole];
        return adminRoles.includes(user.role as UserRole);
    }
}
