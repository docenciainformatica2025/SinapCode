import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';

        // Build filter
        const where: any = {};
        if (status && status !== 'all') {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { id: { contains: search, mode: 'insensitive' } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { user: { name: { contains: search, mode: 'insensitive' } } },
            ];
        }

        const transactions = await prisma.transaction.findMany({
            where,
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });

        // Generate CSV Content
        const headers = ['ID Transaccion', 'Cliente', 'Email', 'Monto', 'Moneda', 'Estado', 'Medio de Pago', 'Concepto', 'Fecha'];
        const csvRows = [headers.join(',')];

        for (const tx of transactions) {
            const row = [
                tx.id,
                `"${tx.user?.name || 'N/A'}"`,
                tx.user?.email || 'N/A',
                tx.amount,
                tx.currency,
                tx.status,
                tx.provider,
                `"${tx.description || ''}"`,
                tx.createdAt.toISOString()
            ];
            csvRows.push(row.join(','));
        }

        const csvContent = csvRows.join('\n');
        const filename = `SINAPCODE_TRANSACTIONS_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.csv`;

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error) {
        console.error('[CSV_EXPORT_ERROR]', error);
        return new NextResponse('Error generating CSV', { status: 500 });
    }
}
