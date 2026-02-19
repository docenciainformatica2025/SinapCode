'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
    isListening: boolean;
    isSpeaking: boolean;
}

export function AudioVisualizer({ isListening, isSpeaking }: AudioVisualizerProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Ambient Glow */}
            <div className={`absolute inset-0 bg-[#0df2f2]/10 blur-[100px] transition-opacity duration-1000 ${isListening || isSpeaking ? 'opacity-100' : 'opacity-20'}`} />

            {/* Central Orb */}
            <div className="relative z-10">
                <motion.div
                    animate={{
                        scale: isListening ? [1, 1.1, 1] : isSpeaking ? [1, 1.25, 0.95, 1.15, 1] : 1,
                        boxShadow: isListening
                            ? '0 0 60px rgba(13, 242, 242, 0.4)'
                            : isSpeaking
                                ? '0 0 80px rgba(13, 242, 242, 0.5)'
                                : '0 0 30px rgba(13, 242, 242, 0.05)',
                    }}
                    transition={{
                        duration: isListening ? 2 : isSpeaking ? 0.6 : 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`w-24 h-24 rounded-full bg-gradient-to-br transition-all duration-700 ${isSpeaking ? 'from-white to-[#0df2f2]' : 'from-[#0df2f2] to-cyan-800'} flex items-center justify-center shadow-2xl border border-white/20`}
                >
                    <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center overflow-hidden">
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-16 h-16 bg-[#0df2f2]/30 blur-2xl rounded-full"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Waveforms (Simulated) */}
            {(isListening || isSpeaking) && (
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 pointer-events-none">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: isSpeaking
                                    ? [10, Math.random() * 120 + 40, 10]
                                    : [5, Math.random() * 50 + 10, 5],
                                opacity: [0.4, 1, 0.4],
                                backgroundColor: isSpeaking ? '#ffffff' : '#0df2f2'
                            }}
                            transition={{
                                duration: 0.4,
                                repeat: Infinity,
                                delay: i * 0.03,
                                ease: "easeInOut"
                            }}
                            className="w-1 rounded-full shadow-[0_0_10px_rgba(13,242,242,0.3)]"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
