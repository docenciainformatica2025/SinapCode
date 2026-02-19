'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Terminal,
    Bot,
    Code2,
    ChevronRight,
    CheckCircle2,
    MessageSquare,
    Zap,
    ArrowLeft,
    MonitorPlay,
    BookOpen,
    Send,
    Award,
    Dna
} from 'lucide-react';
import Link from 'next/link';
import { AICodeLab } from '@/components/dashboard/courses/ai-code-lab';

export default function AgenticMasterclassPage() {
    const [viewMode, setViewMode] = useState<'video' | 'lab'>('video');
    const [activeLesson, setActiveLesson] = useState(2);
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: '¡Hola! He analizado tu progreso. Tu arquitectura multi-agente está bien planteada. ¿Quieres que veamos cómo optimizar la lógica de re-intento?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputMessage, setInputMessage] = useState('');

    const lessons = [
        { title: "Introduction to Autonomous Systems", duration: "12:45", completed: true },
        { title: "The NEXUS Multi-Agent Protocol", duration: "18:20", completed: true },
        { title: "Building your First Agentic Workflow", duration: "25:10", completed: false },
        { title: "Optimization & Logic Gates", duration: "15:05", completed: false },
        { title: "Deployment & Scaling Protocols", duration: "22:30", completed: false }
    ];

    const codePreview = `import { Agent } from "@nexus/ai";

const masterAgent = new Agent({
  role: "Lead Architect",
  model: "imagen-3",
  tasks: ["Analyze UI", "Generate Code"]
});

async function startWorkflow() {
  console.log("Initializing Agentic Protocol...");
  await masterAgent.run();
}

startWorkflow();`;

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const text = inputMessage;
        setInputMessage('');
        const newMsg = { role: 'user', content: text };
        setChatMessages(prev => [...prev, newMsg]);
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai/tutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: chatMessages,
                    context: {
                        course: "Agentic Masterclass",
                        lesson: lessons[activeLesson].title,
                        progress: "40%"
                    }
                })
            });

            if (response.ok) {
                const data = await response.json();
                setChatMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="min-h-screen bg-deep-space text-white pt-20 pb-10 px-6">
            <div className="max-w-[1800px] mx-auto space-y-6">

                {/* Back Link */}
                <Link href="/courses" className="flex items-center gap-2 text-platinum-dim hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to All Courses</span>
                </Link>

                {/* Main Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/30">Premium Masterclass</span>
                            <span className="text-platinum-dim text-[8px] font-black uppercase tracking-widest">• 4.5 Hours Content</span>
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter leading-none">
                            AGENTIC_ <span className="text-primary underline decoration-primary decoration-4 underline-offset-8">MASTERCLASS</span>
                        </h1>
                        <p className="text-platinum-dim font-medium mt-4 max-w-2xl">
                            Domina la arquitectura de sistemas autónomos y el despliegue de agentes inteligentes con protocolos industriales avanzados.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-1">Your Progress</p>
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[40%] shadow-glow" />
                                </div>
                                <span className="text-sm font-black italic">40%</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Award className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Switcher */}
                <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit">
                    <button
                        onClick={() => setViewMode('video')}
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'video' ? 'bg-primary text-white shadow-neon-blue' : 'text-platinum-dim hover:text-white'}`}
                    >
                        <MonitorPlay className="w-3.5 h-3.5" />
                        Teoría Modular
                    </button>
                    <button
                        onClick={() => setViewMode('lab')}
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'lab' ? 'bg-primary text-white shadow-neon-blue' : 'text-platinum-dim hover:text-white'}`}
                    >
                        <Dna className="w-3.5 h-3.5" />
                        Laboratorio Agentic
                    </button>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Lesson Sidebar */}
                    <aside className="lg:col-span-3 space-y-4 order-2 lg:order-1">
                        <div className="glass-panel p-6 rounded-3xl border border-white/10">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Course modules_</h3>
                            <div className="space-y-2">
                                {lessons.map((lesson, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveLesson(i)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${activeLesson === i
                                            ? 'bg-primary/20 border border-primary/30'
                                            : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${lesson.completed ? 'bg-emerald-400/20 text-emerald-400' :
                                            activeLesson === i ? 'bg-primary text-white' : 'bg-white/5 text-platinum-dim'
                                            }`}>
                                            {lesson.completed ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-3 h-3 ml-0.5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-[11px] font-bold leading-tight ${activeLesson === i ? 'text-white' : 'text-platinum-dim group-hover:text-platinum'}`}>
                                                {lesson.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Zap className="w-2 h-2 text-primary" />
                                                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.1em]">{lesson.duration} • Video Class</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-neural-blue/10 to-purple-600/10 p-6 rounded-3xl border border-white/5">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Bonus Content</p>
                            <h4 className="text-sm font-black text-white italic mb-4">Masterclass Lab Resources_</h4>
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                Download Assets (1.2GB)
                            </button>
                        </div>
                    </aside>

                    {/* Main Stage */}
                    <div className="lg:col-span-9 space-y-6 order-1 lg:order-2">

                        {viewMode === 'video' ? (
                            <>
                                {/* Video Player Emulation */}
                                <div className="aspect-video bg-black rounded-[2.5rem] border border-white/10 overflow-hidden relative group shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-neon-blue"
                                        >
                                            <Play className="w-8 h-8 ml-1" />
                                        </motion.button>
                                    </div>

                                    {/* Player UI */}
                                    <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-1 bg-white/20 rounded-full">
                                                <div className="h-full bg-primary w-[35%] rounded-full shadow-glow" />
                                            </div>
                                            <span className="text-[10px] font-black text-white">12:30 / 25:10</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Split Editor and AI Assistant */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                                    {/* Interactive Code Lab Preview */}
                                    <div
                                        onClick={() => setViewMode('lab')}
                                        className="glass-panel p-1 rounded-[2.5rem] border border-white/10 relative overflow-hidden flex flex-col min-h-[500px] cursor-pointer group hover:border-primary/50 transition-all"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <button className="px-8 py-3 bg-primary text-white font-black uppercase text-xs rounded-2xl shadow-neon-blue">
                                                Saltar al Laboratorio
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-4 h-4 text-primary" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">AGENTIC_LAB v1.02</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 font-mono text-sm relative blur-[2px] pointer-events-none">
                                            <div className="absolute left-0 top-0 bottom-0 w-10 bg-black/20 flex flex-col items-center pt-6 text-[10px] text-platinum-dim/30 space-y-1">
                                                {Array.from({ length: 15 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                                            </div>
                                            <pre className="pl-8 text-neural-blue leading-relaxed">
                                                {codePreview}
                                            </pre>
                                        </div>
                                    </div>

                                    {/* AI Learning Assistant */}
                                    <div className="glass-panel rounded-[2.5rem] border border-white/10 flex flex-col h-[500px]">
                                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                    <Bot className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-white italic tracking-tighter">NEXUS_ <span className="text-purple-400">FLOW_</span></h4>
                                                    <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">En línea • Mentor Senior</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                                            {chatMessages.map((msg, i) => (
                                                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-black uppercase ${msg.role === 'user' ? 'bg-primary/20 text-primary italic' : 'bg-purple-500/20 text-purple-400'}`}>
                                                        {msg.role === 'user' ? 'ME' : <Bot className="w-4 h-4" />}
                                                    </div>
                                                    <div className={`p-4 rounded-2xl border ${msg.role === 'user' ? 'bg-primary/10 border-primary/20 rounded-tr-none' : 'bg-white/5 border-white/5 rounded-tl-none'} max-w-[85%]`}>
                                                        <p className="text-xs text-platinum font-medium leading-relaxed">
                                                            {msg.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {isTyping && (
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                        <Bot className="w-4 h-4" />
                                                    </div>
                                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 rounded-tl-none">
                                                        <div className="flex gap-1">
                                                            <div className="w-1 h-1 rounded-full bg-platinum/40 animate-bounce" />
                                                            <div className="w-1 h-1 rounded-full bg-platinum/40 animate-bounce [animation-delay:0.2s]" />
                                                            <div className="w-1 h-1 rounded-full bg-platinum/40 animate-bounce [animation-delay:0.4s]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 border-t border-white/5">
                                            <form
                                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                                className="relative"
                                            >
                                                <input
                                                    value={inputMessage}
                                                    onChange={(e) => setInputMessage(e.target.value)}
                                                    placeholder="Haz una consulta a NEXUS..."
                                                    className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-xs text-white outline-none focus:border-primary/50 transition-all font-medium"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isTyping || !inputMessage.trim()}
                                                    className="absolute right-2 top-2 bottom-2 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-neon-blue"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full"
                            >
                                <AICodeLab onComplete={() => setViewMode('video')} />
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
