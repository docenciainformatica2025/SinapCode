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

        const { searchParams } = new URL(request.url);
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '50')));
        const skip = (page - 1) * limit;

        const total = await prisma.course.count({
            where: { deletedAt: null }
        });

        const programs = await prisma.course.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { modules: true }
                }
            },
            skip,
            take: limit
        });

        return NextResponse.json({
            programs,
            pagination: {
                total,
                page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error en la API de programas (GET):', error);
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
        console.error('Error al crear curso (POST):', error);
        return NextResponse.json({ error: 'Error al crear el curso' }, { status: 500 });
    }
}
