'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const FEATURED_NEWS = [
    {
        id: 1,
        title: "Nanobanana IA: El Futuro de la Computación Cuántica",
        description: "Explora los últimos avances en inteligencia artificial y tecnologías cuánticas que están redefiniendo nuestro mundo.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
        tag: "Nanobanana",
        color: "from-blue-600 to-cyan-500"
    },
    {
        id: 2,
        title: "Neuralink 2.0: Fusión Mente y Máquina",
        description: "Las interfaces directas cerebro-nube ya no son ciencia ficción. Descubre cómo el nuevo protocolo lo cambia todo.",
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop",
        tag: "Biohacking",
        color: "from-purple-600 to-pink-500"
    },
    {
        id: 3,
        title: "El auge de los Agentes de Ciberdefensa Autónomos",
        description: "Cómo los bots de seguridad IA están contraatacando amenazas patrocinadas por estados en tiempo real.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        tag: "Ciberseguridad",
        color: "from-emerald-600 to-teal-500"
    }
];

export function HeroNewsBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mock "3-day rotation" logic or simple auto-rotation for demo
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % FEATURED_NEWS.length);
        }, 8000); // Change every 8 seconds
        return () => clearInterval(timer);
    }, []);

    const news = FEATURED_NEWS[currentIndex];

    return (
        <section className="relative w-full h-[85vh] overflow-hidden flex items-end pb-20 md:pb-32">
            {/* Background Image Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={news.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/20 to-transparent z-10" />
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover brightness-[1.1]"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Content */}
            <div className="container-page relative z-20">
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Tag */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 mb-6 font-mono">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-blue">
                                    {news.tag}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                                {news.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-2xl text-apple-blue/90 mb-10 max-w-2xl leading-relaxed font-medium">
                                {news.description}
                            </p>

                            {/* CTA */}
                            <Link
                                href={`/blog/news-${news.id}`}
                                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#0A84FF] text-white rounded-xl font-bold text-[15px] transition-all duration-200 hover:bg-[#0060DF] shadow-lg active:scale-95"
                            >
                                Leer Más
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-0 right-0 flex gap-4">
                    {FEATURED_NEWS.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-16 bg-primary' : 'w-8 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
