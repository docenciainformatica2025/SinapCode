import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAINews(topic: string, apiKey: string) {
    // Check if key is the placeholder or empty
    const isMockMode = !apiKey || apiKey === 'your_google_gemini_key_here';

    console.log("SinapCode News Gen - Key Received:", apiKey ? `Present (ends in ...${apiKey.slice(-4)})` : "Missing");

    if (isMockMode) {
        // High-quality mock response for demo purposes (Updated for Startup Impact)
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

    // Clean key
    const cleanKey = apiKey.trim();

    // Strategy 1: Attempt to list models to find the real names
    let discoveredModels: string[] = [];
    try {
        console.log("SinapCode News Gen - Fase de Descubrimiento (v1)...");
        const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${cleanKey}`;
        const listRes = await fetch(listUrl);
        const listData = await listRes.json();
        if (listData.models) {
            discoveredModels = listData.models
                .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
                .map((m: any) => m.name.replace('models/', '')); // Get short names
        }
    } catch (e) {
        console.log("SinapCode News Gen - Descubrimiento v1 fallido, probando v1beta...");
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
            console.log("SinapCode News Gen - Descubrimiento total fallido.");
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

    console.log("SinapCode News Gen - Modelos a probar:", modelsToTry.join(', '));

    for (const version of apiVersions) {
        for (const modelName of modelsToTry) {
            try {
                const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${cleanKey}`;

                const prompt = `
                    Actúa como el **Global Strategic Content Director** de una corporación tecnológica de élite (estilo Stripe, NVIDIA, DeepMind).
                    Genera un artículo de noticias de vanguardia, **GLOBAL**, con congruencia radical entre concepto y visualización sobre: ${topic}
                    
                    RESTRICCIÓN CRÍTICA: NO menciones "Colombia", "Bogotá" ni entidades locales. El contexto debe ser 100% GLOBAL/UNIVERSAL.
                    
                    IDIOMA: ESPAÑOL (INTERNACIONAL) - Tono: Académico-Empresarial, Profético, Altamente Sofisticado.
                    
                    ESTRATEGIA DE NARRATIVA:
                    1. TÍTULO: Brutalmente corto (2-4 palabras). Sustantivos de alto impacto (Criptografía del Bienestar, El Silencio del Algoritmo, Gravedad Digital).
                    2. EXCERPT: Una tesis provocativa de 12-15 palabras sobre el impacto sistémico.
                    3. TEXTO HUMANIZADO: Narra la intersección entre la alta ingeniería y la condición humana. Evita el "hype" barato. Usa "La arquitectura del mañana se forja en...", "SinapCode SinapCode decodifica...". 
                    4. ESTRUCTURA: 
                       - Hook Filosófico/Técnico.
                       - La Disrupción Sistémica (The Global Shift).
                       - Implementación SinapCode (The Protocol).
                       - Síntesis Futurista.
                    5. FORMATO: Markdown impecable. Mínimo 500 palabras.
                    
                    CONGRUENCIA VISUAL (visual_prompt):
                    - Define una imagen que sea la encarnación EMOTIVA y PROFESIONAL del tema. No uses metáforas genéricas (no robots escribiendo en laptops).
                    - Estilo: Fotografía de Arte Contemporáneo Technicista, 8K, cinematic lighting, profundidad de campo extrema.
                    - LEGIBILIDAD: El prompt de la imagen DEBE especificar áreas de calma visual (composición minimalista) para que el TÍTULO no se pierda. 
                    - Colores: Paleta Premium (#F1F0E8, #C9A78A, #1E1E1E).
                    
                    Genera un objeto JSON puro:
                    {
                        "title": "...",
                        "excerpt": "...",
                        "content": "...",
                        "category": "Estrategia | Arquitectura | Frontera",
                        "tags": ["Global", "SinapCode", "Inteligencia"],
                        "visual_prompt": "Prompt in English for DALL-E/Midjourney: A high-impact, professional, and emotional photographic masterpiece depicting [THEME]. Use a minimalist composition with clear minimalist space for text overlay. Soft cinematic ivory lighting, copper details, obsidian shadows, 8k resolution, Unreal Engine 5 render style."
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

                console.log(`SinapCode News Gen - Síntesis exitosa con: ${modelName} (${version})`);

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
