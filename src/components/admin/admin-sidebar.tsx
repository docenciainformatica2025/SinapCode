'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    BarChart3,
    Shield,
    Briefcase, // New
    MessageSquare, // New
    Image // New
} from 'lucide-react';

export function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: LayoutDashboard, label: 'Home Page (CMS)', href: '/admin/cms/home' },
        { icon: FileText, label: 'Blog / Noticias', href: '/admin/posts' },
        { icon: Users, label: 'Usuarios', href: '/admin/users' },
        // Core Value
        { icon: FileText, label: 'Cursos', href: '/admin/programs' },
        { icon: Briefcase, label: 'Proyectos', href: '/admin/projects' }, // New
        { icon: MessageSquare, label: 'Testimonios', href: '/admin/testimonials' }, // New
        { icon: LayoutDashboard, label: 'Banners (CMS)', href: '/admin/banners' },
        // Business Intelligence
        { icon: BarChart3, label: 'Finanzas', href: '/admin/finance' },
        { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
        // Tech & Security
        { icon: Shield, label: 'Sistema', href: '/admin/system' },
        { icon: Shield, label: 'Auditoría', href: '/admin/audit' },
        { icon: Settings, label: 'Configuración', href: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-[#0F1117] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <span className="text-xl font-bold tracking-tight text-white">
                    SINAP<span className="text-gold">ADMIN</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-gold/10 text-gold border border-gold/20'
                                : 'text-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-muted group-hover:text-white'}`} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer & User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className="mb-3 rounded-lg bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-amber-600 text-sm font-bold text-deep-space">
                            {session?.user?.name?.[0]?.toUpperCase() || 'A'}
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
                </div>

                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition"
                    onClick={() => window.location.href = '/api/auth/signout'}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>

                <div className="mt-4 text-center">
                    <p className="text-[10px] text-white/20 font-mono">
                        v{process.env.NEXT_PUBLIC_APP_VERSION || '1.2.0'}
                    </p>
                </div>
            </div>
        </aside>
    );
}
