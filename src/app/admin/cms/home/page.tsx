'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/header';
import { Save, Loader2, Layout } from 'lucide-react';

export default function HomeCMSPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [sections, setSections] = useState<any>({});

    useEffect(() => {
        fetch('/api/cms/pages?page=home')
            .then(res => res.json())
            .then(data => {
                setSections(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleSave = async (key: string, content: any) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/cms/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page: 'home',
                    key,
                    content,
                    isVisible: true // Could be toggled
                })
            });
            if (res.ok) {
                alert('Sección actualizada correctamente');
            } else {
                alert('Error al guardar');
            }
        } catch (error) {
            console.error(error);
            alert('Error al guardar');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-white">Cargando editor...</div>;

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Editor Home Page"
                description="Gestiona los textos y contenidos de la página principal"
            />

            <div className="grid gap-8">
                {/* Hero Editor */}
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Layout className="w-5 h-5 text-gold" />
                            Sección Hero
                        </h2>
                        <button
                            onClick={() => handleSave('hero', sections['hero'])}
                            disabled={isSaving}
                            className="bg-neural-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                            Guardar Cambios
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-platinum mb-1">Título Principal</label>
                            <input
                                type="text"
                                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none"
                                value={sections['hero']?.title || ''}
                                onChange={(e) => setSections({
                                    ...sections,
                                    hero: { ...sections['hero'], title: e.target.value }
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-platinum mb-1">Subtítulo</label>
                            <textarea
                                className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none h-24"
                                value={sections['hero']?.subtitle || ''}
                                onChange={(e) => setSections({
                                    ...sections,
                                    hero: { ...sections['hero'], subtitle: e.target.value }
                                })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-platinum mb-1">Texto Botón CTA</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none"
                                    value={sections['hero']?.cta_text || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: { ...sections['hero'], cta_text: e.target.value }
                                    })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-platinum mb-1">Enlace CTA</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none"
                                    value={sections['hero']?.cta_link || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: { ...sections['hero'], cta_link: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-gold">{'</>'}</span> Configuración Visual (Código)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-platinum mb-1">Nombre del Archivo</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none font-mono text-sm"
                                    placeholder="ai-tutor.py"
                                    value={sections['hero']?.code_block?.filename || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: {
                                            ...sections['hero'],
                                            code_block: { ...sections['hero']?.code_block, filename: e.target.value }
                                        }
                                    })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-platinum mb-1">Nombre de la Clase</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none font-mono text-sm"
                                    placeholder="FutureDev"
                                    value={sections['hero']?.code_block?.class_name || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: {
                                            ...sections['hero'],
                                            code_block: { ...sections['hero']?.code_block, class_name: e.target.value }
                                        }
                                    })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-platinum mb-1">Lista de Skills (Formato Array)</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none font-mono text-sm"
                                    placeholder="['AI', 'Web3', 'Security']"
                                    value={sections['hero']?.code_block?.skills || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: {
                                            ...sections['hero'],
                                            code_block: { ...sections['hero']?.code_block, skills: e.target.value }
                                        }
                                    })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-platinum mb-1">Status (Estado)</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none font-mono text-sm"
                                    placeholder="'Ready for Impact'"
                                    value={sections['hero']?.code_block?.status || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: {
                                            ...sections['hero'],
                                            code_block: { ...sections['hero']?.code_block, status: e.target.value }
                                        }
                                    })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-platinum mb-1">Valor de Retorno</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none font-mono text-sm"
                                    placeholder="Success.GUARANTEED"
                                    value={sections['hero']?.code_block?.return_value || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: {
                                            ...sections['hero'],
                                            code_block: { ...sections['hero']?.code_block, return_value: e.target.value }
                                        }
                                    })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-platinum mb-1">Comentario (Línea Resaltada)</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none font-mono text-sm"
                                    placeholder="// Optimizing learning path..."
                                    value={sections['hero']?.code_block?.comment || ''}
                                    onChange={(e) => setSections({
                                        ...sections,
                                        hero: {
                                            ...sections['hero'],
                                            code_block: { ...sections['hero']?.code_block, comment: e.target.value }
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                {/* Social Proof / Stats Editor */}
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">🚀</span>
                            Métricas de Impacto (Social Proof)
                        </h2>
                        <button
                            onClick={() => handleSave('stats', sections['stats'])}
                            disabled={isSaving}
                            className="bg-neural-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                            Guardar Métricas
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gold font-mono text-xs">Tarjeta #{index + 1}</span>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-platinum mb-1">Icono/Emoji</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white focus:border-neural-blue outline-none text-center text-xl"
                                        value={sections['stats']?.[index]?.icon || ''}
                                        placeholder="👨‍💻"
                                        onChange={(e) => {
                                            const newStats = [...(sections['stats'] || [])];
                                            if (!newStats[index]) newStats[index] = {};
                                            newStats[index].icon = e.target.value;
                                            setSections({ ...sections, stats: newStats });
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-platinum mb-1">Valor</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white focus:border-neural-blue outline-none font-bold"
                                        value={sections['stats']?.[index]?.value || ''}
                                        placeholder="12,450+"
                                        onChange={(e) => {
                                            const newStats = [...(sections['stats'] || [])];
                                            if (!newStats[index]) newStats[index] = {};
                                            newStats[index].value = e.target.value;
                                            setSections({ ...sections, stats: newStats });
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-platinum mb-1">Etiqueta</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white focus:border-neural-blue outline-none text-sm"
                                        value={sections['stats']?.[index]?.label || ''}
                                        placeholder="Builders Activos"
                                        onChange={(e) => {
                                            const newStats = [...(sections['stats'] || [])];
                                            if (!newStats[index]) newStats[index] = {};
                                            newStats[index].label = e.target.value;
                                            setSections({ ...sections, stats: newStats });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Company Logos (Text for now to keep it simple/fast) */}
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">🏢</span>
                            Empresas / Marcas
                        </h2>
                        <button
                            onClick={() => handleSave('companies', sections['companies'])}
                            disabled={isSaving}
                            className="bg-neural-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                            Guardar Marcas
                        </button>
                    </div>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-platinum mb-1">Lista de Empresas (Separadas por coma)</label>
                        <textarea
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:border-neural-blue outline-none h-24"
                            value={Array.isArray(sections['companies']) ? sections['companies'].join(', ') : (sections['companies'] || '')}
                            placeholder="Google, Microsoft, Amazon..."
                            onChange={(e) => {
                                // Convert comma string to array
                                const val = e.target.value;
                                setSections({ ...sections, companies: val.split(',').map(s => s.trim()) });
                            }}
                        />
                        <p className="text-xs text-platinum-dim">Escribe los nombres de las empresas separados por coma.</p>
                    </div>
                </div>
            </div >
        </div >
    );
}
