import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

// Define schema validation manually to avoid dependency issues during debugging
function validateCredentials(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // Explicitly set the secret with fallback
    secret: process.env.NEXTAUTH_SECRET,
    // Enforce JWT strategy
    session: { strategy: "jwt" },
    trustHost: true,
    providers: [
        // Defensive: Only load Google if creds exist
        ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET ? [
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
                allowDangerousEmailAccountLinking: true,
            })
        ] : []),
        // Defensive: Only load GitHub if creds exist
        ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET ? [
            GitHub({
                clientId: process.env.AUTH_GITHUB_ID,
                clientSecret: process.env.AUTH_GITHUB_SECRET,
                allowDangerousEmailAccountLinking: true,
            })
        ] : []),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) return null;

                    const email = credentials.email as string;
                    const password = credentials.password as string;

                    if (!validateCredentials(email, password)) return null;

                    // Admin check
                    const adminEmails = process.env.ADMIN_EMAIL
                        ? [process.env.ADMIN_EMAIL]
                        : ["admin@sinapcode.global", "antonio_rburgos@msn.com"];

                    if (adminEmails.some(cpu => cpu?.toLowerCase() === email.toLowerCase())) {
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
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
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
    debug: process.env.NODE_ENV === "development",
});
