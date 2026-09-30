"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "@phosphor-icons/react";

interface LiveClockProps {
  showIcon?: boolean;
  suffix?: string;
  className?: string;
}

export function LiveClock({ showIcon = true, suffix = "", className = "" }: LiveClockProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        })
      );
    };

    updateTime();
    // Update every 10 seconds — zero impact on performance, ultra responsive
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div className={className}>
      {showIcon && <Clock size={12} weight="bold" className="shrink-0" />}
      <span>
        {timeStr}
        {suffix ? ` ${suffix}` : ""}
      </span>
    </div>
  );
}
