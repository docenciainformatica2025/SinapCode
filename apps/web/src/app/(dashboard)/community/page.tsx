'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Rocket,
    Users,
    Users2,
    GraduationCap,
    Settings,
    Code2,
    Image as ImageIcon,
    Link2 as LinkIcon,
    Send,
    Zap,
    MessageCircle,
    GitFork,
    Share2,
    MoreHorizontal,
    Sparkles,
    ArrowUp,
    Circle
} from 'lucide-react';

// --- MOCK DATA ---
const POSTS = [
    {
        id: 1,
        author: 'Sarah Jenkins',
        handle: '@sarahcodes',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDejUY-v3-5ZM4bSu-DyF2LZs-NBRfcvImrDCjEjPs5fSwCeNVsJSFSpUy2W7se6XsqjL8F9o1HxTgqULcaDRo12Wd79-Ay6eIpSB3089Qz-L8YNzJOZS1WtKfBCPWBzeVrAReqDTkV2f3Ws9IrbLBGPFD62aqT87OIQsc5yRzydapSUiyam-F27AnNK68G_W0bWsvLluVHDNXQchywKCzvBwsuG1BFaDauWv8Iz3Tx2Kbem0nBgSzbL7idezxSuwkFl5ybm5dROVO7',
        time: 'hace 2h',
        content: '¡Acabo de desplegar mi primer pipeline #RAG usando LangChain! La precisión de recuperación mejoró un 40% después de ajustar el tamaño de los fragmentos. Echa un vistazo a la implementación abajo. 👇',
        code: `from langchain.chains import RetrievalQA\nfrom langchain.llms import OpenAI\n\n# Initialize the chain\nqa_chain = RetrievalQA.from_chain_type(\n  llm=OpenAI(),\n  chain_type="stuff",\n  retriever=vectorstore.as_retriever()\n)`,
        tags: ['#LangChain', '#Python', '#AI'],
        stats: { bolts: 248, comments: 12 },
        ringColor: 'ring-secondary/50'
    },
    {
        id: 2,
        author: 'Marcus Davila',
        handle: '@marcus_ai',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmfOOhFiYlN3H84SagNfVMcUshQgQcnDDjh3UaTAMaN9plvKdVjm_fp2mX5s6KmGS2nCmokVgkgvqnhqU0pNp9hqWWtoNNXXxjfkUa-0DHUodgbIV9R2V7U-kVpx7mruxu0OcexjgCByIepI_jCq-unTtFFjOMOCWYR3pIiP4SQTLjv9nbMMLGYV0CXU3Kc7B2Yuf2CzF-tgxl4Yesqn7eeqyMwHLjSB5d703CB8Q4NRCX0G41cadjKQXrOkGHQodVMX4ffaL9_UgM',
        time: 'hace 5h',
        content: 'Trabajando en un modelo de Visión Artificial para la navegación de drones en tiempo real. ¡El sistema para evitar obstáculos por fin es fiable! 🚁 Busco colaboradores para la parte de la UI.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1cFM1n_SUckP-b67xWhJRlRporm7HCiZizyyqDgEFblaDl1LcsjhTK9lPebpcWWnCadK5TJH65NBf7Dhkb8VcSbJLcYlPhXT7rNgFYR1HsfUVv0htEwmStFwehjS1_9nSmKfosXzo4qtE_D4s3cL_ZtWI0BmqXl2fZ6Hy_6o2H19fakrslW0yMEk38WfM3cxktSQgQS6J8pDi3m1TAnIT-Tiqx3t90mPbhN0VYDLKFJC-VoGJnEfvAN9fhXlHxxdiRz-RrbdUipfL',
        tags: ['#ComputerVision', '#YOLOv8'],
        stats: { bolts: 842, comments: 45 },
        ringColor: 'ring-primary/50'
    }
];

