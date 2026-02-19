import type { Metadata } from "next"; // Typography: Outfit + Readex Pro
import { Outfit, Readex_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { LanguageProvider } from "@/app/providers/language-provider";
import { CustomizationProvider } from "@/app/providers/customization-provider";

import { CursorFollower } from "@/app/components/cursor-follower";
import { AITerminal } from "@/app/components/ai-terminal/ai-terminal";
import { FileSystemProvider } from "@/app/providers/file-system-provider";
import { FolderWindow } from "@/app/components/folder-window";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const readexPro = Readex_Pro({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.darellrangga.me"),
  title: {
    default: "Darell Rangga | Fullstack Developer Indonesia",
    template: "%s | Darell Rangga Portfolio",
  },
  description:
    "Darell Rangga adalah Fullstack Developer Indonesia yang ahli dalam React, Next.js, Laravel, dan UI/UX Design. Lihat portfolio interaktif dengan project-project inovatif.",
  keywords: [
    "Darell Rangga",
    "Rangga",
    "Darell Rangga Portfolio",
    "Frontend Developer Indonesia",
    "Fullstack Developer Indonesia",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Web Developer Indonesia",
    "Web Developer Bekasi",
    "Jasa Pembuatan Website",
    "Jasa Web Developer",
    "Portfolio Developer",
    "Creative Developer",
    "UI/UX Designer Indonesia",
    "Software Engineer Indonesia",
    "Programmer Indonesia",
    "Web Designer",
    "React Portfolio",
    "Interactive Portfolio",
  ],
  authors: [{ name: "Darell Rangga", url: "https://www.darellrangga.me" }],
  creator: "Darell Rangga",
  publisher: "Darell Rangga",
  alternates: {
    canonical: "https://www.darellrangga.me",
    languages: {
      "en-US": "https://www.darellrangga.me",
      "id-ID": "https://www.darellrangga.me",
    },
  },
  openGraph: {
    title: "Darell Rangga | Fullstack Developer & UI/UX Designer",
    description:
      "Portfolio interaktif Darell Rangga - Fullstack Developer Indonesia. Spesialisasi React, Next.js, Laravel dengan project-project kreatif dan inovatif.",
    url: "https://www.darellrangga.me",
    siteName: "Darell Rangga Portfolio",
    locale: "id_ID",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Darell Rangga - Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ranggsdarell",
    title: "Darell Rangga | Fullstack Developer Indonesia",
    description:
      "Fullstack Developer spesialisasi React, Next.js & Laravel. Lihat portfolio interaktif saya!",
    creator: "@ranggsdarell",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "JhY7zAsb9NU3JSzeGqjPidiX_cZQCoVdHZ7lN5grIyw",
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

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackgroundController } from "@/components/ui/background-controller";

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.darellrangga.me/#website",
      url: "https://www.darellrangga.me",
      name: "Darell Rangga Portfolio",
      description:
        "Portfolio interaktif Darell Rangga - Fullstack Developer Indonesia",
      publisher: { "@id": "https://www.darellrangga.me/#person" },
      inLanguage: ["id-ID", "en-US"],
    },
    {
      "@type": "Person",
      "@id": "https://www.darellrangga.me/#person",
      name: "Darell Rangga",
      alternateName: ["Rangga", "Darell Rangga Putra Rachman"],
      url: "https://www.darellrangga.me",
      image: {
        "@type": "ImageObject",
        url: "https://www.darellrangga.me/img/saya/saya1.webp",
        width: 400,
        height: 400,
      },
      description:
        "Fullstack Developer Indonesia spesialisasi React, Next.js, Laravel, dan UI/UX Design",
      jobTitle: "Fullstack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Universitas Bina Sarana Informatika",
      },
      knowsAbout: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Laravel",
        "PHP",
        "Tailwind CSS",
        "UI/UX Design",
        "Web Development",
        "Frontend Development",
        "Backend Development",
      ],
      sameAs: [
        "https://github.com/Rangga11268",
        "https://www.linkedin.com/in/darell-rangga-1320b634b/",
        "https://x.com/ranggsdarell",
        "https://www.instagram.com/darellrangga17/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bekasi",
        addressCountry: "ID",
      },
      email: "darellrangga@gmail.com",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.darellrangga.me/#webpage",
      url: "https://www.darellrangga.me",
      name: "Darell Rangga | Fullstack Developer & UI/UX Designer Indonesia",
      description:
        "Portfolio interaktif Darell Rangga - Fullstack Developer Indonesia. Spesialisasi React, Next.js, Laravel dengan project-project kreatif.",
      isPartOf: { "@id": "https://www.darellrangga.me/#website" },
      about: { "@id": "https://www.darellrangga.me/#person" },
      inLanguage: ["id-ID", "en-US"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.darellrangga.me/#profilepage",
      url: "https://www.darellrangga.me",
      name: "Darell Rangga Portfolio",
      mainEntity: { "@id": "https://www.darellrangga.me/#person" },
    },
    {
      "@type": "Service",
      "@id": "https://www.darellrangga.me/#services",
      serviceType: "Web Development",
      provider: { "@id": "https://www.darellrangga.me/#person" },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Landing Page Development",
              description: "Pembuatan landing page modern dengan Next.js",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full Stack Web Application",
              description: "Aplikasi web fullstack dengan Laravel & React",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX Design",
              description: "Desain antarmuka yang modern dan responsif",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${readexPro.variable} antialiased bg-background text-foreground`}
      >
        <div className="fixed inset-0 z-[50] pointer-events-none bg-noise opacity-[0.03] mix-blend-overlay" />
        <BackgroundController />
        <ScrollProgress />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-primary text-secondary-foreground rounded-md font-bold transition-all"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <CustomizationProvider>
              <FileSystemProvider>
                <CursorFollower />
                <AITerminal />
                <FolderWindow />
                {children}
              </FileSystemProvider>
            </CustomizationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
