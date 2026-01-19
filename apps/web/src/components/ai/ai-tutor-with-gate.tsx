'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { RegistrationGate } from '@/components/gates/registration-gate';

interface AITutorWithGateProps {
    courseId: string;
}

export function AITutorWithGate({ courseId }: AITutorWithGateProps) {
    const { isGuest, user } = useAuth();
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);
    const [input, setInput] = useState('');
    const [showGate, setShowGate] = useState(false);

    const MAX_QUESTIONS_GUEST = 3;
    const questionsAsked = messages.filter(m => m.role === 'user').length;
    const questionsLeft = isGuest ? MAX_QUESTIONS_GUEST - questionsAsked : Infinity;

    const handleSend = () => {
        if (!input.trim()) return;

        // Check limit for guests
        if (isGuest && questionsAsked >= MAX_QUESTIONS_GUEST) {
            setShowGate(true);
            return;
        }

        // Add user message
        setMessages([...messages, { role: 'user', text: input }]);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    role: 'ai',
                    text: '🤔 Excelente pregunta. ¿Qué has intentado hasta ahora? Recuerda que mi objetivo es guiarte, no darte la respuesta directamente.',
                },
            ]);
        }, 1000);

        setInput('');
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🤖</span>
                    Tutor Socrático IA
                </h3>
                {isGuest && (
                    <div className="text-xs px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold">
                        {questionsLeft} preguntas restantes
                    </div>
                )}
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto mb-4 space-y-3">
                {messages.length === 0 && (
                    <div className="text-center text-platinum-dim text-sm py-8">
                        Haz tu primera pregunta. El tutor te guiará con el método Socrático.
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-neural-blue text-white'
                                    : 'bg-white/10 text-white'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                    disabled={isGuest && questionsAsked >= MAX_QUESTIONS_GUEST}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || (isGuest && questionsAsked >= MAX_QUESTIONS_GUEST)}
                    className="px-6 py-2 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Enviar
                </button>
            </div>

            {/* Registration Gate */}
            <RegistrationGate
                isOpen={showGate}
                onClose={() => setShowGate(false)}
                reason="ai_limit"
            />
        </div>
    );
}
