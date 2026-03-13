'use client';

import { motion } from 'framer-motion';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Sparkles, Zap, Eye, Leaf } from 'lucide-react';

export default function FilosofiaPage() {
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
                    <h1 className="text-6xl font-serif font-bold tracking-tight mb-8">Nuestra filosofía</h1>
                    <p className="text-xl font-light leading-relaxed text-[#1E1E1E]/70 mb-12">
                        En Sinapcode, creemos que menos no es solo más; es mejor. Nuestra filosofía se basa en la eliminación sistemática de lo innecesario para dejar brillar lo esencial.
                    </p>
                </motion.div>

                <div className="space-y-32 mt-24">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-[#C9A78A]/10 flex items-center justify-center mb-6">
                                <Sparkles className="w-6 h-6 text-[#C9A78A]" />
                            </div>
                            <h2 className="text-3xl font-medium mb-6">Jerarquía Silenciosa</h2>
                            <p className="text-lg font-light leading-loose text-[#1E1E1E]/60">
                                Un buen diseño no grita su presencia. Guía al usuario de manera intuitiva, resolviendo problemas incluso antes de que aparezcan. Aplicamos este principio en cada botón, margen y color de nuestras aplicaciones.
                            </p>
                        </div>
                        <div className="h-64 rounded-[3rem] bg-[#A7C1C0]/10 border border-[#A7C1C0]/20 flex items-center justify-center">
                            <Eye className="w-16 h-16 text-[#A7C1C0] opacity-20" />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <div className="md:order-2">
                            <div className="w-12 h-12 rounded-2xl bg-[#F9E795]/20 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-[#F9E795]" />
                            </div>
                            <h2 className="text-3xl font-medium mb-6">Utilidad Invisible</h2>
                            <p className="text-lg font-light leading-loose text-[#1E1E1E]/60">
                                La mejor tecnología es aquella que desaparece. Buscamos que el usuario se olvide de que está usando una aplicación y se concentre puramente en su objetivo, ya sea gestionar un inventario o cuidar su bienestar.
                            </p>
                        </div>
                        <div className="md:order-1 h-64 rounded-[3rem] bg-[#F9E795]/5 border border-[#F9E795]/10 flex items-center justify-center">
                            <Zap className="w-16 h-16 text-[#F9E795] opacity-20" />
                        </div>
                    </section>

                    <section className="text-center max-w-2xl mx-auto pb-12">
                        <div className="w-16 h-16 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center mx-auto mb-8">
                            <Leaf className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-medium mb-6">Diseño Orgánico</h2>
                        <p className="text-lg font-light leading-loose text-[#1E1E1E]/60">
                            Entendemos el software como un organismo vivo que evoluciona junto a sus usuarios. No construimos productos terminados, sino ecosistemas que crecen, aprenden y se adaptan.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
