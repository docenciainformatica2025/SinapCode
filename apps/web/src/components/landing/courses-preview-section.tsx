'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CourseCard } from '@/components/ui/course-card';
import { useSession } from 'next-auth/react';

interface CoursesPreviewSectionProps {
    data?: any;
}

export function CoursesPreviewSection({ data }: CoursesPreviewSectionProps) {
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';

    const getCourseLink = (slug: string) => {
        if (isAuthenticated) {
            return `/courses/${slug}`;
        }
        return `/auth/login?callbackUrl=/courses/${slug}`;
    };

    const courses = [
        {
            title: 'Python para Data Science',
            description: 'Domina el análisis de datos con las librerías más potentes del mercado: Pandas, NumPy y Matplotlib.',
            level: 'Principiante',
            duration: '12h',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
            tags: ['IA', 'Data', 'Python'],
            isPro: true,
            slug: getCourseLink('python-data-science')
        },
        {
            title: 'Hacking Ético Avanzado',
            description: 'Aprende a proteger sistemas vulnerando su seguridad. Pentesting, OWASP y herramientas ofensivas.',
            level: 'Avanzado',
            duration: '45h',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
            tags: ['Seguridad', 'Kali', 'Redes'],
            isPro: true,
            slug: getCourseLink('hacking-etico')
        },
        {
            title: 'React & Next.js Pro',
            description: 'Construye aplicaciones web modernas y escalables con el stack número uno de la industria.',
            level: 'Intermedio',
            duration: '20h',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
            tags: ['Frontend', 'React', 'SSR'],
            slug: getCourseLink('react-pro')
        },
        {
            title: 'DevOps con Docker & K8s',
            description: 'Automatiza despliegues y gestiona contenedores como un experto en infraestructura moderna.',
            level: 'Avanzado',
            duration: '30h',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80',
            tags: ['DevOps', 'Cloud', 'CI/CD'],
            slug: getCourseLink('devops-master')
        },
        {
            title: 'Blockchain & Web3',
            description: 'Desarrolla contratos inteligentes y aplicaciones descentralizadas en Ethereum.',
            level: 'Intermedio',
            duration: '25h',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80',
            tags: ['Solidity', 'Web3', 'Crypto'],
            isPro: true,
            slug: getCourseLink('blockchain-dev')
        }
    ];

    return (
        <section id="courses" className="py-20 md:py-28 bg-black relative overflow-hidden section-spacing subpixel-text">
            <div className="absolute inset-0 mesh-gradient-green opacity-30 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 0.6, y: 0 }}
                            className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block"
                        >
                            Propulsión de Carrera
                        </motion.span>
                        <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold text-white mb-6 tracking-tight text-balance leading-[1.1]">
                            Trayectorias de <span className="text-apple-blue font-extrabold">Alto Impacto</span>
                        </h2>
                        <p className="text-base md:text-lg text-platinum-dim font-medium leading-relaxed max-w-xl opacity-70 text-pretty">
                            No solo aprendes, <span className="text-white/90">evolucionas</span>. Protocolos diseñados por ingenieros de élite para la frontera tecnológica.
                        </p>
                    </div>
                </div>

                <div className="
                    flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4
                    md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
                    scrollbar-hide
                "
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {courses.slice(0, 3).map((course, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="h-full min-w-[300px] sm:min-w-[350px] snap-center"
                        >
                            <CourseCard {...course} />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <Link
                        href={isAuthenticated ? "/courses" : "/auth/login"}
                        className="btn-primary group"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Ver todos los protocolos
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
