import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { id } = params;
        const body = await req.json();
        const { status, reason } = body;

        // Validation
        if (!['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED'].includes(status)) {
            return new NextResponse('Invalid status', { status: 400 });
        }

        const currentTransaction = await (prisma as any).transaction.findUnique({
            where: { id }
        });

        if (!currentTransaction) {
            return new NextResponse('Transaction not found', { status: 404 });
        }

        // Logic checks (e.g. can't refund a failed tx)
        if (status === 'REFUNDED' && currentTransaction.status !== 'COMPLETED') {
            return new NextResponse('Only completed transactions can be refunded', { status: 400 });
        }

        // Update
        const updatedTransaction = await (prisma as any).transaction.update({
            where: { id },
            data: {
                status,
                metadata: {
                    ...(currentTransaction.metadata as object || {}),
                    statusHistory: [
                        ...((currentTransaction.metadata as any)?.statusHistory || []),
                        {
                            from: currentTransaction.status,
                            to: status,
                            by: (session.user as any)?.email,
                            date: new Date().toISOString(),
                            reason: reason || 'Manual Admin Update'
                        }
                    ]
                }
            }
        });

        // Create Audit Log
        try {
            await prisma.auditLog.create({
                data: {
                    userId: (session?.user as any)?.id, // ID of admin
                    action: 'transaction.update',
                    eventType: 'UPDATE',
                    eventCategory: 'TRANSACTION',
                    entity: 'Transaction',
                    entityId: id,
                    changes: { from: currentTransaction.status, to: status, reason },
                    metadata: {
                        adminEmail: (session.user as any)?.email,
                        ip: req.headers.get('x-forwarded-for') || 'unknown'
                    }
                }
            });
        } catch (e) {
            console.error('Audit log failed', e);
        }

        return NextResponse.json(updatedTransaction);

    } catch (error) {
        console.error('[TRANSACTION_UPDATE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
