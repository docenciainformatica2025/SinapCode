import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLegalDocument } from '@/lib/markdown';
import { siteConfig } from '@/lib/site-config';
import { LegalDocumentSchema } from '@/components/seo/legal-document-schema';
import { legalTokens as tokens } from '@/lib/constants/legal-tokens';

export default function PrivacyPage() {
    const { content, frontmatter } = getLegalDocument('privacy/global_privacy_policy.md');

    return (
        <div className={`flex flex-col min-h-screen ${tokens.colors.background} selection:bg-[#C9A78A]/30`}>
            <main className="flex-grow pt-32 pb-24">
                <LegalDocumentSchema
                    title={frontmatter.title || "Política de Privacidad"}
                    version={frontmatter.version || "1.0.0"}
                    datePublished={frontmatter.date || "2026-03-12"}
                    url={`${siteConfig.url}/legal/privacy`}
                />

                <div className={tokens.spacing.container}>
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em] mb-12">
                        <Link href="/legal" className="hover:text-[#C9A78A] transition-colors">Centro Legal</Link>
                        <span>/</span>
                        <span className="text-[#1E1E1E]">Política de Privacidad</span>
                    </nav>

                    {/* Header */}
                    <div className="max-w-4xl mb-20">
                        <h1 className={tokens.typography.heading + " mb-6 text-[#1E1E1E]"}>
                            Política de Privacidad
                        </h1>
                        <p className="text-[#1E1E1E]/60 text-lg font-bold italic tracking-tight">
                            Última actualización: 12 de Marzo de 2026 | Versión {frontmatter.version || '2.0.0'}
                        </p>
                    </div>

                    {/* Content */}
                    <article className="max-w-4xl">
                        <div className="prose prose-lg max-w-none bg-white p-8 md:p-20 rounded-[4rem] border border-black/5 shadow-xl shadow-black/[0.02]">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ ...props }) => <h2 className="text-3xl font-black text-[#1E1E1E] mb-8 mt-16 first:mt-0 tracking-tighter italic uppercase font-outfit" {...props} />,
                                    h2: ({ ...props }) => <h3 className="text-2xl font-black text-[#1E1E1E]/90 mb-6 mt-12 tracking-tighter italic uppercase font-outfit" {...props} />,
                                    h3: ({ ...props }) => <h4 className="text-xl font-black text-[#1E1E1E]/80 mb-4 mt-10 tracking-tighter italic uppercase font-outfit" {...props} />,
                                    p: ({ ...props }) => <p className="text-[#1E1E1E]/70 leading-relaxed mb-8 font-medium text-justify" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc list-outside text-[#1E1E1E]/70 space-y-4 ml-6 mb-10 font-medium" {...props} />,
                                    li: ({ ...props }) => <li className="pl-2" {...props} />,
                                    strong: ({ ...props }) => <strong className="text-[#1E1E1E] font-black italic" {...props} />,
                                    a: ({ ...props }) => <a className="text-[#C9A78A] hover:text-[#1E1E1E] underline font-black transition-colors" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    {/* Rights Panel Link */}
                    <div className="mt-12 p-10 bg-white/50 backdrop-blur-md rounded-[3.5rem] border border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/5 rounded-full blur-3xl opacity-50" />
                        <div className="space-y-2 relative z-10">
                            <h3 className="text-xl font-black text-[#1E1E1E] italic tracking-tight uppercase">Gestión de Privacidad</h3>
                            <p className="text-sm font-bold text-[#1E1E1E]/40 italic">Ejerce tus derechos ARCO y gestiona la eliminación o portabilidad de tus datos.</p>
                        </div>
                        <Link href="/privacy" className="px-10 py-4 bg-[#1E1E1E] text-[#F1F0E8] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-black/5 relative z-10">
                            Centro de Privacidad →
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
