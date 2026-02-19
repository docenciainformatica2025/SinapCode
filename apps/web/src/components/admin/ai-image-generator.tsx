'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, RefreshCw, Wand2, Zap } from 'lucide-react';
import { generateImage, type GenerateImageParams } from '@/lib/ai/image-generator';
import { toast } from 'sonner';
import NextImage from 'next/image';

interface AIImageGeneratorProps {
    onImageGenerated: (url: string) => void;
    defaultPrompt?: string;
    className?: string;
}

export function AIImageGenerator({ onImageGenerated, defaultPrompt = '', className = '' }: AIImageGeneratorProps) {
    const [prompt, setPrompt] = React.useState(defaultPrompt);
    const [aspectRatio, setAspectRatio] = React.useState<GenerateImageParams['aspectRatio']>('16:9');
    const [style, setStyle] = React.useState<GenerateImageParams['style']>('cyberpunk');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error('Por favor describe la imagen que deseas generar');
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateImage({
                prompt,
                aspectRatio,
                style
            });
            setGeneratedImage(result.url);
            onImageGenerated(result.url);
            toast.success('¡Imagen generada con éxito!');
        } catch (error) {
            console.error(error);
            toast.error('Error al generar la imagen. Intenta de nuevo.');
        } finally {
            setIsGenerating(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className={`glass-panel-nexus p-8 rounded-[2rem] border border-white/5 space-y-8 ${className}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-[#0df2f2]/5 flex items-center justify-center border border-[#0df2f2]/20 shadow-[0_0_20px_rgba(13,242,242,0.1)]">
                        <Wand2 className="w-6 h-6 text-[#0df2f2]" />
                    </div>
                    <div>
                        <h3 className="text-base font-black text-white tracking-tight uppercase italic">Visual Forge</h3>
                        <p className="text-[9px] text-[#0df2f2]/40 uppercase tracking-[0.3em] font-black">Neural Engine 4.0 Pro</p>
                    </div>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Link Active</span>
                </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-3">
                <label className="text-[10px] text-platinum-dim font-black uppercase tracking-[0.2em] opacity-60">Descripción del prompt</label>
                <div className="relative group">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe la arquitectura visual... ej: Interfaz holográfica 4K, estilo Apple Pro, contrastes infinitos..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-primary/50 outline-none resize-none h-32 transition-all group-hover:border-white/20 italic"
                    />
                    <div className="absolute bottom-4 right-4 text-[9px] text-platinum-dim opacity-30 font-mono tracking-tighter">
                        UTF-8_ENCODED
                    </div>
                </div>
            </div>

            {/* Settings Overlay Grid */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] text-platinum-dim font-black uppercase tracking-[0.2em] opacity-60">Relación de Aspecto</label>
                    <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:border-primary/50 outline-none transition-all cursor-pointer hover:bg-black/60"
                    >
                        <option value="16:9">Wide View (16:9)</option>
                        <option value="1:1">Square Grid (1:1)</option>
                        <option value="4:3">Legacy CRT (4:3)</option>
                        <option value="9:16">Vertical Flow (9:16)</option>
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] text-platinum-dim font-black uppercase tracking-[0.2em] opacity-60">Estética Dinámica_</label>
                    <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value as any)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:border-primary/50 outline-none transition-all cursor-pointer hover:bg-black/60"
                    >
                        <option value="cyberpunk">Nexus / High-Contrast</option>
                        <option value="photorealistic">Apple Studio Realism</option>
                        <option value="3d-render">Unreal Cinematic 5</option>
                        <option value="minimalist">Industrial Minimalist</option>
                        <option value="illustration">Digital Concept Art</option>
                    </select>
                </div>
            </div>

            {/* Generate Button Refined */}
            <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-nexus-main w-full"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sintetizando Neuronas...
                    </>
                ) : (
                    <>
                        <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
                        Ejecutar Generación
                    </>
                )}
            </button>

            {/* Preview Area Refined */}
            <AnimatePresence>
                {generatedImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative rounded-[2rem] overflow-hidden border border-white/10 group mt-6 aspect-video bg-black/60 shadow-2xl"
                    >
                        <NextImage
                            src={generatedImage}
                            alt="AI Generated"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                            <button
                                onClick={handleGenerate}
                                className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-90"
                                title="Regenerar con los mismos parámetros"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <div className="px-6 py-2 bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 backdrop-blur-xl">
                                <CheckCircle2 className="w-4 h-4" />
                                Asset Validado_
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
