'use client';

import { motion } from 'framer-motion';

interface AudioVisualizerProps {
    isListening: boolean;
    isSpeaking: boolean;
}

export function AudioVisualizer({ isListening, isSpeaking }: AudioVisualizerProps) {
    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Ambient Glow */}
            <div className={`absolute inset-0 bg-neural-blue/10 blur-[80px] transition-opacity duration-700 ${isListening || isSpeaking ? 'opacity-100' : 'opacity-30'}`} />

            {/* Central Orb */}
            <div className="relative z-10">
                <motion.div
                    animate={{
                        scale: isListening ? [1, 1.1, 1] : isSpeaking ? [1, 1.2, 0.9, 1.1, 1] : 1,
                        boxShadow: isListening
                            ? '0 0 40px rgba(59, 130, 246, 0.4)'
                            : isSpeaking
                                ? '0 0 60px rgba(168, 85, 247, 0.5)'
                                : '0 0 20px rgba(59, 130, 246, 0.1)',
                    }}
                    transition={{
                        duration: isListening ? 2 : isSpeaking ? 0.5 : 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${isSpeaking ? 'from-purple-500 to-pink-500' : 'from-neural-blue to-cyan-400'} flex items-center justify-center shadow-xl border-4 border-white/10`}
                >
                    <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm" />
                </motion.div>
            </div>

            {/* Waveforms (Simulated) */}
            {(isListening || isSpeaking) && (
                <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: isSpeaking
                                    ? [20, Math.random() * 100 + 40, 20]
                                    : [10, Math.random() * 40 + 10, 10],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "linear"
                            }}
                            className={`w-1.5 rounded-full ${isSpeaking ? 'bg-purple-500' : 'bg-neural-blue'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
