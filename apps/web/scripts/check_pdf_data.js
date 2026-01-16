const path = require('path');
// Adjust path to point to apps/web/.env
require('dotenv').config({ path: path.join(__dirname, '../apps/web/.env') });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkConsents() {
    const email = 'docenciainformatica2025@gmail.com';
    console.log(`Checking data for: ${email}`);

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                legalConsents: true,
                _count: {
                    select: { legalConsents: true }
                }
            }
        });

        if (!user) {
            console.log('User not found!');
            return;
        }

        console.log(`User ID: ${user.id}`);
        console.log(`Role: ${user.role}`);
        console.log(`Consents Count: ${user._count.legalConsents}`);

        if (user.legalConsents.length > 0) {
            console.log('Consents found:');
            console.table(user.legalConsents.map(c => ({
                Type: c.documentType,
                Version: c.documentVersion,
                Date: c.acceptedAt,
                Method: c.consentMethod
            })));
        } else {
            console.warn('WARNING: No legal consents found for this user.');
        }

    } catch (error) {
        console.error('Error querying DB:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkConsents();
