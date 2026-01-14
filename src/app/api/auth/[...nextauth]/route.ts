import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

// ✅ Correctly implemented for Next.js 14 App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
