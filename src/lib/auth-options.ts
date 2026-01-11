import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Admin simulation
                const adminEmails = [
                    "admin@sinapcode.global",
                    "antonio_rburgos@msn.com",
                    process.env.ADMIN_EMAIL
                ].filter(Boolean);

                const email = credentials.email;
                const password = credentials.password;

                if (password.length < 8) return null;

                if (adminEmails.some(a => a?.toLowerCase() === email.toLowerCase())) {
                    return {
                        id: "1",
                        name: "Admin",
                        email: email,
                        role: "ADMIN",
                    };
                }

                return {
                    id: "2",
                    name: "Estudiante",
                    email: email,
                    role: "STUDENT",
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
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
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET, // Fallback support
    // Enable debug logs for diagnosis
    debug: true,
};
