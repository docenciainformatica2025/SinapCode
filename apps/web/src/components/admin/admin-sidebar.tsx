'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart3,
    Shield,
    Image,
    Settings,
    LogOut,
    DollarSign,
    Palette,
    MessageSquare
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
        return <aside className="w-64 bg-[#0F1117] border-r border-white/5 h-screen fixed left-0 top-0 z-50" />;
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: Palette, label: 'Identidad Sitio', href: '/admin/site-editor' }, // NEW
        { icon: Users, label: 'Usuarios', href: '/admin/users' },
        { icon: BookOpen, label: 'Cursos (Prog)', href: '/admin/programs' },
        { icon: DollarSign, label: 'Planes/Precios', href: '/admin/pricing' }, // NEW
        { icon: Image, label: 'Banners', href: '/admin/banners' },
        { icon: Image, label: 'Proyectos', href: '/admin/projects' },
        { icon: MessageSquare, label: 'Testimonios', href: '/admin/testimonials' }, // NEW
        { icon: FileText, label: 'Contenido (Blog)', href: '/admin/content' },
        { icon: BarChart3, label: 'Estadísticas', href: '/admin/analytics' },
        { icon: Shield, label: 'Auditoría', href: '/admin/audit' },
        { icon: Settings, label: 'Sistema', href: '/admin/system' },
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
