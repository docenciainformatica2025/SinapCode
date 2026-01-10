'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Cursos', href: '#cursos' },
        { label: 'Cómo Funciona', href: '#como-funciona' },
        { label: 'Demo IA', href: '#demo' },
        { label: 'Precios', href: '#pricing' },
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel border-b border-white/10 shadow-2xl' : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neural-blue to-synapse-purple hover:opacity-80 transition">
                        SinapCode
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="text-platinum-dim hover:text-white transition">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/auth/login"
                            className="hidden sm:block px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:text-neural-blue transition"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            href="/auth/register"
                            className="px-4 sm:px-6 py-2 bg-neural-blue text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-blue-600 transition shadow-neon-blue"
                        >
                            Empezar Gratis
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white hover:text-neural-blue transition"
                            aria-label="Toggle menu"
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
                        className="fixed top-[60px] right-0 bottom-0 w-64 glass-panel border-l border-white/10 z-40 md:hidden"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-white hover:text-neural-blue transition font-medium py-2"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-white/10">
                                <Link
                                    href="/auth/login"
                                    className="block text-center py-2 text-white hover:text-neural-blue transition font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Iniciar Sesión
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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
