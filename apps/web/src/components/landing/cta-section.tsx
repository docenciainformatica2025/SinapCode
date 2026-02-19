'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    data?: any;
}

export function CTASection({ data }: CTASectionProps) {
    return (
        <section id="unete" className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient-blue opacity-20 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative bg-surface/30 backdrop-blur-3xl border border-white/5 rounded-t-[3rem] p-8 md:p-24 text-center overflow-hidden group shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-b-0"
                >
                    {/* Background Glows */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

                    <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold text-white mb-6 tracking-tight leading-[1.1] text-balance">
                        ¿Listo para <span className="text-apple-blue font-extrabold text-glow">Trascender?</span>
                    </h2>

                    <p className="text-base md:text-lg text-platinum-dim max-w-2xl mx-auto mb-12 font-medium leading-relaxed opacity-60 text-pretty">
                        Únete a la nueva generación de ingenieros que están diseñando el mañana. <br className="hidden md:block" />
                        Resultados de <span className="text-white/90">alto impacto</span> para mentes ambiciosas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/auth/register"
                            className="btn-primary"
                        >
                            Comenzar Evolución
                        </Link>

                        <Link
                            href="#protocolos"
                            className="btn-secondary"
                        >
                            Explorar Protocolos
                        </Link>
                    </div>

                    <p className="text-[9px] text-platinum-dim/20 pt-16 font-bold uppercase tracking-[0.2em] relative z-10">
                        Sin permanencia • Acceso Instantáneo • v2.4 Activo
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
