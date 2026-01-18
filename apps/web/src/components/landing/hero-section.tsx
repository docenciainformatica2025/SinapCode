'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-20 md:pt-40 md:pb-24">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
                {/* Subtle Gold Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
            </div>

            <div className="container-page relative z-10 grid gap-12 md:grid-cols-2 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="space-y-8 text-center md:text-left"
                >


                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                        Aprende tecnología <br className="hidden lg:block" />
                        aplicada <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">con IA real</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto md:mx-0 leading-relaxed">
                        Cursos prácticos, proyectos reales y formación diseñada para el mundo profesional moderno.
                        <span className="block mt-2 text-gold-light/80 font-medium">
                            Tu tutor personal de IA te guía paso a paso.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="/auth/register"
                            className="btn-primary text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            Comenzar ahora
                        </Link>

                        <Link
                            href="#cursos"
                            className="btn-secondary text-lg hover:border-gold/30 hover:text-gold transition-colors"
                        >
                            Explorar Cursos
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-8 flex flex-wrap gap-6 justify-center md:justify-start text-sm text-muted">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span>Certificados Blockchain</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>100% A tu ritmo</span>
                        </div>
                    </div>
                </motion.div>

                {/* Visual/Code Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl rounded-full" />

                    <div className="relative rounded-2xl bg-[#0F1117] border border-white/10 shadow-2xl overflow-hidden group hover:border-gold/20 transition-colors duration-500">
                        {/* Fake Browser Header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="ml-4 px-3 py-1 rounded bg-black/20 text-xs text-muted font-mono">
                                ai-tutor.py
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">1</span>
                                <span className="text-purple-400">class</span> <span className="text-yellow-200 ml-2">FutureDev</span>:
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">2</span>
                                <span className="ml-4 text-purple-400">def</span> <span className="text-blue-400 ml-2">__init__</span>(self):
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">3</span>
                                <span className="ml-8 text-cyan-400">self</span>.skills = [<span className="text-green-400">'AI'</span>, <span className="text-green-400">'Web3'</span>, <span className="text-green-400">'Security'</span>]
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">4</span>
                                <span className="ml-8 text-cyan-400">self</span>.status = <span className="text-green-400">'Ready for Impact'</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">5</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">6</span>
                                <span className="ml-4 text-purple-400">def</span> <span className="text-blue-400 ml-2">learn_with_sinapcode</span>(self):
                            </div>
                            <div className="flex bg-gold/10 -mx-6 px-6 border-l-2 border-gold">
                                <span className="text-gray-600 select-none mr-4">7</span>
                                <span className="ml-8 text-muted">// Optimizing learning path...</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 select-none mr-4">8</span>
                                <span className="ml-8 text-purple-400">return</span> <span className="text-gold font-bold">Success.GUARANTEED</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-5 h-8 border-2 border-muted/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-1.5 bg-muted/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
