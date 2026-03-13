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
            className="col-span-12 h-full relative overflow-hidden rounded-[2.5rem] p-10 group border border-[#1E1E1E]/5 bg-white shadow-[0_20px_50px_rgba(30,30,30,0.02)]"
        >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C9A78A]/5 to-transparent pointer-events-none group-hover:from-[#C9A78A]/10 transition-all duration-700" />

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#C9A78A]">
                            <Bookmark className="w-5 h-5 fill-[#C9A78A]/20" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">CONTINUAR APRENDIENDO</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] leading-tight italic tracking-tighter max-w-xl">
                            {course.title}
                        </h2>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] text-[#1E1E1E]/40 font-black uppercase tracking-widest">TIEMPO RESTANTE</span>
                        <span className="text-xl font-black text-[#1E1E1E] italic">{course.timeLeft}</span>
                    </div>
                </div>

                <div className="space-y-6 my-10 bg-[#F1F0E8]/50 p-8 rounded-[2rem] border border-[#1E1E1E]/5 backdrop-blur-xl">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-4xl font-black text-[#1E1E1E] italic tracking-tighter">{course.progress}%</span>
                        <span className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-widest bg-white/80 px-4 py-1.5 rounded-full border border-[#1E1E1E]/5 shadow-sm">
                            {course.module}
                        </span>
                    </div>

                    <div className="h-4 w-full bg-[#1E1E1E]/5 rounded-full overflow-hidden border border-[#1E1E1E]/5 relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-gradient-to-r from-[#C9A78A] via-[#E2C4A8] to-[#C9A78A] bg-[length:200%_auto] animate-gradient relative rounded-full shadow-[0_0_20px_rgba(201,167,138,0.3)]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="group relative px-10 py-5 bg-[#1E1E1E] text-[#F1F0E8] font-black rounded-2xl transition-all hover:-translate-y-1 shadow-2xl shadow-[#1E1E1E]/20 hover:shadow-[#1E1E1E]/30 flex items-center gap-3 active:scale-95"
                    >
                        <span className="text-xs uppercase tracking-[0.2em]">Reanudar Curso</span>
                        <Play className="w-4 h-4 fill-[#C9A78A] text-[#C9A78A]" />
                    </Link>

                    <button className="text-[#1E1E1E]/40 hover:text-[#1E1E1E] font-black text-[10px] uppercase tracking-[0.3em] transition-colors border-b-2 border-transparent hover:border-[#C9A78A] pb-1">
                        Syllabus
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
