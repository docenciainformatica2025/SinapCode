'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { UIUser, DELETION_REASONS } from '@/types/admin';

interface DeleteUserModalProps {
    user: UIUser | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function DeleteUserModal({ user, isOpen, onClose, onSuccess }: DeleteUserModalProps) {
    const [confirmText, setConfirmText] = useState('');
    const [reason, setReason] = useState('');
    const [reasonDetails, setReasonDetails] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!user) return;

        if (confirmText !== 'ELIMINAR') {
            toast.error('Debes escribir "ELIMINAR" para confirmar');
            return;
        }

        if (!reason) {
            toast.error('Debes seleccionar una razón de eliminación');
            return;
        }

        if (reason === 'OTHER' && !reasonDetails.trim()) {
            toast.error('Debes especificar la razón de eliminación');
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(`/api/admin/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reason,
                    reasonDetails: reason === 'OTHER' ? reasonDetails : DELETION_REASONS.find(r => r.value === reason)?.label,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ Usuario eliminado exitosamente');
                onSuccess();
                onClose();
                setConfirmText('');
                setReason('');
                setReasonDetails('');
            } else {
                toast.error(data.error || 'Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error al eliminar usuario');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleClose = () => {
        setConfirmText('');
        setReason('');
        setReasonDetails('');
        onClose();
    };

    if (!user) return null;

    // Prevenir eliminación de SUPER_ADMIN
    const isSuperAdmin = user.role === 'SUPER_ADMIN';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-panel max-w-md w-full p-8 rounded-2xl border border-rose-500/30 relative max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-platinum-dim hover:text-white transition"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Icon */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                                <AlertTriangle className="h-8 w-8 text-rose-500" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">
                            Eliminar Usuario
                        </h3>

                        {isSuperAdmin ? (
                            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 mb-6">
                                <p className="text-sm text-rose-400 text-center">
                                    ⛔ No se puede eliminar un Super Administrador
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Warning */}
                                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-rose-400 mb-2">
                                        ⚠️ Soft Delete - <strong>Datos retenidos 90 días</strong>
                                    </p>
                                    <p className="text-xs text-platinum-dim">
                                        El usuario será marcado como eliminado. Los datos se mantendrán por cumplimiento legal (GDPR/Ley 1581).
                                    </p>
                                </div>

                                {/* User info */}
                                <div className="bg-white/5 rounded-lg p-4 mb-6">
                                    <div className="text-sm text-platinum-dim mb-1">Usuario a eliminar:</div>
                                    <div className="text-white font-bold">{user.name}</div>
                                    <div className="text-sm text-platinum-dim">{user.email}</div>
                                </div>

                                {/* Deletion Reason - OBLIGATORIO */}
                                <div className="mb-6">
                                    <label className="text-sm text-platinum-dim mb-2 block">
                                        Razón de eliminación <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition mb-3"
                                        disabled={isDeleting}
                                    >
                                        <option value="">Seleccionar razón...</option>
                                        {DELETION_REASONS.map((r) => (
                                            <option key={r.value} value={r.value}>
                                                {r.label}
                                            </option>
                                        ))}
                                    </select>

                                    {reason === 'OTHER' && (
                                        <textarea
                                            value={reasonDetails}
                                            onChange={(e) => setReasonDetails(e.target.value)}
                                            placeholder="Especifica la razón de eliminación..."
                                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition resize-none"
                                            rows={3}
                                            disabled={isDeleting}
                                        />
                                    )}
                                </div>

                                {/* Consequences */}
                                <div className="mb-6">
                                    <div className="text-sm text-platinum-dim mb-3">Esta acción:</div>
                                    <ul className="space-y-2 text-sm text-platinum-dim">
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-500">•</span>
                                            <span>Desactivará la cuenta inmediatamente</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-500">•</span>
                                            <span>Cerrará todas las sesiones activas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-500">•</span>
                                            <span>Creará un registro de auditoría</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <span>Mantendrá datos por 90 días (cumplimiento legal)</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Confirmation input */}
                                <div className="mb-6">
                                    <label className="text-sm text-platinum-dim mb-2 block">
                                        Escribe <span className="text-white font-bold">ELIMINAR</span> para confirmar:
                                    </label>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        placeholder="ELIMINAR"
                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition"
                                        disabled={isDeleting}
                                    />
                                </div>
                            </>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            {!isSuperAdmin && (
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting || confirmText !== 'ELIMINAR' || !reason || (reason === 'OTHER' && !reasonDetails.trim())}
                                    className="flex-1 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar Usuario'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
