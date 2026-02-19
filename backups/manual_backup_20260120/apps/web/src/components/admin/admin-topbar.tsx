'use client';

import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function AdminTopbar() {
    const { data: session } = useSession();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="sticky top-0 z-40 h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-2xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-platinum-dim" />
                        <input
                            type="text"
                            placeholder="Buscar... (Ctrl+K)"
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-platinum-dim focus:outline-none focus:ring-2 focus:ring-neural-blue/50 focus:border-neural-blue transition-all"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-platinum-dim bg-white/5 rounded border border-white/10">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 ml-6">
                    {/* Environment Badge */}
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                        DEVELOPMENT
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <Bell className="h-5 w-5 text-platinum-dim" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-accent-gold rounded-full" />
                    </button>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neural-blue to-synapse-purple flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-left hidden md:block">
                                <div className="text-sm font-medium text-white">
                                    {session?.user?.name || 'Admin'}
                                </div>
                                <div className="text-xs text-platinum-dim">Administrador</div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-platinum-dim" />
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0f] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                                <a href="/dashboard" className="block px-4 py-2 text-sm text-platinum-dim hover:bg-white/5 hover:text-white transition-colors">
                                    Ver como Usuario
                                </a>
                                <a href="/admin/settings" className="block px-4 py-2 text-sm text-platinum-dim hover:bg-white/5 hover:text-white transition-colors">
                                    Configuración
                                </a>
                                <div className="border-t border-white/10" />
                                <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
