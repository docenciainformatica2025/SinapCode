'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Tag, Mail, TrendingUp, Clock, User, Sparkles } from 'lucide-react';

const NOTICIAS_GRID = [
    {
        id: '1',
        category: 'Innovación',
        author: 'Alex Dev',
        title: 'Nanobanana AI: El Futuro de la Computación Cuántica',
        excerpt: 'Explora los últimos avances en inteligencia artificial y tecnologías cuánticas que están redefiniendo el mañana.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000',
        date: '24 Oct, 2024',
        readTime: '5 min de lectura',
        tags: ['#IA', '#Quantum']
    },
    {
        id: '2',
        category: 'Inteligencia',
        author: 'Sarah AI',
        title: 'GPT-5: Rumores y Realidades para 2026',
        excerpt: 'Analizamos las filtraciones del próximo gran modelo de lenguaje y qué esperar de la IA generativa.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000',
        date: '23 Oct, 2024',
        readTime: '4 min de lectura',
        tags: ['#LLM', '#OpenAI']
    },
    {
        id: '3',
        category: 'Desarrollo',
        author: 'Mike Dev',
        title: 'Sistemas Operativos Autónomos: El Nuevo Estándar',
        excerpt: 'Cómo SinapCode está liderando la integración de IA en el núcleo de los sistemas modernos.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000',
        date: '22 Oct, 2024',
        readTime: '6 min de lectura',
        tags: ['#Sistemas', '#IA']
    },
    {
        id: '4',
        category: 'Seguridad',
        author: 'John Secure',
        title: 'Ciberseguridad en la Era de la IA: Protegiendo el Futuro',
        excerpt: 'A medida que las amenazas evolucionan, las defensas neuronales se vuelven críticas para la soberanía digital.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000',
        date: '21 Oct, 2024',
        readTime: '3 min de lectura',
        tags: ['#Seguridad', '#IA']
    }
];

interface NewsGridProps {
    isHomePage?: boolean;
}

export function NewsGrid({ isHomePage = false }: NewsGridProps) {
    const articles = isHomePage ? NOTICIAS_GRID.slice(0, 3) : NOTICIAS_GRID;

    return (
        <section className={`w-full py-32 bg-black relative overflow-hidden ${isHomePage ? 'border-none' : 'border-t border-white/5'}`}>
            {/* Ambient Background Glows */}
            <div className="absolute top-0 inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px]" />
            </div>

            <div className="container-page relative z-10 px-6 sm:px-12">
                <div className={`grid grid-cols-1 ${isHomePage ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-16`}>

                    {/* Main Content Area */}
                    <div className={isHomePage ? 'space-y-16' : 'lg:col-span-8 space-y-12'}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <TrendingUp className="text-primary w-6 h-6" />
                                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
                                    INSIGHTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">SINAPCODE</span>
                                </h2>
                            </div>
                            {isHomePage && (
                                <Link href="/blog" className="hidden sm:flex items-center gap-2 text-platinum-dim hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
                                    Ver todas las noticias
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>

                        <div className={`grid grid-cols-1 ${isHomePage ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-10`}>
                            {articles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative bg-surface/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700 shadow-xl flex flex-col"
                                >
                                    <Link href={`/blog/${article.id}`} className="block h-full flex flex-col">
                                        <div className="relative h-60 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute top-6 left-6 z-20 flex gap-2">
                                                {article.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 text-[9px] font-black uppercase bg-black/60 backdrop-blur-md text-primary border border-primary/30 rounded-full tracking-widest">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-10 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                                <Sparkles className="w-3 h-3" />
                                                {article.category}
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors leading-[1.2] italic tracking-tighter">
                                                {article.title}
                                            </h3>
                                            <p className="text-platinum-dim text-sm mb-10 line-clamp-2 font-medium leading-relaxed">
                                                {article.excerpt}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-black text-white border border-primary/20">
                                                        {article.author[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-white">{article.author}</span>
                                                        <span className="text-[10px] text-platinum-dim font-bold uppercase tracking-widest">{article.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-platinum-dim font-bold text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                    <Clock className="w-3 h-3 text-primary" />
                                                    {article.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {isHomePage && (
                            <div className="sm:hidden flex justify-center mt-8">
                                <Link href="/blog" className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
                                    Ver todas las noticias
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area - Solo visible si NO es HomePage */}
                    {!isHomePage && (
                        <aside className="lg:col-span-4 space-y-12">
                            {/* Popular Tags Card */}
                            <div className="p-10 rounded-[2.5rem] bg-surface/20 border border-white/5 backdrop-blur-3xl shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 italic">
                                    <Tag className="w-5 h-5 text-primary" />
                                    Temas Populares
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['#IA', '#DeepLearning', '#Web3', '#Python', '#Security', '#Cloud', '#Blockchain', '#Robotics'].map(tag => (
                                        <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] text-platinum-dim hover:text-primary hover:border-primary/50 transition-all cursor-pointer font-black uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter Card */}
                            <div className="p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                                <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/40 transition-all duration-1000" />

                                <Mail className="w-12 h-12 text-primary mb-8 animate-bounce-slow" />
                                <h3 className="text-4xl font-black text-white mb-6 italic tracking-tighter uppercase leading-tight">Mente <span className="text-primary italic">Sincronizada</span></h3>
                                <p className="text-platinum-dim text-base mb-12 font-medium leading-relaxed">
                                    Recibe las últimas misiones de IA y actualizaciones del kernel directamente a tu terminal neuronal.
                                </p>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="Tu correo de acceso"
                                        className="w-full px-8 py-5 bg-black/60 border border-white/10 rounded-2xl text-white placeholder:text-platinum-dim/30 focus:outline-none focus:border-primary transition-all font-medium"
                                    />
                                    <button className="w-full py-5 bg-white text-black font-black rounded-2xl transition-all shadow-xl hover:shadow-white/20 transform hover:-translate-y-1 uppercase tracking-[0.2em] text-xs">
                                        Suscribirse Ahora
                                    </button>
                                </form>
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* Acento Inferior */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>
    );
}
