import Link from 'next/link';
import { GlobalNavbar } from '@/components/global-navbar';

export const dynamic = 'force-dynamic';
export default function TeachersPage() {
    const benefits = [
        {
            title: 'Gana hasta $5,000/mes',
            description: 'Los profesores top ganan entre $3,000 y $5,000 USD mensuales enseñando lo que aman.',
            icon: '💰',
        },
        {
            title: 'Trabaja desde Cualquier Lugar',
            description: 'Crea cursos una vez y genera ingresos pasivos. 100% remoto, tu propio horario.',
            icon: '🌍',
        },
        {
            title: 'Plataforma Todo-en-Uno',
            description: 'Hosting de videos, editor de cursos, sistema de pagos, analytics. Todo incluido.',
            icon: '🛠️',
        },
        {
            title: 'Alcance Global',
            description: 'Acceso a 12,000+ estudiantes activos en Latinoamérica y creciendo.',
            icon: '🚀',
        },
        {
            title: 'Soporte Completo',
            description: 'Equipo dedicado para ayudarte a crear, promocionar y vender tus cursos.',
            icon: '🤝',
        },
        {
            title: 'Sin Costos Iniciales',
            description: 'Gratis empezar. Solo pagamos cuando tú ganas (comisión del 30%).',
            icon: '✨',
        },
    ];

    const steps = [
        {
            number: '1',
            title: 'Aplica',
            description: 'Completa el formulario y cuéntanos sobre tu experiencia y el curso que quieres crear.',
        },
        {
            number: '2',
            title: 'Revisión',
            description: 'Nuestro equipo revisa tu aplicación en 48 horas y agenda una llamada contigo.',
        },
        {
            number: '3',
            title: 'Crea',
            description: 'Accede a nuestra plataforma, sube tu contenido y diseña tu curso con nuestras herramientas.',
        },
        {
            number: '4',
            title: 'Publica y Gana',
            description: 'Lanza tu curso, nosotros lo promocionamos y tú empiezas a ganar desde el primer estudiante.',
        },
    ];

    const requirements = [
        'Experiencia profesional de al menos 2 años en el área que enseñarás',
        'Pasión por enseñar y compartir conocimiento',
        'Disponibilidad para crear contenido de calidad (videos, ejercicios, quizzes)',
        'Buena conexión a internet y equipo básico de grabación',
        'Compromiso de responder preguntas de estudiantes',
    ];

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />

            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neural-blue/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-synapse-purple/20 rounded-full blur-[120px]" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-platinum-dim hover:text-white transition group mb-8">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Volver al Dashboard
                    </Link>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            Enseña y Gana con SinapCode
                        </h1>
                        <p className="text-lg sm:text-xl text-[#B8BFC9] max-w-3xl mx-auto mb-8">
                            Comparte tu conocimiento con miles de estudiantes en Latinoamérica.
                            Crea cursos una vez y genera ingresos pasivos cada mes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contacto"
                                className="px-8 py-4 bg-neural-blue text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-neon-blue"
                            >
                                Aplicar Ahora
                            </Link>
                            <a
                                href="#como-funciona"
                                className="px-8 py-4 bg-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition border border-white/20"
                            >
                                Cómo Funciona
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-neural-blue mb-1">487</div>
                            <div className="text-sm text-[#B8BFC9]">Profesores Activos</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-neural-blue mb-1">$3.5K</div>
                            <div className="text-sm text-[#B8BFC9]">Ingreso Promedio/Mes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-neural-blue mb-1">12K+</div>
                            <div className="text-sm text-[#B8BFC9]">Estudiantes Activos</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-neural-blue mb-1">70%</div>
                            <div className="text-sm text-[#B8BFC9]">Revenue Share</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                    Por qué Enseñar con Nosotros
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-neural-blue/50 transition">
                            <div className="text-4xl mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-[#B8BFC9]">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it Works */}
            <div id="como-funciona" className="bg-white/[0.02] py-16 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
                        Cómo Empezar
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 bg-neural-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-sm text-[#B8BFC9]">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Requirements */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                    Requisitos
                </h2>
                <div className="glass-panel p-8 rounded-2xl border border-white/10">
                    <ul className="space-y-4">
                        {requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-3 text-[#B8BFC9]">
                                <span className="text-neural-blue text-xl">✓</span>
                                <span>{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Revenue Share */}
            <div className="bg-gradient-to-r from-neural-blue/20 to-synapse-purple/20 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                        Modelo de Ingresos
                    </h2>
                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="text-center">
                                <div className="text-6xl font-bold text-neural-blue mb-2">70%</div>
                                <div className="text-lg text-white font-bold mb-2">Para Ti</div>
                                <div className="text-sm text-[#B8BFC9]">De cada venta de tu curso</div>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl font-bold text-[#B8BFC9] mb-2">30%</div>
                                <div className="text-lg text-white font-bold mb-2">Para SinapCode</div>
                                <div className="text-sm text-[#B8BFC9]">Hosting, pagos, marketing, soporte</div>
                            </div>
                        </div>
                        <p className="text-center text-[#B8BFC9]">
                            <strong className="text-white">Sin costos iniciales.</strong> Solo pagamos cuando tú ganas.
                            Pagos mensuales directos a tu cuenta bancaria.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    ¿Listo para Empezar?
                </h2>
                <p className="text-lg text-[#B8BFC9] mb-8">
                    Únete a cientos de profesores que ya están generando ingresos pasivos enseñando lo que aman.
                </p>
                <Link
                    href="/contacto"
                    className="inline-block px-8 py-4 bg-neural-blue text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-neon-blue"
                >
                    Aplicar como Profesor →
                </Link>
            </div>
        </div>
    );
}
