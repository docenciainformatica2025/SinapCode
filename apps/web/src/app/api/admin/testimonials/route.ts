
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

        const testimonials = await prisma.cmsTestimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ testimonials });
    } catch (error) {
        console.error('Error al obtener testimonios (GET):', error);
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
        const { authorName, authorRole, authorImage, content, rating, company, companyLogo, status, featured } = body;

        const newTestimonial = await prisma.cmsTestimonial.create({
            data: {
                authorName,
                authorRole,
                authorImage,
                content,
                rating: parseInt(rating) || 5,
                company,
                companyLogo,
                status: status || 'DRAFT',
                featured: featured || false,
            }
        });

        return NextResponse.json(newTestimonial);
    } catch (error) {
        console.error('Error al crear testimonio (POST):', error);
        return NextResponse.json({ error: 'Error al crear el testimonio' }, { status: 500 });
    }
}
