import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

// GET: List all testimonials (Public/Admin filtered)
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { orderIndex: 'asc' }
        });
        return NextResponse.json({ testimonials });
    } catch (error) {
        console.error('[TESTIMONIALS_GET]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

// POST: Create a new testimonial
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        // Basic validation could go here

        const newTestimonial = await prisma.testimonial.create({
            data: {
                name: body.name,
                role: body.role,
                content: body.content,
                avatarUrl: body.avatarUrl,
                rating: body.rating || 5,
                isVisible: body.isVisible ?? true,
                orderIndex: body.orderIndex || 0,
            }
        });

        return NextResponse.json(newTestimonial);
    } catch (error) {
        console.error('[TESTIMONIALS_POST]', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

// PUT: Update order or visibility
// ... (Can be expanded)
