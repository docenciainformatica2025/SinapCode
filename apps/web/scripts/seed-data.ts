
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting Seeding Process...');

    // 1. Seed Pricing Plans
    console.log('Checking Pricing Plans...');
    const pricingCount = await prisma.pricingPlan.count();
    if (pricingCount === 0) {
        console.log('Adding default Pricing Plans...');
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
        console.log('✅ Pricing Plans seeded.');
    } else {
        console.log('ℹ️ Pricing Plans already exist.');
    }

    // 2. Seed Courses
    console.log('Checking Courses...');
    const coursesCount = await prisma.course.count();
    if (coursesCount === 0) {
        console.log('Adding "Desarrollo Web Full Stack" course...');

        // Find an author
        const author = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || await prisma.user.findFirst();

        if (author) {
            await prisma.course.create({
                data: {
                    title: 'Desarrollo Web Full Stack',
                    description: 'Domina el frontend y backend con React, Node.js y bases de datos modernas. El curso más completo para convertirte en Senior.',
                    slug: 'desarrollo-web-full-stack',
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
            console.log('✅ Course seeded.');
        } else {
            console.warn('⚠️ No user found to assign course to. Skipping course seed.');
        }
    } else {
        console.log('ℹ️ Courses already exist.');
    }

    console.log('✨ Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
