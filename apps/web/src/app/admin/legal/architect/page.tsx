'use client';

import { useState, useEffect } from 'react';
import {
    Shield,
    Wand2,
    RefreshCw,
    History,
    Save,
    Globe,
    AlertTriangle,
    CheckCircle2,
    Info,
    Scale,
    Gavel,
    Cpu,
    ArrowRight,
    Zap,
    Lock
} from 'lucide-react';

const ALERT = {
    title: "Ley de IA de la UE: Actualización del Artículo 50",
    desc: "Se han ratificado nuevas obligaciones de transparencia para los modelos de IA de propósito general. Los proveedores deben garantizar que el contenido generado por IA sea detectable y marcado en un formato legible por máquina.",
    severity: "Alta Prioridad",
    source: "Regulación 2024/1689 EU",
    impact: ["Chatbot Interface", "Content Factory", "Email Templates"]
};

export default function AIClauseArchitect() {
    const [mounted, setMounted] = useState(false);
    const [tone, setTone] = useState('proteccionista');
    const [isGenerating, setIsGenerating] = useState(false);
    const [draft, setDraft] = useState('');
    const [score, setScore] = useState(0);

    const fullDraft = `4.2 Divulgación de Transparencia de Inteligencia Artificial

El Usuario reconoce y acepta que ciertas interacciones dentro de la Plataforma, incluyendo específicamente el chatbot "SinapAssistant" y las funciones de revisión automatizada de documentos, son facilitadas por sistemas de Inteligencia Artificial Generativa.

En cumplimiento con el Artículo 50 de la Ley de IA de la UE, la Compañía informa por la presente que toda la producción generada durante estas interacciones es de naturaleza sintética. El Usuario no debe confiar únicamente en dicha producción para decisiones legales críticas sin verificación humana. Al continuar utilizando estas funciones, el Usuario consiente el procesamiento de sus datos por parte de dichos modelos bajo los estándares de seguridad AES-256 de SinapCODE...`;

    useEffect(() => {
        setMounted(true);
        simulateGeneration();
    }, []);

    const simulateGeneration = () => {
        setIsGenerating(true);
        setDraft('');
        let i = 0;
        const interval = setInterval(() => {
            setDraft(fullDraft.slice(0, i));
            i += 5;
            if (i > fullDraft.length) {
                clearInterval(interval);
                setIsGenerating(false);
                setScore(92);
            }
        }, 10);
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden italic-none">
            {/* Header / Nav */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#101622]/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#135bec]">
                        <Gavel className="w-8 h-8" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            SinapCODE <span className="text-slate-500 font-light text-sm">| ARQUITECTO_IA_</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-4 border-r border-white/5">
                        <div className="text-right leading-none">
                            <div className="text-xs font-black text-white italic">Sarah Jenkins</div>
                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">Chief Legal Officer</div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-[#135bec]/20 border border-[#135bec]/30 flex items-center justify-center text-[#135bec]">
                            <Shield className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex pt-16 overflow-hidden">
                {/* Panel Izquierdo: Contexto Legislativo */}
                <aside className="w-[450px] border-r border-white/5 bg-[#161d2b]/50 backdrop-blur-sm flex flex-col p-6 overflow-y-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                            <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">Alerta Regulatoria Crítica_</h3>
                        </div>

                        <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Scale className="w-16 h-16" />
                            </div>
                            <h2 className="text-lg font-black text-white italic leading-tight mb-3 uppercase tracking-tighter">{ALERT.title}</h2>
                            <p className="text-xs text-slate-400 italic leading-relaxed mb-6 font-medium">
                                {ALERT.desc}
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#101622] rounded-2xl p-3 border border-white/5">
                                    <div className="text-[9px] text-slate-500 font-black uppercase italic mb-1 uppercase tracking-widest">Fuente</div>
                                    <div className="text-[10px] text-white font-bold italic">{ALERT.source}</div>
                                </div>
                                <div className="bg-[#101622] rounded-2xl p-3 border border-white/5">
                                    <div className="text-[9px] text-slate-500 font-black uppercase italic mb-1 uppercase tracking-widest">Deadline</div>
                                    <div className="text-[10px] text-rose-400 font-black italic tracking-widest">48 Horas_</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Módulos Afectados_</h3>
                        <div className="space-y-3">
                            {ALERT.impact.map(mod => (
                                <div key={mod} className="flex items-center justify-between p-4 rounded-2xl bg-[#101622] border border-white/5 hover:border-[#135bec]/30 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <Cpu className="w-4 h-4 text-slate-500 group-hover:text-[#135bec]" />
                                        <span className="text-xs font-black text-slate-400 group-hover:text-white italic">{mod}</span>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-[#135bec]/5 rounded-3xl border border-[#135bec]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-5 h-5 text-[#135bec]" />
                            <h4 className="text-xs font-black text-white italic uppercase tracking-tighter">Sugerencia de la IA_</h4>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed italic font-medium">
                            Se recomienda una cláusula de tipo <span className="text-[#135bec] font-black uppercase">Proteccionista</span> para mitigar el riesgo de responsabilidad por IA Alucinatoria.
                        </p>
                    </div>
                </aside>

                {/* Panel Central: Generador */}
                <section className="flex-1 bg-[#101622] flex flex-col relative overflow-hidden">
                    {/* Barra de Herramientas Generador */}
                    <div className="h-16 border-b border-white/5 bg-[#161d2b]/20 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Ajustes Generador:</span>
                            <div className="flex bg-[#101622] p-1 rounded-xl border border-white/10">
                                {['Formal', 'Proteccionista', 'User-Friendly'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => { setTone(t.toLowerCase()); simulateGeneration(); }}
                                        className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase italic tracking-widest transition-all ${tone === t.toLowerCase() ? 'bg-[#135bec] text-white shadow-[0_0_15px_rgba(19,91,236,0.5)]' : 'text-slate-500 hover:text-white'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-500 hover:text-[#135bec] transition-all"><History className="w-5 h-5" /></button>
                            <button className="p-2 text-slate-500 hover:text-[#135bec] transition-all"><Save className="w-5 h-5" /></button>
                        </div>
                    </div>

                    {/* Editor de IA */}
                    <div className="flex-1 p-12 overflow-y-auto relative">
                        <div className="max-w-4xl mx-auto flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-1">
                                    <div className="w-1 h-3 bg-[#135bec]/40 animate-pulse"></div>
                                    <div className="w-1 h-3 bg-[#135bec]/70 animate-pulse delay-75"></div>
                                    <div className="w-1 h-3 bg-[#135bec] animate-pulse delay-150"></div>
                                </div>
                                <span className="text-[10px] font-black text-[#135bec] uppercase tracking-[0.2em] italic">SinapAI Redactando Cláusula v3.5_</span>
                            </div>

                            <div className="flex-1 bg-[#161d2b]/30 rounded-[2.5rem] border border-white/5 p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#135bec] to-transparent opacity-20 group-hover:opacity-100 transition-opacity"></div>

                                <div className="font-serif text-lg leading-loose text-slate-300 italic-none whitespace-pre-wrap outline-none">
                                    {draft}
                                    {isGenerating && <span className="inline-block w-2 h-6 bg-[#135bec] ml-1 animate-pulse"></span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer de Acciones & Score */}
                    <div className="h-28 bg-[#161d2b]/80 backdrop-blur-3xl border-t border-white/5 px-8 flex items-center justify-between gap-12 z-20">
                        <div className="flex items-center gap-8">
                            {/* Score Gauge */}
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="45" fill="none"
                                        stroke={score > 90 ? "#10b981" : "#135bec"}
                                        strokeWidth="8"
                                        strokeDasharray={`${score * 2.82} 282`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                        style={{ filter: "drop-shadow(0 0 5px rgba(19,91,236,0.5))" }}
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-sm font-black text-white italic tracking-tighter">{score}%</span>
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic mb-1 uppercase">Nivel de Protección_</div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xl font-black italic tracking-tighter ${score > 90 ? 'text-emerald-400' : 'text-white'}`}>Blidaje de Grado-A</span>
                                    <Lock className="w-4 h-4 text-emerald-500/50" />
                                </div>
                                <div className="text-[9px] text-slate-600 font-bold uppercase mt-1 italic italic-none">Verificado contra bases EU Database v4.2</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={simulateGeneration}
                                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-black uppercase text-white transition-all italic tracking-widest"
                            >
                                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                                Regenerar_
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#135bec] hover:bg-blue-600 text-[11px] font-black uppercase text-white transition-all shadow-xl shadow-blue-900/30 italic tracking-widest group">
                                <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                                Aplicar y Sincronizar Global_
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
