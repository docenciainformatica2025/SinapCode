import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const isAuthorized = async (session: any) => {
    if (!session?.user?.email) return false;
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });
    return user && ['SUPER_ADMIN', 'ADMIN'].includes(user.role);
};

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const config = await prisma.siteConfig.findUnique({
            where: { id: 'global' }
        });

        // Initialize defaults if not exists
        if (!config) {
            return NextResponse.json({
                platformName: 'SinapCode',
                company: 'SinapCode',
                location: 'Unknown',
                maintenanceMode: false,
                systemInfo: {
                    nodeEnv: process.env.NODE_ENV || 'development',
                }
            });
        }

        return NextResponse.json({
            platformName: config.siteName,
            company: config.companyName,
            location: config.location,
            supportUrl: config.supportEmail,
            maintenanceMode: false, // Placeholder
            systemInfo: {
                nodeEnv: process.env.NODE_ENV || 'development',
                dbType: 'PostgreSQL (Supabase)'
            }
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await request.json();

        // SECURITY: Refactored to use DB instead of modifying source code (neutralizes injection)
        const updatedConfig = await prisma.siteConfig.upsert({
            where: { id: 'global' },
            create: {
                id: 'global',
                siteName: body.platformName || 'SinapCode',
                companyName: body.company,
                location: body.location,
                supportEmail: body.supportUrl,
            },
            update: {
                siteName: body.platformName,
                companyName: body.company,
                location: body.location,
                supportEmail: body.supportUrl,
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Configuración actualizada en la base de datos',
            config: updatedConfig
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Error al actualizar la configuración' }, { status: 500 });
    }
}
