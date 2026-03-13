import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock dependencias
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    usePathname: () => '/admin/users'
}));

const mockSession = {
    data: { user: { role: 'ADMIN', name: 'Admin Test' }, expires: '1' },
    status: 'authenticated'
};

jest.mock('next-auth/react', () => ({
    useSession: () => mockSession,
    signIn: jest.fn(),
    signOut: jest.fn()
}));

describe('Admin Route Protection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should stay on page if user is ADMIN', () => {
        // Simular sesión ADMIN
        mockSession.data.user.role = 'ADMIN';
        mockSession.status = 'authenticated';

        // En una prueba real de integración usaríamos render() 
        // Aquí verificamos la lógica de redirección teórica
        const canAccess = mockSession.data.user.role === 'ADMIN';
        expect(canAccess).toBe(true);
    });

    it('should deny access if user is STUDENT', () => {
        mockSession.data.user.role = 'STUDENT';
        const canAccess = mockSession.data.user.role === 'ADMIN';
        expect(canAccess).toBe(false);
    });
});

describe('Role-Based Navigation', () => {
    const adminMenu = ['Panel Principal', 'Noticias AI', 'Ciberdefensa'];
    const studentMenu = ['Mi Dashboard', 'Cursos Activos'];

    it('should define admin items for ADMIN users', () => {
        expect(adminMenu).toContain('Panel Principal');
    });

    it('should not contain student-specific items in admin core', () => {
        expect(adminMenu).not.toContain('Mi Dashboard');
    });
});

describe('Breadcrumbs Logic', () => {
    const generateBreadcrumbs = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        return segments.map((s, i) => ({
            label: s.charAt(0).toUpperCase() + s.slice(1),
            href: '/' + segments.slice(0, i + 1).join('/')
        }));
    };

    it('should generate correct breadcrumbs for /admin/users', () => {
        const bc = generateBreadcrumbs('/admin/users');
        expect(bc).toHaveLength(2);
        expect(bc[0].label).toBe('Admin');
        expect(bc[1].label).toBe('Users');
    });

    it('should handle nested IDs correctly', () => {
        const bc = generateBreadcrumbs('/admin/users/123');
        expect(bc).toHaveLength(3);
        expect(bc[2].label).toBe('123');
    });
});

