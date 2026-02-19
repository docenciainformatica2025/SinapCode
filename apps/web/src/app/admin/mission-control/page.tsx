'use client';

import { motion } from 'framer-motion';
import { Rocket, ShieldAlert, CheckCircle2, Search, Bell } from 'lucide-react';
import { MissionHealthMatrix } from '@/components/admin/mission-control/health-matrix';
import { UserFlowValidation } from '@/components/admin/mission-control/flow-validation';
import { LaunchTerminal } from '@/components/admin/mission-control/launch-terminal';

export default function MissionControlPage() {
    return (
        <main className="min-h-screen bg-[#0a0f0f] text-slate-100 p-6 lg:p-10 space-y-8 pb-32">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-5">
                    <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                        <Rocket className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-widest uppercase italic">
                            SinapCODE <span className="text-primary">Mission Control</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Ecosystem v2.4.0 • Auditoría Pre-Vuelo</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/5 p-2 pr-6 rounded-full border border-white/10">
                        <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-[#f2e20d]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Admin_Root</span>
                    </div>
                </div>
            </header>

            {/* Launch Sequence Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 glass-panel-nexus p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Secuencia Final de Lanzamiento</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Todos los módulos han completado las pruebas de estrés finales. El ecosistema se encuentra actualmente en estado de <span className="text-primary font-bold">"Retencion"</span> a la espera de autorización manual Go-Live.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center px-6 py-4 bg-primary/5 rounded-2xl border border-primary/20">
                                <span className="block text-primary text-3xl font-black tracking-tighter">100%</span>
                                <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest">Audit Score</span>
                            </div>
                            <div className="text-center px-6 py-4 bg-[#f2e20d]/5 rounded-2xl border border-[#f2e20d]/20">
                                <span className="block text-[#f2e20d] text-3xl font-black tracking-tighter italic">STABLE</span>
                                <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest">Ambiente</span>
                            </div>
                        </div>
                    </div>

                    <UserFlowValidation />
                </div>

                {/* Integrity Sidebar */}
                <div className="lg:col-span-4 glass-panel-nexus p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Integridad Lighthouse</h3>
                        <div className="space-y-8">
                            {[
                                { label: 'Rendimiento Core', score: 100 },
                                { label: 'Arquitectura SEO', score: 99 },
                                { label: 'Accesibilidad (WCAG)', score: 100 },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
                                            <span className="text-xs font-black text-primary">{item.score}</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-300">{item.label}</span>
                                    </div>
                                    <span className="text-[9px] text-primary font-black px-2 py-1 bg-primary/10 rounded uppercase">Pass</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Validación de Marca</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-primary shadow-lg shadow-primary/20"></div>
                            <div className="w-8 h-8 rounded bg-[#f2e20d] shadow-lg shadow-[#f2e20d]/20"></div>
                            <div className="w-8 h-8 rounded bg-slate-800"></div>
                            <div className="ml-4">
                                <span className="block text-xs font-black text-white uppercase tracking-tighter">Space Grotesk</span>
                                <span className="block text-[8px] text-primary font-black uppercase tracking-widest">Tipografía Validada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Health Matrix */}
            <div className="space-y-6">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-2">Matriz de Salud del Ecosistema</h3>
                <MissionHealthMatrix />
            </div>

            {/* Final Terminal */}
            <LaunchTerminal />
        </main>
    );
}
