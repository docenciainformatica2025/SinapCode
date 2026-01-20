'use client';

export default function TestPage() {
    return (
        <div className="p-10 text-white">
            <h1 className="text-4xl font-bold mb-4">Panel de Prueba System Check</h1>
            <p className="text-xl">Si ves esto, el routing y el middleware funcionan correctamente.</p>
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded">
                Status: OPERATIONAL
            </div>
        </div>
    );
}
