
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN') {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { action } = await req.json();

        switch (action) {
            case 'db_check':
                // Check DB connection by running a simple query
                const startTime = Date.now();
                await prisma.$queryRaw`SELECT 1`;
                const duration = Date.now() - startTime;
                return NextResponse.json({
                    success: true,
                    message: `Conexión a base de datos exitosa (${duration}ms)`,
                    latency: duration
                });

            case 'clear_cache':
                // Revalidate all paths
                revalidatePath('/', 'layout');
                return NextResponse.json({
                    success: true,
                    message: 'Caché de Next.js revalidada correctamente'
                });

            default:
                return new NextResponse("Invalid action", { status: 400 });
        }
    } catch (error: any) {
        console.error('[DIAGNOSTICS_ERROR]', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Error desconocido'
        }, { status: 500 });
    }
}
