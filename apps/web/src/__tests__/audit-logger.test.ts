import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { createAuditLog } from '@/lib/audit-logger';
import { prisma } from '@/lib/prisma';

// Mock prisma
jest.mock('@/lib/prisma', () => ({
    prisma: {
        auditLog: {
            create: jest.fn()
        }
    }
}));

describe('Audit Logger', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create an audit log entry using createAuditLog', async () => {
        const mockData = {
            userId: 'admin-1',
            eventType: 'user.login',
            eventCategory: 'SECURITY' as const,
            eventData: { ip: '127.0.0.1' }
        };

        await createAuditLog(mockData);

        expect(prisma.auditLog.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                userId: 'admin-1',
                eventType: 'user.login',
                eventCategory: 'SECURITY'
            })
        });
    });

    it('should handle errors gracefully without crashing', async () => {
        (prisma.auditLog.create as jest.Mock).mockRejectedValue(new Error('DB Error'));

        // Should not throw
        await expect(createAuditLog({
            eventType: 'TEST',
            eventCategory: 'SECURITY',
            eventData: {}
        })).resolves.not.toThrow();
    });
});
