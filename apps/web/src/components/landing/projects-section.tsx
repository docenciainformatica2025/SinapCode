'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, ExternalLink, Github, Sparkles } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

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
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-3xl mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                            Ecosistema de Innovación
                        </span>
                    </motion.div>

                    <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-white tracking-tight mb-8 text-balance">
                        Ingeniería <span className="text-primary">SinapCode</span>
                    </h2>
                    <p className="text-lg md:text-xl text-apple-blue/90 max-w-2xl mx-auto leading-relaxed font-medium text-pretty">
                        Soluciones de vanguardia diseñadas para el mundo real. Código de producción desplegado para mentes que buscan trascender.
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
                            className="group relative h-full flex flex-col bg-surface/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all duration-700 shadow-2xl hover:-translate-y-2"
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                            <div className="relative h-64 overflow-hidden">
                                {project.thumbnail ? (
                                    <NextImage
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-black/40 flex items-center justify-center relative overflow-hidden">
                                        <Code2 className="w-20 h-20 text-white/5 group-hover:text-primary/10 transition-colors duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />

                                <div className="absolute top-6 left-6 z-20 flex gap-2">
                                    <span className="px-4 py-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                                        Versión Estable
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500 overflow-hidden relative">
                                        {project.author?.image ? (
                                            <NextImage
                                                src={project.author.image}
                                                alt={project.author.name || ''}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Code2 className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white/90">{project.author?.name || 'Protocolo SinapCode'}</span>
                                        <span className="text-[10px] text-apple-blue font-bold uppercase tracking-widest opacity-70">Ingeniería de Software</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-500 tracking-tight text-balance">
                                    {project.title}
                                </h3>
                                <p className="text-platinum-dim text-sm mb-10 leading-relaxed font-normal line-clamp-3 text-pretty opacity-80">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] font-bold text-apple-blue bg-white/[0.05] border border-white/10 px-3 py-1 rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={project.liveUrl || '#'}
                                        className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 active:scale-90"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link href="/projects" className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-2xl overflow-hidden active:scale-95 transition-all duration-300">
                        <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/20 transition-colors" />
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 text-white font-bold tracking-tight text-sm">
                            Laboratorio de Ingeniería
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                </div>
            </div>

            {/* Acento Final */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent shadow-[0_0_15px_rgba(255,165,0,0.2)]" />
        </section>
    );
}
