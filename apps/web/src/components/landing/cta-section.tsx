'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    data?: any;
}

export function CTASection({ data }: CTASectionProps) {
    return (
        <section id="unete" className="py-24 md:py-32 bg-[#F1F0E8] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#C9A78A]/20 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative bg-white/70 backdrop-blur-3xl border border-black/5 rounded-t-[3rem] p-8 md:p-24 text-center overflow-hidden group shadow-sm border-b-0"
                >
                    {/* Background Glows */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C9A78A]/5 to-transparent pointer-events-none" />

                    <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-serif font-medium text-[#1E1E1E] mb-6 tracking-tight leading-[1.1] text-balance">
                        ¿Listo para <span className="text-[#C9A78A] italic">Trascender?</span>
                    </h2>

                    <p className="text-base md:text-lg text-[#1E1E1E]/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed text-pretty">
                        Únete a la nueva generación de ingenieros que están diseñando el mañana. <br className="hidden md:block" />
                        Resultados de <span className="text-[#1E1E1E] font-medium">alto impacto</span> para mentes ambiciosas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/auth/register"
                            className="bg-[#1E1E1E] text-white px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 font-medium"
                        >
                            Comenzar Evolución
                        </Link>

                        <Link
                            href="#protocolos"
                            className="bg-black/5 text-[#1E1E1E] px-8 py-4 rounded-full text-lg hover:bg-black/10 transition-colors font-medium border border-black/5"
                        >
                            Explorar Protocolos
                        </Link>
                    </div>

                    <p className="text-[9px] text-[#1E1E1E]/40 pt-16 font-bold uppercase tracking-[0.2em] relative z-10">
                        Sin permanencia • Acceso Instantáneo • v2.4 Activo
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
