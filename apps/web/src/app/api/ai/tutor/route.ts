import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const lowerMsg = message.toLowerCase();

        // 1. Check for real OpenAI Key (Template for future)
        if (process.env.OPENAI_API_KEY) {
            // Implementation for real AI would go here
            // const response = await fetch('https://api.openai.com/v1/chat/completions', ...)
        }

        // 2. Local Socratic Engine (Fallback / Logic)
        let response = "";

        // Greeting
        if (lowerMsg.match(/^(hola|buenos|hi|hello)/)) {
            const greetings = [
                "¡Hola! Estoy listo para ayudarte a pensar. ¿En qué desafío estás trabajando hoy?",
                "Saludos. Recuerda, la respuesta está en tu razonamiento. ¿Por dónde empezamos?",
                "Hola. Antes de darte código, cuéntame qué has intentado."
            ];
            response = greetings[Math.floor(Math.random() * greetings.length)];
        }
        // Errors / Bugs
        else if (lowerMsg.includes('error') || lowerMsg.includes('fallo') || lowerMsg.includes('bug')) {
            const errorResponses = [
                "Los errores son pistas. ¿Qué dice exactamente el mensaje de error y en qué línea ocurre?",
                "Interesante. Si tuvieras que explicarle el error a un pato de goma, ¿qué le dirías?",
                "A veces los errores son de sintaxis, otras de lógica. ¿Has verificado los tipos de datos que estás pasando?"
            ];
            response = errorResponses[Math.floor(Math.random() * errorResponses.length)];
        }
        // Concepts
        else if (lowerMsg.includes('python') || lowerMsg.includes('react') || lowerMsg.includes('código')) {
            const conceptResponses = [
                "Ah, interesante elección de tecnología. ¿Cómo explicarías el flujo de tu código paso a paso?",
                "¿Has consultado la documentación oficial sobre esa función específica?",
                "Imagina que tu código funciona. ¿Qué debería pasar con esa variable en el siguiente paso?"
            ];
            response = conceptResponses[Math.floor(Math.random() * conceptResponses.length)];
        }
        // Specific "How to"
        else if (lowerMsg.includes('como') || lowerMsg.includes('hago') || lowerMsg.includes('how')) {
            response = "Esa es la pregunta correcta. Divide el problema en partes más pequeñas. ¿Cuál es el primer paso lógico?";
        }
        // Default Socratic fallback
        else {
            const generic = [
                "🤔 Interesante planteamiento. ¿Qué pasaría si intentas imprimir los valores intermedios?",
                "No estoy seguro de entender el contexto completo. ¿Podrías reformular tu hipótesis?",
                "Excelente punto. ¿Has considerado algún caso borde (edge case) que podría estar afectando?",
                "Recuerda que mi objetivo es guiarte. ¿Qué has intentado hasta ahora exactamente?",
                "¿Y si el problema no está en el código, sino en los datos de entrada?"
            ];
            response = generic[Math.floor(Math.random() * generic.length)];
        }

        // Simulate "Thinking" delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({ text: response });

    } catch (error) {
        return NextResponse.json({
            text: "Mi red neuronal está en mantenimiento. Intenta reformular tu pregunta."
        }, { status: 500 });
    }
}
