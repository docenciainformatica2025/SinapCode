'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GlobalNavbar } from '@/components/global-navbar';

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

        // Redirect if not admin
        const userRole = (session.user as any)?.role;
        if (userRole !== 'ADMIN') {
            console.warn('[ADMIN] Unauthorized access attempt by:', session.user?.email);
            router.push('/dashboard');
            return;
        }
    }, [session, status, router]);

    // Show loading while checking auth
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <div className="text-white text-xl">Verificando permisos...</div>
            </div>
        );
    }

    // Don't render if not admin
    const userRole = (session?.user as any)?.role;
    if (!session || userRole !== 'ADMIN') {
        return null;
    }

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />
            <main className="max-w-7xl mx-auto p-8">
                {children}
            </main>
        </div>
    );
}
