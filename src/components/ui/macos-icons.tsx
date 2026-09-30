"use client";

import React from "react";

// Apple macOS SF Symbols: Apple Silicon SoC / Activity Monitor Chip (Concurrency & Systems)
export function MacCpuIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Central Square Die */}
      <rect x="5" y="5" width="14" height="14" rx="3.5" stroke="currentColor" />
      {/* Core Silicon Circuitry */}
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      {/* Pin Connectors */}
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}

// Apple macOS SF Symbols: Speedometer / Performance Gauge (Quality & Performance)
export function MacGaugeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Gauge Arc */}
      <path d="M4.5 16.5A9 9 0 1 1 19.5 16.5" />
      {/* Center Pivot & Needle */}
      <circle cx="12" cy="14" r="2" fill="currentColor" />
      <path d="M12 14L16.5 8" strokeWidth="2" />
      {/* Speed Ticks */}
      <path d="M12 5v2M6.5 7.5l1.4 1.4M17.5 7.5l-1.4 1.4" strokeWidth="1.4" />
    </svg>
  );
}

// Apple macOS SF Symbols: Laurel Crown / Team Trophy (Leadership & Delivery)
export function MacTrophyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Trophy Cup */}
      <path d="M6 4h12v6a6 6 0 0 1-12 0V4z" />
      {/* Cup Handles */}
      <path d="M6 6H3.5a2.5 2.5 0 0 0 0 5H6M18 6h2.5a2.5 2.5 0 0 1 0 5H18" />
      {/* Stem & Base */}
      <path d="M12 16v4M8 20h8" />
      {/* Star Accent */}
      <circle cx="12" cy="8.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

// Apple macOS SF Symbols: Finder Face / Window Icon
export function MacFinderIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      {/* macOS Finder Split Line & Eyes */}
      <path d="M12 3v9c0 1.5-1.5 2.5-3 2.5H8" />
      <circle cx="8" cy="8.5" r="1" fill="currentColor" />
      <circle cx="16" cy="8.5" r="1" fill="currentColor" />
      {/* Smile Line */}
      <path d="M7 15.5c1.5 2 8.5 2 10 0" />
    </svg>
  );
}

// Apple macOS SF Symbols: Time Machine Backup Icon
export function MacTimeMachineIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4a8 8 0 1 0 7.8 6.2" />
      <path d="M20 4v6h-6" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

// Apple macOS SF Symbols: Terminal.app Prompt Icon
export function MacTerminalIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="4" />
      <path d="M7 9l4 3-4 3" />
      <path d="M13 15h4" strokeWidth="2" />
    </svg>
  );
}

// Apple macOS SF Symbols: Mail.app Envelope
export function MacMailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3.5" />
      <path d="M3 7.5l9 6 9-6" />
    </svg>
  );
}

// Apple macOS SF Symbols: QuickLook / Document Preview
export function MacQuickLookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
