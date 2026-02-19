'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-deep-space flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full text-center space-y-8"
            >
                <div className="inline-block px-4 py-2 bg-accent-gold/10 rounded-full border border-accent-gold/20 mb-4">
                    <span className="text-accent-gold font-black uppercase tracking-widest text-xs">Planes de Membresía</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                    Invierte en tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-500">Futuro Profesional</span>
                </h1>

                <p className="text-xl text-platinum-dim max-w-2xl mx-auto">
                    Accede a todos los cursos, certificaciones blockchain y tutoría IA ilimitada.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                    {/* Free Plan */}
                    <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">Básico</h3>
                        <div className="text-4xl font-black text-white mb-6">$0 <span className="text-sm text-platinum-dim font-normal">/mes</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-platinum"><span className="text-primary">✓</span> Acceso a lecciones gratuitas</li>
                            <li className="flex gap-3 text-platinum"><span className="text-primary">✓</span> Comunidad en Discord</li>
                        </ul>
                        <Link href="/auth/register" className="w-full py-4 bg-white/10 text-white rounded-xl font-bold text-center hover:bg-white/20 transition">
                            Empezar Gratis
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative bg-gradient-to-b from-primary/10 to-surface/50 backdrop-blur-md border border-primary/50 rounded-3xl p-8 flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pro Builder</h3>
                        <div className="text-4xl font-black text-white mb-6">$29 <span className="text-sm text-platinum-dim font-normal">/mes</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-white"><span className="text-accent-gold">✓</span> Acceso ilimitado a todo</li>
                            <li className="flex gap-3 text-white"><span className="text-accent-gold">✓</span> Certificados Blockchain</li>
                            <li className="flex gap-3 text-white"><span className="text-accent-gold">✓</span> Tutor IA Personal 24/7</li>
                            <li className="flex gap-3 text-white"><span className="text-accent-gold">✓</span> Proyectos Reales</li>
                        </ul>
                        <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dim transition shadow-lg">
                            Suscribirse Ahora
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
