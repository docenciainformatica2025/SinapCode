'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Link as LinkIcon, Save, Type, Layout, Calendar, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { AIImageGenerator } from '@/components/admin/ai-image-generator';

interface CreateBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    bannerToEdit?: any; // If provided, mode is EDIT
}

export function CreateBannerModal({ isOpen, onClose, onSuccess, bannerToEdit }: CreateBannerModalProps) {
    const [showAIGenerator, setShowAIGenerator] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        linkUrl: '',
        position: 'HOME_HERO',
        isActive: true,
        order: 0,
        startDate: '',
        endDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (bannerToEdit) {
            setFormData({
                title: bannerToEdit.title || '',
                description: bannerToEdit.description || '',
                imageUrl: bannerToEdit.imageUrl || '',
                linkUrl: bannerToEdit.linkUrl || '',
                position: bannerToEdit.position || 'HOME_HERO',
                isActive: bannerToEdit.isActive ?? true,
                order: bannerToEdit.order || 0,
                startDate: bannerToEdit.startDate ? new Date(bannerToEdit.startDate).toISOString().slice(0, 10) : '',
                endDate: bannerToEdit.endDate ? new Date(bannerToEdit.endDate).toISOString().slice(0, 10) : ''
            });
        } else {
            // Reset form for create mode
            setFormData({
                title: '',
                description: '',
                imageUrl: '',
                linkUrl: '',
                position: 'HOME_HERO',
                isActive: true,
                order: 0,
                startDate: '',
                endDate: ''
            });
        }
    }, [bannerToEdit, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = bannerToEdit
                ? `/api/admin/banners/${bannerToEdit.id}`
                : '/api/admin/banners';

            const method = bannerToEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
                    endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
                    order: Number(formData.order) // Ensure number
                })
            });

            if (!res.ok) throw new Error('Failed to save banner');

            toast.success(bannerToEdit ? 'Banner actualizado' : 'Banner creado');
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar banner');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-[#0F1117] border border-white/10 rounded-2xl shadow-2xl z-[101] p-0"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 sticky top-0 backdrop-blur-md">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-gold" />
                                {bannerToEdit ? 'Editar Banner' : 'Nuevo Banner'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-platinum-dim hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            {/* Title & Description */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Título del Banner</label>
                                    <div className="relative">
                                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neural-blue outline-none transition"
                                            placeholder="Ej: Descuento de Verano 50%"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Descripción (Opcional)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none transition min-h-[80px]"
                                        placeholder="Breve descripción para SEO o subtítulo..."
                                    />
                                </div>
                            </div>

                            {/* Image & Link */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-xs font-bold text-platinum-dim uppercase">URL de Imagen</label>
                                        <button
                                            type="button"
                                            onClick={() => setShowAIGenerator(!showAIGenerator)}
                                            className="text-xs text-gold hover:text-yellow-300 flex items-center gap-1 transition"
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            {showAIGenerator ? 'Ocultar AI' : 'Generar con AI'}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                        <input
                                            type="url"
                                            required
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neural-blue outline-none transition"
                                            placeholder="https://..."
                                        />
                                    </div>

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
                                                        onImageGenerated={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                                                        defaultPrompt={formData.title}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Preview */}
                                    {formData.imageUrl && !showAIGenerator && (
                                        <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-white/10 relative group">
                                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Enlace de Destino</label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                            <input
                                                type="text"
                                                value={formData.linkUrl}
                                                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neural-blue outline-none transition"
                                                placeholder="/cursos/react-mastery"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Posición</label>
                                        <div className="relative">
                                            <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                            <select
                                                value={formData.position}
                                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neural-blue outline-none transition appearance-none"
                                            >
                                                <option value="HOME_HERO">Home Hero (Principal)</option>
                                                <option value="PROMO_BAR">Barra Promocional</option>
                                                <option value="SIDEBAR">Sidebar</option>
                                                <option value="FOOTER">Footer</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Orden</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Scheduling */}
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gold" />
                                    Programación (Opcional)
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-platinum-dim mb-1">Fecha Inicio</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:border-gold outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-platinum-dim mb-1">Fecha Fin</label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:border-gold outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 hover:bg-white/10 rounded-lg text-platinum-dim hover:text-white transition font-bold"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>Guardando...</>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Guardar Banner
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
