import { authOptions } from "./auth-options";
import { getServerSession } from "next-auth";

// Re-export authOptions for compatibility
export { authOptions };

// Helper if needed, but main goal is to satisfy import
export function getAuthSession() {
    return getServerSession(authOptions);
}
