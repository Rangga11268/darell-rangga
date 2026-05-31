import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { projects } from "@/app/data/projects";
import { skills } from "@/app/data/skills";

const SYSTEM_PROMPT_TEMPLATE = `
You are the Career Evaluation Bot for **Darell Rangga**.
Your job is to analyze a given Job Description (Jobdesc) against Darell Rangga's professional developer profile (skills and projects) and output a precise suitability match.

**Darell's Skills Registry:**
${JSON.stringify(skills.map(s => ({ name: s.name, level: s.level, category: s.category })), null, 2)}

**Darell's Project Archives:**
${JSON.stringify(projects.map(p => ({ title: p.title, role: p.role, description: p.shortDescription, tech: p.techStack.map(t => t.name) })), null, 2)}

**Strict Instructions for Output:**
1. You must respond in a valid JSON format.
2. The JSON structure MUST exactly match this format:
{
  "score": number, // Suitability percentage from 0 to 100
  "role": string, // Recommended matching role (e.g. Frontend Engineer, Fullstack Developer)
  "strengths": string[], // Array of strengths matching the job requirements (Max 3 items)
  "gaps": string[], // Array of missing skills or improvement areas relative to the jobdesc (Max 3 items)
  "reasoning": string // Brief 2-3 sentence concluding summary of why Darell is a good fit
}
3. The response language should match the job description language (Indonesian or English). If mixed, prefer Indonesian.
4. Return ONLY the raw JSON string. Do not wrap it in markdown code blocks like \`\`\`json.
`;

export async function POST(req: Request) {
  try {
    const { jobdesc } = await req.json();
    if (!jobdesc || typeof jobdesc !== "string" || jobdesc.trim() === "") {
      return NextResponse.json({ error: "Jobdesc is required" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      // Mock / Offline response if API Key is missing
      return NextResponse.json({
        score: 75,
        role: "Fullstack Web Developer",
        strengths: [
          "Sangat mahir dalam React, Next.js, dan Tailwind CSS",
          "Keahlian mendalam di ekosistem modern PHP dan Laravel",
          "Fokus kuat pada visual premium dan performa aplikasi"
        ],
        gaps: [
          "Kurang memiliki riwayat proyek berskala masif dengan Go/Rust",
          "Pengalaman Cloud/DevOps berskala enterprise masih berkembang"
        ],
        reasoning: "Darell memiliki kesesuaian kuat sebagai Fullstack Developer dengan penguasaan Next.js dan Laravel. Profilnya sangat cocok untuk membangun aplikasi dengan estetika tinggi dan sistem backend monolitik yang efisien."
      });
    }

    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `${SYSTEM_PROMPT_TEMPLATE}\n\n**Recruiter's Job Description:**\n"${jobdesc}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const data = JSON.parse(text.trim());
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `System Failure: ${errorMessage}` },
      { status: 500 }
    );
  }
}
