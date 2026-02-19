'use client';

import { motion } from 'framer-motion';
import { Rocket, XCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function LaunchTerminal() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="glass-panel-nexus p-1 rounded-3xl bg-gradient-to-r from-primary/20 via-white/5 to-[#f2e20d]/20">
            <div className="bg-[#0a0f0f] rounded-[calc(1.5rem-1px)] p-10 flex flex-col items-center text-center">
                <motion.div
                    animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                    className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/30 text-primary shadow-2xl shadow-primary/5"
                >
                    <ShieldCheck className="w-10 h-10" />
                </motion.div>

                <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">Listo para Despliegue Global</h2>
                <p className="text-slate-400 max-w-lg mb-10 text-sm leading-relaxed">
                    Al activar el gatillo de lanzamiento, se iniciará el despliegue del ecosistema SinapCODE a los clusters de producción. Esta acción es definitiva y quedará registrada.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-5 rounded-2xl transition-all border border-white/5 flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                        <XCircle className="w-5 h-5 text-red-500/70" />
                        Abortar Secuencia
                    </button>
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex-[1.5] bg-primary hover:brightness-110 text-[#0a1212] font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group uppercase text-sm tracking-tighter"
                    >
                        <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        INICIALIZAR GO-LIVE
                    </button>
                </div>

                <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        DB Clusters: Green
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        CDN Edge: Green
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        SSL Protocol: Valid
                    </span>
                </div>
            </div>
        </div>
    );
}
