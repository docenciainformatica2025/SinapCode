'use client';

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ShieldAlert } from 'lucide-react';

export default function AdminDevLogin() {
    const handleLogin = async () => {
        try {
            const res = await signIn("credentials", {
                email: "admin@sinapcode.global",
                password: "password12345678",
                redirect: true,
                callbackUrl: "/admin",
            });

            if (res?.error) {
                toast.error("Error en login dev");
            }
        } catch (error) {
            toast.error("Error inesperado en login");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full border border-red-500/30 p-8 rounded-2xl text-center bg-red-900/10">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    Acceso de Emergencia (Dev)
                </h1>
                <p className="text-gray-400 mb-8">
                    Esta herramienta fuerza un inicio de sesión como Admin usando las credenciales hardcodeadas.
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 px-6 py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 text-white shadow-lg shadow-red-900/20"
                >
                    ⚠️ INGRESAR AHORA
                </button>
            </div>
        </div>
    );
}
