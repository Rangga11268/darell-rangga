"use client";

import { useState } from "react";
import Image from "next/image";
import { Laptop, Phone, ArrowDown } from "@phosphor-icons/react";

interface DeviceMockupProps {
  imageUrl: string;
  title: string;
  defaultMode?: "laptop" | "phone";
  allowToggle?: boolean;
}

export function DeviceMockup({
  imageUrl,
  title,
  defaultMode = "laptop",
  allowToggle = true,
}: DeviceMockupProps) {
  const [mode, setMode] = useState<"laptop" | "phone">(defaultMode);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Device Toggle Selector */}
      {allowToggle && (
        <div className="flex gap-2 mb-6 bg-paper border border-primary/20 p-1.5 rounded-full shadow-sm z-10">
          <button
            onClick={() => setMode("laptop")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs label-caps font-bold transition-all ${
              mode === "laptop"
                ? "bg-primary text-paper"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            <Laptop size={16} weight="bold" />
            Laptop View
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs label-caps font-bold transition-all ${
              mode === "phone"
                ? "bg-primary text-paper"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            <Phone size={16} weight="bold" />
            Mobile View
          </button>
        </div>
      )}

      {/* Mockup Container */}
      <div className="w-full flex justify-center items-center py-4">
        {mode === "laptop" ? (
          /* --- LAPTOP MOCKUP --- */
          <div className="w-full max-w-[640px] flex flex-col items-center group relative">
            {/* Screen Bezel */}
            <div className="w-full aspect-[16/10] bg-zinc-900 p-[3%] rounded-t-[20px] border-t-2 border-x-2 border-zinc-700 shadow-2xl relative">
              {/* Webcam */}
              <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-800 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-900" />
              </div>
              
              {/* Screen Screen Display */}
              <div className="w-full h-full bg-zinc-950 overflow-hidden relative border border-zinc-800 rounded shadow-inner group/screen">
                {/* Scroll Indicator Tip */}
                <div className="absolute bottom-2 right-2 z-10 bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1 text-[8px] uppercase font-bold tracking-wider">
                  <ArrowDown size={10} className="animate-bounce" /> Hover to scroll
                </div>

                {/* Inner Image (Simulates web page layout with vertical transition on hover) */}
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute w-full h-[250%] transition-transform duration-[4000ms] ease-in-out group-hover/screen:-translate-y-[60%]">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover object-top grayscale contrast-125 sepia-[0.1]"
                      sizes="(max-width: 768px) 100vw, 640px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base (Hinges & Keyboard Deck) */}
            <div className="w-[108%] h-3 bg-zinc-700 rounded-b-lg border-b border-zinc-800 shadow-lg relative flex justify-center">
              {/* Opening Notch */}
              <div className="w-20 h-1.5 bg-zinc-800 rounded-b-md" />
            </div>
            {/* Rubber Feet Shadow */}
            <div className="w-[96%] h-2 bg-black/40 rounded-full blur-sm -mt-0.5" />
          </div>
        ) : (
          /* --- SMARTPHONE MOCKUP --- */
          <div className="w-[280px] sm:w-[300px] flex flex-col items-center group relative">
            {/* Device Body */}
            <div className="w-full aspect-[9/19] bg-zinc-900 p-2.5 rounded-[40px] border-4 border-zinc-700 shadow-2xl relative flex flex-col">
              
              {/* Speaker & Sensor Notch (Dynamic Island Style) */}
              <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-between px-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-10 h-0.5 bg-zinc-900 rounded" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
              </div>

              {/* Volume & Side Buttons */}
              <div className="absolute -left-[6px] top-[15%] w-[3px] h-10 bg-zinc-600 rounded-l" />
              <div className="absolute -left-[6px] top-[22%] w-[3px] h-10 bg-zinc-600 rounded-l" />
              <div className="absolute -right-[6px] top-[18%] w-[3px] h-14 bg-zinc-600 rounded-r" />

              {/* Screen Display */}
              <div className="w-full h-full bg-zinc-950 rounded-[30px] overflow-hidden relative border border-zinc-800 shadow-inner group/screen">
                {/* Scroll Indicator Tip */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white rounded-full px-2 py-1 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1 text-[8px] uppercase font-bold tracking-wider">
                  <ArrowDown size={10} className="animate-bounce" /> Hover to scroll
                </div>

                {/* Inner Image */}
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute w-full h-[300%] transition-transform duration-[6000ms] ease-in-out group-hover/screen:-translate-y-[66.6%]">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover object-top grayscale contrast-125 sepia-[0.1]"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Shadow under phone */}
            <div className="w-[85%] h-3 bg-black/40 rounded-full blur-md mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
