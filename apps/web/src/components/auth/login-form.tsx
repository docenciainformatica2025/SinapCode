'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl,
            });

            if (result?.error) {
                toast.error('Error de autenticación: ' + result.error);
                setLoading(false);
            } else if (result?.ok) {
                toast.success('Inicio de sesión exitoso');
                router.push(callbackUrl);
                router.refresh(); // Sync server components
            }
        } catch (error) {
            toast.error('Ocurrió un error inesperado');
            console.error('Login error:', error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                    ID Global / Correo
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition"
                    placeholder="usuario@universidad.edu"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                    Llave de Acceso (Passkey)
                </label>
                <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition"
                    placeholder="••••••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-brain-spark text-white font-bold py-3 rounded-lg shadow-neon-blue hover:shadow-neon-purple hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Iniciar Sinapsis</span>
                        <span>🔐</span>
                    </>
                )}
            </button>

            <div className="flex justify-between items-center text-xs mt-4">
                <button type="button" className="text-platinum-dim hover:text-white">
                    ¿Olvidaste tu contraseña?
                </button>
                <button type="button" className="text-neural-blue hover:text-white flex items-center gap-1">
                    Usar Biometría 🛡️
                </button>
            </div>
        </form>
    );
}
