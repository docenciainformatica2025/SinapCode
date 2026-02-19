'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { generateImage, type GenerateImageParams } from '@/lib/ai/image-generator';
import { toast } from 'sonner';

interface AIImageGeneratorProps {
    onImageGenerated: (url: string) => void;
    defaultPrompt?: string;
    className?: string;
}

export function AIImageGenerator({ onImageGenerated, defaultPrompt = '', className = '' }: AIImageGeneratorProps) {
    const [prompt, setPrompt] = useState(defaultPrompt);
    const [aspectRatio, setAspectRatio] = useState<GenerateImageParams['aspectRatio']>('16:9');
    const [style, setStyle] = useState<GenerateImageParams['style']>('cyberpunk');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

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
            onImageGenerated(result.url); // Pass back to parent form
            toast.success('¡Imagen generada con éxito!');
        } catch (error) {
            console.error(error);
            toast.error('Error al generar la imagen. Intenta de nuevo.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                <h3 className="text-sm font-bold text-white">Nanobanana AI Image Gen</h3>
            </div>

            {/* Prompt Input */}
            <div className="space-y-2">
                <label className="text-xs text-platinum-dim font-medium">Descripción (Prompt)</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe la imagen... ej: Un robot futurista programando en una ciudad neon..."
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-gold/50 outline-none resize-none h-24 transition"
                />
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs text-platinum-dim font-medium">Relación de Aspecto</label>
                    <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-gold/50 outline-none"
                    >
                        <option value="16:9">Panorámica (16:9)</option>
                        <option value="1:1">Cuadrada (1:1)</option>
                        <option value="4:3">Estándar (4:3)</option>
                        <option value="9:16">Vertical (Story)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-platinum-dim font-medium">Estilo Artístico</label>
                    <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value as any)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-gold/50 outline-none"
                    >
                        <option value="cyberpunk">Cyberpunk / Neon</option>
                        <option value="photorealistic">Fotorealista</option>
                        <option value="3d-render">Render 3D</option>
                        <option value="minimalist">Minimalista</option>
                        <option value="illustration">Ilustración Digital</option>
                    </select>
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-gradient-to-r from-gold/80 to-orange-500/80 hover:from-gold hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generando Magia...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Generar Imagen
                    </>
                )}
            </button>

            {/* Preview Area */}
            <AnimatePresence>
                {generatedImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative rounded-xl overflow-hidden border border-white/10 group mt-4 aspect-video bg-black/50"
                    >
                        <img
                            src={generatedImage}
                            alt="AI Generated"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                            <button
                                onClick={handleGenerate}
                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition"
                                title="Regenerar"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <div className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Lista para usar
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
