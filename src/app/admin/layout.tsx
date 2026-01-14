'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        // Redirect if not authenticated
        if (!session) {
            router.push('/auth/login?callbackUrl=/admin');
            return;
        }

        // Check if user has admin privileges
        const userRole = (session.user as any)?.role;
        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT'];

        if (!allowedRoles.includes(userRole)) {
            console.warn('[ADMIN] Unauthorized access attempt by:', session.user?.email, 'Role:', userRole);
            router.push('/dashboard');
            return;
        }
    }, [session, status, router]);

    // Show loading while checking auth
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neural-blue border-r-transparent mb-4"></div>
                    <div className="text-white text-xl">Verificando permisos...</div>
                </div>
            </div>
        );
    }

    // Don't render if not authorized
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'SUPPORT'];

    if (!session || !allowedRoles.includes(userRole)) {
        return null;
    }

    return (
        <div className="flex h-screen bg-deep-space overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
