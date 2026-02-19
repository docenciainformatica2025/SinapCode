'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        // Redirect if not authenticated
        if (!session) {
            router.push('/auth/login');
            // Store intended destination securely in sessionStorage
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('auth_redirect', '/admin');
            }
            return;
        }

        // Check permissions
        const userRole = (session.user as any)?.role;
        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT'];

        if (!allowedRoles.includes(userRole)) {
            console.warn('[ADMIN] Intento de acceso no autorizado por:', session.user?.email);
            router.push('/dashboard');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neural-blue border-r-transparent mb-4"></div>
                    <div className="text-white text-xl">Verificando seguridad...</div>
                </div>
            </div>
        );
    }

    const userRole = (session?.user as any)?.role;
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT'];

    if (!session || !allowedRoles.includes(userRole)) {
        return null;
    }

    return <>{children}</>;
}
