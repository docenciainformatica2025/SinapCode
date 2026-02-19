'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Types (can be moved to a shared types file later)
export interface Lesson {
    id: string;
    title: string;
    duration: string;
    isCompleted: boolean;
    isLocked: boolean;
    isCurrent?: boolean;
}

export interface Module {
    id: number;
    title: string;
    lessons: Lesson[];
    completedCount: number;
    totalCount: number;
}

interface LessonSidebarProps {
    modules: Module[];
    currentLessonId: string;
    className?: string;
}

export function LessonSidebar({ modules, currentLessonId, className }: LessonSidebarProps) {
    // State to track expanded modules. Default to all expanded or logic based on current lesson
    const [expandedModules, setExpandedModules] = useState<number[]>(modules.map(m => m.id));

    const toggleModule = (moduleId: number) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    return (
        <aside className={cn("flex flex-col h-full bg-surface/30 backdrop-blur-xl border-l border-white/5", className)}>
            <div className="p-6 border-b border-white/10">
                <Link href="/courses" className="text-xs text-primary font-bold uppercase tracking-wider hover:text-primary-dim transition-colors mb-4 inline-block">
                    ← Volver a Cursos
                </Link>
                <h2 className="text-xl font-bold text-white leading-tight">
                    Contenido del Curso
                </h2>

                {/* Overall Progress could go here */}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {modules.map((module) => (
                    <div key={module.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/5 transition-all hover:border-white/10">
                        {/* Module Header */}
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                            <div>
                                <h3 className="text-sm font-bold text-white mb-1">{module.title}</h3>
                                <div className="text-[10px] text-platinum-dim font-medium uppercase tracking-wider flex items-center gap-2">
                                    <span>{module.completedCount}/{module.totalCount} Completado</span>
                                    {/* Mini Progress Bar */}
                                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-500"
                                            style={{ width: `${(module.completedCount / module.totalCount) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className={cn("text-platinum-dim transition-transform duration-300", expandedModules.includes(module.id) ? "rotate-180" : "")}>
                                ▼
                            </span>
                        </button>

                        {/* Lessons List */}
                        <AnimatePresence initial={false}>
                            {expandedModules.includes(module.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="border-t border-white/5">
                                        {module.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                disabled={lesson.isLocked}
                                                className={cn(
                                                    "w-full p-3 pl-4 flex items-center gap-3 text-left transition-all border-l-2",
                                                    lesson.id === currentLessonId
                                                        ? "bg-primary/10 border-primary"
                                                        : "border-transparent hover:bg-white/5",
                                                    lesson.isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                                )}
                                            >
                                                {/* Status Icon */}
                                                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                                    {lesson.isCompleted ? (
                                                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/50">
                                                            ✓
                                                        </div>
                                                    ) : lesson.isLocked ? (
                                                        <span className="text-gray-500 text-xs">🔒</span>
                                                    ) : lesson.id === currentLessonId ? (
                                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        "text-sm font-medium truncate",
                                                        lesson.id === currentLessonId ? "text-primary" : "text-platinum"
                                                    )}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className="text-[10px] text-platinum-dim mt-0.5 flex items-center gap-1">
                                                        <span>🎥</span> {lesson.duration}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </aside>
    );
}
