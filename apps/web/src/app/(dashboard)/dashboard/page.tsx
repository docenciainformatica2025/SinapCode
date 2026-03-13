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
            <div className="min-h-screen bg-[#F1F0E8] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-16 h-16 border-4 border-[#C9A78A]/20 border-t-[#C9A78A] rounded-full animate-spin shadow-[0_0_20px_rgba(201,167,138,0.2)]" />
                    <p className="text-[#1E1E1E]/40 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Iniciando Protocolos_</p>
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
        <div className="min-h-screen bg-[#F1F0E8] text-[#1E1E1E] p-6 lg:p-12 pb-24 md:pb-12 max-w-[1600px] mx-auto overflow-x-hidden relative selection:bg-[#C9A78A]/30">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A78A]/5 rounded-full blur-[150px] -z-10" />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 relative z-10"
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#C9A78A] rounded-full animate-pulse shadow-[0_0_10px_rgba(201,167,138,0.5)]" />
                    <span className="text-[10px] font-black text-[#1E1E1E] uppercase tracking-[0.3em] opacity-40">CENTRO DE OPERACIONES TÁCTICAS_</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-black text-[#1E1E1E] tracking-tighter leading-none mb-3 italic">
                    ¡Bienvenido, <span className="text-[#C9A78A]">{userName}!</span>
                </h1>
                <p className="text-[#1E1E1E]/40 font-black text-xs uppercase tracking-[0.3em]">Protocolo de Usuario: <span className="text-[#C9A78A]">Online_</span></p>
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
