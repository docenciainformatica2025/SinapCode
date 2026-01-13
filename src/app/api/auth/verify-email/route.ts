import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: 'Token requerido' },
                { status: 400 }
            );
        }

        // Buscar token
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        });

        if (!verificationToken) {
            return NextResponse.json(
                { error: 'Token inválido o ya utilizado' },
                { status: 400 }
            );
        }

        // Verificar expiración
        if (new Date() > verificationToken.expires) {
            // Eliminar token expirado
            await prisma.verificationToken.delete({
                where: { token }
            });
            return NextResponse.json(
                { error: 'Token expirado. Por favor, solicita un nuevo email de verificación.' },
                { status: 400 }
            );
        }

        // Actualizar usuario
        const user = await prisma.user.update({
            where: { email: verificationToken.identifier },
            data: { emailVerified: new Date() }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        // Eliminar token usado
        await prisma.verificationToken.delete({
            where: { token }
        });

        return NextResponse.json({
            success: true,
            message: 'Email verificado exitosamente'
        });

    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json(
            { error: 'Error al verificar email. Por favor, intenta de nuevo.' },
            { status: 500 }
        );
    }
}
