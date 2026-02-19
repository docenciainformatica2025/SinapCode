'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroData } from '@/lib/landing-data';

export function HeroSection({ data }: { data: HeroData }) {
    return (
        <section className="relative bg-bg flex flex-col items-center justify-center pt-32 pb-32 md:pb-40 px-4 overflow-hidden subpixel-text">
            {/* Optimized High-Performance Ambient Background */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-10 will-change-[filter,opacity] opacity-40" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10 will-change-[filter,opacity] opacity-30" />

            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

            <div className="container-page relative z-10 grid gap-16 md:grid-cols-2 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8 text-center md:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-4k backdrop-blur-2xl"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-platinum italic">
                            {data.subtitle}
                        </span>
                    </motion.div>

                    <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] font-black text-white mb-6 leading-[1.05] tracking-tighter italic uppercase text-glow">
                        {data.title}
                    </h1>

                    <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-platinum-dim mb-10 leading-relaxed font-bold opacity-70">
                        {data.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                        <Link
                            href={data.primaryCtaLink}
                            className="w-full sm:w-auto px-12 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-white/20 transition-all duration-500 hover:-translate-y-1 block text-center active:scale-95 border border-white/20"
                        >
                            {data.primaryCtaText}
                        </Link>
                        <Link
                            href={data.secondaryCtaLink}
                            className="w-full sm:w-auto px-12 py-6 glass-4k border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500 block text-center italic hover:scale-[1.02]"
                        >
                            {data.secondaryCtaText}
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 opacity-40 grayscale hover:opacity-100 transition-all duration-700 mt-16 group">
                        <span className="text-platinum font-black tracking-[0.3em] text-[10px] italic uppercase">VALIDADO POR BUILDERS EN</span>
                        {['Google', 'Vercel', 'Meta', 'Microsoft'].map((company) => (
                            <span key={company} className="text-white font-black text-2xl tracking-tighter italic group-hover:text-primary transition-colors cursor-default">{company}</span>
                        ))}
                    </div>
                </motion.div>

                {/* Visual/Code Block - GPU Accelerated */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative hidden md:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[100px] rounded-full opacity-40 animate-pulse" />

                    <div className="relative rounded-[2.5rem] bg-black/80 border border-white/5 shadow-2xl overflow-hidden group hover:border-primary/40 transition-all duration-700 will-change-transform">
                        {/* Fake Browser Header */}
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-xl">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/40 group-hover:bg-red-500/90 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/90 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-green-500/40 group-hover:bg-green-500/90 transition-colors" />
                            </div>
                            <div className="ml-6 px-4 py-1 rounded-lg bg-black/60 text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                                node::nexus_protocol.ts
                            </div>
                        </div>

                        {/* Code Content with 4K Sharpness */}
                        <div className="p-10 font-mono text-[13px] leading-relaxed text-gray-400 subpixel-text">
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">01</span>
                                <span className="text-primary font-bold">import</span> &#123; <span className="text-blue-400">Builder</span> &#125; <span className="text-primary font-bold">from</span> <span className="text-emerald-400">"@sinap/core"</span>;
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">02</span>
                                <span className="text-purple-400">interface</span> <span className="text-yellow-200">EvolutionPath</span> &#123;
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">03</span>
                                <span className="ml-6 text-platinum-dim">mastery</span>: <span className="text-orange-400">"Guaranteed"</span>;
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">04</span>
                                <span className="ml-6 text-platinum-dim">stack</span>: [<span className="text-emerald-400">"IA"</span>, <span className="text-emerald-400">"Web3"</span>, <span className="text-emerald-400">"4K_UX"</span>];
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">05</span>
                                &#125;
                            </div>
                            <div className="flex mt-4 bg-primary/5 -mx-10 px-10 border-l-2 border-primary py-2 backdrop-blur-sm">
                                <span className="text-gray-700 select-none mr-6">06</span>
                                <span className="text-white opacity-90 italic">// Protocolo Nexus: Optimización en curso...</span>
                            </div>
                            <div className="flex mt-4">
                                <span className="text-gray-700 select-none mr-6">07</span>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">builder</span> = <span className="text-purple-400">new</span> <span className="text-yellow-200">Builder</span>();
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">08</span>
                                <span className="text-blue-400">builder</span>.<span className="text-blue-200">initialize</span>(<span className="text-primary font-bold">PRO_MASTERY</span>);
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator 4K */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border border-white/10 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                    <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
}
