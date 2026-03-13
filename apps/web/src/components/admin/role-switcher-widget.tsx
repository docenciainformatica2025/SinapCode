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
            className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-[#1E1E1E]/5 shadow-sm relative overflow-hidden group w-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A78A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 text-center sm:text-left">
                <h3 className="text-lg font-black text-[#1E1E1E] mb-4 flex items-center justify-center sm:justify-start gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#C9A78A]" />
                    Simular Rol
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <button
                                key={role.id}
                                onClick={() => handleSimulate(role.id, role.path)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 bg-white border-[#1E1E1E]/5 hover:border-[#C9A78A]/30 active:scale-95 shadow-sm`}
                            >
                                <Icon className={`w-6 h-6 mb-2 ${role.color}`} />
                                <span className="text-sm font-bold text-[#1E1E1E]">{role.label}</span>
                            </button>
                        );
                    })}
                </div>
                <p className="text-[10px] text-[#1E1E1E]/40 mt-4 text-center font-bold uppercase tracking-widest">
                    Simulación de entorno de usuario. Use con precaución.
                </p>
            </div>
        </motion.div>
    );
}
