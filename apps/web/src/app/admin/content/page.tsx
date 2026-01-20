'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    FileText,
    Calendar,
    Eye,
    ThumbsUp,
    MessageSquare,
    Edit,
    Trash2
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { toast } from 'sonner';

// Mock Data for Content
const MOCK_CONTENT = [
    {
        id: '1',
        title: 'Introducción a React 19: Lo Nuevo',
        excerpt: 'Descubre las nuevas características del framework más popular.',
        author: 'Antonio Burgos',
        status: 'published',
        category: 'Tecnología',
        views: 1250,
        likes: 45,
        publishedAt: '2025-12-15T10:00:00Z',
        image: '/blog/react19.jpg'
    },
    {
        id: '2',
        title: 'Guía de Seguridad Web 2026',
        excerpt: 'Protege tus aplicaciones contra las últimas amenazas de ciberseguridad.',
        author: 'Security Team',
        status: 'draft',
        category: 'Seguridad',
        views: 0,
        likes: 0,
        publishedAt: null,
        image: '/blog/security.jpg'
    },
    {
        id: '3',
        title: 'Optimización de Next.js para SEO',
        excerpt: 'Estrategias avanzadas para posicionar tu web en los primeros lugares.',
        author: 'SEO Expert',
        status: 'published',
        category: 'Marketing',
        views: 3420,
        likes: 120,
        publishedAt: '2025-11-20T14:30:00Z',
        image: '/blog/seo.jpg'
    }
];

export default function ContentPage() {
    const [contents, setContents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/content');
            const data = await res.json();
            if (data.posts) {
                setContents(data.posts);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            toast.error('Error cargando contenido');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('¿Eliminar este contenido permanentemente?')) {
            setContents(prev => prev.filter(c => c.id !== id));
            toast.success('Contenido eliminado correctamente');
        }
    };

    const handleToggleStatus = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        setContents(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        toast.success(`Contenido ${newStatus === 'published' ? 'publicado' : 'retirado'} exitosamente`);
    };

    const filteredContent = contents.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

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
                title="Gestión de Contenido (CMS)"
                description="Blog, Noticias y Recursos Públicos"
            />

            {/* Actions Bar */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="flex-1 w-full md:max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                            <input
                                type="text"
                                placeholder="Buscar artículos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Filters & Actions */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                        >
                            <option value="all">Todos los Estados</option>
                            <option value="published">Publicados</option>
                            <option value="draft">Borradores</option>
                        </select>

                        <button
                            className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            <span className="hidden md:inline">Crear Artículo</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                {isLoading ? (
                    <div className="text-center py-20 text-platinum-dim animate-pulse">Cargando cms...</div>
                ) : filteredContent.length === 0 ? (
                    <div className="glass-panel p-12 text-center border border-white/10 rounded-xl">
                        <FileText className="w-16 h-16 text-platinum-dim mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-white mb-2">No se encontró contenido</h3>
                        <p className="text-platinum-dim">Prueba ajustando los filtros de búsqueda</p>
                    </div>
                ) : (
                    filteredContent.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="glass-panel p-4 rounded-xl border border-white/10 hover:border-neural-blue/30 transition group"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Thumbnail Placeholder */}
                                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center shrink-0">
                                    <FileText className="w-8 h-8 text-white/20" />
                                </div>

                                <div className="flex-1 py-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-neural-blue uppercase tracking-wider">{item.category}</span>
                                                <span className="text-platinum-dim text-xs">•</span>
                                                <span className="text-platinum-dim text-xs flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Sin publicar'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-neural-blue transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'published'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {item.status === 'published' ? 'Publicado' : 'Borrador'}
                                        </div>
                                    </div>

                                    <p className="text-platinum-dim text-sm mb-4 line-clamp-2">
                                        {item.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-4 text-sm text-platinum-dim">
                                            <div className="flex items-center gap-1" title="Vistas">
                                                <Eye className="w-4 h-4" /> {item.views}
                                            </div>
                                            <div className="flex items-center gap-1" title="Me gusta">
                                                <ThumbsUp className="w-4 h-4" /> {item.likes}
                                            </div>
                                            <div className="text-xs">
                                                Por: <span className="text-white">{item.author}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleToggleStatus(item.id, item.status)}
                                                className={`p-2 rounded-lg transition ${item.status === 'published'
                                                    ? 'hover:bg-amber-500/20 text-platinum hover:text-amber-400'
                                                    : 'hover:bg-emerald-500/20 text-platinum hover:text-emerald-400'
                                                    }`}
                                                title={item.status === 'published' ? 'Mover a Borrador' : 'Publicar'}
                                            >
                                                {item.status === 'published' ? <Eye className="w-4 h-4" /> : <ThumbsUp className="w-4 h-4" />}
                                            </button>
                                            <button className="p-2 hover:bg-neural-blue/20 rounded-lg text-platinum hover:text-neural-blue transition">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 hover:bg-rose-500/20 rounded-lg text-platinum hover:text-rose-400 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
}
