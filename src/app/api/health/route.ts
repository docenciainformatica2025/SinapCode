import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Basic Server Check
        const healthData: any = {
            status: 'online',
            timestamp: new Date().toISOString(),
            env: {
                hasAuthSecret: !!process.env.AUTH_SECRET,
                hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
                authSecretLength: (process.env.AUTH_SECRET?.length) || (process.env.NEXTAUTH_SECRET?.length) || 0,
                hasDbUrl: !!process.env.DATABASE_URL,
                nodeEnv: process.env.NODE_ENV,
                vercelEnv: process.env.VERCEL_ENV || 'unknown',
            },
            database: { status: 'skipped', message: 'Prisma not installed' }
        };

        return NextResponse.json(healthData);
    } catch (e: any) {
        return NextResponse.json({
            status: 'critical_failure',
            error: e.message
        }, { status: 500 });
    }
}
