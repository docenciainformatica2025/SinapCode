import Link from 'next/link';
import { Activity, ArrowRight, CheckCircle2, Box, TrendingUp, Users } from 'lucide-react';
import { SinapcodeLogo } from '@/components/brand/sinapcode-logo';

export default function VitriuPage() {
    return (
        <div className="min-h-screen bg-[#F1F0E8] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Product Brand Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white p-12 rounded-[3rem] border border-[#1E1E1E]/5 shadow-sm">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <SinapcodeLogo variant="icon" theme="color" className="h-10" />
                            <div className="w-px h-6 bg-[#1E1E1E]/10" />
                            <Activity className="w-10 h-10 text-[#A7C1C0]" />
                        </div>
                        <h1 className="text-5xl font-black text-[#1E1E1E] italic tracking-tighter uppercase mb-2">
                            Vitriu <span className="text-[#A7C1C0]">Inventory</span>
                        </h1>
                        <p className="text-xl text-[#1E1E1E]/60 font-medium italic">Eficiencia operativa en tiempo real.</p>
                    </div>
                    <div className="bg-[#A7C1C0] text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase cursor-default flex items-center gap-3">
                        En Despliegue <CheckCircle2 className="w-4 h-4" />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6 italic tracking-tight">Sobre el Producto</h2>
                        <p className="text-lg text-[#1E1E1E]/70 leading-relaxed font-light">
                            Vitriu es el núcleo de gestión para negocios que no pueden permitirse el desorden.
                            Desde ferreterías hasta boutiques, Vitriu centraliza inventarios, compras y la relación con el cliente (CRM) en una única interfaz fluida.
                            Minimiza los quiebres de stock y maximiza tus márgenes con analítica predictiva de demanda.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Gestión de Inventario', desc: 'Control total de existencias en múltiples bodegas.', icon: Box },
                            { title: 'CRM Integrado', desc: 'Conoce a tus clientes y sus hábitos de consumo.', icon: Users },
                            { title: 'Analítica de Ventas', desc: 'Reportes detallados para la toma de decisiones.', icon: TrendingUp },
                            { title: 'Alertas de Stock', desc: 'Notificaciones automáticas antes de agotar productos.', icon: Activity },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white/50 p-8 rounded-3xl border border-[#1E1E1E]/5 flex items-start gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-[#A7C1C0]">
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
                            href="/contacto"
                            className="group flex items-center gap-4 text-[#1E1E1E] font-black italic uppercase tracking-tighter text-2xl hover:text-[#A7C1C0] transition-colors"
                        >
                            Solicitar Demo <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
