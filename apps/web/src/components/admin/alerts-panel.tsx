'use client';

import { useState } from 'react';
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
    const [alerts] = useState([
        {
            severity: 'critical' as const,
            message: '3 failed login attempts from IP 192.168.1.100',
            timestamp: '2 min ago',
            source: 'Auth Service',
        },
        {
            severity: 'warning' as const,
            message: 'Database query time exceeded 500ms threshold',
            timestamp: '15 min ago',
            source: 'PostgreSQL',
        },
        {
            severity: 'info' as const,
            message: 'System backup completed successfully',
            timestamp: '1 hour ago',
            source: 'Backup Service',
        },
    ]);

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Security Alerts</h3>
                <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-1 rounded-full font-bold">
                    LIVE
                </span>
            </div>

            <div className="space-y-3">
                {alerts.map((alert, i) => (
                    <AlertItem key={i} {...alert} />
                ))}
            </div>
        </div>
    );
}
