'use client';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function PerformanceMetrics() {
    const data = {
        labels: ['API Response', 'Page Load', 'DB Query', 'Cache Hit', 'Error Rate'],
        datasets: [
            {
                label: 'Esta Semana',
                data: [45, 1200, 8, 94, 0.03],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
                label: 'Semana Anterior',
                data: [52, 1350, 10, 91, 0.05],
                backgroundColor: 'rgba(156, 163, 175, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: '#e5e7eb' },
            },
            title: {
                display: true,
                text: 'Métricas de Performance',
                color: '#fff',
                font: { size: 16, weight: 'bold' as const },
            },
        },
        scales: {
            y: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            x: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
        },
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="h-[300px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
