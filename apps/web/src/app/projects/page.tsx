import { prisma } from '@/lib/prisma';
import { Github, ExternalLink, Calendar, Code, Play, Terminal, Database, Server, Smartphone, Globe } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ProjectWithAuthor {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    tags: string[];
    repoUrl: string | null;
    liveUrl: string | null;
    createdAt: Date;
    author: {
        name: string | null;
        image: string | null;
    } | null;
}

async function getProjects(): Promise<ProjectWithAuthor[]> {
    return await (prisma.cmsProject.findMany({
        where: { status: 'published' },
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { name: true, image: true }
            }
        }
    }) as any);
}

// Helper to get icon based on tag
const getTechIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('python')) return <Terminal className="w-4 h-4 text-yellow-500" />;
    if (t.includes('react') || t.includes('next')) return <Code className="w-4 h-4 text-blue-400" />;
    if (t.includes('node') || t.includes('js')) return <Server className="w-4 h-4 text-green-500" />;
    if (t.includes('data') || t.includes('sql')) return <Database className="w-4 h-4 text-purple-400" />;
    if (t.includes('mobile') || t.includes('flutter')) return <Smartphone className="w-4 h-4 text-cyan-400" />;
    return <Globe className="w-4 h-4 text-gray-400" />;
}

export default async function ProjectsPage() {
    const allProjects = await getProjects();
    const featuredProject = allProjects[0];
    const portfolioProjects = allProjects.slice(1);

    return (
        <div className="min-h-screen bg-deep-space text-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 pt-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                            Centro de Innovación
                        </h1>
                        <p className="text-platinum-dim text-lg">
                            Donde la creatividad técnica se encuentra con soluciones reales.
                        </p>
                    </div>
                    <Link
                        href="/submit-project"
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
                    >
                        <span>Presentar Desarrollo</span>
                        <Code className="w-4 h-4" />
                    </Link>
                </header>

                {/* Featured Project Section */}
                {featuredProject && (
                    <section className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-white/10 flex-1"></div>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-platinum">Impacto Destacado</h2>
                            <div className="h-px bg-white/10 flex-1"></div>
                        </div>

                        <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-primary/30 transition-colors group">
                            <div className="grid lg:grid-cols-2 gap-0">
                                {/* Media / Video Placeholder */}
                                <div className="relative h-[400px] lg:h-auto bg-black/40 group-hover:bg-black/20 transition-colors overflow-hidden">
                                    <Link href={`/projects/${featuredProject.id}`} className="absolute inset-0 z-20" aria-label={`Ver proyecto destacado ${featuredProject.title}`} />
                                    {featuredProject.thumbnail ? (
                                        <img
                                            src={featuredProject.thumbnail}
                                            alt={featuredProject.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/20 text-6xl font-mono">&lt;/&gt;</span>
                                        </div>
                                    )}
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 flex gap-2 z-30">
                                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                            {featuredProject.author?.image ? (
                                                <img src={featuredProject.author.image} alt={featuredProject.author.name || ''} className="w-6 h-6 rounded-full border border-white/20" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">
                                                    {featuredProject.author?.name?.charAt(0) || 'S'}
                                                </div>
                                            )}
                                            <span className="text-xs font-bold">{featuredProject.author?.name || 'Creator'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                        {featuredProject.title}
                                    </h3>
                                    <p className="text-platinum-dim text-lg mb-8 leading-relaxed line-clamp-4">
                                        {featuredProject.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {featuredProject.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-platinum-lighter">
                                                {getTechIcon(tag)}
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                        {featuredProject.repoUrl && (
                                            <a
                                                href={`https://${featuredProject.repoUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                <Github className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                Ver en GitHub
                                            </a>
                                        )}
                                        {featuredProject.liveUrl && (
                                            <a
                                                href={`https://${featuredProject.liveUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                <ExternalLink className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Grid Section */}
                <section>
                    <div className="flex items-center justify-center mb-12">
                        <h2 className="text-3xl font-bold text-white text-center">
                            Desarrollos SinapCode
                        </h2>
                    </div>

                    {portfolioProjects.length === 0 && !featuredProject ? (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                            <div className="text-6xl mb-4">🚀</div>
                            <p className="text-xl font-bold text-platinum">Pronto verás proyectos increíbles aquí.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {portfolioProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
                                >
                                    <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" aria-label={`Ver proyecto ${project.title}`} />

                                    {/* Thumbnail */}
                                    <div className="relative h-48 bg-black/40 overflow-hidden">
                                        {project.thumbnail ? (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-white/10 text-4xl font-mono">&lt;/&gt;</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                                        {/* Grid Stack Icons Overlay */}
                                        <div className="absolute bottom-3 left-4 flex gap-2 z-10">
                                            {project.tags.slice(0, 4).map(tag => (
                                                <div key={tag} className="w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform" title={tag}>
                                                    {getTechIcon(tag)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col relative z-0">
                                        <div className="flex items-center gap-2 mb-3">
                                            {project.author?.image ? (
                                                <img src={project.author.image} alt={project.author.name || ''} className="w-5 h-5 rounded-full" />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold">
                                                    {project.author?.name?.charAt(0)}
                                                </div>
                                            )}
                                            <span className="text-xs font-medium text-platinum-dim">{project.author?.name}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>

                                        <button className="mt-auto w-full py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold text-white transition-colors group-hover:border-primary/30 group-hover:text-primary">
                                            Ver Proyecto
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
