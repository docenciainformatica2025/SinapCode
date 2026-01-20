'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CourseCard } from '@/components/ui/course-card';

export function CoursesPreviewSection() {
    const courses = [
        {
            title: 'Python para Data Science',
            description: 'Domina el análisis de datos con las librerías más potentes del mercado: Pandas, NumPy y Matplotlib.',
            level: 'Principiante',
            duration: '12h',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
            tags: ['IA', 'Data', 'Python'],
            isPro: true
        },
        {
            title: 'Hacking Ético Avanzado',
            description: 'Aprende a proteger sistemas vulnerando su seguridad. Pentesting, OWASP y herramientas ofensivas.',
            level: 'Avanzado',
            duration: '45h',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
            tags: ['Seguridad', 'Kali', 'Redes'],
            isPro: true
        },
        {
            title: 'React & Next.js Pro',
            description: 'Construye aplicaciones web modernas y escalables con el stack número uno de la industria.',
            level: 'Intermedio',
            duration: '20h',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
            tags: ['Frontend', 'React', 'SSR'],
        },
        {
            title: 'DevOps con Docker & K8s',
            description: 'Automatiza despliegues y gestiona contenedores como un experto en infraestructura moderna.',
            level: 'Avanzado',
            duration: '30h',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80',
            tags: ['DevOps', 'Cloud', 'CI/CD'],
        },
        {
            title: 'Blockchain & Web3',
            description: 'Desarrolla contratos inteligentes y aplicaciones descentralizadas en Ethereum.',
            level: 'Intermedio',
            duration: '25h',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80',
            tags: ['Solidity', 'Web3', 'Crypto'],
            isPro: true
        }
    ];

    return (
        <section id="cursos" className="py-24 bg-bg relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-borderSoft to-transparent" />

            <div className="container-page">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Cursos que <span className="text-primary">Transforman</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Rutas de aprendizaje diseñadas por expertos para llevarte desde cero hasta nivel profesional.
                    </p>
                </div>

                <div className="
                    flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4
                    md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
                    scrollbar-hide
                "
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {courses.slice(0, 3).map((course, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full min-w-[280px] sm:min-w-[320px] snap-center"
                        >
                            <CourseCard {...course} />
                        </motion.div>
                    ))}

                </div>

                <div className="text-center mt-8 md:mt-16">
                    <Link
                        href="/courses"
                        className="inline-block px-8 py-4 bg-surfaceSoft text-white rounded-xl font-bold hover:bg-surfaceSoft/80 transition-all border border-white/10 hover:border-gold/50 shadow-soft hover:shadow-glow-gold"
                    >
                        Explorar Full Stack IA →
                    </Link>
                </div>
            </div>
        </section>
    );
}
