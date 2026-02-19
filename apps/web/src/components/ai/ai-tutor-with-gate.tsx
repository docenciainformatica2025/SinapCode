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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        fetch('/api/ai/tutor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        })
            .then(res => res.json())
            .then(data => {
                setMessages(prev => [
                    ...prev,
                    { role: 'ai', text: data.text || 'Error de conexión.' }
                ]);
            })
            .catch(() => {
                setMessages(prev => [
                    ...prev,
                    { role: 'ai', text: 'Lo siento, perdí la conexión con el servidor.' }
                ]);
            })
            .finally(() => setIsLoading(false));

        setInput('');
    };

    return (
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 opacity-50" />
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🤖</span>
                    Tutor Socrático IA
                </h3>
                {isGuest && (
                    <div className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-black uppercase tracking-widest border border-primary/20">
                        {questionsLeft} preguntas restantes
                    </div>
                )}
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm py-8 font-bold italic">
                        Haz tu primera pregunta. El tutor te guiará con el método Socrático.
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm font-bold ${msg.role === 'user'
                                ? 'bg-primary text-white border border-primary'
                                : 'bg-white/10 text-white border border-white/10'
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
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none transition font-bold placeholder:text-gray-500"
                    disabled={isGuest && questionsAsked >= MAX_QUESTIONS_GUEST}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || (isGuest && questionsAsked >= MAX_QUESTIONS_GUEST)}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-black hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
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
