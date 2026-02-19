'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Share2,
    Download,
    Infinity,
    ExternalLink,
    History,
    Coins,
    BadgeCheck,
    Award,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function BlockchainCertificatePage() {
    return (
        <div className="min-h-screen bg-[#101f22] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden text-slate-100 selection:bg-[#0dccf2] selection:text-black">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

            {/* Ambient Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0dccf2]/10 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0dccf2]/5 rounded-full blur-[128px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            {/* Custom Styles for Holographic Effects */}
            <style jsx>{`
                .text-holographic {
                    background: linear-gradient(90deg, #0dccf2, #ffffff, #ffd700, #0dccf2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 300% auto;
                    animation: shine 8s linear infinite;
                }
                @keyframes shine {
                    to { background-position: 300% center; }
                }
                .certificate-glow {
                    box-shadow: 0 0 50px -10px rgba(13, 204, 242, 0.3);
                }
            `}</style>

            {/* Main Content Wrapper */}
            <main className="relative z-10 w-full max-w-6xl flex flex-col gap-10">

                {/* Action Bar (Top) */}
                <div className="w-full flex justify-between items-center bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
                    <Link href="/profile" className="flex items-center gap-3 text-white/50 hover:text-white transition-all group px-4">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Volver al Perfil_</span>
                    </Link>
                    <div className="flex gap-4 px-2">
                        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic">
                            <Share2 className="w-4 h-4" />
                            Compartir
                        </button>
                        <button className="flex items-center gap-2 bg-[#0dccf2] hover:bg-[#0ab8da] text-black font-black px-8 py-2.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#0dccf2]/30 italic">
                            <Download className="w-4 h-4" />
                            Descargar PDF
                        </button>
                    </div>
                </div>

                {/* Certificate Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full aspect-[1.6/1] bg-[#16282c] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group certificate-glow"
                >
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-10 left-10 w-40 h-40 border-l-2 border-t-2 border-[#0dccf2]/30 rounded-tl-[2rem] z-10"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-r-2 border-b-2 border-[#0dccf2]/30 rounded-br-[2rem] z-10"></div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 p-16 lg:p-24 flex flex-col justify-between bg-gradient-to-br from-[#16282c] via-[#16282c]/95 to-[#101f22]/95 z-0">
                        <div className="relative z-10 h-full flex flex-col">

                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0dccf2] flex items-center justify-center shadow-glow">
                                        <Infinity className="text-black font-black w-10 h-10" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-black tracking-[0.3em] text-2xl leading-none italic">SINAP<span className="text-[#0dccf2]">CODE</span></span>
                                        <span className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-black mt-2">Instituto de IA_</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-black/40 border border-[#0dccf2]/30 px-5 py-2.5 rounded-full backdrop-blur-xl">
                                    <div className="w-2 h-2 rounded-full bg-[#0dccf2] shadow-[0_0_15px_rgba(13,204,242,1)] animate-pulse"></div>
                                    <span className="text-[#0dccf2] text-[10px] font-black tracking-[0.2em] uppercase italic">Verificado en Blockchain_</span>
                                </div>
                            </div>

                            {/* Main Body */}
                            <div className="flex-grow flex flex-col justify-center items-center text-center space-y-8">
                                <p className="text-slate-500 font-black text-xs uppercase tracking-[0.5em] italic opacity-60">Certificado de Maestría_</p>
                                <motion.h1
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 italic"
                                >
                                    Elena <span className="text-slate-400 opacity-60">Voss</span>
                                </motion.h1>
                                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#0dccf2] to-transparent my-6"></div>
                                <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">Ha demostrado con éxito una optimización avanzada de arquitectura y estrategias de despliegue de élite para</p>
                                <h2 className="text-4xl md:text-6xl font-black text-holographic py-4 tracking-tighter italic uppercase">
                                    Máster en Sistemas de IA Agéntica_
                                </h2>
                            </div>

                            {/* Skills & Badges */}
                            <div className="flex justify-center gap-6 my-10 flex-wrap">
                                {[
                                    { name: 'Python Advanced', color: 'bg-blue-400' },
                                    { name: 'LLM Architecture', color: 'bg-purple-400' },
                                    { name: 'System Design', color: 'bg-emerald-400' },
                                    { name: 'Neuro-Optimization', color: 'bg-[#0dccf2]' }
                                ].map((skill) => (
                                    <div key={skill.name} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:border-[#0dccf2]/50 transition-all cursor-default shadow-lg">
                                        <span className={`w-2 h-2 rounded-full ${skill.color} shadow-lg`}></span>
                                        <span className="text-slate-200 text-[10px] font-black uppercase tracking-widest italic">{skill.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer: Verification & Signature */}
                            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mt-auto pt-10 border-t border-white/5">
                                {/* QR & ID */}
                                <div className="flex items-center gap-8 bg-black/20 p-6 rounded-[2rem] border border-white/5">
                                    <div className="bg-white p-3 rounded-2xl shadow-2xl relative group">
                                        <img
                                            alt="Blockchain QR Verification"
                                            className="w-24 h-24 mix-blend-multiply"
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://sinapcode.ai/verify/0x71C9A2"
                                        />
                                        <div className="absolute inset-0 border-2 border-[#0dccf2]/20 rounded-2xl group-hover:border-[#0dccf2]/50 transition-colors"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-black italic">ID de Credencial_</span>
                                        <span className="font-mono text-[#0dccf2] text-sm tracking-widest font-bold">0x71C9...9A2FF4</span>
                                        <a href="#" className="text-[10px] text-slate-400 hover:text-white flex items-center gap-2 mt-2 transition-all font-black uppercase tracking-widest">
                                            Verificar en Etherscan
                                            <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>

                                {/* Date & Signature */}
                                <div className="flex gap-16 text-right">
                                    <div className="flex flex-col justify-end">
                                        <span className="text-white font-black text-lg italic tracking-tighter">October 24, 2023</span>
                                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent to-white/20 mt-2 mb-2"></div>
                                        <span className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-black italic">Fecha de Emisión_</span>
                                    </div>
                                    <div className="flex flex-col justify-end items-end">
                                        <div className="text-4xl text-white font-black italic tracking-tighter mb-2" style={{ fontFamily: 'var(--font-display)' }}>Dr. NEXUS</div>
                                        <div className="h-0.5 w-40 bg-gradient-to-r from-transparent to-[#0dccf2]/40 mt-2 mb-2"></div>
                                        <span className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-black italic">Decano de IA, SinapCode_</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Verification Log (Visual Flair) */}
                <div className="w-full bg-black/40 border border-white/5 rounded-[2rem] p-10 backdrop-blur-2xl shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black italic flex items-center gap-3">
                            <History className="text-[#0dccf2] w-4 h-4" />
                            Registro de Transacciones Blockchain_
                        </h3>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                            <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest italic">Confirmado_</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
                        <div className="space-y-2">
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest italic opacity-50">Altura de Bloque_</p>
                            <p className="text-slate-200 text-sm font-bold tracking-widest">18,245,901</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest italic opacity-50">Autoridad_</p>
                            <p className="text-[#0dccf2] text-sm font-bold tracking-widest">0xSinapCODE...Auth</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest italic opacity-50">Red_</p>
                            <p className="text-slate-200 text-sm font-bold tracking-widest italic uppercase">Red Principal de Ethereum</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 text-slate-500 text-[10px] uppercase font-black tracking-[0.3em] text-center pb-12 italic opacity-40">
                © 2026 Instituto SinapCode. Esta credencial digital está registrada permanentemente en la blockchain de Ethereum.
            </footer>
        </div>
    );
}
