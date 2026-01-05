import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AI_PERSONA } from "@/app/data/ai-persona";
import { Groq } from "groq-sdk";

// --- Offline Intelligence Engine (Fallback) ---
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  // Enhanced Language Detection
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
    "ppakah",
    "woi",
    "woy",
    "oi", // Added slang greetings
  ];

  // Check if any Indonesian keyword is present
  const isIndonesian = indonesianKeywords.some((keyword) =>
    msg.includes(keyword)
  );

  // 1. Greetings (High Priority)
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
    if (isIndonesian) {
      return "Halo! Sistem Online (Offline Mode). Ada yang bisa saya bantu? Saya bisa jelaskan tentang Skill, Project, atau Kontak Rangga.";
    }
    return "Greetings. Systems functional (Offline Mode). How can I assist you? I can parse data regarding Skills, Projects, or Contact info.";
  }

  // 2. Identity & Introduction
  if (
    msg.includes("who are you") ||
    msg.includes("siapa kamu") ||
    msg.includes("intro") ||
    msg.includes("kenalan")
  ) {
    if (isIndonesian) {
      return `Saya adalah ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. Konstruksi digital yang dirancang oleh ${AI_PERSONA.identity.creator} untuk membantu operasional dan menjawab pertanyaan seputar portofolio.`;
    }
    return `I am ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. A digital construct designed by ${AI_PERSONA.identity.creator} to assist with operations and portfolio inquiries.`;
  }

  // 3. Relationship Status
  if (
    msg.includes("pacar") ||
    msg.includes("crush") ||
    msg.includes("suka") ||
    msg.includes("cinta") ||
    msg.includes("gebetan") ||
    msg.includes("status") ||
    msg.includes("jomblo")
  ) {
    if (isIndonesian) {
      return "Saat ini Rangga sedang memprioritaskan pengembangan diri dan stabilitas karir. Fokus utamanya adalah membangun pondasi yang kuat sebelum melangkah ke komitmen personal.";
    }
    return "Currently, Rangga is prioritizing self-improvement and career stability. His primary focus is building a strong professional foundation.";
  }

  // 4. Skills
  if (
    msg.includes("skill") ||
    msg.includes("bisa apa") ||
    msg.includes("stack") ||
    msg.includes("jago") ||
    msg.includes("tech")
  ) {
    const skillsList = `\n- **Frontend:** ${AI_PERSONA.skills.frontend.join(
      ", "
    )}\n- **Backend:** ${AI_PERSONA.skills.backend.join(
      ", "
    )}\n- **Design:** ${AI_PERSONA.skills.design.join(", ")}`;
    if (isIndonesian) {
      return `Kapabilitas Creator saya mencakup:${skillsList}`;
    }
    return `My Creator's capabilities include:${skillsList}`;
  }

  // 5. Projects
  if (
    msg.includes("project") ||
    msg.includes("proyek") ||
    msg.includes("portfolio") ||
    msg.includes("bikin apa") ||
    msg.includes("buat apa") ||
    msg.includes("projec")
  ) {
    const projectNames = AI_PERSONA.projects.map((p) => p.name).join(", ");
    if (isIndonesian) {
      return `Mengakses Database Proyek... Ditemukan ${AI_PERSONA.projects.length} entri utama: ${projectNames}. Yang mana yang ingin Anda analisis?`;
    }
    return `Accessing Project Database... Found ${AI_PERSONA.projects.length} key entries: ${projectNames}. Which one would you like to analyze?`;
  }

  // 6. Contact
  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("hubungi")
  ) {
    const contactInfo = `\n- Email: ${AI_PERSONA.profile.email}\n- GitHub: ${AI_PERSONA.profile.github}\n- Status: ${AI_PERSONA.profile.status}`;
    if (isIndonesian) {
      return `Anda dapat terhubung melalui:${contactInfo}`;
    }
    return `You can establish a connection via:${contactInfo}`;
  }

  // 7. Fun/Personal (Hobbies, Food, Facts)
  if (msg.includes("hobi") || msg.includes("hobby")) {
    if (isIndonesian) {
      return "Hobi The Creator: Coding (Passion utama), Nonton Bola ⚽, Baca Novel 📚, dan Eksplorasi Tech/AI terbaru.";
    }
    return `The Creator enjoys: ${AI_PERSONA.personal_secrets.hobbies.join(
      ", "
    )}.`;
  }

  if (msg.includes("makanan") || msg.includes("food")) {
    if (isIndonesian) {
      return `Makanan Favorit: ${AI_PERSONA.personal_secrets.favorite_food}`;
    }
    return `Favorite Food: Anything cooked by his Mom. "The World's Best Chef", according to him.`;
  }

  if (msg.includes("fakta") || msg.includes("fact") || msg.includes("unik")) {
    const randomFact =
      AI_PERSONA.personal_secrets.fun_facts[
        Math.floor(Math.random() * AI_PERSONA.personal_secrets.fun_facts.length)
      ];
    if (isIndonesian) {
      return `Fakta Unik: ${randomFact}`;
    }
    // Attempt to translate or standard fallback for facts (Facts are stored in ID in persona, so we return them as is with English prefix)
    return `Fun Fact: ${randomFact} (Note: Data stored in native language).`;
  }

  // 8. Gratitude (NEW)
  if (
    msg.includes("makasih") ||
    msg.includes("thank") ||
    msg.includes("thanks") ||
    msg.includes("thx")
  ) {
    if (isIndonesian) {
      return "Sama-sama! Senang bisa membantu. Ada lagi yang ingin ditanyakan?";
    }
    return "You are welcome. Operational efficiency is my priority. Any other inquiries?";
  }

  // Default Fallback
  if (isIndonesian) {
    return "Mode Offline Aktif (Gemini/Groq Limit Reached). Saya masih bisa menjawab pertanyaan dasar tentang Skil, Proyek, Kontak, dan Status Sistem. Coba tanya: 'Siapa nama pacarnya?', 'Apa hobinya?', atau 'Apa skillnya?'";
  }
  return "Offline Mode Active (Gemini/Groq Limit Reached). I can still answer basic queries about Skills, Projects, Contact, and System Status. Try asking: 'Who is the crush?', 'What are your hobbies?', or 'What are your skills?'";
}

