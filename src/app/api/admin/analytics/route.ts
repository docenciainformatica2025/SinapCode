
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN')) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Rango de fechas: Última semana
        const today = new Date();
        const start = startOfWeek(today, { weekStartsOn: 1 });
        const end = endOfWeek(today, { weekStartsOn: 1 });

        const days = eachDayOfInterval({ start, end });
        const labels = days.map(day => format(day, 'EEE', { locale: es }));

        // 1. Nuevos Registros (Usuarios creados por día)
        const newUsers = await Promise.all(days.map(async (day) => {
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);

            return await prisma.user.count({
                where: {
                    createdAt: {
                        gte: day,
                        lt: nextDay
                    }
                }
            });
        }));

        // 2. Usuarios Activos (Basado en AuditLogs o Sessions modificadas)
        // Usaremos AuditLogs como proxy de actividad si LastLogin no es fiable por día histórico
        const activeUsers = await Promise.all(days.map(async (day) => {
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);

            // Contar usuarios únicos que generaron logs ese día
            const logs = await prisma.auditLog.groupBy({
                by: ['userId'],
                where: {
                    createdAt: {
                        gte: day,
                        lt: nextDay
                    },
                    userId: { not: null }
                }
            });
            return logs.length;
        }));

        // 3. Métricas de Performance (Simulado realista si no hay agente externo, o leer de SystemMetric)
        // Por ahora, devolvemos una estructura que el frontend pueda consumir.
        // En un futuro, esto leería de una tabla de métricas reales.
        const performance = {
            apiLatency: Math.floor(Math.random() * 50) + 20, // Simulando ms
            dbQueryTime: Math.floor(Math.random() * 10) + 2,
            errorRate: 0.01
        };

        return NextResponse.json({
            usage: {
                labels,
                newUsers,
                activeUsers
            },
            performance
        });

    } catch (error) {
        console.error('[ANALYTICS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
