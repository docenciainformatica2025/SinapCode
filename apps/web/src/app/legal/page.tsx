import Link from "next/link";
import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import { LegalFooter } from "@/components/legal/legal-footer";
import { LegalNavbar } from "@/components/legal/legal-navbar";

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
        <div className="theme-light flex flex-col min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30 font-inter pt-20">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-24 md:py-40 border-b border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A78A]/5 rounded-full blur-[140px] pointer-events-none" />
                    <div className={tokens.spacing.container + " relative z-10"}>
                        <div className="max-w-4xl">
                            <span className="text-[#C9A78A] font-black text-[10px] tracking-[0.5em] uppercase mb-8 block italic leading-none opacity-80 font-outfit">
                                CONFIANZA Y TRANSPARENCIA
                            </span>
                            <h1 className="text-5xl md:text-9xl font-black text-[#1E1E1E] mb-10 tracking-tighter leading-none italic uppercase font-outfit">
                                Centro Legal<br />
                                SINAPCODE
                            </h1>
                            <p className="text-[#1E1E1E]/60 text-xl md:text-2xl font-bold max-w-2xl italic leading-relaxed tracking-tight">
                                Creemos en la claridad radical. Nuestro ecosistema digital se fundamenta en la transparencia,
                                la seguridad de alta gama y el cumplimiento normativo global.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Legal Grid */}
                <section className="py-24">
                    <div className={tokens.spacing.container}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {legalSections.map((section) => (
                                <Link
                                    key={section.title}
                                    href={section.href}
                                    className="group flex flex-col p-12 rounded-[4rem] border border-black/5 bg-white hover:bg-[#1E1E1E] hover:border-[#1E1E1E] shadow-2xl shadow-black/[0.02] transition-all duration-700 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#C9A78A]/5 rounded-full blur-3xl group-hover:bg-[#C9A78A]/10 transition-all duration-700" />

                                    <div className="text-4xl mb-10 bg-[#F1F0E8] w-20 h-20 flex items-center justify-center rounded-[2rem] group-hover:scale-110 group-hover:bg-[#C9A78A] transition-all duration-500 relative z-10 border border-black/5">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-black mb-4 group-hover:text-[#F1F0E8] transition-colors italic tracking-tighter uppercase font-outfit relative z-10">
                                        {section.title}
                                    </h2>
                                    <p className="text-[#1E1E1E]/50 text-base leading-relaxed mb-10 font-bold italic relative z-10 tracking-tight group-hover:text-[#F1F0E8]/60">
                                        {section.description}
                                    </p>
                                    <div className="mt-auto flex items-center text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.3em] group-hover:text-[#C9A78A] transition-all">
                                        EXPLORAR PROTOCOLO
                                        <svg className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Institutional Info */}
                <section className="py-32">
                    <div className={tokens.spacing.container}>
                        <div className="bg-white border border-black/5 rounded-[5rem] p-12 md:p-24 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C9A78A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
                                <div>
                                    <h2 className="text-4xl font-black mb-16 tracking-tighter italic uppercase text-[#1E1E1E] font-outfit">Entidad Corporativa</h2>
                                    <div className="space-y-12">
                                        <div className="group/item">
                                            <h3 className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.4em] mb-4 group-hover/item:text-[#C9A78A] transition-colors">REGISTRO OFICIAL</h3>
                                            <p className="text-2xl font-black text-[#1E1E1E] italic font-outfit uppercase">SINAPCODE OÜ</p>
                                        </div>
                                        <div className="group/item">
                                            <h3 className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.4em] mb-4 group-hover/item:text-[#C9A78A] transition-colors">HEADQUARTERS (EU)</h3>
                                            <p className="text-2xl font-black text-[#1E1E1E] italic leading-none font-outfit">
                                                TALLINN, HARJU MAAKOND,<br />
                                                KESKLINNA LINNAOSA, ESTONIA 🇪🇪
                                            </p>
                                        </div>
                                        <div className="group/item">
                                            <h3 className="text-[10px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.4em] mb-4 group-hover/item:text-[#C9A78A] transition-colors">JURISDICCIÓN</h3>
                                            <p className="text-2xl font-black text-[#1E1E1E] italic uppercase font-outfit">REPÚBLICA DE ESTONIA | UNIÓN EUROPEA</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-14 bg-[#F1F0E8] rounded-[4rem] border border-black/5 shadow-2xl relative overflow-hidden group/box hover:-translate-y-2 transition-all duration-700 text-[#1E1E1E]">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A78A]/5 rounded-full blur-[100px]" />
                                    <h3 className="text-3xl font-black mb-8 text-[#1E1E1E] tracking-tighter italic uppercase font-outfit relative z-10">Asuntos Legales</h3>
                                    <p className="text-[#1E1E1E]/60 text-lg mb-12 leading-relaxed font-bold italic relative z-10 tracking-tight text-justify">
                                        Si requiere clarificación técnica sobre nuestros protocolos de cumplimiento o procesamiento de datos,
                                        nuestro departamento jurídico está a su disposición total.
                                    </p>
                                    <a
                                        href="mailto:legal@sinapcode.com"
                                        className="inline-flex items-center px-12 py-6 bg-[#1E1E1E] text-[#F1F0E8] font-black text-[11px] uppercase tracking-[0.3em] rounded-[2rem] hover:bg-[#C9A78A] hover:text-[#1E1E1E] transition-all relative z-10 italic shadow-2xl shadow-black/5"
                                    >
                                        CONTACTAR COMPLIANCE →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
