import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

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
        console.error('Error al leer contenido de SLA:', error);
        return { raw: '', slaRows: [] };
    }
}

export default function SupportPage() {
    const { slaRows } = getSLAContent();

    return (
        <div className="theme-light min-h-screen bg-[#F1F0E8] font-inter pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-16">
                    <span className="text-[#C9A78A] font-black text-[10px] tracking-[0.5em] uppercase mb-6 block italic leading-none font-outfit">
                        SOPORTE INSTITUCIONAL
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-[#1E1E1E] mb-6 tracking-tighter italic uppercase font-outfit leading-none">
                        Centro de Ayuda<br />& Soporte
                    </h1>
                    <p className="text-[#1E1E1E]/60 text-lg max-w-2xl font-bold italic tracking-tight leading-relaxed">
                        Estamos aquí para impulsarte. Consulta nuestros niveles de servicio (SLA) y canales de atención disponibles para estudiantes e instituciones.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content: SLA */}
                    <div className="lg:col-span-2 space-y-10">
                        <section className="bg-white p-8 rounded-[2.5rem] border border-[#1E1E1E]/5 shadow-sm">
                            <h2 className="text-2xl font-black text-[#1E1E1E] mb-8 italic uppercase font-outfit tracking-tight">Niveles de Servicio (SLA)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[#1E1E1E]/40 border-b border-[#1E1E1E]/5">
                                            <th className="py-5 px-4 text-[10px] font-black uppercase tracking-widest">Severidad</th>
                                            <th className="py-5 px-4 text-[10px] font-black uppercase tracking-widest">Descripción</th>
                                            <th className="py-5 px-4 text-[10px] font-black uppercase tracking-widest">Respuesta</th>
                                            <th className="py-5 px-4 text-[10px] font-black uppercase tracking-widest">Resolución</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#1E1E1E]/80">
                                        {slaRows.map((row, idx) => (
                                            <tr key={idx} className="border-b border-[#1E1E1E]/5 hover:bg-[#F1F0E8]/30 transition-colors">
                                                <td className="py-5 px-4 font-black text-[#1E1E1E] italic text-sm">{row[0]}</td>
                                                <td className="py-5 px-4 text-sm font-medium">{row[1]}</td>
                                                <td className="py-5 px-4 text-sm font-black text-[#C9A78A] italic">{row[2]}</td>
                                                <td className="py-5 px-4 text-sm font-medium">{row[3]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-[#1E1E1E]/5 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A78A]/5 rounded-full blur-3xl group-hover:bg-[#C9A78A]/10 transition-colors" />
                            <h2 className="text-2xl font-black text-[#1E1E1E] mb-4 italic uppercase font-outfit tracking-tight">Proceso de Escalamiento</h2>
                            <p className="text-[#1E1E1E]/60 mb-8 font-bold italic tracking-tight">
                                Si no recibe respuesta dentro de los tiempos establecidos en el SLA, su caso será escalado automáticamente al siguiente nivel de supervisión técnica.
                            </p>
                            <div className="flex items-center gap-6 p-6 bg-[#F1F0E8]/50 rounded-3xl border border-[#1E1E1E]/5">
                                <div className="w-12 h-12 rounded-2xl bg-[#1E1E1E] flex items-center justify-center text-xl shadow-lg">⚡</div>
                                <div>
                                    <h4 className="text-[#1E1E1E] font-black italic uppercase text-sm tracking-tight">Soporte Prioritario Enterprise</h4>
                                    <p className="text-xs text-[#1E1E1E]/40 font-bold italic">Disponible para instituciones con plan educativo activo.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Channels */}
                    <div className="space-y-8">
                        <div className="bg-[#1E1E1E] p-8 rounded-[2.5rem] shadow-2xl shadow-black/20 text-[#F1F0E8]">
                            <h3 className="text-xl font-black mb-8 italic uppercase font-outfit tracking-tight text-[#C9A78A]">Canales de Atención</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-[#F1F0E8]/10 flex items-center justify-center text-lg shadow-inner">🤖</div>
                                    <div>
                                        <strong className="block text-[#F1F0E8] font-black italic uppercase text-xs tracking-widest mb-1">SinapBot (IA)</strong>
                                        <span className="text-[11px] text-[#F1F0E8]/40 font-bold italic">24/7 Respuestas inmediatas</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-[#F1F0E8]/10 flex items-center justify-center text-lg shadow-inner">📧</div>
                                    <div>
                                        <strong className="block text-[#F1F0E8] font-black italic uppercase text-xs tracking-widest mb-1">Email Directo</strong>
                                        <a href={`mailto:${siteConfig.supportEmail}`} className="text-[11px] text-[#C9A78A] font-black hover:text-[#F1F0E8] transition-colors">{siteConfig.supportEmail}</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-[#F1F0E8]/10 flex items-center justify-center text-lg shadow-inner">📄</div>
                                    <div>
                                        <strong className="block text-[#F1F0E8] font-black italic uppercase text-xs tracking-widest mb-1">Gestión PQRS</strong>
                                        <span className="text-[11px] text-[#F1F0E8]/40 font-bold italic">Peticiones, Quejas y Reclamos</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-500/10 shadow-sm border-l-4 border-l-emerald-500">
                            <h3 className="text-xs font-black text-[#1E1E1E]/40 mb-4 italic uppercase tracking-[0.2em]">Estado del Sistema</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-emerald-600 font-black italic uppercase text-sm tracking-tighter">Sistemas Operativos</span>
                            </div>
                            <p className="text-[10px] text-[#1E1E1E]/40 font-bold italic">Última validación de latencia: hace 5 minutos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
