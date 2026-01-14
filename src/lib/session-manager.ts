import { prisma } from './prisma';

/**
 * Cierra todas las sesiones activas de un usuario
 * Usado en suspensiones y eliminaciones para seguridad
 * 
 * @param userId - ID del usuario cuyas sesiones se cerrarán
 * @returns Número de sesiones cerradas
 */
export async function closeAllUserSessions(userId: string): Promise<number> {
    try {
        const result = await prisma.session.deleteMany({
            where: {
                userId,
            },
        });

        console.log(`✅ Cerradas ${result.count} sesiones del usuario ${userId}`);
        return result.count;
    } catch (error) {
        console.error('❌ Error cerrando sesiones:', error);
        throw error;
    }
}

/**
 * Verifica si un usuario tiene sesiones activas
 */
export async function hasActiveSessions(userId: string): Promise<boolean> {
    const count = await prisma.session.count({
        where: {
            userId,
            expires: {
                gt: new Date(),
            },
        },
    });

    return count > 0;
}

/**
 * Obtiene el número de sesiones activas de un usuario
 */
export async function getActiveSessionCount(userId: string): Promise<number> {
    return await prisma.session.count({
        where: {
            userId,
            expires: {
                gt: new Date(),
            },
        },
    });
}
