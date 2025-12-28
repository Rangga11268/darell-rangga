import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { LanguageProvider } from "@/app/providers/language-provider";
import { CustomizationProvider } from "@/app/providers/customization-provider";

import { CursorFollower } from "@/app/components/cursor-follower";
import { CodePlayground } from "@/app/components/code-playground/code-playground";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <CustomizationProvider>
              <CursorFollower />
              <CodePlayground />
              {children}
            </CustomizationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
