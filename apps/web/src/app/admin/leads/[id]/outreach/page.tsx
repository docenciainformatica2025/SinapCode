'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    MessageCircle as WhatsApp,
    Mail as Email,
    ArrowLeft as ArrowBack,
    Send,
    RefreshCw as Autorenew,
    Play as PlayArrow,
    Signal,
    Wifi,
    BatteryFull,
    Video as Videocam,
    Phone as Call,
    Plus as Add,
    Camera as CameraAlt,
    Mic,
    Users as Groups,
    ArrowRight as ArrowForward,
    Laptop as Devices,
    Brain as Psychology,
    Layers
} from 'lucide-react';
import Link from 'next/link';

export default function OutreachPage({ params }: { params: { id: string } }) {
    const [mounted, setMounted] = useState(false);
    const [leadName] = useState('Alex'); // Simulating parameter based name

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#102222]/80 backdrop-blur-2xl border-b border-white/5 p-6 flex justify-between items-center rounded-[2rem]">
                <div className="flex items-center gap-6">
                    <Link href="/admin/leads" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#0df2f2] hover:bg-white/10 transition-all">
                        <ArrowBack />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <span className="text-[10px] font-black uppercase tracking-widest">Leads</span>
                            <span className="text-[10px]">/</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Alex Sterling</span>
                            <span className="text-[10px]">/</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#0df2f2]">Generación de Outreach_</span>
                        </div>
                        <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase mt-1">
                            Piezas de <span className="text-[#0df2f2]">Contacto IA_</span>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-[#0df2f2] transition-all group italic">
                        <Autorenew className="text-sm group-hover:rotate-180 transition-transform duration-700" />
                        Regenerar con IA
                    </button>
                    <button className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-[#0df2f2] text-[#102222] font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_0_25px_rgba(13,242,242,0.4)] hover:scale-105 transition-all group italic">
                        <Send className="text-sm" />
                        Aprobar y Enviar_
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* WhatsApp Preview */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-white italic flex items-center gap-3">
                            <WhatsApp className="text-emerald-400" />
                            Vista Previa WhatsApp_
                        </h2>
                        <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">Listo_</span>
                    </div>

                    {/* Phone Frame */}
                    <div className="relative mx-auto w-full max-w-[340px] border-[8px] border-[#0d1a1a] bg-[#0d1a1a] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col aspect-[9/19]">
                        {/* StatusBar */}
                        <div className="px-8 py-4 flex justify-between items-center text-[10px] text-slate-500 font-bold z-10">
                            <span>9:41</span>
                            <div className="flex gap-1.5">
                                <Signal className="w-3 h-3" />
                                <Wifi className="w-3 h-3" />
                                <BatteryFull className="w-3 h-3" />
                            </div>
                        </div>

                        {/* WhatsApp Header */}
                        <div className="bg-[#162e2e] px-4 py-3 flex items-center gap-3 border-b border-white/5 shadow-lg">
                            <ArrowBack className="text-[#0df2f2] text-sm" />
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-black/40 border border-[#0df2f2]/30 p-[1px]">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXZlHhNp8mfhVEzBAyv3izlg1yA8c2rFAHrAmEzToibHjLETv78X-hNYlALxDJzJcA-jqE1AFpgH4T7ly4kXB0Rn33FRRHd8F83_CqbjsiHKIJE5m5EebGUSTdQmJ8xIhnBZrXmoTYgApDwruasNO_YCoJ03v9nfdWDb15up1qs8scEHTDdDE7YAymwIoJnSEyhQnfWThYadp3REfJVIW5xJxSFtGVhST06q1_Tv0U1n4O9CffcCLoCzRercUn86OW5KYudP5JpcRQ" className="w-full h-full rounded-full object-cover" alt="SinapAI" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xs font-black text-white">SinapCODE Assistant</h3>
                                <p className="text-[8px] text-[#0df2f2] font-black uppercase tracking-widest">Cuenta de Empresa_</p>
                            </div>
                            <div className="flex gap-2 text-slate-400">
                                <Videocam className="w-5 h-5" />
                                <Call className="w-5 h-5" />
                            </div>
                        </div>

                        {/* WhatsApp Body */}
                        <div className="flex-1 bg-[#0d1515] p-4 space-y-4 overflow-y-auto">
                            <div className="flex justify-center">
                                <span className="text-[9px] bg-[#162e2e] text-slate-500 px-3 py-1 rounded-full border border-white/5 uppercase font-black">Hoy</span>
                            </div>

                            {/* Message Bubble */}
                            <div className="max-w-[85%] space-y-1">
                                <div className="bg-[#1f3b3b] p-3 rounded-2xl rounded-tl-none text-[12px] leading-relaxed text-slate-200 shadow-xl relative">
                                    <p className="mb-2">¡Hola <span className="text-[#0df2f2] font-bold">{leadName}</span>! 👋</p>
                                    <p>El futuro no espera. Analizamos tu actividad en GitHub y construimos una ruta de aprendizaje IA personalizada solo para ti.</p>
                                    <div className="text-right mt-1">
                                        <span className="text-[8px] text-slate-500">09:42 AM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Multimedia Card */}
                            <div className="max-w-[85%] bg-[#162e2e] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                <div className="relative aspect-video">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbuiU2Idcau3AxplMOCzkCt8xH3-r3NRpBQZ_QlLOUugzJPnXp_Re4QlIg7TQmxfgzmz8FsSIE-arD0aglXmL7yNfkRZ1B7MMpoN7AKPoNwjFC7NMMDAp_kNtIoCW1mXL8tlw82pjUwVcaCQVMg4M761w9RZDMlVL3WLH9ZoLeD9cVnRwCEov2Tnl3AAMaKTMqBvK8AhCrmm-YR318zuqvw2rTG_7f1Q8oFn4n_lqeiLstG-2ewgy7f0M16f9S6e5wklQlLmi8crmW" className="w-full h-full object-cover opacity-60" alt="Thumbnail" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20">
                                            <PlayArrow className="text-white text-xl ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-[#162e2e]">
                                    <h4 className="text-[10px] font-black text-white italic uppercase tracking-widest mb-1">Tu Roadmap IA_</h4>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase">Video de 2 min • Personalizado</p>
                                </div>
                            </div>

                            {/* CTA Link */}
                            <div className="max-w-[85%]">
                                <button className="w-full py-2.5 rounded-xl bg-[#0df2f2]/10 border border-[#0df2f2]/30 text-[#0df2f2] text-[11px] font-black uppercase tracking-widest hover:bg-[#0df2f2]/20 transition-all italic">
                                    Ver Mi Ruta de Éxito_
                                </button>
                            </div>
                        </div>

                        {/* WhatsApp Footer */}
                        <div className="bg-[#162e2e] p-4 flex items-center gap-3 border-t border-white/5">
                            <Add className="text-slate-500 w-5 h-5" />
                            <div className="flex-1 bg-black/40 h-10 rounded-full flex items-center px-4">
                                <span className="text-slate-600 text-[11px] italic font-medium">Escribe un mensaje...</span>
                            </div>
                            <CameraAlt className="text-slate-500 w-5 h-5" />
                            <Mic className="text-slate-500 w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Email Campaign Design */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-white italic flex items-center gap-3">
                            <Email className="text-blue-400" />
                            Diseño de Campaña Email_
                        </h2>
                        <div className="flex gap-4">
                            <button className="text-[10px] font-black text-slate-500 hover:text-white flex items-center gap-2 uppercase tracking-widest transition-all">
                                <Devices className="text-sm" />
                                Revisión Responsive_
                            </button>
                            <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest">Modo Borrador_</span>
                        </div>
                    </div>

                    {/* Email Client Frame */}
                    <div className="flex-1 bg-[#121212] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                        {/* Email Header */}
                        <div className="bg-[#1a1a1a] p-8 border-b border-white/5">
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-20">Asunto:</span>
                                    <h1 className="text-lg font-black text-white italic tracking-tighter uppercase">
                                        Tu lugar en la revolución IA está listo, <span className="text-[#0df2f2]">{leadName}</span>.
                                    </h1>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-20">De:</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[12px] font-black text-white italic">SinapCODE Team</span>
                                        <span className="text-[10px] text-slate-500 font-bold">&lt;welcome@sinapcode.ai&gt;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Content */}
                        <div className="flex-grow bg-white p-12 overflow-y-auto">
                            <div className="max-w-2xl mx-auto space-y-12">
                                {/* Email Logo */}
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-3 border-b-2 border-[#0df2f2]/20 pb-4 px-10">
                                        <div className="w-8 h-8 rounded bg-[#102222] flex items-center justify-center text-[#0df2f2] font-black text-lg shadow-xl">S</div>
                                        <span className="text-xl font-black tracking-tighter text-[#102222] uppercase">Sinap<span className="text-[#0df2f2] text-shadow-sm">CODE</span></span>
                                    </div>
                                </div>

                                {/* Hero Image / Video */}
                                <div className="relative rounded-[2rem] overflow-hidden aspect-video bg-[#102222] shadow-2xl group cursor-pointer border-4 border-[#102222]">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCN8ID_1m2o4e4A297gK_sTtcsO8U9eM6TA6MXdbRUZUW_Jt4iPepVp8ogC2xpi2hOvqmNnzFUt5oAPY_WV1Am4GKYSgl8goNih_2skkn8x2NFmo48XWo1he2oSqONtlrw_1P1lwFtkMVsGoIZa8GU_cSGFKWGBBtmuoF1JZVqfwg0RQpFzB4zvb-3s7pQyYvcim5KJ6phcmm03t5RDrHPLG3SafXxh7jnEymK4sAk92O0-FsniCf1_Rrh8QwPfLb96lL-EfM9AnhE" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700" alt="AI Network" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="w-20 h-20 rounded-full bg-[#0df2f2] text-[#102222] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(13,242,242,0.6)] transform group-hover:scale-110 transition-transform duration-500">
                                            <PlayArrow size={48} className="ml-1" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">Bienvenido a SinapCODE_</h3>
                                        <p className="text-xs text-slate-300 font-bold uppercase tracking-widest italic">Mira tu intro personalizada (0:45)</p>
                                    </div>
                                </div>

                                {/* Body Text */}
                                <div className="space-y-6 text-[#102222]">
                                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">Libera tu potencial con IA.</h2>
                                    <p className="text-base text-slate-600 leading-relaxed font-medium">
                                        Hola <span className="text-[#0df2f2] font-black">{leadName}</span>, notamos tu interés en las redes neuronales. La industria se mueve rápido, pero con SinapCODE, tú te mueves más rápido. Hemos curado un currículo especializado diseñado para cerrar la brecha entre la teoría y el despliegue real.
                                    </p>
                                </div>

                                {/* Benefit Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { icon: Psychology, title: 'Domina Modelos Generativos', desc: 'Sumergete en LLMs y modelos de difusión con laboratorios prácticos.' },
                                        { icon: Layers, title: 'Construye un Portfolio Real', desc: 'Despliega 5 aplicaciones de IA listas para producción antes de graduarte.' },
                                        { icon: Groups, title: 'Network con Líderes', desc: 'Mentoría directa de ingenieros en las principales firmas tecnológicas.' }
                                    ].map((benefit, i) => (
                                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-[#0df2f2]/30 transition-all">
                                            <benefit.icon className="text-[#0df2f2] mb-4" />
                                            <h4 className="text-sm font-black italic uppercase tracking-tighter text-[#102222] mb-3 leading-tight">{benefit.title}_</h4>
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Section */}
                                <div className="text-center py-12 border-y border-slate-100">
                                    <button className="inline-flex items-center justify-center px-12 py-5 text-sm font-black text-[#102222] bg-[#0df2f2] rounded-2xl hover:bg-[#0bcaca] transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(13,242,242,0.3)] uppercase tracking-widest italic">
                                        Inscríbete Ahora_
                                        <ArrowForward className="mx-2 text-sm" />
                                    </button>
                                    <p className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Cupos limitados para la próxima cohorte_</p>
                                </div>

                                {/* Email Footer */}
                                <div className="text-center space-y-4">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 SinapCODE Inc. • 123 Innovation Dr, Tech City.</p>
                                    <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <a href="#" className="hover:text-[#0df2f2] transition-colors">Darse de Baja</a>
                                        <a href="#" className="hover:text-[#0df2f2] transition-colors">Privacidad</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
