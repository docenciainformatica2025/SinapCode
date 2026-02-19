'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MessageSquare, Star, Edit, Trash2, Quote, CheckCircle2, Circle } from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { TestimonialModal } from '@/components/admin/modals/testimonial-modal';
import { toast } from 'sonner';

interface Testimonial {
    id: string;
    authorName: string;
    authorRole: string;
    authorImage?: string;
    content: string;
    rating: number;
    company?: string;
    companyLogo?: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    featured: boolean;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testimonialToEdit, setTestimonialToEdit] = useState<Testimonial | null>(null);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/testimonials');
            const data = await res.json();
            if (data.testimonials) setTestimonials(data.testimonials);
        } catch (error) {
            toast.error('Error cargando testimonios');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este testimonio?')) return;
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Testimonio eliminado');
                fetchTestimonials();
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const handleSeed = async () => {
        try {
            const res = await fetch('/api/admin/seed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'testimonials' })
            });
            if (res.ok) {
                toast.success('Testimonios de ejemplo generados');
                fetchTestimonials();
            }
        } catch (error) {
            toast.error('Error al generar ejemplos');
        }
    };

    const filteredTestimonials = testimonials.filter(t =>
        t.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Gestión de Testimonios"
                description="Administra lo que tus estudiantes dicen sobre SinapCode"
                action={{
                    label: 'Nuevo Testimonio',
                    onClick: () => {
                        setTestimonialToEdit(null);
                        setIsModalOpen(true);
                    }
                }}
            />

            {/* Actions Bar */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full md:max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                            <input
                                type="text"
                                placeholder="Buscar testimonios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold outline-none transition"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="p-20 text-center animate-pulse text-white">Cargando Testimonios...</div>
            ) : testimonials.length === 0 ? (
                <div className="glass-panel p-12 rounded-xl border border-white/10 text-center">
                    <Quote className="h-16 w-16 text-platinum-dim mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">No hay testimonios</h3>
                    <p className="text-platinum-dim mb-6">Comienza creando uno nuevo o genera unos de ejemplo.</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 bg-gold hover:bg-yellow-500 text-black font-bold rounded-lg transition"
                        >
                            Crear Testimonio
                        </button>
                        <button
                            onClick={handleSeed}
                            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition"
                        >
                            Generar Ejemplos
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTestimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-6 rounded-xl border border-white/10 relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-black font-bold text-xl">
                                        {t.authorName[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{t.authorName}</h3>
                                        <p className="text-xs text-platinum-dim">{t.authorRole} {t.company ? `@ ${t.company}` : ''}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => {
                                            setTestimonialToEdit(t);
                                            setIsModalOpen(true);
                                        }}
                                        className="p-2 hover:bg-white/10 rounded-lg text-platinum-dim hover:text-white"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-400 hover:text-rose-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < t.rating ? 'fill-gold text-gold' : 'text-white/10'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-platinum-dim text-sm italic mb-6">
                                "{t.content}"
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    {t.status === 'PUBLISHED' ? (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase">
                                            <CheckCircle2 className="w-3 h-3" /> Publicado
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-platinum-dim bg-white/5 px-2 py-0.5 rounded uppercase">
                                            <Circle className="w-3 h-3" /> Borrador
                                        </span>
                                    )}
                                </div>
                                {t.featured && (
                                    <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded uppercase">
                                        Destacado
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <TestimonialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchTestimonials}
                testimonialToEdit={testimonialToEdit}
            />
        </div>
    );
}
