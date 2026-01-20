'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    Calendar,
    BarChart3,
    Image as ImageIcon,
    Layout,
    Clock,
    MousePointer
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { CreateBannerModal } from '@/components/admin/modals/create-banner-modal';
import { toast } from 'sonner';

export default function BannersPage() {
    const [banners, setBanners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/banners');
            const data = await res.json();
            if (data.banners) {
                setBanners(data.banners);
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
            toast.error('Error cargando banners');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);
    const [bannerToEdit, setBannerToEdit] = useState<any>(null);

    const handleEdit = (banner: any) => {
        setBannerToEdit(banner);
        setIsCreateModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este banner?')) return;
        try {
            const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Banner eliminado correctamente');
                fetchBanners();
            } else {
                toast.error('Error al eliminar banner');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error de conexión');
        }
    };



    const handleToggleActive = async (banner: any) => {
        try {
            const res = await fetch(`/api/admin/banners/${banner.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
            });

            if (res.ok) {
                fetchBanners();
                toast.success(`Banner ${!banner.isActive ? 'activado' : 'desactivado'}`);
            } else {
                toast.error('Error al actualizar estado');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <AdminHeader
                    title="Gestión de Banners"
                    description="Administra banners, promociones y contenido destacado con alto impacto visual"
                />
            </motion.div>

            {/* Actions Bar */}
            <motion.div
                variants={itemVariants}
                className="glass-panel p-6 rounded-2xl border border-white/10 shadow-lg bg-surface/50 backdrop-blur-md"
            >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full md:max-w-md">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim group-focus-within:text-gold transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar banners por título..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-gold/50 outline-none transition-all shadow-inner focus:shadow-neon-amber/20"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3 bg-neural-blue hover:bg-blue-600 text-white rounded-xl font-bold transition shadow-neon-blue flex items-center gap-2 border border-white/10"
                    >
                        <Plus className="h-5 w-5" />
                        Nuevo Banner
                    </motion.button>

                    <CreateBannerModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={fetchBanners}
                    />
                </div>
            </motion.div>

            {/* Banners Table */}
            <motion.div
                variants={itemVariants}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-surface/50 backdrop-blur-md"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left p-6 text-xs font-bold text-platinum-dim uppercase tracking-wider">Banner</th>
                                <th className="text-left p-6 text-xs font-bold text-platinum-dim uppercase tracking-wider">Posición</th>
                                <th className="text-left p-6 text-xs font-bold text-platinum-dim uppercase tracking-wider">Estado</th>
                                <th className="text-left p-6 text-xs font-bold text-platinum-dim uppercase tracking-wider">Tiempo</th>
                                <th className="text-left p-6 text-xs font-bold text-platinum-dim uppercase tracking-wider">KPIs</th>
                                <th className="text-right p-6 text-xs font-bold text-platinum-dim uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center text-platinum-dim">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-neural-blue border-r-transparent"></div>
                                            <span className="text-sm font-medium animate-pulse">Cargando recursos gráficos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : banners.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center text-platinum-dim">
                                        <div className="flex flex-col items-center justify-center gap-4 opacity-50">
                                            <div className="p-6 bg-white/5 rounded-full border border-white/10">
                                                <ImageIcon className="h-10 w-10 text-platinum" />
                                            </div>
                                            <p className="text-white font-medium text-lg">Sin banners activos</p>
                                            <p className="text-sm text-platinum-dim max-w-xs">Crea tu primer banner publicitario para aumentar la conversión.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence>
                                    {banners.map((banner) => (
                                        <motion.tr
                                            key={banner.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-white/10 shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
                                                        {banner.imageUrl ? (
                                                            <img
                                                                src={banner.imageUrl}
                                                                alt={banner.title}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neural-blue/10 to-synapse-purple/10">
                                                                <ImageIcon className="h-6 w-6 text-neural-blue/50" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                                            <span className="text-[10px] text-white font-mono truncate w-full">{banner.title}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold text-sm mb-1">{banner.title}</div>
                                                        <div className="text-[10px] text-platinum-dim font-mono bg-white/5 px-2 py-0.5 rounded-md w-fit">
                                                            ID: {banner.id.slice(0, 8)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 bg-white/5 rounded-lg text-platinum-dim">
                                                        <Layout className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="capitalize text-sm text-white block">{banner.position}</span>
                                                        {banner.priority > 0 && (
                                                            <span className="text-[10px] text-gold font-bold">Prioridad: {banner.priority}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <button
                                                    onClick={() => handleToggleActive(banner)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 flex items-center gap-2 w-fit ${banner.isActive
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:shadow-neon-green'
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:shadow-neon-red'
                                                        }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${banner.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                                                    {banner.isActive ? 'Publicado' : 'Borrador'}
                                                </button>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-xs text-platinum-dim space-y-2">
                                                    <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition">
                                                        <Calendar className="w-3 h-3 text-blue-400" />
                                                        <span>{banner.startDate ? new Date(banner.startDate).toLocaleDateString() : 'Auto-Inicio'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition">
                                                        <Clock className="w-3 h-3 text-purple-400" />
                                                        <span>{banner.endDate ? new Date(banner.endDate).toLocaleDateString() : 'Siempre'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col gap-2 text-xs">
                                                    <div className="flex justify-between items-center group/kpi cursor-help">
                                                        <span className="text-platinum-dim flex items-center gap-1">
                                                            <Eye className="w-3 h-3" /> Vistas
                                                        </span>
                                                        <span className="text-white font-bold font-mono group-hover/kpi:text-blue-400 transition-colors">
                                                            {new Intl.NumberFormat('es-CO', { notation: "compact" }).format(banner.impressions || 0)}
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                                                    </div>

                                                    <div className="flex justify-between items-center mt-1 group/kpi cursor-help">
                                                        <span className="text-platinum-dim flex items-center gap-1">
                                                            <MousePointer className="w-3 h-3" /> Clicks
                                                        </span>
                                                        <span className="text-white font-bold font-mono group-hover/kpi:text-gold transition-colors">
                                                            {new Intl.NumberFormat('es-CO', { notation: "compact" }).format(banner.clicks || 0)}
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-gold rounded-full" style={{ width: '12%' }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => handleEdit(banner)}
                                                        className="p-2 bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-400 rounded-lg transition-all hover:scale-110 shadow-sm"
                                                        title="Editar detalles"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(banner.id)}
                                                        className="p-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg transition-all hover:scale-110 shadow-sm"
                                                        title="Eliminar permanentemente"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}
