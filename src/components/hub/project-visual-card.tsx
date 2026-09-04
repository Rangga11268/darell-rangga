"use client";

import Image from "next/image";
import { Project } from "@/app/data/projects";
import { Lock, Trophy, DeviceMobile } from "@phosphor-icons/react";

export function ProjectVisualCard({ project }: { project: Project }) {
  if (project.id === "tujago") {
    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">
            tujago-bus-ticketing.internal
          </span>
          <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[9px] font-mono font-semibold">
            2025 Shipped
          </span>
        </div>

        <div className="flex flex-col items-center justify-center my-auto py-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 shadow-sm mb-1.5">
            <Lock size={14} weight="fill" className="text-zinc-200" />
            <span className="text-xs font-bold text-zinc-100 font-display">
              Atomic Database Locking Active
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 font-mono">
            Zero Double-Booking Guarantee • Modern Monolith
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-200 font-semibold">
            Laravel 12 + Inertia + Vue 3
          </span>
          <span className="text-zinc-300 font-semibold">
            High Concurrency Safe
          </span>
        </div>
      </div>
    );
  }

  if (project.id === "titik-aman") {
    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">
            titikaman-safety-network.civic
          </span>
          <span className="px-2 py-0.5 rounded-md bg-foreground/15 text-foreground text-[9px] font-mono font-semibold flex items-center gap-1">
            <Trophy size={11} weight="fill" />
            Juara 1 IT Bootcamp 2026
          </span>
        </div>

        <div className="flex items-center justify-center gap-3.5 my-auto py-1">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shadow-sm shrink-0">
            <Image
              src="/img/saya/trophy-juara.jpg"
              alt="Piala Juara 1"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-100 font-display">
              Citizen Safety & Real-Time SOS
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              Laravel Reverb WebSockets • Lead of 11 Engineers
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-200 font-semibold">
            Laravel 12 + Reverb + MySQL
          </span>
          <span className="text-zinc-300 font-semibold">Black-Box Tested</span>
        </div>
      </div>
    );
  }

  if (project.id === "makarya") {
    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">
            makarya.mahasiswa-umkm.id
          </span>
          <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[9px] font-mono font-semibold">
            Skripsi UBSI 2026
          </span>
        </div>

        <div className="flex items-center justify-center gap-3.5 my-auto py-1">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shadow-sm shrink-0">
            <Image
              src="/img/makarya-hero.webp"
              alt="Makarya"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-100 font-display">
              Micro-Freelancing Platform
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              Escrow Protection • Max Rp 2.000.000 / Proyek
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-200 font-semibold">
            FastAPI + React 18 + React Native
          </span>
          <span className="text-emerald-400 font-semibold">Midtrans Escrow</span>
        </div>
      </div>
    );
  }

  if (project.id === "faktanesia") {
    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">
            faktanesia.vercel.app
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-semibold">
            Live Vercel
          </span>
        </div>

        <div className="flex items-center justify-center gap-3.5 my-auto py-1">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shadow-sm shrink-0 bg-white p-1">
            <Image
              src="/img/faktanesia-logo.png"
              alt="FaktaNesia"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-100 font-display">
              AI Hoax Detector Gazette
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              Neo-Brutalist Newspaper • Chrome Extension
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-200 font-semibold">
            TF-IDF + Logistic Regression
          </span>
          <span className="text-zinc-300 font-semibold">Hugging Face API</span>
        </div>
      </div>
    );
  }

  if (project.id === "srb-motor-v3") {
    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">
            srb-motor-dealership.v3
          </span>
          <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[9px] font-mono font-semibold">
            2025 Shipped
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 my-auto py-1">
          <div className="relative w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center shrink-0">
            <Image
              src="/img/logo_srb.webp"
              alt="SRB Motor"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-100 font-display">
              Dealership Command Center
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              Live Credit Simulator & Telemetry
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-200 font-semibold">
            React 19 + Laravel 12
          </span>
          <span className="text-zinc-300 font-semibold">Command Center</span>
        </div>
      </div>
    );
  }

  if (project.id === "tirtasense") {
    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-border/80 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">
            tirtasense-flood-radar.ai
          </span>
          <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[9px] font-mono font-semibold">
            2025 Edge AI
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 my-auto py-1">
          <div className="relative w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center shrink-0">
            <Image
              src="/img/logo_tirtasense.png"
              alt="TirtaSense"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-100 font-display">
              Edge-AI Flood Telemetry
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              Browser ONNX Inference • Zero Server Lag
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-200 font-semibold">
            ONNX Runtime Web + Scikit
          </span>
          <span className="text-zinc-300 font-semibold">Bekasi Stream</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted/60 border border-border/60">
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-background/90 text-foreground text-[10px] font-bold shadow-xs">
        {project.year}
      </span>
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
        {project.isLive && (
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[9px] font-mono font-bold flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live Web
          </span>
        )}
        {project.hasMobileApp && (
          <span className="px-2 py-0.5 rounded-md bg-indigo-600/90 text-white text-[9px] font-mono font-bold flex items-center gap-1 shadow-sm">
            <DeviceMobile size={11} weight="bold" />
            App Ready
          </span>
        )}
      </div>
    </div>
  );
}
