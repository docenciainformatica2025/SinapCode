'use client';

import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RoleSwitcherWidget() {
    const { simulateRole } = useAuth();
    const router = useRouter();

    const roles = [
        {
            id: 'STUDENT',
            label: 'Estudiante',
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20',
            path: '/dashboard'
        },
        {
            id: 'TEACHER',
            label: 'Profesor',
            icon: GraduationCap,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            border: 'border-purple-400/20',
            path: '/teacher'
        },
        {
            id: 'COMPANY',
            label: 'Empresa',
            icon: Building2,
            color: 'text-gold',
            bg: 'bg-gold/10',
            border: 'border-gold/20',
            path: '/empresas'
        },
        {
            id: 'USER',
            label: 'Usuario Normal',
            icon: Users,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            border: 'border-emerald-400/20',
            path: '/'
        }
    ];

    const handleSimulate = async (roleId: string, path: string) => {
        await simulateRole(roleId);
        router.push(path);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-pink-500" />
                    Simular Rol
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <button
                                key={role.id}
                                onClick={() => handleSimulate(role.id, role.path)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${role.bg} ${role.border} hover:bg-white/5 active:scale-95`}
                            >
                                <Icon className={`w-6 h-6 mb-2 ${role.color}`} />
                                <span className="text-sm font-medium text-white">{role.label}</span>
                            </button>
                        );
                    })}
                </div>
                <p className="text-xs text-platinum-dim mt-4 text-center">
                    Al simular, verás la plataforma exactamente como ese rol. Usa el botón flotante para salir.
                </p>
            </div>
        </motion.div>
    );
}
