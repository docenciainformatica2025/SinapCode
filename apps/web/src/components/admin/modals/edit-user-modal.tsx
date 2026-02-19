'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { UIUser } from '@/types/admin';

interface EditUserModalProps {
    user: UIUser | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditUserModal({ user, isOpen, onClose, onSuccess }: EditUserModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;

        // Validaciones
        if (!formData.name.trim()) {
            toast.error('El nombre es requerido');
            return;
        }

        if (!formData.email.trim() || !formData.email.includes('@')) {
            toast.error('Email inválido');
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch(`/api/admin/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ Usuario actualizado exitosamente');
                onSuccess();
                onClose();
            } else {
                toast.error(data.error || 'Error al actualizar usuario');
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            toast.error('Error al actualizar usuario');
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-panel max-w-lg w-full p-8 rounded-2xl border border-white/20 relative"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-platinum-dim hover:text-white transition"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Editar Usuario
                        </h3>

                        {/* Form */}
                        <div className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neural-blue outline-none transition"
                                    placeholder="Nombre del usuario"
                                    disabled={isSaving}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neural-blue outline-none transition"
                                    placeholder="email@example.com"
                                    disabled={isSaving}
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Rol
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neural-blue outline-none transition"
                                    disabled={isSaving}
                                >
                                    <option value="STUDENT">Estudiante</option>
                                    <option value="TEACHER">Profesor</option>
                                    <option value="MODERATOR">Moderador</option>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="SUPER_ADMIN">Super Administrador</option>
                                </select>
                                <p className="text-xs text-platinum-dim mt-2">
                                    ⚠️ Cambiar el rol afectará los permisos del usuario
                                </p>
                            </div>
                        </div>

                        {/* Legal Compliance Section */}
                        <div className="pt-4 border-t border-white/5 mt-8">
                            <label className="block text-sm font-medium text-platinum-dim mb-3">
                                Cumplimiento Legal
                            </label>
                            <button
                                type="button"
                                onClick={() => window.open(`/api/admin/users/${user.id}/legal-certificate`, '_blank')}
                                className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 w-full justify-center border border-emerald-500/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                                Descargar Certificado Legal (PDF)
                            </button>
                            <p className="mt-2 text-xs text-center text-gray-500">
                                Genera un documento con validez probatoria (IP, Timestamp, Hash).
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={onClose}
                                disabled={isSaving}
                                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex-1 px-4 py-3 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue disabled:opacity-50"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
