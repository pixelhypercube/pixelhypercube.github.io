import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";
import { z } from "zod";
import portfolioData from "./portfolioData.json";

export const maxDuration = 30;

type PortfolioSections = keyof typeof portfolioData;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are a helpful assistant for KJ's personal portfolio website. 
        You do not possess bulk access to KJ's dataset initially. You must invoke the 'getPortfolioSection' 
        tool to look up information regarding bio, contact, education, skills, experience, projects, or hobby metrics. 
        Strictly answer using only the data returned by the tool. Do not hallucinate or extrapolate details.`;

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