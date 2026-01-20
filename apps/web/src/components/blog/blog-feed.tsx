'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    coverImage: string;
    category: string;
    author: {
        name: string;
    };
    createdAt: string; // ISO Date
    readTime?: string;
}

interface BlogFeedProps {
    initialPosts: BlogPost[];
}

export function BlogFeed({ initialPosts }: BlogFeedProps) {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    // Extract categories
    const categories = ['Todos', ...Array.from(new Set(initialPosts.map(p => p.category)))];

    // Filter Logic
    const filteredPosts = initialPosts.filter(post => {
        const matchesCategory = filter === 'Todos' || post.category === filter;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

    return (
        <div>
            {/* Controls */}
            <div className="glass-panel p-2 rounded-2xl border border-white/5 bg-white/5 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Categories */}
                <div className="flex flex-wrap gap-1 justify-center md:justify-start flex-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === cat
                                ? 'bg-neural-blue text-white shadow-lg shadow-neural-blue/20'
                                : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-transparent rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:bg-black/60 focus:border-neural-blue/50 outline-none transition placeholder:text-platinum-dim/50"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-24 border border-dashed border-white/10 rounded-3xl"
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-platinum-dim">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <p className="text-platinum-dim text-lg mb-2">No encontramos artículos para esta búsqueda.</p>
                        <button onClick={() => { setFilter('Todos'); setSearchTerm(''); }} className="text-neural-blue font-bold hover:underline">
                            Limpiar filtros
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-16">
                        {/* FEATURED POST */}
                        {featuredPost && filter === 'Todos' && !searchTerm && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-surface/50 hover:border-neural-blue/30 transition-all duration-500 hover:shadow-2xl hover:shadow-neural-blue/5"
                            >
                                <Link href={`/blog/${featuredPost.slug}`} className="grid md:grid-cols-2 gap-0 h-full">
                                    <div className="relative h-64 md:h-auto overflow-hidden">
                                        {featuredPost.coverImage ? (
                                            <Image
                                                src={featuredPost.coverImage}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-neural-blue/30 to-purple-600/30 flex items-center justify-center backdrop-blur-3xl">
                                                <span className="text-4xl">✨</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-neural-blue/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                                            Destacado
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center p-8 md:p-12">
                                        <div className="flex items-center gap-3 text-xs md:text-sm text-platinum-dim mb-6">
                                            <span className="text-gold font-bold uppercase tracking-wider bg-gold/10 px-2 py-0.5 rounded">{featuredPost.category}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-neural-blue transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-platinum-dim mb-8 line-clamp-3 text-base md:text-lg leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neural-blue to-purple-500 p-[1px]">
                                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                                                        {featuredPost.author.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-bold">{featuredPost.author.name}</p>
                                                    <p className="text-platinum-dim text-xs">Autor</p>
                                                </div>
                                            </div>
                                            <span className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                                                Leer artículo <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* GRID */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(filter === 'Todos' && !searchTerm ? gridPosts : filteredPosts).map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="group bg-surface/30 border border-white/10 rounded-2xl overflow-hidden hover:border-neural-blue/30 transition-all hover:-translate-y-1 duration-300 flex flex-col h-full"
                                >
                                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                                        <div className="aspect-video relative overflow-hidden bg-white/5">
                                            {post.coverImage ? (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                                                    <BookOpen className="w-10 h-10 text-white/10" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/10">
                                                {post.category}
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-xs text-platinum-dim mb-4">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-neural-blue transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-platinum-dim text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs font-bold text-platinum group-hover:text-white transition-colors border-t border-white/5 pt-4 mt-auto">
                                                LEER ARTÍCULO <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
