'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-primary/5 to-bg" />

            <div className="container-page relative z-10 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold font-bold mb-6 animate-pulse-slow">
                        <Sparkles className="w-4 h-4" />
                        <span className="tracking-wide text-sm">ADMISIONES ABIERTAS 2026</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        ¿Listo para aprender <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold">en serio?</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto">
                        Deja de consumir tutoriales. Empieza a construir tu carrera hoy mismo con tutoría IA y certificación real.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Link
                            href="/auth/register"
                            className="btn-primary text-xl px-12 py-5 shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300"
                        >
                            Empieza Ahora
                        </Link>

                        <Link
                            href="/syllabus"
                            className="btn-secondary text-xl px-12 py-5 border-white/20 text-white hover:bg-white/5"
                        >
                            Ver Plan de Estudios
                        </Link>
                    </div>

                    <p className="text-sm text-muted pt-8">
                        No se requiere tarjeta de crédito para empezar.
                    </p>
                </div>
            </div>
        </section>
    );
}
