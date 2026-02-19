'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic,
    MicOff,
    PhoneOff,
    VideoOff,
    Download,
    Bot,
    User,
    Code,
    Brush,
    FileText,
    Play,
    Copy,
    Edit2,
    Brain,
    UserPlus,
    Briefcase,
    ChevronDown,
    Database,
    Radio,
    History,
    ChevronRight
} from 'lucide-react';

// AI Voice Mentor Page
export default function AIVoiceMentorPage() {
    const [isListening, setIsListening] = useState(true);
    const [persona, setPersona] = useState('Tech Guru');
    const [showPersonaMenu, setShowPersonaMenu] = useState(false);
    const [activeTab, setActiveTab] = useState('code');

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#101022] text-slate-100 font-sans selection:bg-[#0d0df2] selection:text-white">
            {/* Top Stats Bar */}
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Sesión: 24:12</span>
                    </div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-[#0d0df2] opacity-70">
                        Protocolo: NEXUS_VOICE_v2.1_
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Sincronización en Vivo</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                </div>
            </div>

            {/* Main Content Grid */}
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-hidden relative">
                {/* Ambient Background Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0d0df2]/10 rounded-full blur-[128px] pointer-events-none -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[128px] pointer-events-none -z-10"></div>

                {/* Left Column: Transcript & AI Core */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
                    {/* AI Visualizer Card */}
                    <div className="bg-[#16162c]/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl group">
                        <div className="absolute top-6 left-8 text-[10px] font-black text-[#0d0df2] uppercase tracking-[0.2em] opacity-70 italic">Núcleo AI Activo_</div>
                        <div className="absolute top-6 right-8">
                            <Radio className="text-white/20 w-4 h-4" />
                        </div>

                        {/* 3D Core Visual Representation */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-40 h-40 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-[#0d0df2]/30 rounded-full blur-3xl animate-pulse"></div>
                            <div className="w-32 h-32 bg-gradient-to-br from-[#0d0df2] via-[#4f4ffb] to-purple-600 rounded-full shadow-inner flex items-center justify-center relative z-10 border border-white/20 overflow-hidden">
                                {/* Synthetic Mesh Pattern */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-30 mix-blend-overlay bg-cover"></div>
                                {/* Inner glowing rings */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="w-20 h-20 border-2 border-white/20 rounded-full border-t-white/60"
                                ></motion.div>
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-16 h-16 border border-white/10 rounded-full border-b-white/40"
                                ></motion.div>
                            </div>
                            {/* Reactivity Ring */}
                            <AnimatePresence>
                                {isListening && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1.2, opacity: 0.4 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 border-2 border-[#0d0df2] rounded-full"
                                    ></motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="mt-8 text-center">
                            <h3 className="text-white font-black text-xl italic tracking-tighter uppercase">NEXUS está escuchando...</h3>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 bg-white/5 py-1 px-3 rounded-full border border-white/5">Arquitectura de Transformers_</p>
                        </div>
                    </div>

                    {/* Transcript Feed */}
                    <div className="bg-[#16162c]/60 backdrop-blur-xl rounded-[2.5rem] flex-1 flex flex-col overflow-hidden shadow-2xl border border-white/5">
                        <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Transcripción en Vivo_</h3>
                            <button className="text-slate-400 hover:text-white transition-colors">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                            {/* AI Message */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-[#0d0df2]/20 flex items-center justify-center flex-shrink-0 border border-[#0d0df2]/30 shadow-glow-sm">
                                    <Bot className="text-[#0d0df2] w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-black text-[#0d0df2] uppercase tracking-[0.2em] italic">Mentor AI_</span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">12:42 PM</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/5 backdrop-blur-sm">
                                        Bienvenido de nuevo, Alex. Veo que estás atascado en el mecanismo de Atención Multi-Cabezal. ¿Te gustaría visualizar los vectores de consulta (query), clave (key) y valor (value)?
                                    </p>
                                </div>
                            </div>
                            {/* User Message */}
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                                    <User className="text-purple-400 w-5 h-5" />
                                </div>
                                <div className="flex-1 text-right">
                                    <div className="flex items-center gap-3 mb-2 justify-end">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">12:43 PM</span>
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">Tú_</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed bg-[#0d0df2]/10 p-5 rounded-3xl rounded-tr-none border border-[#0d0df2]/20 inline-block text-left backdrop-blur-sm italic">
                                        Sí, específicamente cómo funcionan las proyecciones lineales antes del cálculo de la puntuación de atención. ¿Podemos esbozar eso?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Shared Workspace */}
                <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
                    <div className="bg-[#16162c]/60 backdrop-blur-xl rounded-[3rem] flex-1 flex flex-col overflow-hidden shadow-2xl border border-white/10 relative">
                        {/* Workspace Tabs */}
                        <div className="flex items-center gap-4 border-b border-white/5 bg-black/40 px-8 pt-4">
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-t-[1.5rem] flex items-center gap-2 transition-all ${activeTab === 'code' ? 'bg-[#101022] text-white border-t border-x border-white/10 shadow-[0_-5px_15px_rgba(0,0,0,0.3)]' : 'text-slate-500 hover:text-white'
                                    }`}
                            >
                                <Code className="w-3.5 h-3.5" />
                                attention_layer.py
                            </button>
                            <button
                                onClick={() => setActiveTab('whiteboard')}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-t-[1.5rem] flex items-center gap-2 transition-all ${activeTab === 'whiteboard' ? 'bg-[#101022] text-white border-t border-x border-white/10' : 'text-slate-500 hover:text-white'
                                    }`}
                            >
                                <Brush className="w-3.5 h-3.5" />
                                Pizarra_
                            </button>
                            <div className="ml-auto flex gap-4 pb-4">
                                <div className="bg-white/5 border border-white/5 px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <span className="text-[9px] text-[#0d0df2] uppercase font-black tracking-widest italic italic">Edición en Vivo_</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-1 bg-[#101022]/90 backdrop-blur font-mono text-sm relative overflow-hidden flex">
                            {/* Line Numbers */}
                            <div className="w-12 bg-black/20 text-slate-600 text-right pr-4 pt-8 select-none text-[10px] border-r border-white/5 leading-7 font-bold">
                                1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11<br />12<br />13<br />14<br />15
                            </div>
                            {/* Code Content */}
                            <div className="flex-1 p-8 overflow-auto leading-7 text-slate-300">
                                {activeTab === 'code' ? (
                                    <pre className="text-xs lg:text-sm">
                                        <code>
                                            <span className="text-purple-400 italic">class</span> <span className="text-blue-400 font-black">MultiHeadAttention</span>(nn.Module):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 italic">def</span> <span className="text-emerald-400 font-bold">__init__</span>(self, d_model, num_heads):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 font-bold">super</span>().__init__()<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 italic">assert</span> d_model % num_heads == 0<br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.d_k = d_model // num_heads<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.num_heads = num_heads<br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500 italic"># Linear projections for Q, K, V</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-[#0d0df2]/20 border-b-2 border-[#0d0df2] text-white px-1">self.linear_q = nn.Linear(d_model, d_model)</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.linear_k = nn.Linear(d_model, d_model)<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.linear_v = nn.Linear(d_model, d_model)<br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.linear_out = nn.Linear(d_model, d_model)<br />
                                        </code>
                                    </pre>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                                        <div className="w-full h-px bg-white/5"></div>
                                        <div className="text-slate-500 font-sans text-xs italic tracking-widest text-center">NEXUS está dibujando la arquitectura de la proyección...</div>
                                        <div className="grid grid-cols-3 gap-8 w-full max-w-md opacity-40">
                                            <div className="aspect-square border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest italic">Matriz Q_</div>
                                            <div className="aspect-square border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest italic">Matriz K_</div>
                                            <div className="aspect-square border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest italic">Matriz V_</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* AI Floating Annotation */}
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="absolute top-48 left-[35%] bg-[#0d0df2] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-[0_10px_30px_rgba(13,13,242,0.5)] flex items-center gap-2 z-10 italic"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    <span>AI: Verifica la dimensionalidad aquí_</span>
                                    <div className="absolute -bottom-1 left-6 w-2 h-2 bg-[#0d0df2] transform rotate-45"></div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Floating Action Menu */}
                        <div className="absolute bottom-10 right-10 flex gap-4">
                            <button className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all shadow-2xl group">
                                <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="bg-[#0d0df2] text-white px-8 py-4 rounded-3xl font-black uppercase tracking-[0.2em] shadow-glow hover:bg-[#4f4ffb] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 italic text-xs">
                                <Play />
                                Ejecutar Snippet_
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Control Bar */}
            <footer className="h-28 border-t border-white/10 bg-[#101022]/90 backdrop-blur-3xl flex items-center justify-center z-50">
                <div className="container max-w-6xl mx-auto flex items-center justify-between px-10">
                    {/* Persona Selector */}
                    <div className="flex flex-col gap-2 w-56">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] italic">Persona de Voz_</label>
                        <div className="relative">
                            <button
                                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                                className="w-full flex items-center justify-between bg-white/5 border border-white/10 text-slate-200 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl hover:border-[#0d0df2]/50 transition-all italic"
                            >
                                <div className="flex items-center gap-3">
                                    <Brain className="text-[#0d0df2] w-4 h-4" />
                                    {persona}
                                </div>
                                <ChevronDown className={`text-slate-500 w-4 h-4 transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {showPersonaMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full mb-3 left-0 w-full bg-[#16162c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 z-[60]"
                                    >
                                        {[
                                            { name: 'Gurú Tech', icon: Brain, color: 'text-emerald-400' },
                                            { name: 'Amigable', icon: UserPlus, color: 'text-blue-400' },
                                            { name: 'Profesional', icon: Briefcase, color: 'text-purple-400' }
                                        ].map((p) => (
                                            <div
                                                key={p.name}
                                                onClick={() => { setPersona(p.name); setShowPersonaMenu(false); }}
                                                className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-white rounded-xl cursor-pointer flex items-center gap-3 transition-colors"
                                            >
                                                <p.icon className={`${p.color} w-4 h-4`} />
                                                {p.name}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Central Media Controls */}
                    <div className="flex items-center gap-6">
                        <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all group">
                            <VideoOff className="group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="relative group">
                            {/* Visual Feedback Ring */}
                            <motion.div
                                animate={isListening ? { scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -inset-4 border-2 border-[#0d0df2] rounded-full"
                            ></motion.div>

                            <button
                                onClick={() => setIsListening(!isListening)}
                                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(13,13,242,0.4)] transition-all transform hover:scale-110 active:scale-95 z-10 relative ${isListening ? 'bg-[#0d0df2]' : 'bg-red-500'
                                    }`}
                            >
                                {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
                            </button>
                        </div>

                        <button className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 flex items-center justify-center transition-all group">
                            <PhoneOff className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Recording Status */}
                    <div className="flex flex-col gap-2 items-end w-56">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] italic">Estado de Grabación_</label>
                        <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-200 tracking-[0.1em] uppercase tabular-nums">REC 04:12</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
