
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- VERIFICANDO USUARIOS ---');
    const userCount = await prisma.user.count();
    console.log(`Total usuarios: ${userCount}`);

    const users = await prisma.user.findMany({ select: { id: true, email: true, role: true } });
    console.table(users);

    console.log('\n--- VERIFICANDO TRANSACCIONES ---');
    const txCount = await prisma.transaction.count();
    console.log(`Total transacciones: ${txCount}`);

    const txs = await prisma.transaction.findMany({
        include: { user: { select: { email: true } } }
    });
    console.log(JSON.stringify(txs, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
