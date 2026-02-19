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
    Trash2,
    Cpu,
    Layers,
    Zap,
    Info,
    ArrowRight
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { toast } from 'sonner';
import { FALLBACK_HERO, FALLBACK_PROCESS } from '@/lib/landing-data';

interface SiteConfig {
    siteName: string;
    logoUrl?: string;
    faviconUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    description?: string;
}

interface MenuItem {
    label: string;
    href: string;
}

interface NavMenus {
    header: MenuItem[];
    footer: MenuItem[];
    [key: string]: MenuItem[];
}

export default function SiteEditorPage() {
    const [activeTab, setActiveTab] = useState<'identity' | 'navigation' | 'home_engine'>('identity');
    const [config, setConfig] = useState<any>({});
    const [menus, setMenus] = useState<NavMenus>({ header: [], footer: [] });
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
                <button
                    onClick={() => setActiveTab('home_engine')}
                    className={`pb-4 text-sm font-bold transition relative ${activeTab === 'home_engine' ? 'text-primary' : 'text-platinum-dim hover:text-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> Home Engine
                    </div>
                    {activeTab === 'home_engine' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
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
                                Branding — Logo & Banner
                            </h3>

                            {/* Logo Upload */}
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Logo del Sitio</label>
                                <div className="p-6 bg-black/40 rounded-xl border-2 border-dashed border-white/10 hover:border-gold/40 transition-all text-center group">
                                    <div className="mb-4 flex justify-center">
                                        <img
                                            src="/branding/Logo.png"
                                            alt="Logo actual"
                                            className="h-20 w-auto object-contain"
                                            onError={(e) => { (e.target as any).style.display = 'none'; }}
                                        />
                                    </div>
                                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg text-sm font-bold transition">
                                        <Upload className="w-4 h-4" />
                                        Cambiar Logo
                                        <input
                                            type="file"
                                            accept="image/png,image/svg+xml,image/webp"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const formData = new FormData();
                                                formData.append('file', file);
                                                formData.append('type', 'logo');
                                                try {
                                                    const res = await fetch('/api/admin/upload-branding', { method: 'POST', body: formData });
                                                    if (res.ok) {
                                                        toast.success('Logo actualizado — recarga la página para ver los cambios');
                                                        setConfig({ ...config, logoUrl: '/branding/Logo.png?v=' + Date.now() });
                                                    } else throw new Error();
                                                } catch { toast.error('Error subiendo logo'); }
                                            }}
                                        />
                                    </label>
                                    <p className="text-[10px] text-platinum-dim mt-2 italic">PNG, SVG o WebP • Fondo transparente recomendado</p>
                                </div>
                            </div>

                            {/* Banner Upload */}
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Banner Principal (Hero)</label>
                                <div className="p-4 bg-black/40 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/40 transition-all text-center group">
                                    <div className="mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src="/branding/hero-banner.png"
                                            alt="Banner actual"
                                            className="w-full h-32 object-cover rounded-lg"
                                            onError={(e) => { (e.target as any).style.display = 'none'; }}
                                        />
                                    </div>
                                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm font-bold transition">
                                        <Upload className="w-4 h-4" />
                                        Cambiar Banner
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const formData = new FormData();
                                                formData.append('file', file);
                                                formData.append('type', 'banner');
                                                try {
                                                    const res = await fetch('/api/admin/upload-branding', { method: 'POST', body: formData });
                                                    if (res.ok) toast.success('Banner actualizado — recarga para ver los cambios');
                                                    else throw new Error();
                                                } catch { toast.error('Error subiendo banner'); }
                                            }}
                                        />
                                    </label>
                                    <p className="text-[10px] text-platinum-dim mt-2 italic">1920×1080px mínimo • PNG, JPG o WebP</p>
                                </div>
                            </div>

                            {/* Favicon Upload */}
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Favicon (Icono del navegador)</label>
                                <div className="p-4 bg-black/40 rounded-xl border-2 border-dashed border-white/10 hover:border-secondary/40 transition-all text-center group">
                                    <div className="mb-3 flex justify-center items-center gap-4">
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                            <img
                                                src="/favicon.png"
                                                alt="Favicon actual"
                                                className="h-8 w-8 object-contain"
                                                onError={(e) => { (e.target as any).src = '/favicon.ico'; }}
                                            />
                                        </div>
                                        <span className="text-xs text-platinum-dim">Favicon actual</span>
                                    </div>
                                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg text-sm font-bold transition">
                                        <Upload className="w-4 h-4" />
                                        Cambiar Favicon
                                        <input
                                            type="file"
                                            accept="image/png,image/x-icon,image/svg+xml"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const formData = new FormData();
                                                formData.append('file', file);
                                                formData.append('type', 'favicon');
                                                try {
                                                    const res = await fetch('/api/admin/upload-branding', { method: 'POST', body: formData });
                                                    if (res.ok) toast.success('Favicon actualizado — recarga para ver los cambios');
                                                    else throw new Error();
                                                } catch { toast.error('Error subiendo favicon'); }
                                            }}
                                        />
                                    </label>
                                    <p className="text-[10px] text-platinum-dim mt-2 italic">PNG cuadrado recomendado • 512×512px ideal</p>
                                </div>
                            </div>

                            {/* Colors */}
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

                {activeTab === 'home_engine' && (
                    <motion.div variants={itemVariants} className="space-y-12">
                        {/* Hero Editor */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-8 bg-surface/50 backdrop-blur-xl">
                            <h3 className="text-xl font-black text-white flex items-center gap-3 italic tracking-tight">
                                <Zap className="w-6 h-6 text-primary animate-pulse" />
                                HERO CONFIGURATION_
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Headline Principal (H1)</label>
                                        <input
                                            type="text"
                                            value={config.socialLinks?.hero?.title || FALLBACK_HERO.title}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                socialLinks: {
                                                    ...config.socialLinks,
                                                    hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), title: e.target.value }
                                                }
                                            })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition font-bold"
                                            placeholder="Ej: DOMINA EL CÓDIGO_"
                                        />
                                        <p className="text-[9px] text-platinum-dim mt-1 italic opacity-60">* Usa el guion bajo `_` al final para el estilo SinapCode.</p>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Subheadline (Tag)</label>
                                        <input
                                            type="text"
                                            value={config.socialLinks?.hero?.subtitle || FALLBACK_HERO.subtitle}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                socialLinks: {
                                                    ...config.socialLinks,
                                                    hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), subtitle: e.target.value }
                                                }
                                            })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition font-mono text-xs uppercase"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Descripción Corta</label>
                                        <textarea
                                            value={config.socialLinks?.hero?.description || FALLBACK_HERO.description}
                                            onChange={(e) => setConfig({
                                                ...config,
                                                socialLinks: {
                                                    ...config.socialLinks,
                                                    hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), description: e.target.value }
                                                }
                                            })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition min-h-[100px] text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Texto CTA Primario</label>
                                            <input
                                                type="text"
                                                value={config.socialLinks?.hero?.primaryCtaText || FALLBACK_HERO.primaryCtaText}
                                                onChange={(e) => setConfig({
                                                    ...config,
                                                    socialLinks: {
                                                        ...config.socialLinks,
                                                        hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), primaryCtaText: e.target.value }
                                                    }
                                                })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition text-xs font-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Link CTA Primario</label>
                                            <input
                                                type="text"
                                                value={config.socialLinks?.hero?.primaryCtaLink || FALLBACK_HERO.primaryCtaLink}
                                                onChange={(e) => setConfig({
                                                    ...config,
                                                    socialLinks: {
                                                        ...config.socialLinks,
                                                        hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), primaryCtaLink: e.target.value }
                                                    }
                                                })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-platinum-dim focus:border-primary outline-none transition text-xs font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Texto CTA Secundario</label>
                                            <input
                                                type="text"
                                                value={config.socialLinks?.hero?.secondaryCtaText || FALLBACK_HERO.secondaryCtaText}
                                                onChange={(e) => setConfig({
                                                    ...config,
                                                    socialLinks: {
                                                        ...config.socialLinks,
                                                        hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), secondaryCtaText: e.target.value }
                                                    }
                                                })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition text-xs font-black italic"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-2 italic">Link CTA Secundario</label>
                                            <input
                                                type="text"
                                                value={config.socialLinks?.hero?.secondaryCtaLink || FALLBACK_HERO.secondaryCtaLink}
                                                onChange={(e) => setConfig({
                                                    ...config,
                                                    socialLinks: {
                                                        ...config.socialLinks,
                                                        hero: { ...(config.socialLinks?.hero || FALLBACK_HERO), secondaryCtaLink: e.target.value }
                                                    }
                                                })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-platinum-dim focus:border-primary outline-none transition text-xs font-mono"
                                            />
                                        </div>
                                    </div>

                                    {/* Preview Visual */}
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Live Preview Mock</div>
                                        <div className="space-y-2">
                                            <div className="text-xl font-black text-white italic tracking-tighter truncate">{config.socialLinks?.hero?.title || 'DOMINA EL CÓDIGO'}</div>
                                            <div className="flex gap-2">
                                                <div className="bg-white text-black text-[8px] font-black px-3 py-1.5 rounded uppercase">{config.socialLinks?.hero?.primaryCtaText || 'COMENZAR'}</div>
                                                <div className="bg-white/10 text-white text-[8px] font-black px-3 py-1.5 rounded uppercase italic border border-white/10">{config.socialLinks?.hero?.secondaryCtaText || 'EXPLORAR'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveConfig}
                                disabled={isSaving}
                                className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-neon-blue"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Actualizando Motor...' : 'Sincronizar Cambios'}
                            </button>
                        </div>

                        {/* Image Dimensions Guide */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6 bg-gradient-to-br from-neural-blue/5 to-transparent backdrop-blur-md">
                            <h3 className="text-xl font-black text-white flex items-center gap-3 italic tracking-tight uppercase">
                                <Info className="w-6 h-6 text-gold animate-pulse" />
                                Guía Técnica de Medios (4K Nanobanana)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { section: 'Hero Background', dim: '1920x1080px', format: 'WebP/SVG', style: 'Ambiental' },
                                    { section: 'News Banner', dim: '2000x1200px', format: 'WebP', style: 'Ken Burns' },
                                    { section: 'Thumbnail Proyecto', dim: '1200x800px', format: 'WebP', style: '3:2 Ratio' },
                                    { section: 'Course Cover', dim: '800x600px', format: 'WebP', style: '4:3 Ratio' },
                                    { section: 'Logos (Validation)', dim: 'Altura 80px', format: 'SVG/PNG', style: 'Transparente' },
                                    { section: 'Favicon', dim: '32x32px', format: 'ICO/PNG', style: 'Nítido' }
                                ].map((guide, i) => (
                                    <div key={i} className="p-4 bg-black/30 rounded-xl border border-white/5 hover:border-gold/30 transition-colors group">
                                        <div className="text-[10px] font-black text-gold uppercase mb-1">{guide.section}</div>
                                        <div className="text-lg font-bold text-white mb-2">{guide.dim}</div>
                                        <div className="flex justify-between text-[9px] font-mono text-platinum-dim uppercase tracking-widest">
                                            <span>Format: {guide.format}</span>
                                            <span className="text-white/40 italic">{guide.style}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-[11px] text-platinum-dim italic leading-relaxed">
                                <span className="font-black text-gold">RECOMENDACIÓN ELITE:</span> Siempre utiliza compresión WebP para cargar imágenes. Esto asegura que SINAPCODE mantenga su velocidad de respuesta instantánea y el estándar de calidad visual 4K.
                            </div>
                        </div>

                        {/* Process Steps Editor */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-8 bg-surface/50">
                            <h3 className="text-xl font-black text-white flex items-center gap-3 italic tracking-tight">
                                <Layers className="w-6 h-6 text-secondary" />
                                EL MÉTODO (HOW IT WORKS)
                            </h3>

                            <div className="space-y-4">
                                {(config.socialLinks?.process || FALLBACK_PROCESS).map((step: any, idx: number) => (
                                    <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:border-secondary/30 transition-all">
                                        <div className="md:col-span-1 flex flex-col items-center">
                                            <div className="text-3xl mb-2">{step.icon}</div>
                                            <div className="text-[10px] font-black text-secondary uppercase font-mono">{step.number}</div>
                                        </div>
                                        <div className="md:col-span-4 space-y-3">
                                            <input
                                                type="text"
                                                value={step.title}
                                                onChange={(e) => {
                                                    const newProcess = [...(config.socialLinks?.process || FALLBACK_PROCESS)];
                                                    newProcess[idx] = { ...step, title: e.target.value };
                                                    setConfig({ ...config, socialLinks: { ...config.socialLinks, process: newProcess } });
                                                }}
                                                className="w-full bg-transparent border-b border-white/10 focus:border-secondary outline-none text-white font-bold text-lg"
                                                placeholder="Título del Paso"
                                            />
                                            <input
                                                type="text"
                                                value={step.icon}
                                                onChange={(e) => {
                                                    const newProcess = [...(config.socialLinks?.process || FALLBACK_PROCESS)];
                                                    newProcess[idx] = { ...step, icon: e.target.value };
                                                    setConfig({ ...config, socialLinks: { ...config.socialLinks, process: newProcess } });
                                                }}
                                                className="w-full bg-transparent border-b border-white/10 focus:border-secondary outline-none text-platinum-dim text-xs"
                                                placeholder="Emoji o Icono"
                                            />
                                        </div>
                                        <div className="md:col-span-6">
                                            <textarea
                                                value={step.description}
                                                onChange={(e) => {
                                                    const newProcess = [...(config.socialLinks?.process || FALLBACK_PROCESS)];
                                                    newProcess[idx] = { ...step, description: e.target.value };
                                                    setConfig({ ...config, socialLinks: { ...config.socialLinks, process: newProcess } });
                                                }}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-platinum-dim text-xs outline-none focus:border-secondary h-20"
                                                placeholder="Descripción detallada del paso..."
                                            />
                                        </div>
                                        <div className="md:col-span-1 flex justify-end">
                                            <button className="p-2 text-rose-500/40 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-platinum-dim hover:text-white hover:border-secondary/20 transition-all flex items-center justify-center gap-2 italic uppercase text-[10px] font-black tracking-widest">
                                    <Plus className="w-4 h-4" /> Expandir Protocolo de Proceso
                                </button>
                            </div>

                            <button
                                onClick={handleSaveConfig}
                                disabled={isSaving}
                                className="w-full py-4 bg-secondary/80 hover:bg-secondary text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3"
                            >
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Sincronizando...' : 'Actualizar Método'}
                            </button>
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
