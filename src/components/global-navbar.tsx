'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { UserGamificatonStats } from '@/components/gamification/user-stats';
import { VerifiedBadge } from '@/components/badges/verified-badge';

export function GlobalNavbar() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold bg-brain-spark bg-clip-text text-transparent hover:opacity-80 transition">
                        SinapCode
                    </Link>

                    {/* Desktop Links - Always visible or conditional? Keeping visible for exploration */}
                    <div className="hidden md:flex gap-6 text-sm font-medium text-platinum-dim">
                        <Link href="/courses" className="hover:text-white transition">Cursos</Link>
                        <Link href="/profesores" className="hover:text-white transition">Profesores</Link>
                        <Link href="/empresas" className="hover:text-white transition">Empresas</Link>
                    </div>
                </div>

                {/* Right Side: Auth State Dependent */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {session ? (
                        <>
                            {/* Logged In State */}
                            <div className="hidden lg:flex items-center gap-2">
                                <VerifiedBadge type="cisco" title="NetAcad Algo" date="2025-12" />
                                <VerifiedBadge type="oracle" title="Java Fnd" date="2026-01" />
                            </div>

                            <div className="hidden lg:block w-px h-6 bg-white/10"></div>

                            <div className="hidden sm:block">
                                <UserGamificatonStats />
                            </div>

                            <Link href="/profile" className="hidden sm:block">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 border border-white/20 cursor-pointer hover:scale-105 transition" />
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Guest State */}
                            <Link href="/auth/login" className="hidden sm:block text-sm font-medium text-white hover:text-neural-blue transition">
                                Iniciar Sesión
                            </Link>
                            <Link href="/auth/register" className="hidden sm:block px-4 py-2 bg-neural-blue text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition shadow-neon-blue">
                                Registrarse
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden pt-4 pb-2 space-y-3 border-t border-white/10 mt-3 animate-in fade-in slide-in-from-top-2">
                    <Link
                        href="/courses"
                        className="block px-4 py-2 text-platinum-dim hover:text-white hover:bg-white/5 rounded-lg transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Cursos
                    </Link>
                    <Link
                        href="/profesores"
                        className="block px-4 py-2 text-platinum-dim hover:text-white hover:bg-white/5 rounded-lg transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Profesores
                    </Link>
                    <Link
                        href="/empresas"
                        className="block px-4 py-2 text-platinum-dim hover:text-white hover:bg-white/5 rounded-lg transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Empresas
                    </Link>

                    <div className="border-t border-white/10 my-2 pt-2">
                        {session ? (
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-platinum-dim hover:text-white hover:bg-white/5 rounded-lg transition flex items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></div>
                                Mi Perfil
                            </Link>
                        ) : (
                            <div className="space-y-2 px-4">
                                <Link
                                    href="/auth/login"
                                    className="block w-full py-2 text-center border border-white/20 rounded-lg text-white hover:bg-white/5 transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block w-full py-2 text-center bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Registrarse
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
