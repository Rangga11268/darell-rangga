"use client";

import { useState, useEffect } from "react";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ src, name, size = "sm" }: UserAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error flag if src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = (name || "U").charAt(0).toUpperCase();
  
  const dimensions = 
    size === "lg" 
      ? "w-16 h-16 text-xl" 
      : size === "md" 
        ? "w-8 h-8 text-[11px]" 
        : "w-6 h-6 text-[10px]";

  if (!src || hasError) {
    return (
      <div 
        className={`${dimensions} rounded-full border border-primary bg-primary/10 flex items-center justify-center font-bold font-mono text-primary select-none flex-shrink-0`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className={`${dimensions} rounded-full border border-primary object-cover flex-shrink-0`}
    />
  );
}
