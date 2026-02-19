'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function LandingNavbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const [navLinks, setNavLinks] = useState([
        { label: 'Inicio', href: '/' },
        { label: 'Noticias', href: '/blog' },
        { label: 'Cursos', href: '/courses' },
        { label: 'Metodología', href: '/methodology' },
        { label: 'Proyectos', href: '/projects' },
    ]);

    // Smart logo redirect: logged in → dashboard, not logged in → home
    const logoHref = session ? '/dashboard' : '/';

    useEffect(() => {
        // 1. Fetch Navigation
        fetch('/api/navigation').then(res => res.json()).then((navData) => {
            if (navData.menus?.header && navData.menus.header.length > 0) {
                const headerLinks = navData.menus.header.map((l: any) => {
                    const label = l.label.toLowerCase();
                    if (label.includes('curso') || label.includes('academia')) return { ...l, label: 'Cursos', href: '/courses' };
                    if (label.includes('noticia') || label.includes('blog')) return { ...l, label: 'Noticias', href: '/blog' };
                    if (label.includes('metodo')) return { ...l, label: 'Metodología', href: '/methodology' };
                    if (label.includes('proyecto') || label.includes('exito')) return { ...l, label: 'Proyectos', href: '/projects' };
                    if (label.includes('inicio')) return { ...l, label: 'Inicio', href: '/' };
                    return l;
                });
                setNavLinks(headerLinks);
            }
        }).catch(() => { });

        // 2. Window Scroll Listener
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // 3. Intersection Observer (Scroll Spy)
        const sections = ['courses', 'methodology', 'projects', 'demo', 'membresia'];
        const observers: IntersectionObserver[] = [];

        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setActiveSection(`/#${entry.target.id}`);
                            }
                        });
                    },
                    { threshold: 0.1, rootMargin: '-10% 0px -80% 0px' }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <>
            <motion.nav
                suppressHydrationWarning
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/80 backdrop-blur-2xl shadow-2xl py-3'
                    : 'bg-transparent py-5'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container-page h-16 sm:h-20 flex items-center justify-between">
                    {/* Logo Oficial - Solo imagen, sin texto */}
                    <Link href={logoHref} className="flex-shrink-0 group" title="SinapCode">
                        <Image
                            src="/branding/Logo.png"
                            alt="SinapCode"
                            width={160}
                            height={40}
                            className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-platinum-dim">
                        {navLinks.map((link) => {
                            const isHome = pathname === '/';
                            const isMatchPath = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                            const isMatchSection = isHome && activeSection === link.href;
                            const isActive = isMatchPath || isMatchSection;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`transition-colors relative group ${isActive ? 'text-primary font-semibold' : 'text-platinum-dim hover:text-white'}`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>
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
                                <Image
                                    src="/branding/Logo.png"
                                    alt="SinapCode"
                                    width={120}
                                    height={30}
                                    className="h-6 w-auto object-contain"
                                />
                                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400">✕</button>
                            </div>

                            <div className="space-y-4">
                                {navLinks.map((link) => {
                                    const isHome = pathname === '/';
                                    const isMatchPath = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                    const isMatchSection = isHome && activeSection === link.href;
                                    const isActive = isMatchPath || isMatchSection;

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block text-lg font-bold transition-colors ${isActive ? 'text-primary' : 'text-platinum hover:text-primary'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="pt-8 border-t border-white/10 space-y-4">
                                <Link
                                    href="/auth/login"
                                    className="block w-full py-3 text-center text-platinum-dim border border-white/10 rounded-xl hover:bg-white/5 transition"
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
