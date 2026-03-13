'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AudioVisualizer } from '@/components/mentor/audio-visualizer';
import { ChatInterface } from '@/components/mentor/chat-interface';
import { Sparkles, Code2, BookOpen, Clock, Zap, Bot, MessageSquare } from 'lucide-react';

export default function MentorPage() {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: 'Enlace neuronal establecido. Soy SinapCode. Mi arquitectura está sincronizada con tu progreso. ¿Qué nodo de conocimiento vamos a expandir en esta sesión?',
            timestamp: new Date()
        }
    ]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSendMessage = async (text: string) => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMsg]);
        setIsSpeaking(true);

        try {
            // Preparar el historial para el Tutor (limitado a los últimos 5 para contexto)
            const history = messages.slice(-5).map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch('/api/ai/tutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history,
                    context: {
                        course: "Personalized Mentorship",
                        lesson: "General Architecture Guidance",
                        progress: "Active Session"
                    }
                })
            });

            if (response.ok) {
                const data = await response.json();
                const aiResponse = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: data.text,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiResponse]);
            } else {
                throw new Error("API Error");
            }
        } catch (error) {
            console.error("Error al hablar con el mentor:", error);
            const errorMsg = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Lo siento, tengo una pequeña interferencia en mi red neuronal. ¿Podrías repetirme eso?",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsSpeaking(false);
        }
    };

    const toggleRecording = () => {
        setIsListening(!isListening);
        if (!isListening) {
            setTimeout(() => {
                setIsListening(false);
                handleSendMessage("Explícame cómo implementar Clean Architecture en este proyecto");
            }, 4000);
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] pb-20 relative overflow-hidden selection:bg-[#C9A78A]/30">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-[#C9A78A]/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-[#1E1E1E]/5 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 pt-24 lg:pt-10 h-screen flex flex-col">
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-[#1E1E1E]/5 flex items-center justify-center shadow-2xl shadow-[#1E1E1E]/5 group">
                            <Bot className="w-8 h-8 text-[#C9A78A] group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter uppercase italic">SinapCode <span className="text-[#C9A78A]">Core_</span></h1>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C9A78A]/10 rounded-full border border-[#C9A78A]/20">
                                    <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-[#C9A78A]'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A78A]">
                                        {isListening ? 'Escuchando' : 'Sincronizado'}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-[#1E1E1E]/40 uppercase tracking-widest bg-[#1E1E1E]/5 px-2 py-0.5 rounded-full">Protocolo Socrático V4</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[10px] font-black text-[#1E1E1E]/30 uppercase tracking-widest mb-1">Sesión Activa</span>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <Clock className="w-3.5 h-3.5 text-[#C9A78A]" />
                                00:00:42
                            </div>
                        </div>
                        <div className="h-10 w-px bg-[#1E1E1E]/5 hidden md:block" />
                        <button className="px-5 py-2.5 bg-white border border-[#1E1E1E]/5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#F1F0E8] transition-all flex items-center gap-2 shadow-sm">
                            <BookOpen className="w-4 h-4 text-[#C9A78A]" />
                            Guías
                        </button>
                    </div>
                </header>

                {/* Workspace Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                    {/* Left: Communication Area */}
                    <div className="lg:col-span-7 flex flex-col gap-6 min-h-0">
                        <div className="h-56 shrink-0 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-[#1E1E1E]/5 relative overflow-hidden flex items-center justify-center shadow-sm">
                            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-[#F1F0E8] rounded-full border border-[#1E1E1E]/5">
                                <Zap className="w-3 h-3 text-[#C9A78A] animate-pulse" />
                                <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.2em]">Live Stream</span>
                            </div>
                            <AudioVisualizer isListening={isListening} isSpeaking={isSpeaking} />
                        </div>

                        <div className="flex-1 min-h-0 bg-white/20 backdrop-blur-xl border border-[#1E1E1E]/5 rounded-[2.5rem] p-2 shadow-sm relative">
                            <ChatInterface
                                messages={messages as any}
                                onSendMessage={handleSendMessage}
                                onToggleRecording={toggleRecording}
                                isRecording={isListening}
                            />
                        </div>
                    </div>

                    {/* Right: Technical Context */}
                    <div className="hidden lg:col-span-5 lg:flex flex-col gap-8 min-h-0">
                        <div className="flex-1 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-[#1E1E1E]/5 p-8 shadow-sm relative overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#C9A78A]/10 rounded-xl border border-[#C9A78A]/20">
                                        <Code2 className="w-5 h-5 text-[#C9A78A]" />
                                    </div>
                                    <h3 className="text-lg font-black tracking-tighter uppercase italic">Contexto Maestro_</h3>
                                </div>
                                <div className="text-[10px] font-black px-2.5 py-1 bg-[#C9A78A]/10 text-[#C9A78A] border border-[#C9A78A]/20 rounded-lg animate-pulse tracking-widest uppercase">Analizando...</div>
                            </div>

                            <div className="flex-1 bg-[#1E1E1E] rounded-3xl border border-[#1E1E1E]/10 p-6 font-mono text-sm overflow-hidden relative group shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">architecture_v2.ts</span>
                                </div>
                                <div className="mt-8 text-gray-300 space-y-2 overflow-y-auto h-full scrollbar-hide py-4">
                                    <p><span className="text-purple-400">interface</span> <span className="text-yellow-300">CleanArchitecture</span> {'{'}</p>
                                    <p className="pl-4">entities: <span className="text-blue-400">Entity[]</span>;</p>
                                    <p className="pl-4">useCases: <span className="text-blue-400">UseCase[]</span>;</p>
                                    <p className="pl-4">adapters: <span className="text-blue-400">Adapter[]</span>;</p>
                                    <p>{'}'}</p>
                                    <p className="mt-4"><span className="text-gray-500 block italic">&#123;`// El mentor está analizando esta estructura`&#125;</span></p>
                                    <p className="pl-4 bg-emerald-500/10 -mx-6 px-6 border-l-2 border-emerald-500"><span className="text-purple-400">const</span> domain = <span className="text-emerald-400">new</span> DomainCore();</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-4 h-4 text-[#C9A78A]" />
                                    <p className="text-[10px] font-black text-[#1E1E1E]/30 uppercase tracking-widest">Temas Recomendados</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-4 py-2 bg-white hover:bg-[#F1F0E8] border border-[#1E1E1E]/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">Patrones Creacionales</button>
                                    <button className="px-4 py-2 bg-white hover:bg-[#F1F0E8] border border-[#1E1E1E]/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">Refactor SOLID</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
