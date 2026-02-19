import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import { BlogFeed } from '@/components/blog/blog-feed';
import { NewsletterForm } from '@/components/blog/newsletter-form';
import { LatestInsights } from '@/components/blog/latest-insights';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
    title: 'Nexus Insights | Blog de Ingeniería SinapCode',
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
        <div className="min-h-screen bg-black subpixel-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
                {/* Header 4K */}
                <div className="mb-24 text-center">
                    <motion_div_placeholder className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-4k mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-platinum italic">Protocolos de Conocimiento</span>
                    </motion_div_placeholder>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic uppercase text-glow">
                        Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">Insights</span>
                    </h1>

                    <p className="text-xl text-platinum-dim max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
                        Investigación de frontera y documentación técnica para ingenieros que diseñan el mañana.
                    </p>
                </div>

                {/* Latest Insights Section */}
                <div className="mb-24 section-spacing">
                    <LatestInsights />
                </div>

                {/* Main Content Feed */}
                <div className="section-spacing">
                    <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white/40 mb-12 italic">Archivo de Despliegues</h2>
                    <BlogFeed initialPosts={formattedPosts} />
                </div>

                {/* Newsletter Premium */}
                <div className="mt-32 section-spacing">
                    <NewsletterForm />
                </div>

                {/* Empty State */}
                {formattedPosts.length === 0 && (
                    <div className="mt-24 text-center">
                        <div className="inline-block glass-4k px-12 py-10 rounded-3xl border border-white/5">
                            <h3 className="text-2xl font-black text-white mb-4 italic tracking-tighter uppercase">Sin Despliegues Recientes</h3>
                            <p className="text-platinum-dim mb-8 font-medium">NEXUS está sintetizando nuevos protocolos en este momento.</p>
                            <Link href="/" className="px-8 py-4 bg-white text-black rounded-xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
                                Retornar al Núcleo
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Minimal placeholder for motion.div since I'm in a Server Component context
function motion_div_placeholder({ children, className }: any) {
    return <div className={className}>{children}</div>;
}
