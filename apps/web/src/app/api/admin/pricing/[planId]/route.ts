
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const isAuthorized = async (session: any) => {
    if (!session?.user?.email) return false;
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });
    return user && ['SUPER_ADMIN', 'ADMIN'].includes(user.role);
};

// PUT: Update Plan
export async function PUT(request: Request, { params }: { params: { planId: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { planId } = params;
        const body = await request.json();
        const { name, description, price, features, interval, isPopular, isActive } = body;

        const updatedPlan = await prisma.pricingPlan.update({
            where: { id: planId },
            data: {
                name,
                description,
                price: parseFloat(price),
                features,
                interval,
                isPopular,
                isActive
            }
        });

        return NextResponse.json(updatedPlan);
    } catch (error) {
        console.error('Update Plan Error:', error);
        return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
    }
}

// DELETE: Remove Plan
export async function DELETE(request: Request, { params }: { params: { planId: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { planId } = params;
        await prisma.pricingPlan.delete({
            where: { id: planId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Plan Error:', error);
        return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
    }
}
