import Link from 'next/link';

export default function AboutPage() {
    const team = [
        { name: 'Ana Rodríguez', role: 'CEO & Co-fundadora', emoji: '👩‍💼' },
        { name: 'Carlos Méndez', role: 'CTO & Co-fundador', emoji: '👨‍💻' },
        { name: 'Laura Silva', role: 'Head of Education', emoji: '👩‍🏫' },
        { name: 'Diego Torres', role: 'Lead AI Engineer', emoji: '🤖' },
    ];

    const values = [
        {
            title: 'Educación Accesible',
            description: 'Creemos que la educación de calidad debe ser accesible para todos, sin barreras económicas.',
            icon: '🌍',
        },
        {
            title: 'Innovación con IA',
            description: 'Usamos inteligencia artificial para personalizar el aprendizaje y hacerlo más efectivo.',
            icon: '🤖',
        },
        {
            title: 'Comunidad Primero',
            description: 'Construimos una comunidad de aprendices que se apoyan mutuamente en su crecimiento.',
            icon: '🤝',
        },
        {
            title: 'Transparencia',
            description: 'Somos transparentes en nuestros precios, métodos y resultados. Sin sorpresas.',
            icon: '💎',
        },
    ];

    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-16 text-center">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                        Sobre SinapCode
                    </h1>
                    <p className="text-lg sm:text-xl text-[#B8BFC9] max-w-3xl mx-auto">
                        Estamos democratizando la educación en programación con inteligencia artificial.
                    </p>
                </div>

                {/* Mission */}
                <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Nuestra Misión</h2>
                    <p className="text-lg text-[#B8BFC9] text-center max-w-3xl mx-auto leading-relaxed">
                        Hacer que <strong className="text-white">aprender a programar sea tan fácil como tener una conversación</strong>.
                        Creemos que la IA puede transformar la educación, eliminando la frustración y haciendo que cada estudiante
                        tenga un tutor personal disponible 24/7.
                    </p>
                </div>

                {/* Story */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestra Historia</h2>
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                        <div className="space-y-6 text-[#B8BFC9]">
                            <p>
                                SinapCode nació en <strong className="text-white">2024</strong> cuando dos desarrolladores colombianos,
                                frustrados con la falta de recursos educativos de calidad en español, decidieron crear la plataforma
                                que ellos hubieran querido tener cuando empezaron.
                            </p>
                            <p>
                                Vimos que <strong className="text-white">el 70% de los estudiantes abandonan los cursos de programación</strong>
                                porque se quedan atascados sin ayuda. Los tutores humanos son caros y no están disponibles 24/7.
                                Los foros tardan horas en responder. Los videos no se adaptan a tu ritmo.
                            </p>
                            <p>
                                Entonces pensamos: <strong className="text-white">¿Y si cada estudiante tuviera un tutor de IA personal?</strong>
                                Un tutor que nunca se cansa, que está disponible a las 3 AM, que te hace preguntas socráticas para que
                                aprendas a pensar, no solo a copiar código.
                            </p>
                            <p>
                                Hoy, más de <strong className="text-white">12,000 estudiantes</strong> en Latinoamérica están aprendiendo
                                con SinapCode. Y lo mejor: <strong className="text-white">es gratis para siempre</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestros Valores</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {values.map((value, i) => (
                            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-neural-blue/50 transition">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-[#B8BFC9]">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestro Equipo</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-neural-blue/50 transition">
                                <div className="text-6xl mb-4">{member.emoji}</div>
                                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-sm text-[#B8BFC9]">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">En Números</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">12,450+</div>
                            <div className="text-sm text-[#B8BFC9]">Estudiantes Activos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">487</div>
                            <div className="text-sm text-[#B8BFC9]">Profesores Certificados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">98.7%</div>
                            <div className="text-sm text-[#B8BFC9]">Tasa de Satisfacción</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neural-blue mb-2">24/7</div>
                            <div className="text-sm text-[#B8BFC9]">Soporte con IA</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">¿Listo para empezar?</h2>
                    <p className="text-lg text-[#B8BFC9] mb-8">
                        Únete a miles de estudiantes que ya están aprendiendo con IA.
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-block px-8 py-4 bg-neural-blue text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-neon-blue"
                    >
                        Empieza Gratis →
                    </Link>
                </div>
            </div>
        </div>
    );
}
