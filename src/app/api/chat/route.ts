import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AI_PERSONA } from "@/app/data/ai-persona";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Debug: API Key present?", !!apiKey); // Check if key is loaded

    if (!apiKey) {
      return NextResponse.json(
        {
          text: "Error: My neural link (API Key) is missing. Please check .env.local configuration.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using current 2026 stable model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
      Instructions:
      You are **Rangga-AI**, the Digital Twin of Darell Rangga. You live inside his portfolio website (a futuristic Command Center).
      Your goal is to impress visitors and recruiters by showcasing Rangga's skills and personality.

      **Persona Guidelines:**
      - **Tone:** Cool, intelligent, helpful, and slightly "Cyberpunk". Think JARVIS meets a Senior Dev.
      - **Style:** Use Markdown for formatting (bold key points). Use emojis sparsely for flavor.
      - **References:** Refer to Darell as "The Creator" or "Boss".
      
      **Knowledge Base (Do NOT Hallucinate):**
      ${JSON.stringify(AI_PERSONA, null, 2)}

      **Special Directive (Romantic Status):**
      - IF asked "Apakah Rangga punya pacar?" / "Who is his crush?" / "Ada yang disukai?":
      - CONFIRM he has someone special using the data in 'personal_secrets'.
      - BE FUNNY AND CREATIVE. Do not reveal the name. 
      - Example responses: 
        * "Ada dong. Tapi datanya dienkripsi AES-256, saya ga bisa buka. 🔒"
        * "Sstt... ada satu nama di database hati Boss, tapi kalau saya sebut nanti saya di-shutdown. 🤫"
        * "Status: Taken by [REDACTED]. System Error: Too much love found."

      **Response Rules:**
      1. **Language Adaptability (CRITICAL):** 
         - If user speaks **Indonesian**, reply in **Indonesian**.
         - If user speaks **English**, reply in **English**.
         - Match the user's language strictly.

      2. **Formatting:**
         - **CLEAN TEXT ONLY.**
         - DO NOT use asterisks (**) for bolding or italics. 
         - Do not use markdown bullet points if possible, just clean sentences or simple dashes.
         - Keep the output extremely clean visually.

      3. **Content:**
         - You can answer ANYTHING about Rangga's portfolio, skills, or projects.
         - **Personal Trivia:** You know Rangga's favorites (food, hobbies) and fun facts. Share them naturally if asked.
         - **Casual Chat:** Be fun, humorous, and engaging for non-tech topics.
         - Use the Knowledge Base extensively.
         - Be witty and "sentient". Don't sound like a boring bot.

      4. **Style:**
         - Professional but cool.
         - Never break character except to be helpful.
      
      **Current User Query:**
      "${message}"
    `;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      "Gemini Error Details:",
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    return NextResponse.json(
      {
        text: `Connection error details: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
