'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '@/components/ui/modal';
import { Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const programSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe ser más detallada'),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    price: z.number().min(0),
});

type ProgramFormValues = z.infer<typeof programSchema>;

interface CreateProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    programToEdit?: any | null;
}

export function CreateProgramModal({ isOpen, onClose, onSuccess, programToEdit }: CreateProgramModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProgramFormValues>({
        resolver: zodResolver(programSchema),
        defaultValues: {
            title: '',
            description: '',
            level: 'beginner',
            price: 0,
        },
    });

    useEffect(() => {
        if (programToEdit) {
            reset({
                title: programToEdit.title,
                description: programToEdit.description,
                level: programToEdit.level || 'beginner',
                price: Number(programToEdit.price) || 0,
            });
        } else {
            reset({
                title: '',
                description: '',
                level: 'beginner',
                price: 0,
            });
        }
    }, [programToEdit, isOpen, reset]);

    const onSubmit = async (data: ProgramFormValues) => {
        setIsLoading(true);
        try {
            const url = programToEdit
                ? `/api/admin/programs/${programToEdit.id}`
                : '/api/admin/programs';

            const method = programToEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el programa');
            }

            toast.success(programToEdit ? 'Programa actualizado' : 'Programa creado exitosamente');
            onSuccess();
            onClose();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('No se pudo guardar el programa');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={programToEdit ? "Editar Programa" : "Crear Nuevo Programa"}
            description={programToEdit ? "Modifica los detalles del curso existente" : "Define los detalles básicos del curso. Podrás agregar contenido después."}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-platinum">Título del Programa</label>
                    <input
                        {...register('title')}
                        className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        placeholder="Ej: Master en Python Full Stack"
                    />
                    {errors.title && (
                        <p className="text-xs text-red-400">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-platinum">Descripción</label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition resize-none"
                        placeholder="Breve resumen del contenido..."
                    />
                    {errors.description && (
                        <p className="text-xs text-red-400">{errors.description.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Level */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-platinum">Nivel</label>
                        <select
                            {...register('level')}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        >
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="advanced">Avanzado</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-platinum">Precio (USD)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { valueAsNumber: true })}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        />
                        {errors.price && (
                            <p className="text-xs text-red-400">{errors.price.message}</p>
                        )}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-platinum hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors shadow-neon-blue flex items-center gap-2"
                    >
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isLoading ? (programToEdit ? 'Guardando...' : 'Creando...') : (programToEdit ? 'Guardar Cambios' : 'Crear Programa')}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
