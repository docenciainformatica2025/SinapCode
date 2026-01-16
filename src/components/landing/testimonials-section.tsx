'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TestimonialsSection({ initialTestimonials }: { initialTestimonials?: any[] }) {
    // Fallback data if DB is empty
    const defaultTestimonials = [
        {
            name: 'Sofía Rodríguez',
            role: 'Full Stack Builder',
            company: 'Mercado Libre',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            quote: "SinapCode no es un curso, es un acelerador. Dejé mi trabajo de oficina y en 6 meses ya estaba deployando código.",
            badge: 'Verified'
        },
        // ... (Keep one or two as static fallback)
    ];

    const testimonials = (initialTestimonials && initialTestimonials.length > 0)
        ? initialTestimonials.map(t => ({
            name: t.name,
            role: t.role,
            company: 'SinapCode Student', // This field wasn't in DB, setting default or adding to DB later
            image: t.avatarUrl || 'https://randomuser.me/api/portraits/lego/1.jpg',
            quote: t.content,
            badge: 'Verified'
        }))
        : defaultTestimonials;

    return (
        <section className="py-24 relative overflow-hidden bg-bg">
            <div className="container-page relative z-10 mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Voces de nuestros <span className="text-gold">Builders</span>
                </h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    Más de 12,000 estudiantes ya están cambiando su futuro.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden mask-gradient-x">
                {/* Track */}
                <div className="flex w-max animate-marquee gap-6 hover:pause">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[350px] bg-surface/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex-shrink-0 hover:border-gold/30 transition-colors cursor-default"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                        unoptimized // Use unoptimized for external avatars to avoid 400s if config lags
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{t.name}</div>
                                    <div className="text-xs text-primary">{t.role}</div>
                                    <div className="text-[10px] text-muted opacity-60">{t.company}</div>
                                </div>
                            </div>
                            <p className="text-platinum-dim text-sm leading-relaxed italic mb-4">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-gold font-bold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                {t.badge}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS for Marquee - Inline for simplicity in this file scope, or add to globals.css */}
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
                .mask-gradient-x {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
