'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, StopCircle } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (text: string) => void;
    onToggleRecording: () => void;
    isRecording: boolean;
}

export function ChatInterface({ messages, onSendMessage, onToggleRecording, isRecording }: ChatInterfaceProps) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.role === 'user'
                                        ? 'bg-neural-blue text-white rounded-br-none'
                                        : 'bg-white/5 border border-white/10 text-platinum rounded-bl-none backdrop-blur-md'
                                    }`}
                            >
                                <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                                <span className="text-[10px] opacity-50 mt-1 block text-right">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-deep-space/50">
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleRecording}
                        className={`p-3 rounded-full transition-all ${isRecording
                                ? 'bg-rose-500/20 text-rose-500 animate-pulse'
                                : 'bg-white/5 text-platinum hover:bg-white/10'
                            }`}
                    >
                        {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu consulta..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-platinum-dim focus:outline-none focus:border-neural-blue/50 focus:ring-1 focus:ring-neural-blue/50 transition-all"
                    />

                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-3 bg-neural-blue text-white rounded-full hover:bg-neural-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-neon-blue"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
