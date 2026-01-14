'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    BarChart3,
    FileSearch,
    Activity,
    Shield,
    Settings,
    LogOut,
    ChevronRight,
    Zap,
    Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    children?: NavItem[];
}

const navigation: NavItem[] = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        name: 'Usuarios',
        href: '/admin/users',
        icon: Users,
        badge: 'new',
    },
    {
        name: 'Cursos',
        href: '/admin/courses',
        icon: BookOpen,
    },
    {
        name: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        children: [
            { name: 'Overview', href: '/admin/analytics', icon: BarChart3 },
            { name: 'Usuarios', href: '/admin/analytics/users', icon: Users },
            { name: 'Revenue', href: '/admin/analytics/revenue', icon: Zap },
            { name: 'Contenido', href: '/admin/analytics/content', icon: BookOpen },
        ]
    },
    {
        name: 'Auditoría',
        href: '/admin/audit',
        icon: FileSearch,
    },
    {
        name: 'System Health',
        href: '/admin/health',
        icon: Activity,
    },
    {
        name: 'Diagnóstico DB',
        href: '/admin/debug',
        icon: Database,
    },
    {
        name: 'Seguridad',
        href: '/admin/security',
        icon: Shield,
    },
    {
        name: 'Configuración',
        href: '/admin/settings',
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <div className="flex h-screen w-64 flex-col bg-[#0A0A0F] border-r border-white/5">
            {/* Logo/Brand */}
            <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neural-blue to-synapse-purple">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white">SinapCode</div>
                    <div className="text-xs text-platinum-dim">Admin Panel</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                {navigation.map((item) => (
                    <div key={item.name}>
                        <Link
                            href={item.href}
                            className={cn(
                                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                                isActive(item.href)
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                                <span className="rounded-full bg-accent-gold px-2 py-0.5 text-xs font-semibold text-deep-space">
                                    {item.badge}
                                </span>
                            )}
                            {item.children && (
                                <ChevronRight className={cn(
                                    'h-4 w-4 transition-transform',
                                    isActive(item.href) && 'rotate-90'
                                )} />
                            )}
                        </Link>

                        {/* Submenu */}
                        {item.children && isActive(item.href) && (
                            <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                                {item.children.map((child) => (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                            'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all',
                                            pathname === child.href
                                                ? 'text-white'
                                                : 'text-platinum-dim hover:text-white'
                                        )}
                                    >
                                        <child.icon className="h-3 w-3" />
                                        <span>{child.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="border-t border-white/5 p-4">
                <div className="mb-3 rounded-lg bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-amber-600 text-sm font-bold text-deep-space">
                            {session?.user?.name?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="truncate text-sm font-medium text-white">
                                {session?.user?.name || 'Admin'}
                            </div>
                            <div className="truncate text-xs text-platinum-dim">
                                {session?.user?.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-400 font-medium">
                            {(session?.user as any)?.role || 'ADMIN'}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => window.location.href = '/api/auth/signout'}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-platinum-dim transition-all hover:bg-rose-500/10 hover:text-rose-400"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
