'use client';

export interface ClickPoint {
    x: number;
    y: number;
    timestamp: number;
    path: string;
}

const STORAGE_KEY = 'sinapcode_heatmap_data';

export const HeatmapStore = {
    saveClick: (point: Omit<ClickPoint, 'timestamp'>) => {
        if (typeof window === 'undefined') return;

        const data = HeatmapStore.getAll();
        const newPoint: ClickPoint = {
            ...point,
            timestamp: Date.now()
        };

        data.push(newPoint);
        // Limitar a los últimos 1000 clics para no saturar LocalStorage
        const limitedData = data.slice(-1000);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedData));
    },

    getAll: (): ClickPoint[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEY);
        try {
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    },

    clear: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
    }
};
