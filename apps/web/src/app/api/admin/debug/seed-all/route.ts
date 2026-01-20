
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const results = {
        pricing: '',
        courses: '',
    };

    try {
        // 1. Seed Pricing
        const pricingCount = await prisma.pricingPlan.count();
        if (pricingCount === 0) {
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
            results.pricing = 'Seeded 3 plans.';
        } else {
            results.pricing = `Found ${pricingCount} plans.`;
        }

        // 2. Seed Courses (if empty)
        const coursesCount = await prisma.course.count();
        if (coursesCount === 0) {
            const author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
            if (author) {
                await prisma.course.create({
                    data: {
                        title: 'Desarrollo Web Full Stack',
                        description: 'Domina el frontend y backend con React, Node.js y bases de datos modernas.',
                        slug: `desarrollo-web-full-stack-${Date.now()}`,
                        price: 99.99,
                        level: 'beginner',
                        isPublished: true,
                        authorId: author.id,
                        thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop'
                    }
                });
                results.courses = 'Seeded 1 course because none were found.';
            } else {
                results.courses = 'No admin user found to assign course.';
            }
        } else {
            results.courses = `Found ${coursesCount} courses.`;
        }

        return NextResponse.json({ success: true, results });

    } catch (error: any) {
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
