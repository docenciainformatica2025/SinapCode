'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    LayoutGrid,
    ExternalLink,
    Github,
    MoreVertical,
    Archive,
    Trash2,
    Edit3
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { toast } from 'sonner';

import { ProjectModal } from '@/components/admin/project-modal';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/projects');
            const data = await res.json();
            if (data.projects) {
                setProjects(data.projects);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Error cargando proyectos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreate = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    const handleEdit = (project: any) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleSave = async (data: any) => {
        try {
            let res;
            if (selectedProject) {
                // Update
                res = await fetch(`/api/admin/projects/${selectedProject.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                // Create
                res = await fetch('/api/admin/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            if (!res.ok) throw new Error('Failed to save');

            toast.success(selectedProject ? 'Proyecto actualizado' : 'Proyecto creado');
            setIsModalOpen(false);
            fetchProjects(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar proyecto');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar proyecto permanentemente?')) return;

        // Optimistic UI update
        const previousProjects = [...projects];
        setProjects(prev => prev.filter(p => p.id !== id));

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete');
            toast.success('Proyecto eliminado');
        } catch (error) {
            setProjects(previousProjects);
            toast.error('Error al eliminar');
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Portafolio de Proyectos (SQL)"
                description="Gestiona los proyectos mostrados en el showcase público. Todo conectado a base de datos."
            />

            {/* Actions Bar */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                        <input
                            type="text"
                            placeholder="Buscar proyectos por nombre o tag..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                        />
                    </div>

                    <button
                        onClick={handleCreate}
                        className="w-full md:w-auto px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center justify-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Nuevo Proyecto</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        className="glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-neural-blue/50 transition group"
                    >
                        {/* Image Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-[#1a1c25] to-[#0f1117] relative flex items-center justify-center overflow-hidden">
                            {project.thumbnail ? (
                                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                            ) : (
                                <LayoutGrid className="h-10 w-10 text-white/10" />
                            )}

                            <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${project.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' :
                                project.status === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-purple-500/20 text-purple-400'
                                }`}>
                                {project.status}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-bold text-white mb-2 truncate" title={project.title}>{project.title}</h3>
                            <p className="text-sm text-platinum-dim line-clamp-2 mb-4 h-10">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4 h-16 content-start overflow-hidden">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-platinum">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex gap-2">
                                    {project.repoUrl && (
                                        <a href={`https://${project.repoUrl}`} target="_blank" className="p-1.5 hover:bg-white/10 rounded-lg text-platinum-dim hover:text-white transition">
                                            <Github className="h-4 w-4" />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={`https://${project.liveUrl}`} target="_blank" className="p-1.5 hover:bg-white/10 rounded-lg text-platinum-dim hover:text-white transition">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>

                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="p-1.5 hover:bg-neural-blue/20 rounded-lg text-platinum hover:text-neural-blue transition"
                                        title="Editar"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-1.5 hover:bg-rose-500/20 rounded-lg text-platinum hover:text-rose-400 transition"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {!isLoading && filteredProjects.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-platinum-dim mb-4">No hay proyectos encontrados</p>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-neural-blue text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Crear el primero
                    </button>
                </div>
            )}

            {/* Modal */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
                onSave={handleSave}
            />
        </div>
    );
}
