import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLegalDocument } from '@/lib/markdown';

export default function TermsPage() {
    const { frontmatter, content } = getLegalDocument('terms/terms_of_service.md');

    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Términos de Servicio
                    </h1>
                    <p className="text-platinum-dim">
                        Última actualización: 18 de enero de 2026 | Versión {frontmatter.version || '2.1.1'}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            className="markdown-content"
                            components={{
                                h1: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8" {...props} />,
                                h2: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mb-3 mt-6" {...props} />,
                                h3: ({ node, ...props }) => <h4 className="text-lg font-bold text-white mb-2 mt-4" {...props} />,
                                p: ({ node, ...props }) => <p className="text-platinum-dim leading-relaxed mb-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-platinum-dim space-y-2 ml-4 mb-4" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-platinum-dim space-y-2 ml-4 mb-4" {...props} />,
                                li: ({ node, ...props }) => <li className="text-platinum-dim" {...props} />,
                                a: ({ node, ...props }) => <a className="text-neural-blue hover:text-white transition underline" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
