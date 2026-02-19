'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sofía Rodríguez',
            role: 'Full Stack Builder',
            company: 'Mercado Libre',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
            quote: "SINAPCODE no es un curso, es un acelerador. Dejé mi trabajo de oficina y en 6 meses ya estaba deployando código.",
            badge: 'Verified'
        },
        {
            name: 'Carlos Mendez',
            role: 'Data Scientist',
            company: 'Nubank',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
            quote: "La IA como tutor es un game-changer. Aprendí Python y Pandas más rápido que en la universidad.",
            badge: 'Verified'
        },
        {
            name: 'Ana García',
            role: 'Smart Contract Dev',
            company: 'Blockchain Startup',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
            quote: "Entender Web3 parecía imposible hasta que encontré esta plataforma. Los Tech Leads saben lo que pide la industria.",
            badge: 'Verified'
        },
        {
            name: 'David Torres',
            role: 'Frontend Dev',
            company: 'Rappi',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
            quote: "Pasé de cero a junior en React en 4 meses. El portafolio que armé aquí fue clave para mi contratación.",
            badge: 'Verified'
        },
        {
            name: 'Laura P.',
            role: 'UX Engineer',
            company: 'Globant',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
            quote: "La integración de diseño y código es única. Aprendí a usar Figma y Tailwind como una pro.",
            badge: 'Verified'
        },
        {
            name: 'Miguel Ángel',
            role: 'Backend Java',
            company: 'Bancolombia',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
            quote: "Lo mejor es la comunidad. Siempre hay alguien dispuesto a ayudar, y los mentores son top.",
            badge: 'Verified'
        },
        {
            name: 'Patricia L.',
            role: 'DevOps',
            company: 'Encora',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
            quote: "Docker y Kubernetes explicados para humanos. Ahora manejo toda la infraestructura de mi startup.",
            badge: 'Verified'
        },
        {
            name: 'Jorge Ruiz',
            role: 'Mobile Dev',
            company: 'Huge',
            image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80',
            quote: "Hice mi primera app en React Native gracias a los proyectos guiados. Directo al App Store.",
            badge: 'Verified'
        },
        {
            name: 'Valentina M.',
            role: 'QA Automation',
            company: 'Endava',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
            quote: "Aprendí Cypress y Selenium con casos reales. Mi salario aumentó un 40% después de certificarme.",
            badge: 'Verified'
        },
        {
            name: 'Andrés F.',
            role: 'Security Analyst',
            company: 'Scotiabank',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80',
            quote: "El módulo de ciberseguridad es brutal. Hacking ético explicado desde la base.",
            badge: 'Verified'
        },
        {
            name: 'Camila S.',
            role: 'Product Owner',
            company: 'Agile Co',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80',
            quote: "No soy técnica, pero necesitaba entender el código para gestionar mi equipo. SINAPCODE fue la solución.",
            badge: 'Verified'
        },
        {
            name: 'Roberto D.',
            role: 'Freelancer',
            company: 'Upwork',
            image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80',
            quote: "Ahora cobro en dólares trabajando desde casa. La sección de freelancing me enseñó a venderme.",
            badge: 'Verified'
        }
    ];

    return (
        <section id="historias" className="py-24 bg-bg overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white italic mb-6">
                    Historias de <span className="text-primary italic">Hackers</span> Reales
                </h2>
                <p className="text-lg text-platinum-dim font-bold tracking-tight">
                    Desde principiantes hasta expertos, nuestra comunidad está en constante evolución.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden mask-gradient-x">
                {/* Track */}
                <div className="flex w-max animate-marquee gap-6 hover:pause">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[400px] p-8 m-4 bg-white/5 border border-white/10 rounded-3xl hover:border-primary transition-all duration-500 shadow-xl"
                        >
                            <div className="flex gap-4 mb-6">
                                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10" />
                                <div>
                                    <h4 className="text-white font-black italic tracking-tighter">{t.name}</h4>
                                    <p className="text-primary text-xs font-black uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-platinum-dim italic font-medium leading-relaxed mb-6">"{t.quote}"</p>
                            <div className="flex text-accent-gold gap-1">
                                {[...Array(5)].map((_, starIndex) => (
                                    <span key={starIndex} className="text-lg">★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS for Marquee - Inline for simplicity in this file scope, or add to globals.css */}\r\n            <style jsx global>{`
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
