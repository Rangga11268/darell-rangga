export interface Project {
  id: string;
  title: string;
  shortDescription: { en: string; id: string };
  fullDescription: { en: string; id: string };
  tags: string[];
  imageUrl: string;
  gallery?: string[];
  githubUrl: string;
  liveUrl: string;
  colSpan: string;
  year: string;
  role: string;
  features: { en: string[]; id: string[] };
  techStack: { name: string; icon?: string }[];
  story?: { en: string; id: string };
}

export const projects: Project[] = [
  // ROW 1 & 2 (Top Section)
  {
    id: "tujago",
    title: "Tunggal Jaya (TUJAGO)",
    shortDescription: {
      en: "Digital Transformation Platform for bus operations.",
      id: "Platform Transformasi Digital untuk operasional bus.",
    },
    fullDescription: {
      en: "An end-to-end bus ticket booking platform that digitally transforms conventional bus operations. It combines ease of ticket booking for passengers with efficient fleet management, utilizing a Modern Monolith architecture.",
      id: "Platform pemesanan tiket bus end-to-end yang mentransformasi operasional bus konvensional menjadi digital modern. Menggabungkan kemudahan booking tiket dengan manajemen armada yang efisien.",
    },
    tags: ["Laravel 12", "Vue 3", "Inertia"],
    imageUrl: "/img/tujago.png",
    githubUrl: "https://github.com/Rangga11268/TunggalJayaTransport",
    liveUrl: "#",
    colSpan: "md:col-span-2 md:row-span-2", // HERO ITEM (2x2)
    year: "2024",
    role: "Full Stack Developer",
    features: {
      en: [
        "Cinematic Booking Experience",
        "Real-time Seat Selection",
        "Automated PDF Ticketing",
        "Integrated Admin Dashboard",
      ],
      id: [
        "Pengalaman Booking Sinematik",
        "Pemilihan Kursi Real-time",
        "Tiket PDF Otomatis",
        "Dashboard Admin Terintegrasi",
      ],
    },
    techStack: [
      { name: "Laravel 12" },
      { name: "Vue.js 3" },
      { name: "Inertia.js" },
      { name: "Tailwind v4" },
      { name: "MySQL" },
    ],
    story: {
      en: "Using the 'Modern Monolith' approach with Inertia.js allowed me to deliver a SPA experience without separate API complexity. This ensured rapid development and robust performance for the ticketing system.",
      id: "Menggunakan pendekatan 'Modern Monolith' dengan Inertia.js memungkinkan saya menghadirkan pengalaman SPA tanpa kerumitan API terpisah. Ini menjamin pengembangan cepat dan performa tangguh untuk sistem tiket.",
    },
  },
  {
    id: "portfolio",
    title: "Digital Garden",
    shortDescription: {
      en: "My personal universe. Built with Next.js 15 and AI integration.",
      id: "Semesta personal saya. Dibangun dengan Next.js 15 dan integrasi AI.",
    },
    fullDescription: {
      en: "You are here. This portfolio is more than just a resume; it's a playground for my latest experiments in web technology. From the AI-powered terminal to the 3D interactive elements, every pixel renders my passion for creative development.",
      id: "Anda berada di sini. Portofolio ini lebih dari sekadar resume; ini adalah taman bermain untuk eksperimen terbaru saya dalam teknologi web. Dari terminal bertenaga AI hingga elemen interaktif 3D, setiap piksel menggambarkan semangat saya untuk pengembangan kreatif.",
    },
    tags: ["Next.js 15", "Gemini AI"],
    imageUrl: "/img/portfolio.png",
    githubUrl: "https://github.com/Rangga11268/darell-rangga",
    liveUrl: "/",
    colSpan: "md:col-span-1 md:row-span-2", // TALL SIDEBAR (1x2)
    year: "2025",
    role: "Creator",
    features: {
      en: [
        "Rangga-AI (Gemini Integration)",
        "Voice Control Navigation",
        "Holographic UI Components",
        "Performance Optimized (99+ Lighthouse)",
      ],
      id: [
        "Rangga-AI (Integrasi Gemini)",
        "Navigasi Kontrol Suara",
        "Komponen UI Holografik",
        "Optimasi Performa (99+ Lighthouse)",
      ],
    },
    techStack: [
      { name: "Next.js 15" },
      { name: "Google Gemini API" },
      { name: "Framer Motion" },
      { name: "Web Speech API" },
    ],
    story: {
      en: "I wanted a portfolio that felt alive. Integrating a Large Language Model (LLM) as a 'digital soul' allows visitors to converse with my professional persona even when I'm offline.",
      id: "Saya ingin portofolio yang terasa hidup. Mengintegrasikan Large Language Model (LLM) sebagai 'jiwa digital' memungkinkan pengunjung berbincang dengan persona profesional saya bahkan saat saya offline.",
    },
  },

  // ROW 3
  {
    id: "srb-motor-v2",
    title: "SRB Motor V2",
    shortDescription: {
      en: "Next-Gen Automotive Dealership Platform with Futuristic UI.",
      id: "Platform Dealer Otomotif Next-Gen dengan UI Futuristik.",
    },
    fullDescription: {
      en: "A web-based motorcycle dealership platform designed with a Futuristic 'Command Center' concept. This application is not just a standard e-commerce site, but combines a seamless Single Page Application (SPA) experience with High-Tech visuals for credit simulation, document management, and real-time dealer administration.",
      id: "Platform dealer motor berbasis web yang dirancang dengan konsep Futuristic 'Command Center'. Aplikasi ini bukan sekadar e-commerce biasa, tetapi menggabungkan pengalaman Single Page Application (SPA) yang seamless dengan visual High-Tech untuk simulasi kredit, manajemen dokumen, dan administrasi dealer yang real-time.",
    },
    tags: ["Laravel", "Inertia", "React 19"],
    imageUrl: "/img/srb motor.png",
    githubUrl: "https://github.com/Rangga11268/SrbMotorV2",
    liveUrl: "#",
    colSpan: "md:col-span-2", // WIDE ITEM
    year: "2024",
    role: "Full Stack Developer",
    features: {
      en: [
        "Hyper-Modern 'Neo-Automotive' UI",
        "Dual-Mode Transaction (Cash & Credit)",
        "Digital Vault for Secure Documents",
        "Admin 'Command Center' with Live Search",
      ],
      id: [
        "UI 'Neo-Automotive' Hyper-Modern",
        "Transaksi Dual-Mode (Tunai & Kredit)",
        "Brankas Digital Dokumen Aman",
        "'Command Center' Admin Live Search",
      ],
    },
    techStack: [
      { name: "Laravel" },
      { name: "Inertia.js" },
      { name: "React 19" },
      { name: "Tailwind 4.0" },
      { name: "Recharts" },
    ],
    story: {
      en: "I implemented Inertia.js to get mobile-app-like speed while keeping the robust data management of Laravel. The 'Command Center' dashboard features a custom-built Live Search grid that allows admins to filter thousands of records instantly without reloading.",
      id: "Saya mengimplementasikan Inertia.js untuk mendapatkan kecepatan interaksi ala aplikasi mobile tapi tetap mempertahankan keamanan dan kemudahan manajemen data dari Laravel.",
    },
  },
  {
    id: "phd-trans",
    title: "PHD Trans",
    shortDescription: {
      en: "Premium bus rental showcase with cinematic animations.",
      id: "Showcase penyewaan bus premium dengan animasi sinematik.",
    },
    fullDescription: {
      en: "PHD Trans is a progressive web application (PWA) serving as a premium bus reservation platform and digital showcase. Designed to reflect the 'Luxury in Motion' identity, it combines an 'Electric Royal' aesthetic with a highly responsive, performance-first architecture.",
      id: "PHD Trans adalah progressive web application (PWA) yang berfungsi sebagai platform reservasi bus premium dan showcase digital. Dirancang untuk mencerminkan identitas 'Luxury in Motion', menggabungkan estetika 'Electric Royal' dengan arsitektur yang sangat responsif dan mengutamakan performa.",
    },
    tags: ["Next.js 16", "React 19"],
    imageUrl: "/img/PhdTrans.png",
    githubUrl: "https://github.com/Rangga11268/phd-trans",
    liveUrl: "https://phd-trans.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2024",
    role: "Full Stack Developer",
    features: {
      en: [
        "'Electric Royal' Aesthetic",
        "Floating Media Portal with 3D Parallax",
        "Smart Reservation System",
        "Performance-First Map Facade",
      ],
      id: [
        "Estetika 'Electric Royal'",
        "Floating Media Portal Paralaks 3D",
        "Sistem Reservasi Cerdas",
        "Map Facade Performa Tinggi",
      ],
    },
    techStack: [
      { name: "Next.js 16" },
      { name: "React 19" },
      { name: "Tailwind v4" },
      { name: "Framer Motion" },
    ],
    story: {
      en: "The project prioritized a cinematic first impression without sacrificing speed. I used map facades and dynamic imports to ensure instant loading usage, while GPU-accelerated Framer Motion animations create a 60FPS 'Luxury' feel.",
      id: "Proyek ini memprioritaskan kesan pertama yang sinematik tanpa mengorbankan kecepatan. Saya menggunakan map facades dan dynamic imports untuk loading instan, sementara animasi Framer Motion berbasis GPU menciptakan nuansa 'Mewah' 60FPS.",
    },
  },

  // ROW 4 (Bottom)
  {
    id: "navara-trans",
    title: "Navara Trans",
    shortDescription: {
      en: "Premium tourism transport platform with WhatsApp booking engine.",
      id: "Platform transportasi pariwisata premium dengan mesin booking WhatsApp.",
    },
    fullDescription: {
      en: "A modern corporate website for Navara Trip, designed to solve manual booking inefficiencies. Built from scratch with a User-Centric approach, it features a 'Clean Luxury' design that reflects their premium fleet.",
      id: "Website ini saya kembangkan sebagai solusi digital untuk Navara Trip, menggantikan proses pemesanan manual yang lambat. Dibangun dari nol dengan pendekatan User-Centric, desainnya mengusung gaya 'Clean Luxury'.",
    },
    tags: ["React 19", "Vite"],
    imageUrl: "/img/navara.png",
    githubUrl: "https://github.com/Rangga11268/navara-trans",
    liveUrl: "https://navara-trans.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2024",
    role: "Frontend Developer",
    features: {
      en: [
        "WhatsApp Booking Engine",
        "Performance Optimized",
        "Mobile-First Design",
        "SEO Ready",
      ],
      id: [
        "Mesin Booking WhatsApp",
        "Optimasi Performa",
        "Desain Mobile-First",
        "SEO Ready",
      ],
    },
    techStack: [
      { name: "React.js 19" },
      { name: "Vite" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
    story: {
      en: "The main challenge was to replace a slow manual process with something instant but personal. I built a 'Smart Form' that generates a pre-filled WhatsApp message, bridging the gap between digital convenience and personal service.",
      id: "Tantangan utamanya adalah menggantikan proses manual yang lambat dengan sesuatu yang instan namun tetap personal. Saya membuat 'Smart Form' yang menghasilkan pesan WhatsApp otomatis.",
    },
  },
  {
    id: "janguleee-trans",
    title: "Janguleee Trans",
    shortDescription: {
      en: "Official interactive booking platform with ultra-modern Bento design.",
      id: "Platform booking interaktif resmi dengan desain Bento ultra-modern.",
    },
    fullDescription: {
      en: "This project transforms the conventional bus rental process into an interactive and luxury digital experience. Built with a focus on UX and Performance, this website serves as both a fleet catalog and a powerful branding tool.",
      id: "Proyek ini mentransformasi proses penyewaan bus konvensional menjadi pengalaman digital yang interaktif dan mewah. Dibangun dengan fokus pada UX dan Performance, website ini berfungsi sebagai katalog armada dan alat branding.",
    },
    tags: ["Next.js 15", "Framer Motion"],
    imageUrl: "/img/janguleee.png",
    githubUrl: "https://github.com/Rangga11268/janguleee-trans",
    liveUrl: "https://janguleee-trans.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2024",
    role: "Frontend Engineer",
    features: {
      en: [
        "Ultra-Modern Bento Design",
        "Immersive Micro-Interactions",
        "Real-Time Interactive Elements",
        "Optimized Performance",
      ],
      id: [
        "Desain Bento Ultra-Modern",
        "Interaksi Mikro Imersif",
        "Elemen Interaktif Real-Time",
        "Optimasi Performa",
      ],
    },
    techStack: [
      { name: "Next.js 15" },
      { name: "React 19" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
    story: {
      en: "The challenge was to create a visually 'heavy' and expensive-feeling website that remains lightweight on mobile. I used Code Splitting and optimized animations to achieve this balance.",
      id: "Tantangannya adalah menciptakan website yang terasa 'berat' dan mahal menyajikan visual yang seperti aplikasi native, namun tetap ringan di mobile.",
    },
  },
  {
    id: "apapesan",
    title: "Apapesan",
    shortDescription: {
      en: "Secure, encrypted messaging platform focused on privacy.",
      id: "Platform pesan terenkripsi yang aman dan fokus pada privasi.",
    },
    fullDescription: {
      en: "Apapesan is a privacy-first messaging application designed to compete with mainstream platforms by offering enhanced security features. It prioritizes user anonymity and data protection through robust encryption protocols.",
      id: "Apapesan adalah aplikasi pesan yang mengutamakan privasi, dirancang untuk bersaing dengan platform utama dengan menawarkan fitur keamanan yang ditingkatkan. Prioritasnya adalah anonimitas pengguna dan perlindungan data.",
    },
    tags: ["Laravel", "MySQL", "Pusher"],
    imageUrl: "/img/Apapesan.png",
    githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    liveUrl: "#",
    colSpan: "md:col-span-1",
    year: "2023",
    role: "Backend Engineer",
    features: {
      en: [
        "End-to-End Encryption",
        "Real-time Socket.io Chat",
        "Ephemeral Messages",
        "Group Chat Capabilities",
      ],
      id: [
        "Enkripsi End-to-End",
        "Chat Real-time Socket.io",
        "Pesan Sementara",
        "Kemampuan Grup Chat",
      ],
    },
    techStack: [
      { name: "Laravel 10" },
      { name: "MySQL" },
      { name: "Pusher" },
      { name: "Bootstrap" },
    ],
    story: {
      en: "Building a chat app that is truly real-time required mastering WebSockets. I chose Pusher for its reliability and integrated it deeply with Laravel's event broadcasting system.",
      id: "Membangun aplikasi chat yang benar-benar real-time membutuhkan penguasaan WebSockets. Saya memilih Pusher karena keandalannya dan mengintegrasikannya secara mendalam dengan sistem event broadcasting Laravel.",
    },
  },
];
