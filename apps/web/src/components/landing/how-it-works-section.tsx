'use client';

import { motion } from 'framer-motion';
import { ProcessStep } from '@/lib/landing-data';

export function HowItWorksSection({ steps }: { steps: ProcessStep[] }) {

    return (
        <section id="como-funciona" className="py-20 md:py-28 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 0.6, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-platinum mb-4 italic"
                    >
                        El Método SINAPCODE
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 italic tracking-tighter leading-tight">
                        DE LA IDEA AL <span className="text-primary italic">DESPLIEGUE</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-platinum-dim font-medium leading-relaxed">
                        Un sistema equilibrado para que tu <span className="text-white">evolución</span> sea lineal, fluida y medible. Sin distracciones.
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
                            className="bg-white/5 border border-white/5 p-10 rounded-[3rem] text-center group hover:border-primary/30 transition-all duration-700 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-2xl shadow-primary/20 flex items-center justify-center text-4xl mb-8 mx-auto group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 relative z-10`}>
                                {step.icon}
                            </div>
                            <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase mb-4 block relative z-10 italic">FASE {step.number}</span>
                            <h3 className="text-2xl font-black text-white mb-6 italic tracking-tight relative z-10">{step.title}</h3>
                            <p className="text-platinum-dim leading-relaxed font-bold text-sm relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
