'use client';

import * as React from 'react';
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Settings,
    X,
    Play,
    Navigation,
    TrendingUp,
    Ticket,
    Search,
    Mic,
    Send,
    Sparkles,
    Circle,
    Lightbulb
} from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'ai' | 'user';
    type?: 'resume' | 'suggestion' | 'text';
}

export default function AIConcierge() {
    const { status, data: session } = useSession();
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([
        { id: 1, text: `¡Bienvenido de nuevo! Me alegra verte siguiendo con tu formación.`, sender: 'ai' },
        { id: 2, text: "Recuerda que puedes usar tus Tokens CODE para canjear mentorías 1-a-1 y acelerar tu progreso.", sender: 'ai', type: 'text' },
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (mounted) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, mounted]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        const newMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages([...messages, newMsg]);
        setInputValue('');

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                text: "Puedo ayudarte con eso. La documentación se movió a la pestaña de 'Recursos' en la última actualización. ¿Te gustaría que te guíe allí?",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    // Ensure status check doesn't break hook count
    if (!mounted || status !== "authenticated") return null;

    return (
        <>
            {/* Floating Trigger Button (when closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-8 right-10 z-[100] w-20 h-20 rounded-full bg-gradient-to-br from-[#0df2f2] to-[#8b5cf6] flex items-center justify-center shadow-[0_10px_40px_rgba(13,242,242,0.4)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-all group"
                    >
                        <Bot className="text-[#102222] w-10 h-10 group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#102222] flex items-center justify-center">
                            <span className="text-[9px] font-black text-white">1</span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* AI Concierge Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[200] flex items-end justify-end p-6 lg:p-12 pointer-events-none">

                        {/* Floating Hint Bubble */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="absolute top-1/2 left-1/4 pointer-events-auto transform transition-all duration-500 hover:scale-105 hidden xl:block"
                        >
                            <div className="relative">
                                <div className="bg-[#162e2e]/80 backdrop-blur-2xl px-6 py-4 rounded-[1.5rem] flex items-center gap-4 max-w-sm border border-[#0df2f2]/20 shadow-2xl shadow-black/50">
                                    <Lightbulb className="text-[#0df2f2] animate-pulse" />
                                    <div>
                                        <p className="text-[9px] text-[#0df2f2] font-black uppercase tracking-widest mb-1 italic">Paso 2 de 5_</p>
                                        <p className="text-sm font-medium text-slate-200 italic">Accede a tu módulo de <span className="text-white border-b-2 border-[#0df2f2]/50 italic">Redes Neuronales</span> aquí.</p>
                                    </div>
                                </div>
                                {/* Connector */}
                                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-[#162e2e] border-r border-b border-[#0df2f2]/20 transform rotate-45"></div>
                            </div>
                        </motion.div>

                        {/* Chat Interface */}
                        <motion.div
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.9 }}
                            className="pointer-events-auto w-full max-w-[440px] h-[85vh] flex flex-col glass-4k rounded-[3rem] overflow-hidden relative border border-white/10"
                        >
                            {/* Header */}
                            <header className="p-8 pb-4 flex items-start justify-between bg-gradient-to-b from-[#0df2f2]/10 to-transparent">
                                <div className="flex items-center gap-5">
                                    {/* Avatar */}
                                    <div className="relative w-16 h-16 rounded-full border-2 border-[#0df2f2]/40 overflow-hidden bg-black/40 shadow-[0_0_20px_rgba(13,242,242,0.3)]">
                                        <img className="w-full h-full object-cover opacity-90 mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBayEvUhQpYhA_0Ujv63qpPQu_Yp6Hnx1VNPI2mUs4u0eH8uiINFUH4te6c42-NbcmBVMOHkXVhIXdFHPJxcnpkS2ri2ArUWZdSqaUpBGmyCI2fnoXB5srrgOFOmKQ_ffD_KQynXz7QrGSdvlDym3k6rtIfGoBQKrAjF08dkfhPNwcEnxJEL1iaLJVTMYmJvhiVv1LOZV39OmfTMbwdgsptGyxDqCZ2hrw32p4GlEOq6yx1VBxSLaVZgWWBHvoSgDKx5A1-rOPQzc_W" alt="AI Avatar" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">Sinap<span className="text-[#0df2f2]">AI</span></h1>
                                        <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-white/5 rounded-full border border-white/5 w-fit">
                                            <span className="w-2 h-2 bg-[#0df2f2] rounded-full animate-pulse shadow-[0_0_12px_rgba(13,242,242,0.8)]"></span>
                                            <span className="text-[10px] text-white/40 font-black tracking-[0.2em] uppercase italic">Neural Advisor_</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 font-black italic">
                                    <button className="p-2.5 rounded-2xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-2.5 rounded-2xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors focus:bg-red-500/20">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </header>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-8 scrollbar-hide">
                                <div className="flex justify-center mb-4">
                                    <span className="text-[9px] uppercase tracking-[0.4em] text-slate-600 bg-black/30 px-4 py-2 rounded-full font-black italic">Hoy, 20:44_</span>
                                </div>

                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.sender === 'ai' ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border relative ${msg.sender === 'ai' ? 'bg-[#0df2f2]/10 border-[#0df2f2]/30 text-[#0df2f2]' : 'bg-[#102222] border-white/5 text-slate-500'
                                            }`}>
                                            {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10"></div>}
                                        </div>

                                        <div className={`space-y-3 max-w-[85%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                            {msg.type === 'resume' ? (
                                                <div className="bg-[#0df2f2]/5 px-6 py-5 rounded-[2rem] rounded-tl-none text-sm leading-relaxed text-slate-200 border border-[#0df2f2]/20 backdrop-blur-sm flex items-center gap-4 group cursor-pointer hover:bg-[#0df2f2]/10 transition-all">
                                                    <div className="bg-[#0df2f2]/20 p-3 rounded-2xl text-[#0df2f2] shadow-[0_0_20px_rgba(13,242,242,0.2)]">
                                                        <Play className="w-6 h-6 fill-current" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-black text-white text-[11px] uppercase tracking-[0.15em] italic leading-tight">{msg.text}_</p>
                                                        <p className="text-[9px] text-[#0df2f2] font-black uppercase tracking-[0.2em] opacity-40 mt-1">Sugerencia de la IA_</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`p-5 rounded-[2rem] text-[13px] leading-relaxed backdrop-blur-md border ${msg.sender === 'ai'
                                                    ? 'bg-white/[0.03] border-white/10 text-white/90 rounded-tl-none font-medium'
                                                    : 'bg-[#0df2f2]/10 border-[#0df2f2]/20 text-white rounded-tr-none italic font-medium'
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Footer / Input */}
                            <div className="p-8 pb-10 bg-black/40 backdrop-blur-3xl border-t border-white/5 relative">
                                {/* Auto Suggestion */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-full flex justify-center z-10">
                                    <button className="flex items-center gap-2 bg-[#0df2f2] text-[#102222] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(13,242,242,0.4)] hover:scale-105 transition-transform italic">
                                        <Sparkles className="w-4 h-4" />
                                        Preguntar al Asistente AI_
                                    </button>
                                </div>

                                <div className="relative group mt-2">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Search className="w-5 h-5 text-white/30 group-focus-within:text-[#0df2f2] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="block w-full pl-14 pr-16 py-5 bg-black/40 border border-white/10 rounded-3xl text-sm placeholder-white/20 text-white focus:outline-none focus:ring-1 focus:ring-[#0df2f2]/50 focus:border-[#0df2f2]/50 transition-all shadow-inner font-medium italic"
                                        placeholder="Consultar al núcleo central..."
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                                        <button className="p-2.5 text-white/20 hover:text-[#0df2f2] transition-colors rounded-xl hover:bg-white/5">
                                            <Mic className="w-4 h-4" />
                                        </button>
                                        <button onClick={handleSendMessage} className="p-3 bg-white text-black rounded-2xl hover:bg-[#0df2f2] hover:text-black transition-all transform active:scale-95 shadow-xl">
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Suggestion Chips */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {[
                                        { icon: Navigation, label: 'Tour Guiado' },
                                        { icon: TrendingUp, label: 'Explorar Tendencias' },
                                        { icon: Ticket, label: 'Soporte' }
                                    ].map((chip) => (
                                        <button key={chip.label} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#0df2f2]/40 text-[9px] text-slate-400 hover:text-[#0df2f2] transition-all font-black uppercase tracking-widest italic group">
                                            <chip.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            {chip.label}_
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-between items-center px-2">
                                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] italic">Desarrollado por <span className="text-[#0df2f2]/60">SinapCore 4.0_</span></p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-700"></div>)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
