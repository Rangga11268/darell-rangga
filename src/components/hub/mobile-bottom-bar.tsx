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

interface MobileBottomBarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export function MobileBottomBar({
  activeTab,
  onSelectTab,
}: MobileBottomBarProps) {
  const { language } = useLanguage();
  const isId = language === "id";

  const navItems = [
    {
      key: "why-hire" as TabKey,
      label: isId ? "Beranda" : "Home",
      icon: House,
    },
    {
      key: "projects" as TabKey,
      label: isId ? "Karya" : "Projects",
      icon: Code,
      badge: "12",
    },
    {
      key: "experience" as TabKey,
      label: isId ? "Prestasi" : "Highlights",
      icon: Trophy,
    },
    { key: "skills" as TabKey, label: isId ? "Stack" : "Stack", icon: Cpu },
    {
      key: "contact" as TabKey,
      label: isId ? "Pesan" : "Messages",
      icon: ChatCircleDots,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/70 py-1.5 px-4 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;
        return (
          <button
            key={item.key}
            onClick={() => {
              onSelectTab(item.key);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? "text-foreground font-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="relative">
              <Icon size={22} weight={isActive ? "fill" : "regular"} />
              {item.key === "projects" && !isActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5" />
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
