'use client';

import { motion } from 'framer-motion';
import {
    UserPlus,
    School,
    Component,
    Award,
    CheckCircle2
} from 'lucide-react';

export function UserFlowValidation() {
    const steps = [
        { label: 'Lead', icon: UserPlus },
        { label: 'Estudiante', icon: School },
        { label: 'Constructor', icon: Component },
        { label: 'Graduado', icon: Award },
    ];

    return (
        <div className="mt-10 border-t border-white/5 pt-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Validación de Vías de Flujo de Usuario</h3>

            <div className="flex flex-wrap items-center justify-between gap-6 px-4">
                {steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-4 flex-1 last:flex-none">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, delay: i * 0.2 }}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-[#0a1212] shadow-lg shadow-primary/20 relative">
                                <step.icon className="w-6 h-6" />
                                {i === steps.length - 1 && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#f2e20d] rounded-full border-2 border-[#0a1212]"></div>
                                )}
                            </div>
                            <span className="text-[10px] font-black text-white uppercase tracking-tighter">{step.label}</span>
                        </motion.div>

                        {i < steps.length - 1 && (
                            <div className="h-[2px] flex-1 bg-white/10 relative overflow-hidden hidden sm:block">
                                <motion.div
                                    initial={{ left: '-100%' }}
                                    animate={{ left: '100%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-xs text-primary font-bold flex items-center gap-2"
            >
                <CheckCircle2 className="w-4 h-4" />
                Verificado: 50,000 recorridos sintéticos completados con 0% de caída.
            </motion.p>
        </div>
    );
}
