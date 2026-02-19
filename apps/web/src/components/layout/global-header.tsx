'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';

export function GlobalHeader() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    // Hide header on auth pages and dashboard (dashboard usually has its own layout)


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Inicio', href: '/' },
        { label: 'Noticias', href: '/#news' },
        { label: 'Cursos', href: '/#courses' },
        { label: 'Metodología', href: '/methodology' },
        { label: 'Proyectos', href: '/#projects' },
    ];

    // Hide header on auth pages and dashboard (dashboard usually has its own layout)
    if (pathname?.startsWith('/auth') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
                    ? 'bg-bg/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
                    : 'bg-transparent border-b border-white/5'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container-page h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-50">
                        <span className="text-2xl font-black tracking-tighter text-white">
                            SINAP<span className="text-primary">CODE</span>
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(25,127,230,0.8)] group-hover:scale-150 transition-transform duration-300" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-bold text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Auth / CTA */}
                    <div className="hidden md:flex items-center gap-4 relative z-50">
                        {session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                        {session.user?.name?.[0] || 'U'}
                                    </div>
                                    <span className="text-sm font-bold text-white max-w-[100px] truncate">
                                        {session.user?.name?.split(' ')[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#0f1115] border border-white/10 shadow-2xl overflow-hidden p-2"
                                        >
                                            <div className="mb-2 px-3 py-2 border-b border-white/5">
                                                <p className="text-xs text-gray-400">Firmado como</p>
                                                <p className="text-sm font-bold text-white truncate">{session.user?.email}</p>
                                            </div>

                                            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </Link>
                                            <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <User className="w-4 h-4" />
                                                Mi Perfil
                                            </Link>
                                            <Link href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                <Settings className="w-4 h-4" />
                                                Configuración
                                            </Link>

                                            <div className="h-px bg-white/5 my-1" />

                                            <button
                                                onClick={() => signOut()}
                                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Cerrar Sesión
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
                                >
                                    Ingresar
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2.5 bg-primary hover:bg-primary-dim text-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(25,127,230,0.4)] hover:shadow-[0_0_25px_rgba(25,127,230,0.6)] hover:-translate-y-0.5"
                                >
                                    Empieza Gratis
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                            {session ? (
                                <>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                            {session.user?.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{session.user?.name}</p>
                                            <p className="text-sm text-gray-400">{session.user?.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 bg-white/5 rounded-xl text-center font-bold text-white">
                                        Ir al Dashboard
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full py-3 text-red-400 font-bold text-center"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-3 rounded-xl border border-white/10 text-center font-bold text-white hover:bg-white/5 transition-colors"
                                    >
                                        Ingresar
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-3 rounded-xl bg-primary text-center font-bold text-white hover:bg-primary-dim transition-colors shadow-lg"
                                    >
                                        Empieza Gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
