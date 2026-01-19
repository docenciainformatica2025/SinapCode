
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Find the current user or any user to attach the transaction to
        const userEmail = session.user?.email;
        const user = userEmail ? await prisma.user.findFirst({
            where: { email: userEmail }
        }) : await prisma.user.findFirst();

        if (!user) {
            return new NextResponse("No user found to attach transaction", { status: 400 });
        }

        const tx = await prisma.transaction.create({
            data: {
                userId: user.id,
                amount: 197.00,
                currency: 'USD',
                status: 'COMPLETED',
                provider: 'STRIPE',
                providerTxId: `ch_${Math.random().toString(36).substring(7)}`,
                productType: 'COURSE',
                description: 'Curso Profesional de React Avanzado + Certificación',
                metadata: {
                    simulated: true,
                    ip: '127.0.0.1'
                }
            }
        });

        return NextResponse.json({ success: true, transaction: tx });

    } catch (error) {
        console.error('[TX_SIMULATE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
