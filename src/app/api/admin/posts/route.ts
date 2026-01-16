import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { slugify } from '@/lib/utils';

// GET: List all posts (Public/Admin filtered)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const post = await prisma.blogPost.findUnique({
                where: { slug },
                include: { author: { select: { name: true, image: true } } }
            });
            return NextResponse.json(post);
        }

        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { name: true, image: true } } }
        });
        return NextResponse.json({ posts });
    } catch (error) {
        console.error('[BLOG_GET]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

// POST: Create new post
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const slug = body.slug || slugify(body.title);

        const post = await prisma.blogPost.create({
            data: {
                title: body.title,
                slug,
                excerpt: body.excerpt,
                content: body.content,
                coverImage: body.coverImage,
                authorId: (session.user as any)?.id, // Safe cast as we checked session
                isPublished: body.isPublished ?? false,
                publishedAt: body.isPublished ? new Date() : null,
                tags: body.tags || [],
                seoTitle: body.seoTitle,
                seoDesc: body.seoDesc,
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('[BLOG_POST]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
