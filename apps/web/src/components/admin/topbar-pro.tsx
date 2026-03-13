'use client';

import { Search, Bell, User, Command } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface TopbarProps {
    onCommandPaletteOpen?: () => void;
    onMobileMenuOpen?: () => void;
}

export function AdminTopbar({ onCommandPaletteOpen, onMobileMenuOpen }: TopbarProps) {
    const { data: session } = useSession();
    const [notificationCount] = useState(3);

    return (
        <header
            className="h-16 glass-panel border-b border-white/10 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30"
            role="banner"
        >
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onMobileMenuOpen}
                    className="p-2 lg:hidden hover:bg-white/10 rounded-lg transition-colors text-platinum-dim"
                    aria-label="Abrir menú lateral"
                >
                    <Command className="h-5 w-5" />
                </button>

                {/* Search */}
                <div className="flex-1 min-w-[200px] md:min-w-[400px]">
                    <button
                        onClick={onCommandPaletteOpen}
                        className="w-full flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group"
                        aria-label="Buscar o ejecutar comandos"
                    >
                        <Search className="h-4 w-4 text-platinum-dim group-hover:text-neural-blue transition-colors" />
                        <span className="text-sm text-platinum-dim flex-1 text-left hidden sm:inline">
                            Buscar o ejecutar comando...
                        </span>
                        <span className="text-sm text-platinum-dim flex-1 text-left sm:hidden">
                            Buscar...
                        </span>
                        <div className="hidden md:flex items-center gap-1">
                            <kbd className="px-2 py-1 text-xs font-mono bg-white/10 text-platinum-dim rounded border border-white/20">
                                ⌘K
                            </kbd>
                        </div>
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-platinum-dim hover:text-white transition-colors" />
                    {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                            {notificationCount}
                        </span>
                    )}
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">
                            {session?.user?.name || 'Admin'}
                        </p>
                        <p className="text-xs text-platinum-dim">
                            {session?.user?.email || 'admin@sinapcode.com'}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neural-blue to-synapse-purple flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
}
