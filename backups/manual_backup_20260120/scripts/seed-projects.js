const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const projects = [
    {
        title: 'Bot de Trading con IA',
        student: 'Carlos M.',
        role: 'Backend Python',
        imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800',
        description: 'Algoritmo que analiza sentimiento en Twitter para predecir movimientos de crypto. +45% de rentabilidad en simulación.',
        tags: ['Python', 'NLP', 'Binance API'],
    },
    {
        title: 'DeFi Dashboard',
        student: 'Ana R.',
        role: 'Full Stack Web3',
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-ad7117a3a635?auto=format&fit=crop&q=80&w=800',
        description: 'Panel visual para gestionar staking en múltiples cadenas. Integra wallets reales y calcula APY en tiempo real.',
        tags: ['Next.js', 'Solidity', 'Ethers.js'],
    },
    {
        title: 'SaaS de Ciberseguridad',
        student: 'David L.',
        role: 'SecDevOps',
        imageUrl: 'https://images.unsplash.com/photo-1563206767-5b1d972d9fb7?auto=format&fit=crop&q=80&w=800',
        description: 'Plataforma automatizada que escanea vulnerabilidades en repositorios de GitHub al hacer push. Uso real en 3 empresas.',
        tags: ['Python', 'Docker', 'AWS'],
    }
];

async function main() {
    console.log('🌱 Seeding projects...');

    // Optional: Clear existing projects correctly
    // await prisma.project.deleteMany({}); 

    for (const project of projects) {
        // Check if exists to avoid duplicates
        const existing = await prisma.project.findFirst({
            where: { title: project.title }
        });

        if (!existing) {
            await prisma.project.create({
                data: project
            });
            console.log(`✅ Created project: ${project.title}`);
        } else {
            console.log(`⚠️ Project already exists: ${project.title}`);
        }
    }

    console.log('✨ Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
