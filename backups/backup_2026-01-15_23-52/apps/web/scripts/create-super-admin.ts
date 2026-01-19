import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSuperAdmin() {
    try {
        console.log('🔐 Creando Super Usuario Admin...\n');

        // Check if super admin already exists
        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: 'admin@sinapcode.com' },
                    { role: 'SUPER_ADMIN' }
                ]
            }
        });

        if (existing) {
            console.log('⚠️  Super Admin ya existe:');
            console.log(`   Email: ${existing.email}`);
            console.log(`   Rol: ${existing.role}`);
            console.log(`   ID: ${existing.id}\n`);

            // Update to SUPER_ADMIN if needed
            if (existing.role !== 'SUPER_ADMIN') {
                await prisma.user.update({
                    where: { id: existing.id },
                    data: { role: 'SUPER_ADMIN' }
                });
                console.log('✅ Rol actualizado a SUPER_ADMIN\n');
            }

            return existing;
        }

        // Create super admin
        const hashedPassword = await bcrypt.hash('SuperAdmin2026!', 12);

        const superAdmin = await prisma.user.create({
            data: {
                email: 'admin@sinapcode.com',
                name: 'Super Administrador',
                password: hashedPassword,
                role: 'SUPER_ADMIN',
                emailVerified: new Date(),
                mfaEnabled: false, // Enable MFA manually later
            }
        });

        console.log('✅ Super Admin creado exitosamente!\n');
        console.log('📧 Email: admin@sinapcode.com');
        console.log('🔑 Password: SuperAdmin2026!');
        console.log(`🆔 ID: ${superAdmin.id}`);
        console.log(`👤 Rol: ${superAdmin.role}\n`);
        console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
        console.log('⚠️  RECOMENDADO: Habilita MFA (Multi-Factor Authentication)\n');

        // Create initial audit log
        await prisma.auditLog.create({
            data: {
                userId: superAdmin.id,
                action: 'user.create.super_admin',
                entity: 'User',
                entityId: superAdmin.id,
                ipAddress: '127.0.0.1',
                userAgent: 'Setup Script',
                result: 'success',
                metadata: {
                    note: 'Initial super admin creation via setup script'
                }
            }
        });

        console.log('📝 Audit log creado\n');

        return superAdmin;

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

createSuperAdmin()
    .then(() => {
        console.log('✨ Setup completado exitosamente');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Error fatal:', error);
        process.exit(1);
    });
