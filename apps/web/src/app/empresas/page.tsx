import Link from 'next/link';

import { type Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Aceleración de Talento Tech para Empresas',
    description: 'Transforma a tu equipo de ingeniería en Builders de Alto Rendimiento. ROI medible, rutas personalizadas y soporte nivel Tech Lead.',
};

export default function EnterprisePage() {
    const features = [
        {
            title: 'Plataforma de Aceleración de Skills',
            description: 'No es un LMS. Es una aceleradora de talento interno adaptada a tu stack tecnológico.',
            icon: '🚀',
        },
        {
            title: 'Paneles de ROI',
            description: 'Mide el impacto real en el delivery de tu equipo. Menos tiempo de onboarding, más código en producción.',
            icon: '📊',
        },
        {
            title: 'SSO Empresarial',
            description: 'Seguridad grado bancario con integración directa a tu Active Directory y herramientas de trabajo.',
            icon: '🔒',
        },
        {
            title: 'Soporte de Tech Lead',
            description: 'Tus equipos no hablan con soporte nivel 1. Hablan con Tech Leads expertos.',
            icon: '👨‍💻',
        },
        {
            title: 'Rutas Tech a Medida',
            description: 'Diseñamos rutas de aprendizaje basadas en la arquitectura específica de tu empresa.',
            icon: '🗺️',
        },
        {
            title: 'Validación en Blockchain',
            description: 'Certificación inmutable de las habilidades adquiridas por tu equipo.',
            icon: '⛓️',
        },
    ];

    const clients = [
        { name: 'Rappi', employees: '500+' },
        { name: 'Mercado Libre', employees: '1,200+' },
        { name: 'HSBC', employees: '800+' },
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
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#C9A78A]/10 via-transparent to-transparent rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#1E1E1E]/5 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

            {/* Hero */}
            <div className="relative overflow-hidden pt-20">
                <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 text-center">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#C9A78A] hover:text-[#1E1E1E] transition group mb-8 font-black text-[10px] uppercase tracking-[0.3em]">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        VOLVER AL CENTRO DE COMANDO
                    </Link>

                    <h1 className="text-5xl md:text-8xl font-black text-[#1E1E1E] mb-8 tracking-tighter leading-none italic uppercase">
                        No solo contrates talento.<br />
                        <span className="text-[#C9A78A]">Constrúyelo</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#1E1E1E]/60 max-w-3xl mx-auto mb-12 font-medium leading-relaxed italic">
                        Deja de buscar desarrolladores unicornio. Convierte a tu equipo actual en <span className="text-[#1E1E1E] font-black">Builders de Alto Rendimiento</span> con nuestra plataforma de aceleración de skills.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/contacto"
                            className="px-12 py-5 bg-[#1E1E1E] text-[#F1F0E8] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:-translate-y-1 transition-all shadow-2xl shadow-[#1E1E1E]/20"
                        >
                            Agendar Demo Estratégica
                        </Link>
                        <a
                            href="#pricing"
                            className="text-[#1E1E1E]/40 font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#C9A78A] transition-colors border-b-2 border-transparent hover:border-[#C9A78A] pb-1"
                        >
                            Planes de Aceleración
                        </a>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="border-y border-[#1E1E1E]/5 bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-black text-[#1E1E1E]/30 uppercase tracking-[0.3em] mb-8 italic">
                        Potenciando equipos de ingeniería en
                    </p>
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {clients.map((client, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-2xl font-black text-[#1E1E1E] mb-1 group-hover:text-[#C9A78A] transition-colors italic tracking-tighter uppercase">{client.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-[#C9A78A]" />
                        <span className="text-[10px] font-black text-[#C9A78A] uppercase tracking-[0.3em]">INFRAESTRUCTURA DE ELITE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1E1E1E] mb-4 tracking-tighter italic uppercase">
                        Protocolos de <span className="opacity-40">Aceleración</span>
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="p-10 bg-white border border-[#1E1E1E]/5 rounded-[2.5rem] hover:border-[#C9A78A]/30 transition-all duration-500 group shadow-[0_20px_50px_rgba(30,30,30,0.02)] hover:shadow-2xl">
                            <div className="w-20 h-20 bg-[#F1F0E8] rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                            <h3 className="text-2xl font-black text-[#1E1E1E] mb-4 tracking-tighter italic uppercase">{feature.title}</h3>
                            <p className="text-[#1E1E1E]/60 font-medium leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="bg-[#1E1E1E] py-32 border-y border-[#1E1E1E]/10 relative overflow-hidden text-[#F1F0E8]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A78A]/10 rounded-full blur-[120px] -z-0" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { val: '70%', label: 'Ahorro en Hiring' },
                            { val: '3x', label: 'Velocidad de Delivery' },
                            { val: '95%', label: 'Retención de Talento' },
                            { val: '24/7', label: 'Soporte Tech Lead' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-5xl font-black text-[#C9A78A] mb-3 tracking-tighter italic">{stat.val}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div id="pricing" className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-[#1E1E1E] mb-4 tracking-tighter italic">
                        Inversión en <span className="text-[#C9A78A]">Talento Critico</span>
                    </h2>
                    <p className="text-lg text-[#1E1E1E]/60 max-w-2xl mx-auto font-medium italic">
                        Escala tu equipo de ingeniería con planes predecibles y transparentes.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 items-start">
                    {pricing.map((plan, i) => (
                        <div
                            key={i}
                            className={`p-10 rounded-[3rem] border transition-all duration-500 relative flex flex-col h-full bg-white ${plan.popular
                                ? 'border-[#C9A78A] shadow-[0_30px_60px_rgba(201,167,138,0.15)] md:-translate-y-8 z-20'
                                : 'border-[#1E1E1E]/5 hover:border-[#1E1E1E]/20 shadow-sm hover:shadow-xl'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-[#C9A78A] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                        Recomendado
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-black text-[#1E1E1E] mb-2 tracking-tighter italic uppercase">{plan.name}</h3>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-[#1E1E1E] tracking-tighter italic">{plan.price}</span>
                                <span className="text-[#1E1E1E]/40 font-black text-xs uppercase tracking-widest">{plan.period}</span>
                            </div>
                            <p className="text-[10px] text-[#C9A78A] mb-8 font-black uppercase tracking-widest bg-[#C9A78A]/10 px-4 py-1.5 rounded-full inline-block self-start">
                                {plan.users}
                            </p>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm font-medium text-[#1E1E1E]/60">
                                        <span className="text-[#C9A78A] mt-1 text-xs">◆</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contacto"
                                className={`block text-center py-5 rounded-2xl font-black transition-all uppercase tracking-[0.2em] text-xs ${plan.popular
                                    ? 'bg-[#1E1E1E] text-[#F1F0E8] shadow-2xl shadow-[#1E1E1E]/30 hover:-translate-y-1'
                                    : 'bg-[#F1F0E8] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-[#F1F0E8]'
                                    }`}
                            >
                                Contactar Growth
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-5xl mx-auto px-6 py-32 text-center">
                <div className="bg-white p-16 md:p-24 rounded-[4rem] border border-[#1E1E1E]/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/10 rounded-full blur-[100px] -z-0 group-hover:bg-[#C9A78A]/20 transition-all duration-700" />
                    <h2 className="text-4xl md:text-6xl font-black text-[#1E1E1E] mb-8 tracking-tighter leading-tight italic uppercase relative z-10">
                        ¿Tu equipo está listo para<br />
                        <span className="text-[#C9A78A]">el Siguiente Nivel?</span>
                    </h2>
                    <p className="text-xl text-[#1E1E1E]/60 mb-12 max-w-xl mx-auto font-medium relative z-10">
                        Diseñamos rutas de aceleración customizadas para tu stack actual. Roi medible desde el día 1.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-block px-12 py-6 bg-[#1E1E1E] text-[#F1F0E8] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:-translate-y-1 transition-all shadow-2xl shadow-[#1E1E1E]/20 relative z-10"
                    >
                        Hablar con un Estratega
                    </Link>
                </div>
            </div>
        </div>
    );
}
