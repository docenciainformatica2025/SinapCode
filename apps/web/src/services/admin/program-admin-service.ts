import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit-logger";

export class ProgramAdminService {
    /**
     * Crea o actualiza un programa con auditoría y generación de slug
     */
    static async upsertProgram(params: {
        adminId: string;
        id?: string;
        data: {
            title: string;
            description: string;
            price: number;
            level: string;
            thumbnail?: string;
            isPublished?: boolean;
        }
    }) {
        const { adminId, id, data } = params;
        const { title, description, price, level, thumbnail, isPublished } = data;

        const slug = id ? undefined : `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Math.floor(Math.random() * 1000)}`;

        const programData = {
            title,
            description,
            price: price || 0,
            level: level || 'beginner',
            thumbnail,
            isPublished: isPublished || false,
            ...(slug && { slug }),
            ...(id ? {} : { author: { connect: { id: adminId } } })
        };

        const result = id
            ? await prisma.course.update({ where: { id }, data: programData })
            : await prisma.course.create({ data: programData as any });

        await createAuditLog({
            userId: adminId,
            eventType: id ? 'program.update' : 'program.create',
            eventCategory: 'DATA',
            eventData: { programId: result.id, title }
        });

        return result;
    }

    /**
     * Implementa Soft-Delete simétrico al módulo de usuarios
     */
    static async softDeleteProgram(adminId: string, programId: string) {
        const program = await prisma.course.findUnique({
            where: { id: programId },
            select: { title: true }
        });

        if (!program) throw new Error('NOT_FOUND');

        const result = await prisma.course.update({
            where: { id: programId },
            data: { deletedAt: new Date() }
        });

        await createAuditLog({
            userId: adminId,
            eventType: 'program.delete',
            eventCategory: 'DATA',
            eventData: { programId, title: program.title, action: 'soft_delete' }
        });

        return { success: true };
    }
}
