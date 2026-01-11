import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use a local instance for the test to avoid global state issues
const prisma = new PrismaClient();

export async function GET() {
    try {
        // 1. Basic Server Check
        const healthData: any = {
            status: 'online',
            timestamp: new Date().toISOString(),
            env: {
                hasAuthSecret: !!process.env.AUTH_SECRET || !!process.env.NEXTAUTH_SECRET,
                authSecretLength: (process.env.AUTH_SECRET?.length) || (process.env.NEXTAUTH_SECRET?.length) || 0,
                hasDbUrl: !!process.env.DATABASE_URL,
                nodeEnv: process.env.NODE_ENV,
                vercelEnv: process.env.VERCEL_ENV || 'unknown',
            }
        };

        // 2. Database Connection Check (Safely)
        try {
            await prisma.$connect();
            healthData.database = { status: 'connected', latency: 'unknown' };
            const start = Date.now();
            // Simple query
            await prisma.$queryRaw`SELECT 1`;
            healthData.database.latency = `${Date.now() - start}ms`;
            await prisma.$disconnect();
        } catch (dbError: any) {
            healthData.database = {
                status: 'error',
                message: dbError.message
            };
        }

        return NextResponse.json(healthData);
    } catch (e: any) {
        return NextResponse.json({
            status: 'critical_failure',
            error: e.message
        }, { status: 500 });
    }
}
