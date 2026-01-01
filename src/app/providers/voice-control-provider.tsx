"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useTheme } from "next-themes";
import { useCustomization } from "@/app/providers/customization-provider";

interface VoiceControlContextType {
  isListening: boolean;
  toggleListening: () => void;
  transcript: string;
  response: string | null;
  notSupported: boolean;
}

const VoiceControlContext = createContext<VoiceControlContextType>({
  isListening: false,
  toggleListening: () => {},
  transcript: "",
  response: null,
  notSupported: false,
});

export const useVoiceControl = () => useContext(VoiceControlContext);

export function VoiceControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [notSupported, setNotSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);

  const { setTheme } = useTheme();
  const { setIsPlaygroundOpen } = useCustomization();

  // Initialize Speech Synthesis (TTS)
  const speak = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1; // Robotic speed
    utterance.pitch = 0.8; // Lower pitch for sci-fi feel
    setResponse(text);

    // Find a robotic voice if available
    const voices = window.speechSynthesis.getVoices();
    const roboticVoice = voices.find(
      (v) =>
        v.name.includes("Google US English") ||
        v.name.includes("Microsoft David")
    );
    if (roboticVoice) utterance.voice = roboticVoice;

    window.speechSynthesis.speak(utterance);

    // Clear response text after speaking
    utterance.onend = () => setTimeout(() => setResponse(null), 2000);
  }, []);

  // Process Commands
  const processCommand = useCallback(
    (command: string) => {
      const lowerCmd = command.toLowerCase();
      console.log("Processing Voice Command:", lowerCmd);

      if (lowerCmd.includes("home") || lowerCmd.includes("scroll to top")) {
        speak("Navigating to Home base.");
        const element = document.getElementById("home");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else if (
        lowerCmd.includes("about") ||
        lowerCmd.includes("who are you")
      ) {
        speak("Accessing personnel file: Darell Rangga.");
        const element = document.getElementById("about");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else if (lowerCmd.includes("project") || lowerCmd.includes("work")) {
        speak("Showcasing project database.");
        const element = document.getElementById("projects");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else if (lowerCmd.includes("contact") || lowerCmd.includes("email")) {
        speak("Opening communication channels.");
        const element = document.getElementById("contact");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else if (
        lowerCmd.includes("dark mode") ||
        lowerCmd.includes("lights off")
      ) {
        speak("Activating stealth mode.");
        setTheme("dark");
      } else if (
        lowerCmd.includes("light mode") ||
        lowerCmd.includes("lights on")
      ) {
        speak("Illuminating interface.");
        setTheme("light");
      } else if (
        lowerCmd.includes("dev mode") ||
        lowerCmd.includes("terminal") ||
        lowerCmd.includes("playground")
      ) {
        speak("Initializing Developer Environment.");
        setIsPlaygroundOpen(true);
      } else if (
        lowerCmd.includes("close dev") ||
        lowerCmd.includes("close terminal")
      ) {
        speak("Terminating Developer Environment.");
        setIsPlaygroundOpen(false);
      } else if (lowerCmd.includes("hello") || lowerCmd.includes("hi")) {
        speak("System online. Awaiting instructions.");
      } else {
        // Optional: Feedback for unknown command
        // speak("Command not recognized.");
      }
    },
    [setTheme, setIsPlaygroundOpen, speak]
  );

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setNotSupported(true);
        return;
      }

      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true; // Keep listening
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US"; // Default to English for J.A.R.V.I.S feel

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionInstance.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const command = lastResult[0].transcript;
          setTranscript(command);
          processCommand(command);
        }
      };

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "not-allowed") {
          setIsListening(false);
          speak("Microphone access denied.");
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [processCommand, speak]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      speak("Voice systems offline.");
      // State will update via onend
    } else {
      try {
        recognition.start();
        speak("J.A.R.V.I.S. online. Listening.");
        // State will update via onstart
      } catch (error: unknown) {
        console.error("Voice Error:", error);
        // If it's already started, just sync state
        if (
          error instanceof Error &&
          error.message?.includes("already started")
        ) {
          setIsListening(true);
        }
      }
    }
  };

  return (
    <VoiceControlContext.Provider
      value={{
        isListening,
        toggleListening,
        transcript,
        response,
        notSupported,
      }}
    >
      {children}

      {/* Visual Feedback Overlay (Optional) */}
      {response && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-black/80 backdrop-blur-md border border-primary/50 text-primary font-mono text-sm rounded-full shadow-lg pointer-events-none animate-in fade-in slide-in-from-top-4">
          {`> RESPONSE: ${response}`}
        </div>
      )}
    </VoiceControlContext.Provider>
  );
}
