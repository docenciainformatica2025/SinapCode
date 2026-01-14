import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        // Obtener datos del usuario
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        // Por ahora, datos de ejemplo para cursos
        // TODO: Crear modelo de Cursos y Progreso en Prisma
        const dashboardData = {
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                memberSince: user.createdAt,
            },
            stats: {
                totalXP: 0,
                activeCourses: 0,
                certificates: 0,
                streakDays: 0,
            },
            coursesInProgress: [],
            recentActivity: [],
        };

        return NextResponse.json(dashboardData);

    } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json(
            { error: 'Error al obtener datos' },
            { status: 500 }
        );
    }
}
