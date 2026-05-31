"use client";

import { useState } from "react";
import { useLanguage } from "@/app/providers/language-provider";
import { FileText, SealCheck, WarningOctagon, ArrowClockwise, Sparkle, CircleNotch } from "@phosphor-icons/react";

interface MatchResult {
  score: number;
  role: string;
  strengths: string[];
  gaps: string[];
  reasoning: string;
}

export function JobMatcher() {
  const { language } = useLanguage();
  const [jobdesc, setJobdesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobdesc.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/match-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobdesc }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal memproses analisis.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal terhubung ke server.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobdesc("");
    setResult(null);
    setError(null);
  };

  return (
    <section id="evaluator" className="bg-paper border-b-rule-thick border-primary py-16">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Column 1: Deskripsi Evaluasi */}
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
                <Sparkle size={22} weight="fill" />
              </div>
              <h2 className="headline-md uppercase leading-tight">
                {language === "id" ? "Evaluator Jobdesc" : "Jobdesc Evaluator"}
              </h2>
            </div>
            <p className="editor-note text-on-surface-variant mb-6 leading-relaxed">
              {language === "id"
                ? "Apakah keahlian saya selaras dengan kebutuhan tim Anda? Tempel deskripsi pekerjaan (Jobdesc) di sini untuk menganalisis kecocokan secara real-time dengan bantuan AI."
                : "Do my skills align with your team's needs? Paste a job description here to analyze suitability in real-time powered by AI."}
            </p>
            <div className="border border-primary border-dashed p-4 bg-primary/5 text-xs">
              <span className="font-bold uppercase block mb-1 text-[10px] opacity-40">Notice:</span>
              {language === "id"
                ? "Analisis ini membandingkan data index skill, tahun proyek, dan tech-stack asli milik Darell secara objektif."
                : "This analysis objectively evaluates the index of skills, project years, and tech-stack of Darell."}
            </div>
          </div>

          {/* Column 2: Form & Input / Report Card */}
          <div className="w-full lg:w-2/3">
            {!result ? (
              <form onSubmit={handleMatch} className="flex flex-col gap-4 border border-primary p-6 md:p-8 bg-background shadow-[8px_8px_0px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-2 border-b border-primary/20 pb-3">
                  <FileText size={18} />
                  <span className="label-caps text-xs font-bold opacity-60">
                    {language === "id" ? "TEMPEL DOKUMEN LOWONGAN" : "PASTE OPPORTUNITY DETAILS"}
                  </span>
                </div>
                
                <textarea
                  value={jobdesc}
                  onChange={(e) => setJobdesc(e.target.value)}
                  placeholder={
                    language === "id"
                      ? "Tempel kebutuhan pekerjaan (e.g. membutuhkan developer Laravel, Next.js, React, berpengalaman database Supabase...)"
                      : "Paste the job description (e.g. looking for a developer with Laravel, Next.js, React, database experience...)"
                  }
                  rows={8}
                  required
                  className="w-full p-4 border border-primary bg-background focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs uppercase"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary py-4 text-xs font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <CircleNotch size={16} className="animate-spin" />
                      {language === "id" ? "MENGANALISIS KESESUAIAN..." : "EVALUATING COMPATIBILITY..."}
                    </>
                  ) : (
                    <>
                      <Sparkle size={16} weight="bold" />
                      {language === "id" ? "MULAI EVALUASI" : "START EVALUATION"}
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-red-500 text-xs mt-2 italic font-mono uppercase">{error}</p>
                )}
              </form>
            ) : (
              /* Report Card Display (Newspaper Clipping style) */
              <div className="border-rule-thick border-primary p-6 md:p-8 bg-paper shadow-[12px_12px_0px_rgba(0,0,0,0.2)] flex flex-col gap-6 relative overflow-hidden">
                {/* Print Layout Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-primary pb-4 gap-4">
                  <div>
                    <span className="label-caps text-[9px] opacity-40 block">COMPATIBILITY ARCHIVE REPORT</span>
                    <h3 className="headline-sm uppercase text-primary leading-tight font-serif mt-1">
                      {result.role}
                    </h3>
                  </div>
                  
                  {/* Suitability Stamp / Circle */}
                  <div className="flex items-center gap-2 border border-primary px-4 py-2 bg-primary/5 rounded-full font-bold">
                    <span className="text-2xl font-serif">{result.score}%</span>
                    <span className="label-caps text-[9px] opacity-60">MATCH</span>
                  </div>
                </div>

                {/* Reasoning Box */}
                <div>
                  <h4 className="label-caps text-xs opacity-40 border-b border-primary/20 pb-1 mb-3">EVALUATION DESPATCH</h4>
                  <p className="body-md italic leading-relaxed text-on-surface font-serif text-base">
                    &quot;{result.reasoning}&quot;
                  </p>
                </div>

                {/* Strengths & Gaps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths Column */}
                  <div>
                    <h4 className="label-caps text-[10px] text-green-700 dark:text-green-400 border-b border-primary/20 pb-1 mb-4 flex items-center gap-1.5 font-bold">
                      <SealCheck size={16} weight="fill" />
                      {language === "id" ? "KELEBIHAN PROFILE" : "KEY STRENGTHS"}
                    </h4>
                    <ul className="space-y-3">
                      {result.strengths.map((str, i) => (
                        <li key={i} className="body-md text-xs flex gap-3 text-on-surface">
                          <span className="font-mono opacity-30">[{i+1}]</span>
                          {str}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gaps Column */}
                  <div>
                    <h4 className="label-caps text-[10px] text-yellow-700 dark:text-yellow-400 border-b border-primary/20 pb-1 mb-4 flex items-center gap-1.5 font-bold">
                      <WarningOctagon size={16} weight="fill" />
                      {language === "id" ? "KESENJANGAN SKILL" : "POTENTIAL GAPS"}
                    </h4>
                    <ul className="space-y-3">
                      {result.gaps.map((gap, i) => (
                        <li key={i} className="body-md text-xs flex gap-3 text-on-surface">
                          <span className="font-mono opacity-30">[{i+1}]</span>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 border border-primary bg-background hover:bg-primary hover:text-primary-foreground py-3 text-xs font-bold uppercase transition-all mt-4 cursor-pointer"
                >
                  <ArrowClockwise size={14} />
                  {language === "id" ? "EVALUASI ULANG" : "EVALUATE ANOTHER JOBDESC"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
