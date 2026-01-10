'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'sonner';

export default function LoginPage() {
    const { login } = useAuth();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            toast.error('reCAPTCHA no está disponible. Por favor, recarga la página.');
            return;
        }

        setLoading(true);

        try {
            // Execute reCAPTCHA
            const token = await executeRecaptcha('login');

            // TODO: Send token to backend for verification
            // const response = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ ...formData, recaptchaToken: token }),
            // });

            await login(formData.email, formData.password);

            toast.success('¡Bienvenido de nuevo! 👋');
            window.location.href = '/dashboard';
        } catch (error) {
            toast.error('Credenciales incorrectas. Por favor, intenta de nuevo.');
            setLoading(false);
        }
    }, [executeRecaptcha, formData, login]);

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

            <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold bg-brain-spark bg-clip-text text-transparent inline-block mb-2">
                        SinapCode
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Bienvenido de Nuevo
                    </h1>
                    <p className="text-[#B8BFC9] text-sm">
                        Inicia sesión para continuar aprendiendo
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                            placeholder="maria@email.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block text-xs font-semibold text-platinum uppercase tracking-wider">
                                Contraseña
                            </label>
                            <Link href="/auth/forgot-password" className="text-xs text-neural-blue hover:text-white transition">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8BFC9] hover:text-white transition"
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* reCAPTCHA Badge Info */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                        <p className="text-xs text-[#B8BFC9]">
                            🔒 Protegido por Google reCAPTCHA v3
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brain-spark text-white font-bold py-3 rounded-lg shadow-neon-blue hover:shadow-neon-purple hover:scale-[1.02] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Iniciando sesión...</span>
                            </>
                        ) : (
                            <>
                                <span>Iniciar Sesión</span>
                                <span>→</span>
                            </>
                        )}
                    </button>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-deep-space text-[#B8BFC9]">O continúa con</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" className="py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/20 flex items-center justify-center gap-2 text-sm">
                                <span>G</span> Google
                            </button>
                            <button type="button" className="py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/20 flex items-center justify-center gap-2 text-sm">
                                <span>⚡</span> GitHub
                            </button>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center text-sm text-[#B8BFC9]">
                        ¿No tienes cuenta?{' '}
                        <Link href="/auth/register" className="text-neural-blue hover:text-white transition font-medium">
                            Regístrate gratis
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
