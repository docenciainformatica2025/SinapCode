'use client';

import { motion } from 'framer-motion';
// Usamos lucide-react para consistencia, manteniendo la estética de la maqueta
import {
    CheckCircle2,
    Eye,
    Brain,
    Zap,
    Lock as LockIcon,
    BarChart3,
    Sparkles,
    Split,
    Play
} from 'lucide-react';

interface SkillNodeProps {
    x: number;
    y: number;
    title: string;
    status: 'completed' | 'active' | 'locked';
    score?: string;
    Icon: any;
    isLarge?: boolean;
}

const SkillNode = ({ x, y, title, status, score, Icon, isLarge }: SkillNodeProps) => {
    return (
        <div
            className="absolute group z-10"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                    ${isLarge ? 'w-20 h-20' : 'w-14 h-14'} 
                    rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative
                    ${status === 'completed' ? 'border-emerald-400 bg-surface/80 shadow-[0_0_20px_rgba(52,211,153,0.2)]' :
                        status === 'active' ? 'border-primary bg-surface/80 shadow-[0_0_30px_rgba(13,13,242,0.4)] animate-pulse' :
                            'border-white/10 bg-white/5 opacity-40 grayscale'}
                `}
            >
                {status === 'active' && (
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse -z-10" />
                )}
                <Icon className={`w-1/2 h-1/2 ${status === 'completed' ? 'text-emerald-400' : status === 'active' ? 'text-primary' : 'text-platinum-dim'}`} />

                {status === 'active' && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg animate-bounce">
                        Objetivo Actual
                    </div>
                )}
            </motion.div>
            <div className="mt-4 text-center whitespace-nowrap">
                {score && <p className={`text-[8px] font-black uppercase tracking-widest ${status === 'completed' ? 'text-emerald-400' : 'text-primary'}`}>{score} Puntuación</p>}
                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${status === 'locked' ? 'text-platinum-dim' : 'text-white'}`}>{title}</p>
            </div>
        </div>
    );
};

export function SkillTreeRoadmap() {
    return (
        <div className="relative w-full h-[600px] bg-background-dark/30 rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center">

            {/* SVG Connector Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <linearGradient id="grad-complete" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0.3 }} />
                    </linearGradient>
                    <linearGradient id="grad-active" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#0d0df2', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                {/* Connection Paths (Hand-coded positions for demonstration to match mockup) */}
                <path d="M 150 300 Q 250 300 320 220" fill="none" stroke="#10B981" strokeWidth="2" className="opacity-40" />
                <path d="M 150 300 Q 250 300 320 380" fill="none" stroke="#10B981" strokeWidth="2" className="opacity-40" />

                <path d="M 380 220 L 550 220" fill="none" stroke="url(#grad-complete)" strokeWidth="3" />

                <path d="M 610 220 Q 680 220 750 300" fill="none" stroke="url(#grad-active)" strokeWidth="3" strokeDasharray="8 4" className="path-flow" />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center">
                {/* Nodo 1: Foundations */}
                <SkillNode x={150} y={300} title="Fundamentos de IA" status="completed" Icon={CheckCircle2} />

                {/* Nodo 2: Computer Vision */}
                <SkillNode x={350} y={220} title="Visión Artificial" status="completed" score="98%" Icon={Eye} isLarge />

                {/* Nodo 2b: Data Science */}
                <SkillNode x={350} y={380} title="Ciencia de Datos" status="completed" Icon={BarChart3} />

                {/* Nodo 3: Deep Learning */}
                <SkillNode x={580} y={220} title="Redes Neuronales" status="completed" score="95%" Icon={Brain} isLarge />

                {/* Nodo 4: Active Goal */}
                <SkillNode x={800} y={300} title="Optimización Python" status="active" Icon={Zap} isLarge />

                {/* Nodo 5: Locked */}
                <SkillNode x={950} y={220} title="Transformers" status="locked" Icon={LockIcon} />
                {/* Nodo 6: Locked */}
                <SkillNode x={950} y={380} title="Ajuste de LLMs" status="locked" Icon={LockIcon} />
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-10 left-10 p-4 bg-surface/80 backdrop-blur-md rounded-2xl border border-white/10 z-20">
                <p className="text-[10px] font-black text-platinum-dim uppercase tracking-widest mb-3">Estado del Nodo_</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Completado</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(13,13,242,0.5)] animate-pulse" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">En Progreso</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .path-flow {
                    stroke-dasharray: 10;
                    animation: dash 30s linear infinite;
                }
                @keyframes dash {
                    to {
                        stroke-dashoffset: -1000;
                    }
                }
            `}</style>
        </div>
    );
}
