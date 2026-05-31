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
  challenges?: { en: string[]; id: string[] };
  solutions?: { en: string[]; id: string[] };
  team?: { name: string; role: string }[];
}

export const projects: Project[] = [
  // THE BIG THREE (Main Stories)
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
    imageUrl: "/img/tujago.webp",
    githubUrl: "https://github.com/Rangga11268/TunggalJayaTransport",
    liveUrl: "#",
    colSpan: "md:col-span-2 md:row-span-2", // HERO ITEM (2x2)
    year: "2025",
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
    challenges: {
      en: [
        "Handling concurrent seat bookings during peak times to prevent double-booking.",
        "Generating complex PDF tickets with QR codes on the fly without blocking the main thread.",
        "Migrating legacy data from manual Excel sheets to a relational MySQL database.",
      ],
      id: [
        "Menangani pemesanan kursi bersamaan saat jam sibuk untuk mencegah double-booking.",
        "Menghasilkan tiket PDF kompleks dengan kode QR secara on-the-fly tanpa memblokir thread utama.",
        "Migrasi data lama dari lembar Excel manual ke database relasional MySQL.",
      ],
    },
    solutions: {
      en: [
        "Implemented database locking and transaction safeguards in Laravel to ensure atomic booking operations.",
        "Offloaded PDF generation to a queued background job using Redis/Horizon.",
        "Built a custom data seeder script with validation logic to sanitize and import legacy data accurately.",
      ],
      id: [
        "Menerapkan safeguarding transaksi dan database locking di Laravel untuk memastikan operasi booking atomik.",
        "Memindahkan pembuatan PDF ke background job antrian menggunakan Redis/Horizon.",
        "Membuat skrip data seeder kustom dengan logika validasi untuk membersihkan dan mengimpor data lama secara akurat.",
      ],
    },
  },
  {
    id: "srb-motor-v3",
    title: "SRB Motor V3",
    shortDescription: {
      en: "Next-Gen Automotive Dealership Platform with Futuristic UI.",
      id: "Platform Dealer Otomotif Next-Gen dengan UI Futuristik.",
    },
    fullDescription: {
      en: "A web-based motorcycle dealership platform designed with a Futuristic 'Command Center' concept. This application is not just a standard e-commerce site, but combines a seamless Single Page Application (SPA) experience with High-Tech visuals for credit simulation, document management, and real-time dealer administration.",
      id: "Platform dealer motor berbasis web yang dirancang dengan konsep Futuristic 'Command Center'. Aplikasi ini bukan sekadar e-commerce biasa, tetapi menggabungkan pengalaman Single Page Application (SPA) yang seamless dengan visual High-Tech untuk simulasi kredit, manajemen dokumen, dan administrasi dealer yang real-time.",
    },
    tags: ["Laravel", "Inertia", "React 19"],
    imageUrl: "/img/srb motor.webp",
    githubUrl: "https://github.com/Rangga11268/SrbMotorV2",
    liveUrl: "#",
    colSpan: "md:col-span-2", // WIDE ITEM
    year: "2025",
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
    challenges: {
      en: [
        "Filtering thousands of vehicle records instantly without performance lag.",
        "Managing complex credit simulation logic across different leasing providers.",
        "Creating a highly responsive high-tech UI that works on older tablets used in dealerships.",
      ],
      id: [
        "Memfilter ribuan data kendaraan secara instan tanpa lag performa.",
        "Mengelola logika simulasi kredit yang kompleks di berbagai penyedia leasing.",
        "Membuat UI high-tech yang sangat responsif untuk tablet lama di dealer.",
      ],
    },
    solutions: {
      en: [
        "Developed a custom Live Search grid with client-side caching and debounced filtering.",
        "Architected a polymorphic calculation engine to handle various credit schemes.",
        "Optimized SVG-based dashboard elements and used hardware-accelerated transitions.",
      ],
      id: [
        "Mengembangkan grid Live Search kustom dengan client-side caching.",
        "Merancang mesin kalkulasi polimorfik untuk berbagai skema kredit.",
        "Optimasi elemen dashboard berbasis SVG dan transisi akselerasi hardware.",
      ],
    },
  },
  {
    id: "satya-hub",
    title: "Satya Hub",
    shortDescription: {
      en: "Premium Unified School & Learning Ecosystem.",
      id: "Ekosistem Pendidikan Digital Terpadu & Terintegrasi.",
    },
    fullDescription: {
      en: "A unified digital education ecosystem platform that revolutionizes student-teacher interaction. It eliminates information fragmentation through the 'Unified Student Hub'—a central command suite combining schedules, real-time attendance, and task management.",
      id: "Platform ekosistem pendidikan digital terpadu yang merombak cara siswa dan guru berinteraksi. Fokus utama aplikasi ini adalah menghapuskan fragmentasi informasi melalui 'Unified Student Hub'—sebuah central command suite bagi siswa.",
    },
    tags: ["React 19", "Node.js", "MongoDB"],
    imageUrl: "/img/siakad.webp",
    githubUrl: "#",
    liveUrl: "#",
    colSpan: "md:col-span-1",
    year: "2026",
    role: "Full Stack Developer",
    features: {
      en: [
        "Unified Student Learning Hub",
        "Teacher-Student Feedback Loop",
        "Academic Precision Suite",
        "Elite Glassmorphism Aesthetic",
      ],
      id: [
        "Unified Student Learning Hub",
        "Interactive Feedback Loop",
        "Academic Precision Suite",
        "Elite Aesthetics with Glassmorphism",
      ],
    },
    techStack: [
      { name: "React 19" },
      { name: "TypeScript" },
      { name: "Tailwind 4.0" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Midtrans" },
    ],
    story: {
      en: "Built with a 'Zero Friction' philosophy, consolidating complex data logic into a single lightweight SPA with an 'Elite School' aesthetic.",
      id: "Dibangun dengan filosofi 'Zero Friction'. Tantangan terbesarnya adalah mengonsolidasi logika data yang kompleks ke dalam satu SPA yang tetap ringan dan memiliki estetika 'Elite School'.",
    },
    challenges: {
      en: [
        "Consolidating fragmented data from various school departments into one source of truth.",
        "Implementing a real-time notification system for attendance and task deadlines.",
        "Designing a premium UI that feels sophisticated yet remains intuitive for younger students.",
      ],
      id: [
        "Konsolidasi data terfragmentasi dari berbagai departemen sekolah.",
        "Implementasi sistem notifikasi real-time untuk absensi dan tenggat tugas.",
        "Mendesain UI premium yang canggih namun tetap intuitif bagi siswa muda.",
      ],
    },
    solutions: {
      en: [
        "Unified all data models under a strict MongoDB schema with cross-collection validation.",
        "Used Socket.io for instant event-driven updates across the platform.",
        "Applied 'Elite Glassmorphism' design tokens with high-contrast accessibility compliance.",
      ],
      id: [
        "Penyatuan model data di bawah skema MongoDB yang ketat.",
        "Menggunakan Socket.io untuk pembaruan instan berbasis event.",
        "Menerapkan design tokens 'Elite Glassmorphism' yang memenuhi standar aksesibilitas.",
      ],
    },
  },

  // THE REST (Archives)
  {
    id: "aussie-rain-ai",
    title: "AussieRain AI",
    shortDescription: {
      en: "Enterprise-Grade Rain Prediction with Explainable AI (XAI).",
      id: "Prediksi Hujan Skala Enterprise dengan Explainable AI (XAI).",
    },
    fullDescription: {
      en: "An enterprise-grade AI Weather Forecasting dashboard designed to predict rainfall probability in Australia with precision. This application bridges the gap between complex Machine Learning models and user experience, transforming 145,000+ historical meteorological records into real-time, actionable insights through a futuristic 'Mission Control' interface.",
      id: "Dashboard Prakiraan Cuaca AI kelas enterprise yang dirancang untuk memprediksi probabilitas curah hujan di Australia dengan presisi. Aplikasi ini menjembatani kesenjangan antara model Machine Learning yang kompleks dan pengalaman pengguna, mengubah 145.000+ catatan meteorologi historis menjadi wawasan real-time melalui antarmuka 'Mission Control' yang futuristik.",
    },
    tags: ["Python Flask", "Scikit-Learn", "Alpine.js"],
    imageUrl: "/img/MLProject1.webp",
    githubUrl: "https://github.com/Rangga11268/ProjectFDA",
    liveUrl: "#",
    colSpan: "md:col-span-1 md:row-span-2", // SIDEBAR ITEM
    year: "2024",
    role: "Lead Developer & Data Analyst",
    team: [
      { name: "Darell Rangga", role: "Developer & Data Analyst" },
      { name: "Rifa Dini", role: "Data Analyst" },
      { name: "Syifa Aulia", role: "Data Analyst" },
      { name: "Megi Refkiansyah", role: "Data Analyst" },
      { name: "Wahyu Rizky", role: "Data Analyst" },
    ],
    features: {
      en: [
        "Explainable AI (XAI) Factors",
        "Historical Backtesting Engine",
        "Interactive Radar Analysis",
        "Enterprise 'Dark Glass' UI",
      ],
      id: [
        "Faktor Explainable AI (XAI)",
        "Mesin Backtesting Historis",
        "Analisis Radar Interaktif",
        "UI 'Dark Glass' Enterprise",
      ],
    },
    techStack: [
      { name: "Python (Flask)" },
      { name: "Scikit-Learn" },
      { name: "Pandas & NumPy" },
      { name: "Tailwind CSS" },
      { name: "ApexCharts.js" },
    ],
    story: {
      en: "I architected this system to solve the 'Black Box' problem in AI. Instead of just generating a prediction, I implemented a custom 'Reasoning Engine' that explains why the model predicts rain. To prove reliability, I built a Backtesting Module to audit AI performance against 10 years of historical data.",
      id: "Saya merancang sistem ini untuk memecahkan masalah 'Black Box' dalam AI. Alih-alih hanya menghasilkan prediksi, saya menerapkan 'Reasoning Engine' kustom yang menjelaskan mengapa model memprediksi hujan. Untuk membuktikan keandalan, saya membuat Modul Backtesting untuk mengaudit performa AI terhadap data historis 10 tahun.",
    },
    challenges: {
      en: [
        "Processing 145,000+ historical records in real-time for the backtesting engine.",
        "Visualizing multi-dimensional weather data (Wind, Humidity, Pressure) without performance lag.",
        "Translating complex Random Forest probability outputs into human-readable explanations.",
      ],
      id: [
        "Memproses 145.000+ catatan historis secara real-time untuk mesin backtesting.",
        "Memvisualisasikan data cuaca multi-dimensi (Angin, Kelembaban, Tekanan) tanpa lag.",
        "Menerjemahkan output probabilitas Random Forest yang kompleks menjadi penjelasan yang mudah dipahami manusia.",
      ],
    },
    solutions: {
      en: [
        "Optimized Pandas dataframes with vectorization for sub-second data processing.",
        "Used ApexCharts.js with decimated data points for smooth interactive visualization.",
        "Developed a feature importance mapping layer to convert model weights into natural language reasons.",
      ],
      id: [
        "Mengoptimalkan dataframe Pandas dengan vektorisasi untuk pemrosesan data sub-detik.",
        "Menggunakan ApexCharts.js dengan pengurangan titik data untuk visualisasi interaktif yang halus.",
        "Mengembangkan layer pemetaan feature importance untuk mengubah bobot model menjadi alasan bahasa alami.",
      ],
    },
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio",
    shortDescription: {
      en: "My personal interactive showcase. Built with Next.js 15, AI, and Holographic UI.",
      id: "Showcase interaktif personal saya. Dibangun dengan Next.js 15, AI, dan UI Holografik.",
    },
    fullDescription: {
      en: "This portfolio is more than just a resume; it's a playground for my latest experiments in web technology. Features a fully functional OS-like window system, an AI-powered terminal that mimics my personality, and a holographic identity system.",
      id: "Portofolio ini lebih dari sekadar resume; ini adalah taman bermain untuk eksperimen terbaru saya dalam teknologi web. Menampilkan sistem jendela ala OS fungsional, terminal bertenaga AI yang meniru kepribadian saya, dan sistem identitas holografik.",
    },
    tags: ["Next.js 15", "Gemini 2.0", "OS System"],
    imageUrl: "/img/portfolio.webp",
    githubUrl: "https://github.com/Rangga11268/darell-rangga",
    liveUrl: "/",
    colSpan: "md:col-span-1 md:row-span-2", // TALL SIDEBAR (1x2)
    year: "2025",
    role: "Full Stack Developer",
    features: {
      en: [
        "Rangga-AI (Gemini 2.0 Integration)",
        "OS-Style Window System",
        "Holographic ID Card",
        "Command Center Navigation",
      ],
      id: [
        "Rangga-AI (Integrasi Gemini 2.0)",
        "Sistem Jendela OS",
        "ID Holografik",
        "Navigasi Command Center",
      ],
    },
    techStack: [
      { name: "Next.js 15" },
      { name: "Google Gemini 2.0" },
      { name: "Tailwind v4" },
      { name: "Framer Motion" },
    ],
    story: {
      en: "The goal was to break the 'Static Resume' curse. I built a system where users don't just read about my skills—they interact with them. The 'Command Center' allows zero-latency navigation, while the AI Agent acts as a 24/7 representative.",
      id: "Tujuannya adalah mematahkan kutukan 'Resume Statis'. Saya membangun sistem di mana pengguna tidak hanya membaca tentang skill saya—mereka berinteraksi dengannya. 'Command Center' memungkinkan navigasi tanpa jeda, sementara Agen AI bertindak sebagai perwakilan 24/7.",
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
    imageUrl: "/img/PhdTrans.webp",
    githubUrl: "https://github.com/Rangga11268/phd-trans",
    liveUrl: "https://phd-trans.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2025",
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
    imageUrl: "/img/navara.webp",
    githubUrl: "https://github.com/Rangga11268/navara-trans",
    liveUrl: "https://navara-trans.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2025",
    role: "Full Stack Developer",
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
    imageUrl: "/img/janguleee.webp",
    githubUrl: "https://github.com/Rangga11268/janguleee-trans",
    liveUrl: "https://janguleee-trans.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2025",
    role: "Full Stack Developer",
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
    imageUrl: "/img/Apapesan.webp",
    githubUrl: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
    liveUrl: "#",
    colSpan: "md:col-span-1",
    year: "2024",
    role: "Full Stack Developer",
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
  },
  {
    id: "faktanesia",
    title: "FaktaNesia",
    shortDescription: {
      en: "AI Hoax Detector Gazette with Neo-Brutalist newspaper aesthetic.",
      id: "Detektor Hoax bertenaga AI dengan estetika koran Neo-Brutalist.",
    },
    fullDescription: {
      en: "An advanced disinformational text and image classification system designed specifically for Indonesian news and WhatsApp chats. It combines a custom TF-IDF + Logistic Regression model (99.22% accuracy) with client-side Tesseract.js OCR for screenshot reading, wrapped in a distinctive Neo-Brutalist newspaper aesthetic.",
      id: "Sistem deteksi disinformasi teks dan gambar berbasis AI tingkat lanjut untuk berita Indonesia dan chat WhatsApp. Menggabungkan model klasifikasi Logistic Regression (akurasi 99.22%) dengan OCR Tesseract.js di sisi klien untuk memindai screenshot chat, dibalut dengan estetika Neo-Brutalist Newspaper.",
    },
    tags: ["React", "Python Flask", "Scikit-Learn", "Tesseract.js"],
    imageUrl: "/img/logo_faktanesia.png",
    githubUrl: "https://github.com/Rangga11268/FaktaNesia",
    liveUrl: "http://faktanesia.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2025",
    role: "Lead AI Developer",
    features: {
      en: [
        "99.22% Accuracy AI Model",
        "Neo-Brutalist Newspaper UI",
        "Client-Side Image OCR Scanning",
        "Hoax Buster Trivia Quiz",
      ],
      id: [
        "Model AI Akurasi 99.22%",
        "UI Koran Neo-Brutalist",
        "Pemindaian Gambar OCR Sisi Klien",
        "Kuis Trivia Hoax Buster",
      ],
    },
    techStack: [
      { name: "React.js" },
      { name: "Python Flask" },
      { name: "Scikit-Learn" },
      { name: "Tesseract.js" },
      { name: "Tailwind CSS" },
    ],
    story: {
      en: "FaktaNesia was built as a response to rampant disinformation in social media. I designed the Neo-Brutalist UI to make hoax busting feel like interactive investigations rather than static reading, and added OCR so users could scan screenshots easily.",
      id: "FaktaNesia dibangun sebagai respons atas maraknya disinformasi di media sosial. Saya mendesain UI Neo-Brutalist agar verifikasi hoax terasa seperti investigasi interaktif, dan menambahkan OCR agar pengguna dapat memindai screenshot dengan mudah.",
    },
  },
  {
    id: "tirtasense",
    title: "TirtaSense AI",
    shortDescription: {
      en: "Advanced Flood Early Warning System & Regional Intelligence.",
      id: "Sistem Peringatan Dini Banjir & Intelijen Regional Tingkat Lanjut.",
    },
    fullDescription: {
      en: "TirtaSense is a modern, AI-powered disaster monitoring system designed to predict flood risks and monitor water levels in real-time within the Jabodetabek region. It runs a Random Forest machine learning model directly in the browser via ONNX Runtime Web for instant, zero-latency predictions.",
      id: "TirtaSense adalah sistem monitoring bencana bertenaga AI modern yang dirancang untuk memprediksi risiko banjir dan memantau ketinggian air secara real-time di wilayah Jabodetabek. Menjalankan model machine learning Random Forest langsung di browser via ONNX Runtime Web untuk prediksi instan tanpa latency.",
    },
    tags: ["Next.js 15", "ONNX Runtime", "Python", "Tailwind CSS"],
    imageUrl: "/img/logo_tirtasense.png",
    githubUrl: "https://github.com/Rangga11268/TirtaSense",
    liveUrl: "#",
    colSpan: "md:col-span-1",
    year: "2025",
    role: "AI & Full Stack Developer",
    features: {
      en: [
        "7-Point Flood Risk Predictor",
        "Browser Edge-AI ONNX Execution",
        "Real-Time Floodgate Tracker",
        "Priority Search (Bekasi Focused)",
      ],
      id: [
        "Prediktor Risiko Banjir 7-Poin",
        "Eksekusi ONNX Edge-AI di Browser",
        "Pelacak Pintu Air Real-Time",
        "Pencarian Prioritas (Fokus Bekasi)",
      ],
    },
    techStack: [
      { name: "Next.js 15" },
      { name: "ONNX Runtime Web" },
      { name: "Scikit-Learn" },
      { name: "Recharts" },
      { name: "Tailwind CSS v4" },
    ],
    story: {
      en: "I wanted to bring machine learning predictions closer to the edge. By compiling the model to ONNX, I avoided server-side costs and latency, allowing users in flood-prone areas to assess risk instantly on weak mobile networks.",
      id: "Saya ingin mendekatkan prediksi machine learning ke sisi pengguna. Dengan mengompilasi model ke ONNX, saya meniadakan biaya server dan latensi, memungkinkan warga di area rawan banjir menilai risiko secara instan di jaringan seluler yang lemah.",
    },
  },
  {
    id: "srb-motor-app",
    title: "SRB Motor Mobile",
    shortDescription: {
      en: "Futuristic automotive dealership companion app built with Flutter.",
      id: "Aplikasi pendamping dealer otomotif futuristik yang dibangun dengan Flutter.",
    },
    fullDescription: {
      en: "A professional mobile application built with Flutter to serve as a companion to the SRB Motor dealership platform. It features complete credit simulators, digital document vault, and native integrations like geolocation and Midtrans payment gateway, organized under clean state management.",
      id: "Aplikasi mobile profesional yang dibangun dengan Flutter sebagai pendamping platform dealer SRB Motor. Menampilkan simulator kredit lengkap, brankas dokumen digital, serta integrasi native seperti geolokasi dan payment gateway Midtrans.",
    },
    tags: ["Flutter", "Dart", "Provider", "Midtrans SDK"],
    imageUrl: "/img/logo_srb.webp",
    githubUrl: "https://github.com/Rangga11268/SrbMotorApp",
    liveUrl: "#",
    colSpan: "md:col-span-1",
    year: "2025",
    role: "Mobile App Developer",
    features: {
      en: [
        "Clean State Management (Provider)",
        "Midtrans SDK Payment Gateway",
        "Digital Document Vault",
        "Geolocation-based Dealer Search",
      ],
      id: [
        "State Management Bersih (Provider)",
        "Payment Gateway Midtrans SDK",
        "Brankas Dokumen Digital",
        "Pencarian Dealer berbasis Geolokasi",
      ],
    },
    techStack: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Provider" },
      { name: "Midtrans SDK" },
      { name: "SQLite (sqflite)" },
    ],
    story: {
      en: "Designing SrbMotorApp allowed me to bridge native mobile experiences with modern automotive commerce. Managing secure state for document uploads and integrating the payment SDK directly within the mobile environment was key to building a robust utility.",
      id: "Mendesain SrbMotorApp memungkinkan saya menjembatani pengalaman mobile native dengan e-commerce otomotif modern. Mengelola state yang aman untuk unggahan dokumen dan mengintegrasikan SDK pembayaran langsung di lingkungan mobile adalah kunci membangun utilitas tangguh ini.",
    },
  },
  {
    id: "cumlaude-area",
    title: "Cumlaude Area",
    shortDescription: {
      en: "Interactive exam simulation and study guide portal for BSI students.",
      id: "Portal simulasi ujian dan panduan belajar interaktif untuk mahasiswa BSI.",
    },
    fullDescription: {
      en: "An interactive learning platform tailored for Bina Sarana Informatika (BSI) students. It features a complete UTS MPSI simulator (60 questions), progressive level gating, automated explanation feedback, and light academic styling, constructed with pure Vanilla CSS for visual control.",
      id: "Platform pembelajaran interaktif yang disesuaikan untuk mahasiswa Bina Sarana Informatika (BSI). Menampilkan simulator UTS MPSI lengkap (60 soal), pembatasan level progresif, pembahasan jawaban otomatis, dan styling akademis yang ringan, dibuat dengan Vanilla CSS murni untuk kontrol visual penuh."
    },
    tags: ["React", "Vite", "Vanilla CSS"],
    imageUrl: "/img/logo_cumlaude.png",
    githubUrl: "https://github.com/Rangga11268/cumlaudeArea",
    liveUrl: "#",
    colSpan: "md:col-span-1",
    year: "2025",
    role: "Front End Developer",
    features: {
      en: [
        "60-Question UTS MPSI Simulator",
        "Progressive Level Gating",
        "Real-time Rationale & Discussion",
        "Zero-dependency Vector Icons",
      ],
      id: [
        "Simulator UTS MPSI 60 Soal",
        "Sistem Kunci Level Progresif",
        "Pembahasan & Rasionalisasi Real-time",
        "Ikon Vektor Tanpa Dependensi",
      ],
    },
    techStack: [
      { name: "React.js" },
      { name: "Vite" },
      { name: "Vanilla CSS" },
      { name: "SVG Vector Graphics" },
    ],
    story: {
      en: "Cumlaude Area was created to make exam prep less stressful. I built a level-progression system to chunk learning material, and avoided heavy CSS frameworks to ensure maximum rendering efficiency and custom styling precision.",
      id: "Cumlaude Area dibuat untuk mengurangi tingkat stres dalam persiapan ujian. Saya membangun sistem progres level untuk membagi materi belajar, dan menghindari framework CSS berat untuk menjamin efisiensi rendering maksimal dan presisi gaya kustom.",
    },
  },
  {
    id: "have-a-treat",
    title: "Have a Treat",
    shortDescription: {
      en: "Modern cafe platform featuring digital reservation and WhatsApp ordering.",
      id: "Platform kafe modern dengan reservasi digital dan pemesanan WhatsApp.",
    },
    fullDescription: {
      en: "A modern cafe web portal for Have a Treat cafe at Jakarta Garden City. It features a high-performance interactive menu with live category filters, digital table reservation, and a WhatsApp checkout engine that creates automated, pre-formatted order logs.",
      id: "Portal web kafe modern untuk Have a Treat di Jakarta Garden City. Menampilkan menu interaktif berkinerja tinggi dengan filter kategori langsung, reservasi meja digital, dan WhatsApp checkout engine untuk membuat pesan pesanan otomatis.",
    },
    tags: ["Next.js 14", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/img/haveatreat_hero.png",
    githubUrl: "https://github.com/Rangga11268/haveatreat",
    liveUrl: "https://have-a-treat.vercel.app/",
    colSpan: "md:col-span-1",
    year: "2026",
    role: "Full Stack Developer",
    features: {
      en: [
        "WhatsApp Checkout Engine",
        "Live Filterable Interactive Menu",
        "Digital Table Booking System",
        "Smooth Parallax Ambiance Pages",
      ],
      id: [
        "Mesin Checkout WhatsApp",
        "Menu Interaktif dengan Filter Langsung",
        "Sistem Reservasi Meja Digital",
        "Halaman Galeri dengan Efek Paralaks",
      ],
    },
    techStack: [
      { name: "Next.js 14" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Lucide React" },
    ],
    story: {
      en: "Designed to match the warm, aesthetic ambiance of the cafe. The WhatsApp ordering flow bridges the gap between digital ease and personal service, converting user selections into a neat, easily readable ticket for the barista.",
      id: "Dirancang untuk mencocokkan suasana hangat dan estetik kafe. Alur pemesanan WhatsApp menjembatani kemudahan digital dengan layanan personal, mengubah pilihan menu pengguna menjadi tiket pesanan yang rapi untuk barista.",
    },
  },
];

