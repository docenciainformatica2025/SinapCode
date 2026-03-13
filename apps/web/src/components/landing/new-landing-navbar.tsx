'use client';

import Link from 'next/link';

export function NewLandingNavbar() {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-cloud-dancer/80 backdrop-blur-md">
            <div className="text-2xl font-serif font-bold tracking-tight text-clubroom-black">Sinapcode</div>
            <div className="hidden md:flex space-x-8 font-light text-sm tracking-widest uppercase text-clubroom-black">
                <Link className="hover:opacity-50 transition-opacity" href="/#ecosystem">Ecosistema</Link>
                <Link className="hover:opacity-50 transition-opacity" href="/academico">Cursos y Metodologías</Link>
                <Link className="hover:opacity-50 transition-opacity" href="/blog">Noticias</Link>
                <Link className="hover:opacity-50 transition-opacity" href="/#contact">Contacto</Link>
            </div>
            <Link
                href="/auth/register"
                className="bg-clubroom-black text-cloud-dancer px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
                Empezar
            </Link>
        </nav>
    );
}
