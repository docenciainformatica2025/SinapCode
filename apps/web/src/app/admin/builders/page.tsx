'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter as FilterAlt,
    CheckCircle as Verified,
    ShieldCheck as WorkspacePremium,
    Code,
    Brain as Psychology,
    Cpu as Memory,
    Send,
    Folder,
    TrendingUp as Equalizer,
    Star,
    MapPin as LocationOn,
    PanelLeftOpen as MenuOpen,
    X as Close,
    Bell as Notifications,
    ChevronRight as ArrowForwardIos,
    ArrowLeftRight as CompareArrows,
    Plus
} from 'lucide-react';

// Mock Data
const BUILDERS = [
    {
        id: '1',
        name: 'Sarah Chen',
        role: 'Arquitecta de IA Agéntica',
        location: 'SF, USA',
        tier: 'ELITE',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDXx2yuv7PiTdzFqi4mS82tJhOAjgNuC9hsE4INZ829Gaxc5F5RgaHu9JpOBCbvAhMJI4URkjynFNNBcl2C6MQaFTEouTXFBRfz48TT7gjjZe5lAvEzWDzYv1lxrEicftg-z9WeBIYAzw2ucafKp9_LBTHc3w6LzcHlI6rx74ihKo_of949nq1DN2R36mzva6xpNsxqUOSvkVYg1RZshPU0prBbkIoo5Ni5uIfWbBGuk1pOhSjsEZ5sLGevp2xMJe2Xvkc0NgpvalP',
        aiInsight: 'Resuelve consistentemente puertas lógicas complejas en LangGraph. Muestra una alta persistencia (percentil 98) en sesiones de depuración. Fuerte comunicadora en comentarios de código.',
        projects: ['Legal Doc Summarizer', 'Auto-CRM Agent'],
        skills: ['LangGraph', 'Python', 'Vector DB'],
        metrics: { efficiency: 95, completion: 100, velocity: 90 }
    },
    {
        id: '2',
        name: 'John Doe',
        role: 'Esp. en Fine-tuning de LLM',
        location: 'Londres, UK',
        tier: 'ELITE',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhvkqT0YER-ZsbqkfDgiqza5Gnwc3rmwXj5E0Y2LjaFh-WZy-BFr4HF8SSE1xFvt4bxPogVhJm9pC8TYWXIOaF4BgWx58r7vQwx9iSHel88t3FDj_DHyGuQMCUhMnFV-hjhCYtIKoakKDiFhoJXvIAj9TWDbLxxIXBv9sRohz3qgLt-B1uV1migUmSXgePFP0X3tEVYdqdaKZ5QhIUU5D6PGAMeqDoKajBS-X5ZS-iP-FfVHaMwoZkYj7m2xhAOHrQTgHO42JvzbvC',
        aiInsight: 'Comprensión excepcional de la arquitectura Transformer. La velocidad de aprendizaje está en el top 5%. Se adapta rápidamente a nuevos cambios en las APIs.',
        projects: ['Medical RAG Bot'],
        skills: ['PyTorch', 'HuggingFace', 'FastAPI'],
        metrics: { efficiency: 92, completion: 98, velocity: 95 }
    },
    {
        id: '3',
        name: 'Marcus Reynolds',
        role: 'Eng. de IA Full Stack',
        location: 'Remoto',
        tier: 'ELITE',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBisXhRDfRUOoWCXkjjs_6eejTNwMzQBaXbn9cCoEZLhBR7pTsxU4NfRvMaRvxIUUDbEujIJ1D31Yy1GTda_CxDMJ-_OYderz1W8ce9e-yVM8DHiT9Y0r-uFEFY_g9_FL6gJJH9i_HI716S6mI6jaZsM8R3tou8mIAw8d1d1bo98wbeCVcTemcFfAL8j4YRUteubISrBhf6BK-vFkbAPqtmDxMkXR6VtTyQPSCDG9BAOjH5rGxmgw8ONIO6tXvDIvPSez6m56wbdeX',
        aiInsight: 'Maestría en integración de frontend con backends de IA. El código es altamente modular. Resolutor de problemas consistente bajo presión de tiempo.',
        projects: ['SaaS AI Dashboard', 'Voice Agent'],
        skills: ['React', 'OpenAI API', 'Node.js'],
        metrics: { efficiency: 88, completion: 100, velocity: 85 }
    }
];

