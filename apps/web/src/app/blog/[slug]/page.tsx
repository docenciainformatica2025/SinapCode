import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LandingFooter } from '@/components/landing/landing-footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, User, Share2, Clock } from 'lucide-react';
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
        <div className="min-h-screen bg-[#F1F0E8] subpixel-text text-[#1E1E1E] selection:bg-[#C9A78A]/30">
            <main className="pt-24 pb-20">
                {/* Hero / Header */}
                <div className="relative h-[70vh] w-full overflow-hidden mb-16">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F1F0E8] via-[#F1F0E8]/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-black/10 z-[5]" /> {/* Global subtle dimming for readability */}
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover scale-100 transition-transform duration-[3s] group-hover:scale-110" />

                    <div className="absolute inset-0 flex flex-col justify-end pb-20 z-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                            <Link href="/blog" className="inline-flex items-center text-[#1E1E1E] hover:text-[#C9A78A] mb-12 transition-all font-black uppercase tracking-[0.4em] text-[9px] bg-white/40 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/40 shadow-xl group/back">
                                <ArrowLeft className="w-3.5 h-3.5 mr-3 group-hover/back:-translate-x-1 transition-transform" />
                                ESCALERA DE NOTICIAS
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1E1E1E] mb-10 leading-[0.95] tracking-[-0.04em] uppercase italic max-w-5xl">
                                {article.title}<span className="text-[#C9A78A]"></span>
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 text-[#1E1E1E]/50 text-[10px] font-black uppercase tracking-[0.25em]">
                                <div className="flex items-center gap-3 group/meta cursor-default">
                                    <div className="p-2.5 bg-white/50 backdrop-blur-md rounded-xl border border-white/20 group-hover/meta:bg-[#C9A78A]/10 transition-colors">
                                        <User className="w-3.5 h-3.5 text-[#C9A78A]" />
                                    </div>
                                    <span className="group-hover/meta:text-[#1E1E1E] transition-colors">{article.author}</span>
                                </div>
                                <div className="flex items-center gap-3 group/meta cursor-default">
                                    <div className="p-2.5 bg-white/50 backdrop-blur-md rounded-xl border border-white/20 group-hover/meta:bg-[#C9A78A]/10 transition-colors">
                                        <Calendar className="w-3.5 h-3.5 text-[#C9A78A]" />
                                    </div>
                                    <span className="group-hover/meta:text-[#1E1E1E] transition-colors">{article.date}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-[#1E1E1E] text-white px-6 py-2.5 rounded-full shadow-2xl shadow-[#1E1E1E]/20 hover:scale-105 transition-transform">
                                    <Clock className="w-3.5 h-3.5 text-[#C9A78A]" />
                                    <span className="subpixel-text">{article.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Article */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:text-[#1E1E1E] prose-p:text-[#1E1E1E]/80 prose-p:leading-relaxed prose-strong:text-[#1E1E1E] prose-blockquote:border-[#C9A78A]/50 prose-blockquote:bg-white/50 prose-blockquote:p-6 prose-blockquote:rounded-2xl">
                            {article.subtitle && (
                                <p className="lead text-2xl text-[#1E1E1E] mb-12 border-l-4 border-[#C9A78A] pl-8 font-bold italic opacity-90 leading-snug">
                                    {article.subtitle}
                                </p>
                            )}
                            <div className="markdown-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {article.content}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Share / Tags */}
                        <div className="mt-20 pt-10 border-t border-[#1E1E1E]/10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex flex-wrap gap-3">
                                {article.tags.map((tag: string) => (
                                    <span key={tag} className="px-6 py-2 rounded-full bg-white border border-[#1E1E1E]/5 text-[10px] font-black uppercase tracking-widest text-[#1E1E1E]/60 hover:border-[#C9A78A]/30 hover:text-[#C9A78A] transition-all cursor-default shadow-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <button className="group flex items-center gap-3 text-[#C9A78A] hover:text-[#1E1E1E] transition-all font-black text-xs uppercase tracking-widest">
                                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Compartir Protocolo
                            </button>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Status Widget */}
                        <div className="p-10 rounded-[3rem] bg-white border border-[#1E1E1E]/5 shadow-[0_20px_60px_rgba(30,30,30,0.03)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/5 rounded-full blur-3xl" />
                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Despliegue Operativo</span>
                            </div>
                            <h3 className="text-2xl font-black text-[#1E1E1E] mb-6 italic uppercase tracking-tighter">SinapCode Intelligence</h3>
                            <p className="text-[#1E1E1E]/60 text-sm mb-10 font-medium leading-relaxed">
                                Este reporte ha sido sintetizado y validado por los núcleos de IA de SinapCode bajo protocolos de alta disponibilidad.
                            </p>
                            <Link href="/auth/register" className="block w-full py-5 bg-[#1E1E1E] text-white text-center font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#C9A78A] transition-all shadow-xl active:scale-95 group-hover:shadow-[#C9A78A]/20">
                                Unirse al Cluster
                            </Link>
                        </div>

                        {/* Related News */}
                        <div className="p-10 rounded-[3rem] bg-[#1E1E1E]/5 border border-[#1E1E1E]/5">
                            <h3 className="text-xl font-black text-[#1E1E1E] mb-10 italic uppercase tracking-widest opacity-30">Tendencias Radar</h3>
                            <div className="space-y-12">
                                {[1, 2].map(i => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="text-[10px] text-[#C9A78A] font-black mb-3 uppercase tracking-[0.2em]">SISTEMAS IA</div>
                                        <h4 className="text-lg font-bold text-[#1E1E1E] group-hover:text-[#C9A78A] transition-colors mb-4 leading-tight tracking-tight">
                                            Arquitectura Zero-Trust para redes neuronales distribuidas
                                        </h4>
                                        <div className="text-[10px] text-[#1E1E1E]/30 font-black tracking-widest uppercase">4 min lectura</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
