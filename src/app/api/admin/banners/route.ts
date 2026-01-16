import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !['SUPER_ADMIN', 'ADMIN'].includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const banners = await (prisma as any).banner.findMany({
            orderBy: { priority: 'desc' }
        });

        // Mapping for UI compatibility (expects snake_case)
        const mappedBanners = banners.map((b: any) => ({
            ...b,
            is_active: b.isActive,
            image_url: b.imageUrl,
            start_date: b.startDate,
            end_date: b.endDate,
        }));

        return NextResponse.json({ banners: mappedBanners });
    } catch (error) {
        console.error('Error fetching banners:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !['SUPER_ADMIN', 'ADMIN'].includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const newBanner = await (prisma as any).banner.create({
            data: {
                title: body.title,
                imageUrl: body.imageUrl,
                linkUrl: body.linkUrl,
                position: body.position || 'hero',
                isActive: body.isActive ?? false,
                createdBy: (session.user as any)?.id || 'system',
            }
        });

        return NextResponse.json({ success: true, banner: newBanner });

    } catch (error) {
        console.error('Error creating banner:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
