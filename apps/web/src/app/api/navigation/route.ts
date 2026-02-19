
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const menus = await prisma.navigationMenu.findMany();

        // Transform array to object { location: items }
        const formattedMenus = menus.reduce((acc: Record<string, any>, menu) => {
            acc[menu.location] = menu.items;
            return acc;
        }, { header: [], footer: [] });

        return NextResponse.json({ menus: formattedMenus });
    } catch (error) {
        console.error('Error en Navegación Pública:', error);
        return NextResponse.json({ menus: { header: [], footer: [] } }, { status: 500 });
    }
}
