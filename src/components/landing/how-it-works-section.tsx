'use client';

import { motion } from 'framer-motion';

export function HowItWorksSection() {
    const steps = [
        {
            number: '01',
            title: 'Elige tu Ruta',
            description: 'Selecciona entre Python, JavaScript, Hacking Ético y más. Nuestro test de nivel te ubica perfectamente.',
            icon: '🎯',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            number: '02',
            title: 'Aprende con IA',
            description: 'Tu tutor Socrático te hace preguntas para que descubras las respuestas. No te da la solución, te enseña a pensar.',
            icon: '🤖',
            color: 'from-purple-500 to-pink-500',
        },
        {
            number: '03',
            title: 'Obtén tu Certificado',
            description: 'Certificados verificados con blockchain. Compártelos en LinkedIn y destaca en el mercado laboral.',
            icon: '🏆',
            color: 'from-amber-500 to-orange-500',
        },
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neural-blue/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        ¿Cómo Funciona?
                    </h2>
                    <p className="text-xl text-platinum-dim max-w-2xl mx-auto">
                        Tres pasos simples para convertirte en desarrollador profesional
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative"
                        >
                            {/* Connecting Line */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                            )}

                            <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-neural-blue/50 transition-all group">
                                {/* Number Badge */}
                                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-sm mb-6`}>
                                    PASO {step.number}
                                </div>

                                {/* Icon */}
                                <div className="text-6xl mb-6">{step.icon}</div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neural-blue transition">
                                    {step.title}
                                </h3>
                                <p className="text-platinum-dim leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
