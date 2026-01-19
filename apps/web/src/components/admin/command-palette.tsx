'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
    Search,
    Users,
    BookOpen,
    BarChart3,
    Settings,
    Plus,
    FileText,
    Shield,
    Bell,
    Home,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    keywords?: string[];
}

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const router = useRouter();

    // Toggle command palette with Cmd+K or Ctrl+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const navigate = useCallback((path: string) => {
        router.push(path);
        setOpen(false);
        setSearch('');
    }, [router]);

    const commands: CommandItem[] = [
        // Navigation
        {
            id: 'nav-dashboard',
            label: 'Ir al Dashboard',
            icon: <Home className="h-4 w-4" />,
            action: () => navigate('/admin'),
            keywords: ['home', 'inicio', 'dashboard']
        },
        {
            id: 'nav-users',
            label: 'Gestión de Usuarios',
            icon: <Users className="h-4 w-4" />,
            action: () => navigate('/admin/users'),
            keywords: ['usuarios', 'users', 'personas']
        },
        {
            id: 'nav-programs',
            label: 'Gestión de Programas',
            icon: <BookOpen className="h-4 w-4" />,
            action: () => navigate('/admin/programs'),
            keywords: ['cursos', 'courses', 'programas', 'programs']
        },
        {
            id: 'nav-banners',
            label: 'Gestión de Banners',
            icon: <FileText className="h-4 w-4" />,
            action: () => navigate('/admin/banners'),
            keywords: ['banners', 'contenido', 'marketing']
        },
        {
            id: 'nav-analytics',
            label: 'Analytics',
            icon: <BarChart3 className="h-4 w-4" />,
            action: () => navigate('/admin/analytics'),
            keywords: ['analytics', 'estadísticas', 'métricas']
        },
        {
            id: 'nav-settings',
            label: 'Configuración',
            icon: <Settings className="h-4 w-4" />,
            action: () => navigate('/admin/settings'),
            keywords: ['settings', 'configuración', 'ajustes']
        },
        {
            id: 'nav-audit',
            label: 'Auditoría',
            icon: <Shield className="h-4 w-4" />,
            action: () => navigate('/admin/audit'),
            keywords: ['audit', 'auditoría', 'logs', 'seguridad']
        },

        // Quick Actions
        {
            id: 'action-create-user',
            label: 'Crear Nuevo Usuario',
            icon: <Plus className="h-4 w-4" />,
            action: () => navigate('/admin/users?action=create'),
            keywords: ['crear', 'nuevo', 'usuario', 'add']
        },
        {
            id: 'action-create-program',
            label: 'Crear Nuevo Programa',
            icon: <Plus className="h-4 w-4" />,
            action: () => navigate('/admin/programs?action=create'),
            keywords: ['crear', 'nuevo', 'curso', 'programa']
        },
        {
            id: 'action-create-banner',
            label: 'Crear Nuevo Banner',
            icon: <Plus className="h-4 w-4" />,
            action: () => navigate('/admin/banners?action=create'),
            keywords: ['crear', 'nuevo', 'banner']
        },
    ];

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
                    >
                        <Command
                            className="glass-panel rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                            shouldFilter={true}
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                                <Search className="h-5 w-5 text-neural-blue" />
                                <Command.Input
                                    value={search}
                                    onValueChange={setSearch}
                                    placeholder="Buscar o ejecutar comando..."
                                    className="flex-1 bg-transparent text-white placeholder:text-platinum-dim outline-none text-base"
                                />
                                <kbd className="px-2 py-1 text-xs font-mono bg-white/10 text-platinum-dim rounded border border-white/20">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <Command.List className="max-h-[400px] overflow-y-auto p-2">
                                <Command.Empty className="py-8 text-center text-platinum-dim text-sm">
                                    No se encontraron resultados
                                </Command.Empty>

                                {/* Navigation Group */}
                                <Command.Group
                                    heading="Navegación"
                                    className="text-xs font-bold text-platinum-dim uppercase tracking-wider px-2 py-2"
                                >
                                    {commands.filter(cmd => cmd.id.startsWith('nav-')).map((command) => (
                                        <Command.Item
                                            key={command.id}
                                            value={`${command.label} ${command.keywords?.join(' ')}`}
                                            onSelect={() => command.action()}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-neural-blue/20 transition-colors data-[selected=true]:bg-neural-blue/30 mb-1"
                                        >
                                            <div className="text-neural-blue">
                                                {command.icon}
                                            </div>
                                            <span className="text-white text-sm">
                                                {command.label}
                                            </span>
                                        </Command.Item>
                                    ))}
                                </Command.Group>

                                {/* Quick Actions Group */}
                                <Command.Group
                                    heading="Acciones Rápidas"
                                    className="text-xs font-bold text-platinum-dim uppercase tracking-wider px-2 py-2 mt-2"
                                >
                                    {commands.filter(cmd => cmd.id.startsWith('action-')).map((command) => (
                                        <Command.Item
                                            key={command.id}
                                            value={`${command.label} ${command.keywords?.join(' ')}`}
                                            onSelect={() => command.action()}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-emerald-500/20 transition-colors data-[selected=true]:bg-emerald-500/30 mb-1"
                                        >
                                            <div className="text-emerald-400">
                                                {command.icon}
                                            </div>
                                            <span className="text-white text-sm">
                                                {command.label}
                                            </span>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            </Command.List>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/5">
                                <div className="flex items-center gap-4 text-xs text-platinum-dim">
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">↓</kbd>
                                        <span>navegar</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">↵</kbd>
                                        <span>seleccionar</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-platinum-dim">
                                    <Zap className="h-3 w-3 text-accent-gold" />
                                    <span>Command Palette</span>
                                </div>
                            </div>
                        </Command>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
