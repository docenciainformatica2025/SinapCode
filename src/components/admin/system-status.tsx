'use client';

interface SystemStatusProps {
    label: string;
    status: 'online' | 'degraded' | 'offline';
    responseTime?: number;
}

export function SystemStatus({ label, status, responseTime }: SystemStatusProps) {
    const statusConfig = {
        online: { color: 'bg-emerald-500', text: 'Operational', pulse: true },
        degraded: { color: 'bg-amber-500', text: 'Degraded', pulse: true },
        offline: { color: 'bg-rose-500', text: 'Offline', pulse: false },
    };

    const config = statusConfig[status];

    return (
        <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${config.color}`} />
                    {config.pulse && (
                        <div className={`absolute inset-0 w-3 h-3 rounded-full ${config.color} animate-ping opacity-75`} />
                    )}
                </div>
                <span className="text-white font-medium">{label}</span>
            </div>

            <div className="flex items-center gap-4">
                {responseTime && (
                    <span className="text-xs text-platinum-dim font-mono">{responseTime}ms</span>
                )}
                <span className={`text-xs font-bold ${status === 'online' ? 'text-emerald-400' : status === 'degraded' ? 'text-amber-400' : 'text-rose-400'}`}>
                    {config.text}
                </span>
            </div>
        </div>
    );
}
