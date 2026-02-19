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
            color: 'bg-[#F2FAF7]', // Mint Pastel ultra pale
            borderColor: 'border-emerald-200/50',
            textColor: 'text-[#1A1A1A]',
            mutedColor: 'text-[#1A1A1A]/60',
            btnClass: 'btn-secondary !bg-emerald-100 border-none'
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
            color: 'bg-[#F2F8FF]', // Blue Pastel ultra pale
            borderColor: 'border-blue-200',
            textColor: 'text-[#1A1A1A]',
            mutedColor: 'text-[#1A1A1A]/60',
            btnClass: 'btn-primary shadow-xl shadow-blue-200/50'
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
            color: 'bg-[#F2F0FF]', // Lavender Pastel ultra pale
            borderColor: 'border-indigo-200/50',
            textColor: 'text-[#1A1A1A]',
            mutedColor: 'text-[#1A1A1A]/60',
            btnClass: 'btn-secondary !bg-indigo-100 border-none'
        },
    ];

    return (
        <section id="membresia" className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient-blue opacity-30 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
                        Membresía <span className="bg-gradient-to-r from-apple-blue to-emerald-300 bg-clip-text text-transparent">SinapCode Pro</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-platinum-dim font-medium">
                        Sin contratos ocultos. Cancela cuando quieras. Acelera tu carrera hoy bajo el estándar Apple de ingeniería.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative rounded-[2.5rem] p-6 md:p-10 border transition-all duration-500 group ${plan.color} ${plan.borderColor} ${plan.popular
                                ? 'shadow-2xl shadow-apple-blue/10 scale-105 z-10'
                                : 'hover:scale-[1.02]'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-apple-blue text-black text-[10px] font-black px-6 py-2.5 rounded-full shadow-2xl shadow-apple-blue/40 whitespace-nowrap tracking-widest border-2 border-white z-20">
                                    MÁS VENDIDO
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-xl font-black mb-2 ${plan.textColor}`}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${plan.textColor}`}>
                                        {plan.price}
                                    </span>
                                    {plan.period && <span className={`${plan.mutedColor} text-sm font-bold uppercase tracking-widest`}>{plan.period}</span>}
                                </div>
                                <p className={`${plan.mutedColor} text-sm mt-4 min-h-[40px] font-semibold leading-relaxed`}>{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className={`flex items-start gap-3 text-sm font-bold ${plan.textColor}`}>
                                        <svg className="w-5 h-5 flex-shrink-0 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={`inline-flex items-center justify-center w-full rounded-2xl py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 ${plan.btnClass}`}
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
