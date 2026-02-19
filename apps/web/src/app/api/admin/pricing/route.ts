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

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const plans = await prisma.pricingPlan.findMany({
            orderBy: { price: 'asc' }
        });
        return NextResponse.json({ plans });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { name, description, price, features, interval, isPopular } = body;

        const newPlan = await prisma.pricingPlan.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                features: features || [], // Array of strings
                interval,
                isPopular
            }
        });

        return NextResponse.json(newPlan);
    } catch (error) {
        console.error('Error al crear Plan:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
