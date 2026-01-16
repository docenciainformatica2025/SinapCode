'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sofía Rodríguez',
            role: 'Full Stack Builder',
            company: 'Mercado Libre',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            quote: "SinapCode no es un curso, es un acelerador. Dejé mi trabajo de oficina y en 6 meses ya estaba deployando código.",
            badge: 'Verified'
        },
        {
            name: 'Carlos Mendez',
            role: 'Data Scientist',
            company: 'Nubank',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            quote: "La IA como tutor es un game-changer. Aprendí Python y Pandas más rápido que en la universidad.",
            badge: 'Verified'
        },
        {
            name: 'Ana García',
            role: 'Smart Contract Dev',
            company: 'Blockchain Startup',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            quote: "Entender Web3 parecía imposible hasta que encontré esta plataforma. Los Tech Leads saben lo que pide la industria.",
            badge: 'Verified'
        },
        {
            name: 'David Torres',
            role: 'Frontend Dev',
            company: 'Rappi',
            image: 'https://randomuser.me/api/portraits/men/86.jpg',
            quote: "Pasé de cero a junior en React en 4 meses. El portafolio que armé aquí fue clave para mi contratación.",
            badge: 'Verified'
        },
        {
            name: 'Laura P.',
            role: 'UX Engineer',
            company: 'Globant',
            image: 'https://randomuser.me/api/portraits/women/22.jpg',
            quote: "La integración de diseño y código es única. Aprendí a usar Figma y Tailwind como una pro.",
            badge: 'Verified'
        },
        {
            name: 'Miguel Ángel',
            role: 'Backend Java',
            company: 'Bancolombia',
            image: 'https://randomuser.me/api/portraits/men/54.jpg',
            quote: "Lo mejor es la comunidad. Siempre hay alguien dispuesto a ayudar, y los mentores son top.",
            badge: 'Verified'
        },
        {
            name: 'Patricia L.',
            role: 'DevOps',
            company: 'Encora',
            image: 'https://randomuser.me/api/portraits/women/90.jpg',
            quote: "Docker y Kubernetes explicados para humanos. Ahora manejo toda la infraestructura de mi startup.",
            badge: 'Verified'
        },
        {
            name: 'Jorge Ruiz',
            role: 'Mobile Dev',
            company: 'Huge',
            image: 'https://randomuser.me/api/portraits/men/29.jpg',
            quote: "Hice mi primera app en React Native gracias a los proyectos guiados. Directo al App Store.",
            badge: 'Verified'
        },
        {
            name: 'Valentina M.',
            role: 'QA Automation',
            company: 'Endava',
            image: 'https://randomuser.me/api/portraits/women/55.jpg',
            quote: "Aprendí Cypress y Selenium con casos reales. Mi salario aumentó un 40% después de certificarme.",
            badge: 'Verified'
        },
        {
            name: 'Andrés F.',
            role: 'Security Analyst',
            company: 'Scotiabank',
            image: 'https://randomuser.me/api/portraits/men/11.jpg',
            quote: "El módulo de ciberseguridad es brutal. Hacking ético explicado desde la base.",
            badge: 'Verified'
        },
        {
            name: 'Camila S.',
            role: 'Product Owner',
            company: 'Agile Co',
            image: 'https://randomuser.me/api/portraits/women/33.jpg',
            quote: "No soy técnica, pero necesitaba entender el código para gestionar mi equipo. SinapCode fue la solución.",
            badge: 'Verified'
        },
        {
            name: 'Roberto D.',
            role: 'Freelancer',
            company: 'Upwork',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            quote: "Ahora cobro en dólares trabajando desde casa. La sección de freelancing me enseñó a venderme.",
            badge: 'Verified'
        }
    ];

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
