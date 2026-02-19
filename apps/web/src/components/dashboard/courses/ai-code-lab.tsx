'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal,
    Bot,
    Code2,
    Play,
    CheckCircle2,
    Bug,
    Info,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    RefreshCcw,
    Zap,
    Send,
    BrainCircuit,
    Sparkles
} from 'lucide-react';

interface AICodeLabProps {
    onComplete?: () => void;
}

type PedagogicalState = 'INIT' | 'IDLE' | 'ANALYZING' | 'ERROR_DETECTED' | 'HINT_GIVEN' | 'SOLUTION_OFFERED' | 'SUCCESS';

export function AICodeLab({ onComplete }: AICodeLabProps) {
    const [activeTab, setActiveTab] = useState<'instructions' | 'documentation'>('instructions');
    const [isExecuting, setIsExecuting] = useState(false);
    const [pedagogicalState, setPedagogicalState] = useState<PedagogicalState>('INIT');
    const [errorCount, setErrorCount] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState<string[]>(['user@sinapcode:~/workspace$ python3 activation.py']);
    const [code, setCode] = useState(`import numpy as np

# TODO: Implement activation function
def relu(x):
    """
    Compute the ReLU of x
    """
    
    # Your code here
    s = np.max(0, x) # <--- Estudiante utiliza max en lugar de maximum
    
    return s

# Test the function
x = np.array([1, -2, 3, -5])
print("relu(x) = " + str(relu(x)))`);

    const socraticPrompts = {
        ANALYZING: [
            "Analizando la estructura de tu red...",
            "Verificando dimensiones del tensor...",
            "NEXUS sincronizando con tu lógica...",
            "Escaneando flujo de gradientes..."
        ],
        HINTS: [
            "Interesante. ¿Has notado la diferencia entre `np.max` y `np.maximum` en operaciones de arrays?",
            "El error sugiere un problema de tipos. Recuerda que ReLU opera sobre cada elemento por separado.",
            "Protocolo detectado: `np.max` colapsa el array, mientras que necesitamos una máscara elemento a elemento."
        ],
        NUDGES: [
            "¿Qué pasaría si usaras la función que compara dos arrays elemento a elemento?",
            "Revisa la documentación de NumPy: `maximum` vs `max`. Ahí está la llave.",
            "Casi lo tienes. Solo cambia la forma en que calculas el máximo."
        ]
    };

    const [currentPrompt, setCurrentPrompt] = useState(socraticPrompts.ANALYZING[0]);

    const runCode = () => {
        setIsExecuting(true);
        setPedagogicalState('ANALYZING');

        // Randomize analyzing prompt
        setCurrentPrompt(socraticPrompts.ANALYZING[Math.floor(Math.random() * socraticPrompts.ANALYZING.length)]);

        setTimeout(() => {
            setIsExecuting(false);
            if (code.includes('np.maximum')) {
                setPedagogicalState('SUCCESS');
                setTerminalOutput(prev => [...prev, 'user@sinapcode:~/workspace$ python3 activation.py', 'relu(x) = [1 0 3 0]', '\u001b[32m✔ Protocolo Exitoso. Módulo de Activación validado.\u001b[0m']);
                if (onComplete) setTimeout(onComplete, 2000);
            } else {
                setPedagogicalState('ERROR_DETECTED');
                setErrorCount(prev => prev + 1);
                setTerminalOutput(prev => [...prev, 'Running protocol...', '\u001b[31mTraceback (most recent call last):\u001b[0m', '  File "activation.py", line 14, in <module>', '    s = np.max(0, x)', '\u001b[1;31mTypeError:\u001b[0m >= not supported between instances of "int" and "list"']);

                // Tiered Hinting Logic
                if (errorCount >= 2) {
                    setPedagogicalState('SOLUTION_OFFERED');
                } else {
                    setPedagogicalState('HINT_GIVEN');
                    setCurrentPrompt(socraticPrompts.HINTS[errorCount % socraticPrompts.HINTS.length]);
                }
            }
        }, 1200);
    };

    const fixCode = () => {
        setCode(prev => prev.replace('np.max(0, x)', 'np.maximum(0, x)'));
        setPedagogicalState('IDLE');
    };

    return (
        <div className="flex h-[800px] w-full bg-deep-space border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">

            {/* Left Panel: Instructions */}
            <aside className="w-[400px] border-r border-white/5 flex flex-col bg-deep-space/50 backdrop-blur-xl">
                <div className="flex p-4 gap-6 border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('instructions')}
                        className={`text-[10px] font-black uppercase tracking-widest pb-2 transition-all ${activeTab === 'instructions' ? 'text-primary border-b-2 border-primary' : 'text-platinum-dim hover:text-white'}`}
                    >
                        Instrucciones
                    </button>
                    <button
                        onClick={() => setActiveTab('documentation')}
                        className={`text-[10px] font-black uppercase tracking-widest pb-2 transition-all ${activeTab === 'documentation' ? 'text-primary border-b-2 border-primary' : 'text-platinum-dim hover:text-white'}`}
                    >
                        Documentación
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <h2 className="text-2xl font-black italic tracking-tighter text-white mb-6 uppercase">Implementar_ <span className="text-primary underline decoration-2 underline-offset-4">ReLU</span></h2>

                    <div className="prose prose-invert prose-sm max-w-none space-y-4">
                        <p className="text-platinum-dim font-medium leading-relaxed">
                            En este laboratorio, implementaremos la función de activación <strong>Rectified Linear Unit (ReLU)</strong>.
                        </p>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center font-mono text-sm text-primary">
                            f(x) = max(0, x)
                        </div>

                        <h3 className="text-sm font-black text-white uppercase tracking-widest pt-4">Consigna_</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-platinum-dim text-xs">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${code.includes('import numpy as np') ? 'text-emerald-400' : 'text-white/20'}`} />
                                <span>Importar la librería NumPy.</span>
                            </li>
                            <li className="flex gap-3 text-platinum-dim text-xs">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${code.includes('def relu(x):') ? 'text-emerald-400' : 'text-white/20'}`} />
                                <span>Definir `relu(x)`.</span>
                            </li>
                            <li className="flex gap-3 text-platinum-dim text-xs">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${code.includes('np.maximum') ? 'text-emerald-400' : 'text-white/20'}`} />
                                <span>Retornar el máximo elemento a elemento.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Right Panel: Editor & Terminal */}
            <main className="flex-1 flex flex-col relative min-w-0">

                {/* Editor Header */}
                <div className="h-12 bg-black/40 border-b border-white/5 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 h-full">
                        <div className="h-full flex items-center gap-2 px-4 bg-primary/10 border-t-2 border-primary text-white text-[10px] font-black uppercase tracking-widest cursor-default">
                            <Code2 className="w-3.5 h-3.5 text-primary" />
                            activation.py
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={runCode}
                            disabled={isExecuting}
                            className="flex items-center gap-2 bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-neon-blue"
                        >
                            {isExecuting ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                            Ejecutar Protocolo
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-8 font-mono text-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/10 flex flex-col items-center pt-8 text-[10px] text-platinum-dim/20 space-y-1">
                        {Array.from({ length: 20 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                    </div>
                    <div className="pl-8 h-full overflow-auto outline-none" contentEditable spellCheck={false} onInput={(e: any) => setCode(e.currentTarget.innerText)}>
                        <pre className="text-neural-blue leading-relaxed whitespace-pre-wrap">
                            {code}
                        </pre>
                    </div>

                    {/* NEXUS AI Tutor Overlay - Reformulated */}
                    <AnimatePresence>
                        {(isExecuting || pedagogicalState !== 'INIT') && pedagogicalState !== 'SUCCESS' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="absolute bottom-8 right-8 w-96 bg-background-dark/95 backdrop-blur-xl border border-primary/30 rounded-[2rem] shadow-3xl overflow-hidden z-20"
                            >
                                <div className="p-4 bg-primary/10 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <BrainCircuit className="w-5 h-5 text-primary animate-pulse" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Protocolo Socrático V4</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[8px] font-black text-emerald-400 uppercase">Sincronizado</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary">
                                            <Bot className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-platinum leading-relaxed font-medium">
                                                {pedagogicalState === 'ANALYZING' ? currentPrompt :
                                                    pedagogicalState === 'HINT_GIVEN' ? currentPrompt :
                                                        pedagogicalState === 'SOLUTION_OFFERED' ? "Parece que te has bloqueado. He preparado una explicación detallada del error de tipos en NumPy y la corrección sugerida." :
                                                            "Escaneando espacio de trabajo... ¿Listo para validar tu lógica?"}
                                            </p>
                                        </div>
                                    </div>

                                    {pedagogicalState === 'SOLUTION_OFFERED' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-2"
                                        >
                                            <p className="text-[10px] font-medium text-platinum-dim italic mb-4">
                                                "El método `np.max` espera un solo array, mientras que `np.maximum` compara dos. Usar `np.maximum(0, x)` crea la máscara que buscas."
                                            </p>
                                            <button
                                                onClick={fixCode}
                                                className="w-full py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-neon-blue"
                                            >
                                                Aplicar & Aprender
                                            </button>
                                        </motion.div>
                                    )}

                                    {pedagogicalState === 'HINT_GIVEN' && (
                                        <div className="flex gap-2">
                                            <button className="flex-1 py-2 bg-white/5 border border-white/10 text-white text-[8px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                                                Dime más...
                                            </button>
                                            <button className="flex-1 py-1 bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest rounded-xl">
                                                Entendido
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Success Overlay */}
                    <AnimatePresence>
                        {pedagogicalState === 'SUCCESS' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px] z-30 flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="bg-background-dark border-2 border-emerald-400 p-12 rounded-[3.5rem] text-center shadow-3xl"
                                >
                                    <div className="w-20 h-20 bg-emerald-400 rounded-3xl flex items-center justify-center text-black mx-auto mb-6 shadow-glow-emerald">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">Protocolo_ <span className="text-emerald-400">Validado</span></h3>
                                    <p className="text-platinum-dim text-sm font-medium">Has dominado la implementación de ReLU. <br />Sincronizando progreso con tu Skill Tree.</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Terminal */}
                <div className="h-64 bg-terminal-bg border-t border-white/5 flex flex-col">
                    <div className="h-8 bg-black/40 border-b border-white/5 flex items-center justify-between px-6">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-platinum-dim" />
                            <span className="text-[9px] font-black text-platinum-dim uppercase tracking-widest font-display">Log_Consola_</span>
                        </div>
                    </div>
                    <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto custom-scrollbar">
                        {terminalOutput.map((line, i) => (
                            <div key={i} className="mb-0.5" dangerouslySetInnerHTML={{ __html: line }} />
                        ))}
                        <div className="w-1.5 h-4 bg-primary/40 animate-pulse inline-block align-middle ml-1" />
                    </div>
                </div>

            </main>

        </div>
    );
}
