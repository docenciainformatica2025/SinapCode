'use client';

import { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Github, ExternalLink, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { AIImageGenerator } from '@/components/admin/ai-image-generator';
import { Sparkles } from 'lucide-react';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: any; // If present, edit mode
    onSave: (data: any) => Promise<void>;
}

export function ProjectModal({ isOpen, onClose, project, onSave }: ProjectModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showAIGenerator, setShowAIGenerator] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '', // Can be markdown
        tags: '',
        repoUrl: '',
        liveUrl: '',
        status: 'draft',
        thumbnail: ''
    });

    // Load data for edit
    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                content: project.content || '',
                tags: project.tags?.join(', ') || '',
                repoUrl: project.repoUrl || '',
                liveUrl: project.liveUrl || '',
                status: project.status || 'draft',
                thumbnail: project.thumbnail || ''
            });
        } else {
            // Reset for create
            setFormData({
                title: '',
                description: '',
                content: '',
                tags: '',
                repoUrl: '',
                liveUrl: '',
                status: 'draft',
                thumbnail: ''
            });
        }
    }, [project, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Process tags (comma separated to array)
            const processedData = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
            };
            await onSave(processedData);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
                <div onClick={onClose} className="absolute inset-0" />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-[#0F1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                        <h2 className="text-xl font-bold text-white">
                            {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-platinum-dim hover:text-white transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                        {/* Title & Status Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-platinum">Título</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue focus:ring-1 focus:ring-neural-blue outline-none transition"
                                    placeholder="Ej: Dashboard DeFi"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-platinum">Estado</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue outline-none transition appearance-none cursor-pointer"
                                >
                                    <option value="draft">Borrador</option>
                                    <option value="published">Publicado</option>
                                    <option value="archived">Archivado</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-platinum">Descripción Corta</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue outline-none transition resize-none"
                                placeholder="Resumen breve para la tarjeta del proyecto..."
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-platinum flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-neural-blue" />
                                    URL Imagen (Thumbnail)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowAIGenerator(!showAIGenerator)}
                                    className="text-xs text-gold hover:text-yellow-300 flex items-center gap-1 transition"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    {showAIGenerator ? 'Ocultar AI' : 'Generar con AI'}
                                </button>
                            </div>

                            <input
                                type="url"
                                value={formData.thumbnail}
                                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue outline-none transition"
                                placeholder="https://..."
                            />

                            <AnimatePresence>
                                {showAIGenerator && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-2">
                                            <AIImageGenerator
                                                onImageGenerated={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                                                defaultPrompt={formData.title}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Links Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-platinum flex items-center gap-2">
                                    <Github className="w-4 h-4" />
                                    Repo URL (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.repoUrl}
                                    onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue outline-none transition"
                                    placeholder="github.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-platinum flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo URL (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.liveUrl}
                                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue outline-none transition"
                                    placeholder="demo.com"
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-platinum">Tags (Separados por coma)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-neural-blue outline-none transition"
                                placeholder="React, Next.js, AI, Python..."
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="flex gap-4 pt-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-4 py-3 rounded-lg bg-neural-blue text-white font-bold hover:bg-blue-600 transition shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Guardar Proyecto
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
