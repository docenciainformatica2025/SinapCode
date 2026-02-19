'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen, Users, TrendingUp, Star, Edit, Trash2 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { CreateProgramModal } from '@/components/admin/modals/create-program-modal';
import { AICourseArchitect } from '@/components/admin/content/ai-course-architect';

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState('all');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [programToEdit, setProgramToEdit] = useState<any>(null);

    const [activeTab, setActiveTab] = useState<'manage' | 'architect'>('manage');

    const handleEdit = (program: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setProgramToEdit(program);
        setIsCreateModalOpen(true);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('¿Estás seguro de eliminar este programa?')) return;

        try {
            const res = await fetch(`/api/admin/programs/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchPrograms();
            } else {
                alert('Error al eliminar');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPrograms = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/programs');
            const data = await response.json();
            if (data.programs) {
                setPrograms(data.programs);
            }
        } catch (error) {
            console.error('Error al obtener programas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <AdminHeader
                title="Sistemas de Gestión de Cursos"
                description="Administra el catálogo educativo o utiliza la IA para arquitecturar nuevos programas."
            />

            {/* View Switcher */}
            <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('manage')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-primary text-white shadow-neon-blue' : 'text-platinum-dim hover:text-white'
                        }`}
                >
                    Gestión de Catálogo
                </button>
                <button
                    onClick={() => setActiveTab('architect')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'architect' ? 'bg-primary text-white shadow-neon-blue' : 'text-platinum-dim hover:text-white'
                        }`}
                >
                    AI Course Architect
                </button>
            </div>

            {activeTab === 'architect' ? (
                <AICourseArchitect />
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Actions Bar */}
                    <div className="glass-panel p-6 rounded-xl border border-white/10">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="flex-1 w-full md:max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                                    <input
                                        type="text"
                                        placeholder="Buscar programas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-3 w-full md:w-auto">
                                <select
                                    value={filterLevel}
                                    onChange={(e) => setFilterLevel(e.target.value)}
                                    className="px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                                >
                                    <option value="all">Todos los Niveles</option>
                                    <option value="beginner">Principiante</option>
                                    <option value="intermediate">Intermedio</option>
                                    <option value="advanced">Avanzado</option>
                                </select>

                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center gap-2">
                                    <Plus className="h-5 w-5" />
                                    <span className="hidden md:inline">Nuevo Programa</span>
                                </button>

                                <CreateProgramModal
                                    isOpen={isCreateModalOpen}
                                    onClose={() => {
                                        setIsCreateModalOpen(false);
                                        setProgramToEdit(null);
                                    }}
                                    onSuccess={fetchPrograms}
                                    programToEdit={programToEdit}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="glass-panel p-6 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-platinum-dim text-sm">Total Programas</span>
                                <BookOpen className="h-5 w-5 text-neural-blue" />
                            </div>
                            <div className="text-3xl font-bold text-white">24</div>
                            <div className="text-xs text-emerald-400 mt-1">+3 este mes</div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-platinum-dim text-sm">Estudiantes</span>
                                <Users className="h-5 w-5 text-synapse-purple" />
                            </div>
                            <div className="text-3xl font-bold text-white">5,234</div>
                            <div className="text-xs text-emerald-400 mt-1">+12% vs mes anterior</div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-platinum-dim text-sm">Tasa Completación</span>
                                <TrendingUp className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div className="text-3xl font-bold text-white">78%</div>
                            <div className="text-xs text-emerald-400 mt-1">+5% vs mes anterior</div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-platinum-dim text-sm">Rating Promedio</span>
                                <Star className="h-5 w-5 text-accent-gold" />
                            </div>
                            <div className="text-3xl font-bold text-white">4.7</div>
                            <div className="text-xs text-platinum-dim mt-1">De 1,234 reviews</div>
                        </div>
                    </div>

                    {/* Programs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            <div className="col-span-3 text-center py-12 text-platinum-dim">
                                Cargando programas...
                            </div>
                        ) : programs.map((program) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel rounded-xl border border-white/10 overflow-hidden hover:border-neural-blue/50 transition-all cursor-pointer group"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-video bg-gradient-to-br from-neural-blue/20 to-synapse-purple/20 flex items-center justify-center">
                                    <BookOpen className="h-12 w-12 text-neural-blue" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-white font-bold text-lg group-hover:text-neural-blue transition-colors">
                                            {program.title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${program.is_published
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {program.is_published ? 'Publicado' : 'Borrador'}
                                        </span>
                                    </div>

                                    <p className="text-platinum-dim text-sm mb-4 line-clamp-2">
                                        {program.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-platinum-dim">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{program.enrolled_count || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-accent-gold" />
                                            <span>{program.rating || 'N/A'}</span>
                                        </div>
                                        <div className="ml-auto text-white font-bold">
                                            ${program.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Group - Always visible for better UX */}
                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/5 p-6">
                                    <button
                                        onClick={(e) => handleEdit(program, e)}
                                        className="p-2 bg-white/5 hover:bg-neural-blue/20 rounded-lg text-platinum hover:text-white transition"
                                        title="Editar"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(program.id, e)}
                                        className="p-2 bg-white/5 hover:bg-rose-500/20 rounded-lg text-platinum hover:text-rose-400 transition"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State (si no hay programas) */}
                    {!isLoading && programs.length === 0 && (
                        <div className="col-span-full glass-panel p-12 rounded-xl border border-white/10 text-center">
                            <BookOpen className="h-16 w-16 text-platinum-dim mx-auto mb-4" />
                            <h3 className="text-white font-bold text-xl mb-2">No hay programas</h3>
                            <p className="text-platinum-dim mb-6">
                                Comienza creando tu primer programa educativo o carga uno de ejemplo.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="px-6 py-3 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue">
                                    Crear Primer Programa
                                </button>
                                <button
                                    onClick={async () => {
                                        const res = await fetch('/api/admin/seed', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ type: 'courses' })
                                        });
                                        if (res.ok) {
                                            const data = await res.json();
                                            alert('Curso de ejemplo generado!');
                                            fetchPrograms();
                                        } else {
                                            alert('Error al generar curso');
                                        }
                                    }}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold transition border border-white/10">
                                    Generar Curso de Ejemplo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
