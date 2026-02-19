import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const banners = await prisma.cmsBanner.findMany({
            where: {
                isActive: true,
                position: 'HOME_HERO',
                OR: [
                    { startDate: null },
                    { startDate: { lte: new Date() } }
                ],
                AND: [
                    {
                        OR: [
                            { endDate: null },
                            { endDate: { gte: new Date() } }
                        ]
                    }
                ]
            },
            orderBy: { order: 'asc' },
            take: 5
        });

        return NextResponse.json(banners);

    } catch (error) {
        console.error('Error fetching banners:', error);
        return NextResponse.json({ error: 'Error al obtener banners' }, { status: 500 });
    }
}
