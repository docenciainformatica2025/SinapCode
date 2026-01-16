
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Fetch recent security relevant logs
        // Assuming 'status' field in AuditLog can store severity or action type implies severity
        // We look for failed actions or specific security events
        const logs = await prisma.auditLog.findMany({
            where: {
                OR: [
                    { status: 'error' },
                    { status: 'warning' },
                    { action: { contains: 'LOGIN_FAIL' } },
                    { action: { contains: 'DELETE' } }
                ]
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        });

        // Transform to frontend Alert format
        const alerts = logs.map(log => {
            let severity = 'info';
            if (log.status === 'error' || log.action.includes('FAIL')) severity = 'critical';
            else if (log.status === 'warning' || log.action.includes('DELETE')) severity = 'warning';

            return {
                id: log.id,
                severity,
                message: log.details || log.action,
                timestamp: formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: es }),
                source: log.user?.email || log.ipAddress || 'System'
            };
        });

        // If no alerts, return empty array (frontend handles it)
        return NextResponse.json({ alerts });

    } catch (error) {
        console.error('[SECURITY_ALERTS]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
