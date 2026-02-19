'use client';

import Link from 'next/link';

export function LatestInsightsSection() {
    const articles = [
        {
            link: "/blog/futuro-ia",
            category: "NUEVO",
            date: "16 Ene, 2026",
            title: "El Futuro del Desarrollo de Software con IA",
            icon: "🚀",
            excerpt: "La IA no reemplaza devs, les da superpoderes. Descubre cómo GitHub Copilot y SinapCode cambian el juego."
        },
        {
            link: "/blog",
            category: "GUÍA",
            date: "12 Ene, 2026",
            title: "Pattern Matching en Python 3.12",
            icon: "🐍",
            excerpt: "Domina las nuevas estructuras de control en Python y escribe código más limpio."
        },
        {
            link: "/blog",
            category: "REACT",
            date: "08 Ene, 2026",
            title: "React Server Components explicado",
            icon: "⚛️",
            excerpt: "Entiende por fin qué renderiza en el servidor y qué en el cliente."
        }
    ];

    return (
        <section id="insights" className="py-24 bg-bg/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold text-white tracking-tight leading-[1.1] mb-0">Últimos <span className="text-apple-blue font-extrabold text-glow">Aprendizajes</span></h2>
                    <Link href="/blog" className="btn-secondary !py-2 !px-5">Ver todo →</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <Link key={i} href={article.link} className="group opacity-90 hover:opacity-100 transition-opacity">
                            <article className="h-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:border-apple-blue/20 transition-all duration-500 hover:shadow-2xl">
                                <div className="text-4xl mb-6">{article.icon}</div>
                                <div className="text-[10px] font-bold text-apple-blue uppercase tracking-widest mb-4">{article.category}</div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-apple-blue transition-colors tracking-tight">{article.title}</h3>
                                <p className="text-sm text-gray-400 mb-4 font-bold">
                                    {article.excerpt}
                                </p>
                                <span className="text-xs text-gray-500 font-bold">{article.date}</span>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
