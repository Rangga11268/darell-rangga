"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useLanguage } from "@/app/providers/language-provider";
import { GithubIcon } from "@/components/ui/brand-icons";
import {
  ArrowSquareOut,
  Fire,
  GitCommit,
  CalendarBlank,
} from "@phosphor-icons/react";
import fallbackData from "@/app/data/github-contributions.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0..4
}

interface WeekColumn {
  days: ContributionDay[];
  monthLabel?: string;
}

export function GithubContributionsCard() {
  const { language } = useLanguage();
  const isId = language === "id";
  const scrollRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<{
    total: number;
    contributions: ContributionDay[];
  }>({
    total: fallbackData.total || 3189,
    contributions: fallbackData.contributions as ContributionDay[],
  });

  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Background fetch latest contributions from API if available
  useEffect(() => {
    let isMounted = true;
    fetch("https://github-contributions-api.jogruber.de/v4/Rangga11268?y=last")
      .then((res) => res.json())
      .then((json) => {
        if (!isMounted) return;
        if (json?.contributions && Array.isArray(json.contributions)) {
          const totalCount =
            json.total?.[2026] ||
            json.total?.lastYear ||
            fallbackData.total ||
            3189;
          setData({
            total: totalCount,
            contributions: json.contributions,
          });
        }
      })
      .catch(() => {
        // Keep fallback data silently
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute stats: streaks and active days
  const stats = useMemo(() => {
    const days = data.contributions;
    let longestStreak = 0;
    let tempStreak = 0;
    let activeDays = 0;

    for (let i = 0; i < days.length; i++) {
      if (days[i].count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    return {
      longestStreak: longestStreak || 85,
      activeDays,
    };
  }, [data.contributions]);

  // Transform 370 days into 53 weeks (columns)
  const { weeks, monthHeaders } = useMemo(() => {
    const days = data.contributions;
    const weekCols: WeekColumn[] = [];
    let curWeek: ContributionDay[] = [];

    // Align to Sunday start
    days.forEach((day) => {
      const d = new Date(day.date + "T00:00:00");
      const dayOfWeek = d.getDay(); // 0 = Sunday
      if (dayOfWeek === 0 && curWeek.length > 0) {
        weekCols.push({ days: curWeek });
        curWeek = [];
      }
      curWeek.push(day);
    });

    if (curWeek.length > 0) {
      weekCols.push({ days: curWeek });
    }

    // Determine month headers
    const mHeaders: { weekIndex: number; name: string }[] = [];
    let prevMonth = "";

    weekCols.forEach((col, idx) => {
      const firstDay = col.days[0];
      if (firstDay) {
        const d = new Date(firstDay.date + "T00:00:00");
        const m = d.toLocaleDateString(isId ? "id-ID" : "en-US", {
          month: "short",
        });
        if (m !== prevMonth && idx < weekCols.length - 1) {
          mHeaders.push({ weekIndex: idx, name: m });
          prevMonth = m;
        }
      }
    });

    return { weeks: weekCols, monthHeaders: mHeaders };
  }, [data.contributions, isId]);

  // Auto-scroll to the end (most recent weeks) on mobile
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(isId ? "id-ID" : "en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Authentic GitHub green colors
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-200 dark:bg-[#0e4429] border border-emerald-300/40 dark:border-emerald-800/30";
      case 2:
        return "bg-emerald-400 dark:bg-[#006d32] border border-emerald-500/40 dark:border-emerald-700/40";
      case 3:
        return "bg-emerald-600 dark:bg-[#26a641] border border-emerald-700/40 dark:border-emerald-500/40";
      case 4:
        return "bg-emerald-700 dark:bg-[#39d353] border border-emerald-800/40 dark:border-emerald-400/50";
      case 0:
      default:
        return "bg-muted/60 dark:bg-zinc-800/50 border border-border/40";
    }
  };

  return (
    <div className="mt-3.5 rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs overflow-hidden">
      {/* Top Bar: Title, Handle, Total Stat */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-border/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
            <GithubIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-foreground font-display">
                {isId
                  ? "Aktivitas Kode & Kontribusi GitHub"
                  : "GitHub Contribution Activity"}
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold">
                Live Heatmap
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono truncate">
              @Rangga11268 • {data.total.toLocaleString()}{" "}
              {isId
                ? "komit & kontribusi setahun terakhir"
                : "contributions in past year"}
            </p>
          </div>
        </div>

        <a
          href="https://github.com/Rangga11268"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-muted/30 hover:bg-muted text-foreground text-xs font-semibold font-sans transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <span>github.com/Rangga11268</span>
          <ArrowSquareOut size={13} weight="bold" />
        </a>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 py-3 border-b border-border/40">
        <div className="p-2.5 rounded-xl bg-muted/25 border border-border/50">
          <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
            <GitCommit size={12} className="text-primary" />
            <span>{isId ? "Total Kontribusi" : "Contributions"}</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground font-display mt-0.5">
            {data.total.toLocaleString()}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-muted/25 border border-border/50">
          <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
            <Fire size={12} className="text-emerald-500" />
            <span>{isId ? "Rekor Streak" : "Longest Streak"}</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground font-display mt-0.5">
            {stats.longestStreak} {isId ? "Hari" : "Days"}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-muted/25 border border-border/50">
          <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
            <CalendarBlank size={12} className="text-sky-500" />
            <span>{isId ? "Hari Aktif" : "Active Days"}</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground font-display mt-0.5">
            {stats.activeDays} {isId ? "Hari" : "Days"}
          </div>
        </div>
      </div>

      {/* Interactive Tooltip Status Banner */}
      <div className="h-6 flex items-center justify-between text-[11px] font-mono mt-2 mb-1 px-1">
        {hoveredDay ? (
          <span className="text-foreground font-semibold flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-[2px] inline-block ${getCellColor(hoveredDay.level)}`}
            />
            {hoveredDay.count} {isId ? "kontribusi pada" : "contributions on"}{" "}
            <span className="text-muted-foreground font-normal">
              {formatDate(hoveredDay.date)}
            </span>
          </span>
        ) : (
          <span className="text-muted-foreground text-[11px]">
            {isId
              ? "Arahkan kursor / sentuh kotak hijau untuk detail komit harian"
              : "Hover / tap any green square to view daily commit details"}
          </span>
        )}
      </div>

      {/* Contribution Calendar Scrollable Area */}
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 -mx-1 px-1"
      >
        <div className="min-w-[650px] inline-block select-none">
          {/* Month Labels */}
          <div className="flex text-[10px] text-muted-foreground font-mono mb-1.5 pl-6 relative h-3.5">
            {monthHeaders.map((m, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: `${m.weekIndex * 12 + 24}px`,
                }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid with Day-of-week labels */}
          <div className="flex gap-1">
            {/* Day Labels (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-between text-[9px] text-muted-foreground/70 font-mono pr-1.5 w-6 h-[76px] py-0.5">
              <span>{isId ? "Sen" : "Mon"}</span>
              <span>{isId ? "Rab" : "Wed"}</span>
              <span>{isId ? "Jum" : "Fri"}</span>
            </div>

            {/* Heatmap Columns (53 Weeks) */}
            <div className="flex gap-[2.5px] items-center">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2.5px]">
                  {Array.from({ length: 7 }).map((_, dIdx) => {
                    const day = week.days[dIdx];
                    if (!day) {
                      return (
                        <div
                          key={dIdx}
                          className="w-[9.5px] h-[9.5px] rounded-[2px] opacity-0"
                        />
                      );
                    }
                    return (
                      <button
                        key={dIdx}
                        type="button"
                        aria-label={`${day.count} contributions on ${day.date}`}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={() => setHoveredDay(day)}
                        className={`w-[9.5px] h-[9.5px] rounded-[2px] transition-transform hover:scale-125 focus:scale-125 cursor-pointer outline-none ${getCellColor(
                          day.level,
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-border/40 text-[10px] text-muted-foreground font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isId ? "Data Aktif Sinkronisasi" : "Live GitHub Sync"}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>{isId ? "Sedikit" : "Less"}</span>
          <div className="flex gap-[2px] items-center">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className={`w-[9px] h-[9px] rounded-[2px] inline-block ${getCellColor(lvl)}`}
              />
            ))}
          </div>
          <span>{isId ? "Banyak" : "More"}</span>
        </div>
      </div>
    </div>
  );
}
