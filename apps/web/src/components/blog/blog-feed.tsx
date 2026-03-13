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
            <div className="bg-white p-2 rounded-2xl border border-[#1E1E1E]/5 shadow-sm mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Categories */}
                <div className="flex flex-wrap gap-1 justify-center md:justify-start flex-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === cat
                                ? 'bg-[#1E1E1E] text-white shadow-lg'
                                : 'text-[#1E1E1E]/40 hover:bg-[#F1F0E8] hover:text-[#1E1E1E]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E1E1E]/40" />
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#F1F0E8] border border-transparent rounded-xl py-2.5 pl-10 pr-4 text-[#1E1E1E] text-sm focus:bg-white focus:border-[#C9A78A]/20 outline-none transition placeholder:text-[#1E1E1E]/30"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-24 border border-dashed border-[#1E1E1E]/10 rounded-3xl"
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#1E1E1E]/20 shadow-sm border border-[#1E1E1E]/5">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <p className="text-[#1E1E1E]/60 text-lg mb-2">No encontramos artículos para esta búsqueda.</p>
                        <button onClick={() => { setFilter('Todos'); setSearchTerm(''); }} className="text-[#C9A78A] font-bold hover:underline">
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
                                className="group relative rounded-[40px] overflow-hidden border border-[#1E1E1E]/5 bg-white hover:border-[#C9A78A]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A78A]/5"
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
                                            <div className="w-full h-full bg-gradient-to-br from-[#A7C1C0]/30 to-[#C9A78A]/30 flex items-center justify-center backdrop-blur-3xl">
                                                <span className="text-4xl">✨</span>
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-[#1E1E1E] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                                            Destacado
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                                        <div className="flex items-center gap-3 text-xs md:text-sm text-[#1E1E1E]/40 mb-6 font-medium">
                                            <span className="text-[#C9A78A] font-bold uppercase tracking-wider bg-[#C9A78A]/10 px-3 py-1 rounded-full">{featuredPost.category}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] mb-6 leading-tight group-hover:text-[#C9A78A] transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-[#1E1E1E]/60 mb-8 line-clamp-3 text-base md:text-lg leading-relaxed font-light">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-[#1E1E1E]/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-[#1E1E1E]/5 flex items-center justify-center text-[#1E1E1E] font-bold text-base shadow-inner">
                                                    {featuredPost.author.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[#1E1E1E] text-sm font-bold leading-none mb-1">{featuredPost.author.name}</p>
                                                    <p className="text-[#1E1E1E]/40 text-xs italic">Autor Invitado</p>
                                                </div>
                                            </div>
                                            <span className="flex items-center gap-2 text-[#1E1E1E] font-bold text-sm bg-[#F1F0E8] px-6 py-3 rounded-full group-hover:bg-[#1E1E1E] group-hover:text-white transition-all">
                                                Leer <ArrowRight className="w-4 h-4" />
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
                                    className="group bg-white border border-[#1E1E1E]/5 rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-[#C9A78A]/5 transition-all hover:-translate-y-1 duration-500 flex flex-col h-full"
                                >
                                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                                        <div className="aspect-[4/3] relative overflow-hidden bg-[#F1F0E8]">
                                            {post.coverImage ? (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="w-12 h-12 text-[#1E1E1E]/5" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#1E1E1E] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                                                {post.category}
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-xs text-[#1E1E1E]/40 mb-4 font-medium">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 5 min</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#1E1E1E] mb-3 line-clamp-2 group-hover:text-[#C9A78A] transition-colors leading-snug">
                                                {post.title}
                                            </h3>

                                            <p className="text-[#1E1E1E]/60 text-sm line-clamp-3 mb-6 flex-1 font-light leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs font-bold text-[#1E1E1E]/40 group-hover:text-[#C9A78A] transition-colors border-t border-[#1E1E1E]/5 pt-6 mt-auto italic">
                                                DESPLEGAR PROTOCOLO <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
