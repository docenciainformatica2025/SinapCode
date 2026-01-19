import Link from 'next/link';
import { VideoPlayerWithGate } from '@/components/video/video-player-with-gate';
import { AITutorWithGate } from '@/components/ai/ai-tutor-with-gate';

export default function CoursePage({ params }: { params: { slug: string } }) {
    const modules = [
        { id: 1, title: 'Introducción a Python', lessons: 8, completed: 8 },
        { id: 2, title: 'Variables y Tipos de Datos', lessons: 12, completed: 7 },
        { id: 3, title: 'Estructuras de Control', lessons: 10, completed: 0 },
    ];

    return (
        <div className="min-h-screen bg-deep-space flex">
            {/* Sidebar */}
            <aside className="w-80 border-r border-white/10 p-6 overflow-y-auto">
                <Link href="/courses" className="text-platinum-dim hover:text-white mb-6 block">
                    ← Volver a Cursos
                </Link>

                <h2 className="text-2xl font-bold text-white mb-6">Python para Data Science</h2>

                <div className="space-y-4">
                    {modules.map(module => (
                        <div key={module.id} className="glass-panel p-4 rounded-lg">
                            <h3 className="text-white font-bold mb-2">{module.title}</h3>
                            <div className="text-xs text-platinum-dim">
                                {module.completed}/{module.lessons} lecciones completadas
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                                <div
                                    className="bg-neural-blue h-1.5 rounded-full"
                                    style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Video Player with Preview Gate */}
                    <VideoPlayerWithGate
                        videoUrl="/videos/python-intro.mp4"
                        courseSlug={params.slug}
                        lessonId="lesson-1"
                    />

                    {/* Lesson Info */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Lección 1: Introducción a Python
                        </h1>
                        <p className="text-platinum-dim mb-4">
                            Aprende los fundamentos de Python, el lenguaje más popular para Data Science.
                        </p>
                        <div className="flex gap-4 text-sm text-platinum-dim">
                            <span>⏱️ 15 minutos</span>
                            <span>📊 Principiante</span>
                            <span>✅ 2,450 completados</span>
                        </div>
                    </div>

                    {/* AI Tutor with Question Limit */}
                    <AITutorWithGate courseId={params.slug} />
                </div>
            </main>
        </div>
    );
}
