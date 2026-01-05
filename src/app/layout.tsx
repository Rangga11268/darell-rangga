import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { LanguageProvider } from "@/app/providers/language-provider";
import { CustomizationProvider } from "@/app/providers/customization-provider";

import { CursorFollower } from "@/app/components/cursor-follower";
import { AITerminal } from "@/app/components/ai-terminal/ai-terminal";

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
  metadataBase: new URL("https://darell-rangga.vercel.app"),
  title: {
    default: "Rangga | Digital Operations Center",
    template: "%s | Rangga Portfolio",
  },
  description:
    "Portfolio of Darell Rangga, a Frontend Developer specializing in React, Next.js, and modern UI/UX design. Explore the Digital Operations Center.",
  keywords: [
    "Darell Rangga",
    "Rangga",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Indonesia",
    "Portfolio",
    "Creative Developer",
    "Cyberpunk UI",
    "Software Engineer",
  ],
  authors: [{ name: "Darell Rangga", url: "https://darell-rangga.vercel.app" }],
  creator: "Darell Rangga",
  publisher: "Darell Rangga",
  openGraph: {
    title: "Rangga | Digital Operations Center",
    description:
      "Explore the futuristic portfolio of Darell Rangga. Featuring interactive 3D elements, modern tech stack, and creative projects.",
    url: "https://darell-rangga.vercel.app",
    siteName: "Rangga Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // We should ideally ensure this image exists, or use a placeholder if not
        width: 1200,
        height: 630,
        alt: "Rangga Portfolio Digital Operations Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rangga | Digital Operations Center",
    description:
      "Frontend Developer specializing in React & Next.js. Check out my interactive portfolio.",
    creator: "@Rangga11268", // Assuming this handle or similar
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
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
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-primary text-secondary-foreground rounded-md font-bold transition-all"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <CustomizationProvider>
              <CursorFollower />
              <AITerminal />
              {children}
            </CustomizationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
