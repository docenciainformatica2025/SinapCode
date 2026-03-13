import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLegalDocument } from '@/lib/markdown';
import { siteConfig } from '@/lib/site-config';
import { LegalDocumentSchema } from '@/components/seo/legal-document-schema';
import { LegalFooter } from '@/components/legal/legal-footer';
import { legalTokens as tokens } from '@/lib/constants/legal-tokens';

export default function TermsPage() {
    const { content, frontmatter } = getLegalDocument('terms/terms_of_service.md');

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F0E8] selection:bg-[#C9A78A]/30 text-[#1E1E1E]">
            <main className="flex-grow pt-32 pb-24">
                <LegalDocumentSchema
                    title={frontmatter.title || "Términos de Servicio"}
                    version={frontmatter.version || "1.0.0"}
                    datePublished={frontmatter.date || "2026-03-12"}
                    url={`${siteConfig.url}/legal/terms`}
                />

                <div className={tokens.spacing.container}>
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
                        <Link href="/legal" className="hover:text-indigo-600 transition">Centro Legal</Link>
                        <span>/</span>
                        <span className="text-[#1E1E1E]">Términos de Servicio</span>
                    </nav>

                    {/* Header */}
                    <div className="max-w-4xl mb-16">
                        <h1 className={tokens.typography.heading + " mb-6"}>
                            Términos de Servicio
                        </h1>
                        <p className="text-[#1E1E1E]/60 text-lg font-medium italic">
                            Última actualización: 12 de marzo, 2026 | Versión {frontmatter.version || '2.2.0'}
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

                    {/* Support Callout */}
                    <div className="mt-16 p-12 bg-[#1E1E1E] rounded-[3rem] border border-[#1E1E1E]/10 shadow-2xl relative overflow-hidden group/box">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/20 rounded-full blur-2xl" />
                        <h3 className="text-2xl font-black mb-4 text-[#F1F0E8] tracking-tighter italic uppercase relative z-10">¿Consultas Legales?_</h3>
                        <p className="text-[#F1F0E8]/60 text-base mb-0 leading-relaxed font-bold italic relative z-10">
                            Nuestro departamento jurídico está disponible para clarificar cualquier punto técnico sobre las políticas de SINAPCODE.
                            Contacta en <a href="mailto:legal@sinapcode.com" className="text-[#C9A78A] hover:text-[#F1F0E8] underline transition-colors">legal@sinapcode.com_</a>
                        </p>
                    </div>
                </div>
            </main>
            <LegalFooter />
        </div>
    );
}

