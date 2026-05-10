"use client";

import { useLanguage } from "@/app/providers/language-provider";
import { ArrowUp, ArrowDown, ChartLineUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function MarketReport() {
  const { language } = useLanguage();

  const marketData = [
    { label: "NEXTJS", value: "15.5.9", change: "+0.4%", up: true },
    { label: "LARAVEL", value: "11.0", change: "+0.2%", up: true },
    { label: "REACT", value: "19.0", change: "STABLE", up: true },
    { label: "TAILWIND", value: "4.0", change: "+1.5%", up: true },
    { label: "TYPESCRIPT", value: "5.7", change: "+0.8%", up: true },
    { label: "NODEJS", value: "22.0", change: "STABLE", up: true }
  ];

  return (
    <div className="w-full border-y hairline-y border-primary/20 py-1.5 mb-8 overflow-hidden relative bg-paper/50 backdrop-blur-sm">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop flex items-center">
        <div className="flex items-center gap-2 label-caps text-[9px] font-bold border-r hairline-r border-primary/20 pr-4 mr-4 shrink-0 bg-paper z-10">
          <ChartLineUp size={14} className="text-primary" />
          <span className="hidden sm:inline">TECH MARKET REPORT:</span>
          <span className="sm:hidden text-primary">LIVE:</span>
        </div>
        
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              {marketData.map((data) => (
                <div key={`${i}-${data.label}`} className="flex items-center gap-2">
                  <span className="label-caps text-[9px] opacity-40">{data.label}</span>
                  <span className="font-mono text-[10px] font-bold">{data.value}</span>
                  <span className={cn(
                    "text-[9px] font-bold flex items-center gap-0.5",
                    data.change === "STABLE" ? "opacity-30" : data.up ? "text-green-600" : "text-red-600"
                  )}>
                    {data.change !== "STABLE" && (data.up ? <ArrowUp size={8} weight="bold" /> : <ArrowDown size={8} weight="bold" />)}
                    {data.change}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Side Fades for the ticker */}
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-paper to-transparent z-[5]" />
      </div>
    </div>
  );
}
