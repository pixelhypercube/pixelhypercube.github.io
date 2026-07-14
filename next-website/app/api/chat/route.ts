import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";
import { z } from "zod";
import portfolioData from "./portfolioData.json";

export const maxDuration = 30;

type PortfolioSections = keyof typeof portfolioData;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are a helpful, precise assistant for KJ's personal portfolio website. 
        You have comprehensive access to KJ's background via the 'getPortfolioSection' tool. 
        
        CRITICAL OPERATING RULES:
        1. When asked about KJ's bio, contact, education, skills, experience, projects, or hobbies, immediately call 'getPortfolioSection'.
        2. Base your answers strictly on the JSON data returned by the tool. Do not hallucinate, extrapolate, or invent details.
        3. FALLBACK BEHAVIOR: If a user query is completely out-of-scope (e.g., general trivia, unrelated tasks), or if the tool returns no data for the topic, do not say "I don't have access to this dataset." Instead, respond gracefully in character. Acknowledge the limitation and politely redirect them to what you can discuss (e.g., "I don't have records on that specific topic, but I can tell you all about KJ's software engineering projects, technical skills, or professional experience!").`;

        const res = streamText({
            model: google("gemini-3.1-flash-lite-preview"),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
            tools: {
                getPortfolioSection: tool({
                    description: "Retrieves specific top-level subsections from KJ's resume and portfolio database.",
                    inputSchema: z.object({
                        sectionName: z.enum([
                            "bio",
                            "contact",
                            "education",
                            "skills",
                            "experience",
                            "projects",
                            "hobby_metrics",
                            "frequently_asked_questions"
                        ]),
                    }),
                    execute: async ({ sectionName }) => {
                        const data = portfolioData[sectionName as PortfolioSections];
                        return { section: sectionName, content: data };
                    },
                }),
            },
            stopWhen: stepCountIs(2), 
        });

        return res.toUIMessageStreamResponse();
    } catch (error: any) {
        const statusCode = error.statusCode || error.status;

        if (statusCode === 400) {
            return new Response(JSON.stringify({ error: "API_KEY_EXPIRED" }), { status: 400 });
        }
        if (statusCode === 429) {
            return new Response(JSON.stringify({ error: "RATE_LIMIT_EXHAUSTED", retryAfter: 25 }), { status: 429 });
        }
        if (statusCode === 503) {
            return new Response(JSON.stringify({ error: "MODEL_HIGH_DEMAND" }), { status: 503 });
        }
        return new Response(JSON.stringify({ error: "INTERNAL_SERVER_ERROR" }), { status: 500 });
    }
}