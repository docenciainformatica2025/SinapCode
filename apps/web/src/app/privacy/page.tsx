import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import Link from "next/link";

export default function PrivacyDashboardPage() {
    return (
        <div className="theme-light flex flex-col min-h-screen bg-[#F1F0E8] text-[#1E1E1E] selection:bg-[#C9A78A]/30 font-inter pt-20">
            <main className="flex-grow pb-24">
                {/* Header */}
                <section className="pt-24 pb-20 border-b border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A78A]/5 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A7C1C0]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className={tokens.spacing.container + " relative z-10"}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                            <div className="max-w-3xl">
                                <nav className="flex items-center gap-3 text-[10px] font-black text-[#C9A78A] uppercase tracking-[0.4em] mb-10 font-outfit italic">
                                    <Link href="/legal" className="hover:opacity-60 transition">CENTRO LEGAL</Link>
                                    <span className="opacity-20">/</span>
                                    <span className="text-[#1E1E1E]">CENTRO DE PRIVACIDAD</span>
                                </nav>
                                <h1 className="text-6xl md:text-8xl font-black text-[#1E1E1E] mb-10 tracking-tighter italic uppercase font-outfit leading-[0.9]">
                                    Panel de<br />Privacidad
                                </h1>
                                <p className="text-[#1E1E1E]/60 text-xl leading-relaxed font-bold italic tracking-tight max-w-2xl">
                                    Gestiona tus datos, tus preferencias de privacidad y ejerce tus derechos bajo el RGPD.
                                    La transparencia es nuestro compromiso fundamental con la comunidad SINAPCODE.
                                </p>
                            </div>
                            <div className="flex items-center gap-5 p-6 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-[2.5rem] backdrop-blur-sm self-start md:self-end">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] font-outfit">SISTEMA CUMPLE CON RGPD</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tools Section */}
                <section className="py-24 lg:py-40">
                    <div className={tokens.spacing.container}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                            {/* Data Rights Column */}
                            <div className="lg:col-span-8 space-y-16">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="h-px flex-grow bg-black/5" />
                                    <h2 className="text-[11px] font-black text-[#1E1E1E]/40 uppercase tracking-[0.5em] font-outfit italic">
                                        DERECHOS DEL TITULAR
                                    </h2>
                                    <div className="h-px w-12 bg-black/5" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Tool: Access & Export */}
                                    <div className="group p-12 bg-white border border-black/5 rounded-[3.5rem] hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-700 cursor-pointer relative overflow-hidden flex flex-col items-start text-left">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#C9A78A]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="bg-[#C9A78A]/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-[#C9A78A] group-hover:scale-110 transition-all duration-500 relative z-10">
                                            <svg className="w-7 h-7 text-[#C9A78A] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black mb-5 text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">Exportar Datos</h3>
                                        <p className="text-sm text-[#1E1E1E]/50 leading-relaxed font-bold italic tracking-tight">
                                            Descarga una copia completa de tus datos personales en formato JSON estructurado listo para portabilidad.
                                        </p>
                                    </div>

                                    {/* Tool: Deletion */}
                                    <div className="group p-12 bg-white border border-black/5 rounded-[3.5rem] hover:shadow-[0_40px_80px_rgba(239,68,68,0.04)] transition-all duration-700 cursor-pointer relative overflow-hidden flex flex-col items-start text-left">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="bg-red-500/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-red-500 group-hover:scale-110 transition-all duration-500 relative z-10">
                                            <svg className="w-7 h-7 text-red-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black mb-5 text-[#1E1E1E] group-hover:text-red-500 transition-colors italic uppercase font-outfit tracking-tighter">Eliminar Cuenta</h3>
                                        <p className="text-sm text-[#1E1E1E]/50 leading-relaxed font-bold italic tracking-tight">
                                            Eliminación permanente e irreversible de tu identidad y registros en todos nuestros sistemas.
                                        </p>
                                    </div>

                                    {/* Tool: Modification */}
                                    <div className="group p-12 bg-white border border-black/5 rounded-[3.5rem] hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-700 cursor-pointer flex flex-col items-start text-left">
                                        <div className="bg-amber-500/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-500">
                                            <svg className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black mb-5 text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">Rectificar Datos</h3>
                                        <p className="text-sm text-[#1E1E1E]/50 leading-relaxed font-bold italic tracking-tight">
                                            Solicita la corrección de información inexacta o incompleta vinculada a tu perfil institucional.
                                        </p>
                                    </div>

                                    {/* Tool: Restrict Processing */}
                                    <div className="group p-12 bg-white border border-black/5 rounded-[3.5rem] hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-700 cursor-pointer flex flex-col items-start text-left">
                                        <div className="bg-purple-500/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-500">
                                            <svg className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black mb-5 text-[#1E1E1E] italic uppercase font-outfit tracking-tighter">Limitar Uso</h3>
                                        <p className="text-sm text-[#1E1E1E]/50 leading-relaxed font-bold italic tracking-tight">
                                            Restricción temporal del procesamiento de tus datos mientras se verifica una reclamación o disputa.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-4 space-y-12">
                                <div className="p-12 bg-[#1E1E1E] rounded-[4rem] text-[#F1F0E8] shadow-2xl shadow-black/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A78A]/10 rounded-full blur-3xl pointer-events-none" />
                                    <h3 className="text-2xl font-black mb-8 italic uppercase font-outfit tracking-tighter border-b border-white/10 pb-6">Protección<br />Blindada</h3>
                                    <p className="text-white/40 text-sm leading-relaxed mb-12 font-bold italic tracking-tight">
                                        Bajo el RGPD, tienes control absoluto. Todas las solicitudes son procesadas por nuestro equipo legal en un máximo de 30 días.
                                    </p>
                                    <ul className="space-y-8">
                                        {[
                                            "Encriptación de extremo a extremo",
                                            "Cero acceso no autorizado",
                                            "Servidores en Tallín, Estonia (UE)",
                                            "Seguridad de grado institucional"
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.2em] font-outfit text-white/80">
                                                <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-12 bg-white border border-black/5 rounded-[4rem] group hover:border-[#C9A78A]/30 transition-colors duration-700">
                                    <h3 className="text-2xl font-black mb-6 italic uppercase font-outfit text-[#1E1E1E] tracking-tighter">Oficial de<br />Privacidad</h3>
                                    <p className="text-[#1E1E1E]/50 text-sm leading-relaxed mb-10 font-bold italic tracking-tight">
                                        ¿Dudas sobre tu identidad digital? Nuestro DPO en Estonia está disponible para consultoría directa.
                                    </p>
                                    <a href="mailto:privacy@sinapcode.com" className="group/link inline-flex items-center gap-4 text-[#C9A78A] font-black uppercase tracking-[0.3em] text-[10px] hover:text-[#1E1E1E] transition-all duration-500 font-outfit italic">
                                        PRIVACY@SINAPCODE.COM
                                        <div className="w-10 h-10 bg-[#C9A78A]/10 rounded-full flex items-center justify-center group-hover/link:bg-[#1E1E1E] transition-colors">
                                            <svg className="w-4 h-4 group-hover/link:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
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
