'use client';

import { Search, User, Command } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { NotificationDropdown } from './notifications-dropdown';

interface TopbarProps {
    onCommandPaletteOpen?: () => void;
}

export function AdminTopbar({ onCommandPaletteOpen }: TopbarProps) {
    const { data: session } = useSession();


    return (
        <div className="h-16 glass-panel border-b border-white/10 px-6 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <button
                    onClick={onCommandPaletteOpen}
                    className="w-full flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group"
                >
                    <Search className="h-4 w-4 text-platinum-dim group-hover:text-neural-blue transition-colors" />
                    <span className="text-sm text-platinum-dim flex-1 text-left">
                        Buscar o ejecutar comando...
                    </span>
                    <div className="flex items-center gap-1">
                        <kbd className="px-2 py-1 text-xs font-mono bg-white/10 text-platinum-dim rounded border border-white/20">
                            ⌘K
                        </kbd>
                    </div>
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <NotificationDropdown />

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
        </div>
    );
}
