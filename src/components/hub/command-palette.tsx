"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { playMicroTick } from "@/lib/sound";

export interface CommandItem {
  id: string;
  group: string;
  title: string;
  action: () => void;
  shortcut: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  isId: boolean;
}

export function CommandPalette({ isOpen, onClose, items, isId }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Auto-focus input
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = prevOverflow;
        clearTimeout(timer);
      };
    } else {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, search]);

  // Handle local keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        playMicroTick();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        playMicroTick();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        playMicroTick();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
        return;
      }

      if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        playMicroTick();
        filteredItems[selectedIndex].action();
        onClose();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
          {/* Backdrop Scrim - Solid GPU-friendly Dimmer without multi-pass blur stall */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 z-40 transform-gpu"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[75vh] z-50 transform-gpu"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/70 bg-card">
              <MagnifyingGlass size={16} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={
                  isId
                    ? "Ketik perintah, bagian, atau nama proyek..."
                    : "Type a command, jump to section, or search..."
                }
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X size={14} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  {isId ? "Tidak ada hasil yang cocok." : "No matching commands found."}
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playMicroTick();
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => {
                        if (selectedIndex !== idx) setSelectedIndex(idx);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-foreground text-background font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`text-[10px] uppercase font-mono tracking-wider ${
                            isSelected ? "text-background/70" : "text-muted-foreground"
                          }`}
                        >
                          [{item.group}]
                        </span>
                        <span className="truncate">{item.title}</span>
                      </div>
                      <kbd
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                          isSelected
                            ? "bg-background/20 text-background"
                            : "bg-muted text-muted-foreground border border-border/60"
                        }`}
                      >
                        {item.shortcut}
                      </kbd>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-2 border-t border-border/60 bg-muted/40 flex items-center justify-between text-[10.5px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span>Navigation:</span>
                <kbd className="px-1 py-0.5 rounded bg-background border border-border/60">↑</kbd>
                <kbd className="px-1 py-0.5 rounded bg-background border border-border/60">↓</kbd>
                <span className="ml-1">Select:</span>
                <kbd className="px-1 py-0.5 rounded bg-background border border-border/60">↵</kbd>
              </span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
