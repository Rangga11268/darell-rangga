"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  X,
  RefreshCw,
  Palette,
  Maximize2,
  Terminal,
} from "lucide-react";
import { useCustomization } from "@/app/providers/customization-provider";

export function CodePlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const { config, setConfig, resetConfig } = useCustomization();

  // Convert OKLCH string to readable HSL-like input for sliders if needed,
  // but for simplicity we'll just toggle between presets or adjust hue.
  // We'll simulate "Hue" rotation for the OKLCH color.

  const handleColorChange = (hue: number) => {
    // Basic OKLCH template: Lightness 0.65, Chroma 0.25, Hue [Variable]
    // Default was: 0.65 0.25 280
    setConfig((prev) => ({
      ...prev,
      primaryColor: `0.65 0.25 ${hue}`,
    }));
  };

  const currentHue = parseInt(config.primaryColor.split(" ")[2]) || 280;

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl text-primary hover:scale-110 transition-transform group"
        onClick={() => setIsOpen(true)}
        whileHover={{ rotate: 90 }}
      >
        <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <Settings className="w-6 h-6" />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 text-xs font-mono rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none border border-white/10">
          DEV_MODE.exe
        </span>
      </motion.button>

      {/* Editor Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#0d0d0d]/95 backdrop-blur-xl border-l border-white/10 z-[100] shadow-2xl flex flex-col font-mono"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-gray-300">
                  theme_config.json
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetConfig}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  title="Reset Default"
                >
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Line Numbers Simulation */}
              <div className="absolute left-0 top-[60px] bottom-0 w-12 border-r border-white/5 flex flex-col items-end pr-3 pt-6 text-gray-700 text-xs select-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="leading-8">
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="pl-8 pt-1">
                <div className="text-gray-500 text-sm mb-4 font-mono">
                  {"// Customize your experience"}
                  <br />
                  {"// Changes apply in real-time"}
                </div>

                <div className="space-y-8">
                  {/* Primary Color Control */}
                  <div className="group">
                    <div className="text-purple-400 mb-2 text-sm">
                      &quot;primary_hue&quot;:{" "}
                      <span className="text-yellow-300">{currentHue}</span>,
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5 group-hover:border-primary/30 transition-colors">
                      <label className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>HUE ROTATION</span>
                        <Palette className="w-3 h-3" />
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={currentHue}
                        onChange={(e) =>
                          handleColorChange(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Radius Control */}
                  <div className="group">
                    <div className="text-purple-400 mb-2 text-sm">
                      &quot;border_radius&quot;:{" "}
                      <span className="text-yellow-300">
                        {config.radius}rem
                      </span>
                      ,
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5 group-hover:border-primary/30 transition-colors">
                      <label className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>CORNER ROUNDNESS</span>
                        <Maximize2 className="w-3 h-3" />
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={config.radius}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            radius: parseFloat(e.target.value),
                          })
                        }
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>

                  <div className="text-gray-500 text-sm">
                    <span className="text-blue-400">return</span> output;
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 text-[10px] text-gray-500 flex justify-between">
              <span>UTF-8</span>
              <span>JavaScript</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
