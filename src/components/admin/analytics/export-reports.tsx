'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type ExportFormat = 'csv' | 'json' | 'pdf';

export function ExportReports() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (format: ExportFormat) => {
        setIsExporting(true);

        try {
            // Simulate export
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success(`Reporte exportado como ${format.toUpperCase()}`);

            // In real implementation, trigger download
            // const blob = new Blob([data], { type: mimeType });
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = `report-${Date.now()}.${format}`;
            // a.click();
        } catch (error) {
            toast.error('Error al exportar reporte');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Exportar Reportes</h3>
            <p className="text-sm text-platinum-dim mb-4">
                Descarga reportes de analytics en diferentes formatos
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => handleExport('csv')}
                    disabled={isExporting}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                    📊 CSV
                </button>
                <button
                    onClick={() => handleExport('json')}
                    disabled={isExporting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                    📄 JSON
                </button>
                <button
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                    📑 PDF
                </button>
            </div>
            {isExporting && (
                <div className="mt-4 text-sm text-platinum-dim animate-pulse">
                    Generando reporte...
                </div>
            )}
        </div>
    );
}
