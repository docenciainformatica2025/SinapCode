
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Pricing Plans...');
    const count = await prisma.pricingPlan.count();

    if (count > 0) {
        console.log(`Found ${count} plans. Skipping seed.`);
        return;
    }

    const plans = [
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
    ];

    for (const plan of plans) {
        await prisma.pricingPlan.create({ data: plan });
        console.log(`Created plan: ${plan.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
