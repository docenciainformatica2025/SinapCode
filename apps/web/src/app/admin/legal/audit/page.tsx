'use client';

import { useState } from 'react';
import {
    Gavel,
    ChevronRight,
    Search,
    Filter,
    History,
    Verified,
    Fingerprint,
    ArrowRight,
    Download,
    Eye,
    EyeOff,
    RotateCcw
} from 'lucide-react';

const VERSIONS = [
    { id: 'v2.4.1', label: 'v2.4.1', title: 'Actualización Cláusula Indemnización', author: 'Sarah J.', date: '24 Oct, 14:00', status: 'current', hash: '8f4b...3a2c' },
    { id: 'v2.4.0', label: 'v2.4.0', title: 'Cumplimiento GDPR 2023', author: 'Equipo Legal', date: '10 Sep, 09:30', status: 'published', hash: '9b2c...1f8a' },
    { id: 'v2.3.9', label: 'v2.3.9', title: 'Revisión Políticas Q3', author: 'Mike R.', date: '15 Ago, 11:20', status: 'archived', hash: '5d4e...a1b2' }
];

export default function LegalAuditPage() {
    const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden">
            {/* Barra lateral: Historial de Versiones */}
            <aside className="w-80 border-r border-white/5 bg-[#161d2b] flex flex-col shrink-0">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="font-black text-xs uppercase tracking-widest text-white italic">Historial de Versiones_</h2>
                    <button className="p-1.5 rounded hover:bg-white/5 text-slate-500 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 relative space-y-6">
                    <div className="absolute left-[27px] top-6 bottom-6 w-px bg-white/5"></div>

                    {VERSIONS.map((v) => (
                        <div key={v.id} className="relative pl-8 group cursor-pointer">
                            <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 ${v.status === 'current' ? 'border-[#135bec] bg-[#135bec] shadow-[0_0_10px_rgba(19,91,236,0.5)]' : 'border-slate-600 bg-[#161d2b]'} z-10 transition-all group-hover:scale-110`}></div>
                            <div className={`p-4 rounded-2xl border transition-all ${v.status === 'current' ? 'bg-[#135bec]/5 border-[#135bec]/30' : 'bg-[#1c2433] border-white/5 hover:border-white/10'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`font-black text-[11px] italic uppercase ${v.status === 'current' ? 'text-[#135bec]' : 'text-slate-400'}`}>{v.id}_</span>
                                    {v.status === 'current' && <span className="text-[8px] bg-[#135bec] text-white px-1.5 py-0.5 rounded font-black italic">ACTUAL</span>}
                                </div>
                                <p className="text-[11px] text-white font-black italic mb-2 tracking-tight line-clamp-1">"{v.title}"</p>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                                    <div className="w-5 h-5 rounded-lg bg-indigo-500 flex items-center justify-center text-[8px] font-black text-white italic">{v.author.charAt(0)}</div>
                                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{v.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Área de Trabajo: Diff Viewer */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#101622]">
                {/* Herramientas Superiores */}
                <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-[#161d2b] shrink-0 z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-slate-500 uppercase italic">Comparando</span>
                            <span className="text-sm font-black text-white italic">v2.4.0</span>
                            <ArrowRight className="w-4 h-4 text-slate-600" />
                            <span className="text-sm font-black text-[#135bec] italic tracking-tighter">v2.4.1</span>
                        </div>

                        <div className="flex bg-[#1c2433] p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setViewMode('split')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic ${viewMode === 'split' ? 'bg-[#135bec] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                            >
                                Lado a Lado_
                            </button>
                            <button
                                onClick={() => setViewMode('unified')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic ${viewMode === 'unified' ? 'bg-[#135bec] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                            >
                                Unificado_
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-4 text-[10px] font-black italic mr-4">
                            <span className="flex items-center gap-2 text-rose-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 2 Eliminaciones
                            </span>
                            <div className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" /> 5 Adiciones
                            </span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all italic">
                            <RotateCcw className="w-3.5 h-3.5" /> Revertir_
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#135bec] hover:bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest shadow-[0_10px_25px_rgba(19,91,236,0.3)] transition-all italic hover:scale-105">
                            <Verified className="w-4 h-4" /> Descargar Pack Auditoría_
                        </button>
                    </div>
                </div>

                {/* Contenido del Diff */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Tarjeta de Metadatos Certificados */}
                        <div className="bg-[#161d2b]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-wrap gap-8 items-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Verified className="w-24 h-24 text-[#135bec]" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-[#135bec]/10 text-[#135bec] shadow-inner">
                                    <Fingerprint className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black italic leading-none">Hash del Documento (SHA-256)_</p>
                                    <p className="font-mono text-[11px] text-[#135bec] font-bold select-all leading-relaxed">8f4b...3a2c9e7d4f1b2a3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-white/5 hidden xl:block" />

                            <div className="space-y-1">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black italic leading-none">Sello de Tiempo Certificado_</p>
                                <p className="text-xs text-white font-black italic">24 Oct 2023, 14:00:23 UTC</p>
                            </div>

                            <div className="h-10 w-px bg-white/5 hidden xl:block" />

                            <div className="space-y-1">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black italic leading-none">Firmante Autorizado_</p>
                                <p className="text-xs text-white font-black italic">Sarah Jenkins (Compliance Lead)</p>
                            </div>
                        </div>

                        {/* Comparación de Cláusulas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Cabeceras de Columna */}
                            <div className="lg:block hidden">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 pl-4 italic">Versión v2.4.0 (Anterior)_</h3>
                                <div className="bg-[#161d2b] border border-white/5 rounded-[2.5rem] p-8 min-h-[400px] shadow-2xl text-slate-400 text-sm leading-relaxed font-medium italic">
                                    <h4 className="text-white font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-slate-600 rounded-full" />
                                        5. Limitación de Responsabilidad_
                                    </h4>
                                    <p className="mb-6">
                                        En la medida máxima permitida por la ley aplicable, SinapCODE no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo...
                                    </p>
                                    <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/20 relative">
                                        <span className="absolute -top-3 left-6 text-[8px] bg-rose-500 text-white px-2 py-0.5 rounded italic font-black">ELIMINADO</span>
                                        <p className="line-through opacity-50">
                                            En ningún caso la responsabilidad agregada de SinapCODE por todas las reclamaciones relacionadas con los servicios superará los cien dólares estadounidenses ($100.00).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135bec] mb-4 pl-4 italic">Versión v2.4.1 (Actual)_</h3>
                                <div className="bg-[#161d2b] border border-[#135bec]/20 rounded-[2.5rem] p-8 min-h-[400px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] text-slate-300 text-sm leading-relaxed font-medium italic relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#135bec] shadow-[2px_0_10px_rgba(19,91,236,0.3)]" />

                                    <h4 className="text-white font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-[#135bec] rounded-full" />
                                        5. Limitación de Responsabilidad_
                                    </h4>
                                    <p className="mb-6">
                                        En la medida máxima permitida por la ley aplicable, SinapCODE <span className="bg-emerald-500/20 text-emerald-400 px-1 rounded shadow-inner font-black">y sus afiliados, funcionarios y empleados</span> no serán responsables de ningún daño indirecto...
                                    </p>
                                    <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 relative">
                                        <span className="absolute -top-3 left-6 text-[8px] bg-emerald-500 text-white px-2 py-0.5 rounded italic font-black">NUEVA CLÁUSULA</span>
                                        <p>
                                            En ningún caso la responsabilidad de <span className="text-emerald-400 font-bold">las Entidades de SinapCODE</span> superará el mayor de cien dólares ($100.00) o los montos pagados en los últimos <span className="text-emerald-400 font-bold">doce (12) meses</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Indicador de Secciones Sin Cambios */}
                        <div className="flex items-center justify-center py-6">
                            <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/5">
                                <div className="w-px h-4 bg-white/10" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">8 Secciones sin cambios detectados_</span>
                                <div className="w-px h-4 bg-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
