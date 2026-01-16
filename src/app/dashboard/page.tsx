'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlobalNavbar } from '@/components/global-navbar';
import { StatCard } from '@/components/dashboard/stat-card';
import { ProgressRing } from '@/components/dashboard/progress-ring';
import { CourseProgressCard } from '@/components/dashboard/course-progress-card';
import { AIRecommendations } from '@/components/dashboard/ai-recommendations';
import { StudyCalendar } from '@/components/dashboard/study-calendar';
import { AchievementsShowcase } from '@/components/dashboard/achievements-showcase';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        } else if (status === 'authenticated' && (session?.user as any)?.role === 'ADMIN') {
            router.push('/admin');
        }
    }, [status, router, session]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <div className="text-white text-xl">Cargando...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const userName = session?.user?.name?.split(' ')[0] || 'Estudiante'; // Get first name or fallback

    const coursesInProgress = [
        {
            slug: 'python-data-science',
            title: 'Python para Data Science',
            thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
            progress: 65,
            nextLesson: 'Lección 8: Pandas',
            timeRemaining: '4h 30m',
            level: 'Principiante',
        },
        {
            slug: 'hacking-etico',
            title: 'Hacking Ético Avanzado',
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
            progress: 35,
            nextLesson: 'Lección 12: SQL Injection',
            timeRemaining: '28h 15m',
            level: 'Avanzado',
        },
    ];

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />

            <main className="max-w-7xl mx-auto p-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        ¡Bienvenido de vuelta, <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural-blue to-synapse-purple">{userName}</span>! 👋
                    </h1>
                    <p className="text-platinum-dim text-lg">
                        Continúa tu viaje de aprendizaje. Llevas <span className="text-accent-gold font-bold">5 días</span> de racha 🔥
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<span>⚡</span>}
                        value="2,450"
                        label="XP Total"
                        trend={{ value: '+120 esta semana', isPositive: true }}
                    />
                    <StatCard
                        icon={<span>📚</span>}
                        value="3"
                        label="Cursos Activos"
                        trend={{ value: '+1 este mes', isPositive: true }}
                    />
                    <StatCard
                        icon={<span>🏆</span>}
                        value="12"
                        label="Certificados"
                        trend={{ value: '+2 este mes', isPositive: true }}
                    />
                    <StatCard
                        icon={<span>🔥</span>}
                        value="5"
                        label="Días de Racha"
                        trend={{ value: 'Récord: 12 días', isPositive: true }}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Column - Courses in Progress */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-neural-blue rounded-full"></span>
                                Cursos en Progreso
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {coursesInProgress.map((course) => (
                                    <CourseProgressCard key={course.slug} course={course} />
                                ))}
                            </div>
                        </div>

                        {/* Overall Progress */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Progreso General</h3>
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <ProgressRing progress={65} color="#3b82f6" />
                                    <div className="mt-3 text-sm text-platinum-dim">Python</div>
                                </div>
                                <div className="text-center">
                                    <ProgressRing progress={35} color="#a855f7" />
                                    <div className="mt-3 text-sm text-platinum-dim">Hacking</div>
                                </div>
                                <div className="text-center">
                                    <ProgressRing progress={0} color="#10b981" />
                                    <div className="mt-3 text-sm text-platinum-dim">Próximo</div>
                                </div>
                            </div>
                        </div>

                        {/* Study Calendar */}
                        <StudyCalendar />
                    </div>

                    {/* Right Column - AI Recommendations */}
                    <div className="space-y-6">
                        <AIRecommendations />
                        <AchievementsShowcase />
                    </div>
                </div>
            </main>
        </div>
    );
}
