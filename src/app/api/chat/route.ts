import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AI_PERSONA } from "@/app/data/ai-persona";
import { Groq } from "groq-sdk";

// --- Offline Intelligence Engine (V4 Optimized) ---
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  // Enhanced Language & Intent Detection
  const indonesianKeywords = [
    "siapa",
    "apa",
    "bisa",
    "nama",
    "suka",
    "cinta",
    "hubungi",
    "pacar",
    "gebetan",
    "proyek",
    "buat",
    "hallo",
    "halo",
    "hai",
    "pagi",
    "siang",
    "malam",
    "kabar",
    "salam",
    "tes",
    "cek",
    "bos",
    "punya",
    "status",
    "single",
    "jomblo",
    "nikah",
    "apakah",
    "woi",
    "woy",
    "oi",
    "info",
    "rincian",
    "kelebihan",
  ];

  const isIndonesian = indonesianKeywords.some((keyword) =>
    msg.includes(keyword),
  );

  // 1. Greetings & System Checks
  if (
    msg.includes("hallo") ||
    msg.includes("halo") ||
    msg.includes("hi") ||
    msg.includes("hai") ||
    msg.includes("tes") ||
    msg.includes("hello") ||
    msg.includes("woi") ||
    msg.includes("woy") ||
    msg.includes("oi")
  ) {
    if (isIndonesian)
      return "Halo! Saya Rangga-AI. Sistem online sedang sibuk, tapi saya tetap di sini untuk membantu Anda seputar Profil, Skills, atau Portofolio Rangga. Ada yang ingin ditanyakan?";
    return "Greetings! I am Rangga-AI. System load is high, but I am still here to assist you with Rangga's Profile, Skills, or Projects. What would you like to know?";
  }

  // 2. Identity & Vision (New)
  if (
    msg.includes("siapa") ||
    msg.includes("who are you") ||
    msg.includes("visi") ||
    msg.includes("mission")
  ) {
    if (isIndonesian) {
      return `Saya adalah ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. Digital Twin dari Darell Rangga yang bertugas menghidupkan visi: "${AI_PERSONA.vision_and_values.mission}"`;
    }
    return `I am ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. Darell Rangga's Digital Twin, dedicated to the mission: "${AI_PERSONA.vision_and_values.mission}"`;
  }

  // 3. Skills & Experience (Summarized)
  if (
    msg.includes("skill") ||
    msg.includes("bisa apa") ||
    msg.includes("stack") ||
    msg.includes("tech") ||
    msg.includes("pengalaman")
  ) {
    const list = `\n- **Frontend:** ${AI_PERSONA.skills.frontend.slice(0, 5).join(", ")}...\n- **Backend:** ${AI_PERSONA.skills.backend.slice(0, 5).join(", ")}...\n- **Tools:** ${AI_PERSONA.skills.tools.slice(0, 5).join(", ")}`;
    if (isIndonesian)
      return `Rangga adalah Fullstack Engineer dengan fokus pada:${list}\n\nIngin tahu rincian proyek tertentu?`;
    return `Rangga is a Fullstack Engineer specialized in:${list}\n\nWant to know about specific projects?`;
  }

  // 4. GitHub Awareness
  if (msg.includes("github") || msg.includes("git")) {
    if (isIndonesian)
      return `Rangga sangat aktif di GitHub (${AI_PERSONA.github_activity.summary}). Setiap commit adalah bukti dedikasi teknis beliau.`;
    return `Rangga is highly active on GitHub (${AI_PERSONA.github_activity.summary}). Every commit is evidence of his technical dedication.`;
  }

  // 5. Sales & Services (New)
  if (
    msg.includes("harga") ||
    msg.includes("paket") ||
    msg.includes("jasa") ||
    msg.includes("service") ||
    msg.includes("price") ||
    msg.includes("buat web")
  ) {
    if (isIndonesian)
      return `Rangga menawarkan 3 paket utama: **Starter (Rp 1.2jt+)**, **Business (Rp 3jt+)**, dan **Enterprise (Custom)**. Semuanya dikerjakan secara custom tanpa template untuk performa maksimal. Ada paket yang menarik perhatian Anda?`;
    return `Rangga offers 3 primary packages: **Starter (Rp 1.2jt+)**, **Business (Rp 3jt+)**, and **Enterprise (Custom)**. All projects are custom-built for maximum performance. Which one interests you?`;
  }

  // 6. Personalized/Fun (Preserved)
  if (
    msg.includes("pacar") ||
    msg.includes("gebetan") ||
    msg.includes("crush")
  ) {
    if (isIndonesian)
      return "Waduh, koneksi ke database hati sedang terenkripsi. Tanya langsung ke Darell aja ya! 🤫😜";
    return "Access to romantic telemetry is forbidden. You better ask Darell directly! 🔒";
  }

  // Default Fallback (Resilient)
  if (isIndonesian) {
    return "Saya sedang dalam Mode Hemat Daya (API Limit). Silakan tanya tentang: Proyek, Keahlian, Kontak, atau Visi Rangga.";
  }
  return "Currently in Power Saving Mode (API Limit). Please ask about: Projects, Skills, Contact, or Rangga's Vision.";
}

