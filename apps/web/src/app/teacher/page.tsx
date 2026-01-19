import { MagicToolCard } from '@/components/teacher/magic-tool-card';
import { GlobalNavbar } from '@/components/global-navbar';

export const dynamic = 'force-dynamic';

export default function TeacherDashboard() {
    return (
        <div className="min-h-screen bg-deep-space text-foreground relative overflow-hidden">
            <GlobalNavbar />
            <div className="p-8 relative z-10">
                {/* Background Magic Sparkles */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

                <header className="mb-12 relative z-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-3">
                        Zona Docente Magic <span className="text-4xl">✨</span>
                    </h1>
                    <p className="text-platinum-dim mt-2 text-lg max-w-2xl">
                        Tu copiloto educativo con IA. Genera contenido pedagógico en segundos para potenciar tu clase.
                    </p>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    <MagicToolCard
                        icon="📝"
                        title="Generador de Rúbricas"
                        desc="Crea criterios de evaluación detallados para cualquier materia y nivel."
                        gradient="from-pink-500 to-rose-500"
                    />
                    <MagicToolCard
                        icon="🧠"
                        title="Quiz Maker IA"
                        desc="Genera 10 preguntas de selección múltiple sobre cualquier texto o tema."
                        gradient="from-purple-500 to-indigo-500"
                    />
                    <MagicToolCard
                        icon="📅"
                        title="Planificador de Clase"
                        desc="Estructura una sesión de 60 min con objetivos, actividades y cierre."
                        gradient="from-blue-500 to-cyan-500"
                    />
                    <MagicToolCard
                        icon="📧"
                        title="Email para Padres"
                        desc="Redacta comunicaciones profesionales y empáticas sobre el progreso."
                        gradient="from-emerald-500 to-teal-500"
                    />
                    <MagicToolCard
                        icon="💡"
                        title="Ideas de Proyectos"
                        desc="Sugerencias de ABP (Aprendizaje Basado en Proyectos) creativos."
                        gradient="from-amber-500 to-orange-500"
                    />
                </main>
            </div>
        </div>
    );
}
