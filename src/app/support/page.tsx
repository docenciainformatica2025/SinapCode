import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Helper simple para parsear la tabla del markdown (muy básico, para este caso específico)
function parseMarkdownTable(text: string) {
    const lines = text.split('\n').filter(l => l.trim().startsWith('|'));
    if (lines.length < 3) return [];

    // Ignorar la línea de separador |---|---|
    const contentLines = lines.filter(l => !l.includes('---'));

    return contentLines.map(line => {
        const columns = line.split('|').filter(c => c.trim() !== '').map(c => c.trim().replace(/\*\*/g, ''));
        return columns;
    });
}

function getSLAContent() {
    try {
        // Ajustar la ruta relativa desde la raíz del proyecto (apps/web)
        // process.cwd() en Vercel es la raíz del proyecto
        const filePath = path.join(process.cwd(), 'src/content/support/sla_support.md');
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Extraer secciones básicas
        const slaTableMatch = fileContent.match(/\| Severidad[\s\S]*?\| Baja.*\|/);
        const slaRows = slaTableMatch ? parseMarkdownTable(slaTableMatch[0]) : [];

        return {
            raw: fileContent,
            slaRows
        };
    } catch (error) {
        console.error('Error reading SLA content:', error);
        return { raw: '', slaRows: [] };
    }
}

export default function SupportPage() {
    const { slaRows } = getSLAContent();

    return (
        <div className="min-h-screen bg-deep-space">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-neural-blue hover:text-white transition text-sm mb-4 inline-block">
                        ← Volver al inicio
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Centro de Ayuda y Soporte
                    </h1>
                    <p className="text-platinum-dim text-lg max-w-2xl">
                        Estamos aquí para ayudarte. Consulta nuestros niveles de servicio (SLA) y canales de atención disponibles.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content: SLA */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6">Niveles de Servicio (SLA)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-platinum-dim border-b border-white/10">
                                            <th className="py-4 px-4 font-semibold">Severidad</th>
                                            <th className="py-4 px-4 font-semibold">Descripción</th>
                                            <th className="py-4 px-4 font-semibold">Respuesta</th>
                                            <th className="py-4 px-4 font-semibold">Resolución</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-platinum-dim">
                                        {slaRows.map((row, idx) => (
                                            <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                                                <td className="py-4 px-4 font-medium text-white">{row[0]}</td>
                                                <td className="py-4 px-4">{row[1]}</td>
                                                <td className="py-4 px-4 text-neural-blue">{row[2]}</td>
                                                <td className="py-4 px-4">{row[3]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">Proceso de Escalamiento</h2>
                            <p className="text-platinum-dim mb-4">
                                Si no recibe respuesta dentro de los tiempos establecidos en el SLA, su caso será escalado automáticamente al siguiente nivel de supervisión.
                            </p>
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <h4 className="text-white font-bold">Soporte Prioritario Enterprise</h4>
                                    <p className="text-sm text-platinum-dim">Disponible para instituciones con plan educativo activo.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Channels */}
                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-neural-blue/10 to-transparent">
                            <h3 className="text-xl font-bold text-white mb-4">Canales de Atención</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">🤖</div>
                                    <div>
                                        <strong className="block text-white">SinapBot (IA)</strong>
                                        <span className="text-sm text-platinum-dim">24/7 Respuestas inmediatas</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">📧</div>
                                    <div>
                                        <strong className="block text-white">Email</strong>
                                        <a href="mailto:soporte@sinapcode.edu.co" className="text-sm text-neural-blue hover:underline">soporte@sinapcode.edu.co</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">📄</div>
                                    <div>
                                        <strong className="block text-white">PQRS</strong>
                                        <span className="text-sm text-platinum-dim">Peticiones, Quejas y Reclamos</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-yellow-500/20">
                            <h3 className="text-lg font-bold text-white mb-2">⚠ Estado del Sistema</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-emerald-500 font-medium">Todos los sistemas operativos</span>
                            </div>
                            <p className="text-xs text-platinum-dim">Última actualización: hace 5 minutos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
