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
        <section className="py-20 md:py-28 bg-black border-y border-white/5 relative overflow-hidden section-spacing subpixel-text">
            <div className="absolute top-0 inset-0 pointer-events-none opacity-50">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
            </div>
            <div className="max-w-7xl mx-auto px-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 relative z-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-700">
                            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 mb-2 group-hover:from-white group-hover:to-primary transition-all duration-500 italic tracking-tighter">
                                {stat.value}
                            </h3>
                            <p className="text-[10px] md:text-xs font-black text-platinum-dim uppercase tracking-[0.3em] flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Companies Infinite Scroll */}
                <div className="text-center relative">
                    <p className="text-[10px] font-black text-platinum-dim uppercase tracking-[0.4em] mb-12 opacity-60 italic">
                        PROTOCOLOS VALIDADOS POR <span className="text-primary tracking-normal">BUILDERS ELITE</span>
                    </p>

                    <div className="relative flex overflow-hidden mask-linear-fade py-4">
                        <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 opacity-30 grayscale hover:opacity-100 transition-all duration-700">
                            {[...companies, ...companies, ...companies].map((company, i) => (
                                <span key={`${company}-${i}`} className="text-xl md:text-3xl font-black text-white tracking-tighter italic opacity-50 hover:opacity-100 hover:text-primary transition-all">
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
