import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { BackgroundAudio } from "@/app/components/background-audio";
import { LanguageProvider } from "@/app/providers/language-provider";
import { MagicCanvas } from "@/app/components/magic-canvas";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
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
      <body className={`${cinzel.variable} ${cormorant.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <BackgroundAudio />
            <MagicCanvas />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
