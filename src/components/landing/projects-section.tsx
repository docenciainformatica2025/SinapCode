'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function ProjectsSection() {
    const projects = [
        {
            title: 'Bot de Trading con IA',
            student: 'Carlos M.',
            role: 'Backend Python',
            image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800',
            description: 'Algoritmo que analiza sentimiento en Twitter para predecir movimientos de crypto. +45% de rentabilidad en simulación.',
            tags: ['Python', 'NLP', 'Binance API'],
        },
        {
            title: 'DeFi Dashboard',
            student: 'Ana R.',
            role: 'Full Stack Web3',
            image: 'https://images.unsplash.com/photo-1639322537228-ad7117a3a635?auto=format&fit=crop&q=80&w=800',
            description: 'Panel visual para gestionar staking en múltiples cadenas. Integra wallets reales y calcula APY en tiempo real.',
            tags: ['Next.js', 'Solidity', 'Ethers.js'],
        },
        {
            title: 'SaaS de Ciberseguridad',
            student: 'David L.',
            role: 'SecDevOps',
            image: 'https://images.unsplash.com/photo-1563206767-5b1d972d9fb7?auto=format&fit=crop&q=80&w=800',
            description: 'Plataforma automatizada que escanea vulnerabilidades en repositorios de GitHub al hacer push. Uso real en 3 empresas.',
            tags: ['Python', 'Docker', 'AWS'],
        }
    ];

    return (
        <section id="proyectos" className="py-24 bg-bg relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[100px]" />

            <div className="container-page relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gold/20 text-xs font-mono text-gold mb-4">
                        PROYECTOS REALES
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        No hacemos "Hola Mundo". <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Construimos el futuro.
                        </span>
                    </h2>
                    <p className="text-lg text-muted">
                        Nuestros estudiantes no solo copian código. Desarrollan soluciones complejas que resuelven problemas reales desde el primer mes.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-soft"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-white/10 transition cursor-pointer">
                                        <Github className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-white/10 transition cursor-pointer">
                                        <ExternalLink className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-primary border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-bg">
                                        {project.student.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{project.student}</div>
                                        <div className="text-xs text-muted">{project.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="btn-secondary group">
                        Ver Portafolio Completo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
