import {
    Users,
    DollarSign,
    Activity,
    TrendingUp,
    Globe,
    Server
} from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        {
            label: 'Usuarios Totales',
            value: '2.4k',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10'
        },
        {
            label: 'Ingresos Mensuales',
            value: '$12.5k',
            change: '+8.2%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-400',
            bg: 'bg-green-400/10'
        },
        {
            label: 'Blogs Publicados',
            value: '42',
            change: '+3',
            trend: 'up',
            icon: Globe,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10'
        },
        {
            label: 'System Status',
            value: '99.9%',
            change: 'Normal',
            trend: 'neutral',
            icon: Server,
            color: 'text-gold',
            bg: 'bg-gold/10'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Panel de Control</h1>
                <p className="text-muted">Bienvenido al centro de operaciones de SinapCode.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-white/10 transition shadow-soft">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${stat.trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-muted">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Sections */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gold" />
                        Actividad Reciente
                    </h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="text-white text-sm font-medium">Nuevo usuario registrado</p>
                                    <p className="text-xs text-muted mt-1">hace 5 minutos • Plan Free</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        Rendimiento del Servidor
                    </h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">CPU Usage</span>
                                <span className="text-white">45%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[45%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Memory</span>
                                <span className="text-white">62%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[62%]" />
                            </div>
                        </div>
                        <div className="bg-green-400/5 border border-green-400/20 rounded-xl p-4 mt-6">
                            <p className="text-green-400 text-sm font-bold flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Todos los sistemas operativos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
