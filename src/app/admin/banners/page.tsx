'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit, Trash2, Calendar, BarChart3, Image as ImageIcon } from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { CreateBannerModal } from '@/components/admin/modals/create-banner-modal';

// Data fetching
import { useEffect } from 'react';

export default function BannersPage() {
    const [banners, setBanners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
                fetchBanners();
            } else {
                alert('Error al eliminar');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/banners');
            const data = await response.json();
            if (data.banners) {
                setBanners(data.banners);
            }
        } catch (error) {
            console.error('Failed to fetch banners', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <AdminHeader
                title="Gestión de Banners"
                description="Administra banners, promociones y contenido destacado"
            />

            {/* Actions Bar */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full md:max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-platinum-dim" />
                            <input
                                type="text"
                                placeholder="Buscar banners..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Nuevo Banner
                    </button>

                    <CreateBannerModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={fetchBanners}
                    />
                </div>
            </div>

            {/* Banners Table */}
            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">
                                    Banner
                                </th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">
                                    Posición
                                </th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">
                                    Período
                                </th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">
                                    Performance
                                </th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-platinum-dim">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neural-blue"></div>
                                            <span>Cargando banners...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : banners.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-platinum-dim">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="p-4 bg-white/5 rounded-full">
                                                <ImageIcon className="h-8 w-8 text-neutral-500" />
                                            </div>
                                            <p className="text-white font-medium">No hay banners creados</p>
                                            <p className="text-sm text-neutral-500">Crea el primero para verlo aquí</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                banners.map((banner) => (
                                    <tr key={banner.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-24 h-14 rounded-lg overflow-hidden bg-white/5">
                                                    {banner.imageUrl ? (
                                                        <img
                                                            src={banner.imageUrl}
                                                            alt={banner.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neural-blue/20 to-synapse-purple/20">
                                                            <ImageIcon className="h-6 w-6 text-neural-blue" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{banner.title}</div>
                                                    <div className="text-xs text-platinum-dim font-mono">ID: {banner.id.slice(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="capitalize text-sm text-platinum">{banner.position}</span>
                                                {banner.priority > 0 && (
                                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-neutral-400">P:{banner.priority}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${banner.isActive
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                }`}>
                                                {banner.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-xs text-platinum-dim space-y-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-white/40">Inicio:</span>
                                                    {banner.startDate ? new Date(banner.startDate).toLocaleDateString() : 'Inmediato'}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-white/40">Fin:</span>
                                                    {banner.endDate ? new Date(banner.endDate).toLocaleDateString() : 'Indefinido'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4 text-xs">
                                                <div className="text-center">
                                                    <div className="text-white font-bold">{banner.impressions || 0}</div>
                                                    <div className="text-white/40">Vistas</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-neural-blue font-bold">{banner.clicks || 0}</div>
                                                    <div className="text-white/40">Clicks</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(banner)}
                                                    className="p-2 bg-white/5 hover:bg-neural-blue hover:text-white rounded-lg text-platinum transition"
                                                    title="Editar"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="p-2 bg-white/5 hover:bg-rose-500 hover:text-white rounded-lg text-platinum transition"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
