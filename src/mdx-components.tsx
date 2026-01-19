import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="text-4xl font-bold text-white mb-6 mt-10">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold text-gold mb-4 mt-8">{children}</h2>,
        p: ({ children }) => <p className="text-lg text-muted leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside text-muted mb-4 space-y-2">{children}</ul>,
        li: ({ children }) => <li className="ml-4">{children}</li>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold pl-4 italic text-platinum-dim my-6 bg-surface/50 p-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
        code: ({ children }) => (
            <code className="bg-surfaceSoft border border-white/10 px-1.5 py-0.5 rounded text-sm text-primary font-mono">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="bg-[#0F1117] border border-white/10 p-4 rounded-lg overflow-x-auto my-6 text-sm">
                {children}
            </pre>
        ),
        ...components,
    }
}
