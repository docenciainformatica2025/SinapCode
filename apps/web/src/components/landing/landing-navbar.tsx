'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [siteConfig, setSiteConfig] = useState<any>(null);

    useEffect(() => {
        // Fetch Site Config
        fetch('/api/site-config')
            .then(res => res.json())
            .then(data => setSiteConfig(data))
            .catch(() => { });

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            // ... rest of scroll logic
        };
        // ...
    }, []);

    // ... (rest of the logic remains similar, just use siteConfig.siteName and siteConfig.logoUrl)

    // Logic for scroll spy
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = ['cursos', 'como-funciona', 'proyectos', 'demo'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(`#${section}`);
                        return;
                    }
                }
            }
            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [navLinks, setNavLinks] = useState<any[]>([
        { label: 'Cursos', href: '#cursos' },
        { label: 'Metodología', href: '/methodology' },
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Blog', href: '/blog' },
    ]);

    useEffect(() => {
        // Fetch Site Config
        fetch('/api/site-config')
            .then(res => res.json())
            .then(data => setSiteConfig(data))
            .catch(() => { });

        // Fetch Navigation
        fetch('/api/navigation')
            .then(res => res.json())
            .then(data => {
                if (data.menus?.header && data.menus.header.length > 0) {
                    // 1. Create a copy and REMOVE any existing 'Metodología' link (to avoid duplicates or bad hrefs)
                    const headerLinks = data.menus.header.filter((l: any) => l.label !== 'Metodología');

                    // 2. Force Insert the correct link
                    const insertIdx = headerLinks.findIndex((l: any) => l.label.toLowerCase().includes('cursos'));
                    if (insertIdx !== -1) {
                        headerLinks.splice(insertIdx + 1, 0, { label: 'Metodología', href: '/methodology' });
                    } else {
                        headerLinks.push({ label: 'Metodología', href: '/methodology' });
                    }

                    setNavLinks(headerLinks);
                }
            })
            .catch(() => { });

        // ... (rest of scroll logic is in the other useEffect)
    }, []);

    const siteDisplayName = siteConfig?.siteName || 'SINAPCODE';

    return (
        <>
            <motion.nav
                suppressHydrationWarning
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-bg/80 backdrop-blur-md border-b border-white/10'
                    : 'bg-transparent border-b border-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container-page h-16 sm:h-20 flex items-center justify-between">
                    {/* Logo sin puntos decorativos */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {siteConfig?.logoUrl ? (
                            <img src={siteConfig.logoUrl} alt={siteDisplayName} className="h-6 w-auto object-contain" />
                        ) : (
                            <span className="text-xl font-black tracking-tighter text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(25,127,230,0.8)]" />
                                SINAP<span className="text-primary group-hover:text-blue-400 transition-colors uppercase">CODE</span>
                            </span>
                        )}
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-platinum-dim">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href || (link.href === '/blog' && typeof window !== 'undefined' && window.location.pathname === '/blog');

                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`transition-colors relative group ${isActive ? 'text-primary font-semibold' : 'text-platinum-dim hover:text-white'}`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/auth/login"
                            className="hidden sm:block text-sm font-bold text-platinum-dim hover:text-white transition"
                        >
                            Ingresar
                        </Link>
                        <Link
                            href="/auth/register"
                            className="btn-primary text-sm shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:-translate-y-0.5"
                        >
                            Empieza Gratis
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white hover:text-primary transition"
                            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={mobileMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-y-0 right-0 w-64 bg-bg/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden shadow-2xl"
                    >
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold text-white">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400">✕</button>
                            </div>

                            <div className="space-y-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-lg font-bold text-platinum hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-100 space-y-4">
                                <Link
                                    href="/auth/login"
                                    className="block w-full py-3 text-center text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Ingresar
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block w-full py-3 text-center bg-primary text-white font-bold rounded-xl hover:opacity-90 transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Empieza Gratis
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
