import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { secureLogger } from "@/lib/secure-logger";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('🔐 [AUTH] Inicio de autenticación');

                if (!credentials?.email || !credentials?.password) {
                    console.error('❌ [AUTH] Credenciales faltantes');
                    await secureLogger.authEvent('login_failure', {
                        email: credentials?.email,
                        action: 'missing_credentials'
                    });
                    return null;
                }

                console.log('✅ [AUTH] Credenciales recibidas:', credentials.email);

                const { prisma } = await import("@/lib/prisma");
                const { compare } = await import("bcryptjs");

                console.log('🔍 [AUTH] Buscando usuario en base de datos...');
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    console.error('❌ [AUTH] Usuario no encontrado:', credentials.email);
                    await secureLogger.authEvent('login_failure', {
                        email: credentials.email,
                        action: 'user_not_found'
                    });
                    return null;
                }

                console.log('✅ [AUTH] Usuario encontrado:', {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    emailVerified: !!user.emailVerified,
                    hasPassword: !!user.password
                });

                if (!user.password) {
                    console.error('❌ [AUTH] Usuario sin contraseña');
                    await secureLogger.authEvent('login_failure', {
                        email: credentials.email,
                        action: 'no_password'
                    });
                    return null;
                }

                // WORLD CLASS SECURITY: Double Opt-In Enforcement
                if (!user.emailVerified) {
                    console.error('❌ [AUTH] Email no verificado');
                    await secureLogger.authEvent('login_failure', {
                        userId: user.id,
                        email: user.email,
                        action: 'email_not_verified'
                    });
                    throw new Error("Por favor verifica tu correo electrónico para iniciar sesión");
                }

                console.log('✅ [AUTH] Email verificado');

                // Check if user is deleted (soft delete)
                if (user.deletedAt) {
                    console.error('❌ [AUTH] Usuario eliminado (soft delete)');
                    await secureLogger.security('LOGIN_ATTEMPT_DELETED_USER', {
                        userId: user.id,
                        email: user.email,
                        deletedAt: user.deletedAt.toISOString()
                    });
                    throw new Error("Tu cuenta fue eliminada. Regístrate de nuevo para recuperarla.");
                }

                // Check if user is suspended
                if (user.suspendedAt) {
                    console.error('❌ [AUTH] Usuario suspendido');
                    await secureLogger.security('LOGIN_ATTEMPT_SUSPENDED_USER', {
                        userId: user.id,
                        email: user.email,
                        suspendedAt: user.suspendedAt.toISOString(),
                        suspensionReason: user.suspensionReason
                    });
                    throw new Error("Tu cuenta ha sido suspendida. Contacta al administrador.");
                }

                console.log('🔑 [AUTH] Verificando contraseña...');
                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    console.error('❌ [AUTH] Contraseña inválida');
                    await secureLogger.authEvent('login_failure', {
                        userId: user.id,
                        email: user.email,
                        action: 'invalid_password'
                    });
                    return null;
                }

                console.log('✅ [AUTH] Contraseña válida');

                // Successful login
                console.log('🎉 [AUTH] Login exitoso:', {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                });

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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    // SECURITY: Debug mode disabled in production to prevent sensitive data exposure
    debug: process.env.NODE_ENV === 'development',
};
