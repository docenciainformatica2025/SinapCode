import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LandingFooter } from '@/components/landing/landing-footer';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const post = await prisma.cmsPost.findUnique({
        where: { slug },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    if (!post) {
        notFound();
    }

    const article = {
        title: post.title,
        subtitle: post.excerpt || "",
        author: post.author?.name || "SinapCode Team",
        date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : "Sin fecha",
        readTime: "5 min lectura",
        image: post.coverImage || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
        content: post.content,
        tags: post.tags || ['IA', 'Futuro', 'Tech']
    };

    return (
        <div className="min-h-screen bg-bg subpixel-text">
            <main className="pt-24 pb-20">
                {/* Hero / Header */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-gradient-to-t from-bg to-transparent">
                        <div className="container-page">
                            <Link href="/blog" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-bold uppercase tracking-widest text-xs">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver a Noticias
                            </Link>
                            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight italic uppercase text-glow">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-platinum-dim text-sm font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{article.date}</span>
                                </div>
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container-page mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Article */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-p:text-platinum-dim prose-p:leading-relaxed">
                            {article.subtitle && (
                                <p className="lead text-xl text-white mb-8 border-l-4 border-primary pl-4 font-bold italic opacity-90">
                                    {article.subtitle}
                                </p>
                            )}
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>

                        {/* Share / Tags */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag: string) => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full bg-surface border border-white/5 text-[10px] font-black uppercase tracking-widest text-platinum-dim hover:border-primary/30 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 text-primary hover:text-white transition-colors font-black text-xs uppercase tracking-widest">
                                <Share2 className="w-5 h-5" />
                                Compartir Protocolo
                            </button>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Status Widget */}
                        <div className="p-8 rounded-3xl glass-4k border border-white/5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Despliegue Operativo</span>
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 italic uppercase">Nexus Intelligence</h3>
                            <p className="text-platinum-dim text-sm mb-6 font-medium leading-relaxed">Este reporte ha sido sintetizado y validado por los núcleos de IA de SinapCode.</p>
                            <Link href="/auth/register" className="block w-full py-4 bg-white text-black text-center font-black rounded-xl text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95">
                                Unirse al Cluster
                            </Link>
                        </div>

                        {/* Related News */}
                        <div className="p-8 rounded-3xl bg-surface/30 border border-white/5">
                            <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tighter">Tendencias Radar</h3>
                            <div className="space-y-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="text-[10px] text-primary font-black mb-2 uppercase tracking-widest">SISTEMAS IA</div>
                                        <h4 className="font-bold text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                                            Arquitectura Zero-Trust para redes neuronales distribuidas
                                        </h4>
                                        <div className="text-[10px] text-white/30 font-black tracking-widest uppercase">4 min lectura</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
