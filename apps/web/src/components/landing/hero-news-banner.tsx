'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const FEATURED_NEWS = [
    {
        id: 1,
        title: "SinapCode: El Futuro de la Computación Cuántica",
        description: "Explora los últimos avances en inteligencia artificial y tecnologías cuánticas que están redefiniendo nuestro mundo.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
        tag: "Inovación",
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
    const [banners, setBanners] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch('/api/news/banners');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setBanners(data);
                } else {
                    // Si no hay banners en DB, usamos los placeholders
                    setBanners(FEATURED_NEWS);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setBanners(FEATURED_NEWS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [banners]);

    if (isLoading) {
        return <div className="h-[85vh] w-full bg-bg animate-pulse flex items-center justify-center text-white/20 font-black italic tracking-tighter">SINCRONIZANDO SINAPCODE...</div>;
    }

    if (banners.length === 0) return null;

    const news = banners[currentIndex];
    // Map DB fields to component naming if necessary
    const displayTitle = news.title;
    const displayDesc = news.description || news.excerpt;
    const displayImage = news.imageUrl || news.image;
    const displayTag = news.tag || "Innovación";
    const displayLink = news.linkUrl || `/blog/${news.slug}`;

    return (
        <section className="relative w-full h-[85vh] overflow-hidden flex items-end pb-20 md:pb-32">
            {/* Background Image Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={news.id || news.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/20 to-transparent z-10" />
                    <img
                        src={displayImage}
                        alt={displayTitle}
                        className="w-full h-full object-cover brightness-[1.1]"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Content */}
            <div className="container-page relative z-20">
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={news.id || news.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Tag */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 mb-6 font-mono">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-blue">
                                    {displayTag}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                                {displayTitle}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-2xl text-apple-blue/90 mb-10 max-w-2xl leading-relaxed font-medium">
                                {displayDesc}
                            </p>

                            {/* CTA */}
                            <Link
                                href={displayLink}
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
                    {banners.map((item, idx) => (
                        <button
                            key={item.id || idx}
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