export default function CommunityPage() {
    return (
        <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#102222] text-slate-200 font-sans selection:bg-[#0df2f2] selection:text-[#102222]">
            {/* LEFT SIDEBAR */}
            <aside className="hidden lg:flex flex-col w-72 h-full bg-[#162e2e]/60 backdrop-blur-xl border-r border-[#0df2f2]/15 p-8 justify-between shrink-0 z-20 shadow-2xl">
                <div>
                    {/* Brand */}
                    <div className="flex items-center gap-3 mb-10 px-2 italic">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0df2f2] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_20px_rgba(13,242,242,0.3)]">
                            <Code2 className="text-[#102222] text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-white">Sinap<span className="text-[#0df2f2]">CODE</span></h1>
                            <p className="text-[9px] text-[#0df2f2] font-black tracking-[0.3em] uppercase">Centro de Constructores_</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-3">
                        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] bg-[#0df2f2]/10 border border-[#0df2f2]/20 text-[#0df2f2] font-black uppercase tracking-widest text-[10px] transition-all shadow-[0_0_15px_rgba(13,242,242,0.15)] italic">
                            <LayoutDashboard className="w-4 h-4" />
                            Feed Global
                        </button>
                        {[
                            { icon: Rocket, label: 'Proyectos' },
                            { icon: Users, label: 'Buscar Partner' },
                            { icon: Users2, label: 'Escuadrones' },
                            { icon: GraduationCap, label: 'Mi Aprendizaje' }
                        ].map((item) => (
                            <button key={item.label} className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] hover:bg-white/5 text-slate-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] italic">
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* User Mini Profile */}
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-[#0df2f2]/30 transition-all group">
                    <div className="relative">
                        <img className="w-11 h-11 rounded-full object-cover border-2 border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLma4Tw2O2EQ_N1LGDtawpBkYQ2MXKovzlg0pBiIC4vkm3a6EtQJ-ewigkhqR7eEzwuZlUruuobp4Qb0E-9Xx4o4AyUa6BmDWqrVmuozFwhhBeIfhv-Gy21kHdnoj2oILdGxMxqaYv_IBM9gXY75_IghTXT-M3p5aDhR-cKLVwxPPGc9N4x3YmtNnJMtUa7olugyPbklg7nMNnfpXf0qrVp1sO99rofeBok-KPY1bcy3PplDFt7zjecXTcAKnxapmJY0oqpvGJKC1l" alt="User" />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#102222] rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white truncate italic">Alex Chen</p>
                        <p className="text-[9px] text-[#0df2f2] font-black uppercase tracking-widest truncate">Arq. Lvl 4</p>
                    </div>
                    <Settings className="text-slate-500 w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
            </aside>

            {/* CENTER FEED */}
            <main className="flex-1 h-full overflow-y-auto scroll-smooth bg-gradient-to-b from-[#102222] to-[#0a1515] p-8 scrollbar-hide">
                <div className="max-w-3xl mx-auto space-y-8 pb-20">

                    {/* Create Post Widget */}
                    <div className="bg-[#162e2e]/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                        <div className="flex gap-6 mb-6">
                            <img className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0df2f2]/20 shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABa3rTLhuPp89dElUYd43z_83lXLCvc20L3JMVVTTk9GQ355LmY4qQRTHowaiDzz8eikvSK-G_jnMPM4yzBaqjYZo-qe7JNSPwkVwgvt4F1h7-LhWa96L7HdbfG9q9wBiBsO-xFsWXlAV4kmJauBCIp6W68mPL--I_UpXM0KHkcMxcHSPwFHVE3jDJW-Ewr_H_L-dMb0AAXvWhLylESDRqQRmr89ll-5NZonvID87rjL-Mb2FouNWilB_Na0yTM67nYT4icXT-ph_g" alt="Me" />
                            <div className="flex-1">
                                <textarea className="w-full bg-black/30 text-white placeholder-slate-600 border border-white/5 rounded-2xl p-6 focus:ring-2 focus:ring-[#0df2f2]/50 focus:border-transparent transition-all resize-none h-32 font-medium text-sm leading-relaxed" placeholder="Comparte tu última creación, un código o pide feedback..."></textarea>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pl-20">
                            <div className="flex gap-4">
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-[#0df2f2]/60 hover:text-[#0df2f2] transition-all group" title="Añadir Código">
                                    <Code2 className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-[#8b5cf6]/60 hover:text-[#8b5cf6] transition-all" title="Añadir Imagen">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-pink-400/60 hover:text-pink-400 transition-all" title="Añadir Enlace">
                                    <LinkIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="bg-[#0df2f2] hover:bg-[#0bcbcb] text-[#102222] font-black py-3 px-8 rounded-2xl transition-all shadow-[0_10px_20px_rgba(13,242,242,0.3)] hover:translate-y-[-2px] active:translate-y-[0px] flex items-center gap-3 italic uppercase tracking-widest text-xs">
                                Desplegar Post
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Feed Tabs */}
                    <div className="flex items-center justify-between font-black uppercase tracking-[0.2em] text-[10px] px-4 italic">
                        <span className="text-slate-500">Creaciones de la Comunidad_</span>
                        <div className="flex items-center gap-4">
                            <button className="text-[#0df2f2] border-b-2 border-[#0df2f2] pb-1">Más nuevos</button>
                            <button className="text-slate-500 hover:text-white transition-colors">Más valorados</button>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="space-y-8">
                        {POSTS.map((post) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#162e2e]/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#0df2f2]/20 transition-all duration-500 group shadow-xl"
                            >
                                <div className="p-10">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <img className={`w-12 h-12 rounded-2xl object-cover border-2 ring-4 ring-white/5 ${post.ringColor}`} src={post.avatar} alt={post.author} />
                                            <div>
                                                <h3 className="font-black text-white group-hover:text-[#0df2f2] transition-colors italic uppercase tracking-tight">{post.author}</h3>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{post.handle} • {post.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-600 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                                    </div>

                                    {/* Content */}
                                    <div className="mb-6 space-y-6">
                                        <p className="text-slate-300 leading-relaxed font-medium">
                                            {post.content}
                                        </p>

                                        {post.code && (
                                            <div className="bg-[#050a0a] rounded-3xl p-6 border border-white/5 font-mono text-[12px] leading-relaxed relative group/code overflow-hidden">
                                                <div className="flex gap-2 mb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                                </div>
                                                <pre className="text-slate-400">
                                                    <code>{post.code}</code>
                                                </pre>
                                                <div className="absolute top-4 right-6 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                                    <span className="text-[9px] bg-white/5 px-2 py-1 rounded text-slate-500 font-sans font-black uppercase tracking-widest">Python 3.10</span>
                                                </div>
                                            </div>
                                        )}

                                        {post.image && (
                                            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group/img cursor-pointer">
                                                <img className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-[2s]" src={post.image} alt="Project" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#102222]/90 via-transparent to-transparent flex items-end p-8">
                                                    <span className="px-4 py-2 bg-red-500/80 text-white text-[9px] font-black tracking-[0.2em] rounded-xl flex items-center gap-3 backdrop-blur-md shadow-2xl uppercase italic">
                                                        <Circle className="w-2 h-2 animate-pulse fill-current" /> DEMO EN VIVO_
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-3">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-400 text-[9px] font-black uppercase tracking-widest italic hover:bg-[#0df2f2]/10 hover:text-[#0df2f2] hover:border-[#0df2f2]/20 transition-all cursor-pointer">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                        <div className="flex items-center gap-8">
                                            <button className="flex items-center gap-3 text-slate-500 hover:text-[#0df2f2] transition-all group/btn">
                                                <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-[#0df2f2]/20 group-hover/btn:shadow-[0_0_15px_rgba(13,242,242,0.2)] transition-all">
                                                    <Zap className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                                                </div>
                                                <span className="text-xs font-black italic">{post.stats.bolts}</span>
                                            </button>
                                            <button className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group/btn">
                                                <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-white/10 transition-all">
                                                    <MessageCircle className="w-5 h-5" />
                                                </div>
                                                <span className="text-xs font-black italic">{post.stats.comments}</span>
                                            </button>
                                            <button className="flex items-center gap-3 text-slate-500 hover:text-[#8b5cf6] transition-all group/btn">
                                                <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-[#8b5cf6]/20 transition-all">
                                                    <GitFork className="w-5 h-5" />
                                                </div>
                                                <span className="text-xs font-black italic uppercase tracking-widest">Fork_</span>
                                            </button>
                                        </div>
                                        <button className="p-2.5 rounded-2xl hover:bg-white/5 text-slate-600 hover:text-white transition-all">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="hidden xl:flex flex-col w-80 h-full bg-[#162e2e]/60 backdrop-blur-xl border-l border-[#0df2f2]/15 p-8 overflow-y-auto shrink-0 z-20 space-y-10 scrollbar-hide shadow-2xl">

                {/* AI Matchmaker Widget */}
                <div className="relative overflow-hidden rounded-[2rem] border border-[#0df2f2]/30 group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0df2f2]/10 to-[#8b5cf6]/10 z-0"></div>
                    <div className="relative z-10 p-6">
                        <div className="flex items-center gap-3 mb-4 italic">
                            <Sparkles className="text-[#0df2f2] w-4 h-4 animate-pulse" />
                            <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em]">Matchmaker AI_</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-6 leading-relaxed font-medium">
                            Basado en tus habilidades de Python, deberías conocer a <span className="text-white font-black underline decoration-[#0df2f2]/50 decoration-2">Elena R.</span> Necesita un dev backend para su proyecto de NLP.
                        </p>
                        <div className="flex items-center gap-4 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                            <img className="w-12 h-12 rounded-xl object-cover border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC45ZOdWkk6MFM8YLPoaQ2Qj77YOTodI5AOMs2sqX3xjX7FlzUtFJl068WKI7bU7eqZwJqHTU_V9xEJ33O1sFfHJna8ZP-3G1gpVqB_7Bh3Dgy_S4g2YgK_h2H2joGUs53q1OwHPSPQXrM5yrC2mXhLzDXlO5NZPO-iIrexz2EBjWE3ybls29hRdH3EkkNi2FutjJoLXaBe5RkvPoAcYbFNj0eTNU05sublTe1XVi8PABYCB8m7anhX3Ig-hpFkkublZY8oEaqAO0A5" alt="Match" />
                            <div>
                                <p className="text-xs font-black text-white italic">Elena R.</p>
                                <p className="text-[9px] text-[#8b5cf6] font-black uppercase tracking-widest">Investigadora NLP_</p>
                            </div>
                        </div>
                        <button className="w-full py-3.5 bg-[#0df2f2]/10 hover:bg-[#0df2f2] text-[#0df2f2] hover:text-[#102222] font-black rounded-2xl border border-[#0df2f2]/30 hover:border-transparent transition-all text-[10px] uppercase tracking-[0.2em] italic">
                            Conectar Ahora_
                        </button>
                    </div>
                </div>

                {/* Top Builders */}
                <div>
                    <div className="flex items-center justify-between mb-6 italic">
                        <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px]">Top Constructores_</h3>
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Semanal</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { rank: 1, name: 'David Kim', rep: '12.5k', projects: 4, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYw0Vdok5ou2RmX_oAf8t-j5SBftjkK3sHen_qIzT_2_c2a2RF4QEMqlT4-b6cGrif0ybaxV2o6ZasClQQNH-kzTU0-gOth4zqnss8TWIbORmkMfea3YaoqdQa-3SI7CIfRVjNWu0FQyoV64y3nTBYEQr0Ycg3Fz5cscL98I4bw419n-PLM6MjwufP4OkY3sDfYgexaGbpgR2OV_IYgJhgmide7mSeEKfYiy3VoBvoVI6ZT54YHWOCMzhwNTjt5X1HAqZ5K8EcF8H8', master: true },
                            { rank: 2, name: 'Priya Patel', rep: '10.2k', projects: 2, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTNPgLA0Rz7u4g0-wHxB38je7rAsatcE5BMOJcN4LribEtgkSiuBj1hERs8vEKl6rZSnokqElSp1nU-3nc6YDKBhppnA9cpAyRXytaas_LgOibc2zhpqnjaJ-N-YDXrC4ZNaWpf95-HAThR1LMncvHebw8FYI3gKwEkL6mNsQTfIzDt7cQQQSw9nQ6j7ymsy_S6yEcvFkWpvbMIz24Q_RUl4Qj5iiO_wbD-AvB9JuXrm8ufsxdDGnxKR5F_I9DVct2eqtrjIPGtr2' },
                            { rank: 3, name: 'Tom Wilson', rep: '9.8k', projects: 6, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3TOgTQU7Zw_rVKJnmJZqz6f6PURhIGAO7aR7kZP9wYRhjJkSNc0OQLTDrsqg13JsOA_hnZMJZwEH1kk8TfTpcMuDHsYx-NMZh4nBNOsviLEBRzwzFXEChCaFQbAVHxkh-v53evVKnvRJb84os5r41JLLpTStZb-dHyqz_QEjEYmMs4nCxrmmWSXZlu1-q6P-jURgleJBEOEY335_gGzVkG-ZZV0c2m41eQGiA5c9iw0CS-rXVu7EItRs4DS4a8RMPiu4_MM4PPPIh' }
                        ].map((user) => (
                            <div key={user.name} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
                                <div className={`font-black text-lg w-5 text-center italic ${user.rank === 1 ? 'text-yellow-400' : 'text-slate-500'}`}>{user.rank}</div>
                                <div className="relative">
                                    <img className={`w-11 h-11 rounded-full object-cover border-2 transition-all ${user.rank === 1 ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]' : 'border-white/10 group-hover:border-[#0df2f2]/30'}`} src={user.avatar} alt={user.name} />
                                    {user.master && <span className="absolute -top-1 -right-1 material-icons-round text-yellow-400 text-xs shadow-2xl">workspace_premium</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-black text-white truncate italic uppercase tracking-tight">{user.name}</p>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{user.rep} Rep • {user.projects} Creaciones</p>
                                </div>
                                {user.rank === 1 && <ArrowUp className="text-[#0df2f2] w-4 h-4 animate-bounce" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Tech */}
                <div>
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-6 italic">Tech en Tendencia_</h3>
                    <div className="flex flex-wrap gap-3">
                        {['#GenerativeAI', '#Transformers', '#Rust', '#DataScience', '#Web3'].map(tag => (
                            <button key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#0df2f2]/50 hover:text-[#0df2f2] text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all italic">
                                {tag}
                                {tag === '#Rust' && <span className="ml-2">🔥</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ad / Promo */}
                <div className="mt-auto p-8 rounded-[2rem] bg-gradient-to-br from-[#8b5cf6]/20 to-[#0df2f2]/20 border border-white/10 text-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <p className="text-[9px] font-black text-white uppercase tracking-[0.3em] mb-3 italic opacity-60">Próximo Hackathon_</p>
                    <h4 className="text-xl font-black text-white mb-6 italic tracking-tighter leading-tight">IA para el<br /><span className="bg-gradient-to-r from-[#0df2f2] to-[#8b5cf6] bg-clip-text text-transparent">BIEN_2026</span></h4>
                    <button className="w-full py-3 bg-white text-[#102222] text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#0df2f2] transition-colors italic shadow-2xl">Registrarse Ahora_</button>
                </div>
            </aside>
        </div>
    );
}
