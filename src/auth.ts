import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // Only include Google if credentials are provided
        ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
            ? [Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
            })]
            : []),
        // Only include GitHub if credentials are provided
        ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
            ? [GitHub({
                clientId: process.env.AUTH_GITHUB_ID,
                clientSecret: process.env.AUTH_GITHUB_SECRET,
            })]
            : []),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsed = z
                    .object({ email: z.string().email(), password: z.string().min(8) })
                    .safeParse(credentials);

                if (parsed.success) {
                    // TODO: Connect to real backend API here
                    const adminEmails = [
                        process.env.ADMIN_EMAIL,
                        "admin@sinapcode.global",
                        "antonio_rburgos@msn.com"
                    ].filter(Boolean);

                    if (adminEmails.some(cpu => cpu?.toLowerCase() === parsed.data.email.toLowerCase())) {
                        return {
                            id: "1",
                            name: "Admin",
                            email: parsed.data.email,
                            role: "ADMIN",
                        };
                    }
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                // If user object has role, use it (from Credentials or potentially adapter later)
                // Default to 'STUDENT' if undefined (e.g. initial social login without adapter logic)
                token.role = (user as any).role || "STUDENT";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                // Add role to session type extension (we will need to add d.ts for full type safety later)
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
    // Debug for development
    debug: process.env.NODE_ENV === "development",
    trustHost: true,
});
