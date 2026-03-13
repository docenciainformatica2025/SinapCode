'use client';

import { motion } from 'framer-motion';

interface SocialProofSectionProps {
    data?: any;
}

export function SocialProofSection({ data }: SocialProofSectionProps) {
    const stats = [
        { value: '12,450+', label: 'Builders Activos', icon: '👨‍💻' },
        { value: '487', label: 'Tech Leads Expertos', icon: '🚀' },
        { value: '98.7%', label: 'Satisfacción Global', icon: '⭐' },
        { value: '24/7', label: 'Soporte con IA', icon: '🤖' },
    ];

    const companies = [
        'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'
    ];

    return (
        <section id="historias" className="py-20 md:py-28 bg-cloud-dancer border-y border-clubroom-black/5 relative overflow-hidden section-spacing">
            <div className="absolute top-0 inset-0 pointer-events-none opacity-30">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-terracotta/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-bio-graphing/20 rounded-full blur-[100px]" />
            </div>
            <div className="max-w-7xl mx-auto px-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 relative z-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group p-8 rounded-[2.5rem] bg-white border border-clubroom-black/5 hover:border-terracotta/30 transition-all duration-700 shadow-sm">
                            <h3 className="text-5xl font-serif font-medium text-clubroom-black mb-2 tracking-tight">
                                {stat.value}
                            </h3>
                            <p className="text-[11px] font-bold text-clubroom-black/60 uppercase tracking-widest flex items-center justify-center gap-2 group-hover:text-terracotta transition-colors">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Companies Infinite Scroll */}
                <div className="text-center relative">
                    <p className="text-[11px] font-bold text-clubroom-black/60 uppercase tracking-[0.2em] mb-12">
                        Nuestra red de ingenieros colabora con empresas de primer nivel
                    </p>

                    <div className="relative flex overflow-hidden mask-linear-fade py-4">
                        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
                            {[...companies, ...companies, ...companies].map((company, i) => (
                                <span key={`${company}-${i}`} className="text-xl md:text-2xl font-serif italic text-clubroom-black hover:text-terracotta transition-all">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
