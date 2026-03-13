'use client';

import { ReactNode, useState } from 'react';
import { AdminSidebarPro } from '@/components/admin/sidebar-pro';
import { AdminTopbar } from '@/components/admin/topbar-pro';
import { CommandPalette } from '@/components/admin/command-palette';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProProps {
    children: ReactNode;
}

export function AdminLayoutPro({ children }: AdminLayoutProProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#0B0B0F] text-white overflow-hidden font-sans selection:bg-neural-blue/30 lg:bg-gradient-to-br lg:from-black lg:via-bg-surface lg:to-black">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex h-full">
                <AdminSidebarPro
                    collapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {mobileSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
                        >
                            <AdminSidebarPro onClose={() => setMobileSidebarOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Accessibility Skip Link */}
                <a href="#admin-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-neural-blue focus:text-white">
                    Saltar al contenido principal
                </a>

                {/* Topbar */}
                <AdminTopbar
                    onCommandPaletteOpen={() => setCommandPaletteOpen(true)}
                    onMobileMenuOpen={() => setMobileSidebarOpen(true)}
                />

                {/* Page Content */}
                <main id="admin-content" className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth" role="main" aria-label="Contenido administrativo">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>

            {/* Command Palette */}
            <CommandPalette
                isOpen={commandPaletteOpen}
                onClose={() => setCommandPaletteOpen(false)}
            />
        </div>
    );
}
