'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function PricingSection() {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'para siempre',
            description: 'Perfecto para empezar',
            features: [
                '3 cursos completos',
                'Tutor IA básico',
                'Comunidad Discord',
                'Certificados digitales',
                'Soporte por email',
            ],
            cta: 'Empieza Gratis',
            href: '/auth/register',
            popular: false,
        },
        {
            name: 'Pro',
            price: '$19',
            period: '/mes',
            description: 'Para estudiantes serios',
            features: [
                'Todos los cursos (50+)',
                'Tutor IA avanzado',
                'Proyectos reales',
                'Certificados blockchain',
                'Soporte prioritario',
                'Sesiones 1-on-1',
                'Acceso a eventos',
            ],
            cta: 'Prueba 7 Días Gratis',
            href: '/auth/register?plan=pro',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'Para empresas y escuelas',
            features: [
                'Todo de Pro',
                'Dashboard admin',
                'SSO / SAML',
                'Reportes personalizados',
                'Onboarding dedicado',
                'SLA garantizado',
                'Facturación anual',
            ],
            cta: 'Contactar Ventas',
            href: '/contact',
            popular: false,
        },
    ];

    return (
        <section id="pricing" className="py-20 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Precios Transparentes
                    </h2>
                    <p className="text-xl text-platinum-dim max-w-2xl mx-auto">
                        Sin costos ocultos. Cancela cuando quieras. Garantía de 30 días.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-panel p-8 rounded-2xl border ${plan.popular
                                ? 'border-neural-blue shadow-neon-blue scale-105'
                                : 'border-white/10'
                                } relative`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neural-blue text-white text-sm font-bold rounded-full">
                                    MÁS POPULAR
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-platinum-dim mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                                    <span className="text-platinum-dim">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <span className="text-emerald-400 mt-1">✓</span>
                                        <span className="text-platinum-dim">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={`block w-full py-4 rounded-xl font-bold text-center transition ${plan.popular
                                    ? 'bg-neural-blue text-white hover:bg-blue-600 shadow-neon-blue'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12 text-sm text-platinum-dim">
                    <p>
                        💳 Aceptamos todas las tarjetas · 🔒 Pago seguro con Stripe · 🌍 Facturación global
                    </p>
                </div>
            </div>
        </section>
    );
}
