'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutTemplate,
    Palette,
    Menu,
    Globe,
    Save,
    Upload,
    GripVertical,
    Plus,
    Trash2
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { toast } from 'sonner';

export default function SiteEditorPage() {
    const [activeTab, setActiveTab] = useState<'identity' | 'navigation'>('identity');
    const [config, setConfig] = useState<any>({});
    const [menus, setMenus] = useState<any>({ header: [], footer: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [configRes, navRes] = await Promise.all([
                fetch('/api/admin/site-config'),
                fetch('/api/admin/navigation')
            ]);

            const configData = await configRes.json();
            const navData = await navRes.json();

            setConfig(configData);
            if (navData.menus) {
                setMenus(navData.menus);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error cargando configuración');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveConfig = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/site-config', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) toast.success('Identidad guardada');
            else throw new Error();
        } catch (error) {
            toast.error('Error al guardar');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveMenu = async (location: string, items: any[]) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/navigation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, items })
            });
            if (res.ok) toast.success('Menú actualizado');
            else throw new Error();
        } catch (error) {
            toast.error('Error al guardar menú');
        } finally {
            setIsSaving(false);
        }
    };

    const addMenuItem = (location: string) => {
        const newItems = [...(menus[location] || [])];
        newItems.push({ label: 'Nuevo Link', href: '/' });
        setMenus({ ...menus, [location]: newItems });
    };

    const updateMenuItem = (location: string, index: number, field: string, value: string) => {
        const newItems = [...(menus[location] || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        setMenus({ ...menus, [location]: newItems });
    };

    const removeMenuItem = (location: string, index: number) => {
        const newItems = [...(menus[location] || [])];
        newItems.splice(index, 1);
        setMenus({ ...menus, [location]: newItems });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-white">Cargando Editor...</div>;

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <AdminHeader
                title="Editor del Sitio"
                description="Gestiona la identidad visual y navegación global"
            />

            {/* Tabs */}
            <div className="flex border-b border-white/10 space-x-6">
                <button
                    onClick={() => setActiveTab('identity')}
                    className={`pb-4 text-sm font-bold transition relative ${activeTab === 'identity' ? 'text-neural-blue' : 'text-platinum-dim hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Identidad Visual
                    </div>
                    {activeTab === 'identity' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-neural-blue" />}
                </button>
                <button
                    onClick={() => setActiveTab('navigation')}
                    className={`pb-4 text-sm font-bold transition relative ${activeTab === 'navigation' ? 'text-gold' : 'text-platinum-dim hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Menu className="w-4 h-4" /> Navegación
                    </div>
                    {activeTab === 'navigation' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />}
                </button>
            </div>

            {/* CONTENT */}
            <div className="min-h-[400px]">
                {activeTab === 'identity' && (
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-neural-blue" />
                                Información General
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Nombre del Sitio</label>
                                <input
                                    type="text"
                                    value={config.siteName || ''}
                                    onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Descripción (SEO)</label>
                                <textarea
                                    value={config.description || ''}
                                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none transition min-h-[100px]"
                                />
                            </div>

                            <button
                                onClick={handleSaveConfig}
                                disabled={isSaving}
                                className="w-full py-3 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Palette className="w-5 h-5 text-gold" />
                                Branding y Colores
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Logo URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={config.logoUrl || ''}
                                        onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-gold outline-none transition"
                                        placeholder="https://..."
                                    />
                                </div>
                                {config.logoUrl && (
                                    <div className="mt-4 p-4 bg-white/5 rounded-lg flex justify-center border border-white/5">
                                        <img src={config.logoUrl} alt="Logo Preview" className="h-10 object-contain" />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Color Primario</label>
                                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
                                        <div className="w-8 h-8 rounded border border-white/20" style={{ backgroundColor: config.primaryColor }} />
                                        <input
                                            type="text"
                                            value={config.primaryColor || ''}
                                            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                                            className="w-full bg-transparent text-white outline-none text-sm uppercase font-mono"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Color Secundario</label>
                                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg p-2">
                                        <div className="w-8 h-8 rounded border border-white/20" style={{ backgroundColor: config.secondaryColor }} />
                                        <input
                                            type="text"
                                            value={config.secondaryColor || ''}
                                            onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                                            className="w-full bg-transparent text-white outline-none text-sm uppercase font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'navigation' && (
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Header Menu */}
                        <div className="glass-panel p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <LayoutTemplate className="w-5 h-5 text-neural-blue" />
                                    Menú Principal (Header)
                                </h3>
                                <button
                                    onClick={() => handleSaveMenu('header', menus.header)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition flex items-center gap-2 border border-white/10"
                                >
                                    <Save className="w-4 h-4" /> Guardar Menú
                                </button>
                            </div>

                            <div className="space-y-2">
                                {(menus.header || []).map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5 group hover:border-neural-blue/30 transition">
                                        <GripVertical className="w-5 h-5 text-platinum-dim cursor-grab hover:text-white" />
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => updateMenuItem('header', idx, 'label', e.target.value)}
                                            className="bg-transparent border-b border-white/10 focus:border-neural-blue text-white outline-none px-2 py-1 w-1/3 transition"
                                            placeholder="Etiqueta"
                                        />
                                        <input
                                            type="text"
                                            value={item.href}
                                            onChange={(e) => updateMenuItem('header', idx, 'href', e.target.value)}
                                            className="bg-transparent border-b border-white/10 focus:border-neural-blue text-platinum-dim outline-none px-2 py-1 w-1/3 font-mono text-sm transition"
                                            placeholder="/ruta"
                                        />
                                        <div className="flex-1" />
                                        <button
                                            onClick={() => removeMenuItem('header', idx)}
                                            className="p-2 hover:bg-rose-500/20 rounded-lg text-platinum-dim hover:text-rose-400 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={() => addMenuItem('header')}
                                    className="w-full py-3 border-2 border-dashed border-white/10 rounded-lg text-platinum-dim hover:text-white hover:border-white/20 transition flex items-center justify-center gap-2 mt-4"
                                >
                                    <Plus className="w-4 h-4" /> Añadir Item
                                </button>
                            </div>
                        </div>

                        {/* Footer Menu */}
                        <div className="glass-panel p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <LayoutTemplate className="w-5 h-5 text-gold" />
                                    Menú Footer
                                </h3>
                                <button
                                    onClick={() => handleSaveMenu('footer', menus.footer)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition flex items-center gap-2 border border-white/10"
                                >
                                    <Save className="w-4 h-4" /> Guardar Menú
                                </button>
                            </div>

                            <div className="space-y-2">
                                {(menus.footer || []).map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5 group hover:border-gold/30 transition">
                                        <GripVertical className="w-5 h-5 text-platinum-dim cursor-grab hover:text-white" />
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => updateMenuItem('footer', idx, 'label', e.target.value)}
                                            className="bg-transparent border-b border-white/10 focus:border-gold text-white outline-none px-2 py-1 w-1/3 transition"
                                            placeholder="Etiqueta"
                                        />
                                        <input
                                            type="text"
                                            value={item.href}
                                            onChange={(e) => updateMenuItem('footer', idx, 'href', e.target.value)}
                                            className="bg-transparent border-b border-white/10 focus:border-gold text-platinum-dim outline-none px-2 py-1 w-1/3 font-mono text-sm transition"
                                            placeholder="/ruta"
                                        />
                                        <div className="flex-1" />
                                        <button
                                            onClick={() => removeMenuItem('footer', idx)}
                                            className="p-2 hover:bg-rose-500/20 rounded-lg text-platinum-dim hover:text-rose-400 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={() => addMenuItem('footer')}
                                    className="w-full py-3 border-2 border-dashed border-white/10 rounded-lg text-platinum-dim hover:text-white hover:border-white/20 transition flex items-center justify-center gap-2 mt-4"
                                >
                                    <Plus className="w-4 h-4" /> Añadir Item
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
