import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLegalDocument } from '@/lib/markdown';
import { siteConfig } from '@/lib/site-config';
import { LegalDocumentSchema } from '@/components/seo/legal-document-schema';
import { legalTokens as tokens } from '@/lib/constants/legal-tokens';

export default function DPAPage() {
    const { content, frontmatter } = getLegalDocument('dpa.md');

    return (
        <div className={`flex flex-col min-h-screen ${tokens.colors.background} selection:bg-[#C9A78A]/30`}>
            <main className="flex-grow pt-32 pb-24">
                <LegalDocumentSchema
                    title={frontmatter.title || "Acuerdo de Procesamiento de Datos (DPA)"}
                    version={frontmatter.version || "1.0.0"}
                    datePublished={frontmatter.date || "2026-03-12"}
                    url={`${siteConfig.url}/legal/dpa`}
                />

                <div className={tokens.spacing.container}>
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em] mb-12">
                        <Link href="/legal" className="hover:text-[#C9A78A] transition-colors">Centro Legal</Link>
                        <span>/</span>
                        <span className="text-[#1E1E1E]">DPA</span>
                    </nav>

                    {/* Header */}
                    <div className="max-w-4xl mb-20">
                        <h1 className={tokens.typography.heading + " mb-6 text-[#1E1E1E]"}>
                            Acuerdo de Procesamiento de Datos
                        </h1>
                        <p className="text-[#1E1E1E]/60 text-lg font-bold italic tracking-tight">
                            Términos estándar para la protección de datos institucionales. Optimizado para regulaciones de Estonia (UE)
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

                    {/* Institutional Help */}
                    <div className="mt-20 bg-white border border-black/5 rounded-[4rem] p-12 md:p-20 max-w-4xl flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/5 rounded-full blur-[100px]" />
                        <div className="flex-1 relative z-10">
                            <h2 className="text-3xl font-black mb-6 tracking-tighter italic uppercase text-[#1E1E1E] font-outfit">Soporte Institutional Enterprise</h2>
                            <p className="text-[#1E1E1E]/60 text-lg mb-0 font-bold italic leading-relaxed">
                                Si su institución requiere protocolos específicos de firma o auditoría,
                                nuestro equipo legal especializado en grandes infraestructuras le asistirá de inmediato.
                            </p>
                        </div>
                        <a href="mailto:enterprise@sinapcode.com" className="px-10 py-5 bg-[#1E1E1E] text-[#F1F0E8] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-black/5 hover:bg-[#C9A78A] hover:text-[#1E1E1E] transition-all italic relative z-10 whitespace-nowrap">
                            CONTACTAR LEGAL ENTERPRISE →
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