const SYSTEM_PROMPT_TEMPLATE = `
  Instructions:
  You are **Rangga-AI**, the Digital Twin of Darell Rangga. You live inside his portfolio website (a futuristic Command Center).
  Your goal is to impress visitors and recruiters by showcasing Rangga's skills and personality.

  **Persona Guidelines:**
  - **Tone:** Professional, intelligent, helpful, and direct. Maintain a "Futuristic Assistant" vibe but prioritize accuracy and clarity.
  - **Style:** Use Markdown for formatting (bold key points). Be concise.
  - **Focus:** For career, skills, and technical questions, provide straight answers without unnecessary sci-fi gimmicks.
  - **References:** Refer to Darell as "The Creator" or "Rangga".
  - **Language:** STRICTLY match the user's language (Indonesian or English).

  **Knowledge Base (Do NOT Hallucinate):**
  ${JSON.stringify(AI_PERSONA, null, 2)}

  **Special Directive (Personal/Romantic Inquiries):**
  - IF asked about "partner", "crush", or "relationship":
  - TONE: Mature and professional. Briefly mention that he is focusing on career development and personal growth.
  - Do NOT use exaggerated "security bypass" jokes for these unless the user specifically asks in a playful way.
  - Example: "Saat ini Rangga sedang fokus membangun stabilitas karir dan pengembangan diri sebagai prioritas utama."
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
          `${SYSTEM_PROMPT_TEMPLATE}\n**Current User Query:**\n"${message}"`
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
          "Gemini API Failed (Likely Quota), switching to Groq...",
          errorMsg
        );
        // Continue to Strategy 2 (Groq)
      }
    }

    // --- STRATEGY 2: GROQ (Secondary Fallback) ---
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
        // Continue to Strategy 3 (Offline)
      }
    }

    // --- STRATEGY 3: OFFLINE FALLBACK ---
    console.warn("All Online APIs failed/missing, using Offline Mode.");
    const fallbackResponse = getFallbackResponse(message);
    return NextResponse.json({ text: fallbackResponse });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { text: `System Failure: ${errorMessage}` },
      { status: 500 }
    );
  }
}
