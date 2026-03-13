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
                                ? 'bg-[#C9A78A]/10 border-[#C9A78A] shadow-lg shadow-[#C9A78A]/5'
                                : 'bg-white border-[#1E1E1E]/5 hover:bg-[#F1F0E8] hover:border-[#1E1E1E]/10'
                            }
                        `}
                        aria-pressed={isSelected}
                    >
                        <div className={`
                            p-2 rounded-full mb-2 transition-colors
                            ${isSelected ? 'bg-[#C9A78A] text-white' : 'bg-[#F1F0E8] text-[#1E1E1E]/40 group-hover:text-[#C9A78A]'}
                        `}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <h3 className={`text-sm font-black mb-1 ${isSelected ? 'text-[#1E1E1E]' : 'text-[#1E1E1E]/60 group-hover:text-[#1E1E1E]'}`}>
                            {role.label}
                        </h3>
                        <p className="text-[10px] leading-tight text-[#1E1E1E]/40 font-medium group-hover:text-[#1E1E1E]/60">
                            {role.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
