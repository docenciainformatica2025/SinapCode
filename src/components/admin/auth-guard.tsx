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
            console.warn('[ADMIN] Unauthorized access attempt by:', session.user?.email);
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
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="glass-panel p-8 rounded-2xl border border-rose-500/30 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">🔒</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h1>
                    <div className="mb-6 space-y-2">
                        <p className="text-gray-400">Esta área es exclusiva para administradores.</p>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 inline-block">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Tu Rol Actual</p>
                            <p className={`font-mono font-bold text-lg ${userRole === 'ADMIN' ? 'text-green-400' : 'text-amber-400'}`}>
                                {userRole || 'DESCONOCIDO'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mb-6 text-sm text-left">
                        <p className="text-blue-300 font-bold mb-1">💡 ¿Ya actualizaste tu rol?</p>
                        <p className="text-gray-400">Si cambiaste tu rol en la base de datos, necesitas cerrar sesión para recargar tus permisos.</p>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition"
                        >
                            Volver al Inicio
                        </button>
                        <button
                            onClick={async () => {
                                await fetch('/api/auth/signout', { method: 'POST' });
                                window.location.href = '/auth/login';
                            }}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-bold transition shadow-lg shadow-rose-900/20"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
