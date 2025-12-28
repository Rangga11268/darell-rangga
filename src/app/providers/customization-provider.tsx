"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Initial config for the customization playground
type ThemeConfig = {
  primaryColor: string; // HSL/OKLCH value or hex depending on implementation
  radius: number;
  mode: "light" | "dark";
};

type CustomizationContextType = {
  config: ThemeConfig;
  setConfig: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  resetConfig: () => void;
};

const defaultConfig: ThemeConfig = {
  primaryColor: "0.45 0.24 280", // Electric Violet (OKLCH)
  radius: 0.75,
  mode: "dark",
};

const CustomizationContext = createContext<
  CustomizationContextType | undefined
>(undefined);

export function CustomizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig);

  // Apply CSS variables whenever config changes
  useEffect(() => {
    const root = document.documentElement;

    // Apply Primary Color (OKLCH)
    // Note: We are controlling the --primary variable directly
    root.style.setProperty("--primary", `oklch(${config.primaryColor})`);

    // Apply Radius
    root.style.setProperty("--radius", `${config.radius}rem`);

    // In a real implementation, we might also toggle built-in classes,
    // but here we are overriding CSS variables for the playground feel.
  }, [config]);

  const resetConfig = () => setConfig(defaultConfig);

  return (
    <CustomizationContext.Provider value={{ config, setConfig, resetConfig }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error(
      "useCustomization must be used within a CustomizationProvider"
    );
  }
  return context;
};
