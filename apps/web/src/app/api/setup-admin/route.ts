import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// IMPORTANTE: Este endpoint debe ser eliminado después de crear el usuario
// O protegido con un secret key

export async function POST(request: Request) {
    try {
        const { secret } = await request.json();

        // Protección básica - cambiar este secret
        if (secret !== 'create-super-admin-2026') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verificar si el usuario ya existe
        const existing = await prisma.user.findUnique({
            where: { email: 'antonio_rburgos@msn.com' }
        });

        if (existing) {
            // Actualizar usuario existente
            const hashedPassword = await bcrypt.hash('Tomiko@6532', 12);

            const updated = await prisma.user.update({
                where: { id: existing.id },
                data: {
                    password: hashedPassword,
                    role: 'ADMIN',
                    emailVerified: new Date(),
                    name: 'Antonio Burgos'
                }
            });

            return NextResponse.json({
                success: true,
                message: 'Usuario actualizado',
                user: {
                    id: updated.id,
                    email: updated.email,
                    role: updated.role
                }
            });
        }

        // Crear nuevo usuario
        const hashedPassword = await bcrypt.hash('Tomiko@6532', 12);

        const user = await prisma.user.create({
            data: {
                email: 'antonio_rburgos@msn.com',
                name: 'Antonio Burgos',
                password: hashedPassword,
                role: 'ADMIN',
                emailVerified: new Date(),
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Super admin creado exitosamente',
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        console.error('Error creating super admin:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
