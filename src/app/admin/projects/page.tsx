'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/header';
import { Plus, Github, ExternalLink, Code, Save, Loader2, Layout } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '', student: '', role: '', description: '', imageUrl: '', repoUrl: '', demoUrl: '', tags: ''
    });

    const fetchProjects = async () => {
        setIsLoading(true);
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        if (data.projects) setProjects(data.projects);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = formData.tags.split(',').map(t => t.trim());
        const res = await fetch('/api/admin/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, tags: tagsArray })
        });
        if (res.ok) {
            setShowForm(false);
            setFormData({ title: '', student: '', role: '', description: '', imageUrl: '', repoUrl: '', demoUrl: '', tags: '' });
            fetchProjects();
        }
    };

    return (
        <div className="space-y-6">
            <AdminHeader title="Gestión de Proyectos" description="Gestiona los desarrollos subidos por estudiantes" />

            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-neural-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Proyecto
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input placeholder="Título del Proyecto" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <input placeholder="Estudiante" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white" value={formData.student} onChange={e => setFormData({ ...formData, student: e.target.value })} required />
                        </div>
                        <input placeholder="Rol (ej. Backend Dev)" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                        <div>
                            <label className="block text-sm font-medium text-platinum mb-1">Imagen del Proyecto</label>
                            <ImageUpload
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input placeholder="Repo URL (GitHub)" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white" value={formData.repoUrl} onChange={e => setFormData({ ...formData, repoUrl: e.target.value })} />
                            <input placeholder="Demo/Download URL" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white" value={formData.demoUrl} onChange={e => setFormData({ ...formData, demoUrl: e.target.value })} />
                        </div>
                        <input placeholder="Tags (separados por coma)" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                        <textarea placeholder="Descripción..." className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-platinum">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold">Publicar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <div key={p.id} className="glass-panel rounded-xl border border-white/10 overflow-hidden group">
                        <div className="h-40 bg-white/5 relative">
                            {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-bold">{p.title}</h3>
                            <p className="text-xs text-primary mb-2">{p.student} - {p.role}</p>
                            <p className="text-sm text-muted line-clamp-2">{p.description}</p>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5 justify-end">
                                {p.repoUrl && <a href={p.repoUrl} target="_blank" className="text-platinum hover:text-white"><Github className="w-4 h-4" /></a>}
                                {p.demoUrl && <a href={p.demoUrl} target="_blank" className="text-platinum hover:text-white"><ExternalLink className="w-4 h-4" /></a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
