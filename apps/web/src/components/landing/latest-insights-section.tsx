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
        <section className="py-24 bg-bg/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Aprendizajes <span className="text-primary italic">.bin</span></h2>
                    <Link href="/blog" className="text-sm font-black text-primary uppercase tracking-[0.2em] hover:translate-x-1 transition-transform">Ver todo →</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <Link key={i} href={article.link} className="group opacity-75 hover:opacity-100 transition-opacity">
                            <article className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{article.icon}</div>
                                <div className="text-xs font-mono text-primary font-bold mb-3">{article.category}</div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
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
