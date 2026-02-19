import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
// import { Prisma } from '@prisma/client';

// SECURITY: Only ADMIN/SUPER_ADMIN can manage projectss
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
        // Public read is usually allowed for projects, but this is admin list so maybe secure it?
        // Let's secure it as it returns draft items too.
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const projects = await prisma.cmsProject.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error en la API de proyectos (GET):', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, content, tags, repoUrl, liveUrl, status, thumbnail } = body;

        // Auto-generate slug
        const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const randomSuffix = Math.floor(Math.random() * 1000);
        const slug = `${baseSlug}-${randomSuffix}`;

        const newProject = await prisma.cmsProject.create({
            data: {
                title,
                description,
                content,
                tags: tags || [],
                repoUrl,
                liveUrl,
                status: status || 'DRAFT',
                slug,
                thumbnail,
                author: { connect: { email: session?.user?.email! } }
            }
        });

        return NextResponse.json(newProject);
    } catch (error) {
        console.error('Error al crear proyecto (POST):', error);
        return NextResponse.json({ error: 'Error al crear el proyecto' }, { status: 500 });
    }
}
