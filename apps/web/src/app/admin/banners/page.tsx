'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, BarChart3, Image as ImageIcon, Layout, Clock, MousePointer, Sparkles, Zap, TrendingUp } from 'lucide-react';

import { AdminHeader } from '@/components/admin/header';
import { CreateBannerModal } from '@/components/admin/modals/create-banner-modal';
import { toast } from 'sonner';

export default function BannersPage() {
    const [banners, setBanners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [bannerToEdit, setBannerToEdit] = useState<any>(null);

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/banners');
            const data = await res.json();
            if (data.banners) {
                setBanners(data.banners);
            }
        } catch (error) {
            console.error('Error al obtener banners:', error);
            toast.error('Error cargando recursos gráficos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleEdit = (banner: any) => {
        setBannerToEdit(banner);
        setIsCreateModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Deseas desvincular este recurso del servidor?')) return;
        try {
            const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Recurso eliminado del clúster');
                fetchBanners();
            } else {
                toast.error('Falla en la desvinculación');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error de red');
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
                toast.success(`Protocolo ${!banner.isActive ? 'ACTIVADO' : 'SUSPENDIDO'}`);
            } else {
                toast.error('Error de sincronización');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-10 pb-20 max-w-[1600px] mx-auto overflow-visible">
            {/* Header Area */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gold">
                        <ImageIcon className="w-5 h-5 fill-gold/10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Visual Assets Hub_</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter leading-none uppercase">
                        Gestión de <span className="text-gold italic">Banners_</span>
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={() => { setBannerToEdit(null); setIsCreateModalOpen(true); }}
                        className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-gold hover:text-black transition-all shadow-2xl relative group overflow-hidden"
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo Recurso_
                    </button>
                    <button
                        onClick={() => window.location.href = '/admin/news'}
                        className="flex items-center gap-3 px-8 py-4 bg-neural-blue/10 border border-neural-blue/20 text-neural-blue rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-neural-blue hover:text-white transition-all shadow-xl"
                    >
                        <Zap className="w-4 h-4 fill-current" />
                        Autopilot IA_
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-4k p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-platinum-dim mb-1">Impacto Global</p>
                        <h3 className="text-2xl font-black text-white">1.2M <span className="text-xs text-emerald-400 italic">VISTAS</span></h3>
                    </div>
                    <BarChart3 className="text-white/10 w-10 h-10" />
                </div>
                <div className="glass-4k p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-platinum-dim mb-1">CTR Promedio</p>
                        <h3 className="text-2xl font-black text-white">4.8% <span className="text-xs text-neural-blue italic">+0.4%</span></h3>
                    </div>
                    <TrendingUp className="text-white/10 w-10 h-10" />
                </div>
                <div className="glass-4k p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-platinum-dim mb-1">Banners Activos</p>
                        <h3 className="text-2xl font-black text-white">{banners.filter(b => b.isActive).length} <span className="text-xs text-platinum-dim italic">/ {banners.length}</span></h3>
                    </div>
                    <Layout className="text-white/10 w-10 h-10" />
                </div>
            </div>

            {/* Assets Table */}
            <div className="glass-4k rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                        <input
                            type="text"
                            placeholder="Buscar en el clúster visual..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold text-white focus:border-gold outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['Todo', 'Home', 'Side', 'Promo'].map(f => (
                            <button key={f} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${f === 'Todo' ? 'bg-white/10 text-white' : 'text-platinum-dim hover:bg-white/5'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-platinum-dim">
                                <th className="p-8">Visual Asset</th>
                                <th className="p-8">Despliegue</th>
                                <th className="p-8">Estado</th>
                                <th className="p-8 text-right">Métricas</th>
                                <th className="p-8 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4 animate-pulse">
                                            <div className="w-10 h-10 border-2 border-gold rounded-full border-t-transparent animate-spin" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-platinum-dim">Sincronizando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : banners.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-platinum-dim italic font-medium opacity-40 uppercase tracking-widest text-[10px]">
                                        Clúster visual vacío. Inicia la generación.
                                    </td>
                                </tr>
                            ) : (
                                banners.map((banner) => (
                                    <tr key={banner.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="p-8">
                                            <div className="flex items-center gap-6">
                                                <div className="relative w-40 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500">
                                                    {banner.imageUrl ? (
                                                        <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-surface-dark flex items-center justify-center"><ImageIcon className="opacity-20" /></div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end">
                                                        <span className="text-[8px] font-black text-white/50 uppercase truncate">{banner.title}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white font-black italic uppercase tracking-tighter text-lg">{banner.title}</div>
                                                    <div className="text-[9px] text-platinum-dim font-black uppercase tracking-widest mt-1">ID: {banner.id.slice(0, 8)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest block">{banner.position}</span>
                                                <span className="text-[9px] text-platinum-dim font-bold italic opacity-60">Prioridad Vectorial: {banner.priority || 1}</span>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <button
                                                onClick={() => handleToggleActive(banner)}
                                                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all ${banner.isActive
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                    }`}
                                            >
                                                {banner.isActive ? 'PUBLICADO' : 'BORRADOR'}
                                            </button>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="inline-flex flex-col items-end gap-1">
                                                <div className="flex items-center gap-2 text-white font-black font-mono text-sm leading-none">
                                                    {banner.clicks || 0} <MousePointer className="w-3 h-3 text-gold" />
                                                </div>
                                                <span className="text-[9px] text-platinum-dim font-black uppercase tracking-widest opacity-40">ACCIONES REALES</span>
                                            </div>
                                        </td>
                                        <td className="p-8 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={() => handleEdit(banner)} className="p-3 bg-white/5 hover:bg-neural-blue hover:text-white rounded-xl transition shadow-xl"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(banner.id)} className="p-3 bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl transition shadow-xl"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateBannerModal
                isOpen={isCreateModalOpen}
                onClose={() => { setIsCreateModalOpen(false); setBannerToEdit(null); }}
                onSuccess={fetchBanners}
                bannerToEdit={bannerToEdit}
            />
        </div>
    );
}

