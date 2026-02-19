'use client';

import { motion } from 'framer-motion';
import { Play, TrendingUp, Clock, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardHeroProps {
    course: {
        title: string;
        module: string;
        progress: number;
        slug: string;
        image: string;
        timeLeft: string;
    };
}

export function DashboardHero({ course }: DashboardHeroProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 h-full relative overflow-hidden rounded-[2.5rem] p-10 group border border-white/10 bg-surface/30 backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.05)]"
        >
            {/* Animated Glow in background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none group-hover:from-emerald-500/20 transition-all duration-700" />

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <Bookmark className="w-5 h-5 fill-emerald-400/20" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Continuar Aprendiendo_</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight italic tracking-tighter max-w-xl">
                            {course.title}
                        </h2>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] text-platinum-dim font-black uppercase tracking-widest">Tiempo Restante</span>
                        <span className="text-xl font-black text-white italic">{course.timeLeft}</span>
                    </div>
                </div>

                <div className="space-y-6 my-10 bg-black/20 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-4xl font-black text-white italic tracking-tighter">{course.progress}%</span>
                        <span className="text-[10px] font-black text-platinum-dim uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {course.module}
                        </span>
                    </div>

                    <div className="h-3 w-full bg-deep-space/50 rounded-full overflow-hidden border border-white/5 relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 bg-[length:200%_auto] animate-gradient relative rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="group relative px-10 py-5 bg-cyan-400 text-deep-space font-black rounded-2xl transition-all hover:-translate-y-1 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-cyan-400/50 flex items-center gap-3 active:scale-95"
                    >
                        <span className="text-sm uppercase tracking-widest">Reanudar Curso_</span>
                        <Play className="w-4 h-4 fill-current" />
                        <div className="absolute inset-0 rounded-2xl bg-cyan-400 blur-xl -z-10 opacity-0 group-hover:opacity-40 transition-opacity" />
                    </Link>

                    <button className="text-platinum-dim hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors border-b border-platinum-dim/20 hover:border-white pb-1">
                        Detalles del Syllabus
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
