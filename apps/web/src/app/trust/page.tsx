import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import { LegalFooter } from "@/components/legal/legal-footer";
import Link from "next/link";

const trustModules = [
    {
        title: "Infraestructura de Seguridad",
        description: "Protocolos de seguridad de múltiples capas que protegen los datos en reposo y en tránsito.",
        status: "Activo",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    },
    {
        title: "Cumplimiento Global",
        description: "Adherencia al GDPR, CCPA y marcos de seguridad estándar de la industria.",
        status: "Certificado",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        )
    },
    {
        title: "Disponibilidad del Sistema",
        description: "99.9% de tiempo de actividad en todos los servicios y aplicaciones de SINAPCODE.",
        status: "99.98%",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "Subprocesadores",
        description: "Lista transparente de servicios de terceros que nos ayudan a ejecutar SINAPCODE.",
        status: "Verificado",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    }
];

export default function TrustCenterPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <main className="flex-grow">
                {/* Trust Hero */}
                <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32 bg-neutral-950 text-white">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
                    </div>
                    <div className={`${tokens.spacing.container} relative z-10 text-center`}>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
                            Confiabilidad como Estándar.
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                            Instituciones globales, desarrolladores y educadores confían en SINAPCODE para impulsar sus experiencias digitales críticas.
                            Revise nuestra seguridad de infraestructura, cumplimiento y estado en vivo.
                        </p>
                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-bold uppercase tracking-widest">Todos los Sistemas Operativos</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modules Section */}
                <section className="py-24 bg-neutral-950">
                    <div className={tokens.spacing.container}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {trustModules.map((module) => (
                                <div
                                    key={module.title}
                                    className="p-10 bg-neutral-900 border border-neutral-800 rounded-[2.5rem] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group"
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-4 bg-indigo-950/50 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                                            {module.icon}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full">
                                            {module.status}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 tracking-tight text-white">{module.title}</h2>
                                    <p className="text-neutral-400 leading-relaxed mb-8">
                                        {module.description}
                                    </p>
                                    <button className="text-sm font-bold text-indigo-400 flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Ver reporte completo
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security Pillars */}
                <section className="py-24 bg-neutral-900/50 text-white">
                    <div className={tokens.spacing.container}>
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Nuestros Pilares de Seguridad</h2>
                            <p className="text-neutral-400">Construido sobre los robustos estándares del ecosistema tecnológico europeo.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {[
                                { title: "Protección de Datos", desc: "Cifrado en reposo (AES-256) y en tránsito (TLS 1.2+)." },
                                { title: "Control de Acceso", desc: "Políticas estrictas de RBAC y MFA obligatorio para todos los administradores." },
                                { title: "Monitoreo Continuo", desc: "Detección de amenazas en tiempo real y escaneo automatizado de vulnerabilidades." }
                            ].map((pillar) => (
                                <div key={pillar.title} className="text-center space-y-4">
                                    <h3 className="text-xl font-bold">{pillar.title}</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <LegalFooter />
        </div>
    );
}
