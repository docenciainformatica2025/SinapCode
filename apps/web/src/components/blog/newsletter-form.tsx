'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 409) {
                    toast.info(data.message);
                } else {
                    throw new Error(data.error || 'Error al suscribirse');
                }
            } else {
                toast.success(data.message);
                setIsSuccess(true);
                setEmail('');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-16 glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neural-blue/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Suscríbete a Nuestro Newsletter
                </h2>
                <p className="text-[#B8BFC9] mb-8 max-w-lg mx-auto">
                    Recibe los mejores artículos, guías y recursos directamente en tu inbox cada semana.
                </p>

                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4 py-4"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">¡Gracias por suscribirte!</h3>
                            <p className="text-platinum-dim">Revisa tu correo para confirmar tu suscripción.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="text-sm text-neural-blue hover:text-white transition mt-2 underline"
                            >
                                Suscribir otro correo
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-platinum-dim" />
                                <input
                                    required
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-deep-space/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition placeholder:text-white/20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-neon-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Suscribirme'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
