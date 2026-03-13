'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const WebGLHeroBg = dynamic(() => import('@/components/landing/webgl-hero-bg').then(mod => mod.WebGLHeroBg), {
    ssr: false,
});

export function NewHeroSection() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-16">
            <WebGLHeroBg />
            <section className="relative z-10 text-center px-4 max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-serif font-medium leading-tight mb-6">
                    <span className="relative inline-block">
                        Claridad
                        <svg className="absolute bottom-[-10px] left-0 w-full h-[20px]" preserveAspectRatio="none" viewBox="0 0 300 20">
                            <path d="M5,15 Q150,5 295,15" fill="none" stroke="#C9A78A" strokeLinecap="round" strokeWidth="4"></path>
                        </svg>
                    </span>
                    {' '}para tu <br className="hidden md:block" /> ecosistema.
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-80 max-w-2xl mx-auto mb-10">
                    Diseñamos herramientas que respiran contigo. Sin ruido, sin fricción. Solo tú y tus metas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a className="px-8 py-4 bg-clubroom-black text-cloud-dancer rounded-full text-lg transition-all hover:shadow-xl hover:-translate-y-1 block" href="#ecosystem">
                        Descubrir Apps
                    </a>
                </div>
            </section>
        </main>
    );
}

export function EcosystemSection() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="ecosystem">
            <div className="mb-16 reveal opacity-0 transform translate-y-8 transition-all duration-700 ease-out [&.active]:opacity-100 [&.active]:translate-y-0">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">El Universo Sinapcode</h2>
                <p className="text-xl font-light opacity-70">Una suite asimétrica diseñada para cada faceta de tu vida profesional y personal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                {/* Nox Card */}
                <Link
                    href="/productos/nox"
                    className="md:col-span-8 bg-terracotta rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group reveal opacity-0 transform translate-y-8 transition-all duration-700 ease-out [&.active]:opacity-100 [&.active]:translate-y-0 text-clubroom-black hover:shadow-2xl hover:-translate-y-1"
                >
                    <div className="z-10">
                        <span className="text-xs uppercase tracking-widest font-bold opacity-60">Enfoque Personal</span>
                        <h3 className="text-4xl md:text-6xl font-serif mt-4">Nox Health</h3>
                        <p className="text-xl mt-4 max-w-xs opacity-90">Tu espacio, tu ritmo. Bienestar integral para la mujer moderna.</p>
                    </div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="self-end z-10">
                        <span className="inline-block bg-clubroom-black/10 backdrop-blur-md px-6 py-2 rounded-full border border-black/5 group-hover:bg-clubroom-black group-hover:text-cloud-dancer transition-all font-semibold">
                            Explorar Nox
                        </span>
                    </div>
                </Link>

                {/* Vitriu Card */}
                <Link
                    href="/productos/vitriu"
                    className="md:col-span-4 bg-bio-graphing rounded-[2.5rem] p-8 flex flex-col justify-between relative group reveal opacity-0 transform translate-y-8 transition-all duration-700 ease-out [&.active]:opacity-100 [&.active]:translate-y-0 text-clubroom-black hover:shadow-2xl hover:-translate-y-1"
                >
                    <div className="z-10">
                        <span className="text-xs uppercase tracking-widest font-bold opacity-60">Gestión Business</span>
                        <h3 className="text-3xl font-serif mt-2">Vitriu</h3>
                        <p className="mt-4 text-lg leading-snug">Tu negocio en orden, tu mente en paz. Inventarios y CRM inteligente.</p>
                    </div>
                    <div className="w-full h-32 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                            <path d="M0,40 Q25,10 50,30 T100,0" fill="none" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                    </div>
                    <div className="self-end z-10">
                        <span className="text-xs font-bold uppercase tracking-tighter group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Ver detalles ➔
                        </span>
                    </div>
                </Link>

                {/* Finder Card */}
                <Link
                    href="/productos/findriver"
                    className="md:col-span-4 bg-banana-yellow rounded-[2.5rem] p-8 flex flex-col justify-between relative group reveal opacity-0 transform translate-y-8 transition-all duration-700 ease-out [&.active]:opacity-100 [&.active]:translate-y-0 text-clubroom-black hover:shadow-2xl hover:-translate-y-1"
                >
                    <div className="z-10">
                        <span className="text-xs uppercase tracking-widest font-bold opacity-60">Finanzas Inteligentes</span>
                        <h3 className="text-3xl font-serif mt-2">Findriver Pro</h3>
                        <p className="mt-4 text-lg">Tus ganancias, sin que se escapen. Control total para delivery.</p>
                    </div>
                    <div className="text-6xl font-serif italic text-clubroom-black/10 animate-pulse-slow group-hover:scale-110 transition-transform">$</div>
                </Link>

                {/* SaberPro Card */}
                <Link
                    href="/productos/saberpro"
                    className="md:col-span-4 bg-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm border border-black/5 relative group reveal opacity-0 transform translate-y-8 transition-all duration-700 ease-out [&.active]:opacity-100 [&.active]:translate-y-0 text-clubroom-black hover:shadow-2xl hover:-translate-y-1"
                >
                    <div className="z-10">
                        <span className="text-xs uppercase tracking-widest font-bold opacity-30">Alto Rendimiento</span>
                        <h3 className="text-3xl font-serif mt-2">SaberPro 2026</h3>
                        <p className="mt-4 text-lg">Entrenar en serio, sentirse seguro. Preparación de élite.</p>
                    </div>
                    <div className="flex space-x-2 group-hover:translate-x-1 transition-transform">
                        <div className="w-8 h-8 rounded-full bg-clubroom-black"></div>
                        <div className="w-8 h-8 rounded-full bg-terracotta"></div>
                        <div className="w-8 h-8 rounded-full bg-bio-graphing"></div>
                    </div>
                </Link>

                {/* UTP Control Card */}
                <Link
                    href="/productos/utp-control"
                    className="md:col-span-4 bg-clubroom-black text-cloud-dancer rounded-[2.5rem] p-8 flex flex-col justify-between relative group reveal opacity-0 transform translate-y-8 transition-all duration-700 ease-out [&.active]:opacity-100 [&.active]:translate-y-0 hover:shadow-2xl hover:-translate-y-1"
                >
                    <div className="z-10">
                        <span className="text-xs uppercase tracking-widest font-bold opacity-40">Infraestructura</span>
                        <h3 className="text-3xl font-serif mt-2">UTP Control</h3>
                        <p className="mt-4 text-lg text-white/80">Tu equipo, conectado en tiempo real.</p>
                    </div>
                    <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                        <div className="h-[1px] bg-white/20 flex-grow mr-4"></div>
                        <span className="text-2xl">⚡</span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
