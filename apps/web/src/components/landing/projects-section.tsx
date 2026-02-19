'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, ExternalLink, Github, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    tags: string[];
    author: {
        name: string | null;
        image: string | null;
    } | null;
    repoUrl: string | null;
    liveUrl: string | null;
}

interface ProjectsSectionProps {
    projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const displayProjects = projects || [];

    return (
        <section id="projects" className="py-20 md:py-28 bg-black relative overflow-hidden section-spacing subpixel-text">
            {/* Fondo 4K Ultra-Premium */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px]" />
            </div>

            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container-page relative z-10 px-6 sm:px-12">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-platinum">
                            Ecosistema de Innovación
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6 uppercase">
                        Ingeniería <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient-x">SINAPCODE</span>
                    </h2>
                    <p className="text-xl text-platinum-dim max-w-2xl mx-auto leading-relaxed font-medium">
                        Soluciones de vanguardia <span className="text-white">Hechas en Casa</span>. Código de producción desplegado para el mundo real.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative h-full flex flex-col bg-surface/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700 shadow-2xl"
                        >
                            {/* Overlay de Brillo al Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative h-64 overflow-hidden">
                                {project.thumbnail ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-black/40 flex items-center justify-center relative overflow-hidden">
                                        <Code2 className="w-20 h-20 text-white/5 group-hover:text-primary/20 transition-colors duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                <div className="absolute top-6 left-6 z-20 flex gap-2">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                        PRODUCCIÓN
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Code2 className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-white">{project.author?.name || 'Protocolo SinapCode'}</span>
                                        <span className="text-[10px] text-platinum-dim font-bold uppercase tracking-widest">Despliegue de Elite</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors duration-500 italic tracking-tighter leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-platinum-dim text-sm mb-8 leading-relaxed font-medium line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[9px] font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={project.liveUrl || '#'}
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/projects" className="group relative inline-flex items-center gap-4 px-12 py-6 bg-transparent rounded-2xl overflow-hidden active:scale-95 transition-transform">
                        <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/50 transition-colors" />
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 text-white font-black uppercase tracking-[0.3em] text-sm italic">
                            Explorar Laboratorio de Ingeniería
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Acento Final */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent shadow-[0_0_15px_rgba(255,165,0,0.2)]" />
        </section>
    );
}
