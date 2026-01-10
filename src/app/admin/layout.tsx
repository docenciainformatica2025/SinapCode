'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { RoleGate } from '@/components/auth/role-gate';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/users', label: 'Users', icon: '👥' },
        { href: '/admin/audit', label: 'Audit Logs', icon: '📋' },
    ];

    return (
        <div className="min-h-screen bg-deep-space text-platinum flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/20 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        Mission Control
                    </h1>
                    <p className="text-xs text-platinum-dim mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                        ? 'bg-neural-blue text-white font-bold shadow-neon-blue'
                                        : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="glass-panel p-4 rounded-lg">
                        <div className="text-xs text-platinum-dim mb-2">System Status</div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-sm font-bold text-emerald-400">All Systems Operational</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <RoleGate allowedRoles={['ADMIN']}>
                    {children}
                </RoleGate>
            </main>
        </div>
    );
}
