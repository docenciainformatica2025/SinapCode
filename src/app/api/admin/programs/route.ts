import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Check authentication and role
        if (!session || !['SUPER_ADMIN', 'ADMIN'].includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const programs = await (prisma as any).program.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                modules: true,
                _count: {
                    select: { enrollments: true }
                }
            }
        });

        // Transform data for UI if needed (though UI expects camelCase/snake_case mix, careful here)
        // Prisma returns camelCase fields by default based on schema
        // But our UI was updated to expect snake_case for some fields?
        // Let's check page.tsx... page.tsx expects `program.is_published`.
        // Our Prisma schema defines `@map("is_published")` but the field name is `isPublished`.
        // Prisma client uses the field name (camelCase).
        // So we might need to map it, or update the UI.
        // It's better to return standard JSON and update UI, but for now let's map to what UI expects based on previous "mock" structure.

        const mappedPrograms = programs.map((p: any) => ({
            ...p,
            is_published: p.isPublished,
            enrolled_count: p.enrolledCount,
        }));

        return NextResponse.json({ programs: mappedPrograms });
    } catch (error) {
        console.error('Error fetching programs:', error);
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

        // Basic validation
        if (!body.title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const slug = body.slug || slugify(body.title);

        const newProgram = await (prisma as any).program.create({
            data: {
                title: body.title,
                description: body.description,
                slug: slug,
                price: body.price || 0,
                level: body.level || 'beginner',
                isPublished: false,
                instructorId: (session.user as any)?.id || 'system',
            }
        });

        return NextResponse.json({ success: true, program: newProgram });
    } catch (error) {
        console.error('Error creating program:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
