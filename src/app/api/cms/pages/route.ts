import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

// GET: Fetch all sections for a page (Public)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page') || 'home';

        const sections = await prisma.pageSection.findMany({
            where: { page, isVisible: true },
            orderBy: { orderIndex: 'asc' },
        });

        // Transform array into a keyed object for easier frontend consumption
        const contentMap = sections.reduce((acc, section) => {
            acc[section.key] = section.content;
            return acc;
        }, {} as Record<string, any>);

        return NextResponse.json(contentMap);
    } catch (error) {
        console.error('[CMS_GET]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

// POST: Update a section (Admin only)
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { page, key, content, isVisible } = body;

        const updatedSection = await prisma.pageSection.upsert({
            where: {
                page_key: { page, key }
            },
            update: {
                content,
                isVisible,
                updatedBy: session.user?.email,
            },
            create: {
                page,
                key,
                content,
                isVisible: isVisible ?? true,
                updatedBy: session.user?.email,
            }
        });

        return NextResponse.json(updatedSection);
    } catch (error) {
        console.error('[CMS_POST]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
