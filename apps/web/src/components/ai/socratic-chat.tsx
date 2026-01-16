'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SocraticChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hola. Soy tu Tutor Socrático. No te daré la respuesta, pero te ayudaré a encontrarla. ¿En qué estás atascado hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Mock Socratic Response
        setTimeout(() => {
            const responses = [
                "Interesante enfoque. ¿Qué pasaría si intentas dividir el problema en partes más pequeñas?",
                "Esa es una buena observación. ¿Cómo se relaciona esto con lo que aprendimos en el módulo anterior?",
                "Casi lo tienes. Revisa la sintaxis de tu bucle 'for'. ¿Notas algo extraño en la condición de salida?",
                "Recuerda: El error 'undefined' suele significar que la variable no ha sido asignada. ¿Dónde la definiste?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, { role: 'ai', content: randomResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-neural-blue to-synapse-purple rounded-full flex items-center justify-center shadow-neon-blue z-50 border border-white/20"
            >
                <span className="text-2xl">🤖</span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] glass-panel rounded-2xl border border-white/20 flex flex-col shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <h3 className="font-bold text-white text-sm">SinapBot (Socrático)</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-platinum hover:text-white">✕</button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-neural-blue text-white rounded-br-none' : 'bg-white/10 text-platinum rounded-bl-none'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-none">
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full inline-block animate-bounce mr-1" />
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full inline-block animate-bounce mr-1 delay-75" />
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full inline-block animate-bounce delay-150" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Pregúntame sobre el código..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neural-blue"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition"
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
