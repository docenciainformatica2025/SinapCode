'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Cpu, Box, Share2, MessageSquare } from 'lucide-react';

const INSIGHTS = [
    {
        id: '1',
        title: 'El Futuro del Desarrollo de Software con IA',
        description: 'La IA no reemplaza devs, les da superpoderes. Descubre cómo GitHub Copilot y SinapCode están cambiando el juego.',
        date: '16 Ene, 2026',
        badge: 'NUEVO',
        icon: Sparkles,
        color: 'text-yellow-400',
        badgeColor: 'bg-yellow-400/10 text-yellow-400',
        slug: 'futuro-desarrollo-ia'
    },
    {
        id: '2',
        title: 'Pattern Matching en Python 3.12',
        description: 'Domina las nuevas estructuras de control en Python y escribe código más limpio y eficiente.',
        date: '12 Ene, 2026',
        badge: 'GUÍA',
        icon: Terminal,
        color: 'text-emerald-400',
        badgeColor: 'bg-emerald-400/10 text-emerald-400',
        slug: 'pattern-matching-python'
    },
    {
        id: '3',
        title: 'React Server Components explicado',
        description: 'Entiende por fin qué renderiza en el servidor y qué en el cliente. Guía definitiva para Next.js 14+.',
        date: '08 Ene, 2026',
        badge: 'REACT',
        icon: Cpu,
        color: 'text-cyan-400',
        badgeColor: 'bg-cyan-400/10 text-cyan-400',
        slug: 'react-server-components'
    }
];

export function LatestInsights() {
    return (
        <section className="py-12 border-b border-white/5">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Lo más reciente</h2>
                    <p className="text-platinum-dim">Actualizaciones, tendencias y guías para Builders.</p>
                </div>
                <Link href="/blog" className="hidden md:flex items-center gap-2 text-gold hover:text-white transition font-bold text-sm">
                    Ver todo el Blog <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INSIGHTS.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-[#0F1117] border border-white/10 rounded-2xl p-6 hover:border-neural-blue/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col h-full"
                    >
                        {/* Header: Icon & Badge */}
                        <div className="flex items-start justify-between mb-6">
                            <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${post.color}`}>
                                <post.icon className="w-6 h-6" />
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${post.badgeColor}`}>
                                {post.badge}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neural-blue transition-colors leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-sm text-platinum-dim leading-relaxed mb-6">
                                {post.description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                            <span className="text-xs text-muted font-mono">{post.date}</span>
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-muted hover:text-white transition">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="text-muted hover:text-white transition">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Full Click Area */}
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-neural-blue/20 transition-all" />
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 md:hidden text-center">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gold hover:text-white transition font-bold text-sm">
                    Ver todo el Blog <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
