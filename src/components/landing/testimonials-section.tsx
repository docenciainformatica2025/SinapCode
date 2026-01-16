'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sofía Rodríguez',
            role: 'Full Stack Builder',
            company: 'Mercado Libre',
            image: 'https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=random',
            quote: "SinapCode no es un curso, es un acelerador de carrera. Dejé mi trabajo de oficina y en 6 meses ya estaba deployando código en producción.",
            badge: 'Verified Builder'
        },
        {
            name: 'Carlos Mendez',
            role: 'Data Scientist',
            company: 'Nubank',
            image: 'https://ui-avatars.com/api/?name=Carlos+Mendez&background=random',
            quote: "La IA como tutor es un game-changer. Jamás me sentí atascado. Aprendí Python y Pandas más rápido que en la universidad.",
            badge: 'Verified Builder'
        },
        {
            name: 'Ana García',
            role: 'Smart Contract Dev',
            company: 'Blockchain Startup',
            image: 'https://ui-avatars.com/api/?name=Ana+Garcia&background=random',
            quote: "Entender Web3 parecía imposible hasta que encontré esta plataforma. Los Tech Leads saben exactamente lo que pide la industria hoy.",
            badge: 'Verified Builder'
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />

            <div className="container-page relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Voces de nuestros <span className="text-gold">Builders</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Historias reales de personas que transformaron su futuro con tecnología.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-surface/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl relative group hover:border-gold/20 transition-colors"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-4xl text-primary/20 font-serif">"</div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-gold/50 transition-colors">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-primary">{t.role}</div>
                                    <div className="text-[10px] text-muted uppercase tracking-wider mt-0.5">at {t.company}</div>
                                </div>
                            </div>

                            <p className="text-platinum-dim leading-relaxed italic relative z-10">
                                {t.quote}
                            </p>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs text-gold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                    {t.badge}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
