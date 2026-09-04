"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { TabKey } from "./types";
import {
  House,
  Code,
  Trophy,
  Cpu,
  ChatCircleDots,
} from "@phosphor-icons/react";

interface TabNavigationProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export function TabNavigation({ activeTab, onSelectTab }: TabNavigationProps) {
  const { language } = useLanguage();
  const isId = language === "id";

  const tabs: { key: TabKey; label: string; icon: React.ElementType; badge?: string }[] = [
    { key: "why-hire", label: isId ? "Utas Utama" : "Story Feed", icon: House },
    { key: "projects", label: isId ? "Karya Rilis" : "Projects", icon: Code, badge: "12" },
    { key: "experience", label: isId ? "Pencapaian" : "Highlights", icon: Trophy, badge: "Juara 1" },
    { key: "skills", label: isId ? "Keahlian" : "Tech Stack", icon: Cpu },
    { key: "contact", label: isId ? "Hubungi Saya" : "Get in Touch", icon: ChatCircleDots },
  ];

  return (
    <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border/60 select-none">
      {/* Mobile: Horizontal scrollable M3 Pill Chips with zero cramped text */}
      <div className="flex md:hidden items-center gap-2 px-3 py-2.5 overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-foreground text-background font-bold shadow-xs"
                  : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted font-medium"
              }`}
            >
              <Icon
                size={14}
                weight={isActive ? "fill" : "bold"}
                className={isActive ? "text-background" : "text-muted-foreground"}
              />
              <span className="whitespace-nowrap">{tab.label}</span>

              {tab.badge && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-background/80 text-muted-foreground"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop (md+): Equal-width segmented M3 tabs */}
      <div className="hidden md:grid md:grid-cols-5 w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className="py-3.5 px-3 hover:bg-muted/40 transition-colors flex items-center justify-center relative cursor-pointer group"
            >
              <div className="flex items-center gap-2 relative">
                <Icon
                  size={17}
                  weight={isActive ? "fill" : "regular"}
                  className={`transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span
                  className={`text-sm transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-foreground font-black font-display"
                      : "text-muted-foreground font-medium group-hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </span>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                      tab.badge === "Juara 1"
                        ? "bg-foreground/10 text-foreground border border-foreground/15 font-bold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* M3 Active Underline Indicator */}
                {isActive && (
                  <span className="absolute -bottom-3.5 left-0 right-0 h-[3px] bg-primary rounded-full shadow-xs" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
