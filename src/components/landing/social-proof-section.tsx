'use client';

import { motion } from 'framer-motion';

export function SocialProofSection() {
    const stats = [
        { value: '12,450+', label: 'Estudiantes Activos', icon: '👨‍🎓' },
        { value: '487', label: 'Profesores Certificados', icon: '👨‍🏫' },
        { value: '98.7%', label: 'Tasa de Satisfacción', icon: '⭐' },
        { value: '24/7', label: 'Soporte con IA', icon: '🤖' },
    ];

    const companies = [
        'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'
    ];

    return (
        <section className="py-12 border-y border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, i) => (
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
                        Nuestros graduados trabajan en:
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                        {companies.map((company, i) => (
                            <div
                                key={i}
                                className="text-2xl font-bold text-white/60 hover:text-white transition"
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
