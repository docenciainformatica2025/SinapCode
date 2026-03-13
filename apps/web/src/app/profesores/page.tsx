import Link from 'next/link';

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
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30">
            {/* Hero */}
            <div className="relative overflow-hidden pt-20">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#C9A78A]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#1E1E1E]/5 rounded-full blur-[120px]" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 relative z-10">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="w-2 h-2 bg-[#C9A78A] rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em]">RECLUTAMIENTO DE ELITE_</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#1E1E1E] tracking-tighter leading-none mb-8 italic">
                            Enseña y Gana con <span className="text-[#C9A78A]">SinapCode_</span>
                        </h1>
                        <p className="text-xl text-[#1E1E1E]/60 max-w-3xl mx-auto mb-12 font-medium">
                            Comparte tu conocimiento con miles de estudiantes en Latinoamérica.
                            Crea cursos una vez y genera ingresos pasivos cada mes con tecnología de grado estudio.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/contacto"
                                className="px-10 py-5 bg-[#1E1E1E] text-[#F1F0E8] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:-translate-y-1 transition-all shadow-2xl shadow-[#1E1E1E]/20"
                            >
                                Aplicar Ahora_
                            </Link>
                            <a
                                href="#como-funciona"
                                className="px-10 py-5 bg-white text-[#1E1E1E] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#F1F0E8] transition-all border border-[#1E1E1E]/5 shadow-sm"
                            >
                                Cómo Funciona_
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { val: '487', label: 'Profesores Activos' },
                            { val: '$3.5K', label: 'Ingreso Promedio/Mes' },
                            { val: '12K+', label: 'Estudiantes Activos' },
                            { val: '70%', label: 'Revenue Share' }
                        ].map((s, i) => (
                            <div key={i} className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-[#1E1E1E]/5">
                                <div className="text-4xl font-black text-[#1E1E1E] mb-2 tracking-tighter italic">{s.val}</div>
                                <div className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-[2px] bg-[#C9A78A]" />
                            <span className="text-[10px] font-black text-[#C9A78A] uppercase tracking-[0.3em]">BENEFICIOS PREMIUM</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-[#1E1E1E] tracking-tighter italic">
                            Por qué Enseñar con <span className="opacity-40">Nuestro Estudio_</span>
                        </h2>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-[#1E1E1E]/5 hover:border-[#C9A78A]/30 transition-all group shadow-[0_10px_30px_rgba(30,30,30,0.02)] hover:shadow-2xl">
                            <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 w-20 h-20 bg-[#F1F0E8] rounded-3xl flex items-center justify-center">{benefit.icon}</div>
                            <h3 className="text-2xl font-black text-[#1E1E1E] mb-4 tracking-tighter italic uppercase">{benefit.title}</h3>
                            <p className="text-[#1E1E1E]/60 font-medium leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it Works */}
            <div id="como-funciona" className="bg-white py-32 border-y border-[#1E1E1E]/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-4xl sm:text-5xl font-black text-[#1E1E1E] mb-20 text-center tracking-tighter italic">
                        Protocolo de <span className="text-[#C9A78A]">Lanzamiento_</span>
                    </h2>
                    <div className="grid md:grid-cols-4 gap-12">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center relative group">
                                <div className="w-20 h-20 bg-[#1E1E1E] text-[#F1F0E8] rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-2xl group-hover:bg-[#C9A78A] transition-colors italic">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-black text-[#1E1E1E] mb-4 tracking-tighter uppercase">{step.title}</h3>
                                <p className="text-sm text-[#1E1E1E]/60 font-medium leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-32 text-center">
                <div className="bg-[#1E1E1E] p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/10 rounded-full blur-[100px] -z-0" />
                    <h2 className="text-4xl sm:text-5xl font-black text-[#F1F0E8] mb-8 tracking-tighter italic relative z-10">
                        ¿Listo para <span className="text-[#C9A78A]">Escalar?_</span>
                    </h2>
                    <p className="text-lg text-[#F1F0E8]/60 mb-12 max-w-xl mx-auto font-medium relative z-10">
                        Únete a cientos de profesores que ya están generando ingresos pasivos enseñando lo que aman con el respaldo de SinapCode.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-block px-12 py-6 bg-[#C9A78A] text-[#1E1E1E] rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl relative z-10"
                    >
                        Aplicar como Profesor →
                    </Link>
                </div>
            </div>
        </div>
    );
}
