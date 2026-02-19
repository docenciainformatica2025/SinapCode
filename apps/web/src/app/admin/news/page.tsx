'use client';

import { useState } from 'react';
import { Brain, Sparkles, Send, Trash2, Globe, Newspaper, RefreshCw, Layers, Zap, Search, Activity, Cpu } from 'lucide-react';

import { toast } from 'sonner';

export default function AdminNewsPage() {
    const [topic, setTopic] = useState('La convergencia de la IA y el Biohacking en 2026');
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeLogs, setActiveLogs] = useState([
        { id: 1, text: 'Nexus Crawler iniciado...', time: '16:30:05', status: 'OK' },
        { id: 2, text: 'Identificando tendencias en hilos de Reddit/Tech...', time: '16:30:12', status: 'OK' },
        { id: 3, text: 'Sintetizando narrativa Nanobanana...', time: '16:30:45', status: 'OK' },
    ]);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setActiveLogs(prev => [{ id: Date.now(), text: `Analizando: "${topic}"...`, time: new Date().toLocaleTimeString(), status: 'PROC' }, ...prev]);

        try {
            const res = await fetch('/api/admin/news/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });

            if (res.ok) {
                toast.success('Protocolo completado: Noticia publicada');
                setActiveLogs(prev => [{ id: Date.now(), text: 'Despliegue exitoso en Home Hero', time: new Date().toLocaleTimeString(), status: 'SUCCESS' }, ...prev]);
            } else {
                try {
                    const data = await res.json();
                    toast.error(`Falla: ${data.details || 'Síntesis neuronal fallida'}`);
                } catch (e) {
                    toast.error('Falla crítica en el servidor');
                }
            }
        } catch (error) {
            toast.error('Error de enlace satelital');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-10 pb-20 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: Command Center */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-neural-blue">
                        <Cpu className="w-5 h-5 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">NEXUS Alpha_ Protocol 74</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter leading-none uppercase">
                        Central de <span className="text-neural-blue italic">Contenido AI_</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl p-4 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-3 px-4 border-r border-white/10 text-emerald-400 font-black text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        CRAWLER ONLINE
                    </div>
                    <span className="text-[10px] text-platinum-dim font-black uppercase tracking-widest px-4">LATENCY: 24ms</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Generator Hub */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <div className="bg-gradient-to-br from-white/10 to-transparent p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                            <Brain className="w-64 h-64 text-neural-blue" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Laboratorio de Síntesis_</h2>
                                <p className="text-sm text-platinum-dim font-medium italic opacity-60">
                                    NEXUS utiliza modelos Gemini 1.5 Pro para investigar tendencias y generar banners visuales dinámicos.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Vector de Investigación (Tema)</label>
                                    <div className="p-2 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-3xl focus-within:border-neural-blue transition-all">
                                        <div className="flex items-center gap-6 px-6 py-4">
                                            <Search className="w-6 h-6 text-platinum-dim" />
                                            <input
                                                type="text"
                                                value={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                                className="flex-1 bg-transparent font-black italic text-xl outline-none text-white placeholder:text-white/10"
                                                placeholder="¿Sobre qué debería escribir la IA hoy?"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full py-6 bg-neural-blue text-white rounded-2xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 hover:shadow-[0_0_50px_rgba(25,127,230,0.4)] transition-all disabled:opacity-50 relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                                    {isGenerating ? (
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Zap className="w-5 h-5 fill-current" />
                                    )}
                                    {isGenerating ? 'SINTETIZANDO ENTIDADES...' : 'LANZAR PROTOCOLO DE CONTENIDO_'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Previews or History */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-4k p-8 rounded-[2.5rem] border border-white/5 space-y-4">
                            <div className="flex items-center gap-3 text-secondary">
                                <Activity className="w-5 h-5" />
                                <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">Estado Global_</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-[10px] font-black uppercase text-platinum-dim">Próxima Rotación</span>
                                    <span className="font-mono text-xs text-neural-blue">24:00:00</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-[10px] font-black uppercase text-platinum-dim">Banners Activos</span>
                                    <span className="font-mono text-xs text-white">04</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[10px] font-black uppercase text-platinum-dim">IA Accuracy</span>
                                    <span className="font-mono text-xs text-emerald-400">98.2%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neural-blue p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Configuración</p>
                                <h4 className="text-xl font-black text-white italic">ARCHIVOS AUTO-EXPIRAN_</h4>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="bg-white/20 px-3 py-1 rounded text-[9px] font-black text-white uppercase tracking-widest">3 DÍAS</span>
                                <span className="text-[9px] text-white/60 font-medium italic">Protocolo Estándar</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Logs Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="glass-4k p-10 rounded-[3rem] border border-white/5 flex-1 relative overflow-hidden flex flex-col">
                        <div className="flex items-center gap-3 mb-8 text-neural-blue">
                            <Layers className="w-5 h-5" />
                            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Logs de Kernel_</h3>
                        </div>

                        <div className="flex-1 space-y-6">
                            {activeLogs.map((log) => (
                                <div key={log.id} className="flex gap-4 group/log">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neural-blue mt-2 animate-pulse" />
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-[9px] font-black text-platinum-dim uppercase tracking-widest">{log.time}</span>
                                            <span className={`text-[8px] font-black px-1.5 rounded ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' :
                                                log.status === 'PROC' ? 'bg-blue-500/10 text-blue-400' : 'text-platinum-dim opacity-40'
                                                }`}>
                                                [{log.status}]
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-white group-hover/log:text-neural-blue transition-colors font-mono uppercase">
                                            {log.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-black/40 rounded-2xl border border-white/5">
                            <p className="text-[9px] text-platinum-dim font-black uppercase tracking-widest mb-2">Sincronización</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-white italic">CMS LINKED_</span>
                                <div className="h-1 w-20 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-neural-blue w-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

