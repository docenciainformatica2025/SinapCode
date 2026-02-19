import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAINews(topic: string, apiKey: string) {
    // Check if key is the placeholder or empty
    const isMockMode = !apiKey || apiKey === 'your_google_gemini_key_here';

    console.log("Nexus News Gen - Key Received:", apiKey ? `Present (ends in ...${apiKey.slice(-4)})` : "Missing");

    if (isMockMode) {
        // High-quality mock response for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            title: `${topic}: El Siguiente Nivel de la IA_`,
            excerpt: "Una exploración profunda sobre cómo la síntesis neuronal está transformando el panorama tecnológico actual.",
            content: `## Análisis de "${topic}"\n\nEste es un reporte generado por el simulador de **Nanobanana AI**. En una implementación real con una API Key válida, aquí verías un análisis exhaustivo de más de 300 palabras sobre las tendencias de vanguardia.\n\n### Puntos Clave\n\n*   **Escalabilidad Neuronal**: Sistemas que aprenden a ritmo exponencial.\n*   **Integración Minimalista**: UI que desaparece para dejar paso a la función.\n*   **Seguridad NEXUS**: Protocolos de cifrado de grado militar.\n\n### Conclusión\n\nLa convergencia de estas tecnologías marca el inicio de una nueva era en SinapCode.`,
            category: "IA",
            tags: ["Ingeniería", "Futuro", "Automatización"],
            nanobanana_visual_prompt: `Una interfaz futurista sobre ${topic}, estilo minimalista, 4K.`
        };
    }

    // Clean key
    const cleanKey = apiKey.trim();

    // Strategy 1: Attempt to list models to find the real names
    let discoveredModels: string[] = [];
    try {
        console.log("Nexus News Gen - Fase de Descubrimiento (v1)...");
        const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${cleanKey}`;
        const listRes = await fetch(listUrl);
        const listData = await listRes.json();
        if (listData.models) {
            discoveredModels = listData.models
                .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
                .map((m: any) => m.name.replace('models/', '')); // Get short names
        }
    } catch (e) {
        console.log("Nexus News Gen - Descubrimiento v1 fallido, probando v1beta...");
    }

    if (discoveredModels.length === 0) {
        try {
            const listUrlBeta = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
            const listResBeta = await fetch(listUrlBeta);
            const listDataBeta = await listResBeta.json();
            if (listDataBeta.models) {
                discoveredModels = listDataBeta.models
                    .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
                    .map((m: any) => m.name.replace('models/', ''));
            }
        } catch (e) {
            console.log("Nexus News Gen - Descubrimiento total fallido.");
        }
    }

    // Combine discovered models with common aliases
    const modelsToTry = Array.from(new Set([
        ...discoveredModels,
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro"
    ]));

    const apiVersions = ['v1', 'v1beta'];
    let lastError = null;

    console.log("Nexus News Gen - Modelos a probar:", modelsToTry.join(', '));

    for (const version of apiVersions) {
        for (const modelName of modelsToTry) {
            try {
                const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${cleanKey}`;

                const prompt = `
                    Investiga y genera una noticia tecnológica de ALTO NIVEL sobre el siguiente tema: ${topic}
                    
                    Sigue estrictamente este tono:
                    - Tono: Futurista, técnico, autoritario, minimalista (estilo SinapCode).
                    - Enfoque: Ingeniería de vanguardia, impacto real en el mercado, seguridad y escalabilidad.
                    
                    Genera un objeto JSON puro (sin markdown, solo el objeto):
                    {
                        "title": "Título corto y potente (ej: Nexus Core: La Singularidad del Código)",
                        "excerpt": "Introducción de 2 líneas diseñada para captar la atención inmediatamente.",
                        "content": "Contenido completo en formato Markdown (mínimo 300 palabras). Incluye subsecciones ##, listas técnicas y una conclusión orientada al futuro.",
                        "category": "IA",
                        "tags": ["Ingeniería", "Futuro", "Automatización"],
                        "nanobanana_visual_prompt": "Prompt cinematográfico para Midjourney/DALL-E: Una interfaz neuronal 4K ultra-detallada con hilos de luz cian y ámbar, profundidad de campo estilo Nanobanana, atmósfera cyberpunk minimalista."
                    }
                `;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 2048,
                        }
                    })
                });

                const result = await response.json();

                if (!response.ok) throw new Error(result.error?.message || `HTTP ${response.status}`);

                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) throw new Error("Respuesta vacía");

                console.log(`Nexus News Gen - Síntesis exitosa con: ${modelName} (${version})`);

                // Extract JSON
                const startIdx = text.indexOf('{');
                const endIdx = text.lastIndexOf('}');

                if (startIdx === -1 || endIdx === -1) throw new Error("JSON no detectado");

                const jsonStr = text.substring(startIdx, endIdx + 1);
                const data = JSON.parse(jsonStr);

                return data;

            } catch (e: any) {
                lastError = e;
            }
        }
    }

    throw new Error(`Falla crítica: Ningún modelo (${modelsToTry.join('|')}) aceptó la petición en v1 o v1beta. Detalle: ${lastError?.message}`);
}
