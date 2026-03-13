'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    BarChart3,
    Shield,
    Image,
    Settings,
    LogOut,
    DollarSign,
    Palette,
    MessageSquare,
    Brain,
    Zap,
    Sparkles,
    Bot,
    Radio,
    Rocket,
    ShieldCheck as WorkspacePremium,
    Lock as DefenseIcon,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';


export function AdminSidebar() {
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent hydration mismatch by waiting for mount
    if (!mounted) {
        return <aside className="w-64 bg-white/80 border-r border-[#1E1E1E]/5 h-screen fixed left-0 top-0 z-50 backdrop-blur-xl hidden lg:block" />;
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Panel Principal', href: '/admin' },

        // --- AI COMMAND CENTER ---
        { type: 'label', label: 'SISTEMAS AI SINAPCODE' },
        { icon: Brain, label: 'Noticias AI', href: '/admin/news', badge: 'PRO' },
        { icon: Zap, label: 'Fábrica Social', href: '/admin/content', badge: 'NEW' },
        { icon: Sparkles, label: 'Generador Visual', href: '/admin/banners', badge: 'AI' },
        { icon: Bot, label: 'Gestor de Agentes', href: '/admin/agents', badge: 'BETA' },
        { icon: BarChart3, label: 'Master Analytics', href: '/admin/analytics/master', badge: '360°' },

        // --- ESTRATEGIC INTELLIGENCE ---
        { type: 'label', label: 'INTELIGENCIA ESTRATÉGICA' },
        { icon: Zap, label: 'Protocolo Autónomo', href: '/admin/analytics/master/automation', badge: 'AI' },
        { icon: Sparkles, label: 'Experimentos A/B', href: '/admin/analytics/master/experiments', badge: 'LAB' },
        { icon: Zap, label: 'Atribución de Tráfico', href: '/admin/analytics/master/attribution', badge: 'ROI' },
        { icon: Radio, label: 'War Room Live', href: '/admin/analytics/master/war-room', badge: 'LIVE' },
        { icon: Rocket, label: 'Mission Control', href: '/admin/mission-control', badge: 'FINAL' },

        // --- SALES & CONVERSION ---
        { type: 'label', label: 'VENTAS & CONVERSIÓN' },
        { icon: Users, label: 'Gestión de Leads', href: '/admin/leads' },
        { icon: Zap, label: 'Campañas Nutrición', href: '/admin/campaigns' },
        { icon: WorkspacePremium, label: 'Marketplace Builders', href: '/admin/builders' },

        // --- CORE MANAGEMENT ---
        { type: 'label', label: 'GESTIÓN CORE' },
        { icon: Users, label: 'Usuarios', href: '/admin/users' },
        { icon: BookOpen, label: 'Cursos', href: '/admin/programs' },
        { icon: DollarSign, label: 'Finanzas', href: '/admin/pricing' },

        // --- DESIGN & CMS ---
        { type: 'label', label: 'DISEÑO & CMS' },
        { icon: Image, label: 'Banners', href: '/admin/banners' },
        { icon: MessageSquare, label: 'Testimonios', href: '/admin/testimonials' },
        { icon: Palette, label: 'Identidad Visual', href: '/admin/site-editor' },

        // --- SYSTEM ---
        { type: 'label', label: 'SISTEMA' },
        { icon: BarChart3, label: 'Analíticas', href: '/admin/analytics' },
        { icon: DefenseIcon, label: 'Ciberdefensa', href: '/admin/audit/defense', badge: 'MIL' },
        { icon: Shield, label: 'Cumplimiento Legal', href: '/admin/legal', badge: 'HUB' },
        { icon: Settings, label: 'Configuración', href: '/admin/system' },
    ];



    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
                className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-white border border-[#1E1E1E]/5 rounded-2xl text-[#1E1E1E] shadow-xl"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden fixed inset-0 z-[60] bg-[#1E1E1E]/20 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            <aside
                className={cn(
                    "w-64 bg-white/90 border-r border-[#1E1E1E]/5 flex flex-col h-screen fixed left-0 top-0 z-[70] backdrop-blur-xl shadow-xl transition-transform duration-500",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-between px-8 border-b border-[#1E1E1E]/5 bg-[#F1F0E8]/30">
                    <span className="text-xl font-black tracking-tighter text-[#1E1E1E] flex items-center gap-3 italic">
                        <div className="w-10 h-10 rounded-2xl bg-[#C9A78A] flex items-center justify-center text-white shadow-xl shadow-[#C9A78A]/20 not-italic">
                            <Shield className="w-6 h-6" />
                        </div>
                        SINAP<span className="text-[#C9A78A] italic">ADMIN</span>
                    </span>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Cerrar menú"
                        className="lg:hidden p-2 text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto scrollbar-hide">
                    {menuItems.map((item: any, idx) => {
                        if (item.type === 'label') {
                            return (
                                <div key={`label-${idx}`} className="px-4 pt-8 pb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1E1E1E]/30 italic">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        }

                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href + idx}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${isActive
                                    ? 'bg-[#1E1E1E] text-white shadow-xl shadow-[#1E1E1E]/10'
                                    : 'text-[#1E1E1E]/60 hover:text-[#C9A78A] hover:bg-[#C9A78A]/5'
                                    }`}
                            >
                                <Icon className={`w-4.5 h-4.5 transition-transform group-hover:scale-110 ${isActive ? 'text-[#C9A78A]' : 'text-[#1E1E1E]/40 group-hover:text-[#C9A78A]'}`} />
                                <span className="font-bold text-sm tracking-tight whitespace-nowrap">{item.label}</span>

                                {item.badge && (
                                    <span className={`ml-auto text-[8px] font-bold px-2 py-0.5 rounded-full ${item.badge === 'PRO' ? 'bg-[#C9A78A]/20 text-[#C9A78A]' :
                                        item.badge === 'AI' ? 'bg-[#A7C1C0]/20 text-[#A7C1C0]' :
                                            'bg-[#1E1E1E]/5 text-[#1E1E1E]'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-[#1E1E1E]/5 bg-[#F1F0E8]/10">
                    <button
                        className="flex items-center gap-3 px-6 py-4 w-full rounded-2xl text-red-600 font-bold text-sm hover:bg-red-500/5 transition-all group"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

