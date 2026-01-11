import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateEnv } from "./lib/env-validator";

// Validate env immediately on import
// slide-comment: Temporarily disabled to isolate crash
// validateEnv();

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // Support both variable names for Vercel
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    trustHost: true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                // Basic validation: length check
                if (password.length < 8) return null;

                // Admin simulation
                const adminEmails = [
                    "admin@sinapcode.global",
                    "antonio_rburgos@msn.com",
                    process.env.ADMIN_EMAIL
                ].filter(Boolean);

                if (adminEmails.some(a => a?.toLowerCase() === email.toLowerCase())) {
                    return {
                        id: "1",
                        name: "Admin",
                        email: email,
                        role: "ADMIN",
                    };
                }

                // Default student role
                return {
                    id: "2",
                    name: "Estudiante",
                    email: email,
                    role: "STUDENT",
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "STUDENT";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
    debug: true,
});
