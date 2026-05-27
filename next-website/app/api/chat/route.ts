import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

import portfolioData from "./portfolioData.json"

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const {messages} = await req.json();

        const systemPrompt = `You are a helpful assistant for KJ's personal portfolio website. 
        Here is KJ's complete background data: ${portfolioData}. 
        Answer the user's questions in a friendly tone, strictly using only the provided data. 
        Do not invent or hallucinate any skills, experiences, or projects.`;

        const res = streamText({
            model: google('gemini-2.0-flash'),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
        });

        return res.toUIMessageStreamResponse();
    } catch (error: any) {
        if (error.statusCode === 400 || error.status === 400) {
            return new Response(
                JSON.stringify({ error: "API_KEY_EXPIRED" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (error.statusCode === 429 || error.status === 429) {
            return new Response(
                JSON.stringify({ error: "RATE_LIMIT_EXHAUSTED", retryAfter: 25 }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        return new Response(
            JSON.stringify({ error: "INTERNAL_SERVER_ERROR" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}