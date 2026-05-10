"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PaperPlaneTilt,
  User,
  CircleNotch,
  AddressBook,
  Code,
  Question,
  IdentificationCard,
  Quotes,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useCustomization } from "@/app/providers/customization-provider";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

// --- Sub Components ---

function Typewriter({
  text,
  speed = 15,
  onScroll,
  onComplete,
  isStopped = false,
}: {
  text: string;
  speed?: number;
  onScroll?: () => void;
  onComplete?: () => void;
  isStopped?: boolean;
}) {
  const [displayText, setDisplayText] = useState("");
  const rafRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    indexRef.current = 0;
    lastTimeRef.current = 0;
    setDisplayText("");

    const animate = (timestamp: number) => {
      if (isStopped) return;
      if (indexRef.current >= text.length) {
        onComplete?.();
        return;
      }

      const elapsed = lastTimeRef.current === 0 ? speed : timestamp - lastTimeRef.current;
      const charsToAdd = Math.max(1, Math.floor(elapsed / speed));
      lastTimeRef.current = timestamp;

      const nextIndex = Math.min(indexRef.current + charsToAdd, text.length);
      const chunk = text.slice(indexRef.current, nextIndex);
      indexRef.current = nextIndex;

      setDisplayText((prev) => prev + chunk);
      onScroll?.();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, speed, isStopped, onComplete, onScroll]);

  return (
    <div className="font-serif leading-relaxed">
      {displayText}
      {displayText.length < text.length && !isStopped && (
        <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
      )}
    </div>
  );
}

function CommandChip({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1 border border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all label-caps text-[10px] font-bold"
    >
      <Icon className="w-3.5 h-3.5" weight="bold" />
      <span>{label}</span>
    </button>
  );
}

export function AITerminal() {
  const { isPlaygroundOpen, setIsPlaygroundOpen } = useCustomization();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "ARCHIVE ACCESS GRANTED. I AM THE EDITORIAL ASSISTANT. HOW MAY I ASSIST YOUR RESEARCH TODAY?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickCommands = [
    { icon: Question, label: "HELP", command: "help" },
    { icon: IdentificationCard, label: "WHOIS", command: "whoami" },
    { icon: Code, label: "STACK", command: "skills" },
    { icon: AddressBook, label: "CABLE", command: "contact" },
  ];

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim()) return;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
        signal: abortControllerRef.current?.signal,
      });

      const data = await response.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.text || "NO DATA RETURNED.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsGenerating(true);
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        setMessages((prev) => [...prev, {
          id: Date.now().toString(),
          sender: "ai",
          text: "CONNECTION INTERRUPTED. SYSTEM ERROR.",
          timestamp: new Date()
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isPlaygroundOpen ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 md:left-8 md:bottom-32 w-[calc(100%-2rem)] md:w-[450px] h-[70vh] md:h-[600px] z-[100] bg-paper border-rule-thick border-primary shadow-[12px_12px_0px_#1a1c1c] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Quotes size={24} weight="fill" />
              <div className="flex flex-col">
                <span className="label-caps font-bold text-xs tracking-[0.2em]">Editorial Assistant</span>
                <span className="text-[9px] opacity-70 uppercase tracking-widest">Archive Terminal v1.0.4</span>
              </div>
            </div>
            <button 
              onClick={() => setIsPlaygroundOpen(false)}
              className="p-1 hover:bg-white/20 transition-colors"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* Quick Tools */}
          <div className="px-6 py-3 border-b hairline-b border-primary/20 flex gap-2 overflow-x-auto scrollbar-hide">
            {quickCommands.map((cmd) => (
              <CommandChip
                key={cmd.label}
                icon={cmd.icon}
                label={cmd.label}
                onClick={() => handleSend(cmd.command)}
              />
            ))}
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 bg-paper">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col gap-2",
                  msg.sender === "user" ? "items-end text-right" : "items-start text-left"
                )}
              >
                <div className="flex items-center gap-2 label-caps text-[10px] font-bold opacity-40">
                  {msg.sender === "user" ? <User size={12} weight="bold" /> : <Quotes size={12} weight="fill" />}
                  <span>{msg.sender === "user" ? "REPORTER" : "ARCHIVE"} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={cn(
                  "max-w-[90%] p-4 text-sm leading-relaxed border",
                  msg.sender === "user" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-paper border-primary/10"
                )}>
                  {msg.sender === "ai" ? (
                    <Typewriter 
                      text={msg.text} 
                      onScroll={scrollToBottom}
                      onComplete={() => setIsGenerating(false)}
                    />
                  ) : (
                    <p className="font-serif italic">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-primary">
                <CircleNotch size={16} className="animate-spin" weight="bold" />
                <span className="label-caps text-[10px] font-bold italic">CONSULTING ARCHIVES...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t hairline-t border-primary/20 bg-paper">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-4 items-center"
            >
              <div className="flex-1 relative group">
                <MagnifyingGlass className="absolute left-0 top-1/2 -translate-y-1/2 text-primary opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} weight="bold" />
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire with the editor..."
                  className="w-full bg-transparent border-b hairline-b border-primary/30 py-2 pl-7 text-sm font-serif focus:outline-none focus:border-primary transition-colors placeholder:italic placeholder:opacity-50"
                />
              </div>
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-primary text-primary-foreground p-3 hover:scale-105 transition-all disabled:opacity-30"
              >
                <PaperPlaneTilt size={20} weight="bold" />
              </button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsPlaygroundOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 left-4 md:bottom-8 md:left-8 z-50 group"
        >
          <div className="relative w-12 h-12 md:w-20 md:h-20 bg-paper border-rule-thick border-primary flex items-center justify-center shadow-[4px_4px_0px_#1a1c1c] md:shadow-[6px_6px_0px_#1a1c1c] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all overflow-hidden">
            <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 label-caps text-[6px] md:text-[8px] font-bold opacity-30">PRESS</div>
            <div className="absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 label-caps text-[6px] md:text-[8px] font-bold opacity-30">ARCHIVE</div>
            <IdentificationCard size={24} weight="bold" className="md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 border-2 md:border-4 border-double border-primary/10 pointer-events-none" />
          </div>
          <div className="absolute -top-12 left-0 bg-primary text-primary-foreground px-3 py-1 label-caps text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask The Editor
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
