import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLegalDocument } from '@/lib/markdown';
import { siteConfig } from '@/lib/site-config';
import { LegalDocumentSchema } from '@/components/seo/legal-document-schema';
import { LegalFooter } from '@/components/legal/legal-footer';
import { legalTokens as tokens } from '@/lib/constants/legal-tokens';

export default function DPAPage() {
    const { content, frontmatter } = getLegalDocument('dpa.md');

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F0E8] selection:bg-[#C9A78A]/30 text-[#1E1E1E]">
            <main className="flex-grow pt-32 pb-24">
                <LegalDocumentSchema
                    title={frontmatter.title || "Acuerdo de Procesamiento de Datos (DPA)"}
                    version={frontmatter.version || "1.0.0"}
                    datePublished={frontmatter.date || "2026-03-12"}
                    url={`${siteConfig.url}/legal/dpa`}
                />

                <div className={tokens.spacing.container}>
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
                        <Link href="/legal" className="hover:text-indigo-600 transition">Centro Legal</Link>
                        <span>/</span>
                        <span className="text-[#1E1E1E]">DPA</span>
                    </nav>

                    {/* Header */}
                    <div className="max-w-4xl mb-16">
                        <h1 className={tokens.typography.heading + " mb-6"}>
                            Acuerdo de Procesamiento de Datos
                        </h1>
                        <p className="text-[#1E1E1E]/60 text-lg font-medium italic">
                            Términos estándar para la protección de datos institucionales. Optimizado para regulaciones de Estonia (UE)_
                        </p>
                    </div>

                    {/* Content */}
                    <article className="max-w-4xl">
                        <div className="prose prose-neutral prose-lg max-w-none bg-white p-8 md:p-16 rounded-[3.5rem] border border-[#1E1E1E]/5 shadow-2xl shadow-[#1E1E1E]/5">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ ...props }) => <h2 className="text-3xl font-black text-[#1E1E1E] mb-8 mt-16 first:mt-0 tracking-tighter italic uppercase" {...props} />,
                                    h2: ({ ...props }) => <h3 className="text-2xl font-black text-[#1E1E1E] mb-6 mt-12 tracking-tighter italic uppercase" {...props} />,
                                    h3: ({ ...props }) => <h4 className="text-xl font-black text-[#1E1E1E] mb-4 mt-10 tracking-tighter italic uppercase" {...props} />,
                                    p: ({ ...props }) => <p className="text-[#1E1E1E]/70 leading-relaxed mb-8 font-medium" {...props} />,
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
                    <div className="mt-16 bg-[#1E1E1E] text-[#F1F0E8] rounded-[3.5rem] p-12 md:p-20 max-w-4xl flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A78A]/10 rounded-full blur-[80px]" />
                        <div className="flex-1 relative z-10">
                            <h2 className="text-3xl font-black mb-6 tracking-tighter italic uppercase">Soporte Institutional Enterprise_</h2>
                            <p className="text-[#F1F0E8]/60 mb-0 font-medium italic leading-relaxed">
                                Si su institución requiere protocolos específicos de firma o auditoría,
                                nuestro equipo legal especializado en grandes infraestructuras le asistirá de inmediato.
                            </p>
                        </div>
                        <a href="mailto:enterprise@sinapcode.com" className="px-10 py-5 bg-[#C9A78A] text-[#1E1E1E] rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#C9A78A]/20 hover:bg-[#F1F0E8] transition-all italic relative z-10 whitespace-nowrap">
                            CONTACTAR LEGAL ENTERPRISE →
                        </a>
                    </div>
                </div>
            </main>
            <LegalFooter />
        </div>
    );
}
