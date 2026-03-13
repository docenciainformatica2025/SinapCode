'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Heart, Activity, Map, Briefcase, GraduationCap, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export function GlobalHeader() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background effect logic
            setScrolled(currentScrollY > 20);

            // Visibility logic
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide header on auth pages and dashboard/admin
    if (pathname?.startsWith('/auth') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) {
        return null;
    }

    const apps = [
        {
            name: 'Nox Health',
            description: 'Bienestar y comunidad para mujeres.',
            icon: Heart,
            iconColor: 'text-[#C9A78A]',
            href: '/productos/nox',
            externalUrl: 'https://nox-health.vercel.app/welcome',
            highlight: {
                title: 'Empoderamiento femenino a través de la tecnología.',
                desc: 'Una plataforma integral para el seguimiento de la salud y el bienestar.'
            }
        },
        {
            name: 'Vitriu',
            description: 'Inventarios, compras y CRM simple.',
            icon: Activity,
            iconColor: 'text-[#A7C1C0]',
            href: '/productos/vitriu',
            highlight: {
                title: 'Eficiencia operativa en tiempo real.',
                desc: 'Optimiza tus inventarios y fortalece la relación con tus clientes.'
            }
        },
        {
            name: 'Findriver Pro',
            description: 'Control de gastos para delivery.',
            icon: Map,
            iconColor: 'text-[#F9E795]',
            href: '/productos/findriver',
            externalUrl: 'https://findriver-app.vercel.app/',
            highlight: {
                title: 'Maximiza tus ganancias en cada ruta.',
                desc: 'La herramienta definitiva para el conductor profesional moderno.'
            }
        },
        {
            name: 'UTP Control',
            description: 'Gestión de personal en campo.',
            icon: Briefcase,
            iconColor: 'text-[#1E1E1E]',
            href: '/productos/utp-control',
            externalUrl: 'https://utp-control.vercel.app/auth/login',
            highlight: {
                title: 'Sincronización total de tu equipo.',
                desc: 'Monitorea y asigna tareas en campo con precisión quirúrgica.'
            }
        },
        {
            name: 'Saber Pro 2026',
            description: 'Preparación para pruebas de estado.',
            icon: GraduationCap,
            iconColor: 'text-gray-400',
            href: '/productos/saberpro',
            externalUrl: 'https://saber-pro-one.vercel.app/',
            highlight: {
                title: 'El camino a la excelencia académica.',
                desc: 'Metodología avanzada para dominar las pruebas Saber Pro.'
            }
        },
    ];

    const resources = [
        { name: 'Blog', href: '/blog' },
        { name: 'Casos de estudio', href: '/casos-estudio' },
        { name: 'Preguntas frecuentes', href: '/faq' },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 w-full z-50 transition-all duration-500 h-[80px] flex justify-center items-center ${scrolled || mobileMenuOpen || activeDropdown
                    ? 'bg-[#F1F0E8]/80 backdrop-blur-xl border-b border-[#1E1E1E]/5 shadow-sm'
                    : 'bg-[#F1F0E8]/80 backdrop-blur-md border-b border-transparent'
                    }`}
                initial={{ y: 0 }}
                animate={{ y: visible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onMouseLeave={() => {
                    setActiveDropdown(null);
                    setHoveredProduct(null);
                }}
            >
                <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Left: Identidad */}
                    <div className="w-1/4">
                        <Link href="/" className="inline-block">
                            <SinapcodeLogo variant="full" theme="color" className="h-9" />
                        </Link>
                    </div>

                    {/* Center: Navegación Silenciosa */}
                    <nav className="hidden md:flex items-center justify-center gap-12 w-2/4">

                        {/* Productos Mega Menu */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setActiveDropdown('productos')}
                        >
                            <button className="text-[15px] font-medium text-[#1E1E1E]/80 hover:text-[#1E1E1E] transition-colors flex items-center gap-1">
                                Productos <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'productos' ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === 'productos' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-[50px] left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-white rounded-3xl shadow-xl border border-[#1E1E1E]/5 overflow-hidden grid grid-cols-1 md:grid-cols-5 p-4"
                                    >
                                        <div className="md:col-span-3 flex flex-col p-2">
                                            {apps.map((app, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={app.href}
                                                    onMouseEnter={() => setHoveredProduct(idx)}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F1F0E8]/50 transition-colors"
                                                >
                                                    <div className="mt-1 flex-shrink-0">
                                                        <app.icon className={`w-6 h-6 ${app.iconColor}`} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-medium text-[#1E1E1E]">{app.name}</h4>
                                                        <p className="text-sm font-light text-[#1E1E1E]/60 mt-1">{app.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="md:col-span-2 bg-[#F1F0E8]/30 rounded-2xl p-6 m-2 flex flex-col justify-center">
                                            <p className="text-xs font-bold tracking-widest text-[#C9A78A] uppercase mb-4">
                                                {hoveredProduct !== null ? 'Información Destacada' : 'Caso Destacado'}
                                            </p>
                                            <h4 className="text-lg font-medium text-[#1E1E1E] mb-3 leading-snug min-h-[56px]">
                                                {hoveredProduct !== null ? apps[hoveredProduct].highlight.title : 'Cómo Vitriu ayudó a una ferretería a reducir quiebres de stock.'}
                                            </h4>
                                            <p className="text-sm font-light text-[#1E1E1E]/60 mb-6 min-h-[40px]">
                                                {hoveredProduct !== null ? apps[hoveredProduct].highlight.desc : 'Una historia de transformación digital y optimización de recursos.'}
                                            </p>
                                            <Link href={hoveredProduct !== null ? apps[hoveredProduct].href : '/casos-estudio'} onClick={() => setActiveDropdown(null)} className="text-[#1E1E1E] font-medium text-sm flex items-center hover:text-[#C9A78A] transition-colors group">
                                                {hoveredProduct !== null ? 'Ver detalles' : 'Leer historia'} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Estudio */}
                        <Link
                            href="/estudio/sobre-nosotros"
                            className="text-[15px] font-medium text-[#1E1E1E]/80 hover:text-[#1E1E1E] transition-colors"
                            onMouseEnter={() => setActiveDropdown(null)}
                        >
                            Estudio
                        </Link>

                        {/* Recursos Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setActiveDropdown('recursos')}
                        >
                            <button className="text-[15px] font-medium text-[#1E1E1E]/80 hover:text-[#1E1E1E] transition-colors flex items-center gap-1">
                                Recursos <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'recursos' ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === 'recursos' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-[50px] left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-lg border border-[#1E1E1E]/5 overflow-hidden flex flex-col py-2"
                                    >
                                        {resources.map((res, idx) => (
                                            <Link
                                                key={idx}
                                                href={res.href}
                                                onClick={() => setActiveDropdown(null)}
                                                className="px-5 py-3 text-sm font-medium text-[#1E1E1E]/70 hover:bg-[#F1F0E8]/50 hover:text-[#1E1E1E] transition-colors"
                                            >
                                                {res.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    {/* Right: Acción / Auth */}
                    <div className="hidden md:flex items-center justify-end gap-6 w-1/4">
                        {session ? (
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setUserMenuOpen(true)}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#C9A78A] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                                        {session.user?.name?.[0] || 'U'}
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-[#1E1E1E]/40 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            onMouseLeave={() => setUserMenuOpen(false)}
                                            className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-[#1E1E1E]/5 shadow-xl overflow-hidden p-2"
                                        >
                                            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#1E1E1E]/70 hover:bg-[#F1F0E8]/50 hover:text-[#1E1E1E] transition-colors">
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </Link>
                                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#1E1E1E]/70 hover:bg-[#F1F0E8]/50 hover:text-[#1E1E1E] transition-colors">
                                                <User className="w-4 h-4" />
                                                Mi Perfil
                                            </Link>
                                            <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#1E1E1E]/70 hover:bg-[#F1F0E8]/50 hover:text-[#1E1E1E] transition-colors">
                                                <Settings className="w-4 h-4" />
                                                Configuración
                                            </Link>
                                            <div className="h-px bg-[#1E1E1E]/5 my-2 mx-2" />
                                            <button
                                                onClick={() => signOut()}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Cerrar Sesión
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-sm font-medium text-[#1E1E1E]/60 hover:text-[#1E1E1E] transition-colors"
                            >
                                Ingresar
                            </Link>
                        )}

                        <Link
                            href="/auth/register"
                            className="bg-[#F9E795] text-[#1E1E1E] px-6 py-2.5 rounded-full text-sm font-medium hover:brightness-95 transition-all group flex items-center gap-2"
                        >
                            Iniciar proyecto
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden relative z-50 p-2 text-[#1E1E1E]"
                    >
                        {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
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
                        className="fixed inset-0 z-40 bg-[#F1F0E8] md:hidden flex flex-col pt-28 px-6 overflow-y-auto pb-12"
                    >
                        <nav className="flex flex-col gap-8">

                            {/* Productos (expandido en movil) */}
                            <div>
                                <h3 className="text-xl font-medium text-[#1E1E1E]/50 mb-4 px-2">Productos</h3>
                                <div className="space-y-2 border-l border-[#1E1E1E]/10 pl-4 ml-2">
                                    {apps.map((app, idx) => (
                                        <Link
                                            key={idx}
                                            href={app.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block py-3 text-2xl font-medium text-[#1E1E1E] hover:text-[#C9A78A] transition-colors"
                                        >
                                            {app.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-[#1E1E1E]/50 mb-4 px-2">Estudio</h3>
                                <div className="space-y-4 border-l border-[#1E1E1E]/10 pl-4 ml-2">
                                    <Link
                                        href="/estudio/sobre-nosotros"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-3xl font-medium text-[#1E1E1E] hover:text-[#C9A78A] transition-colors"
                                    >
                                        Sobre nosotros
                                    </Link>
                                    <Link
                                        href="/estudio/filosofia"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-3xl font-medium text-[#1E1E1E] hover:text-[#C9A78A] transition-colors"
                                    >
                                        Nuestra filosofía
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4 px-2">
                                <h3 className="text-xl font-medium text-[#1E1E1E]/50 mb-2">Recursos</h3>
                                <div className="space-y-2 border-l border-[#1E1E1E]/10 pl-4">
                                    {resources.map((res, idx) => (
                                        <Link
                                            key={idx}
                                            href={res.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block py-2 text-xl font-medium text-[#1E1E1E]"
                                        >
                                            {res.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </nav>

                        <div className="mt-12 pt-8 flex flex-col gap-6 px-2">
                            {session ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-4 rounded-2xl bg-white border border-[#1E1E1E]/10 text-[#1E1E1E] text-center font-medium text-xl shadow-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-4 rounded-2xl bg-white border border-[#1E1E1E]/10 text-[#1E1E1E] text-center font-medium text-xl shadow-sm"
                                >
                                    Ingresar
                                </Link>
                            )}
                            <Link
                                href="/auth/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-4 rounded-2xl bg-[#F9E795] text-[#1E1E1E] text-center font-medium text-xl shadow-sm flex items-center justify-center gap-2"
                            >
                                Iniciar proyecto
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

