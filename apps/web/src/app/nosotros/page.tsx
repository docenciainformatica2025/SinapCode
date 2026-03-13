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
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                {/* Header */}
                <div className="mb-24 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-[#C9A78A] rounded-full animate-bounce" />
                        <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em]">NUESTRA GÉNESIS</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#1E1E1E] tracking-tighter leading-none mb-8 italic">
                        Sobre <span className="text-[#C9A78A]">SinapCode</span>
                    </h1>
                    <p className="text-xl text-[#1E1E1E]/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Estamos democratizando la educación técnica mediante interfaces de IA de alta precisión y una pedagogía disruptiva.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-white p-12 sm:p-20 rounded-[3.5rem] border border-[#1E1E1E]/5 mb-24 shadow-[0_20px_60px_rgba(30,30,30,0.02)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/5 rounded-full blur-[100px] group-hover:bg-[#C9A78A]/10 transition-all duration-700" />
                    <h2 className="text-3xl font-black text-[#1E1E1E] mb-10 text-center tracking-tighter uppercase italic">Nuestra Misión</h2>
                    <p className="text-2xl text-[#1E1E1E]/80 text-center max-w-4xl mx-auto leading-snug tracking-tight font-medium italic">
                        "Hacer que <span className="text-[#C9A78A]">aprender a programar</span> sea tan intuitivo como una conversación, eliminando la fricción técnica para potenciar la creatividad humana."
                    </p>
                </div>

                {/* Values */}
                <div className="mb-32">
                    <div className="flex items-center justify-center gap-3 mb-16">
                        <div className="w-12 h-[1px] bg-[#1E1E1E]/10" />
                        <h2 className="text-xl font-black text-[#1E1E1E] uppercase tracking-widest italic">Valores de Ingeniería</h2>
                        <div className="w-12 h-[1px] bg-[#1E1E1E]/10" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#1E1E1E]/5 hover:border-[#C9A78A]/30 transition-all group shadow-sm hover:shadow-xl">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 w-16 h-16 bg-[#F1F0E8] rounded-2xl flex items-center justify-center">{value.icon}</div>
                                <h3 className="text-xl font-black text-[#1E1E1E] mb-3 tracking-tighter uppercase italic">{value.title}</h3>
                                <p className="text-sm text-[#1E1E1E]/60 font-medium leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-[#1E1E1E] p-16 sm:p-24 rounded-[4rem] mb-32 shadow-2xl relative overflow-hidden group text-[#F1F0E8]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A78A]/10 to-transparent opacity-50" />
                    <h2 className="text-xl font-black mb-20 text-center tracking-widest uppercase italic relative z-10 opacity-40">Métricas de Impacto</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                        <div className="text-center">
                            <div className="text-5xl font-black text-[#C9A78A] mb-3 tracking-tighter italic">12.4K</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white">Tech Builders</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-[#C9A78A] mb-3 tracking-tighter italic">487</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white">Mentores Elite</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-[#C9A78A] mb-3 tracking-tighter italic">98%</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white">Satisfacción</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-[#C9A78A] mb-3 tracking-tighter italic">24/7</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white">Asistencia IA</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center py-20">
                    <h2 className="text-4xl sm:text-5xl font-black text-[#1E1E1E] mb-8 tracking-tighter italic">¿Listo para Forjar tu <span className="opacity-40">Futuro?</span></h2>
                    <p className="text-[#1E1E1E]/60 mb-12 max-w-xl mx-auto font-medium">
                        Únete a la mayor comunidad de creadores de software en la región impulsada por inteligencia artificial.
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-block px-12 py-6 bg-[#1E1E1E] text-[#F1F0E8] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:-translate-y-1 transition-all shadow-2xl shadow-[#1E1E1E]/20"
                    >
                        Empieza Gratis
                    </Link>
                </div>
            </div>
        </div>
    );
}
