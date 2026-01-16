'use client';

export function KPIGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
                title="Total Revenue (YTD)"
                value="$1,245,300"
                change="+12.5%"
                chartColor="text-emerald-400"
                borderColor="border-emerald-500/30"
                glowColor="shadow-neon-green"
            />
            <KPICard
                title="Avg. Revenue Per User"
                value="$48.50"
                change="+5.2%"
                chartColor="text-blue-400"
                borderColor="border-blue-500/30"
                glowColor="shadow-neon-blue"
            />
            <KPICard
                title="Churn Rate"
                value="2.1%"
                change="-0.4%"
                chartColor="text-purple-400"
                borderColor="border-purple-500/30"
                glowColor="shadow-neon-purple"
                isInverse // Lower is better
            />
        </div>
    );
}

function KPICard({ title, value, change, chartColor, borderColor, glowColor, isInverse }: any) {
    return (
        <div className={`glass-panel p-6 rounded-2xl border ${borderColor} ${glowColor} relative overflow-hidden group`}>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition"></div>

            <h4 className="text-platinum-dim text-sm font-bold uppercase tracking-wider mb-2">{title}</h4>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-white">{value}</span>
                <span className={`text-sm font-bold mb-1 ${isInverse ? 'text-emerald-400' : chartColor}`}>
                    {change}
                </span>
            </div>
        </div>
    )
}
