'use client';

import { motion } from 'framer-motion';
import { ProcessStep } from '@/lib/landing-data';

export function HowItWorksSection({ steps }: { steps: ProcessStep[] }) {

    return (
        <section id="methodology" className="py-20 md:py-28 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 0.7, y: 0 }}
                        className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-6"
                    >
                        El Método SinapCode
                    </motion.div>
                    <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold text-white mb-6 tracking-tight leading-tight text-balance">
                        De la idea al <span className="text-apple-blue font-extrabold text-glow">despliegue</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-base md:text-lg text-platinum-dim font-medium leading-relaxed text-pretty opacity-60">
                        Un sistema equilibrado para que tu <span className="text-white">evolución</span> sea constante y fluida. Sin ruidos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) with Animation */}
                    <div className="hidden md:block absolute top-16 left-0 w-full h-px -z-10 overflow-hidden">
                        <motion.div
                            className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        />
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-8 md:p-10 rounded-[2.5rem] text-center group hover:border-apple-blue/20 transition-all duration-700 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-2xl shadow-primary/10 flex items-center justify-center text-3xl mb-8 mx-auto group-hover:scale-110 transition-all duration-700 relative z-10`}>
                                {step.icon}
                            </div>
                            <span className="text-primary font-bold tracking-widest text-[11px] uppercase mb-4 block relative z-10">Fase {step.number}</span>
                            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight relative z-10">{step.title}</h3>
                            <p className="text-platinum-dim leading-relaxed font-medium text-sm relative z-10 opacity-70 group-hover:opacity-100 transition-opacity text-pretty">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
