'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    BarChart3,
    Shield
} from 'lucide-react';

export function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: Users, label: 'Usuarios', href: '/admin/users' },
        { icon: FileText, label: 'Banners', href: '/admin/banners' },
        { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
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

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition"
                    onClick={() => window.location.href = '/api/auth/signout'}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
