'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Banner {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    category?: string;
}

const FALLBACK_NEWS = [
    {
        id: 'fallback-1',
        title: 'Conecta. Crea. Evoluciona.',
        description: 'La plataforma de ingeniería de élite impulsada por IA para la próxima generación de desarrolladores.',
        imageUrl: '/branding/hero-banner.png',
        category: 'SinapCode',
        linkUrl: '/auth/register',
    }
];

const CATEGORY_ICONS: Record<string, any> = {
    'IA': <Brain className="w-4 h-4" />,
    'Computación Cuántica': <Cpu className="w-4 h-4" />,
    'Blockchain': <Zap className="w-4 h-4" />,
    'Sistemas IA': <Cpu className="w-4 h-4" />,
    'Default': <Sparkles className="w-4 h-4" />
};

export function NewsHeroBanner() {
    const [banners, setBanners] = useState<Banner[]>([]);
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
                    setBanners(FALLBACK_NEWS as any);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setBanners(FALLBACK_NEWS as any);
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
        }, 10000);
        return () => clearInterval(timer);
    }, [banners]);

    const activeNews = banners[currentIndex] || FALLBACK_NEWS[0];

    if (isLoading) {
        return <div className="h-[60vh] md:h-[75vh] bg-black animate-pulse" />;
    }

    return (
        <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center overflow-hidden bg-black group/banner subpixel-text">
            <Link href={activeNews.linkUrl} className="absolute inset-0 z-0 cursor-pointer block">
                <motion.div
                    key={activeNews.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <img
                        src={activeNews.imageUrl}
                        alt={activeNews.title}
                        className="absolute inset-0 w-full h-full object-cover brightness-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 sharp-vignette opacity-40" />
                </motion.div>
            </Link>

            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse will-change-transform" />
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000 will-change-transform" />
            </div>

            <div className="container-page relative z-20 px-6 sm:px-12">
                <div className="max-w-4xl space-y-8">
                    <motion.div
                        key={`meta-${activeNews.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10"
                    >
                        <span className="text-[#0A84FF]">{CATEGORY_ICONS[activeNews.category || 'Default']}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                            {activeNews.category || 'MOMENTUM'}
                        </span>
                    </motion.div>

                    <Link href={activeNews.linkUrl} className="block transition-transform hover:scale-[1.01] active:scale-100 cursor-pointer">
                        <motion.h2
                            key={`title-${activeNews.id}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="text-[clamp(2rem,6vw,4rem)] font-bold text-white leading-[1.1] tracking-tight text-glow text-balance mb-8"
                        >
                            {activeNews.title}
                        </motion.h2>

                        <motion.p
                            key={`desc-${activeNews.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-medium text-pretty"
                        >
                            {activeNews.description}
                        </motion.p>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="flex items-center gap-8 pt-6"
                    >
                        <Link
                            href={activeNews.linkUrl}
                            className="group relative px-10 py-4 bg-[#0A84FF] text-white rounded-xl font-bold text-sm transition-all hover:bg-[#0060DF] active:scale-95 shadow-lg"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Leer más <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>

                        <div className="flex items-center gap-2 text-white/30 font-bold text-[10px] uppercase tracking-widest">
                            <span className="w-1 h-1 rounded-full bg-[#0A84FF]" />
                            <span>Sintetizado por SinapCode AI</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {banners.length > 1 && (
                <div className="absolute bottom-12 right-12 flex items-center gap-10 z-30">
                    <div className="flex gap-3">
                        {banners.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 transition-all duration-700 rounded-full ${i === currentIndex ? 'w-16 bg-primary shadow-[0_0_25px_rgba(25,127,230,0.8)]' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(25,127,230,0.4)] opacity-50" />
        </section>
    );
}
