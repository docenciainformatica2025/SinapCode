'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function CoursesPreviewSection() {
    const courses = [
        {
            title: 'Python para Data Science',
            level: 'Principiante',
            duration: '12h',
            students: '2.4K',
            image: 'https://images.unsplash.com/photo-1526379095098-d400fdbfbf08?auto=format&fit=crop&q=80',
            tags: ['IA', 'Pandas', 'NumPy'],
        },
        {
            title: 'Hacking Ético Avanzado',
            level: 'Avanzado',
            duration: '45h',
            students: '1.8K',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
            tags: ['Pentesting', 'OWASP', 'Kali'],
        },
        {
            title: 'React & Next.js Pro',
            level: 'Intermedio',
            duration: '20h',
            students: '3.1K',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
            tags: ['Frontend', 'SSR', 'TypeScript'],
        },
        {
            title: 'DevOps con Docker & K8s',
            level: 'Avanzado',
            duration: '30h',
            students: '1.5K',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80',
            tags: ['Docker', 'Kubernetes', 'CI/CD'],
        },
        {
            title: 'Blockchain & Web3',
            level: 'Intermedio',
            duration: '25h',
            students: '2.2K',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80',
            tags: ['Solidity', 'Ethereum', 'NFT'],
        },
        {
            title: 'Machine Learning',
            level: 'Avanzado',
            duration: '40h',
            students: '1.9K',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
            tags: ['TensorFlow', 'PyTorch', 'ML'],
        },
    ];

    return (
        <section id="cursos" className="py-20 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Cursos que Transforman Carreras
                    </h2>
                    <p className="text-xl text-platinum-dim max-w-2xl mx-auto mb-8">
                        Desde cero hasta profesional. Cada curso diseñado por expertos de la industria.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {courses.map((course, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-neural-blue transition-all group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-xs font-bold text-white z-10">
                                    {course.level}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neural-blue transition">
                                    {course.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.tags.map((tag, j) => (
                                        <span
                                            key={j}
                                            className="text-xs px-2 py-1 bg-white/10 rounded text-platinum-dim"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm text-platinum-dim">
                                    <span>⏱️ {course.duration}</span>
                                    <span>👥 {course.students}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/courses"
                        className="inline-block px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20 hover:border-neural-blue"
                    >
                        Ver Todos los Cursos (50+) →
                    </Link>
                </div>
            </div>
        </section>
    );
}
