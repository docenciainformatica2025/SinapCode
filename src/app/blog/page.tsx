import Link from 'next/link';

export default function BlogPage() {
    const featuredPost = {
        title: '10 Consejos para Aprender a Programar con IA en 2026',
        excerpt: 'Descubre cómo la inteligencia artificial está revolucionando la forma en que aprendemos a programar y cómo puedes aprovecharlo.',
        author: 'Ana Rodríguez',
        date: '5 de Enero, 2026',
        readTime: '8 min',
        category: 'Aprendizaje',
        image: '📚',
    };

    const posts = [
        {
            title: 'Python vs JavaScript: ¿Cuál Aprender Primero?',
            excerpt: 'Comparamos los dos lenguajes más populares para principiantes y te ayudamos a decidir.',
            author: 'Carlos Méndez',
            date: '3 de Enero, 2026',
            readTime: '6 min',
            category: 'Guías',
            image: '🐍',
        },
        {
            title: 'Cómo Conseguir tu Primer Trabajo como Desarrollador',
            excerpt: 'Estrategias probadas para destacar en el mercado laboral tech sin experiencia previa.',
            author: 'Laura Silva',
            date: '1 de Enero, 2026',
            readTime: '10 min',
            category: 'Carrera',
            image: '💼',
        },
        {
            title: 'Introducción a Machine Learning para Principiantes',
            excerpt: 'Todo lo que necesitas saber para empezar en el mundo del aprendizaje automático.',
            author: 'Diego Torres',
            date: '28 de Diciembre, 2025',
            readTime: '12 min',
            category: 'IA',
            image: '🤖',
        },
        {
            title: 'Las 5 Habilidades Más Demandadas en Tech 2026',
            excerpt: 'Análisis del mercado laboral y las tecnologías que debes aprender este año.',
            author: 'Ana Rodríguez',
            date: '25 de Diciembre, 2025',
            readTime: '7 min',
            category: 'Tendencias',
            image: '📈',
        },
        {
            title: 'Cómo Usar ChatGPT para Aprender a Programar',
            excerpt: 'Guía práctica para aprovechar la IA como tu tutor personal de programación.',
            author: 'Carlos Méndez',
            date: '20 de Diciembre, 2025',
            readTime: '9 min',
            category: 'Herramientas',
            image: '🛠️',
        },
        {
            title: 'Debugging: El Arte de Encontrar y Corregir Errores',
            excerpt: 'Técnicas y herramientas profesionales para debuggear código como un experto.',
            author: 'Laura Silva',
            date: '15 de Diciembre, 2025',
            readTime: '11 min',
            category: 'Técnicas',
            image: '🐛',
        },
    ];

    const categories = [
        { name: 'Todos', count: 42 },
        { name: 'Aprendizaje', count: 12 },
        { name: 'Guías', count: 8 },
        { name: 'Carrera', count: 6 },
        { name: 'IA', count: 5 },
        { name: 'Tendencias', count: 7 },
        { name: 'Herramientas', count: 4 },
    ];

    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        Blog de SinapCode
                    </h1>
                    <p className="text-lg text-[#B8BFC9]">
                        Artículos, guías y recursos para acelerar tu carrera en tech
                    </p>
                </div>

                {/* Categories */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-lg font-medium transition ${i === 0
                                    ? 'bg-neural-blue text-white'
                                    : 'bg-white/10 text-[#B8BFC9] hover:bg-white/20'
                                    }`}
                            >
                                {cat.name} <span className="text-xs opacity-70">({cat.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <Link href="/blog/futuro-ia">
                        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 hover:border-neural-blue/50 transition cursor-pointer group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-neural-blue/20 text-neural-blue rounded-full text-xs font-bold">
                                    NUEVO
                                </span>
                                <span className="text-xs text-[#B8BFC9]">Tendencias IA</span>
                            </div>

                            <div className="text-6xl mb-6">🔮</div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-neural-blue transition">
                                El Futuro del Desarrollo de Software con IA
                            </h2>

                            <p className="text-lg text-[#B8BFC9] mb-6">
                                La inteligencia artificial no vino a reemplazar a los desarrolladores, vino a darles superpoderes. Descubre cómo SinapCode redefine el flujo de trabajo.
                            </p>

                            <div className="flex items-center gap-4 text-sm text-[#B8BFC9]">
                                <span>SinapCode Team</span>
                                <span>•</span>
                                <span>16 Ene, 2026</span>
                                <span>•</span>
                                <span>5 min lectura</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <div
                            key={i}
                            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-neural-blue/50 transition cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs text-[#B8BFC9]">{post.category}</span>
                            </div>

                            <div className="text-4xl mb-4">{post.image}</div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neural-blue transition">
                                {post.title}
                            </h3>

                            <p className="text-sm text-[#B8BFC9] mb-4">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-[#B8BFC9]">
                                <span>{post.author}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="mt-16 glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Suscríbete a Nuestro Newsletter
                    </h2>
                    <p className="text-[#B8BFC9] mb-6">
                        Recibe los mejores artículos, guías y recursos directamente en tu inbox cada semana.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="flex-1 bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-2 focus:ring-neural-blue focus:ring-offset-2 focus:ring-offset-deep-space transition"
                        />
                        <button className="px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-neon-blue">
                            Suscribirme
                        </button>
                    </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-12 text-center">
                    <div className="inline-block glass-panel px-6 py-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
                        <p className="text-yellow-500 text-sm">
                            🚧 <strong>Próximamente:</strong> Estamos trabajando en contenido increíble. Vuelve pronto para más artículos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
