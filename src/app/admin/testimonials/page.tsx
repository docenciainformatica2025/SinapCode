'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/header';
import { Plus, Trash2, User, Star } from 'lucide-react';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '', role: '', content: '', avatarUrl: '', rating: 5
    });

    const fetchTestimonials = async () => {
        setIsLoading(true);
        const res = await fetch('/api/admin/testimonials');
        const data = await res.json();
        if (data.testimonials) setTestimonials(data.testimonials);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/admin/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowForm(false);
            setFormData({ name: '', role: '', content: '', avatarUrl: '', rating: 5 });
            fetchTestimonials();
        }
    };

    return (
        <div className="space-y-6">
            <AdminHeader title="Gestión de Testimonios" description="Administra las opiniones de los estudiantes" />

            {/* Actions */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-neural-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Testimonio
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="glass-panel p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="Nombre del Estudiante"
                                className="bg-black/50 border border-white/20 rounded-lg p-3 text-white"
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                            />
                            <input
                                placeholder="Rol (ej. Software Engineer)"
                                className="bg-black/50 border border-white/20 rounded-lg p-3 text-white"
                                value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                        <input
                            placeholder="URL Avatar (opcional)"
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white"
                            value={formData.avatarUrl} onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
                        />
                        <textarea
                            placeholder="Comentario..."
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white h-24"
                            value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required
                        />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-platinum">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                    <div key={t.id} className="glass-panel p-4 rounded-xl border border-white/10 flex gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                            {t.avatarUrl ? (
                                <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-6 h-6 m-3 text-platinum" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-white font-bold">{t.name}</h3>
                                    <p className="text-xs text-platinum-dim">{t.role}</p>
                                </div>
                                <div className="flex text-accent-gold">
                                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                            </div>
                            <p className="text-sm text-muted mt-2 line-clamp-2">{t.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
