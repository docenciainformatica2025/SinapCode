'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        return <div className="h-[40vh] bg-[#F1F0E8] animate-pulse flex items-center justify-center font-serif text-[#C9A78A]">Sincronizando SinapCode...</div>;
    }

    return (
        <section className="relative w-full py-24 bg-[#F1F0E8] overflow-hidden">
            <div className="container-page relative z-20 px-6 sm:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Texto e Impacto */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <motion.div
                            key={`meta-${activeNews.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C9A78A]/20 shadow-sm"
                        >
                            <span className="text-[#C9A78A]">{CATEGORY_ICONS[activeNews.category || 'Default']}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
                                {activeNews.category || 'IA IMPACT'}
                            </span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h2
                                key={`title-${activeNews.id}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-6xl font-serif font-medium text-[#1E1E1E] leading-[1.1] tracking-tight"
                            >
                                {activeNews.title}
                            </motion.h2>

                            <motion.p
                                key={`desc-${activeNews.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-lg md:text-xl text-[#1E1E1E]/70 max-w-xl leading-relaxed font-light italic"
                            >
                                {activeNews.description}
                            </motion.p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                            <Link
                                href={activeNews.linkUrl}
                                className="group px-10 py-4 bg-[#1E1E1E] text-white rounded-full font-medium text-sm transition-all hover:bg-[#C9A78A] active:scale-95 shadow-lg"
                            >
                                <span className="flex items-center gap-2">
                                    Explorar Análisis <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>

                            <div className="flex items-center gap-2 text-[#C9A78A] font-bold text-[9px] uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A78A] animate-pulse" />
                                <span>SinapCode Alpha v2.4</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual con Estética Apple Studio */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            key={`image-${activeNews.id}`}
                            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white group"
                        >
                            <Image
                                src={activeNews.imageUrl}
                                alt={activeNews.title}
                                fill
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/40 to-transparent opacity-60" />
                        </motion.div>
                    </div>

                </div>

                {/* Progress Indicators */}
                {banners.length > 1 && (
                    <div className="mt-16 flex justify-center gap-3">
                        {banners.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1 transition-all duration-700 rounded-full ${i === currentIndex ? 'w-20 bg-[#C9A78A]' : 'w-6 bg-[#C9A78A]/20 hover:bg-[#C9A78A]/40'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
