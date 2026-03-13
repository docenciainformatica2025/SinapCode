'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { Heart, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export function LandingFooter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 5000);
            setEmail('');
        }
    };

    return (
        <footer className="bg-[#1E1E1E] border-t border-[#A7C1C0]/20 text-white font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-start w-full">

                {/* 4 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full mb-16">
                    {/* Column 1: Alma */}
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="inline-block">
                            <SinapcodeLogo variant="full" theme="light" className="h-8" />
                        </Link>
                        <p className="text-[#A7C1C0] text-sm font-light mt-2 max-w-[200px]">Aplicaciones con propósito.</p>
                        <div className="mt-auto pt-8">
                            <p className="text-[#A7C1C0]/60 text-xs">© {new Date().getFullYear()} Sinapcode</p>
                            <p className="text-[#A7C1C0]/60 text-xs">Todos los derechos reservados.</p>
                        </div>
                    </div>

                    {/* Column 2: Productos */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="text-white font-medium mb-3">Productos</h4>
                        <Link href="/nox" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Nox</Link>
                        <Link href="/vitriu" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Vitriu</Link>
                        <Link href="/finder" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Finder</Link>
                        <Link href="/utp-control" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">UTP Control</Link>
                        <Link href="/saberpro" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">SaberPro</Link>
                    </div>

                    {/* Column 3: Estudio */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="text-white font-medium mb-3">Estudio</h4>
                        <Link href="/estudio/sobre-nosotros" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Sobre nosotros</Link>
                        <Link href="/estudio/filosofia" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Nuestra filosofía</Link>
                        <Link href="/casos-estudio" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Casos de estudio</Link>
                        <Link href="/blog" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors">Blog</Link>
                    </div>

                    {/* Column 4: Conectar */}
                    <div className="flex flex-col space-y-3 h-full">
                        <h4 className="text-white font-medium mb-3">Conectar</h4>
                        <a href="mailto:hola@sinapcode.com" className="text-[#A7C1C0] hover:text-white text-sm font-light transition-colors mb-2">hola@sinapcode.com</a>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <a href="#" className="text-[#A7C1C0] hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-[#A7C1C0] hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-[#A7C1C0] hover:text-white transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                        </div>

                        <div className="relative mt-auto w-full">
                            <form onSubmit={handleSubscribe} className="flex items-center w-full border-b border-[#A7C1C0]/30 pb-2 relative group">
                                <input
                                    type="email"
                                    placeholder="Newsletter"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-transparent text-sm text-white placeholder:text-[#A7C1C0]/50 outline-none w-full font-light"
                                />
                                <button type="submit" className="text-[#A7C1C0] group-hover:text-white transition-colors hover:-translate-y-0.5">
                                    <span className="sr-only">Enviar</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </form>
                            <AnimatePresence>
                                {subscribed && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[10px] text-[#A7C1C0] absolute -bottom-5 left-0 whitespace-nowrap"
                                    >
                                        Listo. Te escribiremos pronto (sin spam, odiamos el spam).
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

