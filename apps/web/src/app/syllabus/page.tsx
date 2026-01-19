import Link from 'next/link';

export default function SyllabusPage() {
    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Plan de Estudios (Syllabus)</h1>
            <p className="text-muted mb-8 max-w-md">
                Estamos actualizando nuestro currículo con las últimas tendencias en IA y Desarrollo Tech.
                Vuelve pronto para ver el plan detallado.
            </p>
            <Link
                href="/"
                className="btn-primary"
            >
                Volver al Inicio
            </Link>
        </div>
    );
}
