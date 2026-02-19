'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Sparkles,
    BookOpen,
    Video,
    Terminal,
    FileText,
    CheckCircle2,
    ArrowRight,
    Loader2,
    Check
} from 'lucide-react';
import { toast } from 'sonner';

export function AICourseArchitect() {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [step, setStep] = useState(0);

    const handleGenerate = async () => {
        if (!topic) return toast.error('Ingresa un tema tendencia');

        setIsGenerating(true);
        setGeneratedContent(null);
        setStep(0);

        // Simulate AI generation steps
        const steps = [
            'Analizando tendencias del mercado...',
            'Estructurando objetivos pedagógicos...',
            'Generando sílabo detallado...',
            'Creando guiones de video y laboratorios...',
            'Finalizando arquitectura del curso...'
        ];

        for (let i = 0; i < steps.length; i++) {
            setStep(i);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        setGeneratedContent({
            title: topic + ": From Concept to Deployment",
            description: "A comprehensive course designed under Google Academy standards to master modern technical architectures.",
            objectives: [
                "Understand core architecture principles",
                "Implement scalable autonomous systems",
                "Integrate multi-agent workflows"
            ],
            modules: [
                {
                    title: "Module 1: Introduction & Foundations",
                    lessons: [
                        { title: "What is " + topic + "?", types: ['video', 'reading', 'lab'] },
                        { title: "Core Concepts and Setup", types: ['video', 'lab', 'quiz'] }
                    ]
                },
                {
                    title: "Module 2: Advanced Implementation",
                    lessons: [
                        { title: "Building your first system", types: ['video', 'lab'] },
                        { title: "Optimization Strategies", types: ['video', 'quiz'] }
                    ]
                }
            ],
            badges: ['Architect', 'Master', 'Pioneer']
        });

        setIsGenerating(false);
        toast.success('¡Curso generado con éxito!');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Input Side */}
            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-glow">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tighter italic">AI CO-PILOT & <span className="text-primary">INPUTS_</span></h3>
                    </div>
                    <p className="text-sm text-platinum-dim font-medium leading-relaxed">
                        Ingresa una tendencia tecnológica y deja que nuestra IA use protocolos de ingeniería de élite para estructurar tu próximo curso.
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block">Tema del Curso</label>
                        <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder='Ej: "Agentes de IA con LangGraph" o "Sistemas Agénticos"'
                            className="w-full h-40 bg-black/50 border border-white/10 rounded-2xl p-6 text-white font-medium placeholder:text-white/10 focus:border-primary/50 outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block">Audiencia</label>
                            <select className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white font-bold outline-none">
                                <option>Intermediate Developers</option>
                                <option>Beginners</option>
                                <option>Tech Leads</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block">Duración</label>
                            <select className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white font-bold outline-none">
                                <option>6 Weeks</option>
                                <option>4 Weeks</option>
                                <option>8 Weeks</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 transition-all ${isGenerating
                                ? 'bg-white/10 text-white cursor-not-allowed'
                                : 'bg-primary text-white shadow-neon-blue hover:scale-[1.02] hover:shadow-neon-purple active:scale-95'
                            }`}
                    >
                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        {isGenerating ? 'Generando Arquitectura...' : 'Generar Estructura del Curso'}
                    </button>

                    {isGenerating && (
                        <div className="space-y-4 pt-4">
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary shadow-glow"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${(step + 1) * 20}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest text-center animate-pulse">
                                {['Analizando...', 'Estructurando...', 'Generando...', 'Creando...', 'Finalizando...'][step]}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Preview Side */}
            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 min-h-[600px] flex flex-col relative overflow-hidden">
                {!generatedContent && !isGenerating && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/20">
                            <BookOpen className="w-10 h-10" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2 tracking-tighter italic uppercase underline decoration-primary">Waiting for Input</h4>
                            <p className="text-platinum-dim text-sm font-medium">Define un tema a la izquierda para ver la estructura pedagógica generada por IA.</p>
                        </div>
                    </div>
                )}

                {(isGenerating || generatedContent) && (
                    <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{isGenerating ? 'Drafting' : 'Generated Structure'}</span>
                            </div>
                            {generatedContent && (
                                <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                    Publish to LMS
                                </button>
                            )}
                        </div>

                        {generatedContent && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic tracking-tighter mb-2 underline decoration-primary ">{generatedContent.title}</h3>
                                    <p className="text-sm text-platinum-dim font-medium">{generatedContent.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-40 italic underline decoration-primary decoration-2 underline-offset-4">Learning Objectives</p>
                                    <ul className="space-y-3">
                                        {generatedContent.objectives.map((obj: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-platinum font-bold">
                                                <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                                {obj}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-40 italic underline decoration-primary decoration-2 underline-offset-4">Syllabus Breakdown</p>
                                    <div className="space-y-4">
                                        {generatedContent.modules.map((mod: any, i: number) => (
                                            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                                <h4 className="text-sm font-black text-white mb-4 uppercase tracking-tighter italic underline decoration decoration-primary decoration-1 underline-offset-4">{mod.title}</h4>
                                                <div className="space-y-4">
                                                    {mod.lessons.map((lesson: any, j: number) => (
                                                        <div key={j} className="flex flex-col gap-2">
                                                            <div className="flex justify-between items-center ">
                                                                <span className="text-xs font-bold text-platinum">Lesson {i + 1}.{j + 1}: {lesson.title}</span>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                {lesson.types.map((t: string) => (
                                                                    <div key={t} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md">
                                                                        {t === 'video' ? <Video className="w-3 h-3 text-blue-400" /> :
                                                                            t === 'lab' ? <Terminal className="w-3 h-3 text-purple-400" /> :
                                                                                t === 'quiz' ? <Check className="w-3 h-3 text-emerald-400" /> :
                                                                                    <FileText className="w-3 h-3 text-platinum-dim" />}
                                                                        <span className="text-[8px] font-black uppercase text-platinum-dim">{t} Script</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-40 mb-4 italic underline decoration-primary decoration-2 underline-offset-4">Badges & Achievements</p>
                                    <div className="flex gap-3">
                                        {generatedContent.badges.map((b: string) => (
                                            <div key={b} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-platinum-dim">
                                                {b}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
