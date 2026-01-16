'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface UsageData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

export function UsageChart() {
    const data: UsageData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
            {
                label: 'Usuarios Activos',
                data: [1200, 1900, 1500, 2100, 1800, 900, 600],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
            {
                label: 'Nuevos Registros',
                data: [150, 230, 180, 290, 210, 120, 80],
                borderColor: 'rgb(168, 85, 247)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#e5e7eb',
                },
            },
            title: {
                display: true,
                text: 'Uso de la Plataforma (Última Semana)',
                color: '#fff',
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
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
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
