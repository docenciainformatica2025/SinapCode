import Link from 'next/link';
import { Briefcase, ArrowRight, ShieldCheck, Users, BarChart3, Fingerprint } from 'lucide-react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export default function UtpControlPage() {
    return (
        <div className="min-h-screen bg-[#F1F0E8] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Product Brand Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white p-12 rounded-[3rem] border border-[#1E1E1E]/5 shadow-sm">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <SinapcodeLogo variant="icon" theme="color" className="h-10" />
                            <div className="w-px h-6 bg-[#1E1E1E]/10" />
                            <Briefcase className="w-10 h-10 text-[#1E1E1E]" />
                        </div>
                        <h1 className="text-5xl font-black text-[#1E1E1E] italic tracking-tighter uppercase mb-2">
                            UTP <span className="text-amber-600">Control</span>
                        </h1>
                        <p className="text-xl text-[#1E1E1E]/60 font-medium italic">Sincronización total de tu equipo en campo.</p>
                    </div>
                    <Link
                        href="https://utp-control.vercel.app/auth/login"
                        target="_blank"
                        className="bg-[#1E1E1E] text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
                    >
                        Ingresar a Control <ShieldCheck className="w-4 h-4" />
                    </Link>
                </div>

                {/* Description */}
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6 italic tracking-tight">Sobre el Producto</h2>
                        <p className="text-lg text-[#1E1E1E]/70 leading-relaxed font-light">
                            UTP Control es la solución empresarial para la gestión inteligente de personal y activos en campo.
                            Diseñada para empresas que requieren coordinación absoluta, la plataforma permite el monitoreo en tiempo real,
                            asignación dinámica de tareas y reportes de cumplimiento automatizados, todo con un nivel de seguridad y trazabilidad inigualable.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Monitoreo en Tiempo Real', desc: 'Ubica y coordina a tu personal con precisión GPS.', icon: Users },
                            { title: 'Reportes Automatizados', desc: 'Genera bitácoras de cumplimiento sin intervención manual.', icon: BarChart3 },
                            { title: 'Seguridad Biométrica', desc: 'Validación de identidad para acceso a zonas críticas.', icon: Fingerprint },
                            { title: 'Gestión de Activos', desc: 'Control detallado de herramientas y recursos asignados.', icon: Briefcase },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white/50 p-8 rounded-3xl border border-[#1E1E1E]/5 flex items-start gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1E1E1E] mb-1">{feature.title}</h3>
                                    <p className="text-sm text-[#1E1E1E]/50 font-light">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-10">
                        <Link
                            href="https://utp-control.vercel.app/auth/login"
                            target="_blank"
                            className="group flex items-center gap-4 text-[#1E1E1E] font-black italic uppercase tracking-tighter text-2xl hover:text-amber-600 transition-colors"
                        >
                            Acceder al Panel de Control <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
