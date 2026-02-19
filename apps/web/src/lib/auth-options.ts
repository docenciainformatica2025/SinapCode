import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { secureLogger } from "@/lib/secure-logger";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Formato de correo inválido"),
    password: z.string().min(1, "La contraseña es requeridda"),
});

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Validation Layer
                const parsedCredentials = loginSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    const errorMsg = parsedCredentials.error.errors[0].message;
                    console.error('❌ [AUTH] Validación fallida:', errorMsg);
                    throw new Error(errorMsg);
                }

                const { email, password } = parsedCredentials.data;
                const normalizedEmail = email.toLowerCase().trim();

                const { prisma } = await import("@/lib/prisma");
                const { compare } = await import("bcryptjs");

                // 2. User Retrieval
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
                        // bio: false, // We explicitly omit fields that might be missing in production DB
                    }
                });

                if (!user) {
                    console.error('❌ [AUTH] Usuario no encontrado:', normalizedEmail);
                    await secureLogger.authEvent('login_failure', {
                        email: normalizedEmail,
                        action: 'user_not_found'
                    });
                    // Generic error to prevent enumeration
                    throw new Error("Credenciales inválidas");
                }

                // 3. Security Checks (Order matters: verify existence -> status -> password)

                if (!user.password) {
                    console.error('❌ [AUTH] Usuario sin contraseña (OAuth user?)');
                    throw new Error("Este correo está registrado vía Google. Usa el botón 'Continuar con Google'.");
                }

                if (!user.emailVerified) {
                    console.error('❌ [AUTH] Email no verificado:', normalizedEmail);
                    throw new Error("AUTH_EMAIL_NOT_VERIFIED"); // Internal code for client handling
                }

                if (user.deletedAt) {
                    console.error('❌ [AUTH] Usuario eliminado');
                    await secureLogger.security('LOGIN_ATTEMPT_DELETED_USER', {
                        userId: user.id,
                        email: user.email,
                        deletedAt: user.deletedAt.toISOString()
                    });
                    throw new Error("Tu cuenta fue eliminada. Regístrate de nuevo.");
                }

                if (user.suspendedAt) {
                    console.error('❌ [AUTH] Usuario suspendido');
                    await secureLogger.security('LOGIN_ATTEMPT_SUSPENDED_USER', {
                        userId: user.id,
                        email: user.email,
                        suspendedAt: user.suspendedAt.toISOString(),
                        suspensionReason: user.suspensionReason
                    });
                    throw new Error("Tu cuenta ha sido suspendida. Contacta a soporte.");
                }

                // 4. Password Verification
                const isPasswordValid = await compare(password, user.password);

                if (!isPasswordValid) {
                    console.error('❌ [AUTH] Contraseña inválida:', normalizedEmail);
                    await secureLogger.authEvent('login_failure', {
                        userId: user.id,
                        email: user.email,
                        action: 'invalid_password'
                    });
                    throw new Error("Credenciales inválidas");
                }

                // 5. Success
                await secureLogger.authEvent('login_success', {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                });

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login", // Redirect errors to login page (no URL params)
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // Global check for ALL providers (Google + Credentials)
            if (account?.provider === 'google' && user.email) {
                const { prisma } = await import("@/lib/prisma");
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { suspendedAt: true, deletedAt: true }
                });

                if (dbUser?.suspendedAt || dbUser?.deletedAt) {
                    return false; // Blocks OAuth login if DB status is invalid
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            // 1. Initial Sign In
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                return token;
            }

            // Persistence check (Zombie session prevention)
            if (process.env.NEXT_RUNTIME !== 'edge') {
                try {
                    const { prisma } = await import("@/lib/prisma");
                    const dbUser = await prisma.user.findUnique({
                        where: { id: token.id as string },
                        select: { role: true, suspendedAt: true, deletedAt: true }
                    });

                    if (!dbUser || dbUser.deletedAt || dbUser.suspendedAt) {
                        token.error = "RefreshAccessTokenError";
                        return token;
                    }
                    token.role = dbUser.role;
                } catch (error) {
                    console.error("JWT Revalidation Error:", error);
                }
            }

            return token;
        },
        async session({ session, token }) {
            // If token has error (deleted user), invalidate session
            if (token.error === "RefreshAccessTokenError") {
                return { ...session, error: "RefreshAccessTokenError" } as any; // Force logout logic on client
            }

            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    // SECURITY: Debug mode disabled in production to prevent sensitive data exposure
    debug: process.env.NODE_ENV === "development",
};
