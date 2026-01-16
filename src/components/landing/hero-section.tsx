'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
    banner?: any; // Using any to avoid importing prisma types in client component, typically strict check desirable
}

export function HeroSection({ banner }: HeroSectionProps) {
    // Si hay banner, usamos sus datos. Si no, fallback al default.
    const title = banner?.title || "Aprende a Programar";
    // Si el banner tiene descripción, la usamos. Si no, usamos la default.
    // Ojo: Si el banner es "Aprende a Programar", queremos el subtítulo "con IA". 
    // Para simplificar: Si hay banner, mostramos titulo y descripcion del banner.
    const description = banner?.description || "Tu tutor personal de IA te guía paso a paso. Sin frustración, sin quedarte atascado. 100% gratis para siempre.";
    const imageUrl = banner?.imageUrl;
    const ctaText = banner?.ctaText || "Empieza Gratis";
    const linkUrl = banner?.linkUrl || "/auth/register";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {imageUrl ? (
                    <>
                        <Image
                            src={imageUrl}
                            alt="Banner Background"
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent" />
                        <div className="absolute inset-0 bg-black/40" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neural-blue/20 rounded-full blur-[120px] animate-pulse-slow" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-synapse-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
                    </>
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight">
                        {banner ? (
                            <span className="block text-white mb-2 text-shadow-neon">{title}</span>
                        ) : (
                            <>
                                <span className="block text-white mb-2">Aprende a Programar</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural-blue via-synapse-purple to-accent-gold">
                                    con Inteligencia Artificial
                                </span>
                            </>
                        )}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#B8BFC9] max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link
                            href={linkUrl}
                            className="group px-10 py-5 bg-neural-blue text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-neon-blue hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 flex items-center gap-3"
                        >
                            <span>{ctaText}</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </Link>

                        {!banner && (
                            <Link
                                href="#demo"
                                className="px-10 py-5 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:border-neural-blue"
                            >
                                Ver Demo ▶
                            </Link>
                        )}
                    </div>

                    {/* Trust Badges */}
                    {!banner && (
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
                    )}
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
