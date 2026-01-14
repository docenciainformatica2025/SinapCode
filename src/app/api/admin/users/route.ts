import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'No autenticado' },
                { status: 401 }
            );
        }

        // Verificar que el usuario sea admin
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true }
        });

        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'];
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 403 }
            );
        }

        // Obtener todos los usuarios
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Formatear datos para el frontend
        const formattedUsers = users.map(user => ({
            id: user.id,
            name: user.name || 'Sin nombre',
            email: user.email || 'Sin email',
            role: user.role,
            status: user.emailVerified ? 'active' : 'pending',
            lastLogin: 'N/A', // TODO: Agregar campo lastLoginAt al schema
            createdAt: user.createdAt.toISOString().split('T')[0],
        }));

        return NextResponse.json({
            users: formattedUsers,
            total: users.length
        });

    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Error al obtener usuarios' },
            { status: 500 }
        );
    }
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

    return date.toISOString().split('T')[0];
}
