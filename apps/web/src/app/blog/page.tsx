import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import { BlogFeed } from '@/components/blog/blog-feed';
import { NewsletterForm } from '@/components/blog/newsletter-form';
import { LatestInsights } from '@/components/blog/latest-insights';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
    title: 'SinapCode Insights | Blog de Ingeniería',
    description: 'Protocolos de conocimiento y análisis de vanguardia sobre IA, Computación Cuántica y Desarrollo de élite.',
};

export const dynamic = 'force-dynamic';

async function getPosts(showDrafts: boolean = false) {
    try {
        const posts = await prisma.cmsPost.findMany({
            where: showDrafts ? {} : {
                status: {
                    in: ['PUBLISHED', 'published', 'Published']
                }
            },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: { name: true, image: true }
                }
            }
        });
        return posts;
    } catch (error) {
        console.error("Fallo al obtener publicaciones del blog:", error);
        return [];
    }
}

export default async function BlogPage() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string })?.role;
    const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';

    const posts = await getPosts(isAdmin);

    const formattedPosts = posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        coverImage: post.coverImage || '',
        category: post.category || 'General',
        author: { name: post.author?.name || 'SinapCode Team' },
        createdAt: post.createdAt ? post.createdAt.toISOString() : new Date().toISOString(),
        readTime: '5 min'
    }));

    return (
        <div className="min-h-screen bg-[#F1F0E8] subpixel-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                {/* Header Premium */}
                <div className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1E1E]/5 border border-[#1E1E1E]/10 mb-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#C9A78A] italic">Protocolos de Conocimiento</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-[#1E1E1E] mb-10 tracking-tighter italic uppercase leading-none">
                        SinapCode <span className="text-[#C9A78A]">Insights</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#1E1E1E]/50 max-w-3xl mx-auto font-medium leading-relaxed italic">
                        Investigación de frontera y documentación técnica para ingenieros que diseñan el mañana.
                    </p>
                </div>

                {/* Latest Insights Section */}
                <div className="mb-24">
                    <LatestInsights posts={formattedPosts} />
                </div>

                {/* Main Content Feed */}
                <div className="mt-24">
                    <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-[#1E1E1E]/30 mb-12 italic">Archivo de Despliegues</h2>
                    <BlogFeed initialPosts={formattedPosts} />
                </div>

                {/* Newsletter Premium */}
                <div className="mt-32">
                    <NewsletterForm />
                </div>

                {/* Empty State */}
                {formattedPosts.length === 0 && (
                    <div className="mt-24 text-center">
                        <div className="inline-block bg-white px-12 py-10 rounded-3xl border border-[#1E1E1E]/10 shadow-sm">
                            <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4 italic tracking-tighter uppercase">Sin Despliegues Recientes</h3>
                            <p className="text-[#1E1E1E]/60 mb-8 font-light">SinapCode está sintetizando nuevos protocolos en este momento.</p>
                            <Link href="/" className="px-8 py-4 bg-[#F9E795] text-[#1E1E1E] rounded-full font-bold uppercase text-xs tracking-widest hover:brightness-95 transition-all">
                                Retornar al Núcleo
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