export default function TalentMarketplace() {
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#102222] overflow-hidden">
            {/* Sidebar Filters */}
            <aside className="w-80 border-r border-[#0df2f2]/10 bg-[#0d1b1b]/50 hidden xl:flex flex-col p-8 space-y-10 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Filtros de Búsqueda_</h2>
                    <button className="text-[10px] font-black uppercase text-[#0df2f2] hover:underline">Reiniciar_</button>
                </div>

                {/* Tech Stack */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-white italic uppercase tracking-widest flex items-center gap-2">
                        <Code className="text-sm text-[#0df2f2]" />
                        Stack Tecnológico_
                    </h3>
                    <div className="space-y-3">
                        {['LangGraph', 'Python', 'RAG Systems', 'AutoGPT'].map((skill, i) => (
                            <label key={skill} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" defaultChecked={i < 2} className="rounded border-white/10 bg-white/5 text-[#0df2f2] focus:ring-[#0df2f2]" />
                                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{skill}</span>
                                <span className="ml-auto text-[10px] font-black bg-white/5 px-2 py-0.5 rounded text-slate-500 italic">
                                    {Math.floor(Math.random() * 900) + 50}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Certification Tier */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-white italic uppercase tracking-widest flex items-center gap-2">
                        <WorkspacePremium className="text-sm text-[#0df2f2]" />
                        Nivel de Certificación_
                    </h3>
                    <div className="space-y-3">
                        {['Elite (Top 1%)', 'Professional', 'Associate'].map((tier, i) => (
                            <label key={tier} className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer ${i === 0 ? 'bg-[#0df2f2]/10 border-[#0df2f2]/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                                <input type="radio" name="tier" defaultChecked={i === 0} className="text-[#0df2f2] bg-transparent border-white/20" />
                                <span className={`ml-3 text-xs font-black uppercase tracking-widest ${i === 0 ? 'text-white' : 'text-slate-500'}`}>{tier}</span>
                                {i === 0 && <div className="ml-auto w-2 h-2 rounded-full bg-[#0df2f2] shadow-[0_0_10px_rgba(13,242,242,1)]" />}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Performance Metrics */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-white italic uppercase tracking-widest flex items-center gap-2">
                        <Equalizer className="text-sm text-[#0df2f2]" />
                        Métricas de Rendimiento_
                    </h3>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Eficiencia de Código</span>
                                <span className="text-[#0df2f2]">90%+</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0df2f2] shadow-[0_0_10px_rgba(13,242,242,1)]" style={{ width: '90%' }} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Completitud de Proyectos</span>
                                <span className="text-[#0df2f2]">100%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0df2f2] shadow-[0_0_10px_rgba(13,242,242,1)]" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Internal Search / Top Bar */}
                <header className="h-20 border-b border-[#0df2f2]/10 bg-[#102222]/80 backdrop-blur-xl px-8 flex items-center justify-between z-10">
                    <div className="flex-1 max-w-2xl relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por habilidad, nombre o proyecto destacado..."
                            className="w-full bg-white/5 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-[#0df2f2] placeholder-slate-600 text-white italic font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-6 ml-10">
                        <button className="relative text-slate-500 hover:text-[#0df2f2] transition-colors">
                            <Notifications className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#0df2f2] rounded-full animate-pulse" />
                        </button>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[12px] font-black text-white italic uppercase leading-none">James Wu_</p>
                                <p className="text-[10px] text-[#0df2f2] font-black uppercase tracking-widest mt-1">Acme AI Corp_</p>
                            </div>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7BqEQ9mMoaUAss4CSB-O4kbelQXhyQe-bvrPybfUfmoujV9Y9HWHH9DQW3B44KswkEZGSluG3A-r_ilGGy7r0O49E3nyBkLBO_zpXYSCVGYGZPCw2i8yNKx9IKl_r89pb_0LNcwvVG1KeL2lr2FyzQZsqWoQezxpf4SRO9byi880xDwVHROq4iw5D7G0l4Qz4W_qe31c7ywWFL8g6uEyqm1BDNlc4YDnmxC0CEryv6GmGl-f8wdLgyRPNw-WD6gfzpvSNjdx-bQU" className="w-11 h-11 rounded-2xl border border-[#0df2f2]/30 object-cover shadow-2xl shadow-[#0df2f2]/10" alt="Recruiter" />
                        </div>
                    </div>
                </header>

                {/* Grid Results */}
                <div className="flex-1 overflow-y-auto p-10">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-1 text-shadow-sm">
                            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Elite <span className="text-[#0df2f2]">Builders_</span>
                            </h1>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                                Encontrados <span className="text-white font-black italic">{BUILDERS.length}</span> candidatos que cumplen tus estándares.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Ordenar por:</span>
                            <select className="bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white py-3 pl-4 pr-10 focus:ring-[#0df2f2] focus:border-[#0df2f2] italic">
                                <option>Relevancia</option>
                                <option>Puntaje de Habilidad</option>
                                <option>Más Reciente</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                        {BUILDERS.map((builder) => (
                            <motion.div
                                key={builder.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-8 transition-all duration-500 hover:border-[#0df2f2]/40 hover:shadow-[0_20px_60px_-15px_rgba(13,242,242,0.15)] flex flex-col"
                            >
                                {/* Top Glow Accent */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#0df2f2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Header Card */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <img src={builder.avatar} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white/10 group-hover:border-[#0df2f2]/50 transition-all duration-500" alt={builder.name} />
                                            <div className="absolute -bottom-2 -right-2 bg-[#102222] p-1 rounded-full">
                                                <Verified className="text-[#0df2f2] w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-white italic leading-none group-hover:text-[#0df2f2] transition-colors">{builder.name}_</h3>
                                            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-none">{builder.role}</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-[#0df2f2]/10 text-[#0df2f2] border border-[#0df2f2]/20 uppercase italic tracking-widest">
                                                    {builder.tier}_
                                                </span>
                                                <span className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-white/5 text-slate-500 border border-white/5 uppercase tracking-widest flex items-center gap-1">
                                                    <LocationOn className="w-2.5 h-2.5" />
                                                    {builder.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Abstract Skill Radar Simulation */}
                                    <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-[#0df2f2]/20 transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#0df2f2]/0 via-[#0df2f2]/10 to-[#0df2f2]/0 animate-pulse" />
                                        <div className="w-8 h-8 rounded-full border border-[#0df2f2]/30 flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full bg-[#0df2f2] shadow-[0_0_10px_rgba(13,242,242,0.8)]" />
                                        </div>
                                        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10 -translate-y-1/2" />
                                        <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 -translate-x-1/2" />
                                    </div>
                                </div>

                                {/* AI Note / Recruiter Insight */}
                                <div className="bg-black/40 rounded-[2rem] p-6 mb-8 border border-white/5 relative overflow-hidden group/insight transition-all hover:bg-black/60">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0df2f2]/50 shadow-[0_0_15px_rgba(13,242,242,0.5)]" />
                                    <div className="flex items-start gap-4">
                                        <Psychology className="text-[#0df2f2] mt-1 w-5 h-5" />
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                IA Recruiter Insight_
                                                <Star className="text-amber-500 animate-pulse w-2.5 h-2.5" />
                                            </h4>
                                            <p className="text-[13px] text-slate-300 leading-relaxed font-medium italic">
                                                &quot;&#123;builder.aiInsight&#125;&quot;
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Projects Section */}
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] italic">Proyectos Destacados_</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {builder.projects.map((proj) => (
                                                <button key={proj} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#0df2f2]/50 hover:bg-[#0df2f2]/5 text-slate-400 hover:text-white transition-all group/proj italic text-[11px] font-black uppercase tracking-tight">
                                                    <Folder className="group-hover/proj:text-[#0df2f2] transition-colors w-3.5 h-3.5" />
                                                    {proj}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {builder.skills.map((skill) => (
                                                <span key={skill} className="px-3 py-1 text-[10px] font-black font-mono text-[#0df2f2] bg-[#0df2f2]/10 rounded-lg border border-[#0df2f2]/20 uppercase tracking-widest">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
                                    <button className="flex-1 h-14 bg-[#0df2f2] text-[#102222] font-black italic rounded-2xl hover:bg-cyan-300 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(13,242,242,0.3)] uppercase tracking-widest text-[11px] group">
                                        Sugerir Entrevista_
                                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                    <button className="h-14 w-14 rounded-2xl border border-white/10 text-slate-500 hover:text-[#0df2f2] hover:border-[#0df2f2]/50 hover:bg-white/5 flex items-center justify-center transition-all bg-white/5" title="Ver Certificado Verificado">
                                        <WorkspacePremium className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Sticky Compare Drawer */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0d1b1b]/95 backdrop-blur-2xl border-t border-[#0df2f2]/20 z-50 transform translate-y-full transition-transform duration-500 flex justify-center" id="compare-drawer">
                <div className="max-w-[1600px] w-full px-12 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0df2f2] flex items-center gap-3 italic">
                            <CompareArrows className="w-5 h-5" />
                            Comparar_
                        </span>
                        <div className="flex -space-x-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-2xl border-2 border-[#102222] overflow-hidden shadow-2xl relative group">
                                    <img src={BUILDERS[i - 1].avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Candidate" />
                                    <div className="absolute inset-0 bg-[#0df2f2]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Close className="text-white bg-black/50 rounded-full w-4 h-4" />
                                    </div>
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-2xl border-2 border-[#0df2f2]/20 border-dashed bg-white/5 flex items-center justify-center text-slate-500 hover:text-[#0df2f2] hover:border-[#0df2f2]/50 cursor-pointer transition-all">
                                <Plus className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest italic flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            2 Candidatos Seleccionados_
                        </div>
                        <button className="px-10 py-3.5 bg-white/5 border border-white/10 text-white font-black italic rounded-2xl hover:bg-white/10 uppercase tracking-widest text-[11px] transition-all">
                            Comparativa Detallada_
                        </button>
                        <button className="px-10 py-3.5 bg-[#0df2f2] text-[#102222] font-black italic rounded-2xl shadow-[0_0_20px_rgba(13,242,242,0.4)] uppercase tracking-widest text-[11px] hover:scale-105 transition-all">
                            Mandar a Pipeline_
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
