import Link from 'next/link';
import { Map, ArrowRight, Gauge, Navigation, DollarSign, Clock } from 'lucide-react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export default function FindriverPage() {
    return (
        <div className="min-h-screen bg-[#F1F0E8] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Product Brand Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white p-12 rounded-[3rem] border border-[#1E1E1E]/5 shadow-sm">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <SinapcodeLogo variant="icon" theme="color" className="h-10" />
                            <div className="w-px h-6 bg-[#1E1E1E]/10" />
                            <Map className="w-10 h-10 text-[#C9A78A]" />
                        </div>
                        <h1 className="text-5xl font-black text-[#1E1E1E] italic tracking-tighter uppercase mb-2">
                            Findriver <span className="text-[#C9A78A]">Pro</span>
                        </h1>
                        <p className="text-xl text-[#1E1E1E]/60 font-medium italic">Maximiza tus ganancias en cada ruta.</p>
                    </div>
                    <Link
                        href="https://findriver-app.vercel.app/"
                        target="_blank"
                        className="bg-[#F9E795] text-[#1E1E1E] px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
                    >
                        Abrir Findriver <Navigation className="w-4 h-4" />
                    </Link>
                </div>

                {/* Description */}
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6 italic tracking-tight">Sobre el Producto</h2>
                        <p className="text-lg text-[#1E1E1E]/70 leading-relaxed font-light">
                            Findriver Pro es el copiloto inteligente para los héroes del delivery y transporte.
                            Diseñado para ser ligero, rápido y extremadamente eficiente, permite llevar un control quirúrgico de los gastos operativos,
                            combustible, mantenimiento y ganancias netas por jornada. Nunca más trabajes a ciegas; con Findriver, cada kilómetro cuenta.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Control de Gastos', desc: 'Registra combustible y mantenimiento al instante.', icon: DollarSign },
                            { title: 'Métricas de Tiempo', desc: 'Analiza tu rentabilidad por hora de trabajo.', icon: Clock },
                            { title: 'Dashboard de Ganancias', desc: 'Visualiza cuánto estás ganando realmente después de costos.', icon: Gauge },
                            { title: 'Optimización de Rutas', desc: 'Consejos basados en tus datos históricos.', icon: Navigation },
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
                            href="https://findriver-app.vercel.app/"
                            target="_blank"
                            className="group flex items-center gap-4 text-[#1E1E1E] font-black italic uppercase tracking-tighter text-2xl hover:text-[#C9A78A] transition-colors"
                        >
                            Comenzar a optimizar rutas <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
