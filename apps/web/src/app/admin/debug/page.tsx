'use client';

import { useState } from 'react';

export default function DebugPage() {
    const [status, setStatus] = useState<any>(null);
    const [searchResult, setSearchResult] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const checkDB = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/debug');
            const data = await res.json();
            setStatus(data);
        } catch (e: any) {
            setStatus({ error: e.message });
        } finally {
            setLoading(false);
        }
    };

    const searchUser = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const res = await fetch('/api/admin/debug', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setSearchResult(data);
        } catch (e: any) {
            setSearchResult({ error: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-black min-h-screen text-white font-mono">
            <h1 className="text-3xl font-bold text-neural-blue mb-8">🛠️ Diagnóstico de Base de Datos</h1>

            {/* Connection Check */}
            <div className="mb-8 p-4 border border-white/20 rounded-lg">
                <h2 className="text-xl mb-4">1. Conexión y Estadísticas</h2>
                <button
                    onClick={checkDB}
                    disabled={loading}
                    className="px-4 py-2 bg-neural-blue rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Verificando...' : 'Ejecutar Diagnóstico'}
                </button>
                {status && (
                    <pre className="mt-4 p-4 bg-gray-900 rounded overflow-auto border border-gray-700">
                        {JSON.stringify(status, null, 2)}
                    </pre>
                )}
            </div>

            {/* User Search */}
            <div className="p-4 border border-white/20 rounded-lg">
                <h2 className="text-xl mb-4">2. Detector de Usuarios "Fantasma"</h2>
                <div className="flex gap-2 mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="objetivo@email.com"
                        className="flex-1 bg-black border border-gray-600 px-4 py-2 rounded"
                    />
                    <button
                        onClick={searchUser}
                        disabled={loading}
                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                        Buscar DB
                    </button>
                </div>
                {searchResult && (
                    <div className={`p-4 rounded border ${searchResult.found ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'}`}>
                        <p className="text-lg font-bold mb-2">
                            {searchResult.found ? '✅ ENCONTRADO EN LA BASE DE DATOS' : '❌ NO ENCONTRADO EN LA BASE DE DATOS'}
                        </p>
                        <pre className="text-sm">
                            {JSON.stringify(searchResult.user || searchResult, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
