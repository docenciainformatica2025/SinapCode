'use client';

import Link from 'next/link';

interface QuickAction {
    icon: string;
    label: string;
    href: string;
    description: string;
}

const actions: QuickAction[] = [
    {
        icon: '👤',
        label: 'Nuevo Usuario',
        href: '/admin/users/new',
        description: 'Crear cuenta de usuario'
    },
    {
        icon: '📚',
        label: 'Nuevo Curso',
        href: '/admin/courses/new',
        description: 'Agregar curso al catálogo'
    },
    {
        icon: '📊',
        label: 'Ver Reportes',
        href: '/admin/analytics',
        description: 'Análisis y métricas'
    },
    {
        icon: '⚙️',
        label: 'Configuración',
        href: '/admin/settings',
        description: 'Ajustes del sistema'
    },
];

export function QuickActions() {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-accent-gold">⚡</span>
                Acciones Rápidas
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neural-blue transition"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{action.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white group-hover:text-neural-blue transition">
                                    {action.label}
                                </div>
                                <div className="text-xs text-platinum-dim mt-1">
                                    {action.description}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
