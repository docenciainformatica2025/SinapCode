import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // Last 6 months incl current
        sixMonthsAgo.setDate(1); // Start of month

        // Fetch raw data
        // @ts-ignore: Dynamic access
        const transactions = await (prisma as any).transaction.findMany({
            where: {
                status: 'COMPLETED',
                createdAt: { gte: sixMonthsAgo }
            },
            select: {
                amount: true,
                createdAt: true
            }
        });

        // Group by Month
        const monthlyData: Record<string, number> = {};

        // Initialize last 6 months with 0
        for (let i = 0; i < 6; i++) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = d.toLocaleString('en-US', { month: 'short' }); // "Jan", "Feb"
            monthlyData[key] = 0;
        }

        // Aggregate
        transactions.forEach((tx: any) => {
            const month = new Date(tx.createdAt).toLocaleString('en-US', { month: 'short' });
            if (monthlyData[month] !== undefined) {
                monthlyData[month] += Number(tx.amount);
            }
        });

        // Format for Recharts (Order chronologically is hard with object keys, so we rebuild array)
        // Better approach: build array of keys in correct order
        const monthsOrdered = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            monthsOrdered.push(d.toLocaleString('en-US', { month: 'short' }));
        }

        const chartData = monthsOrdered.map(month => ({
            name: month,
            revenue: monthlyData[month] || 0
        }));

        // Calculate growth (Simple comparison last month vs previous)
        const currentRevenue = chartData[chartData.length - 1].revenue;
        const prevRevenue = chartData[chartData.length - 2]?.revenue || 1; // Avoid div/0
        const growth = prevRevenue === 0 ? 100 : ((currentRevenue - prevRevenue) / prevRevenue) * 100;

        return NextResponse.json({
            data: chartData,
            meta: {
                growth: growth.toFixed(1),
                total: chartData.reduce((acc, curr) => acc + curr.revenue, 0)
            }
        });

    } catch (error) {
        console.error('[FINANCIAL_ANALYTICS]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
