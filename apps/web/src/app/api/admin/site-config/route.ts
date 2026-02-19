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

        let config = await prisma.siteConfig.findUnique({
            where: { id: 'global' }
        });

        // Initialize if not exists
        if (!config) {
            config = await prisma.siteConfig.create({
                data: {
                    id: 'global',
                    siteName: 'SinapCode',
                    primaryColor: '#0EA5E9',
                    secondaryColor: '#F59E0B'
                }
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        console.error('Error en la API de configuración del sitio:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await request.json();
        // Remove id from body to avoid errors
        const { id, createdAt, updatedAt, ...dataToUpdate } = body;

        const updatedConfig = await prisma.siteConfig.upsert({
            where: { id: 'global' },
            update: dataToUpdate,
            create: {
                id: 'global',
                ...dataToUpdate
            }
        });

        return NextResponse.json(updatedConfig);
    } catch (error) {
        console.error('Error al actualizar la configuración:', error);
        return NextResponse.json({ error: 'Error al actualizar la configuración' }, { status: 500 });
    }
}
