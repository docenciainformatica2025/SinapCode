'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '@/components/ui/modal';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const bannerSchema = z.object({
    title: z.string().min(3, 'El título es requerido'),
    description: z.string().optional(),
    linkUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    position: z.number().int().default(0),
    isActive: z.boolean().default(true),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

interface CreateBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    bannerToEdit?: any | null;
}

export function CreateBannerModal({ isOpen, onClose, onSuccess, bannerToEdit }: CreateBannerModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<BannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            title: '',
            description: '',
            linkUrl: '',
            position: 0,
            isActive: true,
        },
    });

    // Load initial data for editing
    useEffect(() => {
        if (bannerToEdit) {
            reset({
                title: bannerToEdit.title,
                description: bannerToEdit.description || '',
                linkUrl: bannerToEdit.linkUrl || '',
                position: bannerToEdit.position || 0,
                isActive: bannerToEdit.isActive,
                startDate: bannerToEdit.startDate ? new Date(bannerToEdit.startDate).toISOString().split('T')[0] : '',
                endDate: bannerToEdit.endDate ? new Date(bannerToEdit.endDate).toISOString().split('T')[0] : '',
            });
            setUploadedImage(bannerToEdit.imageUrl);
        } else {
            reset({
                title: '',
                description: '',
                linkUrl: '',
                position: 0,
                isActive: true,
            });
            setUploadedImage(null);
        }
    }, [bannerToEdit, isOpen, reset]);

    // Dropzone for image upload
    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Error subiendo imagen');

            const data = await res.json();
            setUploadedImage(data.url);
            toast.success('Imagen subida correctamente');
        } catch (error) {
            console.error(error);
            toast.error('Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    const onSubmit = async (data: BannerFormValues) => {
        if (!uploadedImage) {
            toast.error('Debes subir una imagen para el banner');
            return;
        }

        setIsLoading(true);
        try {
            const url = bannerToEdit
                ? `/api/admin/banners/${bannerToEdit.id}`
                : '/api/admin/banners';
            const method = bannerToEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    imageUrl: uploadedImage
                }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el banner');
            }

            toast.success(bannerToEdit ? 'Banner actualizado' : 'Banner creado exitosamente');
            onSuccess();
            onClose();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('No se pudo guardar el banner');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={bannerToEdit ? "Editar Banner" : "Crear Nuevo Banner"}
            description="Gestiona las imágenes promocionales que aparecen en el inicio."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-platinum">Título Interno</label>
                    <input
                        {...register('title')}
                        className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        placeholder="Ej: Promo Verano 2025"
                    />
                    {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-platinum">Imagen del Banner</label>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                            ${isDragActive ? 'border-neural-blue bg-neural-blue/10' : 'border-white/10 hover:border-white/30 bg-black/30'}`}
                    >
                        <input {...getInputProps()} />
                        {isUploading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="h-8 w-8 animate-spin text-neural-blue mb-2" />
                                <span className="text-sm text-platinum">Subiendo...</span>
                            </div>
                        ) : uploadedImage ? (
                            <div className="relative w-full aspect-video rounded-md overflow-hidden group">
                                <Image
                                    src={uploadedImage}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-bold flex items-center gap-2">
                                        <Upload className="h-4 w-4" /> Cambiar Imagen
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-platinum-dim">
                                <ImageIcon className="h-8 w-8 mb-2" />
                                <span className="text-sm">Arrastra una imagen o haz clic para seleccionar</span>
                                <span className="text-xs mt-1">(Max 5MB - JPG, PNG, WEBP)</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-platinum">Link de Redirección (Opcional)</label>
                        <input
                            {...register('linkUrl')}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                            placeholder="https://..."
                        />
                        {errors.linkUrl && <p className="text-xs text-red-400">{errors.linkUrl.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-platinum">Posición (Orden)</label>
                        <input
                            type="number"
                            {...register('position', { valueAsNumber: true })}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-platinum">Fecha Inicio</label>
                        <input
                            type="date"
                            {...register('startDate')}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-platinum">Fecha Fin</label>
                        <input
                            type="date"
                            {...register('endDate')}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neural-blue transition"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        {...register('isActive')}
                        className="w-4 h-4 rounded border-white/20 bg-black/50 text-neural-blue focus:ring-neural-blue"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-platinum">Activar Banner inmediatamente</label>
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
                        {isLoading ? (bannerToEdit ? 'Guardando...' : 'Creando...') : (bannerToEdit ? 'Guardar Cambios' : 'Crear Banner')}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
