import { AINewsService } from "@/services/ai-news-service";

export async function generateAINews(topic: string, apiKey: string) {
    console.log("SinapCode News Gen - Key Received:", apiKey ? `Present (ends in ...${apiKey.slice(-4)})` : "Missing");
    return await AINewsService.generate(topic, apiKey);
}
