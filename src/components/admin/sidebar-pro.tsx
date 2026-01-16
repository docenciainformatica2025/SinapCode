'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart3,
    Settings,
    Shield,
    Bell,
    ChevronLeft,
    ChevronRight,
    Zap,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SidebarProps {
    collapsed?: boolean;
    onToggle?: () => void;
}

const menuItems = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin',
        badge: null
    },
    {
        title: 'Usuarios',
        icon: Users,
        href: '/admin/users',
        badge: 'Pro'
    },
    {
        title: 'Programas',
        icon: BookOpen,
        href: '/admin/programs',
        badge: 'New'
    },
    {
        title: 'Banners',
        icon: FileText,
        href: '/admin/banners',
        badge: 'New'
    },
    {
        title: 'Analytics',
        icon: BarChart3,
        href: '/admin/analytics',
        badge: null
    },
    {
        title: 'Auditoría',
        icon: Shield,
        href: '/admin/audit',
        badge: null
    },
    {
        title: 'Configuración',
        icon: Settings,
        href: '/admin/settings',
        badge: 'New'
    },
];

export function AdminSidebarPro({ collapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
        onToggle?.();
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative h-screen glass-panel border-r border-white/10 flex flex-col"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neural-blue to-synapse-purple flex items-center justify-center">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-sm">SinapCode</h2>
                                <p className="text-platinum-dim text-xs">Admin Pro</p>
                            </div>
                        </motion.div>
                    )}
                    <button
                        onClick={handleToggle}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4 text-platinum-dim" />
                        ) : (
                            <ChevronLeft className="h-4 w-4 text-platinum-dim" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-neural-blue/20 text-neural-blue shadow-neon-blue'
                                        : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {!isCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-between flex-1"
                                    >
                                        <span className="text-sm font-medium">{item.title}</span>
                                        {item.badge && (
                                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent-gold/20 text-accent-gold">
                                                {item.badge}
                                            </span>
                                        )}
                                    </motion.div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full
                        text-rose-400 hover:bg-rose-500/10
                    `}
                >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                        <span className="text-sm font-medium">Cerrar Sesión</span>
                    )}
                </button>
            </div>

            {/* Collapse Toggle (Desktop) */}
            <button
                onClick={handleToggle}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-neural-blue border-2 border-black flex items-center justify-center hover:scale-110 transition-transform hidden lg:flex"
            >
                {isCollapsed ? (
                    <ChevronRight className="h-3 w-3 text-white" />
                ) : (
                    <ChevronLeft className="h-3 w-3 text-white" />
                )}
            </button>
        </motion.aside>
    );
}
