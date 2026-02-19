
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const config = await prisma.siteConfig.findUnique({
            where: { id: 'global' },
            select: {
                siteName: true,
                logoUrl: true,
                faviconUrl: true,
                primaryColor: true,
                secondaryColor: true,
                description: true
            }
        });

        if (!config) {
            return NextResponse.json({
                siteName: 'SinapCode',
                primaryColor: '#0EA5E9',
                secondaryColor: '#F59E0B'
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        console.error('Error en Configuración del Sitio Pública:', error);
        return NextResponse.json({ siteName: 'SinapCode' }, { status: 500 });
    }
}
