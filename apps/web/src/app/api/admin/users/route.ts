import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

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

        // Obtener todos los usuarios (excluyendo eliminados)
        const users = await prisma.user.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
                lastLoginAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Formatear datos para el frontend con validación estricta
        const formattedUsers = users.map((user: any) => {
            // Validate and sanitize each field
            const id = String(user.id || '');
            const name = String(user.name || 'Sin nombre').trim();
            const email = String(user.email || 'Sin email').trim().toLowerCase();
            const role = String(user.role || 'STUDENT');

            // Determine status with proper type safety
            let status: 'active' | 'suspended' | 'pending' = 'pending';
            if (user.emailVerified !== null && user.emailVerified !== undefined) {
                status = 'active';
            }

            return {
                id,
                name,
                email,
                role,
                status,
                lastLogin: user.lastLoginAt ? formatRelativeTime(user.lastLoginAt) : null,
                createdAt: user.createdAt.toISOString().split('T')[0],
            };
        });

        return NextResponse.json({
            users: formattedUsers,
            total: users.length
        });

    } catch (error: any) {
        // Log error securely (never expose stack traces in production)
        console.error('[API /admin/users] Error:', {
            mensaje: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });

        // Return generic error message (security best practice)
        return NextResponse.json(
            { error: 'Error al cargar usuarios' },
            { status: 500 }
        );
    }
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Hace un momento';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} horas`;
    if (seconds < 604800) return `Hace ${Math.floor(seconds / 86400)} días`;

    return date.toISOString().split('T')[0];
}
