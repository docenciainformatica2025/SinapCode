'use client';

import { Search, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export function UTMCampaignTable() {
    const campaigns = [
        { name: 'winter_dev_bootcamp', source: 'linkedin / cpc', clicks: '4,250', conv: 320, cost: '$12,400', cpa: '$38.75', status: 'optimal' },
        { name: 'google_search_python', source: 'google / cpc', clicks: '8,100', conv: 215, cost: '$15,200', cpa: '$70.69', status: 'warning' },
        { name: 'email_newsletter_oct', source: 'ac / email', clicks: '12,400', conv: 540, cost: '$250', cpa: '$0.46', status: 'optimal' },
        { name: 'whatsapp_community_blast', source: 'whatsapp / social', clicks: '2,100', conv: 180, cost: '$0', cpa: '$0.00', status: 'optimal' },
        { name: 'retargeting_fb_q4', source: 'facebook / cpm', clicks: '25,000', conv: 95, cost: '$4,500', cpa: '$47.36', status: 'critical' },
    ];

    return (
        <div className="glass-panel-nexus rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-xl flex flex-col h-full overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h4 className="text-xl font-bold text-white tracking-tight">Rendimiento UTM de Campañas</h4>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar campaña..."
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 w-full sm:w-64 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-x-auto -mx-8 px-8 custom-scrollbar">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
                            <th className="pb-4 pt-0 px-4">Campaña</th>
                            <th className="pb-4 pt-0 px-4 text-center">Fuente</th>
                            <th className="pb-4 pt-0 px-4 text-right">Clicks</th>
                            <th className="pb-4 pt-0 px-4 text-right">Conv.</th>
                            <th className="pb-4 pt-0 px-4 text-right">Costo</th>
                            <th className="pb-4 pt-0 px-4 text-right">CPA</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {campaigns.map((camp) => (
                            <tr key={camp.name} className="group hover:bg-white/5 transition-colors">
                                <td className="py-5 px-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                            {camp.name}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                        </span>
                                    </div>
                                </td>
                                <td className="py-5 px-4 text-center">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-slate-400 uppercase">
                                        {camp.source}
                                    </span>
                                </td>
                                <td className="py-5 px-4 text-right font-mono text-sm text-slate-300">{camp.clicks}</td>
                                <td className="py-5 px-4 text-right font-bold text-white">{camp.conv}</td>
                                <td className="py-5 px-4 text-right font-mono text-sm text-slate-300">{camp.cost}</td>
                                <td className="py-5 px-4 text-right">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-black font-mono shadow-lg ${camp.status === 'optimal' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            camp.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                'bg-red-500/10 text-red-500 border border-red-500/20'
                                        }`}>
                                        {camp.cpa}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mostrando 5 de 24 campañas</span>
                <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
