'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    Settings,
    Shield,
    BarChart3,
    ChevronDown,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
    children?: NavItem[];
}

const navigationItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        label: 'Usuarios',
        href: '/admin/users',
        icon: <Users className="h-5 w-5" />,
        badge: '2.8K',
        children: [
            { label: 'Lista de Usuarios', href: '/admin/users', icon: null },
            { label: 'Roles y Permisos', href: '/admin/users/roles', icon: null },
        ],
    },
    {
        label: 'Cursos',
        href: '/admin/courses',
        icon: <BookOpen className="h-5 w-5" />,
        badge: '156',
        children: [
            { label: 'Todos los Cursos', href: '/admin/courses', icon: null },
            { label: 'Crear Curso', href: '/admin/courses/new', icon: null },
            { label: 'Categorías', href: '/admin/courses/categories', icon: null },
        ],
    },
    {
        label: 'Contenido',
        href: '/admin/content',
        icon: <FileText className="h-5 w-5" />,
        children: [
            { label: 'Páginas', href: '/admin/content/pages', icon: null },
            { label: 'Blog', href: '/admin/content/blog', icon: null },
            { label: 'Media Library', href: '/admin/content/media', icon: null },
        ],
    },
    {
        label: 'Analytics',
        href: '/admin/analytics',
        icon: <BarChart3 className="h-5 w-5" />,
    },
    {
        label: 'Seguridad',
        href: '/admin/security',
        icon: <Shield className="h-5 w-5" />,
        children: [
            { label: 'Audit Logs', href: '/admin/audit', icon: null },
            { label: 'Sesiones Activas', href: '/admin/security/sessions', icon: null },
        ],
    },
    {
        label: 'Configuración',
        href: '/admin/settings',
        icon: <Settings className="h-5 w-5" />,
        children: [
            { label: 'General', href: '/admin/settings', icon: null },
            { label: 'Integraciones', href: '/admin/settings/integrations', icon: null },
            { label: 'SEO', href: '/admin/settings/seo', icon: null },
        ],
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>(['/admin/users', '/admin/courses']);

    const toggleExpand = (href: string) => {
        setExpandedItems(prev =>
            prev.includes(href)
                ? prev.filter(item => item !== href)
                : [...prev, href]
        );
    };

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0f] border-r border-white/10 overflow-y-auto">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neural-blue to-synapse-purple flex items-center justify-center">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">SinapCode</h1>
                        <p className="text-xs text-platinum-dim">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                {navigationItems.map((item) => (
                    <div key={item.href}>
                        {/* Parent Item */}
                        <div className="relative">
                            <Link
                                href={item.href}
                                onClick={(e) => {
                                    if (item.children) {
                                        e.preventDefault();
                                        toggleExpand(item.href);
                                    }
                                }}
                                className={`
                                    flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg
                                    transition-all duration-200 group
                                    ${isActive(item.href)
                                        ? 'bg-neural-blue/20 text-neural-blue'
                                        : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={isActive(item.href) ? 'text-neural-blue' : 'text-platinum-dim group-hover:text-white'}>
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.badge && (
                                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-accent-gold/20 text-accent-gold">
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.children && (
                                        <span className="text-platinum-dim">
                                            {expandedItems.includes(item.href) ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            {/* Active Indicator */}
                            {isActive(item.href) && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-neural-blue rounded-r-full" />
                            )}
                        </div>

                        {/* Children Items */}
                        {item.children && expandedItems.includes(item.href) && (
                            <div className="ml-8 mt-1 space-y-1">
                                {item.children.map((child) => (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={`
                                            block px-3 py-2 rounded-lg text-sm
                                            transition-all duration-200
                                            ${isActive(child.href)
                                                ? 'text-neural-blue font-medium'
                                                : 'text-platinum-dim hover:text-white hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0a0a0f]">
                <div className="flex items-center gap-2 text-xs text-platinum-dim">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Sistema Operativo</span>
                </div>
            </div>
        </aside>
    );
}
