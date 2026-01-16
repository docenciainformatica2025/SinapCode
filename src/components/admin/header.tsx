'use client';

import { Search, Bell, Command } from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
    title: string;
    description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="sticky top-0 z-10 border-b border-white/5 bg-deep-space/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-8">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold text-white">{title}</h1>
                    {description && (
                        <p className="text-sm text-platinum-dim">{description}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum-dim" />
                        <input
                            type="text"
                            placeholder="Buscar... (Cmd+K)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-platinum-dim transition-all focus:border-neural-blue focus:outline-none focus:ring-2 focus:ring-neural-blue/20"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-xs text-platinum-dim">
                            ⌘K
                        </kbd>
                    </div>

                    {/* Notifications */}
                    <button className="relative rounded-lg p-2 text-platinum-dim transition-all hover:bg-white/5 hover:text-white">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-deep-space" />
                    </button>
                </div>
            </div>
        </div>
    );
}
