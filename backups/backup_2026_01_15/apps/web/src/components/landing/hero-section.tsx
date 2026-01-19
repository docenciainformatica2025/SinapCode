'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neural-blue/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-synapse-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6">
                        <span className="block text-white mb-2">Aprende a Programar</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural-blue via-synapse-purple to-accent-gold">
                            con Inteligencia Artificial
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#B8BFC9] max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
                        Tu tutor personal de IA te guía paso a paso. Sin frustración, sin quedarte atascado.
                        <span className="text-white font-bold"> 100% gratis para siempre.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link
                            href="/auth/register"
                            className="group px-10 py-5 bg-neural-blue text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-neon-blue hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 flex items-center gap-3"
                        >
                            <span>Empieza Gratis</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </Link>

                        <Link
                            href="#demo"
                            className="px-10 py-5 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:border-neural-blue"
                        >
                            Ver Demo ▶
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-platinum-dim">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span>Sin tarjeta de crédito</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span>Cancela cuando quieras</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span>Certificados verificados</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
