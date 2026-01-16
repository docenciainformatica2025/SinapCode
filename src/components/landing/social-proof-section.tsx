'use client';

import { motion } from 'framer-motion';

export function SocialProofSection({ stats, companies }: { stats?: any, companies?: any }) {
    const defaultStats = [
        { value: '12,450+', label: 'Builders Activos', icon: '👨‍💻' },
        { value: '487', label: 'Tech Leads Expertos', icon: '🚀' },
        { value: '98.7%', label: 'Satisfacción Global', icon: '⭐' },
        { value: '24/7', label: 'Soporte con IA', icon: '🤖' },
    ];

    const activeStats = (stats && Array.isArray(stats) && stats.length > 0) ? stats : defaultStats;

    const defaultCompanies = [
        'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'
    ];

    const activeCompanies = (companies && Array.isArray(companies) && companies.length > 0) ? companies : defaultCompanies;

    return (
        <section className="py-12 border-y border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {activeStats.map((stat: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl mb-3">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-platinum-dim">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Companies */}
                <div className="text-center">
                    <p className="text-platinum-dim mb-8">
                        Nuestros <span className="text-gold font-medium">Builders</span> lideran proyectos en:
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                        {activeCompanies.map((company: string, i: number) => (
                            <div
                                key={i}
                                className="text-2xl font-bold text-white/80 hover:text-white transition"
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
