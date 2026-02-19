'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
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
    Lock as DefenseIcon
} from 'lucide-react';


import { useState, useEffect } from 'react';

export function AdminSidebar() {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by waiting for mount
    if (!mounted) {
        return <aside className="w-64 bg-deep-space/95 border-r border-white/5 h-screen fixed left-0 top-0 z-50 backdrop-blur-xl" />;
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Panel Principal', href: '/admin' },

        // --- AI COMMAND CENTER ---
        { type: 'label', label: 'NEXUS AI SYSTEMS' },
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
        <aside className="w-64 bg-deep-space/95 border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50 backdrop-blur-xl shadow-2xl">
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-white/5 bg-white/5">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neural-blue to-purple-600 flex items-center justify-center text-white shadow-lg">
                        <Shield className="w-5 h-5" />
                    </div>
                    SINAP<span className="text-neural-blue">ADMIN</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item: any, idx) => {
                    if (item.type === 'label') {
                        return (
                            <div key={`label-${idx}`} className="px-4 pt-6 pb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
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
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                ? 'bg-white/10 text-white border border-white/10 shadow-glow'
                                : 'text-platinum-dim hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-neural-blue' : 'text-platinum-dim group-hover:text-white'}`} />
                            <span className="font-bold text-sm">{item.label}</span>

                            {item.badge && (
                                <span className={`ml-auto text-[8px] font-black px-1.5 py-0.5 rounded ${item.badge === 'PRO' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                    item.badge === 'AI' ? 'bg-neural-blue/20 text-neural-blue border border-neural-blue/30' :
                                        'bg-white/10 text-white'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
