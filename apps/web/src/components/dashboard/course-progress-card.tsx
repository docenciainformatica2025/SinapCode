'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CourseProgressCardProps {
    course: {
        slug: string;
        title: string;
        thumbnail: string;
        progress: number;
        nextLesson: string;
        timeRemaining: string;
        level: string;
    };
}

export function CourseProgressCard({ course }: CourseProgressCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-neural-blue/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col h-full"
        >
            <div className="relative h-40 overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/50 to-transparent" />

                <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 backdrop-blur-md text-white border border-white/10 mb-2">
                        {course.level}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-neural-blue transition-colors">
                        {course.title}
                    </h3>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-xs font-semibold tracking-wide">
                        <span className="text-platinum-dim">PROGRESO ACTUAL</span>
                        <span className="text-neural-blue">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neural-blue to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-platinum-dim/80 font-medium mb-5 px-1">
                    <div className="flex items-center gap-1.5">
                        <span className="text-gold">●</span>
                        <span>{course.timeRemaining} restantes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-neural-blue">NEXT</span>
                        <span className="max-w-[120px] truncate" title={course.nextLesson}>{course.nextLesson}</span>
                    </div>
                </div>

                <Link
                    href={`/courses/${course.slug}`}
                    className="mt-auto block w-full py-2.5 bg-white/5 hover:bg-neural-blue text-white text-center rounded-xl font-semibold text-sm border border-white/5 hover:border-neural-blue hover:shadow-neon-blue transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-0"
                >
                    <span>Continuar Aprendiendo</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
            </div>
        </motion.div>
    );
}
