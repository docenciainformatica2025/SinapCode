'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { GlobalNavbar } from '@/components/global-navbar';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            // Si tuviéramos bio en la sesión, la cargaríamos aquí
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Llamar a la API para actualizar el perfil
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al actualizar');
            }

            // Actualizar sesión local con los nuevos datos
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: data.user.name
                }
            });

            toast.success('✅ Perfil actualizado correctamente');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Error al actualizar el perfil');
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return <div className="min-h-screen bg-deep-space flex items-center justify-center text-white">Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />

            <main className="max-w-4xl mx-auto p-6 md:p-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2">Configuración de Perfil</h1>
                    <p className="text-platinum-dim">Gestiona tu información personal y preferencias.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Avatar & Quick Info */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neural-blue to-synapse-purple p-1 mb-4 shadow-neon-blue">
                                <div className="w-full h-full rounded-full bg-deep-space flex items-center justify-center overflow-hidden">
                                    <span className="text-4xl">
                                        {name ? name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-white">{name || 'Usuario'}</h2>
                            <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-neural-blue">
                                {(session?.user as any)?.role || 'ESTUDIANTE'}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-platinum-dim">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-platinum-dim">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={session?.user?.email || ''}
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
                                />
                                <p className="text-xs text-white/40">El correo no se puede cambiar directamente.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-platinum-dim">Biografía (Opcional)</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neural-blue focus:ring-1 focus:ring-neural-blue transition"
                                    placeholder="Cuéntanos un poco sobre ti..."
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="px-6 py-2 text-red-500 hover:text-red-400 font-medium transition flex items-center gap-2"
                                >
                                    🚪 Cerrar Sesión
                                </button>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        className="px-6 py-2 text-platinum-dim hover:text-white transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-neon-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
