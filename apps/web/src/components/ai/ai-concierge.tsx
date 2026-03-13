'use client';

import * as React from 'react';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    X,
    Send,
    Sparkles,
    Rocket,
    GraduationCap,
    Info,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: number;
    text: string;
    sender: 'ai' | 'user';
    type?: 'resume' | 'suggestion' | 'text' | 'action';
}

export default function AIConcierge() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [showHint, setShowHint] = React.useState(false);

    // Welcome message based on context
    const getInitialMessage = () => {
        if (pathname?.startsWith('/admin')) return "¡Hola, Administrador! El Centro de Mando AI está listo. ¿Necesitas un reporte de analíticas o gestionar agentes?";
        if (pathname?.includes('courses')) return "Veo que exploras nuestros cursos. ¿Buscas una ruta específica para convertirte en un Tech Builder?";
        return `¡Hola! Soy el asistente de Sinapcode. ¿Cómo puedo ayudarte hoy con tu proyecto o aprendizaje?`;
    };

    const [messages, setMessages] = React.useState<Message[]>([
        { id: 1, text: getInitialMessage(), sender: 'ai' },
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);
        // Show proactive hint after 5 seconds
        const timer = setTimeout(() => setShowHint(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        if (mounted) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, mounted, isTyping]);

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue;
        if (!messageText.trim()) return;

        const newMsg: Message = { id: Date.now(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI Response with intelligence based on keywords
        setTimeout(() => {
            setIsTyping(false);
            let response = "Entiendo perfectamente. Puedes encontrar más detalles sobre eso en nuestra sección de Recursos o contactándonos directamente para iniciar un proyecto.";

            if (messageText.toLowerCase().includes('curso')) response = "Nuestra plataforma de aprendizaje incluye módulos de Fullstack, AI y Web3. ¿Te gustaría ver el catálogo completo?";
            if (messageText.toLowerCase().includes('proyecto')) response = "¡Excelente! En SinapCode ayudamos a startups a escalar. ¿Tienes ya un concepto o necesitas consultoría inicial?";

            const aiMsg: Message = {
                id: Date.now() + 1,
                text: response,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1500);
    };

    if (!mounted) return null;

    const actionCards = [
        {
            label: 'Iniciar Proyecto',
            icon: Rocket,
            color: 'text-primary',
            bg: 'bg-primary/10',
            desc: 'Convierte tu idea en realidad tech.'
        },
        {
            label: 'Explorar Cursos',
            icon: GraduationCap,
            color: 'text-terracotta',
            bg: 'bg-terracotta/10',
            desc: 'Formación de alto nivel para builders.'
        },
        {
            label: 'Sobre SinapCode',
            icon: Info,
            color: 'text-bio-graphing',
            bg: 'bg-bio-graphing/10',
            desc: 'Nuestra filosofía y metodología.'
        }
    ];

    return (
        <>
            {/* Proactive Hint Bubble */}
            <AnimatePresence>
                {!isOpen && showHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-32 right-10 z-[100] hidden md:block"
                    >
                        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 max-w-[240px] relative">
                            <button
                                onClick={() => setShowHint(false)}
                                aria-label="Cerrar sugerencia"
                                className="absolute -top-2 -right-2 w-5 h-5 bg-[#1E1E1E] text-white rounded-full flex items-center justify-center scale-75 hover:scale-100 transition-transform"
                            >
                                <X className="w-3 h-3" />
                            </button>
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles className="w-4 h-4 text-terracotta" />
                                <span className="text-[10px] font-bold text-terracotta uppercase tracking-[0.2em]">Sugerencia AI</span>
                            </div>
                            <p className="text-xs text-[#1E1E1E]/80 font-medium leading-relaxed">
                                {pathname?.includes('courses')
                                    ? "¿Quieres saber qué curso se adapta mejor a tu perfil?"
                                    : "¿Tienes una idea para un nuevo producto digital?"}
                            </p>
                            <button
                                onClick={() => { setIsOpen(true); setShowHint(false); }}
                                className="mt-3 text-[10px] font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                Preguntar ahora <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        layoutId="bot-trigger"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => { setIsOpen(true); setShowHint(false); }}
                        aria-label="Abrir asistente AI"
                        className="fixed bottom-8 right-10 z-[100] w-20 h-20 rounded-[28px] bg-bg-surface flex items-center justify-center shadow-2xl border border-white/10 hover:border-primary/50 transition-all group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-brain-spark opacity-0 group-hover:opacity-10 transition-opacity" />
                        <Bot className="text-white w-9 h-9 group-hover:scale-110 transition-transform relative z-10" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-bg flex items-center justify-center"
                        >
                            <span className="text-[10px] font-black text-white">!</span>
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* AI Concierge Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[200] flex items-end justify-end p-4 lg:p-10 pointer-events-none">

                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden pointer-events-auto"
                        />

                        {/* Chat Interface */}
                        <motion.div
                            layoutId="bot-trigger"
                            initial={{ y: 100, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.95 }}
                            className="pointer-events-auto w-full max-w-[460px] h-[90vh] md:h-[750px] flex flex-col bg-bg-surface/95 backdrop-blur-3xl rounded-[40px] overflow-hidden relative border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
                        >
                            {/* Header */}
                            <header className="px-8 pt-8 pb-6 flex items-start justify-between border-b border-white/5 relative bg-gradient-to-b from-primary/5 to-transparent">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-bg border border-white/10 flex items-center justify-center text-primary overflow-hidden shadow-inner">
                                            <Bot className="w-9 h-9" />
                                            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-bg-surface" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-xl font-bold text-white tracking-tight uppercase italic">Sinap<span className="text-primary">AI</span></h1>
                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[8px] font-black text-primary border border-primary/20 tracking-widest">v4.0</span>
                                        </div>
                                        <p className="text-xs text-white/40 font-medium mt-1">Tu guía en el ecosistema SinapCode</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Cerrar chat"
                                    className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </header>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-hide bg-[radial-gradient(circle_at_50%_0%,rgba(10,132,255,0.03)_0%,transparent_50%)]">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn("flex flex-col gap-2", msg.sender === 'user' ? 'items-end' : 'items-start')}
                                    >
                                        <div className={cn(
                                            "px-6 py-4 rounded-[24px] text-sm leading-relaxed max-w-[85%] shadow-sm",
                                            msg.sender === 'ai'
                                                ? 'bg-bg border border-white/5 text-white/70 rounded-tl-none font-medium'
                                                : 'bg-primary text-white rounded-tr-none font-bold shadow-lg shadow-primary/20'
                                        )}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 px-2">
                                            {msg.sender === 'ai' ? 'Bot' : 'Tú'} • {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 p-4 bg-bg/50 rounded-2xl w-fit border border-white/5">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                                    </motion.div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Footer / Input Area */}
                            <div className="p-8 pb-10 bg-bg-surface border-t border-white/5 flex flex-col gap-6">

                                {/* Action Cards (Guided Flow) */}
                                <div className="grid grid-cols-1 gap-2">
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1 ml-1">¿Cómo empezamos?</p>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {actionCards.map((card) => (
                                            <button
                                                key={card.label}
                                                onClick={() => handleSendMessage(card.label)}
                                                className="flex-shrink-0 flex items-center gap-4 px-5 py-4 bg-bg border border-white/5 rounded-3xl hover:border-primary/30 transition-all group text-left max-w-[200px]"
                                            >
                                                <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-inner", card.bg, card.color)}>
                                                    <card.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white truncate">{card.label}</p>
                                                    <p className="text-[9px] text-white/30 font-medium mt-0.5 line-clamp-1">{card.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input Bar */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary/5 rounded-[24px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                    <div className="relative flex items-center gap-3">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                className="block w-full pl-6 pr-14 py-5 bg-bg border border-white/10 rounded-[24px] text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                                placeholder="Describe tu visión..."
                                            />
                                            <div className="absolute right-3 inset-y-0 flex items-center">
                                                <button
                                                    onClick={() => handleSendMessage()}
                                                    disabled={!inputValue.trim()}
                                                    aria-label="Enviar mensaje"
                                                    className="p-3 bg-primary text-white rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg shadow-primary/20"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-2">
                                    <p className="text-[9px] text-white/10 font-black uppercase tracking-[0.3em] italic">SinapCore Intelligence</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Sistemas Estables</span>
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

