import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSuperAdmin() {
    try {
        console.log('🔐 Creando Super Usuario Admin...\n');

        // Buscar usuario existente con el email específico
        const existing = await prisma.user.findUnique({
            where: {
                email: 'antonio_rburgos@msn.com'
            }
        });

        if (existing) {
            console.log('⚠️  Usuario ya existe:');
            console.log(`   Email: ${existing.email}`);
            console.log(`   Rol actual: ${existing.role}`);
            console.log(`   ID: ${existing.id}\n`);

            // Actualizar a SUPER_ADMIN y cambiar password
            const hashedPassword = await bcrypt.hash('Tomiko@6532', 12);

            const updated = await prisma.user.update({
                where: { id: existing.id },
                data: {
                    role: 'ADMIN', // Usar ADMIN temporalmente hasta que se sincronice el schema
                    password: hashedPassword,
                    emailVerified: new Date(),
                    name: 'Antonio Burgos'
                }
            });

            console.log('✅ Usuario actualizado exitosamente!\n');
            console.log('📧 Email: antonio_rburgos@msn.com');
            console.log('🔑 Password: Tomiko@6532');
            console.log(`👤 Rol: ${updated.role}\n`);

            return updated;
        }

        // Crear nuevo super admin
        const hashedPassword = await bcrypt.hash('Tomiko@6532', 12);

        const superAdmin = await prisma.user.create({
            data: {
                email: 'antonio_rburgos@msn.com',
                name: 'Antonio Burgos',
                password: hashedPassword,
                role: 'ADMIN', // Usar ADMIN temporalmente
                emailVerified: new Date(),
            }
        });

        console.log('✅ Super Admin creado exitosamente!\n');
        console.log('📧 Email: antonio_rburgos@msn.com');
        console.log('🔑 Password: Tomiko@6532');
        console.log(`🆔 ID: ${superAdmin.id}`);
        console.log(`👤 Rol: ${superAdmin.role}\n`);
        console.log('✨ Ya puedes iniciar sesión en /auth/login\n');

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
