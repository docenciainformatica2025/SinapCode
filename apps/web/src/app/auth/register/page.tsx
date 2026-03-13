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
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

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
        <div className="theme-light min-h-screen bg-[#F1F0E8] flex flex-col font-inter selection:bg-[#C9A78A]/30 text-[#1E1E1E] overflow-x-hidden">
            <div className="flex-grow flex">
                {/* Left Panel - Visual Experience (Desktop Only) */}
                <div className="hidden lg:flex w-1/2 bg-[#F1F0E8] relative overflow-hidden items-center justify-center p-12 border-r border-[#1E1E1E]/5">
                    {/* Background Effects */}
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.02] opacity-10" />
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#C9A78A]/5 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#A7C1C0]/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

                    <div className="relative z-10 max-w-lg text-center">
                        <div className="mb-8 relative inline-block">
                            <div className="absolute inset-0 bg-[#C9A78A]/20 blur-3xl rounded-full" />
                            <img
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop"
                                alt="SinapCode Learning"
                                className="w-64 h-64 object-cover rounded-3xl shadow-4xl relative z-10 border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                        <h2 className="text-4xl font-black text-[#1E1E1E] mb-6 tracking-tighter italic uppercase font-outfit leading-tight">
                            Aprende. <span className="text-[#C9A78A]">Construye.</span> Escala.
                        </h2>
                        <p className="text-[#1E1E1E]/40 text-lg leading-relaxed font-bold italic tracking-tight">
                            Únete a una comunidad de desarrolladores de élite. Accede a laboratorios en vivo, mentoría experta y proyectos reales.
                        </p>

                        {/* Social Proof Mini */}
                        <div className="mt-12 flex items-center justify-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1E1E1E] bg-[#F1F0E8]/10 overflow-hidden shadow-xl">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-left font-outfit">
                                <div className="text-[#F1F0E8] font-black text-sm tracking-tighter">5,000+ ESTUDIANTES</div>
                                <div className="text-[10px] text-[#C9A78A] font-black uppercase tracking-widest">CONFÍAN EN NOSOTROS</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A78A]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="w-full max-w-md relative z-10 py-6 sm:py-0">
                        <div className="text-center mb-10 lg:text-left">
                            <SinapcodeLogo variant="full" theme="color" className="h-10 mb-10" />
                            <h1 className="text-4xl font-black text-[#1E1E1E] mb-3 tracking-tighter italic uppercase font-outfit">
                                Crea tu Cuenta
                            </h1>
                            <p className="text-[#1E1E1E]/40 text-sm font-bold italic tracking-tight">
                                Comienza tu viaje hacia la maestría tecnológica hoy mismo.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Role Selector */}
                            <div>
                                <label className="block text-[10px] font-black text-[#C9A78A] uppercase tracking-[0.3em] mb-4">
                                    SELECCIONA TU PERFIL
                                </label>
                                <RoleSelector
                                    selectedRole={formData.role}
                                    onSelect={(role) => setFormData({ ...formData, role })}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Name */}
                                <div className="group/field">
                                    <label htmlFor="name" className="block text-[10px] font-black text-[#1E1E1E]/40 mb-3 transition-colors group-focus-within/field:text-[#C9A78A] tracking-[0.3em] uppercase">
                                        NOMBRE COMPLETO
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white border border-[#1E1E1E]/10 rounded-[1.5rem] px-6 py-4 text-[#1E1E1E] transition-all focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 font-bold italic placeholder:text-[#1E1E1E]/20"
                                        placeholder="Ej. María García"
                                    />
                                </div>

                                {/* Email */}
                                <div className="group/field">
                                    <label htmlFor="email" className="block text-[10px] font-black text-[#1E1E1E]/40 mb-3 transition-colors group-focus-within/field:text-[#C9A78A] tracking-[0.3em] uppercase">
                                        CORREO ELECTRÓNICO
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white border border-[#1E1E1E]/10 rounded-[1.5rem] px-6 py-4 text-[#1E1E1E] transition-all focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 font-bold italic placeholder:text-[#1E1E1E]/20"
                                        placeholder="maria@empresa.com"
                                    />
                                </div>

                                {/* Password */}
                                <div className="group/field">
                                    <label htmlFor="password" className="block text-[10px] font-black text-[#1E1E1E]/40 mb-3 transition-colors group-focus-within/field:text-[#C9A78A] tracking-[0.3em] uppercase">
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
                                            className="w-full bg-white border border-[#1E1E1E]/10 rounded-[1.5rem] px-6 py-4 pr-14 text-[#1E1E1E] transition-all focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 font-bold italic placeholder:text-[#1E1E1E]/20"
                                            placeholder="••••••••"
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1E1E1E]/20 hover:text-[#C9A78A] transition-colors"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943-9.543-7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <PasswordStrengthMeter password={formData.password} />
                                    </div>
                                </div>

                                {/* Age Verification */}
                                <div className="pt-2">
                                    <AgeVerificationField onAgeVerified={handleAgeVerified} />
                                </div>

                                {/* Consents */}
                                <div className="space-y-4 pt-4">
                                    <ConsentCheckbox
                                        documentType="terms"
                                        documentVersion="2.2"
                                        required
                                        className="bg-white p-6 rounded-3xl border border-[#1E1E1E]/5 shadow-sm"
                                        onChange={setTermsAccepted}
                                    />
                                    <ConsentCheckbox
                                        documentType="privacy"
                                        documentVersion="2.0"
                                        required
                                        className="bg-white p-6 rounded-3xl border border-[#1E1E1E]/5 shadow-sm"
                                        onChange={setPrivacyAccepted}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !termsAccepted || !privacyAccepted}
                                className="w-full bg-[#1E1E1E] text-[#F1F0E8] font-black py-6 rounded-3xl shadow-4xl shadow-[#1E1E1E]/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed font-outfit text-xs uppercase tracking-[0.3em] mt-8 italic"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#F1F0E8" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="#F1F0E8" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>CONECTANDO</span>
                                    </>
                                ) : (
                                    <>
                                        <span>COMENZAR EXPERIENCIA</span>
                                        <span className="text-[#C9A78A]">→</span>
                                    </>
                                )}
                            </button>

                            <div className="text-center text-sm text-[#1E1E1E]/40 mt-8 font-bold italic tracking-tight">
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/auth/login" className="text-[#C9A78A] hover:text-[#1E1E1E] transition-colors font-black uppercase tracking-tighter ml-1">
                                    Inicia sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
