'use client';

import { useState } from 'react';
import { Brain, Sparkles, Send, Trash2, Globe, Newspaper, RefreshCw, Layers, Zap, Search, Activity, Cpu } from 'lucide-react';

import { toast } from 'sonner';

export default function AdminNewsPage() {
    const [topic, setTopic] = useState('La convergencia de la IA y el Biohacking en 2026');
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeLogs, setActiveLogs] = useState([
        { id: 1, text: 'SinapCode Crawler iniciado...', time: '16:30:05', status: 'OK' },
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
                    <div className="flex items-center gap-2 text-[#C9A78A]">
                        <Cpu className="w-5 h-5 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">SinapCode Alpha Protocol 74</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-[#1E1E1E] italic tracking-tighter leading-none uppercase">
                        Central de <span className="text-[#C9A78A] italic">Contenido AI</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-2xl p-4 rounded-2xl border border-[#1E1E1E]/5 shadow-sm">
                    <div className="flex items-center gap-3 px-4 border-r border-[#1E1E1E]/10 text-emerald-600 font-black text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        CRAWLER ONLINE
                    </div>
                    <span className="text-[10px] text-[#1E1E1E]/40 font-black uppercase tracking-widest px-4">LATENCY: 24ms</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Generator Hub */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <div className="bg-white p-12 rounded-[3.5rem] border border-[#1E1E1E]/5 relative overflow-hidden group shadow-sm">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                            <Brain className="w-64 h-64 text-[#C9A78A]" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-[#1E1E1E] italic tracking-tighter uppercase">Laboratorio de Síntesis</h2>
                                <p className="text-sm text-[#1E1E1E]/40 font-medium italic opacity-60 uppercase tracking-tighter">
                                    SinapCode utiliza modelos Gemini 1.5 Pro para investigar tendencias y generar banners visuales dinámicos.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E1E1E]/30 ml-4 italic">Vector de Investigación (Tema)</label>
                                    <div className="p-2 bg-[#F1F0E8] border border-[#1E1E1E]/5 rounded-2xl focus-within:border-[#C9A78A] transition-all">
                                        <div className="flex items-center gap-6 px-6 py-4">
                                            <Search className="w-6 h-6 text-[#1E1E1E]/20" />
                                            <input
                                                type="text"
                                                value={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                                className="flex-1 bg-transparent font-black italic text-xl outline-none text-[#1E1E1E] placeholder:text-[#1E1E1E]/10"
                                                placeholder="¿Sobre qué debería escribir la IA hoy?"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full py-6 bg-[#1E1E1E] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 hover:bg-[#C9A78A] transition-all disabled:opacity-50 relative group overflow-hidden shadow-xl"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                                    {isGenerating ? (
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Zap className="w-5 h-5 fill-current" />
                                    )}
                                    {isGenerating ? 'SINTETIZANDO ENTIDADES...' : 'LANZAR PROTOCOLO DE CONTENIDO'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Previews or History */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#1E1E1E]/5 space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 text-[#C9A78A]">
                                <Activity className="w-5 h-5" />
                                <h3 className="text-lg font-black text-[#1E1E1E] italic tracking-tighter uppercase">Estado Global</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-[#1E1E1E]/5">
                                    <span className="text-[10px] font-black uppercase text-[#1E1E1E]/40">Próxima Rotación</span>
                                    <span className="font-mono text-xs text-[#C9A78A]">24:00:00</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-[#1E1E1E]/5">
                                    <span className="text-[10px] font-black uppercase text-[#1E1E1E]/40">Banners Activos</span>
                                    <span className="font-mono text-xs text-[#1E1E1E]">04</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[10px] font-black uppercase text-[#1E1E1E]/40">IA Accuracy</span>
                                    <span className="font-mono text-xs text-emerald-600">98.2%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1E1E1E] p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                            <div className="space-y-1 relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#F1F0E8]/40 italic">Configuración</p>
                                <h4 className="text-xl font-black text-white italic tracking-tighter">ARCHIVOS AUTO-EXPIRAN</h4>
                            </div>
                            <div className="flex items-center gap-2 mt-4 relative z-10">
                                <span className="bg-[#C9A78A] px-3 py-1 rounded text-[9px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#C9A78A]/20">3 DÍAS</span>
                                <span className="text-[9px] text-white/40 font-medium italic uppercase tracking-tighter">Protocolo Estándar</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Logs Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[3rem] border border-[#1E1E1E]/5 flex-1 relative overflow-hidden flex flex-col shadow-sm">
                        <div className="flex items-center gap-3 mb-8 text-[#C9A78A]">
                            <Layers className="w-5 h-5" />
                            <h3 className="text-xl font-black text-[#1E1E1E] italic tracking-tighter uppercase">Logs de Kernel</h3>
                        </div>

                        <div className="flex-1 space-y-6">
                            {activeLogs.map((log) => (
                                <div key={log.id} className="flex gap-4 group/log">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A78A] mt-2 animate-pulse" />
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-[9px] font-black text-[#1E1E1E]/30 uppercase tracking-widest italic">{log.time}</span>
                                            <span className={`text-[8px] font-black px-1.5 rounded ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-600' :
                                                log.status === 'PROC' ? 'bg-[#C9A78A]/10 text-[#C9A78A]' : 'text-[#1E1E1E]/20'
                                                }`}>
                                                [{log.status}]
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-[#1E1E1E] group-hover/log:text-[#C9A78A] transition-colors font-mono uppercase tracking-tighter leading-tight">
                                            {log.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-[#F1F0E8] rounded-2xl border border-[#1E1E1E]/5">
                            <p className="text-[9px] text-[#1E1E1E]/30 font-black uppercase tracking-widest mb-2 italic">Sincronización</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-[#1E1E1E] italic uppercase tracking-tighter">CMS LINKED</span>
                                <div className="h-1 w-20 bg-[#1E1E1E]/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#C9A78A] w-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

