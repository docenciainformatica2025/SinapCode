'use client';

import { Search, BookOpen, Clock, Star, ArrowRight, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

const RESOURCES = [
    { title: 'Patrones de Diseño en Sistemas Distribuidos', category: 'Arquitectura', readTime: '20 min', description: 'Aprende a diseñar sistemas escalables y resilientes utilizando patrones modernos como CQRS y Saga.' },
    { title: 'Seguridad en APIs con JWT y OAuth2', category: 'Ciberseguridad', readTime: '15 min', description: 'Guía completa para asegurar tus endpoints utilizando los mejores estándares de la industria.' },
    { title: 'Domina los React Server Components', category: 'Frontend', readTime: '25 min', description: 'Descubre cómo funciona la nueva arquitectura de React y optimiza el rendimiento de tus apps.' },
    { title: 'Estrategias de CI/CD para Equipos Elite', category: 'DevOps', readTime: '18 min', description: 'Automatiza tu flujo de trabajo y entrega software con confianza y velocidad.' },
    { title: 'Fundamentos de Machine Learning en Python', category: 'Data Science', readTime: '30 min', description: 'Inicia tu camino en la IA aprendiendo algoritmos base y manipulación de datos con Pandas.' },
    { title: 'Arquitectura de Microservicios con Go', category: 'Backend', readTime: '22 min', description: 'Por qué Go es la mejor opción para servicios backend modernos y cómo estructurarlos.' },
];

export default function LibraryPage() {
    return (
        <div className="min-h-screen bg-deep-space text-white pb-20">
            <main className="max-w-7xl mx-auto p-4 md:p-8 pt-24 lg:pt-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-black mb-3 tracking-tighter">Biblioteca Digital</h1>
                        <p className="text-platinum-dim text-lg font-medium max-w-xl">Recursos curados, guías técnicas y artículos exclusivos para acelerar tu desarrollo profesional.</p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum-dim group-focus-within:text-emerald-400 w-4 h-4 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar recursos técnicos..."
                                className="w-full pl-11 pr-4 py-3 bg-surface/50 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-surface/80 transition-all shadow-2xl"
                            />
                        </div>
                        <div className="flex bg-surface/50 p-1 rounded-xl border border-white/5 shadow-xl">
                            <button className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-platinum-dim hover:text-white transition-colors">
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {RESOURCES.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-surface/30 backdrop-blur-xl rounded-[2rem] border border-white/5 overflow-hidden hover:border-emerald-500/30 transition-all hover:-translate-y-1 shadow-2xl shadow-black/40 flex flex-col"
                        >
                            <div className="aspect-[16/10] bg-gradient-to-br from-emerald-500/10 via-deep-space to-surface flex items-center justify-center relative overflow-hidden">
                                <BookOpen className="w-12 h-12 text-emerald-400/20 group-hover:scale-110 group-hover:text-emerald-400/40 transition-all duration-700" />
                                <div className="absolute top-4 right-4 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-amber-400 flex items-center gap-1.5 shadow-xl border border-amber-500/20 uppercase tracking-widest">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    <span>Premium</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-space/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-[10px] font-black px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                                        {res.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[10px] text-platinum-dim font-bold uppercase tracking-wider">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{res.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black mb-4 text-white group-hover:text-emerald-400 transition-colors leading-tight">
                                    {res.title}
                                </h3>
                                <p className="text-sm text-platinum-dim font-medium leading-relaxed line-clamp-2 mb-8">
                                    {res.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <button className="text-xs font-black text-emerald-400 group-hover:text-emerald-300 flex items-center gap-2 transition-all uppercase tracking-widest">
                                        Leer Ahora
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="flex -space-x-1.5">
                                        {[1, 2, 3].map(avatar => (
                                            <div key={avatar} className="w-6 h-6 rounded-full border border-deep-space bg-surface flex items-center justify-center text-[8px] font-bold text-white">
                                                U
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
