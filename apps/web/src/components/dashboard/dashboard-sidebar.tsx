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
        <div className="flex min-h-screen bg-[#F1F0E8] overflow-hidden">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMobileOpen(true)}
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

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 h-screen bg-white/90 border-r border-[#1E1E1E]/5 transition-all duration-500 z-[70] flex flex-col overflow-hidden backdrop-blur-xl",
                    collapsed ? "w-24" : "w-72",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-between px-8 shrink-0">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-[#C9A78A] rounded-[18px] flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-[#C9A78A]/20">
                            <span className="text-white font-black text-xl italic tracking-tighter">S</span>
                        </div>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xl font-bold text-[#1E1E1E] tracking-tighter uppercase italic"
                            >
                                Sinap<span className="text-[#C9A78A]">CODE</span>
                            </motion.span>
                        )}
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden p-2 text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 space-y-2 overflow-y-auto scrollbar-hide py-8">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-[22px] transition-all group relative duration-300",
                                    isActive
                                        ? "bg-[#1E1E1E] text-white shadow-xl shadow-[#1E1E1E]/10"
                                        : "text-[#1E1E1E]/50 hover:text-[#C9A78A] hover:bg-[#C9A78A]/5"
                                )}
                            >
                                <link.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-[#C9A78A]" : "")} />
                                {!collapsed && <span className="font-bold text-sm tracking-tight whitespace-nowrap">{link.name}</span>}
                                {isActive && !collapsed && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="ml-auto w-1.5 h-1.5 bg-[#C9A78A] rounded-full shadow-[0_0_8px_rgba(201,167,138,0.5)]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Operations */}
                <div className="p-6 border-t border-[#1E1E1E]/5 bg-[#F1F0E8]/10 space-y-3 shrink-0">
                    <button
                        onClick={() => logout?.()}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-[#1E1E1E]/40 hover:text-red-600 hover:bg-red-500/5 transition-all group font-bold text-sm"
                    >
                        <LogOut className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
                        {!collapsed && <span className="whitespace-nowrap">Cerrar Sesión</span>}
                    </button>

                    {/* Collapse Toggle (Desktop only) */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex w-full items-center gap-4 px-5 py-3 hover:bg-[#1E1E1E]/5 rounded-[18px] text-[#1E1E1E]/30 hover:text-[#1E1E1E] transition-all group"
                        title={collapsed ? "Expandir" : "Contraer"}
                    >
                        {collapsed ? <ChevronRight className="w-5 h-5 shrink-0" /> : <ChevronLeft className="w-5 h-5 shrink-0" />}
                        {!collapsed && <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 italic">Contraer</span>}
                    </button>
                </div>
            </aside>
        </div>
    );
}
