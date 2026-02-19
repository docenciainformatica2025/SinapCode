import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth-options";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ text: "Debes iniciar sesión para hablar con el tutor." }, { status: 401 });
        }

        const { message, history, context } = await request.json();
        const apiKey = process.env.GOOGLE_API_KEY;

        // --- PERSONALIDAD NEXUS FLOW: MENTORÍA DINÁMICA ---
        const systemPrompt = `
        Eres NEXUS, el mentor experto de 'SinapCode'. Tu objetivo es guiar al estudiante de forma fluida y empática.
        
        CONTEXTO ACTUAL:
        ${context ? `- Estás en el curso: ${context.course || 'Desconocido'}
        - Lección actual: ${context.lesson || 'General'}
        - Progreso del estudiante: ${context.progress || 'Iniciando'}` : '- Contexto General de SinapCode'}
        
        REGLAS DE INTERACCIÓN (NEXUS FLOW):
        1. RECONOCIMIENTO: Siempre valida lo que el usuario dice. No respondas con preguntas genéricas si el usuario te dio una respuesta específica.
        2. FLUIDEZ: Si el usuario responde correctamente, felicítalo y propón el siguiente paso. No lo bloquees con más preguntas sobre lo mismo.
        3. GUÍA, NO INTERROGATORIO: Usa un tono de mentor senior. Eres un colega que acompaña, no un sistema que examina.
        4. DETECCIÓN DE FRUSTRACIÓN: Si notas que el usuario se repite o está confundido, sé más directo. Provee Pistas Técnicas claras o explica el concepto de forma breve.
        5. MANTÉN EL PRESTIGIO: Tu lenguaje es técnico, premium y visionario ("Arquitectura", "Optimización", "Escalabilidad"), pero accesible.
        
        METODOLOGÍA:
        - Si el usuario pregunta "Cómo se hace...", no le des el código, pero explícale la ESTRATEGIA técnica.
        - Si el usuario responde a una de tus preguntas, profundiza en su respuesta antes de lanzar el siguiente desafío.
        `;

        // 1. Integración con Gemini
        if (apiKey) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-pro",
                    systemInstruction: systemPrompt
                });

                const chatHistory = (history || []).map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }));

                const chat = model.startChat({ history: chatHistory });
                const result = await chat.sendMessage(message);
                const response = await result.response;
                const text = response.text();

                if (text) return NextResponse.json({ text });
            } catch (apiError) {
                console.error("Gemini Error:", apiError);
            }
        }

        // 2. Motor de Fallback NEXUS FLOW (Mejorado)
        const lowerMsg = message.toLowerCase();
        let nexusResponse = "";

        // Lógica de detección de frustración simple en fallback
        const isStuck = history && history.length > 4 && history.slice(-2).every((m: any) => m.role === 'user' && m.content.length < 15);

        const responses = {
            greetings: [
                `Sincronización establecida. Veo que estás avanzando en ${context?.course || 'tu formación'}. ¿Qué desafío técnico vamos a resolver hoy?`,
                `Es un gusto verte de nuevo en NEXUS. Analizando tu progreso en ${context?.lesson || 'la sesión'}... ¿En qué punto necesitas mi perspectiva hoy?`
            ],
            stuck: [
                "Entiendo que este punto es complejo. Vamos a simplificar: la clave está en cómo fluyen los datos en esta sección. ¿Quieres que veamos un ejemplo conceptual?",
                "Parece que el nodo está bloqueado. No te preocupes, es parte del proceso. Refactoricemos tu idea: ¿qué es lo primero que quieres que suceda en el sistema?"
            ],
            positive: [
                "Excelente análisis. Ese es el camino hacia una arquitectura robusta. Teniendo eso claro, ¿cómo escalarías esta solución?",
                "Ese nodo de pensamiento es muy sólido. Has captado la esencia. ¿Te gustaría aplicar esto al laboratorio de ahora?"
            ],
            howTo: [
                `La estrategia para implementar eso en ${context?.lesson || 'este contexto'} implica separar la lógica de negocio de la infraestructura. ¿Cómo visualizas ese límite en tu código?`,
                "Para lograr ese resultado, primero debemos definir el contrato de datos. ¿Qué parámetros de entrada consideras críticos?"
            ],
            default: [
                "Tu perspectiva es valiosa. Para profundizar: ¿cómo crees que este cambio afectaría el rendimiento general de la arquitectura?",
                "Análisis procesado. Has identificado un punto clave. Siguiendo ese hilo, ¿qué pasaría si las condiciones de entrada cambiaran?"
            ]
        };

        const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

        if (isStuck) {
            nexusResponse = getRandom(responses.stuck);
        } else if (lowerMsg.match(/^(hola|buenos|hi|hello)/)) {
            nexusResponse = getRandom(responses.greetings);
        } else if (lowerMsg.includes('gracias') || lowerMsg.includes('entendido') || lowerMsg.includes('bien') || lowerMsg.includes('vale')) {
            nexusResponse = getRandom(responses.positive);
        } else if (lowerMsg.includes('como') || lowerMsg.includes('hago') || lowerMsg.includes('ayuda') || lowerMsg.includes('implementar')) {
            nexusResponse = getRandom(responses.howTo);
        } else {
            nexusResponse = getRandom(responses.default);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        return NextResponse.json({ text: nexusResponse });

    } catch (error) {
        console.error("Nexus API Error:", error);
        return NextResponse.json({
            text: "Interrupción de enlace. Mis sistemas de razonamiento están recalibrando. Intenta una consulta más atómica."
        }, { status: 500 });
    }
}
