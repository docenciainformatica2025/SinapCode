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
        { id: 1, text: `¡Hola! Soy el asistente de Sinapcode. ¿Cómo puedo ayudarte hoy con tu proyecto o aprendizaje?`, sender: 'ai' },
        { id: 2, text: "Recuerda que puedes explorar nuestros productos o conocer más sobre nuestra filosofía en la sección de 'Estudio'.", sender: 'ai', type: 'text' },
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
                text: "Entiendo perfectamente. Puedes encontrar más detalles sobre eso en nuestra sección de Recursos o contactándonos directamente para iniciar un proyecto.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    if (!mounted) return null;

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
                        className="fixed bottom-8 right-10 z-[100] w-20 h-20 rounded-full bg-[#C9A78A] flex items-center justify-center shadow-2xl shadow-[#C9A78A]/20 border-2 border-white/50 hover:scale-110 active:scale-95 transition-all group"
                    >
                        <Bot className="text-white w-10 h-10 group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#A7C1C0] rounded-full border-2 border-[#F1F0E8] flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">1</span>
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
                                <div className="bg-white/80 backdrop-blur-2xl px-6 py-4 rounded-[1.5rem] flex items-center gap-4 max-w-sm border border-[#1E1E1E]/5 shadow-2xl">
                                    <Lightbulb className="text-[#C9A78A] animate-pulse" />
                                    <div>
                                        <p className="text-[10px] text-[#C9A78A] font-bold uppercase tracking-widest mb-1">Tip SinapAI_</p>
                                        <p className="text-sm font-light text-[#1E1E1E]/70">¿Sabías que puedes iniciar un proyecto gratis hoy mismo?</p>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-[#1E1E1E]/5 transform rotate-45"></div>
                            </div>
                        </motion.div>

                        {/* Chat Interface */}
                        <motion.div
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.9 }}
                            className="pointer-events-auto w-full max-w-[440px] h-[80vh] flex flex-col bg-[#F1F0E8]/95 backdrop-blur-3xl rounded-[3rem] overflow-hidden relative border border-[#1E1E1E]/5 shadow-3xl shadow-black/10"
                        >
                            {/* Header */}
                            <header className="p-8 pb-4 flex items-start justify-between bg-gradient-to-b from-[#C9A78A]/10 to-transparent">
                                <div className="flex items-center gap-5">
                                    {/* Avatar */}
                                    <div className="relative w-16 h-16 rounded-3xl bg-[#C9A78A] flex items-center justify-center text-white shadow-lg overflow-hidden">
                                        <Bot className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-serif font-bold text-[#1E1E1E] tracking-tight">Sinap<span className="text-[#C9A78A]">AI</span></h1>
                                        <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-[#A7C1C0]/10 rounded-full border border-[#A7C1C0]/20 w-fit">
                                            <span className="w-2 h-2 bg-[#A7C1C0] rounded-full animate-pulse"></span>
                                            <span className="text-[10px] text-[#A7C1C0] font-bold tracking-wider uppercase italic">Online_</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2.5 rounded-2xl hover:bg-white/50 text-[#1E1E1E]/30 hover:text-[#1E1E1E] transition-colors">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-2.5 rounded-2xl hover:bg-white/50 text-[#1E1E1E]/30 hover:text-[#1E1E1E] transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </header>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 scrollbar-hide">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                    >
                                        <div className={`p-5 rounded-3xl text-[14px] leading-relaxed max-w-[90%] ${msg.sender === 'ai'
                                            ? 'bg-white text-[#1E1E1E]/80 border border-[#1E1E1E]/5 rounded-tl-none font-light'
                                            : 'bg-[#C9A78A] text-white rounded-tr-none font-medium'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Footer / Input */}
                            <div className="p-8 pb-10 bg-white/40 backdrop-blur-3xl border-t border-[#1E1E1E]/5 relative">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="block w-full pl-6 pr-16 py-5 bg-white border border-[#1E1E1E]/10 rounded-3xl text-sm placeholder-[#1E1E1E]/20 text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#C9A78A]/20 focus:border-[#C9A78A]/50 transition-all font-light"
                                        placeholder="Escribe tu mensaje..."
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <button onClick={handleSendMessage} className="p-3 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#C9A78A] transition-all transform active:scale-95 shadow-xl">
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Suggestion Chips */}
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {[
                                        { label: 'Sobre nosotros' },
                                        { label: 'Ver productos' },
                                        { label: 'Soporte' }
                                    ].map((chip) => (
                                        <button
                                            key={chip.label}
                                            onClick={() => {
                                                setInputValue(chip.label);
                                                // Pre-fill input instead of sending to let user edit
                                            }}
                                            className="px-4 py-2 rounded-xl bg-white border border-[#1E1E1E]/5 hover:border-[#C9A78A]/40 text-[10px] text-[#1E1E1E]/40 hover:text-[#C9A78A] transition-all font-medium uppercase tracking-wider"
                                        >
                                            {chip.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-[10px] text-[#1E1E1E]/30 font-medium uppercase tracking-widest">Powered by SinapCore 4.0</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

