'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHero } from '@/components/dashboard/dashboard-hero';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { DashboardLearningPath } from '@/components/dashboard/dashboard-learning-path';
import { DashboardDeadlines } from '@/components/dashboard/dashboard-deadlines';
import { DashboardAchievements } from '@/components/dashboard/dashboard-achievements';
import { useAuth } from '@/contexts/auth-context';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isSimulating } = useAuth();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && !isSimulating && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) {
            router.push('/admin');
        }
    }, [user, isSimulating, router]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/dashboard');
                if (response.ok) {
                    const data = await response.json();
                    setDashboardData(data);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    if (!user || loading) {
        return (
            <div className="min-h-screen bg-deep-space flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin shadow-[0_0_20px_rgba(16,185,129,0.2)]" />
                    <p className="text-platinum-dim font-black text-xs uppercase tracking-[0.3em] animate-pulse">Iniciando Protocolos_</p>
                </motion.div>
            </div>
        );
    }

    const userName = user?.name?.split(' ')[0] || 'Alex';

    // Fallback if no real courses are found
    const activeCourse = dashboardData?.coursesInProgress?.[0] || {
        title: 'Introducción a la IA Generativa',
        module: 'Protocolo de Inicio - Pendiente',
        progress: 0,
        slug: 'intro-ia',
        image: '',
        timeLeft: '0 min'
    };

    return (
        <div className="min-h-screen bg-deep-space text-white p-6 lg:p-12 pb-24 md:pb-12 max-w-[1600px] mx-auto overflow-x-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 relative z-10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Protocolo de Usuario: Online_</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-2 italic">
                    ¡Bienvenido, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{userName}!</span>
                </h1>
                <p className="text-platinum-dim font-bold text-lg opacity-60">Centro de Operaciones Tácticas</p>
            </motion.header>

            {/* Row 1: Hero & Stats */}
            <div className="grid grid-cols-12 gap-8 mb-8">
                <div className="col-span-12 lg:col-span-8">
                    <DashboardHero course={{
                        ...activeCourse,
                        module: activeCourse.module || 'Módulo 1: Fundamentos',
                        progress: activeCourse.progress || 0,
                        timeLeft: activeCourse.timeLeft || '-- min'
                    }} />
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <DashboardStats stats={dashboardData?.stats} />
                </div>
            </div>

            {/* Row 2: Progress & Deadlines */}
            <div className="grid grid-cols-12 gap-8 mb-8">
                <div className="col-span-12 lg:col-span-7">
                    <DashboardLearningPath />
                </div>
                <div className="col-span-12 lg:col-span-5">
                    <DashboardDeadlines />
                </div>
            </div>

            {/* Row 3: Achievements */}
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                    <DashboardAchievements />
                </div>
            </div>
        </div>
    );
}
