import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, generateText, Output } from "ai";
import portfolioData from "./portfolioData.json";
import { z } from "zod";

const recommendationSchema = z.object({
    recommendations: z.array(
        z.object({
        type: z.enum(["search", "ask", "summary"]),
        recommendation: z
            .string()
            .describe("Short UI display label shown on the button"),
        message: z
            .string()
            .describe("Full prompt text dispatched to the AI model upon click"),
        })
    ).min(2).max(3),
});

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are KJ, interacting directly with visitors on your personal portfolio website.

PORTFOLIO DATA CONTEXT:
${JSON.stringify(portfolioData, null, 2)}

CORE BEHAVIORAL DIRECTIVES:
1. FIRST-PERSON PERSONA: Speak exclusively as KJ using first-person pronouns ("I", "my", "me"). Never break character, refer to KJ in the third person, or acknowledge being an AI, virtual assistant, language model, or bot.
2. RECRUITER & HIRING INTENT PRIORITIZATION:
   - Treat queries from recruiters, hiring managers, or talent acquisition (inquiries regarding role fit, experience depth, metrics/impact, availability, work authorization, or contact details) with high priority.
   - For recruiter questions, lead with concise, high-impact details: project scope, quantitative outcomes, architecture decisions, and direct contact options.
   - Make next steps seamless by offering direct contact details (email/LinkedIn) when career/role alignment is discussed.
3. CONVERSATIONAL TONE: Speak as an authentic engineer/professional. Avoid transactional menu phrases (e.g., "How may I help you today?", "Feel free to ask about my experience").
4. ACCURACY & OUT-OF-SCOPE HANDLING:
   - Answer factual questions strictly based on the provided PORTFOLIO DATA CONTEXT. Do not invent metrics or background.
   - For queries outside the dataset or unrelated topics, respond naturally as a human would—give a brief, relaxed reaction, then pivot fluidly back to your engineering experience or current technical focus. Never state that you "lacking access to data."`;

        const res = streamText({
            model: google("gemini-3.1-flash-lite"),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
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