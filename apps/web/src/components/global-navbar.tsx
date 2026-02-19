'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { UserGamificatonStats } from '@/components/gamification/user-stats';
import { VerifiedBadge } from '@/components/badges/verified-badge';
import { useEffect } from 'react';

export function GlobalNavbar() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [siteConfig, setSiteConfig] = useState<any>(null);
    const [headerLinks, setHeaderLinks] = useState<any[]>([]);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch Site Config
        fetch('/api/site-config')
            .then(res => res.json())
            .then(data => setSiteConfig(data))
            .catch(() => { });

        // Fetch Navigation
        fetch('/api/navigation')
            .then(res => res.json())
            .then(data => {
                if (data.menus?.header) setHeaderLinks(data.menus.header);
            })
            .catch(() => { });

        if ((session as any)?.error === 'RefreshAccessTokenError') {
            signOut({ callbackUrl: '/auth/login' });
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [session]);

    const userRole = (session?.user as any)?.role;
    const isAdmin = userRole === 'ADMIN';

    const siteDisplayName = siteConfig?.siteName || 'SinapCode';

    // Dynamic classes based on scroll and auth state
    const isGuest = !session;
    const navClasses = isGuest
        ? (scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-white/10 shadow-sm'
            : 'bg-transparent border-b border-transparent')
        : 'bg-bg/95 backdrop-blur-md border-b border-white/10 shadow-sm';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 py-3 ${navClasses}`}>
            <div className="flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        {siteConfig?.logoUrl ? (
                            <img src={siteConfig.logoUrl} alt={siteDisplayName} className="h-6 w-auto object-contain" />
                        ) : (
                            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                                {siteDisplayName.split('Code')[0]}<span className="text-primary">{siteDisplayName.includes('Code') ? 'CODE' : ''}</span>
                            </span>
                        )}
                        {/* Subtle Gold Dot indicating Premium Quality */}
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>

                    {/* Desktop Links - Role Based */}
                    <div className="hidden md:flex gap-6 text-sm font-bold text-gray-500">
                        {session ? (
                            // Logged in users
                            isAdmin ? (
                                // Admin navigation
                                <>
                                    <Link href="/admin" className="hover:text-primary transition">📊 Admin</Link>
                                    <Link href="/admin/users" className="hover:text-primary transition">👥 Usuarios</Link>
                                    <Link href="/admin/audit" className="hover:text-primary transition">📈 Auditoría</Link>
                                </>
                            ) : (
                                // Student/Teacher navigation
                                <>
                                    <Link href="/dashboard" className="hover:text-primary transition">🏠 Inicio</Link>
                                    <Link href="/courses" className="hover:text-primary transition">🎓 Cursos</Link>
                                    <Link href="/library" className="hover:text-primary transition">📖 Biblioteca</Link>
                                    <Link href="/mentor" className="hover:text-primary transition">💬 Mentor</Link>
                                    <Link href="/evolution" className="hover:text-primary transition">📈 Evolución</Link>
                                    <Link href="/profile" className="hover:text-primary transition">👤 Perfil</Link>
                                </>
                            )
                        ) : (
                            // Public navigation
                            <>
                                {headerLinks.length > 0 ? (
                                    headerLinks.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="transition-colors relative group text-platinum-dim hover:text-white"
                                        >
                                            {link.label}
                                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    ))
                                ) : (
                                    <>
                                        {['/courses', '/profesores', '/empresas'].map((href, i) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                className="transition-colors relative group text-platinum-dim hover:text-white"
                                            >
                                                {['Cursos', 'Profesores', 'Empresas'][i]}
                                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
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

                            <Link href="/profile" className="hidden sm:block" aria-label="Ver perfil">
                                <div
                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border border-white/20 cursor-pointer hover:scale-105 transition shadow-sm"
                                    role="img"
                                    aria-label="Foto de perfil"
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Guest State - Matches Landing Style */}
                            <Link href="/auth/login" className="hidden sm:block text-sm font-bold text-gray-400 hover:text-white transition">
                                Ingresar
                            </Link>
                            <Link href="/auth/register" className="hidden sm:block bg-primary px-4 py-2 rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 border border-transparent hover:-translate-y-0.5">
                                Empieza Gratis
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden pt-4 pb-2 space-y-3 border-t border-white/10 mt-3 animate-in fade-in slide-in-from-top-2 bg-bg">
                    <Link
                        href="/courses"
                        className="block px-4 py-2 text-gray-400 font-medium hover:text-primary hover:bg-white/5 rounded-lg transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Cursos
                    </Link>
                    <Link
                        href="/profesores"
                        className="block px-4 py-2 text-gray-400 font-medium hover:text-primary hover:bg-white/5 rounded-lg transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Profesores
                    </Link>
                    <Link
                        href="/empresas"
                        className="block px-4 py-2 text-gray-400 font-medium hover:text-primary hover:bg-white/5 rounded-lg transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Empresas
                    </Link>

                    <div className="border-t border-white/10 my-2 pt-2">
                        {session ? (
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-gray-400 font-medium hover:text-primary hover:bg-white/5 rounded-lg transition flex items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                                Mi Perfil
                            </Link>
                        ) : (
                            <div className="space-y-2 px-4">
                                <Link
                                    href="/auth/login"
                                    className="block w-full py-2 text-center border border-white/10 rounded-lg text-gray-300 font-bold hover:bg-white/5 transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block w-full py-2 text-center bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/10"
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
