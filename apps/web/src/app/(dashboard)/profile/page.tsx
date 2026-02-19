'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, Mail, Shield, Camera, Edit2, Check, X, LogOut, Briefcase, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [bio, setBio] = useState('Builderr apasionado por la seguridad informática, el desarrollo de sistemas robustos y la arquitectura de software moderna.');
    const [role, setRole] = useState('ESTUDIANTE');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name || '');
                    setBio(data.bio || '');
                    setRole(data.role || 'ESTUDIANTE');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (status === 'authenticated') {
            fetchProfile();
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, bio })
            });

            if (response.ok) {
                const data = await response.json();
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: data.user.name
                    }
                });
                toast.success('Perfil actualizado correctamente');
                setIsEditing(false);
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Error al actualizar');
            }
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar el perfil');
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deep-space text-white pb-20">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none opacity-30 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 pt-24 lg:pt-10">
                {/* Header Profile */}
                <header className="relative mb-12">
                    <div className="h-64 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 via-deep-space to-surface border border-white/5 relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
                        <motion.div
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent"
                        />
                    </div>

                    <div className="max-w-5xl mx-auto px-10 -mt-24 relative z-20">
                        <div className="flex flex-col md:flex-row items-end gap-8 pb-4">
                            <div className="relative group">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] bg-deep-space p-2 border-4 border-deep-space shadow-2xl relative overflow-hidden"
                                >
                                    <div className="w-full h-full rounded-[1.5rem] bg-surface/80 backdrop-blur-md overflow-hidden flex items-center justify-center text-6xl font-black text-white group-hover:scale-105 transition-transform duration-500">
                                        {name ? name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <Camera className="w-8 h-8 text-white" />
                                    </button>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex-1 space-y-3"
                            >
                                <div className="flex flex-wrap items-center gap-4">
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{name}</h1>
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-[0.2em]">
                                        {role}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-platinum-dim font-bold text-sm">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-emerald-400/60" />
                                        Full Stack Tech Builder
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-emerald-400/60" />
                                        Comunidad Global
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={cn(
                                        "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl",
                                        isEditing
                                            ? "bg-white/5 text-white border border-white/10"
                                            : "bg-emerald-500 text-deep-space hover:bg-emerald-400 shadow-emerald-500/20"
                                    )}
                                >
                                    {isEditing ? <><X className="w-4 h-4" /> Cancelar</> : <><Edit2 className="w-4 h-4" /> Editar Perfil</>}
                                </button>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 group shadow-xl"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Coll: Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="bg-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest">Estadísticas</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Cursos Completados', value: '12', color: 'emerald' },
                                    { label: 'Proyectos Activos', value: '5', color: 'cyan' },
                                    { label: 'Puntos SinapCODE', value: '2.4k', color: 'purple' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                                        <span className="text-sm font-bold text-platinum-dim group-hover:text-white transition-colors">{stat.label}</span>
                                        <span className="text-xl font-black text-white">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 rounded-[2.5rem] p-8 shadow-2xl">
                            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">Insignia de Élite</h3>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center shadow-inner">
                                    <Shield className="w-10 h-10 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-white mb-1 uppercase tracking-tighter">Miembro Fundador</p>
                                    <p className="text-xs text-platinum-dim leading-relaxed">Perteneces al grupo exclusivo de los primeros builders de la plataforma.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Coll: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8"
                    >
                        <div className="bg-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
                            <h2 className="text-2xl font-black text-white mb-10 tracking-tighter">Información de la Cuenta</h2>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-platinum uppercase tracking-[0.2em] ml-2">Nombre de Usuario</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full bg-deep-space/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-white/20 shadow-inner"
                                            />
                                            <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-platinum uppercase tracking-[0.2em] ml-2">Correo Electrónico</label>
                                        <div className="relative group grayscale opacity-60">
                                            <input
                                                type="email"
                                                value={session?.user?.email || ''}
                                                disabled
                                                className="w-full bg-deep-space/50 border border-white/10 rounded-2xl px-5 py-4 text-platinum-dim font-bold cursor-not-allowed shadow-inner"
                                            />
                                            <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-platinum uppercase tracking-[0.2em] ml-2">Biografía Profesional</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        disabled={!isEditing}
                                        className="w-full bg-deep-space/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none shadow-inner group-hover:border-white/20"
                                    />
                                </div>

                                <AnimatePresence>
                                    {isEditing && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="pt-6 flex justify-end gap-5"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-8 py-4 text-platinum-dim hover:text-white transition font-black text-xs uppercase tracking-widest"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="px-10 py-4 bg-emerald-500 text-deep-space rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl"
                                            >
                                                {isLoading ? (
                                                    <span className="animate-pulse">Guardando...</span>
                                                ) : (
                                                    <><Check className="w-4 h-4" /> Guardar Cambios</>
                                                )}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
