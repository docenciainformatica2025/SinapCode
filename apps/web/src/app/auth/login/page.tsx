'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { signIn, getSession } from 'next-auth/react';
import { toast } from 'sonner';


export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Client-Side Validation
        if (!formData.email || !formData.password) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                console.error('❌ [LOGIN] Auth Error:', result.error);

                // Specific error handling for premium feedback
                if (result.error === 'AUTH_EMAIL_NOT_VERIFIED') {
                    toast.error('Tu cuenta aún no ha sido verificada. Revisa tu correo.');
                } else if (result.error === 'CredentialsSignin') {
                    toast.error('Email o contraseña incorrectos.');
                } else {
                    toast.error(result.error || 'Error al iniciar sesión');
                }
                setLoading(false);
            } else if (result?.ok) {
                toast.success('Acceso concedido. Sincronizando...');

                // Fetch session for role redirect
                const session = await getSession();
                const userRole = (session?.user as any)?.role;

                // Priority 1: explicitly saved redirect
                // Priority 2: query param callbackUrl
                // Priority 3: role based default
                const searchParams = new URLSearchParams(window.location.search);
                const callbackUrl = searchParams.get('callbackUrl');

                let redirectTo = callbackUrl || '/dashboard';

                if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
                    redirectTo = '/admin';
                }

                toast.success('¡Bienvenido, ' + (session?.user?.name || 'Iniciando') + '!');

                // Allow a small delay for toast to be seen
                setTimeout(() => {
                    window.location.href = redirectTo;
                }, 800);
            }
        } catch (error) {
            console.error('💥 [LOGIN] Exception:', error);
            toast.error('Error crítico en el sistema de autenticación');
            setLoading(false);
        }
    }, [formData]);


    return (
        <div className="min-h-screen bg-[#F1F0E8] flex font-sans selection:bg-[#C9A78A]/30">
            {/* Left Panel - Visual Experience (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-[#1E1E1E] relative overflow-hidden items-center justify-center p-12">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#C9A78A]/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-[#C9A78A]/20 blur-2xl rounded-full" />
                        <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
                            alt="SinapCode Coding"
                            className="w-64 h-64 object-cover rounded-3xl shadow-2xl relative z-10 border border-white/10 -rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                    <h2 className="text-4xl font-extrabold text-[#F1F0E8] mb-4 tracking-tight">
                        Tu camino a la <span className="text-[#C9A78A]">Excelencia.</span>
                    </h2>
                    <p className="text-[#F1F0E8]/70 text-lg leading-relaxed">
                        Continúa donde lo dejaste. Tus proyectos, mentores y laboratorios te están esperando.
                    </p>

                    {/* Social Proof Mini */}
                    <div className="mt-8 flex items-center justify-center gap-4 opacity-80">
                        <div className="flex -space-x-3">
                            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] bg-[#F1F0E8]/10 flex items-center justify-center text-xs font-bold text-white">
                                JS
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] bg-[#F1F0E8]/10 flex items-center justify-center text-xs font-bold text-white">
                                PY
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-[#1E1E1E] bg-[#F1F0E8]/10 flex items-center justify-center text-xs font-bold text-white">
                                AI
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="text-white font-bold text-sm">Skills Demandadas</div>
                            <div className="text-xs text-[#C9A78A]">Domínalas hoy</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative">
                {/* Mobile Background styling */}
                <div className="lg:hidden absolute inset-0 bg-[#F1F0E8]">
                    <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-[#C9A78A]/10 rounded-full blur-[80px]" />
                </div>

                <div className="w-full max-w-md relative z-10 py-6 sm:py-0">
                    <div className="text-center mb-8 lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <div className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-[#1E1E1E] rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C9A78A]" fill="currentColor">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <span className="text-xl font-black tracking-tighter text-[#1E1E1E]">SINAPCODE</span>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-black text-[#1E1E1E] mb-2 tracking-tight">
                            Bienvenido de Nuevo
                        </h1>
                        <p className="text-[#1E1E1E]/60 text-sm font-medium">
                            Ingresa tus credenciales para acceder al dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="group">
                            <label htmlFor="email" className="block text-xs font-black text-[#1E1E1E]/40 mb-2 transition-colors group-focus-within:text-[#C9A78A] tracking-widest">
                                CORREO ELECTRÓNICO
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white border border-[#1E1E1E]/10 rounded-2xl px-5 py-4 text-[#1E1E1E] transition-all focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 shadow-sm hover:border-[#1E1E1E]/20 placeholder:text-[#1E1E1E]/30 font-medium"
                                placeholder="tu@email.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="group">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-xs font-black text-[#1E1E1E]/40 transition-colors group-focus-within:text-[#C9A78A] tracking-widest">
                                    CONTRASEÑA
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs text-[#C9A78A] hover:text-[#1E1E1E] transition font-bold"
                                >
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
                                    className="w-full bg-white border border-[#1E1E1E]/10 rounded-2xl px-5 py-4 pr-12 text-[#1E1E1E] transition-all focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 shadow-sm hover:border-[#1E1E1E]/20 placeholder:text-[#1E1E1E]/30 font-medium"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1E1E]/30 hover:text-[#1E1E1E] transition"
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1E1E1E] text-[#F1F0E8] font-black py-5 rounded-2xl shadow-xl shadow-[#1E1E1E]/10 hover:shadow-[#1E1E1E]/20 hover:-translate-y-1 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.2em]"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sincronizando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Acceder al Estudio</span>
                                    <span className="text-[#C9A78A]">→</span>
                                </>
                            )}
                        </button>

                        {/* Social Login */}
                        <div className="space-y-4 pt-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#1E1E1E]/5"></div>
                                </div>
                                <div className="relative flex justify-center text-[10px] font-black tracking-widest">
                                    <span className="px-4 bg-[#F1F0E8] text-[#1E1E1E]/40 uppercase">O CONTINUAR CON</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => signIn('google')}
                                className="w-full bg-white border border-[#1E1E1E]/10 rounded-2xl px-5 py-4 text-[#1E1E1E] flex items-center justify-center gap-3 hover:bg-[#1E1E1E]/5 hover:border-[#1E1E1E]/20 transition-all font-bold text-sm"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Google ID</span>
                            </button>
                        </div>

                        {/* Register Link */}
                        <div className="text-center text-sm text-[#1E1E1E]/50 pt-2 font-medium">
                            ¿No tienes cuenta?{' '}
                            <Link href="/auth/register" className="text-[#C9A78A] hover:text-[#1E1E1E] transition font-black">
                                Regístrate gratis
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
