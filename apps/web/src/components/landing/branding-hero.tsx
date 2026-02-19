'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function BrandingHero() {
    return (
        <section className="relative w-full h-[60vh] md:h-[85vh] bg-black overflow-hidden flex items-center justify-center">
            <Link href="/auth/register" className="absolute inset-0 z-0">
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <img
                        src="/branding/hero-banner.png"
                        alt="SinapCode: Conecta. Crea. Evoluciona."
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                            (e.target as any).style.display = 'none';
                        }}
                    />
                    {/* Overlay sutil para profundidad sin tapar el texto de la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-black/10" />
                </motion.div>
            </Link>

            {/* Micro-interacción: Brillo orbital */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[180px] animate-pulse" />
            </div>

            {/* Indicador de scroll minimalista */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-40"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
