import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginSchema } from "@/domain/schemas/auth";
import { AuthService } from "@/services/auth-service";

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
                // 1. Validation Layer (Domain Schema)
                const parsedCredentials = loginSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    const errorMsg = parsedCredentials.error.errors[0].message;
                    console.error('❌ [AUTH] Validación fallida:', errorMsg);
                    throw new Error(errorMsg);
                }

                // 2. Delegate to Service (Pure Logic)
                return await AuthService.authorize(parsedCredentials.data);
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google' && user.email) {
                // Quick check for status via Service
                const { prisma } = await import("@/lib/prisma");
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { suspendedAt: true, deletedAt: true }
                });

                if (dbUser?.suspendedAt || dbUser?.deletedAt) {
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                return token;
            }

            if (process.env.NEXT_RUNTIME !== 'edge') {
                try {
                    // Use Service for validation
                    const status = await AuthService.validateUserStatus(token.id as string);
                    if (!status) {
                        token.error = "RefreshAccessTokenError";
                        return token;
                    }
                    token.role = status.role;
                } catch (error) {
                    console.error("JWT Revalidation Error:", error);
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token.error === "RefreshAccessTokenError") {
                return { ...session, error: "RefreshAccessTokenError" } as any;
            }

            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};
