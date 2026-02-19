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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const menus = await prisma.navigationMenu.findMany();

        // Transform array to object { location: items }
        const formattedMenus = menus.reduce((acc: any, menu) => {
            acc[menu.location] = menu.items;
            return acc;
        }, {});

        return NextResponse.json({ menus: formattedMenus });
    } catch (error) {
        console.error('Navigation API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { location, items } = body;

        const updatedMenu = await prisma.navigationMenu.upsert({
            where: { location },
            update: { items },
            create: {
                location,
                items
            }
        });

        return NextResponse.json(updatedMenu);
    } catch (error) {
        console.error('Update Navigation Error:', error);
        return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
    }
}
