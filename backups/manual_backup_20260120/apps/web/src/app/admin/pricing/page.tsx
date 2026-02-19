'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, DollarSign, Check, X, CreditCard, Edit, Trash2 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/header';
import { toast } from 'sonner';

export default function PricingPage() {
    const [plans, setPlans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        interval: 'MONTHLY',
        features: '', // Textarea (newline separated)
        isPopular: false,
        isActive: true
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/pricing');
            const data = await res.json();
            if (data.plans) setPlans(data.plans);
        } catch (error) {
            toast.error('Error cargando planes');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (plan: any) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name,
            description: plan.description || '',
            price: plan.price.toString(),
            interval: plan.interval,
            features: Array.isArray(plan.features) ? plan.features.join('\n') : '',
            isPopular: plan.isPopular,
            isActive: plan.isActive
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar este plan?')) return;
        try {
            const res = await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Plan eliminado');
                fetchPlans();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingPlan ? `/api/admin/pricing/${editingPlan.id}` : '/api/admin/pricing';
            const method = editingPlan ? 'PUT' : 'POST';

            const featuresArray = formData.features.split('\n').filter(line => line.trim() !== '');

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    features: featuresArray
                })
            });

            if (res.ok) {
                toast.success(editingPlan ? 'Plan actualizado' : 'Plan creado');
                setIsModalOpen(false);
                setEditingPlan(null);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    interval: 'MONTHLY',
                    features: '',
                    isPopular: false,
                    isActive: true
                });
                fetchPlans();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error('Error al guardar plan');
        }
    };

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Planes y Precios"
                description="Gestiona las suscripciones y productos"
                action={{
                    label: 'Nuevo Plan',
                    onClick: () => {
                        setEditingPlan(null);
                        setFormData({
                            name: '',
                            description: '',
                            price: '',
                            interval: 'MONTHLY',
                            features: '',
                            isPopular: false,
                            isActive: true
                        });
                        setIsModalOpen(true);
                    }
                }}
            />

            {isLoading ? (
                <div className="p-20 text-center animate-pulse text-white">Cargando Planes...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`glass-panel p-6 rounded-xl border relative group ${plan.isPopular ? 'border-gold/50' : 'border-white/10'}`}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                    POPULAR
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                    <p className="text-sm text-platinum-dim">{plan.interval}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <button onClick={() => handleEdit(plan)} className="p-2 hover:bg-white/10 rounded-lg text-platinum-dim hover:text-white">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(plan.id)} className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-400 hover:text-rose-300">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">${plan.price}</span>
                                <span className="text-platinum-dim">/{plan.interval === 'MONTHLY' ? 'mes' : 'año'}</span>
                            </div>

                            <div className="space-y-2 mb-6">
                                {(plan.features as string[]).map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm text-platinum-dim">
                                        <Check className="w-4 h-4 text-neural-blue mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={`text-center py-2 rounded-lg text-xs font-bold uppercase ${plan.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                {plan.isActive ? 'Activo' : 'Inactivo'}
                            </div>
                        </motion.div>
                    ))}

                    {/* Seed Button only if empty */}
                    {plans.length === 0 && (
                        <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
                            <CreditCard className="w-12 h-12 text-platinum-dim mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No tienes planes configurados</h3>
                            <p className="text-platinum-dim mb-6">Crea tu primer plan o carga una configuración por defecto.</p>
                            <button
                                onClick={async () => {
                                    const res = await fetch('/api/admin/seed', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'pricing' })
                                    });
                                    if (res.ok) {
                                        toast.success('Planes generados correctamente');
                                        fetchPlans();
                                    } else {
                                        toast.error('Error al generar planes');
                                    }
                                }}
                                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition"
                            >
                                Generar Planes por Defecto
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* CREATE/EDIT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 m-auto w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-[#0F1117] border border-white/10 rounded-2xl shadow-2xl z-[101] p-6 space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-gold" />
                                    {editingPlan ? 'Editar Plan' : 'Nuevo Plan'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-platinum-dim" /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Nombre del Plan</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Precio</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                            <input
                                                required
                                                type="number"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neural-blue outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Intervalo</label>
                                        <select
                                            value={formData.interval}
                                            onChange={e => setFormData({ ...formData, interval: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none"
                                        >
                                            <option value="MONTHLY">Mensual</option>
                                            <option value="YEARLY">Anual</option>
                                            <option value="ONETIME">Pago Único</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-platinum-dim uppercase mb-2">Características (Una por línea)</label>
                                    <textarea
                                        rows={5}
                                        value={formData.features}
                                        onChange={e => setFormData({ ...formData, features: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-neural-blue outline-none"
                                        placeholder="Acceso total&#10;Soporte 24/7&#10;Certificados"
                                    />
                                </div>

                                <div className="flex gap-6 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isPopular}
                                            onChange={e => setFormData({ ...formData, isPopular: e.target.checked })}
                                            className="accent-gold w-4 h-4"
                                        />
                                        <span className="text-sm text-white">Destacar como Popular</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="accent-neural-blue w-4 h-4"
                                        />
                                        <span className="text-sm text-white">Activo</span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-3 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition">
                                    Guardar Plan
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
