import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);

    } catch (error: any) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Error al obtener perfil' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name } = body;

        // Validar datos
        if (!name || name.trim().length < 2) {
            return NextResponse.json(
                { error: 'El nombre debe tener al menos 2 caracteres' },
                { status: 400 }
            );
        }

        // Actualizar usuario
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: name.trim(),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                updatedAt: true,
            }
        });

        return NextResponse.json({
            success: true,
            user: updatedUser
        });

    } catch (error: any) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Error al actualizar perfil' },
            { status: 500 }
        );
    }
}
