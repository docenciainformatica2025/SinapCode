'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Mail } from 'lucide-react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: Connect to real backend API
            // await api.auth.requestPasswordReset(email);

            // Simulation for UI UX
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
            toast.success('Si el correo existe, recibirás un enlace.');
        } catch (error) {
            toast.error('Ocurrió un error. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

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
                            <div className="w-64 h-64 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 flex items-center justify-center relative z-10 shadow-4xl skew-y-3 hover:skew-y-0 transition-transform duration-500">
                                <Mail className="w-24 h-24 text-[#C9A78A] animate-pulse-slow" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-[#1E1E1E] mb-6 tracking-tighter italic uppercase font-outfit leading-tight">
                            Recupera tu <span className="text-[#C9A78A]">Acceso.</span>
                        </h2>
                        <p className="text-[#1E1E1E]/40 text-lg leading-relaxed font-bold italic tracking-tight">
                            No te preocupes. Es común olvidar contraseñas en el camino hacia la maestría.
                        </p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A78A]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="w-full max-w-md relative z-10 py-6 sm:py-0">
                        <div className="text-center mb-10 lg:text-left">
                            <SinapcodeLogo variant="full" theme="color" className="h-10 mb-10" />
                            <h1 className="text-4xl font-black text-[#1E1E1E] mb-3 tracking-tighter italic uppercase font-outfit">
                                Restablecer Contraseña
                            </h1>
                            <p className="text-[#1E1E1E]/40 text-sm font-bold italic tracking-tight">
                                Ingresa tu correo para recibir las instrucciones de recuperación.
                            </p>
                        </div>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="group/field">
                                    <label htmlFor="email" className="block text-[10px] font-black text-[#1E1E1E]/40 mb-3 transition-colors group-focus-within/field:text-[#C9A78A] tracking-[0.3em] uppercase">
                                        CORREO ELECTRÓNICO
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white border border-[#1E1E1E]/10 rounded-[1.5rem] px-6 py-4 text-[#1E1E1E] transition-all focus:outline-none focus:border-[#C9A78A] focus:ring-4 focus:ring-[#C9A78A]/10 font-bold italic placeholder:text-[#1E1E1E]/20"
                                        placeholder="ejemplo@correo.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    className="w-full bg-[#1E1E1E] text-[#F1F0E8] font-black py-6 rounded-3xl shadow-4xl shadow-[#1E1E1E]/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed font-outfit text-xs uppercase tracking-[0.3em] italic"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#F1F0E8" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="#F1F0E8" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>ENVIANDO</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>ENVIAR INSTRUCCIONES</span>
                                            <ArrowLeft className="w-4 h-4 rotate-180 text-[#C9A78A]" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 backdrop-blur-3xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                                        <Mail className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-[#1E1E1E] font-black text-xl mb-2 relative z-10 italic uppercase font-outfit tracking-tight">
                                        ¡Correo enviado!
                                    </h3>
                                    <p className="text-emerald-600/80 text-sm font-bold italic tracking-tight relative z-10">
                                        Revisa tu bandeja de entrada en <span className="text-[#1E1E1E]">{email}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-xs text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-colors font-black uppercase tracking-widest italic"
                                >
                                    Probar con otro correo
                                </button>
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-[#1E1E1E]/5 text-center lg:text-left">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center text-[10px] text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-colors group font-black uppercase tracking-[0.2em] italic"
                            >
                                <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform text-[#C9A78A]" />
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
