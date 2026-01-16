'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error en la subida');
            }

            const data = await response.json();
            onChange(data.url);
            toast.success('Imagen subida correctamente');
        } catch (error) {
            console.error(error);
            toast.error('Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': []
        },
        maxFiles: 1,
        disabled: disabled || isUploading
    });

    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={`
                    relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer
                    min-h-[200px] flex flex-col items-center justify-center gap-4 text-center
                    ${isDragActive
                        ? 'border-neural-blue bg-neural-blue/10'
                        : 'border-white/10 hover:border-neural-blue/50 hover:bg-white/5'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <input {...getInputProps()} />

                {value ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                        <Image
                            src={value}
                            alt="Upload"
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange('');
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-10 h-10 text-neural-blue animate-spin" />
                                <p className="text-sm text-platinum">Subiendo imagen...</p>
                            </div>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-platinum-dim" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        Arrastra una imagen o haz clic
                                    </p>
                                    <p className="text-xs text-platinum-dim mt-1">
                                        JPG, PNG o WebP (max 5MB)
                                    </p>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {value && (
                <div className="flex items-center gap-2 text-xs text-platinum-dim bg-white/5 p-2 rounded-lg">
                    <ImageIcon className="w-4 h-4" />
                    <span className="truncate flex-1 font-mono">{value}</span>
                </div>
            )}
        </div>
    );
}
