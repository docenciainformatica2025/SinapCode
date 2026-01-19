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
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

            <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                        <Mail className="w-6 h-6 text-brain-spark" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        ¿Olvidaste tu contraseña?
                    </h1>
                    <p className="text-[#B8BFC9] text-sm">
                        No te preocupes. Ingresa tu correo y te enviaremos instrucciones para recuperarla.
                    </p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-platinum uppercase tracking-wider mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-brain-spark text-white font-bold py-3 rounded-lg shadow-neon-blue hover:shadow-neon-purple hover:scale-[1.02] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                'Enviar Instrucciones'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                            <p className="text-emerald-400 text-sm font-medium">
                                ¡Correo enviado con éxito!
                            </p>
                            <p className="text-emerald-400/80 text-xs mt-1">
                                Revisa tu bandeja de entrada (y spam) en <strong>{email}</strong>
                            </p>
                        </div>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-sm text-[#B8BFC9] hover:text-white transition underline"
                        >
                            Probar con otro correo
                        </button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center text-sm text-[#B8BFC9] hover:text-white transition group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
