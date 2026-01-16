import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const mockBanners = [
            {
                id: '1',
                title: 'Promoción Black Friday',
                position: 'hero',
                is_active: true,
                start_date: '2024-11-20',
                end_date: '2024-11-30',
                impressions: 15234,
                clicks: 892,
                ctr: 5.85
            }
        ];

        return NextResponse.json({ banners: mockBanners });

    } catch (error) {
        console.error('Error fetching banners:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();

        return NextResponse.json({
            success: true,
            banner: { id: 'new-id', ...data }
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
