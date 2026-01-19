'use client';

import { GraduationCap, Briefcase, Building2 } from 'lucide-react';

interface RoleSelectorProps {
    selectedRole: string;
    onSelect: (role: string) => void;
}

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
    const roles = [
        {
            id: 'STUDENT',
            label: 'Estudiante',
            description: 'Quiero aprender y desarrollar habilidades',
            icon: GraduationCap,
        },
        {
            id: 'TEACHER',
            label: 'Profesor',
            description: 'Quiero crear contenido y guiar estudiantes',
            icon: Briefcase,
        },
        {
            id: 'COMPANY',
            label: 'Empresa',
            description: 'Busco talento y capacitación corporativa',
            icon: Building2,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;

                return (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => onSelect(role.id)}
                        className={`
                            relative flex flex-col items-center p-4 rounded-xl border transition-all duration-200 text-center group
                            ${isSelected
                                ? 'bg-neural-blue/20 border-neural-blue shadow-neon-blue'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }
                        `}
                        aria-pressed={isSelected}
                    >
                        <div className={`
                            p-2 rounded-full mb-2 transition-colors
                            ${isSelected ? 'bg-neural-blue text-white' : 'bg-white/10 text-gray-400 group-hover:text-white'}
                        `}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <h3 className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {role.label}
                        </h3>
                        <p className="text-[10px] leading-tight text-gray-500 group-hover:text-gray-400">
                            {role.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
