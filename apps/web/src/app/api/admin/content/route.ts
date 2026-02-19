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

        const posts = await prisma.cmsPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: { name: true, email: true }
                }
            }
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error en la API de Contenido:', error);
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
        const { title, excerpt, content, category, tags, status, coverImage } = body;

        const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const randomSuffix = Math.floor(Math.random() * 1000);
        const slug = `${baseSlug}-${randomSuffix}`;

        const newPost = await prisma.cmsPost.create({
            data: {
                title,
                excerpt,
                content,
                category,
                tags: tags || [],
                status: status || 'DRAFT',
                slug,
                coverImage,
                author: { connect: { email: session?.user?.email! } }
            }
        });

        return NextResponse.json(newPost);
    } catch (error) {
        console.error('Error al crear Publicación:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { id, title, excerpt, content, category, tags, status, coverImage } = body;

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        const updatedPost = await prisma.cmsPost.update({
            where: { id },
            data: {
                title,
                excerpt,
                content,
                category,
                tags,
                status,
                coverImage,
            }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error al actualizar Publicación:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.cmsPost.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar Publicación:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
