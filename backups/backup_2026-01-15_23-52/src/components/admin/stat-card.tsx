'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, formatNumber, formatCurrency, formatPercentage } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'neutral';
    icon?: React.ReactNode;
    format?: 'number' | 'currency' | 'percentage';
    status?: 'healthy' | 'warning' | 'critical';
}

export function StatCard({
    title,
    value,
    change,
    trend = 'neutral',
    icon,
    format = 'number',
    status = 'healthy'
}: StatCardProps) {
    const formattedValue = typeof value === 'number'
        ? format === 'currency'
            ? formatCurrency(value)
            : format === 'percentage'
                ? formatPercentage(value)
                : formatNumber(value)
        : value;

    const statusColors = {
        healthy: 'border-emerald-500/20 bg-emerald-500/5',
        warning: 'border-amber-500/20 bg-amber-500/5',
        critical: 'border-rose-500/20 bg-rose-500/5'
    };

    const trendColors = {
        up: 'text-emerald-400',
        down: 'text-rose-400',
        neutral: 'text-platinum-dim'
    };

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

    return (
        <div className={cn(
            'relative overflow-hidden rounded-xl border p-6 transition-all hover:border-white/20',
            statusColors[status]
        )}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="text-sm font-medium text-platinum-dim">{title}</div>
                    {icon && (
                        <div className="rounded-lg bg-white/10 p-2">
                            {icon}
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className="mb-2">
                    <div className="text-3xl font-bold text-white">
                        {formattedValue}
                    </div>
                </div>

                {/* Change */}
                {change !== undefined && (
                    <div className={cn('flex items-center gap-1 text-sm font-medium', trendColors[trend])}>
                        <TrendIcon className="h-4 w-4" />
                        <span>{Math.abs(change)}%</span>
                        <span className="text-platinum-dim">vs anterior</span>
                    </div>
                )}
            </div>
        </div>
    );
}
