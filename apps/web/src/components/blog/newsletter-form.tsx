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
        <div className="mt-16 bg-white p-8 sm:p-16 rounded-[48px] border border-[#1E1E1E]/5 text-center relative overflow-hidden shadow-2xl shadow-[#C9A78A]/5">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A7C1C0]/5 rounded-full blur-[80px] -ml-32 -mb-32" />

            <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A78A] mb-4 block italic">Conexión Global</span>
                <h2 className="text-4xl font-bold text-[#1E1E1E] mb-6 tracking-tight">
                    Suscríbete a Nuestro <span className="italic">Newsletter</span>
                </h2>
                <p className="text-[#1E1E1E]/60 mb-10 max-w-lg mx-auto font-light text-lg">
                    Recibe los mejores artículos, guías y recursos directamente en tu inbox cada semana. Sin ruido, solo valor.
                </p>

                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4 py-4"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#C9A78A]/10 flex items-center justify-center text-[#C9A78A]">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1E1E1E]">¡Bienvenido al núcleo!</h3>
                            <p className="text-[#1E1E1E]/60 font-light italic">Revisa tu correo para sincronizar protocolos.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="text-sm text-[#C9A78A] hover:text-[#1E1E1E] transition mt-4 font-bold tracking-widest uppercase"
                            >
                                Suscribir otro correo
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E1E1E]/20" />
                                <input
                                    required
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#F1F0E8] border border-transparent rounded-full py-4 pl-14 pr-6 text-[#1E1E1E] focus:outline-none focus:bg-white focus:border-[#C9A78A]/20 transition-all placeholder:text-[#1E1E1E]/20 font-light"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-10 py-4 bg-[#1E1E1E] text-white rounded-full font-bold hover:brightness-125 transition shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px] uppercase tracking-widest text-xs"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sincronizar'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
