"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/providers/language-provider";
import { TabKey } from "./types";
import {
  Image as ImageIcon,
  Gif,
  ChartBar,
  Smiley,
  CalendarCheck,
  MapPin,
  PaperPlaneTilt,
} from "@phosphor-icons/react";

interface ComposeBoxProps {
  onSelectTab: (tab: TabKey) => void;
  onPostMessage?: (msg: string) => void;
}

export function ComposeBox({ onSelectTab, onPostMessage }: ComposeBoxProps) {
  const { language } = useLanguage();
  const isId = language === "id";
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (onPostMessage) onPostMessage(text);
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setText("");
      onSelectTab("contact");
    }, 800);
  };

  return (
    <div className="p-3.5 sm:p-4 border-b border-border/60 bg-background/50">
      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/80 shrink-0">
          <Image
            src="/img/saya/saya1.webp"
            alt="Darell Rangga"
            fill
            className="object-cover"
          />
        </div>

        <div className="grow min-w-0">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder={
              isId
                ? "Ada tawaran rekayasa, freelance, atau pertanyaan stack untuk Darell?"
                : "What's happening? Ask Darell about tech stack or project inquiry..."
            }
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm sm:text-base resize-none outline-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-1">
            <div className="flex items-center gap-1 sm:gap-2 text-primary">
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                title="Tambahkan Media"
              >
                <ImageIcon size={18} weight="bold" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                title="GIF"
              >
                <Gif size={18} weight="bold" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                title="Polling"
              >
                <ChartBar size={18} weight="bold" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                title="Emoji"
              >
                <Smiley size={18} weight="bold" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer hidden sm:block"
                title="Jadwalkan Wawancara"
              >
                <CalendarCheck size={18} weight="bold" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors cursor-pointer hidden sm:block"
                title="Lokasi (Bekasi, ID)"
              >
                <MapPin size={18} weight="bold" />
              </button>
            </div>

            <button
              onClick={handlePost}
              disabled={!text.trim()}
              className="py-1.5 px-4 rounded-full bg-foreground text-background font-bold text-xs hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PaperPlaneTilt size={14} weight="bold" />
              <span>{posted ? (isId ? "Terkirim!" : "Sent!") : (isId ? "Posting" : "Post")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
