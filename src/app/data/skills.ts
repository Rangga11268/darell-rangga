import { Project, projects } from "./projects";

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: "Grandmaster" | "Expert" | "Advanced" | "Intermediate";
  description: { en: string; id: string };
  category: "Frontend" | "Backend" | "Ecosystem" | "Language" | "Tool";
  relatedProjectIds: string[];
}

export const skills: Skill[] = [
  // CORE LANGUAGES
  {
    id: "ts",
    name: "TypeScript",
    icon: "ts",
    level: "Expert",
    description: {
      en: "My primary language for scalable applications. Type safety is my religion.",
      id: "Bahasa utama saya untuk aplikasi skala besar. Type safety adalah kewajiban.",
    },
    category: "Language",
    relatedProjectIds: ["portfolio", "satya-hub", "phd-trans"],
  },
  {
    id: "php",
    name: "PHP",
    icon: "php",
    level: "Grandmaster",
    description: {
      en: "The backbone of the web. Deep expertise in modern PHP and Laravel ecosystem.",
      id: "Tulang punggung web. Keahlian mendalam di PHP modern dan ekosistem Laravel.",
    },
    category: "Language",
    relatedProjectIds: ["tujago", "srb-motor-v2", "apapesan"],
  },
  {
    id: "js",
    name: "JavaScript",
    icon: "js",
    level: "Expert",
    description: {
      en: "The language of the browser. Mastered ES6+ and async patterns.",
      id: "Bahasa browser. Menguasai ES6+ dan pola asinkron.",
    },
    category: "Language",
    relatedProjectIds: ["navara-trans", "janguleee-trans"],
  },

  {
    id: "python",
    name: "Python",
    icon: "python",
    level: "Advanced",
    description: {
      en: "Data manipulation, ML pipelines, and backend automation.",
      id: "Manipulasi data, pipeline ML, dan otomasi backend.",
    },
    category: "Language",
    relatedProjectIds: ["aussie-rain-ai"],
  },

  // FRONTEND
  {
    id: "nextjs",
    name: "Next.js",
    icon: "nextjs",
    level: "Expert",
    description: {
      en: "My go-to meta-framework for high-performance React applications. Server Components believer.",
      id: "Meta-framework andalan untuk aplikasi React performa tinggi. Pengguna setia Server Components.",
    },
    category: "Frontend",
    relatedProjectIds: ["portfolio", "phd-trans", "janguleee-trans"],
  },
  {
    id: "react",
    name: "React",
    icon: "react",
    level: "Expert",
    description: {
      en: "Building complex UIs with hooks, context, and modern patterns.",
      id: "Membangun UI kompleks dengan hooks, context, dan pola modern.",
    },
    category: "Frontend",
    relatedProjectIds: ["satya-hub", "navara-trans", "srb-motor-v2"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "tailwind",
    level: "Grandmaster",
    description: {
      en: "I speak fluent utility classes. Capable of building complex designs rapidly.",
      id: "Sangat fasih dengan utility classes. Mampu membangun desain kompleks dengan cepat.",
    },
    category: "Frontend",
    relatedProjectIds: [
      "tujago",
      "portfolio",
      "srb-motor-v2",
      "aussie-rain-ai",
    ],
  },
  {
    id: "framer",
    name: "Framer Motion",
    icon: "framer", // Trying "framer" as "motion" didn't work
    level: "Advanced",
    description: {
      en: "Breathing life into static interfaces with physics-based animations.",
      id: "Menghidupkan antarmuka statis dengan animasi berbasis fisika.",
    },
    category: "Frontend",
    relatedProjectIds: ["portfolio", "phd-trans", "janguleee-trans"],
  },
  {
    id: "flask",
    name: "Flask",
    icon: "flask",
    level: "Advanced",
    description: {
      en: "Micro-framework for lightweight APIs and ML model deployment.",
      id: "Micro-framework untuk API ringan dan deployment model ML.",
    },
    category: "Backend",
    relatedProjectIds: ["aussie-rain-ai"],
  },
  {
    id: "scikit",
    name: "Scikit-Learn",
    icon: "sklearn",
    level: "Intermediate",
    description: {
      en: "Building predictive models like Random Forest for real-world applications.",
      id: "Membangun model prediktif seperti Random Forest untuk aplikasi dunia nyata.",
    },
    category: "Ecosystem",
    relatedProjectIds: ["aussie-rain-ai"],
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "vue",
    level: "Advanced",
    description: {
      en: "My first love in reactive frameworks. Still maintaining legacy systems.",
      id: "Cinta pertama saya di framework reaktif. Masih memelihara sistem legacy.",
    },
    category: "Frontend",
    relatedProjectIds: ["tujago"],
  },

  // BACKEND & ECOSYSTEM
  {
    id: "laravel",
    name: "Laravel",
    icon: "laravel",
    level: "Grandmaster",
    description: {
      en: "Building enterprise-grade monoliths and APIs. Deep knowledge of Eloquent and Queues.",
      id: "Membangun monolith dan API kelas enterprise. Pengetahuan mendalam tentang Eloquent dan Queues.",
    },
    category: "Backend",
    relatedProjectIds: ["tujago", "srb-motor-v2", "apapesan"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "nodejs",
    level: "Advanced",
    description: {
      en: "Runtime for my real-time applications and build tools.",
      id: "Runtime untuk aplikasi real-time dan build tools saya.",
    },
    category: "Backend",
    relatedProjectIds: ["satya-hub", "apapesan"],
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: "mysql",
    level: "Expert",
    description: {
      en: "Complex query optimization and schema design for relational data.",
      id: "Optimasi query kompleks dan desain skema untuk data relasional.",
    },
    category: "Backend",
    relatedProjectIds: ["tujago", "srb-motor-v2"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "mongodb",
    level: "Intermediate",
    description: {
      en: "For flexible document storage in rapid prototyping phases.",
      id: "Untuk penyimpanan dokumen fleksibel dalam fase prototyping cepat.",
    },
    category: "Backend",
    relatedProjectIds: ["satya-hub"],
  },

  // TOOLS
  {
    id: "figma",
    name: "Figma",
    icon: "figma",
    level: "Advanced",
    description: {
      en: "Designing systems before writing a single line of code.",
      id: "Mendesain sistem sebelum menulis satu baris kode pun.",
    },
    category: "Tool",
    relatedProjectIds: ["tujago"],
  },
  {
    id: "git",
    name: "Git",
    icon: "git",
    level: "Expert",
    description: {
      en: "Version control mastery. Rebasing, cherry-picking, and flow management.",
      id: "Penguasaan version control. Rebasing, cherry-picking, dan manajemen alur.",
    },
    category: "Tool",
    relatedProjectIds: ["portfolio", "tujago"],
  },
];

export function getSkillUsage(skillId: string): Project[] {
  const skill = skills.find((s) => s.id === skillId);
  if (!skill) return [];
  return projects.filter((p) => skill.relatedProjectIds.includes(p.id));
}
