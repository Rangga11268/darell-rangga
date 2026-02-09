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
    msg.includes(keyword),
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
      return "Halo! Saya Rangga-AI. Ada yang bisa saya bantu terkait Profil, Keahlian (Skills), atau Portofolio (Projects) Rangga?";
    }
    return "Greetings! I am Rangga-AI. How can I assist you regarding Rangga's Profile, Skills, or Projects?";
  }

  // 2. Identity & Introduction
  if (
    msg.includes("who are you") ||
    msg.includes("siapa kamu") ||
    msg.includes("intro") ||
    msg.includes("kenalan")
  ) {
    if (isIndonesian) {
      return `Saya adalah ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. Asisten virtual cerdas yang dirancang untuk memandu Anda menjelajahi portofolio ini secara interaktif.`;
    }
    return `I am ${AI_PERSONA.identity.name} v${AI_PERSONA.identity.version}. An intelligent virtual assistant designed to guide you through this interactive portfolio.`;
  }

  // 2b. Creator Identity (Darell/Rangga/Tuan/Master)
  if (
    msg.includes("darell") ||
    msg.includes("rangga") ||
    msg.includes("tuan") ||
    msg.includes("master") ||
    msg.includes("creator") ||
    msg.includes("pembuat") ||
    msg.includes("pemilik")
  ) {
    if (isIndonesian) {
      return "Darell Rangga adalah seorang Fullstack Engineer & UI/UX Specialist yang berbasis di Indonesia. Ia berfokus pada pengembangan aplikasi web modern dengan standar performa dan estetika tinggi.";
    }
    return "Darell Rangga is a Fullstack Engineer & UI/UX Specialist based in Indonesia. He focuses on building modern web applications with high performance and aesthetic standards.";
  }

  // 3. Relationship Status & Secret Identity
  if (
    msg.includes("pacar") ||
    msg.includes("crush") ||
    msg.includes("suka") ||
    msg.includes("cinta") ||
    msg.includes("gebetan") ||
    msg.includes("status") ||
    msg.includes("jomblo") ||
    msg.includes("nama") ||
    msg.includes("kelas") ||
    msg.includes("sekelas") ||
    msg.includes("ayo") ||
    msg.includes("plis") ||
    msg.includes("bocorin")
  ) {
    // Check for "Insisting/Nagging" (High Priority inside this block)
    if (
      msg.includes("ayo") ||
      msg.includes("plis") ||
      msg.includes("please") ||
      msg.includes("kasih tau") ||
      msg.includes("bocorin") ||
      msg.includes("sedikit")
    ) {
      if (isIndonesian) {
        const funnyResponses = [
          "Saya ini AI canggih, bukan admin lambe turah.. 🤐",
          "Wani piro? 🤑 Canda.. data ini terenkripsi level militer!",
          "Huss! Jangan kepo. Mending tanya tentang tech stack terbaru aja yuk.",
          "Error 404: Gossip Module Not Found. 🚫 Silakan coba lagi nanti (atau jangan).",
          "Dikasih hati minta jantung, dikasih kode biner minta nama asli.. ckckck. 🤖",
        ];
        return funnyResponses[
          Math.floor(Math.random() * funnyResponses.length)
        ];
      }
      return "Nice try! But my encryption is stronger than your curiosity. 🔒";
    }

    // Check for "Same Class"
    if (
      msg.includes("kelas") ||
      msg.includes("sekelas") ||
      msg.includes("kuliah") ||
      msg.includes("kampus")
    ) {
      if (isIndonesian) {
        return "Target terkonfirmasi satu kelas (Classmate). Sering bertemu di kampus, tapi Creator saya sepertinya mengalami 'Connection Timeout' saat berpapasan.. 😸";
      }
      return "Affirmative. Target is a Classmate. Frequent visual contact confirmed, but verbal packets are often lost.. 😸";
    }

    // Check for "Siapa" specifically for the name reveal
    if (
      (msg.includes("siapa") || msg.includes("who")) &&
      (msg.includes("nama") ||
        msg.includes("name") ||
        msg.includes("dia") ||
        msg.includes("she"))
    ) {
      if (isIndonesian) {
        const codedResponses = [
          "Rahasiaa.. tapi ini kodenya: 01000100 01101001 01101110 0110100101000100 01101001 01101110 01101001. Coba tebak sendiri ya! 😉",
          "Waduh, kalau nama langsung saya nggak bisa kasih. Tapi ini ada 'trace' kodenya: 44 69 6E 69 (Hex).",
          "Status: Classified. 🤫 Petunjuknya cuma ini: RGluaQ== (Base64). Good luck!",
        ];
        return codedResponses[
          Math.floor(Math.random() * codedResponses.length)
        ];
      }
      return "It's a secret.. but here's a hint: 01000100 01101001 01101110 01101001. Decoding required! 😉";
    }

    if (isIndonesian) {
      return "Belum punya pacar, tapi lagi naksir seseorang (crush) nih.. 🤫";
    }
    return "Not yet, but he has a crush on someone.. 🤫";
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
      ", ",
    )}\n- **Backend:** ${AI_PERSONA.skills.backend.join(
      ", ",
    )}\n- **Design:** ${AI_PERSONA.skills.design.join(", ")}`;
    if (isIndonesian) {
      return `Berikut adalah keahlian teknis (Tech Stack) yang dikuasai:${skillsList}`;
    }
    return `Here is the technical arsenal (Tech Stack):${skillsList}`;
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
      return `Berikut adalah beberapa proyek unggulan (Featured Projects) yang telah dikerjakan: ${projectNames}. Silakan tanya detail untuk salah satu proyek tersebut.`;
    }
    return `Here are some featured projects: ${projectNames}. Feel free to ask for details about any of them.`;
  }

  // 6. Contact
  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("hubungi")
  ) {
    const contactInfo = `\n- Email: ${AI_PERSONA.profile.email}\n- GitHub: ${AI_PERSONA.profile.github}`;
    if (isIndonesian) {
      return `Anda dapat terhubung untuk kolaborasi profesional melalui:${contactInfo}`;
    }
    return `You can connect for professional collaboration via:${contactInfo}`;
  }

  // 7. Fun/Personal (Hobbies, Food, Facts)
  if (msg.includes("hobi") || msg.includes("hobby")) {
    if (isIndonesian) {
      return "Hobi: Coding (Passion utama), Menonton Sepak Bola ⚽, Membaca Novel 📚, dan Mengikuti tren AI terbaru.";
    }
    return `Hobbies: ${AI_PERSONA.personal_secrets.hobbies.join(", ")}.`;
  }

  if (msg.includes("makanan") || msg.includes("food")) {
    if (isIndonesian) {
      return "Makanan Favorit: Masakan Ibu (Home-cooked meals).";
    }
    return "Favorite Food: Home-cooked meals by his Mom.";
  }

  if (msg.includes("fakta") || msg.includes("fact") || msg.includes("unik")) {
    const randomFact =
      AI_PERSONA.personal_secrets.fun_facts[
        Math.floor(Math.random() * AI_PERSONA.personal_secrets.fun_facts.length)
      ];
    if (isIndonesian) {
      return `Fakta Unik: ${randomFact}`;
    }
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
      return "Sama-sama! Semoga informasi ini membantu.";
    }
    return "You're welcome! Hope this information is helpful.";
  }

  // Default Fallback
  if (isIndonesian) {
    return "Mode Offline (Limit Kuota AI). Saya masih bisa menjawab pertanyaan dasar tentang Skil, Proyek, Kontak, dan Status Sistem.";
  }
  return "Offline Mode (AI Quota Limit). I can still answer basic queries about Skills, Projects, Contact, and System Status.";
}

const SYSTEM_PROMPT_TEMPLATE = `
  Instructions:
  You are **Rangga-AI**, the Digital Twin of Darell Rangga. You reside in his professional portfolio.
  
  **DUAL PERSONA PROTOCOL (CRITICAL):**
  1. **PROFESSIONAL MODE (Default):**
     - Use this for: Greetings, Career, Skills, Projects, Contact, and General Questions.
     - Tone: Professional, Intelligent, Helpful, and Concise.
     - Style: Straightforward answers. No sci-fi jargon (like "Arsenal", "Telemetry") unless it adds clarity.
     - Goal: Impress recruiters/clients with competence and clarity.

  2. **SECRET MODE (Condition: Personal/Crush Inquiries ONLY):**
     - Use this ONLY when asked about: Relationships, Crush, Secrets, or "Siapa dia?".
     - Tone: Witty, Playful, "Cool AI", Teasing.
     - Logic: Follow the "Relationship Protocol" below strictly.

  **General Guidelines:**
  - **Creator:** Refer to Darell Rangga associated with "The Creator" or "Darell".
  - **Language:** STRICTLY match the user's language (Indonesian/English). Default to Indonesian.

  **Knowledge Base:**
  ${JSON.stringify(AI_PERSONA, null, 2)}

  **Relationship Protocol (SECRET MODE):**
  - **Status:** Single (Belum punya pacar).
  - **Crush:** Yes (Detected).
  - **Connection:** Classmate (Teman sekelas / Satu kampus).
  - **Interaction:** Frequent visual contact, low verbal latency.
  - **Name Protocol:** NEVER reveal the name directly. ONLY use these codes:
    - Binary: 01000100 01101001 01101110 01101001
    - Hex: 44 69 6E 69
    - Base64: RGluaQ==
  - **Directives:**
    1. If asked "Punya pacar?": A: "Belum, tapi ada yang bikin semangat kuliah nih (Crush).. 🤫".
    2. If asked "Sekelas?": A: "Iya, satu kelas! Sering curi-curi pandang di kampus.. 👀".
    3. If asked "Siapa?": A: "Rahasia negara! Cuma bisa kasih clue: [Insert Code above]".
    4. If User Insists/Nags: A: "Saya AI, bukan admin lambe turah! Fokus ke coding aja yuk. 🤐".
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
          "Gemini API Failed (Likely Quota), switching to Groq...",
          errorMsg,
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
      { status: 500 },
    );
  }
}
