'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AlertItemProps {
    severity: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: string;
    source: string;
}

export function AlertItem({ severity, message, timestamp, source }: AlertItemProps) {
    const severityConfig = {
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'ℹ️', color: 'text-blue-400' },
        warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: '⚠️', color: 'text-amber-400' },
        critical: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: '🚨', color: 'text-rose-400' },
    };

    const config = severityConfig[severity];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${config.bg} border ${config.border} rounded-lg p-4 mb-3`}
        >
            <div className="flex items-start gap-3">
                <span className="text-xl">{config.icon}</span>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold uppercase tracking-wider ${config.color}`}>
                            {severity}
                        </span>
                        <span className="text-xs text-platinum-dim font-mono">{timestamp}</span>
                    </div>
                    <p className="text-white text-sm mb-1">{message}</p>
                    <span className="text-xs text-platinum-dim">Source: {source}</span>
                </div>
            </div>
        </motion.div>
    );
}

export function AlertsPanel() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch('/api/admin/security/alerts');
                if (res.ok) {
                    const data = await res.json();
                    setAlerts(data.alerts);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
        // Poll every 30 seconds for "LIVE" feel
        const interval = setInterval(fetchAlerts, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Security Alerts</h3>
                <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-1 rounded-full font-bold">
                    LIVE
                </span>
            </div>

            <div className="space-y-3">
                {loading ? (
                    <div className="text-center text-platinum-dim py-8">Escaneando sistema...</div>
                ) : alerts.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-3">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <p className="text-white font-medium">Sistema Seguro</p>
                        <p className="text-sm text-platinum-dim">No hay alertas recientes</p>
                    </div>
                ) : (
                    alerts.map((alert, i) => (
                        <AlertItem key={i} {...alert} />
                    ))
                )}
            </div>
        </div>
    );
}
