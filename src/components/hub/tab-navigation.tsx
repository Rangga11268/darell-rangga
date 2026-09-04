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

  const tabs: {
    key: TabKey;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    { key: "why-hire", label: isId ? "Utas Utama" : "Story Feed", icon: House },
    {
      key: "projects",
      label: isId ? "Karya Rilis" : "Projects",
      icon: Code,
      badge: "12",
    },
    {
      key: "experience",
      label: isId ? "Pencapaian" : "Highlights",
      icon: Trophy,
      badge: "Juara 1",
    },
    { key: "skills", label: isId ? "Keahlian" : "Tech Stack", icon: Cpu },
    {
      key: "contact",
      label: isId ? "Hubungi Saya" : "Get in Touch",
      icon: ChatCircleDots,
    },
  ];

  return (
    <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border/60 select-none">
      {/* Mobile: Equal 5-column Icon-Only Tab Bar (No horizontal scrolling) */}
      <div className="grid grid-cols-5 md:hidden w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`py-3 flex items-center justify-center relative transition-all cursor-pointer active:scale-90 ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={tab.label}
              aria-label={tab.label}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={21}
                  weight={isActive ? "fill" : "regular"}
                  className={`transition-all ${
                    isActive
                      ? "text-foreground scale-105"
                      : "text-muted-foreground"
                  }`}
                />
                {tab.badge === "Juara 1" && (
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-background"
                    title="Juara 1"
                  />
                )}
                {tab.key === "projects" && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 text-[9px] font-mono font-bold px-1 rounded-full leading-tight ${
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground border border-border/80"
                    }`}
                  >
                    12
                  </span>
                )}
              </div>

              {/* Active Indicator Underline (X / Twitter style indicator) */}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-foreground rounded-full" />
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
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
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
