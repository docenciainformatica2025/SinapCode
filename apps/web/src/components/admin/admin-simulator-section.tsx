'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';
import {
    Users,
    GraduationCap,
    Building2,
    ShieldAlert,
    User,
    ArrowRight,
    Eye,
    Monitor
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ROLES = [
    {
        id: 'STUDENT',
        name: 'Estudiante',
        description: 'Vea el dashboard, rutas de aprendizaje y cursos.',
        icon: Users,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        glow: 'shadow-blue-400/20',
        path: '/dashboard'
    },
    {
        id: 'TEACHER',
        name: 'Profesor',
        description: 'Vea el kit de herramientas mágicas y gestión docente.',
        icon: GraduationCap,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20',
        glow: 'shadow-purple-400/20',
        path: '/teacher'
    },
    {
        id: 'COMPANY',
        name: 'Empresa',
        description: 'Vea la landing de aceleración corporativa.',
        icon: Building2,
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        glow: 'shadow-amber-400/20',
        path: '/empresas'
    },
    {
        id: 'USER',
        name: 'Normal',
        description: 'Vea la landing page principal del sitio.',
        icon: User,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
        glow: 'shadow-emerald-400/20',
        path: '/'
    }
];

export function AdminSimulatorSection() {
    const { simulateRole } = useAuth();
    const router = useRouter();
    const [simulatingId, setSimulatingId] = useState<string | null>(null);

    const handleSimulate = async (roleId: string, path: string) => {
        setSimulatingId(roleId);
        await simulateRole(roleId);
        // Small delay to show the effect
        setTimeout(() => {
            router.push(path);
        }, 800);
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neural-blue/10 border border-neural-blue/20 flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-neural-blue" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Centro de Simulación de Roles_</h3>
                        <p className="text-[10px] text-platinum-dim font-black uppercase tracking-[0.2em] opacity-60">Visualización de Experiencia de Usuario Multi-Rol</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Motor de Simulación Listo</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ROLES.map((role, i) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleSimulate(role.id, role.path)}
                        className="group relative cursor-pointer"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${role.bg} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />

                        <div className={`relative h-full bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 group-hover:border-white/20 transition-all duration-300 shadow-2xl flex flex-col items-center text-center overflow-hidden`}>
                            {/* Accent line */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${role.color.replace('text-', 'from-').replace('text-', 'to-')} rounded-b-full opacity-50`} />

                            <div className={`w-16 h-16 rounded-3xl ${role.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg ${role.glow}`}>
                                <role.icon className={`w-8 h-8 ${role.color}`} />
                            </div>

                            <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">{role.name}</h4>
                            <p className="text-xs text-platinum-dim font-medium leading-relaxed mb-8">{role.description}</p>

                            <div className="mt-auto w-full">
                                <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${simulatingId === role.id
                                    ? 'bg-white/20 text-white animate-pulse'
                                    : 'bg-white/5 border border-white/5 text-white group-hover:bg-white/10 group-hover:border-white/20'
                                    }`}>
                                    {simulatingId === role.id ? 'Inicializando...' : 'Simular Vista'}
                                    {simulatingId !== role.id && <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                                </div>
                            </div>

                            {/* Background badge icon */}
                            <role.icon className={`absolute -bottom-6 -right-6 w-24 h-24 ${role.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-black text-white uppercase tracking-wider italic">Modo de Auditoría de UI_</p>
                        <p className="text-[10px] text-platinum-dim font-bold uppercase tracking-widest opacity-60">
                            La simulación permite validar permisos, navegación y visualización de componentes sin afectar los datos reales del administrador.
                        </p>
                    </div>
                </div>
                <button
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-platinum-dim hover:text-white hover:bg-white/10 transition-all"
                >
                    <Eye className="w-4 h-4" /> Ver Guía de Permisos_
                </button>
            </div>
        </section>
    );
}
