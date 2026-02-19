import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

// Helper for Auth
const isAuthorized = async (session: any) => {
    if (!session?.user?.email) return false;
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });
    return user && ['SUPER_ADMIN', 'ADMIN'].includes(user.role);
};

export async function PUT(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, content, tags, repoUrl, liveUrl, status, thumbnail } = body;

        const updatedProject = await prisma.cmsProject.update({
            where: { id: params.projectId },
            data: {
                title,
                description,
                content,
                tags: tags || [],
                repoUrl,
                liveUrl,
                status,
                thumbnail,
            }
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error('Error al actualizar Proyecto:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!await isAuthorized(session)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await prisma.cmsProject.delete({
            where: { id: params.projectId }
        });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error al eliminar Proyecto:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
