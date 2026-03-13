import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { ProgramAdminService } from "@/services/admin/program-admin-service";
import { prisma } from "@/lib/prisma";

async function getAdminSession() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true }
    });

    if (!user || !['SUPER_ADMIN', 'ADMIN'].includes(user.role)) return null;
    return user;
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const admin = await getAdminSession();
        if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

        const program = await prisma.course.findUnique({
            where: { id: params.id },
            include: { modules: { orderBy: { order: 'asc' } } }
        });

        if (!program) return NextResponse.json({ error: 'Programa no encontrado' }, { status: 404 });
        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener programa' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const admin = await getAdminSession();
        if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

        const body = await request.json();
        const updatedProgram = await ProgramAdminService.upsertProgram({
            adminId: admin.id,
            id: params.id,
            data: body
        });

        return NextResponse.json(updatedProgram);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el programa' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const admin = await getAdminSession();
        if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

        await ProgramAdminService.softDeleteProgram(admin.id, params.id);
        return NextResponse.json({ success: true, message: 'Programa eliminado correctamente (soft-delete)' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
