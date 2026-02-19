'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroData } from '@/lib/landing-data';

export function HeroSection({ data }: { data: HeroData }) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black py-20">
            {/* Official Banner Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/branding/hero-banner.png"
                    alt=""
                    className="w-full h-full object-cover brightness-[0.4] contrast-[1.1] scale-105"
                    onError={(e) => {
                        (e.target as any).style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] pointer-events-none z-20" />
            </div>

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
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.05] border border-white/10"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A84FF]">
                            {data.subtitle}
                        </span>
                    </motion.div>

                    <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-white mb-8 leading-[1.1] tracking-tight text-balance">
                        {data.title}
                    </h1>

                    <p className="max-w-xl mx-auto md:mx-0 text-base md:text-lg text-platinum-dim mb-10 leading-relaxed font-medium text-pretty opacity-60">
                        {data.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                        <Link
                            href={data.primaryCtaLink}
                            className="btn-primary"
                        >
                            {data.primaryCtaText}
                        </Link>
                        <Link
                            href="/blog"
                            className="btn-secondary"
                        >
                            Últimas Noticias
                        </Link>
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

                    <div className="relative rounded-[3rem] bg-black/60 border border-white/10 shadow-2xl overflow-hidden group hover:border-[#0df2f2]/40 transition-all duration-1000 will-change-transform backdrop-blur-3xl">
                        {/* Fake Browser Header */}
                        <div className="flex items-center gap-2 px-8 py-5 border-b border-white/5 bg-white/[0.02]">
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
                                <span className="text-primary font-bold">import</span> &#123; <span className="text-blue-400">Builder</span> &#125; <span className="text-primary font-bold">from</span> <span className="text-emerald-400">&quot;@sinap/core&quot;</span>;
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">02</span>
                                <span className="text-purple-400">interface</span> <span className="text-yellow-200">EvolutionPath</span> &#123;
                            </div>
                            <div className="flex">
                                <span className="ml-6 text-platinum-dim">mastery</span>: <span className="text-orange-400">&quot;Guaranteed&quot;</span>;
                            </div>
                            <div className="flex">
                                <span className="ml-6 text-platinum-dim">stack</span>: [<span className="text-emerald-400">&quot;IA&quot;</span>, <span className="text-emerald-400">&quot;Web3&quot;</span>, <span className="text-emerald-400">&quot;4K_UX&quot;</span>];
                            </div>
                            <div className="flex">
                                <span className="text-gray-700 select-none mr-6">05</span>
                                &#125;
                            </div>
                            <div className="flex mt-4 bg-primary/5 -mx-10 px-10 border-l-2 border-primary py-2 backdrop-blur-sm">
                                <span className="text-white opacity-90 italic">&#123;`// Protocolo SinapCode: Optimización en curso...`&#125;</span>
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
                className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-40 hover:opacity-100 transition-opacity"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                    <div className="w-1 h-3 bg-[#0A84FF] rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
