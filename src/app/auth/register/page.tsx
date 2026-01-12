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

            toast.success('¡Cuenta creada exitosamente! Iniciando sesión...');

            // Auto-login after registration
            const loginResult = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false, // Handle redirect manually for better UX
            });

            if (loginResult?.error) {
                toast.error('Cuenta creada, pero hubo un error al iniciar sesión automáticamente.');
                window.location.href = '/auth/login';
            } else {
                window.location.href = '/dashboard';
            }

        } catch (error: any) {
            toast.error(error.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.');
            setLoading(false);
        }
    }, [formData, termsAccepted, privacyAccepted, executeRecaptcha]);

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

            <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 my-8">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold bg-brain-spark bg-clip-text text-transparent inline-block mb-2">
                        SinapCode
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Crea tu Cuenta
                    </h1>
                    <p className="text-[#B8BFC9] text-sm">
                        Únete a la plataforma de aprendizaje del futuro
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Role Selector */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-3 text-center">
                            ¿Cómo quieres participar?
                        </label>
                        <RoleSelector
                            selectedRole={formData.role}
                            onSelect={(role) => setFormData({ ...formData, role })}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                            Nombre Completo
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                            placeholder="María García"
                        />
                    </div>

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
                        <label htmlFor="password" className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                                placeholder="Mínimo 8 caracteres"
                                minLength={8}
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
                        <PasswordStrengthMeter password={formData.password} />
                    </div>

                    {/* Age Verification */}
                    <AgeVerificationField onAgeVerified={handleAgeVerified} />

                    {/* Legal Consents */}
                    <div className="space-y-3 bg-white/5 border border-white/10 rounded-lg p-4">
                        <p className="text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                            Consentimientos Legales
                        </p>

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

                        <p className="text-xs text-[#B8BFC9]/70 mt-3">
                            📝 Tu consentimiento queda registrado con evidencia completa para cumplimiento legal (GDPR, COPPA, Ley 1581).
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !termsAccepted || !privacyAccepted}
                        className="w-full bg-brain-spark text-white font-bold py-3 rounded-lg shadow-neon-blue hover:shadow-neon-purple hover:scale-[1.02] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                <span>Crear Cuenta</span>
                                <span>→</span>
                            </>
                        )}
                    </button>

                    <div className="text-center text-sm text-[#B8BFC9]">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/auth/login" className="text-neural-blue hover:text-white transition font-medium">
                            Inicia sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
