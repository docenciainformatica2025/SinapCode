'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    TrendingUp,
    Library,
    MessageSquare,
    User,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cursos', href: '/courses', icon: BookOpen },
    { name: 'Mi Evolución', href: '/evolution', icon: TrendingUp },
    { name: 'Biblioteca', href: '/library', icon: Library },
    { name: 'AI Tutor', href: '/mentor', icon: MessageSquare },
    { name: 'Mi Perfil', href: '/profile', icon: User },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-surface/80 backdrop-blur-md border border-white/10 rounded-xl text-white shadow-xl shadow-black/20"
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
                        className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 h-screen bg-deep-space border-r border-white/5 transition-all duration-300 z-[70] flex flex-col overflow-hidden",
                    collapsed ? "w-20" : "w-64",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-between px-6 shrink-0 relative">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                            <span className="text-deep-space font-black text-xl italic">S</span>
                        </div>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xl font-black text-white tracking-tighter"
                            >
                                Sinap<span className="text-emerald-400">CODE</span>
                            </motion.span>
                        )}
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden p-2 text-platinum-dim hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide py-4">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                                    isActive
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "text-platinum-dim hover:text-white hover:bg-white/5"
                                )}
                            >
                                <link.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-emerald-400" : "group-hover:scale-110 transition-transform")} />
                                {!collapsed && <span className="font-bold text-sm whitespace-nowrap">{link.name}</span>}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Operations */}
                <div className="p-4 border-t border-white/5 space-y-2 bg-deep-space/50 backdrop-blur-md shrink-0">
                    <button
                        onClick={() => logout?.()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-platinum-dim hover:text-red-400 hover:bg-red-400/10 transition-all group overflow-hidden"
                    >
                        <LogOut className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
                        {!collapsed && <span className="font-bold text-sm whitespace-nowrap">Cerrar Sesión</span>}
                    </button>

                    {/* Collapse Toggle (Desktop only) */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex w-full items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl text-platinum-dim hover:text-white transition-all group"
                        title={collapsed ? "Expandir" : "Contraer"}
                    >
                        {collapsed ? <ChevronRight className="w-5 h-5 shrink-0" /> : <ChevronLeft className="w-5 h-5 shrink-0" />}
                        {!collapsed && <span className="text-xs font-bold uppercase tracking-widest opacity-50">Contraer Menú</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
