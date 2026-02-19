'use client';

import Link from 'next/link';
import { VideoPlayerWithGate } from '@/components/video/video-player-with-gate';
import { AITutorWithGate } from '@/components/ai/ai-tutor-with-gate';
import { LessonSidebar, Module } from '@/components/courses/lesson-sidebar';
import { PaymentGate } from '@/components/gates/payment-gate';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function CoursePage({ params }: { params: { slug: string } }) {
    const { isGuest, user } = useAuth();
    const [showPaymentGate, setShowPaymentGate] = useState(false);

    // Mock Subscription Check (Replace with actual logic)
    const hasActiveSubscription = user?.role === 'PRO' || user?.role === 'ADMIN';

    useEffect(() => {
        if (!isGuest && !hasActiveSubscription) {
            setShowPaymentGate(true);
        }
    }, [isGuest, hasActiveSubscription]);

    // Mock Data (In a real app, fetch based on params.slug)
    const modules: Module[] = [
        {
            id: 1,
            title: 'Módulo 1: Fundamentos de Python',
            completedCount: 8,
            totalCount: 8,
            lessons: [
                { id: 'l1', title: 'Introducción al Curso', duration: '5:30', isCompleted: true, isLocked: false },
                { id: 'l2', title: 'Instalación de Entorno', duration: '12:15', isCompleted: true, isLocked: false },
                { id: 'l3', title: 'Variables y Tipos', duration: '15:45', isCompleted: true, isLocked: false },
            ]
        },
        {
            id: 2,
            title: 'Módulo 2: Estructuras de Control',
            completedCount: 2,
            totalCount: 12,
            lessons: [
                { id: 'l4', title: 'Condicionales If/Else', duration: '18:20', isCompleted: true, isLocked: false },
                { id: 'l5', title: 'Bucles For/While', duration: '22:10', isCompleted: true, isLocked: false, isCurrent: true },
                { id: 'l6', title: 'List Comprehensions', duration: '14:30', isCompleted: false, isLocked: true },
                { id: 'l7', title: 'Funciones Lambda', duration: '10:15', isCompleted: false, isLocked: true },
            ]
        },
        {
            id: 3,
            title: 'Módulo 3: Manipulación de Datos',
            completedCount: 0,
            totalCount: 10,
            lessons: [
                { id: 'l8', title: 'Importar Pandas', duration: '08:45', isCompleted: false, isLocked: true },
                { id: 'l9', title: 'DataFrames Básicos', duration: '25:00', isCompleted: false, isLocked: true },
            ]
        },
    ];

    return (
        <div className="h-screen bg-deep-space flex overflow-hidden">

            {/* Payment Gate Overlay */}
            <PaymentGate
                isOpen={showPaymentGate}
                onClose={() => setShowPaymentGate(false)}
                courseTitle="Python Data Science"
            />

            {/* Left Column: Content */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative">

                {/* Header Overlay */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-0" />

                <div className="relative z-10 p-6 md:p-10 max-w-5xl mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-platinum-dim mb-6">
                        <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
                        <span>/</span>
                        <Link href="/courses" className="hover:text-white transition">Cursos</Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Python Data Science</span>
                    </div>

                    {/* Title Area */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">
                            Bucles For y While en Python
                        </h1>
                        <p className="text-lg text-platinum max-w-2xl">
                            Domina el flujo de control repetitivo para procesar grandes conjuntos de datos eficientemente.
                        </p>
                    </div>

                    {/* Video Player */}
                    <div className="mb-8">
                        <VideoPlayerWithGate
                            videoUrl="/videos/python-intro.mp4"
                            courseSlug={params.slug}
                            lessonId="l5"
                            title="Bucles For y While"
                        />
                    </div>

                    {/* Lesson Actions & AI Tutor Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                        {/* Description & Resources */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-surface/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Acerca de esta lección</h3>
                                <div className="prose prose-invert max-w-none text-platinum-dim text-sm leading-relaxed">
                                    <p>
                                        En esta lección profundizaremos en las estructuras iterativas. Aprenderás cuándo usar un bucle `for`
                                        frente a un bucle `while`, cómo iterar sobre diccionarios y listas, y las trampas comunes de los bucles infinitos.
                                    </p>
                                    <p className="mt-4">
                                        <strong>Recursos Incluidos:</strong>
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 mt-2">
                                        <li>Cheat Sheet de Sintaxis Python (PDF)</li>
                                        <li>Notebook de Ejercicios (Colab)</li>
                                        <li>Dataset de prueba: `ventas_2024.csv`</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between">
                                <button className="px-6 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition flex items-center gap-2">
                                    <span>←</span> Lección Anterior
                                </button>
                                <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dim hover:scale-105 transition shadow-lg shadow-primary/20 flex items-center gap-2">
                                    Siguiente Lección <span>→</span>
                                </button>
                            </div>
                        </div>

                        {/* AI Tutor Sidebar (for desktop layout or stacked) */}
                        <div className="space-y-6">
                            <AITutorWithGate courseId={params.slug} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Column: Sidebar (Collapsible logic could be added here for mobile) */}
            <div className="hidden lg:block w-96 h-full border-l border-white/5 bg-deep-space/50 backdrop-blur-md">
                <LessonSidebar
                    modules={modules}
                    currentLessonId="l5"
                />
            </div>
        </div>
    );
}
