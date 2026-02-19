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

        // Obtener datos del usuario con sus relaciones
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        level: true,
                        thumbnail: true,
                    },
                    take: 5
                },
                certificates: true,
                _count: {
                    select: {
                        courses: true,
                        certificates: true,
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        // Obtener actividad reciente de los logs de auditoría
        const recentActivity = await prisma.auditLog.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: {
                id: true,
                eventType: true,
                createdAt: true,
                metadata: true,
            }
        });

        // Dashboard data con integración real
        const dashboardData = {
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                memberSince: user.createdAt,
            },
            stats: {
                totalXP: 0, // TODO: Implementar lógica de gamificación en el modelo
                activeCourses: user._count.courses,
                certificates: user._count.certificates,
                streakDays: 5, // Mock por ahora hasta tener modelo de racha o lógica de login
            },
            coursesInProgress: user.courses.map(course => ({
                id: course.id,
                title: course.title,
                slug: course.slug,
                level: course.level,
                image: course.thumbnail || '',
                progress: 0, // TODO: Implementar modelo UserProgress
            })),
            recentActivity: recentActivity.map(log => ({
                id: log.id,
                type: log.eventType,
                date: log.createdAt,
                details: (log.metadata as any)?.description || 'Actividad registrada',
            })),
        };

        return NextResponse.json(dashboardData);

    } catch (error: any) {
        // WORLD CLASS FIX: Allow DynamicServerError to bubble up. 
        // This stops Next.js from trying to statically generate this page during build time.
        if (error.digest === 'DYNAMIC_SERVER_USAGE') {
            throw error;
        }

        console.error('Error al obtener datos del dashboard:', error);
        return NextResponse.json(
            { error: 'Error al obtener datos' },
            { status: 500 }
        );
    }
}
