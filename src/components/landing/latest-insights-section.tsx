'use client';

import Link from 'next/link';

export function LatestInsightsSection() {
    return (
        <section className="py-24 border-t border-white/5 bg-deep-space">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Latest Insights</h2>
                        <p className="text-muted">Actualizaciones, tendencias y guías para Builders.</p>
                    </div>
                    <Link href="/blog" className="text-gold hover:text-white transition text-sm font-medium">
                        Ver todo el Blog →
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Link href="/blog/futuro-ia" className="group">
                        <article className="h-full bg-surface/50 border border-white/5 rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🔮</div>
                            <div className="text-xs font-mono text-gold mb-3">NUEVO</div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                El Futuro del Desarrollo de Software con IA
                            </h3>
                            <p className="text-sm text-muted mb-4 line-clamp-3">
                                La IA no reemplaza devs, les da superpoderes. Descubre cómo GitHub Copilot y SinapCode cambian el juego.
                            </p>
                            <span className="text-xs text-white/40">16 Ene, 2026</span>
                        </article>
                    </Link>

                    {/* Placeholders for visual balance */}
                    <div className="group opacity-60 hover:opacity-100 transition-opacity">
                        <article className="h-full bg-surface/30 border border-white/5 rounded-2xl p-6">
                            <div className="text-4xl mb-4">🐍</div>
                            <div className="text-xs font-mono text-muted mb-3">GUÍA</div>
                            <h3 className="text-xl font-bold text-white mb-3">Pattern Matching en Python 3.12</h3>
                            <p className="text-sm text-muted mb-4">
                                Domina las nuevas estructuras de control en Python y escribe código más limpio.
                            </p>
                            <span className="text-xs text-white/40">12 Ene, 2026</span>
                        </article>
                    </div>

                    <div className="group opacity-60 hover:opacity-100 transition-opacity">
                        <article className="h-full bg-surface/30 border border-white/5 rounded-2xl p-6">
                            <div className="text-4xl mb-4">⚛️</div>
                            <div className="text-xs font-mono text-muted mb-3">REACT</div>
                            <h3 className="text-xl font-bold text-white mb-3">React Server Components explicado</h3>
                            <p className="text-sm text-muted mb-4">
                                Entiende por fin qué renderiza en el servidor y qué en el cliente.
                            </p>
                            <span className="text-xs text-white/40">08 Ene, 2026</span>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
