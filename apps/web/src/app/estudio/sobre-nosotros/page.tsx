'use client';

import { motion } from 'framer-motion';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Heart, Globe, Users, Shield } from 'lucide-react';

export default function SobreNosotrosPage() {
    return (
        <div className="bg-[#F1F0E8] text-[#1E1E1E] font-sans selection:bg-[#A7C1C0] selection:text-white min-h-screen">
            {/* Background Texture */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <main className="relative pt-32 pb-24 px-6 z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-6xl font-serif font-bold tracking-tight mb-8">Sobre nosotros</h1>
                    <p className="text-xl font-light leading-relaxed text-[#1E1E1E]/70 mb-12">
                        Sinapcode no es solo un estudio de desarrollo. Es un laboratorio de ideas donde la tecnología se encuentra con la intuición humana para crear herramientas que realmente importan.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-medium mb-6">Nuestra Misión</h2>
                        <p className="text-lg font-light leading-loose text-[#1E1E1E]/60">
                            Diseñamos aplicaciones que respiran contigo. En un mundo saturado de ruido y fricción digital, nuestra misión es devolver la claridad a tu ecosistema. Creemos que la potencia del software no debe medirse en complejidad, sino en la libertad que otorga a quien lo usa.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-medium mb-6">El Equipo</h2>
                        <p className="text-lg font-light leading-loose text-[#1E1E1E]/60">
                            Somos un grupo multidisciplinar de diseñadores, ingenieros y soñadores con una visión global. Nos apasiona el código bien escrito, pero nos apasiona aún más el impacto humano que ese código genera.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-32">
                    {[
                        { title: 'Propósito', icon: Heart, desc: 'Cada línea de código tiene un porqué.' },
                        { title: 'Global', icon: Globe, desc: 'Pensamos local, actuamos global.' },
                        { title: 'Comunidad', icon: Users, desc: 'Crecemos junto a nuestras usuarias.' },
                        { title: 'Confianza', icon: Shield, desc: 'Seguridad y transparencia absoluta.' },
                    ].map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-white/50 border border-[#1E1E1E]/5 backdrop-blur-sm"
                        >
                            <value.icon className="w-8 h-8 text-[#C9A78A] mb-6" />
                            <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                            <p className="text-sm font-light text-[#1E1E1E]/50 leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
