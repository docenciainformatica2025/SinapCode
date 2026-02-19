'use client';

import Link from 'next/link';
import { CourseCard } from '@/components/ui/course-card';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Code, Database, Shield, Cpu, Cloud, Smartphone, BookOpen, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const COURSES = [
    {
        id: 1,
        title: "Python para Data Science",
        slug: "python-data-science",
        level: "Principiante",
        duration: "12h",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80",
        progress: 0,
        category: "Data Science",
        isPopular: true,
        description: "Domina los fundamentos de Python aplicados al análisis de datos masivos y modelos predictivos."
    },
    {
        id: 2,
        title: "Hacking Ético Avanzado",
        slug: "hacking-etico",
        level: "Avanzado",
        duration: "45h",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        progress: 35,
        category: "Ciberseguridad",
        isPopular: true,
        description: "Aprende técnicas de penetración y defensa de infraestructuras críticas con estándares internacionales."
    },
    {
        id: 3,
        title: "React & Next.js Pro",
        slug: "react-nextjs-pro",
        level: "Intermedio",
        duration: "20h",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
        progress: 0,
        category: "Full Stack",
        isPopular: false,
        description: "Construye aplicaciones web de alto rendimiento con las últimas características de Next.js 14+."
    },
    {
        id: 4,
        title: "Arquitectura Cloud AWS",
        slug: "aws-cloud-architect",
        level: "Avanzado",
        duration: "30h",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        progress: 0,
        category: "Cloud Computing",
        isPopular: false,
        description: "Diseña infraestructuras escalables, seguras y de alta disponibilidad en el ecosistema de Amazon Web Services."
    },
    {
        id: 5,
        title: "Desarrollo Móvil con Flutter",
        slug: "flutter-development",
        level: "Principiante",
        duration: "18h",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
        progress: 0,
        category: "Mobile",
        isPopular: true,
        description: "Crea aplicaciones nativas para iOS y Android con una única base de código usando Flutter y Dart."
    },
    {
        id: 6,
        title: "DevOps & CI/CD Pipelines",
        slug: "devops-cicd",
        level: "Intermedio",
        duration: "25h",
        image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?auto=format&fit=crop&q=80",
        progress: 0,
        category: "DevOps",
        isPopular: false,
        description: "Automatiza el ciclo de vida de desarrollo de software con Jenkins, Docker y Kubernetes."
    }
];

const CATEGORIES = [
    { id: 'all', label: 'Todos', icon: Sparkles },
    { id: 'Data Science', label: 'Data & AI', icon: Database },
    { id: 'Ciberseguridad', label: 'Seguridad', icon: Shield },
    { id: 'Full Stack', label: 'Web Dev', icon: Code },
    { id: 'Cloud Computing', label: 'Cloud', icon: Cloud },
    { id: 'Mobile', label: 'Mobile', icon: Smartphone },
    { id: 'DevOps', label: 'DevOps', icon: Cpu },
];

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = COURSES.filter(course => {
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredCourse = COURSES.find(c => c.slug === 'hacking-etico');

    return (
        <div className="min-h-screen bg-deep-space text-white pb-20 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 pt-24 lg:pt-10">
                {/* Header */}
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter">Catálogo de Cursos</h1>
                    </motion.div>
                    <p className="text-platinum-dim text-lg max-w-2xl font-medium">Explora nuestra selección de rutas de aprendizaje de élite. Desde fundamentos hasta especializaciones avanzadas.</p>
                </header>

                {/* Filter & Search Bar */}
                <div className="bg-surface/40 backdrop-blur-2xl border border-white/5 p-4 rounded-[2rem] mb-12 shadow-2xl flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-2 lg:pb-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                                    selectedCategory === cat.id
                                        ? "bg-emerald-500 text-deep-space border-emerald-500 shadow-xl shadow-emerald-500/20"
                                        : "bg-white/5 text-platinum-dim border-white/5 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-dim group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-5 py-4 bg-deep-space/50 border border-white/10 rounded-2xl text-white placeholder-platinum-dim focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold shadow-inner"
                        />
                    </div>
                </div>

                {/* Featured Course */}
                {selectedCategory === 'all' && !searchQuery && featuredCourse && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-surface/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl">
                            <div className="relative h-72 lg:h-auto overflow-hidden">
                                <img src={featuredCourse.image} alt={featuredCourse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-deep-space/80 via-deep-space/20 to-transparent" />
                                <div className="absolute top-8 left-8 bg-emerald-500 text-deep-space text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                    Curso Destacado
                                </div>
                            </div>
                            <div className="p-10 lg:p-16 flex flex-col justify-center gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-emerald-400 text-xs font-black uppercase tracking-widest">
                                        <Layers className="w-4 h-4" />
                                        {featuredCourse.category}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{featuredCourse.title}</h3>
                                </div>
                                <p className="text-platinum-dim text-lg leading-relaxed font-medium">
                                    {featuredCourse.description}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <span className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-platinum-dim border border-white/5">🏆 Certificado Incluido</span>
                                    <span className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-platinum-dim border border-white/5">📅 {featuredCourse.duration} de Contenido</span>
                                </div>
                                <div className="pt-4">
                                    <Link
                                        href={`/courses/${featuredCourse.slug}`}
                                        className="inline-flex items-center gap-3 bg-emerald-500 text-deep-space font-black px-10 py-5 rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 group"
                                    >
                                        Empezar Ahora
                                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Courses Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredCourses.map((course, idx) => (
                            <motion.div
                                layout
                                key={course.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="h-full"
                            >
                                <CourseCard
                                    title={course.title}
                                    description={course.description}
                                    level={course.level}
                                    duration={course.duration}
                                    image={course.image}
                                    tags={[course.category]}
                                    slug={`/courses/${course.slug}`}
                                    isPro={true}
                                    progress={course.progress}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-32 bg-surface/20 rounded-[3rem] border border-white/5 border-dashed">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-platinum-dim" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">No encontramos cursos</h3>
                        <p className="text-platinum-dim font-medium">Prueba con otra categoría o término de búsqueda.</p>
                        <button
                            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                            className="mt-8 text-emerald-400 font-black text-xs uppercase tracking-widest hover:text-emerald-300 transition-colors"
                        >
                            Ver Todo el Catálogo
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
