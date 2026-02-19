'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Sparkles,
    Send,
    Linkedin,
    Instagram,
    Facebook,
    MessageCircle, // Using as TikTok placeholder
    Monitor,
    Smartphone,
    Layers,
    Image as ImageIcon,
    Type,
    CheckCircle2,
    RefreshCw,
    Share2,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const SOCIAL_CHANNELS = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]/10', format: 'Post Profesional' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-[#E4405F]', bg: 'bg-[#E4405F]/10', format: 'Carrusel/Post' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-[#1877F2]', bg: 'bg-[#1877F2]/10', format: 'Actualización' },
    { id: 'tiktok', name: 'TikTok', icon: Share2, color: 'text-white', bg: 'bg-white/10', format: 'Guion de Video' },
];

export function AdminContentSocial() {
    const [step, setStep] = useState(1);
    const [topic, setTopic] = useState('La Revolución de los Agentes de IA en 2026');
    const [isGenerating, setIsGenerating] = useState(false);

    // Sample generated content
    const [generatedPost, setGeneratedPost] = useState({
        title: 'El Amanecer de la Ingeniería Agentica',
        content: 'Los sistemas que no solo sugieren código, sino que lo ejecutan y corrigen en tiempo real, están cambiando las reglas del juego...',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000',
        prompts: {
            linkedin: 'He publicado nuestro último análisis sobre cómo la personalización por IA está redefiniendo la educación. #SinapCode #IA #EdTech',
            instagram: 'Transformando la educación: El toque personal de la IA. ¡Link en la bio! 🧠✨',
            tiktok: '[Hook]: ¿Cansado de aprender lo mismo que todos? \n[Body]: La IA está personalizando rutas de aprendizaje solo para TI. \n[CTA]: Únete a SinapCode.com!',
            facebook: '¡Revolucionando EdTech! Mira cómo SinapCode utiliza IA para hiper-personalizar el aprendizaje.'
        }
    });

    const handleGenerate = async () => {
        setIsGenerating(true);
        // Simulate AI work
        setTimeout(() => {
            setIsGenerating(false);
            setStep(2);
            toast.success('Contenido sintetizado con éxito');
        }, 2500);
    };

    const handlePublish = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
            loading: 'Publicando en todos los canales vinculados...',
            success: '¡Despliegue Multi-Canal Completado!',
            error: 'Error en la sincronización con TikTok',
        });
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Multi-Step Indicator */}
            <div className="flex items-center justify-between px-10 py-6 glass-4k rounded-full border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-neural-blue/10 transition-all duration-1000" style={{ width: `${(step / 4) * 100}%` }} />
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-3 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= s ? 'bg-neural-blue text-white shadow-[0_0_15px_rgba(25,127,230,0.5)]' : 'bg-white/5 text-platinum-dim border border-white/10'
                            }`}>
                            {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                        </div>
                        <span className={`hidden md:block text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-white' : 'text-platinum-dim opacity-40'}`}>
                            {s === 1 && 'INPUT'}
                            {s === 2 && 'CONTENT'}
                            {s === 3 && 'VISUALS'}
                            {s === 4 && 'DISTRIBUTION'}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-4k p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-center text-center space-y-8"
                    >
                        <div className="w-20 h-20 rounded-3xl bg-neutral-blue/10 border border-neural-blue/20 flex items-center justify-center mb-4">
                            <Brain className="w-10 h-10 text-neural-blue animate-pulse" />
                        </div>
                        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase max-w-xl leading-none">
                            ¿Sobre qué <span className="text-neural-blue">investigamos</span> hoy?_
                        </h2>
                        <div className="w-full max-w-2xl relative">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-xl font-bold text-white outline-none focus:border-neural-blue transition-all"
                                placeholder="Ingresa un tema o tendencia..."
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                                    <Sparkles className="w-5 h-5 text-secondary" />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="px-12 py-5 bg-neural-blue text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] flex items-center gap-4 hover:shadow-[0_0_40px_rgba(25,127,230,0.4)] transition-all disabled:opacity-50"
                        >
                            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
                            {isGenerating ? 'SINTETIZANDO PROTOCOLOS...' : 'INICIAR GENERADOR IA_'}
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {/* Editor View */}
                        <div className="glass-4k p-10 rounded-[3rem] border border-white/5 space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
                                    <Type className="w-5 h-5 text-neural-blue" />
                                    Borrador del Post_
                                </h3>
                                <button className="text-[9px] font-black uppercase text-neural-blue">Regenerar Texto</button>
                            </div>
                            <input
                                className="w-full bg-transparent text-2xl font-black text-white outline-none border-b border-white/10 pb-4"
                                value={generatedPost.title}
                                onChange={(e) => setGeneratedPost({ ...generatedPost, title: e.target.value })}
                            />
                            <textarea
                                className="w-full h-64 bg-transparent text-platinum-dim font-medium leading-relaxed outline-none resize-none"
                                value={generatedPost.content}
                                onChange={(e) => setGeneratedPost({ ...generatedPost, content: e.target.value })}
                            />
                            <div className="flex gap-4">
                                <button onClick={() => setStep(3)} className="flex-1 py-4 bg-neural-blue text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 group">
                                    Siguiente Paso <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Visual Preview */}
                        <div className="space-y-8">
                            <div className="glass-4k p-10 rounded-[3rem] border border-white/5 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
                                        <ImageIcon className="w-5 h-5 text-secondary" />
                                        Visual Estilo Nanobanana_
                                    </h3>
                                    <button className="text-[9px] font-black uppercase text-secondary">Cambiar Estilo</button>
                                </div>
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                    <Image
                                        src={generatedPost.image}
                                        alt="Generated"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 right-6 p-4 glass-4k rounded-xl text-[9px] font-black text-white border border-white/20">
                                        4K ULTRA CINEMATIC
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Protocolo de Distribución Multi-Canal_</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setStep(2)} className="px-6 py-2 bg-white/5 rounded-full text-[9px] font-black uppercase border border-white/5 hover:bg-white/10 transition">Atrás</button>
                                <button onClick={() => setStep(4)} className="px-6 py-2 bg-neural-blue rounded-full text-[9px] font-black uppercase shadow-lg shadow-neural-blue/20 hover:scale-105 transition">Vista Previa Final</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {SOCIAL_CHANNELS.map((channel) => (
                                <div key={channel.id} className="glass-4k p-8 rounded-[2.5rem] border border-white/5 relative group">
                                    <div className={`p-4 rounded-2xl ${channel.bg} mb-6 w-fit`}>
                                        <channel.icon className={`w-6 h-6 ${channel.color}`} />
                                    </div>
                                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">{channel.name}</h4>
                                    <p className="text-[9px] text-platinum-dim font-bold uppercase mb-6 opacity-60">{channel.format}</p>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] text-platinum-dim italic">
                                            {generatedPost.prompts[channel.id as keyof typeof generatedPost.prompts]}
                                        </div>
                                        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase text-white hover:bg-white/10 transition">Editar Copia_</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto glass-4k p-16 rounded-[4rem] border border-white/10 relative overflow-hidden text-center"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neural-blue to-transparent shadow-[0_0_20px_rgba(25,127,230,0.5)]" />

                        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <Send className="w-10 h-10 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </div>

                        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                            Contenido <span className="text-emerald-400">Optimizado</span> y Listo para Despliegue_
                        </h2>

                        <p className="text-platinum-dim font-medium max-w-xl mx-auto mb-12 italic opacity-80 leading-relaxed">
                            NEXUS ha adaptado tu investigación para 4 canales distintos. Las imágenes han sido redimensionadas y los guiones están listos para grabación.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button onClick={() => setStep(3)} className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition">
                                Revisar Adaptaciones_
                            </button>
                            <button onClick={handlePublish} className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-neural-blue hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95">
                                Lanzar Multi-Canal_
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
