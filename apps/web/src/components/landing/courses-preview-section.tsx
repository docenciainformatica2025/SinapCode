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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.6 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-platinum mb-4 block italic"
                        >
                            Propulsión de Carrera
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter italic leading-tight">
                            TRAYECTORIAS DE <span className="text-primary italic">ALTO IMPACTO</span>
                        </h2>
                        <p className="text-xl text-platinum-dim font-medium leading-relaxed max-w-2xl">
                            No solo aprendes, <span className="text-white">evolucionas</span>. Protocolos diseñados por ingenieros senior para llevarte a la frontera tecnológica.
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

                <div className="text-center mt-12">
                    <Link
                        href={isAuthenticated ? "/courses" : "/auth/login"}
                        className="inline-flex items-center gap-4 px-12 py-6 bg-white border border-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-2xl hover:-translate-y-1 active:scale-95"
                    >
                        Descubrir tu Siguiente Nivel
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
