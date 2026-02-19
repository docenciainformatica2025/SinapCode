'use client';

import { useAuth } from '@/contexts/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, LogOut } from 'lucide-react';

export function SimulationIndicator() {
    const { isSimulating, user, exitSimulation } = useAuth();



    if (!isSimulating || !user) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 p-2 pl-4 bg-neural-blue text-deep-space rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/20 backdrop-blur-md"
            >
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                        Viendo como: {user.role}
                    </span>
                </div>
                <button
                    onClick={() => {
                        exitSimulation();
                        window.location.href = '/admin';
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                    title="Salir de la simulación"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
}
