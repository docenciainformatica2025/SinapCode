'use client';

import { Shield, Bot } from 'lucide-react';
import AgentManager from '@/components/admin/agent-manager';

export default function AdminAgentsPage() {
    return (
        <div className="space-y-10 pb-20 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Context Header */}
            <div className="flex items-center gap-2 text-neural-blue">
                <Shield className="w-5 h-5 fill-neural-blue/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gestión de Inteligencia SinapCode_</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h1 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter leading-none uppercase">
                    Gestor de <span className="text-neural-blue italic">Agentes AI_</span>
                </h1>

                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-3 text-emerald-400 font-black text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        KERNEL STABLE
                    </div>
                </div>
            </div>

            {/* Core Component */}
            <AgentManager />
        </div>
    );
}
