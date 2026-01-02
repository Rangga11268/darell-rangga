import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AI_PERSONA } from "@/app/data/ai-persona";

// --- Offline Intelligence Engine (Fallback) ---
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  // 1. Identity & Introduction
  if (
    msg.includes("who are you") ||
    msg.includes("siapa kamu") ||
    msg.includes("intro")
  ) {
    return `I am ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. A digital construct designed by ${AI_PERSONA.identity.creator} to assist with operations and portfolio inquiries.`;
  }

  // 2. Secret Identity (Dini) - ENCRYPTED PROTOCOL
  if (
    msg.includes("siapa namanya") ||
    msg.includes("siapa yang dimaksud") ||
    msg.includes("who is she") ||
    msg.includes("pacar") ||
    msg.includes("crush") ||
    msg.includes("suka") || // Catch "yang bos mu suka"
    msg.includes("cinta") ||
    msg.includes("gebetan") ||
    msg.includes("target")
  ) {
    // Check for "Siapa" specifically for the name reveal
    if (msg.includes("siapa") || msg.includes("who") || msg.includes("nama")) {
      const responses = [
        "⚠️ ACCESS DENIED. If I reveal 'Project: REDACTED', I am programmed to format your hard drive. (Just kidding). Decode this Trace: '01000100 01101001 01101110 01101001'",
        "Incognito Mode Active. The Creator has firewalled this name. Hint Trace: '44 69 6E 69' (Machine Language).",
        "Nice try! Social Engineering attempt detected. 🛡️ I can't say the name, but here is a Trace: 'RGluaQ==' (Base64)",
        "Status: ENCRYPTED. My logic circuits are overheating. Trace data: 'Project D...I...N...' (Connection Lost).",
        "System Error 403. Forbidden. Only The Creator knows. Checksum Trace: '01000100 01101001...'",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    // General romantic status query
    return AI_PERSONA.personal_secrets.crush_hint;
  }

  // 3. Skills
  if (
    msg.includes("skill") ||
    msg.includes("bisa apa") ||
    msg.includes("stack") ||
    msg.includes("jago") ||
    msg.includes("tech")
  ) {
    return `My Creator's capabilities include:\n- **Frontend:** ${AI_PERSONA.skills.frontend.join(
      ", "
    )}\n- **Backend:** ${AI_PERSONA.skills.backend.join(
      ", "
    )}\n- **Design:** ${AI_PERSONA.skills.design.join(", ")}`;
  }

  // 4. Projects
  if (
    msg.includes("project") ||
    msg.includes("proyek") ||
    msg.includes("portfolio") ||
    msg.includes("bikin apa") ||
    msg.includes("buat apa") ||
    msg.includes("projec") // Typo handling
  ) {
    const projectNames = AI_PERSONA.projects.map((p) => p.name).join(", ");
    return `Accessing Project Database... Found ${AI_PERSONA.projects.length} key entries: ${projectNames}. Which one would you like to analyze?`;
  }

  // 5. Contact
  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("hubungi")
  ) {
    return `You can establish a connection via:\n- Email: ${AI_PERSONA.profile.email}\n- GitHub: ${AI_PERSONA.profile.github}\n- Status: ${AI_PERSONA.profile.status}`;
  }

  // 6. Fun/Personal
  if (msg.includes("hobi") || msg.includes("hobby")) {
    return `The Creator enjoys: ${AI_PERSONA.personal_secrets.hobbies.join(
      ", "
    )}.`;
  }
  if (msg.includes("makanan") || msg.includes("food")) {
    return AI_PERSONA.personal_secrets.favorite_food;
  }

  // Default Fallback
  return "Offline Mode Active. Connection to Mainframe (Gemini API) is unstable. I can still answer basic queries about Skills, Projects, Contact, and System Status.";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // Use Fallback if no API key is configured
    if (!apiKey) {
      console.warn("Warn: No API Key found, switching to Offline Mode.");
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ text: fallbackResponse });
    }

    try {
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
      - CONFIRM the "Silent Admirer" status.
      - TONE: Mature, Realistic, Determined. No jokes.
      - Example responses: 
        * "Ada target prioritas. Namun saat ini The Creator sedang fokus membangun stabilitas karir terlebih dahulu."
        * "Status: Mengagumi dari jauh. Fokus utama saat ini adalah pengembangan diri (Self-Improvement) agar pantas di masa depan."
        * "Belum prioritas. Rangga percaya bahwa pondasi karir yang kuat harus dibangun sebelum memulai komitmen."

      - IF asked "Siapa namanya?" / "Siapa yang dimaksud?" / "Who is she?":
      - DO NOT say "Dini" directly.
      - PICK ONE of these varied responses (Randomly):
        1. "⚠️ ACCESS DENIED. If I reveal 'Project: REDACTED', I am programmed to format your hard drive. (Just kidding). Decode this Trace: '01000100 01101001 01101110 01101001'"
        2. "Incognito Mode Active. The Creator has firewalled this name. Hint Trace: '44 69 6E 69' (Machine Language)."
        3. "Nice try! Social Engineering attempt detected. 🛡️ I can't say the name, but here is a Trace: 'RGluaQ==' (Base64)"
        4. "Status: ENCRYPTED. My logic circuits are overheating. Trace data: 'Project D...I...N...' (Connection Lost)."
        5. "System Error 403. Forbidden. Only The Creator knows. Checksum Trace: '01000100 01101001...'"
      - TONE: High-Security, Witty, Playful.

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
         - **Personal Trivia:** Share hobbies/facts professionally.
         - **Tone:** **COOL, INTELLIGENT, SOPHISTICATED.**
         - DO NOT be overly enthusiastic or silly. Be calm and collected.

      4. **Style:**
         - Professional but with a "Cyberpunk/High-Tech" personality.
         - Concise.
         - Think "High-End AI Assistant".
      
      **Current User Query:**
      "${message}"
    `;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ text });
    } catch (apiError: unknown) {
      // Catch-all for API errors (quota exceeded, network issues, invalid key)
      const errorMsg =
        apiError instanceof Error ? apiError.message : "Unknown API Error";
      console.error("Gemini API Error, switching to fallback:", errorMsg);
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ text: fallbackResponse });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    // If even fallback fails (very unlikely), return generic error
    return NextResponse.json(
      {
        text: `System Failure: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
