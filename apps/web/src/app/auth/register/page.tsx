'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react'; // Import signIn for auto-login
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { AgeVerificationField } from '@/components/auth/age-verification-field';
import { ConsentCheckbox } from '@/components/legal/consent-checkbox';
import { PasswordStrengthMeter } from '@/components/auth/password-strength-meter';
import { RoleSelector } from '@/components/auth/role-selector';

export default function RegisterPage() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birthDate: '',
        role: 'STUDENT', // Default role
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const handleAgeVerified = useCallback((isAdult: boolean, birthDate: string) => {
        setFormData(prev => ({ ...prev, birthDate }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted || !privacyAccepted) {
            toast.error('Debes aceptar los términos y la política de privacidad');
            return;
        }

        if (!executeRecaptcha) {
            toast.error('Error de seguridad: ReCAPTCHA no disponible. Intenta recargar.');
            return;
        }

        setLoading(true);

        try {
            // Generate ReCAPTCHA Token
            const token = await executeRecaptcha('register');

            // Real API Call
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, recaptchaToken: token }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al registrarse');
            }

            toast.success('¡Cuenta creada exitosamente!');

            // Redirect to check-email page with email parameter
            const emailParam = encodeURIComponent(formData.email);
            window.location.href = `/auth/check-email?email=${emailParam}`;

        } catch (error: any) {
            toast.error(error.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.');
            setLoading(false);
        }
    }, [formData, termsAccepted, privacyAccepted, executeRecaptcha]);

    return (
        <div className="min-h-screen bg-bg flex font-sans selection:bg-primary/30">
            {/* Left Panel - Visual Experience (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-deep-space relative overflow-hidden items-center justify-center p-12">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                        <img
                            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop"
                            alt="SinapCode Learning"
                            className="w-64 h-64 object-cover rounded-3xl shadow-2xl relative z-10 border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                    <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Aprende. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Construye.</span> Escala.
                    </h2>
                    <p className="text-lg text-platinum-dim leading-relaxed">
                        Únete a una comunidad de desarrolladores de élite. Accede a laboratorios en vivo, mentoría experta y proyectos reales.
                    </p>

                    {/* Social Proof Mini */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-deep-space bg-white/10 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="text-white font-bold text-sm">5,000+ Estudiantes</div>
                            <div className="text-xs text-primary">Confían en SinapCode</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative">
                {/* Mobile Background styling */}
                <div className="lg:hidden absolute inset-0 bg-deep-space">
                    <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px]" />
                </div>

                <div className="w-full max-w-md relative z-10 py-6 sm:py-0">
                    <div className="text-center mb-8 lg:text-left">
                        <Link href="/" className="text-2xl font-black text-white italic tracking-tighter inline-block mb-2 uppercase">
                            SinapCode
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Crea tu Cuenta
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Comienza tu viaje hacia la maestría tecnológica.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role Selector */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-3">
                                Selecciona tu Perfil
                            </label>
                            <RoleSelector
                                selectedRole={formData.role}
                                onSelect={(role) => setFormData({ ...formData, role })}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            {/* Name */}
                            <div className="group">
                                <label htmlFor="name" className="block text-xs font-bold text-platinum mb-2 transition-colors group-focus-within:text-primary">
                                    NOMBRE COMPLETO
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm hover:border-white/20"
                                    placeholder="Ej. María García"
                                />
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-bold text-platinum mb-2 transition-colors group-focus-within:text-primary">
                                    CORREO ELECTRÓNICO
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm hover:border-white/20"
                                    placeholder="maria@empresa.com"
                                />
                            </div>

                            {/* Password */}
                            <div className="group">
                                <label htmlFor="password" className="block text-xs font-bold text-platinum mb-2 transition-colors group-focus-within:text-primary">
                                    CONTRASEÑA
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm hover:border-white/20"
                                        placeholder="••••••••"
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        )}
                                    </button>
                                </div>
                                <PasswordStrengthMeter password={formData.password} />
                            </div>

                            {/* Age Verification */}
                            <div className="pt-2">
                                <AgeVerificationField onAgeVerified={handleAgeVerified} />
                            </div>

                            {/* Consents */}
                            <div className="space-y-3 pt-2">
                                <ConsentCheckbox
                                    documentType="terms"
                                    documentVersion="1.0"
                                    required
                                    onChange={setTermsAccepted}
                                />
                                <ConsentCheckbox
                                    documentType="privacy"
                                    documentVersion="1.0"
                                    required
                                    onChange={setPrivacyAccepted}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !termsAccepted || !privacyAccepted}
                            className="w-full bg-gradient-to-r from-primary to-primary-dim text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider mt-6"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Creando cuenta...</span>
                                </>
                            ) : (
                                <>
                                    <span>Comenzar Ahora</span>
                                    <span>→</span>
                                </>
                            )}
                        </button>

                        <div className="text-center text-sm text-gray-500 mt-6">
                            ¿Ya tienes cuenta?{' '}
                            <Link href="/auth/login" className="text-white hover:text-primary transition font-bold">
                                Inicia sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
