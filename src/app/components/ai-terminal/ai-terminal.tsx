"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Bot, User, Trash2 } from "lucide-react";
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
  speed = 15,
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
    // Reset if text changes significantly (new message)
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
        // Trigger scroll on every character added
        if (onScroll) onScroll();
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, onScroll]);

  // Self-Destruct/Redact Logic for "Trace:" (Secret Identity)
  useEffect(() => {
    if (currentIndex >= text.length && !isRedacted) {
      // Check if this message contains the sensitive 'Trace:' data
      if (text.includes("Trace:")) {
        // Removed space to match standardized 'Trace:'
        const timeout = setTimeout(() => {
          setDisplayText((prev) => {
            // Find where "Trace:" starts
            const traceIndex = prev.indexOf("Trace:");
            if (traceIndex === -1) return prev;

            // Keep everything before "Trace:" + "Trace:" itself + maybe a bit more context if needed
            // But for safety, cut right at Trace:
            const safePart = prev.substring(0, traceIndex + 6);
            return (
              safePart + " [DATA EXPUNGED - SECURITY PROTOCOL ACTIVATED] 🔒"
            );
          });
          setIsRedacted(true);
        }, 2000); // Visible for 2 seconds then banished

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, isRedacted]);

  return (
    <p className="whitespace-pre-wrap">
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </p>
  );
}

export function AITerminal() {
  const { isPlaygroundOpen, setIsPlaygroundOpen } = useCustomization();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "Connection established. I am Rangga-AI v2.5.0. How can I assist you?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userCommand = input.toLowerCase().trim();

    // 1. Local Command Handling
    if (userCommand === "clear" || userCommand === "cls") {
      clearChat();
      setInput("");
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 2. Intercept Known Commands locally before AI
    let localResponse = "";
    if (userCommand === "help") {
      localResponse = `Available System Commands:
- help: Show this list.
- ls: List virtual file system nodes.
- whoami: Display creator identity profile.
- clear: Purge terminal memory buffer.
- contact: Open communication channels.
- github: Access latest commit data.`;
    } else if (userCommand === "ls") {
      localResponse = `DIRECTORY: /root
> system-files/
> projects/
> bio/
> certificates/
> README.md`;
    } else if (userCommand === "whoami") {
      localResponse = `IDENTITY: Darell Rangga
ROLE: Fullstack Engineer & UI/UX Specialist
STATUS: System Active / Development Mode
LOCATION: Indonesia / Digital Garden`;
    } else if (userCommand === "github") {
      localResponse = `ACCESSING GITHUB REPOSITORY...
USER: Rangga11268
STATUS: Active
LATEST_ACTIVITY: [REDACTED]
URL: https://github.com/Rangga11268`;
    } else if (userCommand === "contact") {
      localResponse = `Establishing communication link...
EMAIL: darellrangga@gmail.com
GITHUB: github.com/Rangga11268
STATUS: System online / Awaiting inquiry.`;
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
      }, 500);
      return;
    }

    // 3. AIService (Gemini/Groq) for non-commands
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
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
        text: "Error: Neural connection failed.",
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
        text: "Memory buffer cleared. Ready for new input.",
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
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 right-0 w-full md:w-[450px] md:right-8 md:bottom-24 h-[60vh] md:h-[600px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-t-2xl md:rounded-2xl z-[100] shadow-2xl flex flex-col overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold text-green-500 tracking-widest uppercase">
                Rangga-AI Terminal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaygroundOpen(false)}
                className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-md transition-colors text-white/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-lg text-xs md:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-white/10 text-white border border-white/10 rounded-tr-none"
                      : "bg-green-500/10 text-green-400 border border-green-500/20 rounded-tl-none font-mono"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    <Typewriter text={msg.text} onScroll={scrollToBottom} />
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-green-500/10 text-green-400 border border-green-500/20 p-3 rounded-lg rounded-tl-none">
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command (e.g., 'skills', 'contact')..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 font-mono transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white shadow-lg shadow-primary/20 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
