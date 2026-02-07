"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  X,
  PaperPlaneTilt,
  Robot,
  User,
  Trash,
  CircleNotch,
  Command,
  Info,
  AddressBook,
  Code,
  Question,
  Sparkle,
} from "@phosphor-icons/react";
import { useCustomization } from "@/app/providers/customization-provider";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

// --- Sub Components ---

function Typewriter({
  text,
  speed = 12,
  onScroll,
}: {
  text: string;
  speed?: number;
  onScroll?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRedacted, setIsRedacted] = useState(false);

  useEffect(() => {
    if (currentIndex === 0 && text.length > 0) {
      setDisplayText("");
      setIsRedacted(false);
    }
  }, [text, currentIndex]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        if (onScroll) onScroll();
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, onScroll]);

  useEffect(() => {
    if (currentIndex >= text.length && !isRedacted) {
      if (text.includes("Trace:")) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => {
            const traceIndex = prev.indexOf("Trace:");
            if (traceIndex === -1) return prev;
            const safePart = prev.substring(0, traceIndex + 6);
            return (
              safePart + " [DATA EXPUNGED - SECURITY PROTOCOL ACTIVATED] 🔒"
            );
          });
          setIsRedacted(true);
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, isRedacted]);

  return (
    <p className="whitespace-pre-wrap leading-relaxed">
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-4 bg-primary/80 ml-0.5 animate-pulse" />
      )}
    </p>
  );
}

// Animated Wave Dots
function WaveTypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Quick Command Chip
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
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all"
    >
      <Icon className="w-3.5 h-3.5" weight="duotone" />
      <span>{label}</span>
    </motion.button>
  );
}

export function AITerminal() {
  const { isPlaygroundOpen, setIsPlaygroundOpen } = useCustomization();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "Neural link established. I am Rangga-AI v2.5.0, your personal assistant. Type a command or ask me anything about Rangga!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus] = useState<"connected" | "thinking" | "error">(
    "connected",
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickCommands = [
    { icon: Question, label: "help", command: "help" },
    { icon: AddressBook, label: "contact", command: "contact" },
    { icon: Code, label: "skills", command: "skills" },
    { icon: Info, label: "about", command: "whoami" },
  ];

  const handleQuickCommand = (command: string) => {
    setInput(command);
    setTimeout(() => handleSend(command), 100);
  };

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim()) return;

    const userCommand = messageText.toLowerCase().trim();

    if (userCommand === "clear" || userCommand === "cls") {
      clearChat();
      setInput("");
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    let localResponse = "";
    if (userCommand === "help") {
      localResponse = `🔧 Available Commands:

• help - Display this command list
• skills - Show technical expertise
• whoami - Creator identity profile
• contact - Communication channels
• github - Repository access
• clear - Reset terminal memory

💡 Tip: You can also ask me anything naturally!`;
    } else if (userCommand === "skills") {
      localResponse = `⚡ Technical Arsenal:

Frontend: React, Next.js, TypeScript, Tailwind
Backend: Node.js, PHP, Laravel, Express
Database: PostgreSQL, MySQL, MongoDB
Tools: Git, Docker, Framer Motion
Design: Figma, UI/UX Principles

Status: All systems operational ✓`;
    } else if (userCommand === "ls") {
      localResponse = `📁 Directory: /root

├── system-files/
├── projects/
├── bio/
├── certificates/
└── README.md`;
    } else if (userCommand === "whoami") {
      localResponse = `👤 Identity Profile:

Name: Darell Rangga
Role: Fullstack Engineer & UI/UX Specialist
Status: System Active / Development Mode
Location: Indonesia 🇮🇩
Mission: Building digital experiences`;
    } else if (userCommand === "github") {
      localResponse = `🔗 GitHub Access:

User: Rangga11268
Status: Active
Repositories: Public & Private
URL: github.com/Rangga11268

Latest activity: [CLASSIFIED]`;
    } else if (userCommand === "contact") {
      localResponse = `📡 Communication Channels:

Email: darellrangga@gmail.com
GitHub: github.com/Rangga11268
LinkedIn: linkedin.com/in/darell-rangga

Status: Open for opportunities ✓`;
    }

    if (localResponse) {
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: localResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.text || "Error: No response received.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "⚠️ Neural connection interrupted. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: "Memory buffer cleared. Neural link re-established. Ready for input.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isPlaygroundOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-0 right-0 w-full md:w-[480px] md:right-6 md:bottom-24 h-[70vh] md:h-[650px] z-[100] flex flex-col overflow-hidden"
        >
          {/* Glassmorphism Container */}
          <div className="relative h-full flex flex-col rounded-t-3xl md:rounded-3xl overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-t-3xl md:rounded-3xl p-[1px] bg-gradient-to-br from-primary/50 via-transparent to-primary/30">
              <div className="h-full w-full rounded-t-3xl md:rounded-3xl bg-black/90 backdrop-blur-2xl" />
            </div>

            {/* Background Mesh Effect */}
            <div className="absolute inset-0 rounded-t-3xl md:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {/* AI Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/50 rounded-full blur-md animate-pulse" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center border-2 border-primary/50">
                      <Robot className="w-5 h-5 text-white" weight="duotone" />
                    </div>
                    {/* Status Dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-black animate-pulse" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-wide">
                      Rangga AI
                    </span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">
                      {connectionStatus === "connected" && "Neural Link Active"}
                      {connectionStatus === "thinking" && "Processing..."}
                      {connectionStatus === "error" && "Connection Lost"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/50 hover:text-white group"
                    title="Clear Chat"
                  >
                    <Trash
                      className="w-4 h-4 group-hover:scale-110 transition-transform"
                      weight="duotone"
                    />
                  </button>
                  <button
                    onClick={() => setIsPlaygroundOpen(false)}
                    className="p-2.5 hover:bg-red-500/20 rounded-xl transition-all text-white/50 hover:text-red-400 group"
                  >
                    <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Quick Commands */}
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <Sparkle
                  className="w-4 h-4 text-primary/50 flex-shrink-0"
                  weight="duotone"
                />
                {quickCommands.map((cmd) => (
                  <CommandChip
                    key={cmd.label}
                    icon={cmd.icon}
                    label={cmd.label}
                    onClick={() => handleQuickCommand(cmd.command)}
                  />
                ))}
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                          <Robot
                            className="w-4 h-4 text-primary"
                            weight="duotone"
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-4 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary/20 text-white border border-primary/20 rounded-2xl rounded-br-md"
                          : "bg-white/5 text-white/90 border border-white/10 rounded-2xl rounded-bl-md backdrop-blur-sm"
                      }`}
                    >
                      {msg.sender === "ai" ? (
                        <Typewriter text={msg.text} onScroll={scrollToBottom} />
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 flex-shrink-0">
                        <User className="w-4 h-4 text-white/70" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                      <CircleNotch
                        className="w-4 h-4 text-primary animate-spin"
                        weight="bold"
                      />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-md backdrop-blur-sm">
                      <WaveTypingIndicator />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-3"
                >
                  <div className="relative flex-1">
                    <Command
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                      weight="duotone"
                    />
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything or type a command..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white shadow-lg shadow-primary/30 transition-all"
                  >
                    <PaperPlaneTilt className="w-5 h-5" weight="duotone" />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
