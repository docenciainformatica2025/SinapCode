import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function ensureAdminUser() {
    try {
        console.log('🔍 Verificando usuario admin...');

        // Buscar usuario admin existente
        const adminUser = await prisma.user.findFirst({
            where: {
                role: 'ADMIN'
            }
        });

        if (adminUser) {
            console.log('✅ Usuario admin encontrado:', adminUser.email);
            console.log('   ID:', adminUser.id);
            console.log('   Nombre:', adminUser.name);
            console.log('   Rol:', adminUser.role);
            return adminUser;
        }

        console.log('⚠️  No se encontró usuario admin');
        console.log('📝 Creando usuario admin de prueba...');

        // Crear usuario admin
        const hashedPassword = await bcrypt.hash('Admin123!', 10);

        const newAdmin = await prisma.user.create({
            data: {
                email: 'admin@sinapcode.com',
                name: 'Administrador',
                password: hashedPassword,
                role: 'ADMIN',
                emailVerified: new Date()
            }
        });

        console.log('✅ Usuario admin creado exitosamente:');
        console.log('   Email: admin@sinapcode.com');
        console.log('   Password: Admin123!');
        console.log('   ID:', newAdmin.id);

        return newAdmin;

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

ensureAdminUser()
    .then(() => {
        console.log('\n✨ Proceso completado');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Error fatal:', error);
        process.exit(1);
    });
