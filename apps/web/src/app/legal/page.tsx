import Link from "next/link";
import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import { LegalFooter } from "@/components/legal/legal-footer";

const legalSections = [
    {
        title: "Términos de Uso",
        description: "Los términos legales que rigen el uso de los productos y servicios de SINAPCODE.",
        href: "/legal/terms",
        icon: "📄"
    },
    {
        title: "Política de Privacidad",
        description: "Cómo recopilamos, procesamos y protegemos sus datos personales según el GDPR.",
        href: "/legal/privacy",
        icon: "🛡️"
    },
    {
        title: "Política de Cookies",
        description: "Información detallada sobre las cookies y tecnologías de seguimiento que utilizamos.",
        href: "/legal/cookies",
        icon: "🍪"
    },
    {
        title: "Acuerdo de Procesamiento de Datos (DPA)",
        description: "Nuestro acuerdo para el manejo de datos institucionales y corporativos.",
        href: "/legal/dpa",
        icon: "🤝"
    },
    {
        title: "Seguridad y Cumplimiento",
        description: "Detalles sobre nuestras medidas técnicas y organizativas para la seguridad de los datos.",
        href: "/trust",
        icon: "🔒"
    },
    {
        title: "Centro de Privacidad",
        description: "Su panel para gestionar derechos, descargar datos o solicitar la eliminación de la cuenta.",
        href: "/privacy",
        icon: "🎛️"
    }
];

export default function LegalCenterPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-24 md:py-36 border-b border-[#1E1E1E]/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A78A]/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className={tokens.spacing.container + " relative z-10"}>
                        <div className="max-w-4xl">
                            <span className="text-[#C9A78A] font-black text-xs tracking-[0.3em] uppercase mb-8 block italic leading-none">
                                CONFIANZA Y TRANSPARENCIA_
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black text-[#1E1E1E] mb-10 tracking-tighter leading-none italic uppercase">
                                Centro Legal<br />
                                SINAPCODE<span className="text-[#C9A78A]">_</span>
                            </h1>
                            <p className="text-[#1E1E1E]/60 text-xl md:text-2xl font-medium max-w-2xl italic leading-relaxed">
                                Creemos en la claridad radical. Nuestro ecosistema digital se fundamenta en la transparencia,
                                la seguridad de alta gama y el cumplimiento normativo global.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Legal Grid */}
                <section className="py-20">
                    <div className={tokens.spacing.container}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {legalSections.map((section) => (
                                <Link
                                    key={section.title}
                                    href={section.href}
                                    className="group flex flex-col p-10 rounded-[3rem] border border-[#1E1E1E]/5 bg-white hover:border-[#C9A78A]/30 hover:bg-white shadow-sm hover:shadow-2xl hover:shadow-[#1E1E1E]/5 transition-all duration-700 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/5 rounded-full blur-2xl group-hover:bg-[#C9A78A]/10 transition-all duration-700" />

                                    <div className="text-4xl mb-8 bg-[#F1F0E8] w-16 h-16 flex items-center justify-center rounded-[1.5rem] group-hover:scale-110 group-hover:bg-[#C9A78A]/10 transition-all duration-500 relative z-10">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-black mb-4 group-hover:text-[#C9A78A] transition-colors italic tracking-tighter uppercase relative z-10">
                                        {section.title}_
                                    </h2>
                                    <p className="text-[#1E1E1E]/50 text-base leading-relaxed mb-8 font-medium italic relative z-10">
                                        {section.description}
                                    </p>
                                    <div className="mt-auto flex items-center text-[10px] font-black text-[#1E1E1E] uppercase tracking-[0.2em] relative z-10">
                                        EXPLORAR PROTOCOLO_
                                        <svg className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32">
                    <div className={tokens.spacing.container}>
                        <div className="bg-white rounded-[4rem] p-12 md:p-20 border border-[#1E1E1E]/5 shadow-2xl shadow-[#1E1E1E]/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C9A78A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                                <div>
                                    <h2 className="text-3xl font-black mb-12 tracking-tighter italic uppercase text-[#1E1E1E]">Entidad Corporativa_</h2>
                                    <div className="space-y-10">
                                        <div className="group/item">
                                            <h3 className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em] mb-3 group-hover/item:text-[#C9A78A] transition-colors">REGISTRO OFICIAL_</h3>
                                            <p className="text-xl font-black text-[#1E1E1E] italic">SINAPCODE OÜ</p>
                                        </div>
                                        <div className="group/item">
                                            <h3 className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em] mb-3 group-hover/item:text-[#C9A78A] transition-colors">HEADQUARTERS (EU)_</h3>
                                            <p className="text-xl font-black text-[#1E1E1E] italic leading-tight">
                                                TALLINN, HARJU MAAKOND,<br />
                                                KESKLINNA LINNAOSA, ESTONIA 🇪🇪
                                            </p>
                                        </div>
                                        <div className="group/item">
                                            <h3 className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em] mb-3 group-hover/item:text-[#C9A78A] transition-colors">JURISDICCIÓN_</h3>
                                            <p className="text-xl font-black text-[#1E1E1E] italic">REPÚBLICA DE ESTONIA | UNIÓN EUROPEA</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-12 bg-[#1E1E1E] rounded-[3rem] border border-[#1E1E1E]/5 shadow-2xl relative overflow-hidden group/box hover:-translate-y-2 transition-transform duration-700">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A78A]/20 rounded-full blur-[80px]" />
                                    <h3 className="text-2xl font-black mb-6 text-[#F1F0E8] tracking-tighter italic uppercase relative z-10">Asuntos Legales_</h3>
                                    <p className="text-[#F1F0E8]/60 text-base mb-10 leading-relaxed font-medium italic relative z-10">
                                        Si requiere clarificación técnica sobre nuestros protocolos de cumplimiento o procesamiento de datos,
                                        nuestro departamento jurídico está a su disposición total.
                                    </p>
                                    <a
                                        href="mailto:legal@sinapcode.com"
                                        className="inline-flex items-center px-10 py-5 bg-[#C9A78A] text-[#1E1E1E] font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#F1F0E8] transition-all relative z-10 italic shadow-xl shadow-[#C9A78A]/20"
                                    >
                                        CONTACTAR COMPLIANCE →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <LegalFooter />
        </div>
    );
}
