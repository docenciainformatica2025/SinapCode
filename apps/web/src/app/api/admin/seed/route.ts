
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

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await request.json();
        const { type } = body; // 'pricing', 'courses', 'blog', 'testimonials'

        if (type === 'pricing') {
            const count = await prisma.pricingPlan.count();
            if (count > 0) return NextResponse.json({ message: 'Los planes ya existen', seeded: false });

            await prisma.pricingPlan.createMany({
                data: [
                    {
                        name: 'Starter',
                        description: 'Ideal para estudiantes y autodidactas.',
                        price: 0,
                        interval: 'MONTHLY',
                        features: ['Acceso a cursos básicos', 'Certificados de participación', 'Comunidad en Discord'],
                        isPopular: false,
                        isActive: true
                    },
                    {
                        name: 'Pro',
                        description: 'Para desarrolladores que quieren acelerar.',
                        price: 29.99,
                        interval: 'MONTHLY',
                        features: ['Todo lo de Starter', 'Mentoria mensual', 'Proyectos reales', 'Revisión de código', 'Acceso anticipado a contenido'],
                        isPopular: true,
                        isActive: true
                    },
                    {
                        name: 'Lifetime',
                        description: 'Pago único, acceso de por vida.',
                        price: 299.99,
                        interval: 'ONETIME',
                        features: ['Todo lo de Pro', 'Acceso de por vida', 'Soporte prioritario', 'Merch exclusivo', 'Eventos VIP'],
                        isPopular: false,
                        isActive: true
                    }
                ]
            });
            return NextResponse.json({ message: 'Planes de precios sembrados', seeded: true });
        }

        if (type === 'courses') {
            const count = await prisma.course.count();
            if (count > 0) return NextResponse.json({ message: 'Los cursos ya existen', seeded: false });

            const author = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || await prisma.user.findFirst();
            if (!author) return NextResponse.json({ error: 'No se encontró un usuario administrador' }, { status: 400 });

            await prisma.course.create({
                data: {
                    title: 'Desarrollo Web Full Stack',
                    description: 'Domina el frontend y backend con React, Node.js y bases de datos modernas. El curso más completo para convertirte en Senior.',
                    slug: `desarrollo-web-full-stack-${Date.now()}`,
                    price: 99.99,
                    level: 'beginner',
                    isPublished: true,
                    authorId: author.id,
                    thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop',
                    modules: {
                        create: [
                            { title: 'Introducción a la Web', order: 1, description: 'Protocolos HTTP, DNS y cómo funciona internet.' },
                            { title: 'HTML & CSS Moderno', order: 2, description: 'Flexbox, Grid y Semántica.' },
                            { title: 'JavaScript Avanzado', order: 3, description: 'ES6+, Async/Await y DOM.' }
                        ]
                    }
                }
            });
            return NextResponse.json({ message: 'Curso sembrado', seeded: true });
        }

        if (type === 'blog') {
            const count = await prisma.cmsPost.count();
            if (count > 0) return NextResponse.json({ message: 'Las publicaciones ya existen', seeded: false });

            const author = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || await prisma.user.findFirst();
            if (!author) return NextResponse.json({ error: 'No se encontró un usuario administrador' }, { status: 400 });

            await prisma.cmsPost.createMany({
                data: [
                    {
                        title: 'El Futuro de la IA en el Desarrollo',
                        excerpt: 'Cómo la inteligencia artificial está redefiniendo nuestro trabajo diario.',
                        content: 'Contenido completo sobre IA...',
                        slug: 'futuro-ia-desarrollo',
                        category: 'Tecnología',
                        status: 'PUBLISHED',
                        authorId: author.id,
                        readingTime: 5
                    }
                ]
            });
            return NextResponse.json({ message: 'Publicaciones del blog sembradas', seeded: true });
        }

        if (type === 'testimonials') {
            const count = await prisma.cmsTestimonial.count();
            if (count > 0) return NextResponse.json({ message: 'Los testimonios ya existen', seeded: false });

            await prisma.cmsTestimonial.createMany({
                data: [
                    {
                        authorName: 'Alex Rivera',
                        authorRole: 'Frontend Dev',
                        content: 'SinapCode transformó mi carrera. Los cursos son prácticos y directos al grano.',
                        rating: 5,
                        company: 'TechFlow',
                        status: 'PUBLISHED',
                        featured: true
                    },
                    {
                        authorName: 'Elena Martínez',
                        authorRole: 'Full Stack Engineer',
                        content: 'La mejor plataforma para aprender tecnologías modernas en español. Recomendado 100%.',
                        rating: 5,
                        company: 'StartupX',
                        status: 'PUBLISHED',
                        featured: true
                    }
                ]
            });
            return NextResponse.json({ message: 'Testimonios sembrados', seeded: true });
        }

        return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });

    } catch (error) {
        console.error('Error en el sembrado (Seed):', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
