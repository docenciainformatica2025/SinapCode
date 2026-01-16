
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

// Helper for slugs
function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        await limiter.check(NextResponse, 20, ip);

        const body = await req.json();
        const { id } = params;

        // Validations
        if (!body.title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        const updateData: Prisma.ProgramUpdateInput = {
            title: body.title,
            slug: slugify(body.title),
            description: body.description,
            price: parseFloat(body.price),
            level: body.level,
            duration: body.duration,
            is_published: body.is_published,
            updatedAt: new Date(),
        };

        // Handling image if provided (assuming URL string)
        if (body.thumbnail_url) {
            updateData.thumbnail_url = body.thumbnail_url;
        }

        const program = await (prisma as any).program.update({
            where: { id },
            data: updateData
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: 'UPDATE_PROGRAM',
                details: `Program updated: ${program.title} (${program.id})`,
                status: 'success',
                ipAddress: '127.0.0.1' // In pro, get from headers
            }
        });

        return NextResponse.json(program);
    } catch (error) {
        console.error('[PROGRAM_PUT]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { id } = params;

        const program = await (prisma as any).program.delete({
            where: { id }
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: 'DELETE_PROGRAM',
                details: `Program deleted: ${program.title} (${program.id})`,
                status: 'warning',
                ipAddress: '127.0.0.1'
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[PROGRAM_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
