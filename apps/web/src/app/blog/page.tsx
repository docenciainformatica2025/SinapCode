import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import { BlogFeed } from '@/components/blog/blog-feed';
import { NewsletterForm } from '@/components/blog/newsletter-form';
import { LatestInsights } from '@/components/blog/latest-insights';
import { Metadata } from 'next';
import { GlobalNavbar } from '@/components/global-navbar';

export const metadata: Metadata = {
    title: 'Blog de SinapCode | Artículos y Guías Tech',
    description: 'Recursos, tutoriales y noticias sobre programación, IA, y desarrollo profesional.',
};

// Force dynamic to ensure new posts appear
export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";

// ... (Metadata stays same)

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
        console.error("Failed to fetch blog posts:", error);
        return [];
    }
}

export default async function BlogPage() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string })?.role;
    const isAdmin = userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';

    // 1. Fetch Posts (Show drafts only for admins)
    const posts = await getPosts(isAdmin);

    // 2. Format for Client Component
    const formattedPosts = posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        coverImage: post.coverImage || '',
        category: post.category || 'General',
        author: { name: post.author?.name || 'SinapCode Team' },
        createdAt: post.createdAt ? post.createdAt.toISOString() : new Date().toISOString(),
        readTime: '5 min' // Placeholder
    }));

    return (
        <div className="min-h-screen bg-deep-space">
            <GlobalNavbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
                {/* Header */}
                <div className="mb-12 text-center pt-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-gold/20 text-xs font-mono text-gold mb-4 animate-in fade-in zoom-in duration-500">
                        SINAPCODE INSIGHTS
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-purple-500">Recursos</span>
                    </h1>
                    <p className="text-lg text-[#B8BFC9] max-w-2xl mx-auto">
                        Domina las últimas tecnologías. Guías profundas, tutoriales y análisis de mercado para desarrolladores que quieren ir más allá.
                    </p>
                </div>

                {/* Latest Insights (New) */}
                <LatestInsights />

                {/* Main Content (Feed + Filters) */}
                <div className="mt-12">
                    <BlogFeed initialPosts={formattedPosts} />
                </div>

                {/* Newsletter Section */}
                <NewsletterForm />

                {/* Coming Soon Notice (Only if no posts and no error) */}
                {formattedPosts.length === 0 && (
                    <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="inline-block glass-panel px-8 py-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                            <h3 className="text-xl font-bold text-white mb-2">🚀 Próximamente</h3>
                            <p className="text-platinum-dim mb-4">Estamos preparando contenido de clase mundial para ti.</p>
                            <Link href="/" className="text-neural-blue hover:text-white transition font-medium">
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
