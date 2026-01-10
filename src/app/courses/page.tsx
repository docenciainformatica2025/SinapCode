import Link from 'next/link';
import { GlobalNavbar } from '@/components/global-navbar';

export default function CoursesPage() {
    const courses = [
        {
            id: 1,
            title: "Python para Data Science",
            slug: "python-data-science",
            level: "Principiante",
            duration: "12h",
            image: "https://images.unsplash.com/photo-1526379095098-d400fdbfbf08?auto=format&fit=crop&q=80",
            progress: 0
        },
        {
            id: 2,
            title: "Hacking Ético Avanzado",
            slug: "hacking-etico",
            level: "Avanzado",
            duration: "45h",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
            progress: 35
        },
        {
            id: 3,
            title: "React & Next.js Pro",
            slug: "react-nextjs-pro",
            level: "Intermedio",
            duration: "20h",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
            progress: 0
        }
    ];

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />

            <main className="max-w-7xl mx-auto p-8">
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-platinum-dim hover:text-white transition group mb-4">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Volver al Dashboard
                    </Link>
                    <header>
                        <h1 className="text-4xl font-bold text-white mb-4">Explora el Futuro 🚀</h1>
                        <p className="text-platinum-dim text-lg">Rutas de aprendizaje diseñadas por expertos de la industria.</p>
                    </header>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-neural-blue rounded-full"></span>
                        Tendencias Globales
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <Link href={`/courses/${course.slug}`} key={course.id} className="group relative block rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-neural-blue transition-all duration-300 hover:scale-[1.02]">
                                <div className="aspect-video relative">
                                    <img src={course.image} alt={course.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition" />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                        {course.level}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neural-blue transition">{course.title}</h3>
                                    <div className="flex items-center gap-4 text-xs text-platinum-dim mb-4">
                                        <span className="flex items-center gap-1">⏱️ {course.duration}</span>
                                        <span className="flex items-center gap-1">🏆 Certificado</span>
                                    </div>

                                    {course.progress > 0 ? (
                                        <div className="w-full bg-deep-space rounded-full h-1.5 mt-2">
                                            <div className="bg-brain-spark h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                    ) : (
                                        <div className="text-neural-blue text-sm font-bold flex items-center gap-1 mt-2">
                                            Comenzar Ahora →
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
