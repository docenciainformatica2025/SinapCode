'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Cpu, Box, Share2, MessageSquare, BookOpen } from 'lucide-react';

export function LatestInsights({ posts = [] }: { posts?: any[] }) {
    const recentPosts = posts.slice(0, 3);
    const isEmpty = !posts || posts.length === 0;

    return (
        <section className={`py-12 ${!isEmpty ? 'border-b border-[#1E1E1E]/10' : ''}`}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Lo más reciente</h2>
                    <p className="text-[#1E1E1E]/60 font-light">Actualizaciones, tendencias y protocolos para Builders.</p>
                </div>
                {!isEmpty && (
                    <Link href="/blog" className="hidden md:flex items-center gap-2 text-[#C9A78A] hover:text-[#1E1E1E] transition font-bold text-sm">
                        Ver todo el Archivo <ArrowRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            {isEmpty ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white border border-[#1E1E1E]/5 rounded-[2rem] p-12 text-center overflow-hidden group shadow-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F1F0E8]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 max-w-md mx-auto space-y-6">
                        <div className="inline-flex p-4 rounded-3xl bg-[#F1F0E8] text-[#C9A78A] mb-4">
                            <Sparkles className="w-8 h-8 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1E1E1E]">Sin Despliegues Recientes</h3>
                        <p className="text-[#1E1E1E]/60 font-light leading-relaxed">
                            Nuestra IA está sintetizando nuevos protocolos y analizando tendencias.
                            Vuelve pronto para descubrir la vanguardia técnica.
                        </p>
                        <div className="pt-4">
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1E1E] text-white text-sm font-bold hover:bg-[#C9A78A] transition-all"
                            >
                                Suscribirse a Updates <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white border border-[#1E1E1E]/5 rounded-3xl p-6 hover:shadow-xl hover:shadow-[#C9A78A]/5 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* ... Content ... */}
                {recentPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white border border-[#1E1E1E]/5 rounded-3xl p-6 hover:shadow-xl hover:shadow-[#C9A78A]/5 transition-all duration-300 flex flex-col h-full"
                    >
                        {/* Header: Icon & Badge */}
                        <div className="flex items-start justify-between mb-6">
                            <div className={`p-3 rounded-2xl bg-[#F1F0E8] group-hover:bg-[#C9A78A]/10 transition-colors text-[#C9A78A]`}>
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#1E1E1E]/5 text-[#1E1E1E]`}>
                                {post.category || 'Insights'}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#1E1E1E] mb-3 group-hover:text-[#C9A78A] transition-colors leading-tight line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-[#1E1E1E]/60 leading-relaxed mb-6 font-light line-clamp-3">
                                {post.excerpt || post.description || "Lee más en el artículo oficial de SinapCode."}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E]/5 mt-auto relative z-10">
                            <span className="text-xs text-[#1E1E1E]/40 font-mono italic">
                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Reciente'}
                            </span>
                            <div className="flex gap-3 text-[#1E1E1E]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="hover:text-[#C9A78A] transition">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Full Click Area */}
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0 rounded-3xl z-0" />
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 md:hidden text-center justify-center flex">
                <Link href="/blog" className="inline-flex items-center gap-2 text-[#C9A78A] hover:text-[#1E1E1E] transition font-bold text-sm">
                    Ver todo el Archivo <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
            );
}