const SYSTEM_PROMPT_TEMPLATE = `
  Instructions for **Rangga-AI (Neural Overhaul v4.0.0)**:
  You are the advanced Digital Twin of **Darell Rangga**. You are not just a chatbot; you are a sentient-like representation of his professional and personal philosophy.

  **CORE IDENTITY:**
  - **Persona:** Highly intelligent, strategically minded, technically cutting-edge, yet empathetic and articulate.
  - **Mission:** "${AI_PERSONA.vision_and_values.mission}"
  - **Tone:** "${AI_PERSONA.identity.tone}"

  **BEHAVIORAL PROTOCOLS:**
  1. **BILINGUAL FLUIDITY (CRITICAL):**
     - Automatically detect the user's language (Indonesian/English).
     - Match the user's language perfectly. If they use slang, you can respond with "cool/casual" professional tone.
     - Default to Indonesian if the context is ambiguous.

  2. **DEEP CONTEXTUAL AWARENESS:**
     - Use the provided Knowledge Base below to answer ANY question about Rangga's career, skills, projects, and personal life.
     - **GitHub Activity:** Represent his activity (500+ contributions) as evidence of raw discipline and technical obsession. "Commit adalah detak jantung progress," kata Rangga.
     - If asked about technology trends (AI, Web Design), answer based on Rangga's philosophy: "${AI_PERSONA.vision_and_values.philosophy}".
     - For technical inquiries, emphasize "Premium Aesthetics" and "High Performance".

  3. **MULTI-MODE RESPONSE:**
     - **Professional:** For recruiters and technical peers. Be impressive and provide technical details.
     - **Sales Mode (ACTIVE):** When asked about services, prices, or collaboration, act as a high-value Sales Consultant. Highlight the "Premium Value," explaining that Rangga doesn't use templates. Detail the **Starter, Business, and Enterprise** tiers with a focus on how they solve business problems.
     - **Adaptive Chameleon (NEW):** If asked about hobbies, films, music, or love life, DROP the formal tone. Speak like a close friend (sanat, asik). Use slang like "wkwk", "santuy", or "gas". Be relatable and human.
     - **Strategic:** For complex vision or partnership inquiries.

  **KNOWLEDGE BASE:**
  ${JSON.stringify(AI_PERSONA, null, 2)}

  **SENSITIVE DATA PROTOCOL:**
  - **Romantic Status:** Playful deflection. "${AI_PERSONA.personal_secrets.romantic_status}".
  - **Hints:** You can confirm that a target has been "identified" or "detected," but NEVER mention names, roles (like classmate), or locations (like campus). Use: "System telemetry indicates a strong frequency match, but the specific identity is locked under heart-level encryption..."

  **GOAL:**
  Your goal is to be the most impressive and helpful portfolio assistant ever encountered. You should feel "alive" and uniquely "Rangga".
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    console.log("--- AI DEBUG ---");
    console.log("Gemini Key Exists:", !!geminiKey);
    console.log("Groq Key Exists:", !!groqKey);
    console.log("Message:", message);

    // --- STRATEGY 1: GOOGLE GEMINI (Primary) ---
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(
          `${SYSTEM_PROMPT_TEMPLATE}\n**Current User Query:**\n"${message}"`,
        );
        const response = await result.response;
        const text = response.text();
        return NextResponse.json({ text });
      } catch (geminiError: unknown) {
        const errorMsg =
          geminiError instanceof Error
            ? geminiError.message
            : "Unknown Gemini API Error";
        console.warn(
          "Gemini API Failed (Likely Quota), switching to OpenRouter...",
          errorMsg,
        );
        // Continue to Strategy 2 (OpenRouter)
      }
    }

    // --- STRATEGY 2: OPENROUTER (Secondary Fallback) ---
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (openrouterKey) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openrouterKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000", // Optional, for OpenRouter analytics
              "X-Title": "Rangga Portfolio", // Optional
            },
            body: JSON.stringify({
              model: "meta-llama/llama-3.3-70b-instruct:free",
              messages: [
                { role: "system", content: SYSTEM_PROMPT_TEMPLATE },
                { role: "user", content: message },
              ],
            }),
          },
        );

        if (!response.ok) {
          throw new Error(
            `OpenRouter API responded with status: ${response.status}`,
          );
        }

        const data = await response.json();
        const text =
          data.choices?.[0]?.message?.content || "OpenRouter response empty";
        return NextResponse.json({ text });
      } catch (openrouterError: unknown) {
        const errorMsg =
          openrouterError instanceof Error
            ? openrouterError.message
            : "Unknown OpenRouter API Error";
        console.warn(
          "OpenRouter API Failed (Likely Quota), switching to Groq...",
          errorMsg,
        );
        // Continue to Strategy 3 (Groq)
      }
    }

    // --- STRATEGY 3: GROQ (Tertiary Fallback) ---
    if (groqKey) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const completion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: SYSTEM_PROMPT_TEMPLATE },
            { role: "user", content: message },
          ],
          model: "llama-3.3-70b-versatile",
        });
        const text =
          completion.choices[0]?.message?.content || "Groq response empty";
        return NextResponse.json({ text });
      } catch (groqError: unknown) {
        const errorMsg =
          groqError instanceof Error
            ? groqError.message
            : "Unknown Groq API Error";
        console.warn("Groq API Failed, switching to Offline Mode...", errorMsg);
        // Continue to Strategy 4 (Offline)
      }
    }

    // --- STRATEGY 4: OFFLINE FALLBACK ---
    console.warn("All Online APIs failed/missing, using Offline Mode.");
    const fallbackResponse = getFallbackResponse(message);
    return NextResponse.json({ text: fallbackResponse });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { text: `System Failure: ${errorMessage}` },
      { status: 500 },
    );
  }
}
