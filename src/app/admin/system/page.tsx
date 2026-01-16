'use client';

import { Server, Shield, Cpu, Database, Activity } from 'lucide-react';

export default function AdminSystem() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Estado del Sistema</h1>
                    <p className="text-muted">Monitor de infraestructura y servicios.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-400/10 border border-green-400/20 rounded-full text-green-400 text-xs font-bold animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        OPERATIONAL
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Server Vitals */}
                <div className="bg-surface p-6 rounded-2xl border border-white/5 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Server className="w-5 h-5 text-gold" />
                        Server Vitals
                    </h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted flex items-center gap-2"><Cpu className="w-4 h-4" /> CPU Load</span>
                                <span className="text-white">45%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[45%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted flex items-center gap-2"><Activity className="w-4 h-4" /> RAM Usage</span>
                                <span className="text-white">62%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[62%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted flex items-center gap-2"><Database className="w-4 h-4" /> Database Conn</span>
                                <span className="text-white">12/50</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[24%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Status */}
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-gold" />
                        Microservicios
                    </h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Auth Service (NextAuth)', status: 'Operational' },
                            { name: 'Database (Prisma)', status: 'Operational' },
                            { name: 'Storage (R2)', status: 'Operational' },
                            { name: 'Email Gateway', status: 'Operational' },
                            { name: 'Payment Webhooks', status: 'Listening' },
                        ].map((service, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white">{service.name}</span>
                                <span className="text-green-400 text-xs font-bold">{service.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logs Preview */}
            <div className="bg-[#0F1117] rounded-2xl border border-white/5 p-6 font-mono text-xs">
                <div className="text-gold mb-4 font-bold border-b border-white/5 pb-2">System Logs</div>
                <div className="space-y-1 text-muted">
                    <p><span className="text-blue-400">[INFO]</span> 10:45:22 - Admin login successful (admin@sinapcode.global)</p>
                    <p><span className="text-green-400">[SUCCESS]</span> 10:44:15 - Payment processed #INV-2025</p>
                    <p><span className="text-blue-400">[INFO]</span> 10:42:01 - Scheduled backup completed</p>
                    <p><span className="text-yellow-400">[WARN]</span> 10:40:00 - High latency on external API detected</p>
                </div>
            </div>
        </div>
    );
}
