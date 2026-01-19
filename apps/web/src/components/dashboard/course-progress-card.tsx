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
            whileHover={{ scale: 1.02 }}
            className="glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-neural-blue transition-all"
        >
            <div className="relative h-32 overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="text-white font-bold text-sm mb-1">{course.title}</h3>
                    <span className="text-xs text-platinum-dim">{course.level}</span>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <div className="flex justify-between text-xs text-platinum-dim mb-1">
                        <span>Progreso</span>
                        <span className="font-bold text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neural-blue to-synapse-purple"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-platinum-dim mb-3">
                    <span>⏱️ {course.timeRemaining} restante</span>
                    <span>📍 {course.nextLesson}</span>
                </div>

                <Link
                    href={`/courses/${course.slug}`}
                    className="block w-full py-2 bg-neural-blue text-white text-center rounded-lg font-bold text-sm hover:bg-blue-600 transition"
                >
                    Continuar →
                </Link>
            </div>
        </motion.div>
    );
}
