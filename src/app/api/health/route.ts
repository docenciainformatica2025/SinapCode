import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const dynamic = 'force-dynamic'; // No caching

export async function GET() {
    const healthCheck = {
        status: "starting",
        timestamp: new Date().toISOString(),
        env: {
            hasAuthSecret: !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
            hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
            authSecretLength: (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)?.length || 0,
            hasDbUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV,
            vercelEnv: process.env.VERCEL_ENV,
        },
        database: {
            status: "unknown",
            message: "Pending check",
            latency: -1
        }
    };

    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is missing in environment variables");
        }

        const start = performance.now();
        // Execute a raw query to bypass schema validation strictly for connectivity check
        await prisma.$queryRaw`SELECT 1`;
        const latency = Math.round(performance.now() - start);

        healthCheck.status = "online";
        healthCheck.database = {
            status: "connected",
            message: "Connection successful (SELECT 1)",
            latency: latency
        };

        return NextResponse.json(healthCheck, { status: 200 });

    } catch (error: any) {
        console.error("Health Check Failed:", error);

        healthCheck.status = "degraded";
        healthCheck.database = {
            status: "error",
            message: error.message || "Unknown database error",
            latency: -1
        };

        // Return 200 even on error so we can read the JSON response debugging
        return NextResponse.json(healthCheck, { status: 200 });
    } finally {
        // In serverless, we usually rely on the platform to manage connections, 
        // but explicit disconnect can be safer for ad-hoc checks.
        await prisma.$disconnect();
    }
}
