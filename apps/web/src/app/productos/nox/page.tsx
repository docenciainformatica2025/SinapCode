import Link from 'next/link';
import { Heart, ArrowRight, CheckCircle2, Shield, Globe, Zap, Activity } from 'lucide-react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export default function NoxPage() {
    return (
        <div className="min-h-screen bg-[#F1F0E8] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Product Brand Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white p-12 rounded-[3rem] border border-[#1E1E1E]/5 shadow-sm">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <SinapcodeLogo variant="icon" theme="color" className="h-10" />
                            <div className="w-px h-6 bg-[#1E1E1E]/10" />
                            <Heart className="w-10 h-10 text-[#C9A78A]" />
                        </div>
                        <h1 className="text-5xl font-black text-[#1E1E1E] italic tracking-tighter uppercase mb-2">
                            Nox <span className="text-[#C9A78A]">Health</span>
                        </h1>
                        <p className="text-xl text-[#1E1E1E]/60 font-medium italic">Empoderamiento femenino a través de la tecnología.</p>
                    </div>
                    <Link
                        href="https://nox-health.vercel.app/welcome"
                        target="_blank"
                        className="bg-[#C9A78A] text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all flex items-center gap-3 shadow-xl shadow-[#C9A78A]/20"
                    >
                        Visitar Nox <Globe className="w-4 h-4" />
                    </Link>
                </div>

                {/* Description */}
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6 italic tracking-tight">Sobre el Producto</h2>
                        <p className="text-lg text-[#1E1E1E]/70 leading-relaxed font-light">
                            Nox Health es una plataforma diseñada para centralizar y simplificar el seguimiento de la salud femenina.
                            Nacida bajo el ecosistema de SinapCode, Nox combina biometría avanzada con una comunidad de apoyo inigualable,
                            permitiendo a las usuarias tomar el control total de su bienestar con datos precisos y una interfaz premium inspirada en la simplicidad de Apple.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Seguimiento Biométrico', desc: 'Control detallado de ciclos y signos vitales.', icon: Activity },
                            { title: 'IA de Bienestar', desc: 'Insights personalizados basados en tus datos diarios.', icon: Zap },
                            { title: 'Privacidad Total', desc: 'Tus datos están protegidos con protocolos de grado militar.', icon: Shield },
                            { title: 'Comunidad Global', desc: 'Conecta con otras mujeres en un entorno seguro.', icon: Globe },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white/50 p-8 rounded-3xl border border-[#1E1E1E]/5 flex items-start gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-[#C9A78A]">
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
                            href="https://nox-health.vercel.app/welcome"
                            target="_blank"
                            className="group flex items-center gap-4 text-[#1E1E1E] font-black italic uppercase tracking-tighter text-2xl hover:text-[#C9A78A] transition-colors"
                        >
                            Ir a la plataforma oficial <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
