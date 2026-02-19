'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    data?: any;
}

export function CTASection({ data }: CTASectionProps) {
    return (
        <section className="pt-20 md:pt-28 pb-0 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative bg-surface/30 backdrop-blur-3xl border border-white/5 rounded-t-[3rem] p-8 md:p-20 text-center overflow-hidden group shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-b-0"
                >
                    {/* Background Glows */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-tight italic uppercase">
                        ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">Trascender?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-platinum-dim max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Únete a la ingeniería que está diseñando el mañana. <br className="hidden md:block" />
                        Sin compromisos académicos, solo <span className="text-white">resultados de élite</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Link
                            href="/auth/register"
                            className="group relative px-12 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-white/40"
                        >
                            Comenzar tu Evolución
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </Link>

                        <Link
                            href="/courses"
                            className="text-white/60 hover:text-primary font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-2 group/link italic"
                        >
                            Explorar Protocolos
                            <div className="w-8 h-px bg-white/20 group-hover/link:w-12 group-hover/link:bg-primary transition-all" />
                        </Link>
                    </div>

                    <p className="text-[9px] text-platinum-dim/40 pt-16 font-black uppercase tracking-[0.4em] relative z-10 italic">
                        No se requiere tarjeta de crédito • Acceso Instantáneo OS v2.2
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
