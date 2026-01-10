import Link from 'next/link';

export default function EnterprisePage() {
    const features = [
        {
            title: 'LMS Personalizado',
            description: 'Plataforma de aprendizaje adaptada a tu marca y necesidades específicas.',
            icon: '🎓',
        },
        {
            title: 'Analytics Avanzados',
            description: 'Dashboards en tiempo real del progreso de tus equipos y ROI de capacitación.',
            icon: '📊',
        },
        {
            title: 'SSO & Integraciones',
            description: 'Integración con tu Active Directory, Slack, Teams y herramientas existentes.',
            icon: '🔗',
        },
        {
            title: 'Soporte Dedicado',
            description: 'Account manager dedicado y soporte prioritario 24/7.',
            icon: '🎯',
        },
        {
            title: 'Contenido Personalizado',
            description: 'Cursos a medida para las tecnologías específicas de tu empresa.',
            icon: '✨',
        },
        {
            title: 'Certificaciones',
            description: 'Certificados verificados con blockchain para validar habilidades.',
            icon: '🏆',
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
            name: 'Startup',
            price: '$499',
            period: '/mes',
            users: 'Hasta 50 usuarios',
            features: [
                'Todos los cursos incluidos',
                'Analytics básicos',
                'Soporte por email',
                'Certificados digitales',
                'Integración SSO',
            ],
        },
        {
            name: 'Business',
            price: '$1,499',
            period: '/mes',
            users: 'Hasta 200 usuarios',
            features: [
                'Todo de Startup +',
                'Analytics avanzados',
                'Account manager dedicado',
                'Contenido personalizado',
                'Integraciones ilimitadas',
                'Soporte prioritario 24/7',
            ],
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            users: 'Usuarios ilimitados',
            features: [
                'Todo de Business +',
                'LMS white-label',
                'Cursos a medida',
                'SLA garantizado',
                'Onboarding dedicado',
                'Reportes personalizados',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-deep-space">
            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative z-10">
                    <div className="text-center mb-12">
                        <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                            ← Volver al inicio
                        </Link>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            Capacita a tu Equipo con IA
                        </h1>
                        <p className="text-lg sm:text-xl text-[#B8BFC9] max-w-3xl mx-auto mb-8">
                            Acelera el upskilling de tus desarrolladores con nuestra plataforma empresarial.
                            Reduce costos de capacitación en un 70% y aumenta la productividad en 3 meses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contacto"
                                className="px-8 py-4 bg-neural-blue text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-neon-blue"
                            >
                                Solicitar Demo
                            </Link>
                            <a
                                href="#pricing"
                                className="px-8 py-4 bg-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition border border-white/20"
                            >
                                Ver Precios
                            </a>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="text-center">
                        <p className="text-sm text-[#B8BFC9] mb-6">Confían en nosotros:</p>
                        <div className="flex flex-wrap justify-center gap-8">
                            {clients.map((client, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl font-bold text-white">{client.name}</div>
                                    <div className="text-xs text-[#B8BFC9]">{client.employees} capacitados</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                    Todo lo que Necesitas para Capacitar
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-neural-blue/50 transition">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-[#B8BFC9]">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white/[0.02] py-16 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">70%</div>
                            <div className="text-sm text-[#B8BFC9]">Reducción de Costos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">3x</div>
                            <div className="text-sm text-[#B8BFC9]">Más Rápido que Cursos Tradicionales</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">95%</div>
                            <div className="text-sm text-[#B8BFC9]">Tasa de Completación</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">24/7</div>
                            <div className="text-sm text-[#B8BFC9]">Soporte con IA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
                    Planes Empresariales
                </h2>
                <p className="text-lg text-[#B8BFC9] text-center mb-12">
                    Elige el plan que mejor se adapte al tamaño de tu equipo
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {pricing.map((plan, i) => (
                        <div
                            key={i}
                            className={`glass-panel p-8 rounded-2xl border ${plan.popular ? 'border-neural-blue shadow-neon-blue' : 'border-white/10'
                                } relative`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-neural-blue text-white px-4 py-1 rounded-full text-xs font-bold">
                                        MÁS POPULAR
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-[#B8BFC9]">{plan.period}</span>
                            </div>
                            <p className="text-sm text-[#B8BFC9] mb-6">{plan.users}</p>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-[#B8BFC9]">
                                        <span className="text-neural-blue">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contacto"
                                className={`block text-center py-3 rounded-lg font-bold transition ${plan.popular
                                        ? 'bg-neural-blue text-white hover:bg-blue-600'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                Contactar Ventas
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-neural-blue/20 to-synapse-purple/20 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        ¿Listo para Transformar tu Equipo?
                    </h2>
                    <p className="text-lg text-[#B8BFC9] mb-8">
                        Agenda una demo personalizada y descubre cómo SinapCode puede acelerar el crecimiento de tu empresa.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-block px-8 py-4 bg-neural-blue text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-neon-blue"
                    >
                        Solicitar Demo →
                    </Link>
                </div>
            </div>
        </div>
    );
}
