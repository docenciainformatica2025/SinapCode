'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
    password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
    const criteria = useMemo(() => [
        { label: '8+ Caracteres', met: password.length >= 8 },
        { label: 'Número', met: /\d/.test(password) },
        { label: 'Símbolo', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
        { label: 'Mayúscula', met: /[A-Z]/.test(password) },
    ], [password]);

    const strength = criteria.filter(c => c.met).length;
    const strengthPercentage = (strength / 4) * 100;

    const getStrengthColor = () => {
        if (strength === 0) return 'bg-white/10';
        if (strength <= 2) return 'bg-red-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = () => {
        if (strength === 0) return '';
        if (strength <= 2) return 'Débil';
        if (strength === 3) return 'Media';
        return 'Fuerte';
    };

    return (
        <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Strength Bar */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-500 ease-out", getStrengthColor())}
                    style={{ width: `${strengthPercentage}%` }}
                />
            </div>

            {/* Functional Checklist */}
            <div className="grid grid-cols-2 gap-2">
                {criteria.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center gap-2 text-xs transition-colors duration-300",
                            item.met ? "text-emerald-400 font-medium" : "text-[#B8BFC9]/60"
                        )}
                    >
                        <div className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300",
                            item.met
                                ? "bg-emerald-500/20 border-emerald-500"
                                : "bg-transparent border-white/20"
                        )}>
                            {item.met && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Dynamic Status Text */}
            <div className="text-right text-xs font-mono tracking-wider transition-colors duration-300">
                <span className={cn(
                    strength === 4 ? "text-emerald-400" : "text-[#B8BFC9]"
                )}>
                    {getStrengthText()}
                </span>
            </div>
        </div>
    );
}
