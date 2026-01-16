
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

// GET: Obtener todas las configuraciones
export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const settings = await prisma.systemSetting.findMany();
        // Convertir array a objeto para fácil acceso en frontend
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, any>);

        // Read system info
        const systemInfo = {
            appVersion: process.env.npm_package_version || '1.1.0',
            nextVersion: process.env.npm_package_dependencies_next || '14.1.0',
            nodeEnv: process.env.NODE_ENV || 'development',
            dbType: 'Supabase (PostgreSQL)'
        };

        return NextResponse.json({ ...settingsMap, systemInfo });
    } catch (error) {
        console.error('[SETTINGS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// PUT: Actualizar o crear configuraciones
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const body = await req.json();
        const settingsToUpdate = Object.entries(body);

        for (const [key, value] of settingsToUpdate) {
            await prisma.systemSetting.upsert({
                where: { key },
                update: {
                    value: value as any, // Prisma Json type
                    updatedBy: session.user?.email || 'admin'
                },
                create: {
                    key,
                    value: value as any,
                    isPublic: false,
                    updatedBy: session.user?.email || 'admin'
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[SETTINGS_PUT]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
