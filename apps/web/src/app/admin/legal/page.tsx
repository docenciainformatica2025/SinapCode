'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    FileText as Article,
    Info,
    Cookie,
    Gavel,
    Lock,
    Laptop,
    Users,
    ChevronDown,
    RotateCcw,
    RotateCw,
    Bold,
    Italic,
    Underline,
    List,
    Link as LinkIcon,
    Code as CodeIcon,
    Rocket,
    CheckCircle2,
    Bell,
    RefreshCw as CloudSync,
    Filter,
    History,
    Diff,
    Monitor,
    Smartphone,
    Globe,
    Sparkles as Wand2
} from 'lucide-react';

const DOCUMENTS = [
    { id: 'privacy', title: 'Política de Privacidad', icon: Article, lastUpdated: '24 Oct, 2023', version: 'v2.1.0' },
    { id: 'tos', title: 'Términos de Servicio', icon: Gavel, lastUpdated: '12 Nov, 2023', version: 'v1.8.4' },
    { id: 'cookies', title: 'Política de Cookies', icon: Cookie, lastUpdated: '05 Ene, 2024', version: 'v1.2.0' },
    { id: 'gdpr', title: 'Anexo GDPR/LOPD', icon: Lock, lastUpdated: '15 Feb, 2024', version: 'v3.0.1' }
];

