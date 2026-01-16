import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

// GET: List all projects (Public/Admin)
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { orderIndex: 'asc' }
        });
        return NextResponse.json({ projects });
    } catch (error) {
        console.error('[PROJECTS_GET]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

// POST: Create/Update Project
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const project = await prisma.project.create({
            data: {
                title: body.title,
                student: body.student,
                role: body.role,
                description: body.description,
                imageUrl: body.imageUrl,
                tags: body.tags || [],
                repoUrl: body.repoUrl,
                demoUrl: body.demoUrl,
                isVisible: body.isVisible ?? true,
                orderIndex: body.orderIndex || 0,
            }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error('[PROJECTS_POST]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
