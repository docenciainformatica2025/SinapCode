
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Checking courses in database...');
    const count = await prisma.course.count();
    console.log(`Found ${count} courses.`);

    if (count === 0) {
        console.log('No courses found. Seeding specific course mentioned by user...');

        // Attempt to find a valid author (admin)
        const author = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (!author) {
            console.log('No admin user found to assign course to.');
            return;
        }

        await prisma.course.create({
            data: {
                title: 'Desarrollo Web Full Stack',
                description: 'Domina el frontend y backend con React, Node.js y bases de datos modernas.',
                slug: 'desarrollo-web-full-stack-reclaimed',
                price: 99.99,
                level: 'beginner',
                isPublished: true,
                authorId: author.id,
                thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop'
            }
        });
        console.log('Course "Desarrollo Web Full Stack" created successfully.');
    } else {
        const courses = await prisma.course.findMany({ select: { title: true, isPublished: true } });
        console.log('Existing courses:', courses);
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
