
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN')) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        // 1. User Metrics
        const [totalUsers, newUsers24h] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { createdAt: { gte: oneDayAgo } } })
        ]);

        // 2. Active Users (Users with audit logs in last 24h)
        const activeUsersLogs = await prisma.auditLog.groupBy({
            by: ['userId'],
            where: { createdAt: { gte: oneDayAgo }, userId: { not: null } }
        });
        const activeUsers24h = activeUsersLogs.length;

        // 3. Live Users (Logs in last 5 mins)
        const liveUsersLogs = await prisma.auditLog.groupBy({
            by: ['userId'],
            where: { createdAt: { gte: fiveMinutesAgo }, userId: { not: null } }
        });
        const liveUsers = liveUsersLogs.length;

        // 4. Content Metrics
        const activeCourses = await prisma.program.count({
            where: { isPublished: true }
        });

        // 5. Revenue (Real Financial Data)
        // @ts-ignore: Dynamic model access
        const revenueAgg = await (prisma as any).transaction.aggregate({
            _sum: { amount: true },
            where: { status: 'COMPLETED' }
        });
        const totalRevenue = revenueAgg._sum.amount || 0;

        // 6. System Metrics
        // @ts-ignore: Dynamic model access
        const latencyMetric = await (prisma as any).systemMetric.findFirst({
            where: { metric: 'api.response_time' },
            orderBy: { timestamp: 'desc' }
        });
        const apiLatency = latencyMetric?.value || 0;

        return NextResponse.json({
            stats: {
                totalUsers,
                newUsers24h,
                activeUsers24h,
                activeCourses,
                totalRevenue,
                liveUsers,
                apiLatency
            }
        });

    } catch (error) {
        console.error('[DASHBOARD_STATS]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
