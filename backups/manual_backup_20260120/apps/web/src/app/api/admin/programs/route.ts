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

        const programs = await prisma.course.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { modules: true }
                }
            }
        });

        return NextResponse.json({ programs });
    } catch (error) {
        console.error('Programs API Error:', error);
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
        const { title, description, price, level, thumbnail, isPublished } = body;

        const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const randomSuffix = Math.floor(Math.random() * 1000);
        const slug = `${baseSlug}-${randomSuffix}`;

        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                price: parseFloat(price) || 0,
                level: level || 'beginner',
                thumbnail,
                isPublished: isPublished || false,
                slug,
                author: { connect: { email: session?.user?.email! } }
            }
        });

        return NextResponse.json(newCourse);
    } catch (error) {
        console.error('Create Course Error:', error);
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }
}
