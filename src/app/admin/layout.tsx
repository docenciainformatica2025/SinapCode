'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { Menu } from 'lucide-react';

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
            router.push('/auth/login');
            // Store intended destination securely in sessionStorage (client-side only)
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('auth_redirect', '/admin');
            }
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

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-deep-space overflow-hidden">
            {/* Sidebar (Responsive) */}
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-16 border-b border-white/5 flex items-center px-4 justify-between bg-[#0A0A0F]">
                    <div className="font-bold text-white">SinapCode Admin</div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-platinum-dim hover:bg-white/5 rounded-lg"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 pb-20 md:pb-8"> {/* Responsive Padding */}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
