import Link from 'next/link';
import { GlobalNavbar } from '@/components/global-navbar';

import { type Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Aceleración de Talento Tech para Empresas',
    description: 'Transforma a tu equipo de ingeniería en Builders de Alto Rendimiento. ROI medible, rutas personalizadas y soporte nivel Tech Lead.',
};

export default function EnterprisePage() {
    const features = [
        {
            title: 'Skill Acceleration Platform',
            description: 'No es un LMS. Es una aceleradora de talento interno adaptada a tu stack tecnológico.',
            icon: '🚀',
        },
        {
            title: 'ROI Dashboards',
            description: 'Mide el impacto real en el delivery de tu equipo. Menos tiempo de onboarding, más código en producción.',
            icon: '📊',
        },
        {
            title: 'Enterprise SSO',
            description: 'Seguridad grado bancario con integración directa a tu Active Directory y herramientas de trabajo.',
            icon: '🔒',
        },
        {
            title: 'Tech Lead Support',
            description: 'Tus equipos no hablan con soporte nivel 1. Hablan con Tech Leads expertos.',
            icon: '👨‍💻',
        },
        {
            title: 'Custom Tech Tracks',
            description: 'Diseñamos rutas de aprendizaje basadas en la arquitectura específica de tu empresa.',
            icon: '🗺️',
        },
        {
            title: 'Blockchain Validation',
            description: 'Certificación inmutable de las habilidades adquiridas por tu equipo.',
            icon: '⛓️',
        },
    ];

    const clients = [
        { name: 'Rappi', employees: '500+' },
        { name: 'Mercado Libre', employees: '1,200+' },
        { name: 'Bancolombia', employees: '800+' },
        { name: 'Globant', employees: '2,000+' },
    ];

    const pricing = [
        {
            name: 'Startups',
            price: '$499',
            period: '/mes',
            users: 'Hasta 50 Builders',
            features: [
                'Acceso Full a la Plataforma',
                'ROI Analytics Básicos',
                'Certificados Blockchain',
                'Soporte Prioritario',
            ],
        },
        {
            name: 'Scale-Ups',
            price: '$1,499',
            period: '/mes',
            users: 'Hasta 200 Builders',
            features: [
                'Todo en Startups +',
                'Rutas Personalizadas (2)',
                'Tech Lead Account Manager',
                'Integración SSO & Slack',
                'Sesiones de Mentoría Mensual',
            ],
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            users: 'Builders Ilimitados',
            features: [
                'Arquitectura White-Label',
                'Rutas a Medida Ilimitadas',
                'SLA de 99.99%',
                'Onboarding Presencial',
                'Auditoría de Skills del Equipo',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-deep-space selection:bg-gold/30 selection:text-white">
            <GlobalNavbar />

            {/* Hero */}
            <div className="relative overflow-hidden pt-20">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 text-center">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold transition group mb-8 font-mono text-sm tracking-wider">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        VOLVER AL CENTRO DE COMANDO
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        No solo contrates talento.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Constrúyelo.</span>
                    </h1>

                    <p className="text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
                        Deja de buscar desarrolladores unicornio. Convierte a tu equipo actual en <span className="text-white font-semibold">Tech Builders de Alto Rendimiento</span> con nuestra plataforma de aceleración de skills.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/contacto"
                            className="px-8 py-4 bg-gold hover:bg-gold-light text-deep-space rounded-none font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-wide skew-x-[-10deg]"
                        >
                            <span className="skew-x-[10deg] inline-block">Agendar Demo Estratégica</span>
                        </Link>
                        <a
                            href="#pricing"
                            className="text-white font-medium hover:text-gold transition-colors underline decoration-gold/50 underline-offset-4"
                        >
                            Ver Planes de Aceleración
                        </a>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="border-y border-white/5 bg-white/[0.02] py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs font-mono text-muted uppercase tracking-[0.2em] mb-8">
                        Potenciando equipos de ingeniería en
                    </p>
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {clients.map((client, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{client.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Infraestructura de Aceleración
                    </h2>
                    <p className="text-muted">Todo lo que tu CTO necesita para escalar el equipo.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="p-8 bg-surface/30 border border-white/5 hover:border-gold/30 transition-all duration-300 group">
                            <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{feature.title}</h3>
                            <p className="text-muted leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-deep-space to-surfaceSoft py-24 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { val: '70%', label: 'Ahorro en Hiring' },
                            { val: '3x', label: 'Velocidad de Delivery' },
                            { val: '95%', label: 'Retención de Talento' },
                            { val: '24/7', label: 'Soporte Expertos' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2">{stat.val}</div>
                                <div className="text-sm font-mono text-gold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div id="pricing" className="max-w-7xl mx-auto px-6 py-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
                    Inversión en Talento
                </h2>
                <p className="text-lg text-muted text-center mb-16 max-w-2xl mx-auto">
                    Escala tu equipo de ingeniería con planes predecibles y transparentes.
                </p>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {pricing.map((plan, i) => (
                        <div
                            key={i}
                            className={`p-8 bg-surface border ${plan.popular ? 'border-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] transform md:-translate-y-4' : 'border-white/10 hover:border-white/30'
                                } relative transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0">
                                    <span className="bg-gold text-deep-space px-4 py-1 text-xs font-bold uppercase tracking-wider">
                                        Recomendado
                                    </span>
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-white">{plan.price}</span>
                                <span className="text-muted text-sm">{plan.period}</span>
                            </div>
                            <p className="text-sm text-gold/80 mb-8 font-mono">{plan.users}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-muted">
                                        <span className="text-gold mt-0.5">▹</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contacto"
                                className={`block text-center py-4 font-bold transition-all uppercase tracking-wider text-xs ${plan.popular
                                    ? 'bg-gold text-deep-space hover:bg-gold-light'
                                    : 'bg-white/5 text-white hover:bg-white/10'
                                    }`}
                            >
                                Contactar Growth
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="py-24 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                    ¿Tu equipo está listo para el siguiente nivel?
                </h2>
                <Link
                    href="/contacto"
                    className="inline-block px-12 py-5 border border-gold text-gold hover:bg-gold hover:text-deep-space transition-all font-bold uppercase tracking-widest text-sm"
                >
                    Hablar con un estratega
                </Link>
            </div>
        </div>
    );
}
