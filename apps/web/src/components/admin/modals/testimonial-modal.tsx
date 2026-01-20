
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MessageSquare, Briefcase, Star, Check } from 'lucide-react';
import { toast } from 'sonner';

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    testimonialToEdit?: any;
}

export function TestimonialModal({ isOpen, onClose, onSuccess, testimonialToEdit }: TestimonialModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        authorName: '',
        authorRole: '',
        authorImage: '',
        content: '',
        rating: 5,
        company: '',
        companyLogo: '',
        status: 'DRAFT',
        featured: false
    });

    useEffect(() => {
        if (testimonialToEdit) {
            setFormData({
                authorName: testimonialToEdit.authorName || '',
                authorRole: testimonialToEdit.authorRole || '',
                authorImage: testimonialToEdit.authorImage || '',
                content: testimonialToEdit.content || '',
                rating: testimonialToEdit.rating || 5,
                company: testimonialToEdit.company || '',
                companyLogo: testimonialToEdit.companyLogo || '',
                status: testimonialToEdit.status || 'DRAFT',
                featured: testimonialToEdit.featured || false
            });
        } else {
            setFormData({
                authorName: '',
                authorRole: '',
                authorImage: '',
                content: '',
                rating: 5,
                company: '',
                companyLogo: '',
                status: 'DRAFT',
                featured: false
            });
        }
    }, [testimonialToEdit, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = testimonialToEdit
                ? `/api/admin/testimonials/${testimonialToEdit.id}`
                : '/api/admin/testimonials';

            const method = testimonialToEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(testimonialToEdit ? 'Testimonio actualizado' : 'Testimonio creado');
                onSuccess();
                onClose();
            } else {
                throw new Error('Error al guardar');
            }
        } catch (error) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

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
                        className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-[#0F1117] border border-white/10 rounded-2xl shadow-2xl z-[101] p-6 lg:p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-gold" />
                                {testimonialToEdit ? 'Editar Testimonio' : 'Nuevo Testimonio'}
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-platinum-dim transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Author Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-3 h-3" /> Nombre del Autor
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.authorName}
                                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition"
                                        placeholder="Ej: Alex Rivera"
                                    />
                                </div>

                                {/* Author Role */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider flex items-center gap-2">
                                        <Briefcase className="w-3 h-3" /> Cargo / Rol
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.authorRole}
                                        onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition"
                                        placeholder="Ej: Senior Frontend Dev"
                                    />
                                </div>

                                {/* Company */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider flex items-center gap-2">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition"
                                        placeholder="Ej: Google, Freelance, etc."
                                    />
                                </div>

                                {/* Rating */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider flex items-center gap-2">
                                        <Star className="w-3 h-3" /> Calificación (1-5)
                                    </label>
                                    <select
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition"
                                    >
                                        {[5, 4, 3, 2, 1].map(n => (
                                            <option key={n} value={n}>{n} Estrellas</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider flex items-center gap-2">
                                    Contenido del Testimonio
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition resize-none"
                                    placeholder="Escribe lo que el usuario dijo sobre SinapCode..."
                                />
                            </div>

                            {/* Author Image URL */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider">
                                    URL Imagen de Perfil (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.authorImage}
                                    onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition"
                                    placeholder="https://ejemplo.com/foto.jpg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-platinum-dim uppercase tracking-wider flex items-center gap-2">
                                        Estado
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition"
                                    >
                                        <option value="DRAFT">Borrador</option>
                                        <option value="PUBLISHED">Publicado</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3 pt-8">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                                        className={`w-6 h-6 rounded border transition-colors flex items-center justify-center ${formData.featured ? 'bg-gold border-gold' : 'bg-black/50 border-white/10'}`}
                                    >
                                        {formData.featured && <Check className="w-4 h-4 text-black" />}
                                    </button>
                                    <span className="text-sm text-white font-medium">Destacado en Home</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full py-4 bg-gold hover:bg-yellow-500 text-black font-bold rounded-xl transition shadow-lg shadow-gold/10 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? 'Guardando...' : testimonialToEdit ? 'Actualizar Testimonio' : 'Crear Testimonio'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
