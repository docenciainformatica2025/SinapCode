'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Mail } from 'lucide-react';

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
                        <div className="w-64 h-64 bg-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center relative z-10 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-500">
                            <Mail className="w-24 h-24 text-primary animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Recupera tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Acceso.</span>
                    </h2>
                    <p className="text-lg text-platinum-dim leading-relaxed">
                        No te preocupes. Es común olvidar contraseñas en el camino hacia la maestría.
                    </p>
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
                            Restablecer Contraseña
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Ingresa tu correo para recibir las instrucciones de recuperación.
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-bold text-platinum mb-2 transition-colors group-focus-within:text-primary">
                                    CORREO ELECTRÓNICO
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm hover:border-white/20"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full bg-gradient-to-r from-primary to-primary-dim text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Enviar Instrucciones</span>
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Mail className="w-6 h-6 text-emerald-400" />
                                </div>
                                <p className="text-white font-bold text-lg mb-1">
                                    ¡Correo enviado!
                                </p>
                                <p className="text-emerald-400/80 text-sm">
                                    Revisa tu bandeja de entrada (y spam) en <span className="text-white font-medium">{email}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-sm text-platinum hover:text-white transition underline decoration-primary/50 hover:decoration-primary"
                            >
                                Probar con otro correo
                            </button>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/10 text-center lg:text-left">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition group font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform text-primary" />
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
