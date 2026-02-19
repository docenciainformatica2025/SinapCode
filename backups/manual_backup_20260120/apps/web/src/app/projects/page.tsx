import { GlobalNavbar } from '@/components/global-navbar';
import { prisma } from '@/lib/prisma';
import { Github, ExternalLink, Calendar, Tag } from 'lucide-react';
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

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4 pt-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gold/20 text-xs font-mono text-gold mb-4 animate-in fade-in zoom-in duration-500">
                        PORTAFOLIO DE ESTUDIANTES
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Construyendo el <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-purple-500">Futuro</span>
                    </h1>
                    <p className="text-lg text-platinum-dim max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                        Proyectos reales desarrollados por nuestros estudiantes durante su formación.
                        Desde algoritmos de IA hasta plataformas DeFi descentralizadas.
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-platinum-dim text-lg">🚀 Estamos cargando los próximos proyectos increíbles.</p>
                        <p className="text-sm text-muted mt-2">Vuelve pronto para ver el showcase.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-neural-blue/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Project Image Area */}
                                <div className="relative h-48 overflow-hidden bg-black/40 group-hover:bg-black/20 transition-colors">
                                    {project.thumbnail ? (
                                        <img
                                            src={project.thumbnail || undefined}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                            <span className="text-4xl font-mono opacity-50">&lt;/&gt;</span>
                                        </div>
                                    )}

                                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex gap-2 ml-auto">
                                            {project.repoUrl && (
                                                <a href={`https://${project.repoUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur rounded-full hover:bg-white text-white hover:text-black transition" title="Ver Código">
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a href={`https://${project.liveUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur rounded-full hover:bg-neural-blue text-white transition" title="Ver Demo en Vivo">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {project.tags.map((tag: string) => (
                                            <span key={tag} className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-white/5 text-neural-blue border border-white/5 uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neural-blue transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-platinum-dim mb-6 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {project.author?.image ? (
                                                <img src={project.author.image || undefined} alt={project.author.name || ''} className="w-8 h-8 rounded-full border border-white/10" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neural-blue to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                                                    {project.author?.name?.charAt(0) || 'S'}
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white">{project.author?.name || 'Estudiante SinapCode'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-xs text-muted gap-1" title="Fecha de publicación">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(project.createdAt).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