const PREVIEWS = [
    { id: 'blog', name: 'Blog de Noticias', platform: 'Escritorio', mode: 'Banner Inferior', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400' },
    { id: 'academy', name: 'Academia SinapCODE', platform: 'Tablet', mode: 'Modal Pantalla Completa', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400' }
];

const VERSIONS = [
    { id: 'v2.1.0', label: 'v2.1.0 (Borrador)', hash: '#a83f1', date: 'Ahora', author: 'James Wu', status: 'editando', description: 'Actualización de cláusulas CCPA para cumplimiento global.' },
    { id: 'v2.0.4', label: 'v2.0.4', hash: '#9b2c0', date: 'Hace 2 días', author: 'Ana López', status: 'publicado', description: 'Corrección de erratas menores en la sección 3.2.' },
    { id: 'v2.0.0', label: 'v2.0.0', hash: '#1f8a2', date: '12 Oct', author: 'Admin Master', status: 'archivado', description: 'Reescritura completa por actualización GDPR 2023.' }
];

export default function LegalComplianceHub() {
    const [activeDoc, setActiveDoc] = useState('privacy');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-[#101622] text-slate-300 font-sans overflow-hidden">
            {/* Header Superior */}
            <header className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#161e2e]/80 backdrop-blur-md flex items-center justify-between px-6 z-30">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#135bec]">
                        <Shield className="w-6 h-6" />
                        <span className="font-black text-lg tracking-tighter text-white uppercase italic">SinapCODE <span className="font-light opacity-50">Legal Hub_</span></span>
                    </div>
                    <div className="h-6 w-px bg-white/10 mx-2" />
                    <nav className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">Documentos</span>
                        <span className="text-slate-700">/</span>
                        <button className="flex items-center gap-1 text-white hover:bg-white/5 px-2 py-1 rounded transition-colors italic">
                            {DOCUMENTS.find(d => d.id === activeDoc)?.title}
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <a href="/admin/legal/monitor" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 text-[10px] font-black uppercase italic tracking-tighter hover:text-white transition-all border border-white/5">
                        <Globe className="w-3.5 h-3.5" />
                        Monitor Global_
                    </a>
                    <a href="/admin/legal/architect" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#135bec]/10 text-[#135bec] text-[10px] font-black uppercase italic tracking-tighter hover:bg-[#135bec]/20 transition-all border border-[#135bec]/20">
                        <Wand2 className="w-3.5 h-3.5" />
                        Arquitecto IA_
                    </a>
                    <a href="/admin/legal/audit" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 text-[10px] font-black uppercase italic tracking-tighter hover:text-white transition-all border border-white/5">
                        <Diff className="w-3.5 h-3.5" />
                        Auditoría Técnica_
                    </a>
                </div>

                <div className="flex items-center gap-6">
                    {/* Compliance Score */}
                    <div className="flex items-center gap-3 bg-white/5 pr-4 pl-3 py-1.5 rounded-2xl border border-white/5">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" className="text-slate-800" stroke="currentColor" strokeWidth="2.5" />
                                <circle cx="18" cy="18" r="16" fill="none" className="text-emerald-500" stroke="currentColor" strokeWidth="2.5" strokeDasharray="94, 100" strokeLinecap="round" />
                            </svg>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 absolute" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-wider font-black text-slate-500 leading-none">Salud Global</span>
                            <span className="text-[11px] font-black text-white italic">94% Cumplimiento</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center gap-4">
                        <div className="relative cursor-pointer group">
                            <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#135bec] rounded-full border-2 border-[#101622]" />
                        </div>
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqJrrGUzP0WmIKgN0YN4Rvc7B8fZ1OjOky39K-rinoA108wssbVyvvpm9EKKMJm5ZJgU8jOROrgixDTjedbIYd_C6wFKqfipaNnfVpeDJiKyBNf334EkakXyyvmB9e8bsn_pscFW2RE0yIWcZJnKK9Huz8R-ZEKfZN-QZCq7wHOqqunbJE45O-76nZYNHpdxFZfI9ZVIwOY-bb9TZ7aa2RNXZ2UfvOx0YR446EWBBc-LPH5DSY-_j3UFjbsJKzO2e7uxwuSk1GRPX5"
                            className="w-9 h-9 rounded-2xl border border-white/10 object-cover"
                            alt="Admin"
                        />
                    </div>
                </div>
            </header>

            {/* Layout Principal */}
            <main className="flex-1 flex pt-16 overflow-hidden">
                {/* Sidebar Izquierda: Navegación + Sandbox */}
                <aside className="w-64 border-r border-white/5 bg-[#0d131f]/50 flex flex-col shrink-0">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 italic">Estructura Legal_</h3>
                        <ul className="space-y-2">
                            {DOCUMENTS.map(doc => (
                                <li key={doc.id}>
                                    <button
                                        onClick={() => setActiveDoc(doc.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs rounded-xl transition-all font-black uppercase tracking-tight italic ${activeDoc === doc.id ? 'bg-[#135bec]/10 text-[#135bec] border-l-4 border-[#135bec]' : 'text-slate-500 hover:bg-white/5'}`}
                                    >
                                        <doc.icon className="w-4 h-4" />
                                        {doc.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Legal Sandbox_</h3>
                                <span className="text-[8px] bg-[#135bec]/20 text-[#135bec] px-2 py-0.5 rounded-full font-black">BETA</span>
                            </div>

                            <div className="space-y-4">
                                {PREVIEWS.map(item => (
                                    <div key={item.id} className="group relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 hover:border-[#135bec]/50 transition-all cursor-pointer shadow-2xl">
                                        <img src={item.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500" alt={item.name} />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                            <Monitor className="w-6 h-6 text-white mb-2 opacity-80" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{item.name}</span>
                                        </div>
                                        <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-3 border-t border-white/5">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter italic">{item.mode}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-4 border border-dashed border-white/10 text-slate-600 hover:text-[#135bec] hover:border-[#135bec]/40 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic">
                                + Añadir Entorno_
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Área Central: Editor */}
                <section className="flex-1 flex flex-col min-w-0 bg-[#101622] relative">
                    {/* Barra de Herramientas Editor */}
                    <div className="h-12 border-b border-white/5 bg-[#161e2e]/40 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><RotateCcw className="w-4 h-4" /></button>
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><RotateCw className="w-4 h-4" /></button>
                            <div className="w-px h-4 bg-white/10 mx-2" />
                            <button className="p-1.5 text-white bg-[#135bec] rounded-lg shadow-[0_0_15px_rgba(19,91,236,0.3)]"><Bold className="w-4 h-4" /></button>
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><Italic className="w-4 h-4" /></button>
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><Underline className="w-4 h-4" /></button>
                            <div className="w-px h-4 bg-white/10 mx-2" />
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><List className="w-4 h-4" /></button>
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><LinkIcon className="w-4 h-4" /></button>
                            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><CodeIcon className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-slate-500 italic flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Auto-guardado hace 2m
                            </span>
                            <button className="bg-[#135bec] hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-xl shadow-[0_10px_30px_rgba(19,91,236,0.3)] flex items-center gap-2 transition-all italic hover:scale-105">
                                <Rocket className="w-3.5 h-3.5" />
                                Desplegar Cambios_
                            </button>
                        </div>
                    </div>

                    {/* Contenido del Editor */}
                    <div className="flex-1 overflow-y-auto p-12 lg:px-24">
                        <div className="max-w-4xl mx-auto bg-[#161e2e]/30 backdrop-blur-xl min-h-[1000px] rounded-[3rem] p-12 lg:p-20 border border-white/5 shadow-inner">
                            <h1 className="text-4xl font-black text-white italic tracking-tighter mb-4 uppercase">
                                {DOCUMENTS.find(d => d.id === activeDoc)?.title}_
                            </h1>
                            <p className="text-[10px] font-black text-slate-500 mb-12 uppercase tracking-[0.3em] italic">Última Actualización: {DOCUMENTS.find(d => d.id === activeDoc)?.lastUpdated}</p>

                            <div className="space-y-10 text-slate-400 leading-relaxed font-medium italic text-sm">
                                <section>
                                    <h2 className="text-lg font-black text-white italic uppercase tracking-widest mb-4 flex items-center gap-3">
                                        <div className="w-2 h-8 bg-[#135bec] rounded-full" />
                                        1. Introducción_
                                    </h2>
                                    <p className="mb-6">
                                        Bienvenido a SinapCODE. Respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web (independientemente de dónde lo visite) y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
                                    </p>
                                    <div className="bg-[#135bec]/10 border-l-4 border-[#135bec] p-6 rounded-2xl shadow-xl overflow-hidden relative group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                            <Info className="w-16 h-16 text-[#135bec]" />
                                        </div>
                                        <span className="font-black text-[#135bec] block mb-2 text-[9px] uppercase tracking-[0.3em]">Nota del Editor_</span>
                                        <p className="text-slate-300 text-xs">
                                            Esta sección fue actualizada recientemente para alinearse con los requisitos de la CCPA. Por favor, revise las cláusulas resaltadas a continuación.
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-black text-white italic uppercase tracking-widest mb-4 flex items-center gap-3">
                                        <div className="w-2 h-8 bg-[#135bec] rounded-full" />
                                        2. Datos que Recopilamos_
                                    </h2>
                                    <p className="mb-6">
                                        Los datos personales, o información personal, significan cualquier información sobre un individuo a partir de la cual se pueda identificar a esa persona. No incluye datos donde se haya eliminado la identidad (datos anónimos).
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            { label: 'Datos de Identidad', desc: 'Incluye nombre, apellido, nombre de usuario o identificador similar.' },
                                            { label: 'Datos de Contacto', desc: 'Incluye dirección de facturación, correo electrónico y números de teléfono.' },
                                            { label: 'Datos Técnicos', desc: 'Incluye dirección IP, datos de inicio de sesión, tipo de navegador y versión.' }
                                        ].map(item => (
                                            <li key={item.label} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#135bec] mt-2 shrink-0" />
                                                <div className="text-xs">
                                                    <strong className="text-white block mb-1 uppercase tracking-wider">{item.label}</strong>
                                                    <span className="text-slate-500 font-bold">{item.desc}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Drawer de Despliegue Flotante */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-[#161e2e] border border-white/10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-5 flex items-center justify-between gap-6 backdrop-blur-3xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-[#135bec]/20 p-3 rounded-2xl relative">
                                    <CloudSync className="w-6 h-6 text-[#135bec]" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#161e2e]" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-black text-white italic uppercase tracking-tighter">¿Desplegar v2.1.0?_</p>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">3 aplicaciones en espera de sincronización</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-4 bg-black/40 p-2 rounded-xl border border-white/5">
                                    {['BL', 'AC', 'MP'].map(tag => (
                                        <div key={tag} className="w-8 h-8 rounded-lg bg-[#0d131f] border border-white/10 flex items-center justify-center text-[10px] font-black text-[#135bec] tracking-tighter" title={tag}>{tag}</div>
                                    ))}
                                </div>
                                <button className="bg-white text-black hover:bg-slate-200 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-xl shadow-white/5 transition-all italic">
                                    Sincronizar Ya_
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Sidebar Derecha: Historial de Versiones */}
                <aside className="w-80 border-l border-white/5 bg-[#0d131f]/50 flex flex-col shrink-0">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-xs font-black text-white italic uppercase tracking-widest">Historial v_</h3>
                        <button className="text-[#135bec] hover:bg-[#135bec]/10 p-2 rounded-xl transition-all">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto relative py-8 px-6">
                        {/* Línea de Línea de Tiempo */}
                        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-white/5" />

                        <div className="space-y-10">
                            {VERSIONS.map((v, i) => (
                                <div key={v.id} className="relative z-10 group cursor-pointer pl-10">
                                    <div className={`absolute left-[-5px] top-2 w-4 h-4 rounded-full border-4 border-[#0d131f] transition-all group-hover:scale-125 ${v.status === 'editando' ? 'bg-[#135bec] shadow-[0_0_10px_rgba(19,91,236,1)]' : 'bg-slate-700'}`} />

                                    <div className={`p-5 rounded-2xl border transition-all ${v.status === 'editando' ? 'bg-[#135bec]/5 border-[#135bec]/30' : 'bg-transparent border-white/5 group-hover:bg-white/5 group-hover:border-white/10'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[11px] font-black italic uppercase ${v.status === 'editando' ? 'text-[#135bec]' : 'text-slate-400 font-bold'}`}>{v.label}_</span>
                                            <span className="text-[9px] text-slate-600 font-mono bg-white/5 px-2 py-0.5 rounded italic">{v.hash}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-medium italic mb-4 leading-relaxed tracking-tight line-clamp-2">"{v.description}"</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-lg bg-indigo-500 flex items-center justify-center text-[8px] font-black text-white italic">{v.author.split(' ').map(n => n[0]).join('')}</div>
                                                <span className="text-[9px] text-slate-600 font-bold uppercase">{v.date}</span>
                                            </div>
                                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full italic ${v.status === 'editando' ? 'text-amber-500 bg-amber-500/10' :
                                                v.status === 'publicado' ? 'text-emerald-500 bg-emerald-500/10' :
                                                    'text-slate-600 bg-white/5'
                                                }`}>
                                                {v.status === 'editando' ? 'Editando_' : v.status === 'publicado' ? 'Publicado_' : 'Archivado_'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5 bg-black/20">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 italic">Comparar Versiones_</h4>
                        <div className="flex gap-2 mb-4">
                            <select className="flex-1 bg-white/5 border border-white/10 text-[10px] font-black italic rounded-xl p-3 text-slate-300 focus:ring-[#135bec] outline-none">
                                <option>v2.1.0 (Draft)</option>
                            </select>
                            <span className="text-slate-600 self-center text-xs font-black italic">vs</span>
                            <select className="flex-1 bg-white/5 border border-white/10 text-[10px] font-black italic rounded-xl p-3 text-slate-300 focus:ring-[#135bec] outline-none">
                                <option>v2.0.4</option>
                            </select>
                        </div>
                        <button className="w-full bg-white/5 border border-white/10 text-white hover:text-[#135bec] hover:border-[#135bec]/40 text-[10px] font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2 italic">
                            <Diff className="w-4 h-4" />
                            Mostrar Diferencias_
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
