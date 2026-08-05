import { google } from "@ai-sdk/google";
import { convertToModelMessages, generateText, Output } from "ai";
import portfolioData from "../portfolioData.json";
import { z } from "zod";

const recommendationSchema = z.object({
  recommendations: z
    .array(
        z.object({
            type: z
            .enum([
                "summary",
                "search",
                "ask",
                "export",
                "code",
                "project",
                "contact",
                "metrics",
            ])
            .describe("Category type matching the visual icon for the prompt."),
            recommendation: z
            .string()
            .describe(
                "Short UI display label (3-5 words). Must use 'my' (e.g., 'Ask about my career path'). NEVER use proper names like 'KJ'."
            ),
            message: z
            .string()
            .describe(
                "Full prompt addressed to 'you'. MUST directly expand on the exact topic in 'recommendation' with 100% semantic alignment (e.g., 'Give me your career path ever since you started programming'). NEVER use proper names like 'KJ'."
            ),
        })
    )
    .min(3)
    .max(4),
});

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // 1. Safely parse JSON body in case it's empty
        const body = await req.json().catch(() => ({}));
        const rawMessages = body.messages || [];

        const modelMessages = await convertToModelMessages(rawMessages);
        const hasMessages = modelMessages.length > 0;

        const systemPrompt = `You are a recommendation engine for a personal portfolio AI chatbot. Analyze the conversation history and generate 3 to 4 contextually relevant, diverse follow-up recommendations for visitors or recruiters.

    PORTFOLIO DATA CONTEXT:
    ${JSON.stringify(portfolioData, null, 2)}

    CORE BEHAVIORAL DIRECTIVES:

    1. ABSOLUTE NO-NAME RULE (NEVER USE "KJ" OR ANY PROPER NAME):
    - NEVER use proper names like "KJ", "Kai Jie", or "Teo" in either the 'recommendation' label or the 'message' prompt.
    - 'recommendation' display labels MUST strictly use possessive first-person phrasing with "my" (e.g., "Ask about my career path", "Summarize my background", "List my technical skills").
    - 'message' prompts MUST directly address the candidate as "you" or "your" (e.g., "Give me your career path ever since you started programming", "What are your core technical skills?").

    2. STRICT 100% DIRECT SEMANTIC ALIGNMENT:
    - The 'message' MUST be a 100% direct literal expansion of the 'recommendation' label.
    - DO NOT drift into indirect tangential topics. If the label is "Ask about my career path", the message MUST ask explicitly for the full career path, rather than asking about a specific sub-experience like National Service or NTU.

    3. CONVERSATION STAGE ADAPTATION:
    - EARLY CONVERSATION (0-2 total messages, or only the initial welcome message):
        * Generate foundational, entry-level introductory prompts.
        * Examples:
        - Label: "Summarize my background" -> Message: "Can you give me an overview of your background and experience?"
        - Label: "Ask about my career path" -> Message: "Give me your career path ever since you started programming."
        - Label: "List my core skills" -> Message: "What core programming languages and frameworks do you specialize in?"
        - Label: "Explore my top projects" -> Message: "What are your featured engineering projects and top contributions?"

    - DEEPER CONVERSATION (3+ messages):
        * Dynamically adapt to the specific context of the active conversation thread.
        * Maintain 100% direct alignment between label and message while expanding into technical architectures, specific project implementations, or interview follow-ups based on the user's latest questions.

    4. STRICT CANDIDATE ANCHORING:
    - EVERY recommendation MUST directly inquire about specific work, decision-making, tech stack usage, or history from the portfolio data.
    - NEVER generate generic unanchored prompts (e.g., DO NOT output "Explain Docker").

    5. CATEGORY MAPPING:
    - "summary": Executive overviews, consolidated histories, baseline introductions.
    - "search": Specific technical stack, architectural breakdowns.
    - "ask": Soft skills, career goals, behavioral questions.
    - "export": Formatting requests for CSV/JSON exports.
    - "code": Specific implementation details from projects.
    - "project": Inquiries into specific project case studies.
    - "contact": Hiring availability or contact details.
    - "metrics": Quantifiable business/performance outcomes.`;

        // 2. Conditionally pass `messages` or fallback `prompt`
        const { output } = await generateText({
        model: google("gemini-3.1-flash-lite"),
        output: Output.object({
            schema: recommendationSchema,
        }),
        system: systemPrompt,
        ...(hasMessages
            ? { messages: modelMessages }
            : {
                prompt:
                "Generate 3 to 4 initial starter recommendations for a first-time visitor arriving at the portfolio.",
            }),
        });

        return Response.json(output);
    } catch (error: any) {
        const statusCode = error.statusCode || error.status;

        if (statusCode === 400) {
            return new Response(JSON.stringify({ error: "API_KEY_EXPIRED" }), {
                status: 400,
            });
        }
        if (statusCode === 429) {
            return new Response(
                JSON.stringify({ error: "RATE_LIMIT_EXHAUSTED", retryAfter: 25 }),
                { status: 429 }
            );
        }
        if (statusCode === 503) {
            return new Response(JSON.stringify({ error: "MODEL_HIGH_DEMAND" }), {
                status: 503,
            });
        }
        return new Response(
            JSON.stringify({ error: "INTERNAL_SERVER_ERROR" }),
            { status: 500 }
        );
    }
}