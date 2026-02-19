'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function PricingSection() {
    const plans = [
        {
            name: 'Gratis',
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
            name: 'Empresa',
            price: 'A medida',
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
        <section id="pricing" className="py-24 bg-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Elige tu <span className="text-primary">Plan de Poder</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-platinum-dim">
                        Sin contratos ocultos. Cancela cuando quieras. Acelera tu carrera hoy.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative rounded-2xl p-8 border transition-all duration-300 ${plan.popular
                                ? 'bg-white border-primary shadow-xl hover:-translate-y-2 scale-105 z-10'
                                : 'bg-gray-50 border-gray-200 hover:-translate-y-1 hover:shadow-lg'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                    MÁS POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-gray-900' : 'text-gray-900'}`}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-bold ${plan.popular ? 'text-primary' : 'text-gray-900'}`}>
                                        {plan.price}
                                    </span>
                                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                                </div>
                                <p className="text-gray-500 text-sm mt-4 min-h-[40px]">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                                        <svg className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={`block w-full py-4 rounded-xl font-bold text-center transition-all ${plan.popular
                                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
