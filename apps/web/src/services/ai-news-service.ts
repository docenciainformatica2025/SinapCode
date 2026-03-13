export interface AINews {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    visual_prompt: string;
}

export class AINewsService {
    /**
     * Generates AI news content using Gemini
     */
    static async generate(topic: string, apiKey: string): Promise<AINews> {
        const isMockMode = !apiKey || apiKey === 'your_google_gemini_key_here';

        if (isMockMode) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return {
                title: `Sinfonía Neuronal: El Impacto de ${topic} en la Ingeniería de Élite`,
                excerpt: "No es solo una herramienta, es el nuevo estándar de la identidad distribuida. Analizamos por qué el mercado está girando hacia este protocolo.",
                content: `## El Cambio de Paradigma en "${topic}"\n\nEste análisis ha sido sintetizado por el núcleo **SinapCode**. En un entorno productivo, este motor procesa más de 500 señales de mercado para generar una visión técnica y estratégica.\n\n### Arquitectura de Vanguardia\n\n*   **Consistencia de Estado**: Cómo el protocolo mantiene la integridad en clusters globales.\n*   **Interacción Humanística**: interfaces que no solo responden, sino que anticipan la carga cognitiva del usuario.\n*   **Escalabilidad de Grado Industrial**: Carga balanceada bajo protocolos SinapCode 2.4.\n\n### Perspectiva Estratégica\n\nLa verdadera innovación no reside en la potencia bruta, sino en la elegancia de la implementación. SinapCode define este territorio.`,
                category: "Ingeniería",
                tags: ["Innovación", "Arquitectura", "Elite"],
                visual_prompt: `Vista microscópica de un procesador orgánico pulsando con luz ámbar, hilos de datos conectando nodos dorados, estética de estudio Apple, 8K, hiperrealista.`
            };
        }

        const cleanKey = apiKey.trim();
        let discoveredModels: string[] = [];

        try {
            const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${cleanKey}`;
            const listRes = await fetch(listUrl);
            const listData = await listRes.json();
            if (listData.models) {
                discoveredModels = listData.models
                    .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
                    .map((m: any) => m.name.replace('models/', ''));
            }
        } catch (e) {
            console.warn("[AI SERVICE] Model discovery v1 failed");
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
                console.warn("[AI SERVICE] Model discovery beta failed");
            }
        }

        const modelsToTry = Array.from(new Set([
            ...discoveredModels,
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-pro"
        ]));

        const apiVersions = ['v1', 'v1beta'];
        let lastError = null;

        for (const version of apiVersions) {
            for (const modelName of modelsToTry) {
                try {
                    const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${cleanKey}`;
                    const prompt = this.getPrompt(topic);

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: {
                                temperature: 0.7,
                                maxOutputTokens: 2048,
                            }
                        })
                    });

                    const result = await response.json();
                    if (!response.ok) throw new Error(result.error?.message || `HTTP ${response.status}`);

                    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (!text) throw new Error("Respuesta vacía");

                    const startIdx = text.indexOf('{');
                    const endIdx = text.lastIndexOf('}');
                    if (startIdx === -1 || endIdx === -1) throw new Error("JSON no detectado");

                    return JSON.parse(text.substring(startIdx, endIdx + 1));
                } catch (e: any) {
                    lastError = e;
                }
            }
        }

        throw new Error(`Falla crítica AI: ${lastError?.message}`);
    }

    private static getPrompt(topic: string): string {
        return `
            Actúa como el **Global Strategic Content Director** de una corporación tecnológica de élite (estilo Stripe, NVIDIA, DeepMind).
            Genera un artículo de noticias de vanguardia sobre: ${topic}
            RESTRICCIÓN CRÍTICA: NO menciones "Colombia", "Bogotá" ni entidades locales. El contexto debe ser 100% GLOBAL/UNIVERSAL.
            IDIOMA: ESPAÑOL (INTERNACIONAL)
            
            Genera un objeto JSON puro:
            {
                "title": "...",
                "excerpt": "...",
                "content": "...",
                "category": "Estrategia | Arquitectura | Frontera",
                "tags": ["Global", "SinapCode", "Inteligencia"],
                "visual_prompt": "Prompt in English for generative AI image depiction..."
            }
        `;
    }
}
