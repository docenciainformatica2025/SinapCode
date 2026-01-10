'use client';

import { adminLogin } from '@/app/auth/actions';
import { ShieldAlert } from 'lucide-react';

export default function AdminDevLogin() {

    // Server Action wrapper to handle client-side invocation if needed
    // though passing directly often works, wrapping allows for loading states/toast in future
    const handleAdminLogin = async () => {
        try {
            await adminLogin();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-yellow-500/30 shadow-neon-purple text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                    <ShieldAlert className="w-8 h-8 text-yellow-500" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    Modo Desarrollador
                </h1>
                <p className="text-[#B8BFC9] mb-8">
                    Esta herramienta simula un inicio de sesión con privilegios de <strong>ADMINISTRADOR</strong> para probar las rutas protegidas y middleware.
                </p>

                <div className="p-4 bg-black/30 rounded-lg mb-6 text-left border border-white/5">
                    <p className="text-xs text-[#B8BFC9] uppercase font-bold mb-2">Credenciales Mock:</p>
                    <code className="text-sm text-green-400 block">User: admin@sinapcode.global</code>
                    <code className="text-sm text-green-400 block">Role: ADMIN</code>
                </div>

                <button
                    onClick={handleAdminLogin}
                    className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center gap-2"
                >
                    <ShieldAlert className="w-5 h-5" />
                    Simular Acceso Admin
                </button>

                <p className="text-xs text-white/20 mt-6">
                    ⚠️ Solo disponible en entorno de desarrollo
                </p>
            </div>
        </div>
    );
}
