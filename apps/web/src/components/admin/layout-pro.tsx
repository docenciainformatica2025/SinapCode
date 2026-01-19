'use client';

import { ReactNode, useState } from 'react';
import { AdminSidebarPro } from '@/components/admin/sidebar-pro';
import { AdminTopbar } from '@/components/admin/topbar-pro';
import { CommandPalette } from '@/components/admin/command-palette';

interface AdminLayoutProProps {
    children: ReactNode;
}

export function AdminLayoutPro({ children }: AdminLayoutProProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gradient-to-br from-black via-neural-dark to-black overflow-hidden">
            {/* Sidebar */}
            <AdminSidebarPro
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <AdminTopbar onCommandPaletteOpen={() => setCommandPaletteOpen(true)} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>

            {/* Command Palette */}
            <CommandPalette />
        </div>
    );
}
