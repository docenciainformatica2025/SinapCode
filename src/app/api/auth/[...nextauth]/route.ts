import { GET as NextAuthGET, POST as NextAuthPOST } from "@/auth";
import { NextRequest } from "next/server";

// Helper to ensure we don't crash on standard requests
export async function GET(req: any) {
    try {
        console.log("[AUTH DEBUG] Handling GET request");
        const response = await NextAuthGET(req);
        console.log("[AUTH DEBUG] GET response status:", response.status);
        return response;
    } catch (e: any) {
        console.error("FATAL AUTH ERROR (GET):", e);
        // Return JSON so the browser sees the error instead of empty response
        return Response.json({
            error: "Auth Crash (GET)",
            message: e.message,
            stack: e.stack,
            cause: e.cause
        }, { status: 500 });
    }
}

export async function POST(req: any) {
    try {
        console.log("[AUTH DEBUG] Handling POST request");
        const response = await NextAuthPOST(req);
        console.log("[AUTH DEBUG] POST response status:", response.status);
        return response;
    } catch (e: any) {
        console.error("FATAL AUTH ERROR (POST):", e);
        return Response.json({
            error: "Auth Crash (POST)",
            message: e.message,
            stack: e.stack,
            cause: e.cause
        }, { status: 500 });
    }
}
