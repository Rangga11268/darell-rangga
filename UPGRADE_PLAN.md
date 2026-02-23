# Portfolio v2 — Master Upgrade Plan

> Dokumen perancangan lengkap upgrade portfolio darellrangga.me  
> Dibuat: 23 Februari 2026 | Terakhir diupdate: 23 Februari 2026  
> Status keseluruhan: **SIAP EKSEKUSI** — semua API keys sudah terkonfigurasi

---

## Daftar Isi

1. [Tech Stack](#1-tech-stack)
2. [Status Environment Variables](#2-status-environment-variables)
3. [Struktur Folder Target](#3-struktur-folder-target)
4. [Skema Database Prisma](#4-skema-database-prisma)
5. [Routing & Halaman](#5-routing--halaman)
6. [Phase 1 — Foundation (Auth + DB)](#6-phase-1--foundation-auth--db)
7. [Phase 2 — Multi-page Projects](#7-phase-2--multi-page-projects)
8. [Phase 3 — Social Features](#8-phase-3--social-features)
9. [Phase 4 — Pro Features](#9-phase-4--pro-features)
10. [Phase 5 — Content & Stats](#10-phase-5--content--stats)
11. [Deployment Checklist](#11-deployment-checklist)
12. [Referensi](#12-referensi)

---

## 1. Tech Stack

| Layer      | Teknologi                    | Status       |
| ---------- | ---------------------------- | ------------ |
| Framework  | Next.js 15 (App Router)      | ✅ Aktif     |
| Styling    | Tailwind CSS + Framer Motion | ✅ Aktif     |
| Database   | PostgreSQL via Neon.tech     | ✅ Setup     |
| ORM        | Prisma 5.x                   | ⏳ Install   |
| Auth       | NextAuth v5 (Auth.js)        | ⏳ Install   |
| Realtime   | Pusher Channels              | ✅ Keys siap |
| Email      | Resend                       | ✅ Keys siap |
| AI Chat    | Google Gemini + Groq         | ✅ Aktif     |
| Deployment | Vercel                       | ✅ Aktif     |

---

## 2. Status Environment Variables

```env
# ✅ SUDAH ADA & TERISI semua

# AI
GEMINI_API_KEY=...                    ✅
GROQ_API_KEY=...                      ✅
OPENROUTER_API_KEY=...                ✅

# GitHub API (authenticated, 5000 req/hr)
GITHUB_TOKEN=...                      ✅

# Auth (NextAuth v5)
NEXTAUTH_URL=https://darellrangga.me  ✅
NEXTAUTH_SECRET=...                   ✅

# Google OAuth
GOOGLE_CLIENT_ID=...                  ✅
GOOGLE_CLIENT_SECRET=...              ✅

# GitHub OAuth
GITHUB_CLIENT_ID=...                  ✅
GITHUB_CLIENT_SECRET=...              ✅

# Database (Neon PostgreSQL)
DATABASE_URL=...                      ✅ (pooled)
DATABASE_URL_UNPOOLED=...             ✅ (direct)

# Email (Resend)
RESEND_API_KEY=...                    ✅

# Realtime (Pusher Channels — ap1 Singapore)
NEXT_PUBLIC_PUSHER_KEY=...            ✅
NEXT_PUBLIC_PUSHER_CLUSTER=ap1        ✅
PUSHER_APP_ID=...                     ✅
PUSHER_SECRET=...                     ✅

# Spotify (Phase 5 — opsional, butuh akun Premium)
SPOTIFY_CLIENT_ID=...                 ✅
SPOTIFY_CLIENT_SECRET=...             ✅
SPOTIFY_REFRESH_TOKEN=                ⏳ (perlu OAuth flow)
```

> ⚠️ **Google OAuth**: Authorized JavaScript origins → `https://darellrangga.me`  
> Authorized redirect URIs → `https://darellrangga.me/api/auth/callback/google` dan `http://localhost:3000/api/auth/callback/google`

> ⚠️ **GitHub OAuth callback**: `https://darellrangga.me/api/auth/callback/github` dan `http://localhost:3000/api/auth/callback/github`

---

## 3. Struktur Folder Target

```
src/
├── app/
│   ├── page.tsx                          → / (Home)
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── projects/
│   │   ├── page.tsx                      → /projects
│   │   └── [slug]/
│   │       └── page.tsx                  → /projects/[slug]
│   │
│   ├── guestbook/
│   │   └── page.tsx                      → /guestbook
│   │
│   ├── stats/
│   │   └── page.tsx                      → /stats
│   │
│   ├── hire/
│   │   └── page.tsx                      → /hire
│   │
│   ├── snippets/
│   │   ├── page.tsx                      → /snippets
│   │   └── [slug]/
│   │       └── page.tsx                  → /snippets/[slug]
│   │
│   ├── admin/
│   │   ├── layout.tsx                    → protected (ADMIN only)
│   │   ├── page.tsx                      → /admin dashboard
│   │   ├── comments/
│   │   │   └── page.tsx
│   │   ├── requests/
│   │   │   └── page.tsx
│   │   └── snippets/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts              → NextAuth handler
│       ├── chat/
│       │   └── route.ts                  ✅ sudah ada
│       ├── github/
│       │   └── route.ts                  ✅ sudah ada (authenticated)
│       ├── projects/
│       │   └── [slug]/
│       │       ├── views/route.ts        → increment + get view count
│       │       ├── comments/route.ts     → GET + POST comments
│       │       └── reactions/route.ts    → POST + DELETE reactions
│       ├── guestbook/
│       │   └── route.ts                  → GET + POST entries
│       ├── hire/
│       │   └── route.ts                  → POST hire request + email notif
│       ├── pusher/
│       │   └── auth/route.ts             → Pusher private channel auth
│       ├── admin/
│       │   ├── comments/route.ts         → DELETE comment
│       │   ├── requests/[id]/route.ts    → PATCH status
│       │   └── snippets/route.ts         → CRUD snippets
│       └── spotify/
│           ├── now-playing/route.ts      → GET current track
│           └── callback/route.ts         → OAuth callback (setup sekali)
│
├── components/
│   └── ui/                               ✅ sudah ada
│
├── lib/
│   ├── utils.ts                          ✅ sudah ada
│   ├── animations.ts                     ✅ sudah ada
│   ├── prisma.ts                         → Prisma client singleton
│   ├── auth.ts                           → NextAuth config
│   ├── pusher.ts                         → Pusher server + client instance
│   ├── resend.ts                         → Resend instance
│   └── spotify.ts                        → Spotify helper functions
│
└── middleware.ts                         → Protect /admin routes
```

---

## 4. Skema Database Prisma

```prisma
// prisma/schema.prisma

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}

generator client {
  provider = "prisma-client-js"
}

// ─── AUTH (NextAuth required tables) ─────────────────────

enum Role {
  VISITOR
  ADMIN
}

model User {
  id            String           @id @default(cuid())
  name          String?
  email         String?          @unique
  emailVerified DateTime?
  image         String?
  role          Role             @default(VISITOR)
  accounts      Account[]
  sessions      Session[]
  comments      Comment[]
  guestbook     GuestbookEntry[]
  createdAt     DateTime         @default(now())
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ─── PROJECTS ────────────────────────────────────────────

model Project {
  id        String     @id @default(cuid())
  slug      String     @unique
  views     Int        @default(0)
  comments  Comment[]
  reactions Reaction[]
  createdAt DateTime   @default(now())
}

// ─── COMMENTS ────────────────────────────────────────────

model Comment {
  id        String   @id @default(cuid())
  text      String   @db.Text
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

// ─── REACTIONS (no login, by IP hash) ────────────────────

model Reaction {
  id        String   @id @default(cuid())
  type      String   // "fire" | "star" | "clap"
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  ipHash    String   // SHA-256 dari IP (privacy-friendly)
  createdAt DateTime @default(now())

  @@unique([projectId, ipHash, type])
}

// ─── GUESTBOOK ───────────────────────────────────────────

model GuestbookEntry {
  id        String   @id @default(cuid())
  message   String   @db.Text
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

// ─── HIRE ME REQUESTS ────────────────────────────────────

enum RequestStatus {
  NEW
  IN_REVIEW
  RESPONDED
  CLOSED
}

model HireRequest {
  id          String        @id @default(cuid())
  name        String
  email       String
  budget      String?
  deadline    String?
  description String        @db.Text
  status      RequestStatus @default(NEW)
  createdAt   DateTime      @default(now())
}

// ─── SNIPPETS ────────────────────────────────────────────

model Snippet {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String?
  language    String   // "typescript" | "bash" | "css" | dll
  code        String   @db.Text
  tags        String[]
  views       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ─── SITE CONFIG ─────────────────────────────────────────

model SiteConfig {
  key       String   @id   // "availability_status" | "available_for_work"
  value     String
  updatedAt DateTime @updatedAt
}

// ─── PAGE VIEWS (untuk /stats) ────────────────────────────

model PageView {
  id        String   @id @default(cuid())
  path      String
  createdAt DateTime @default(now())

  @@index([path])
  @@index([createdAt])
}
```

---

## 5. Routing & Halaman

| Route              | Konten                                              | Auth   |
| ------------------ | --------------------------------------------------- | ------ |
| `/`                | Hero, Skills, Projects preview, Experience, Contact | Public |
| `/projects`        | Grid semua project + filter tag                     | Public |
| `/projects/[slug]` | Case study full page + comments + reactions         | Public |
| `/guestbook`       | Form + list pesan tamu                              | Login  |
| `/stats`           | Views, GitHub stats, guestbook count, snippets      | Public |
| `/hire`            | Services, pricing, request form                     | Public |
| `/snippets`        | Daftar snippet + filter bahasa/tag                  | Public |
| `/snippets/[slug]` | Full code + syntax highlight + copy                 | Public |
| `/admin`           | Overview dashboard                                  | ADMIN  |
| `/admin/comments`  | Moderasi komentar project                           | ADMIN  |
| `/admin/requests`  | Inbox hire me form                                  | ADMIN  |
| `/admin/snippets`  | CRUD snippets                                       | ADMIN  |

---

## 6. Phase 1 — Foundation (Auth + DB)

**Status:** ⏳ Belum dimulai  
**Estimasi:** 1–2 hari

### 6.1 Install Dependencies

```bash
npm install prisma @prisma/client next-auth@beta @auth/prisma-adapter
npx prisma init
```

### 6.2 Setup `prisma/schema.prisma`

Salin schema dari [Skema Database](#4-skema-database-prisma) ke `prisma/schema.prisma`.

```bash
npx prisma db push        # Push schema ke Neon (tanpa migrasi file)
npx prisma generate       # Generate Prisma Client
```

### 6.3 `src/lib/prisma.ts` — Singleton Client

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 6.4 `src/lib/auth.ts` — NextAuth Config

```typescript
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = (user as { role: string }).role;
      return session;
    },
  },
});
```

### 6.5 `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;
```

### 6.6 `src/middleware.ts` — Protect Admin

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
```

### 6.7 `src/types/next-auth.d.ts` — Extend Session Type

```typescript
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
```

### 6.8 Set Role ADMIN

Setelah login pertama kali, jalankan di Neon SQL editor atau via Prisma Studio:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'darellrangga@gmail.com';
```

Atau via Prisma Studio:

```bash
npx prisma studio
```

### Checklist Phase 1

- [ ] Install `prisma @prisma/client next-auth@beta @auth/prisma-adapter`
- [ ] Buat `prisma/schema.prisma` dengan schema lengkap di atas
- [ ] `npx prisma db push`
- [ ] `npx prisma generate`
- [ ] Buat `src/lib/prisma.ts`
- [ ] Buat `src/lib/auth.ts`
- [ ] Buat `src/app/api/auth/[...nextauth]/route.ts`
- [ ] Buat `src/middleware.ts`
- [ ] Buat `src/types/next-auth.d.ts`
- [ ] Login pertama via Google/GitHub
- [ ] Set role ADMIN di DB
- [ ] Test akses `/admin` (harus redirect kalau bukan ADMIN)

---

## 7. Phase 2 — Multi-page Projects

**Status:** ⏳ Belum dimulai  
**Estimasi:** 2–3 hari  
**Prerequisite:** Phase 1 selesai

### 7.1 Halaman `/projects`

```typescript
// src/app/projects/page.tsx
import { prisma } from "@/lib/prisma";
import { projects } from "@/data/projects";

export default async function ProjectsPage() {
  const viewCounts = await prisma.project.findMany({
    select: { slug: true, views: true },
  });
  const viewMap = Object.fromEntries(viewCounts.map((p) => [p.slug, p.views]));

  return (
    <main>
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          views={viewMap[project.slug] ?? 0}
        />
      ))}
    </main>
  );
}
```

### 7.2 API View Counter

```typescript
// src/app/api/projects/[slug]/views/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const project = await prisma.project.upsert({
    where: { slug: params.slug },
    create: { slug: params.slug, views: 1 },
    update: { views: { increment: 1 } },
  });
  return NextResponse.json({ views: project.views });
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    select: { views: true },
  });
  return NextResponse.json({ views: project?.views ?? 0 });
}
```

### Checklist Phase 2

- [ ] Buat `src/app/projects/page.tsx` (grid + filter tag)
- [ ] Buat `src/app/projects/[slug]/page.tsx` (case study full page)
- [ ] Buat `src/app/api/projects/[slug]/views/route.ts`
- [ ] Update `ProjectCard`: ganti `onClick modal` → `Link href="/projects/[slug]"`
- [ ] Tambah `generateStaticParams` untuk SSG semua slug
- [ ] Tambah `generateMetadata` untuk SEO per project
- [ ] Update Home: project preview tetap ada, tapi ada tombol "View All Projects"

---

## 8. Phase 3 — Social Features

**Status:** ⏳ Belum dimulai  
**Estimasi:** 3–4 hari  
**Prerequisite:** Phase 1 & 2 selesai

### 8.1 Comments API

```typescript
// src/app/api/projects/[slug]/comments/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const comments = await prisma.comment.findMany({
    where: { project: { slug: params.slug } },
    include: { user: { select: { name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text } = await req.json();
  if (!text?.trim())
    return NextResponse.json({ error: "Empty comment" }, { status: 400 });

  const project = await prisma.project.upsert({
    where: { slug: params.slug },
    create: { slug: params.slug },
    update: {},
  });

  const comment = await prisma.comment.create({
    data: { text, userId: session.user.id, projectId: project.id },
    include: { user: { select: { name: true, image: true } } },
  });

  return NextResponse.json(comment, { status: 201 });
}
```

### 8.2 Reactions (no login, by IP hash)

```typescript
// src/app/api/projects/[slug]/reactions/route.ts
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

function hashIp(ip: string) {
  return createHash("sha256")
    .update(ip + process.env.NEXTAUTH_SECRET)
    .digest("hex");
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const ipHash = hashIp(ip);
  const { type } = await req.json(); // "fire" | "star" | "clap"

  const project = await prisma.project.upsert({
    where: { slug: params.slug },
    create: { slug: params.slug },
    update: {},
  });

  // Toggle: cek dulu apakah sudah ada
  const existing = await prisma.reaction.findUnique({
    where: { projectId_ipHash_type: { projectId: project.id, ipHash, type } },
  });

  if (existing) {
    await prisma.reaction.delete({ where: { id: existing.id } });
    return NextResponse.json({ reacted: false });
  } else {
    await prisma.reaction.create({
      data: { type, projectId: project.id, ipHash },
    });
    return NextResponse.json({ reacted: true });
  }
}
```

### 8.3 Guestbook

```typescript
// src/app/api/guestbook/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const entries = await prisma.guestbookEntry.findMany({
    include: { user: { select: { name: true, image: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await req.json();
  if (!message?.trim() || message.length > 280)
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });

  const entry = await prisma.guestbookEntry.create({
    data: { message, userId: session.user.id },
    include: { user: { select: { name: true, image: true } } },
  });

  return NextResponse.json(entry, { status: 201 });
}
```

### Checklist Phase 3

- [ ] Buat API route comments (GET + POST)
- [ ] Buat `CommentsSection` component dengan optimistic UI
- [ ] Buat API route reactions (POST toggle)
- [ ] Buat `ReactionsBar` component (🔥 ⭐ 👏 + count)
- [ ] Buat `src/app/guestbook/page.tsx`
- [ ] Buat API route guestbook (GET + POST)
- [ ] Tambah auth prompt ketika user belum login dan coba comment/guestbook
- [ ] Buat `SignInButton` component (Google + GitHub)

---

## 9. Phase 4 — Pro Features

**Status:** ⏳ Belum dimulai  
**Estimasi:** 1 minggu  
**Prerequisite:** Phase 1 selesai

### 9.1 Dynamic Availability Badge

```typescript
// src/app/api/admin/availability/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const config = await prisma.siteConfig.findUnique({
    where: { key: "available_for_work" },
  });
  return NextResponse.json({ available: config?.value === "true" });
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { available } = await req.json();
  await prisma.siteConfig.upsert({
    where: { key: "available_for_work" },
    create: { key: "available_for_work", value: String(available) },
    update: { value: String(available) },
  });
  return NextResponse.json({ available });
}
```

### 9.2 Hire Me API

```typescript
// src/app/api/hire/route.ts
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, budget, deadline, description } = await req.json();

  const request = await prisma.hireRequest.create({
    data: { name, email, budget, deadline, description },
  });

  // Notifikasi ke kamu
  await resend.emails.send({
    from: "portfolio@darellrangga.me",
    to: "darellrangga@gmail.com",
    subject: `[Hire Request] ${name} — ${budget ?? "No budget"}`,
    html: `<h2>New Hire Request</h2>
           <p><strong>From:</strong> ${name} (${email})</p>
           <p><strong>Budget:</strong> ${budget ?? "-"}</p>
           <p><strong>Deadline:</strong> ${deadline ?? "-"}</p>
           <p><strong>Description:</strong><br>${description}</p>`,
  });

  // Konfirmasi ke pengirim
  await resend.emails.send({
    from: "portfolio@darellrangga.me",
    to: email,
    subject: "Request received — Darell Rangga",
    html: `<h2>Hi ${name}!</h2>
           <p>I've received your project request and will get back to you within 1-2 business days.</p>
           <p>— Darell</p>`,
  });

  return NextResponse.json({ id: request.id }, { status: 201 });
}
```

### 9.3 Pusher Setup

```bash
npm install pusher pusher-js
```

```typescript
// src/lib/pusher.ts
import Pusher from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER! },
);
```

Channel: `presence-chat` | Events: `message:new`, `user:typing`

### 9.4 Admin Dashboard Content

Widget di `/admin`:

- Total page views (sum semua path)
- Total project views
- Total komentar + berapa yang belum dimoderasi
- Total guestbook entries
- Hire requests per status (NEW / IN_REVIEW / RESPONDED / CLOSED)
- Toggle availability badge
- Tabel komentar terbaru dengan tombol hapus

### Checklist Phase 4

- [ ] Buat `src/app/hire/page.tsx` (services, pricing, FAQ, form)
- [ ] Buat `src/app/api/hire/route.ts`
- [ ] Setup Resend domain verification di dashboard Resend
- [ ] Buat `src/lib/pusher.ts`
- [ ] Buat chat widget component (floating bubble)
- [ ] Buat `src/app/api/pusher/auth/route.ts`
- [ ] Buat `src/app/api/admin/availability/route.ts`
- [ ] Buat `src/app/admin/page.tsx` dengan semua widget
- [ ] Buat `src/app/admin/comments/page.tsx` (list + delete)
- [ ] Buat `src/app/admin/requests/page.tsx` (list + status change)
- [ ] Buat `src/app/admin/layout.tsx` (sidebar nav admin)

---

## 10. Phase 5 — Content & Stats

**Status:** ⏳ Belum dimulai  
**Estimasi:** 3–4 hari  
**Prerequisite:** Phase 1 selesai

### 10.1 Stats Page

```typescript
// src/app/stats/page.tsx — Server Component
import { prisma } from "@/lib/prisma";

export default async function StatsPage() {
  const [totalViews, totalComments, totalGuests, totalSnippets] =
    await Promise.all([
      prisma.project.aggregate({ _sum: { views: true } }),
      prisma.comment.count(),
      prisma.guestbookEntry.count(),
      prisma.snippet.count(),
    ]);

  const githubRes = await fetch(`${process.env.NEXTAUTH_URL}/api/github`);
  const github = await githubRes.json();

  // Render cards dengan data di atas
}
```

Data yang ditampilkan:

- Total project views (DB)
- Total komentar
- Total guestbook entries
- Total snippets
- GitHub: public repos, followers, stars total, commit terakhir
- Spotify Now Playing _(opsional, butuh Premium)_

### 10.2 Snippets Setup

```bash
npm install shiki
```

```typescript
// src/app/snippets/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { codeToHtml } from "shiki";
import { notFound } from "next/navigation";

export default async function SnippetPage({ params }: { params: { slug: string } }) {
  const snippet = await prisma.snippet.findUnique({ where: { slug: params.slug } });
  if (!snippet) notFound();

  await prisma.snippet.update({
    where: { slug: params.slug },
    data: { views: { increment: 1 } },
  });

  const highlightedCode = await codeToHtml(snippet.code, {
    lang: snippet.language,
    theme: "github-dark",
  });

  return (/* render snippet detail */);
}
```

### 10.3 Spotify Now Playing _(opsional, butuh Premium)_

One-time setup OAuth flow:

1. Buka URL ini di browser (ganti CLIENT_ID):  
   `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://darellrangga.me/api/spotify/callback&scope=user-read-currently-playing,user-read-recently-played`
2. Login → authorize
3. Callback kamu dapat `code` → tukar dengan `refresh_token` via POST ke Spotify token endpoint
4. Simpan sebagai `SPOTIFY_REFRESH_TOKEN` di `.env.local` dan Vercel

```typescript
// src/lib/spotify.ts
async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  return res.json();
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();
  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}
```

### Checklist Phase 5

- [ ] Buat `src/app/stats/page.tsx`
- [ ] Buat `src/app/snippets/page.tsx` (list + filter bahasa/tag + search)
- [ ] Buat `src/app/snippets/[slug]/page.tsx` (detail + syntax highlight + copy)
- [ ] Buat API CRUD snippets di `src/app/api/admin/snippets/route.ts`
- [ ] Buat `src/app/admin/snippets/page.tsx` (CRUD form)
- [ ] Install `shiki`
- [ ] Tambah section `Uses` di Home (tools, hardware, software — data statis)
- [ ] Tambah section `Timeline` di Home (perjalanan karir — data statis)
- [ ] _(Opsional)_ Setup Spotify OAuth flow → dapat `SPOTIFY_REFRESH_TOKEN`
- [ ] _(Opsional)_ Buat `src/app/api/spotify/now-playing/route.ts`

---

## 11. Deployment Checklist

### Vercel Environment Variables

Semua key dari `.env.local` harus dimasukkan ke:  
**Vercel Dashboard → Project → Settings → Environment Variables**

```
NEXTAUTH_URL               = https://darellrangga.me
NEXTAUTH_SECRET            = <sama dengan .env.local>
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
DATABASE_URL               (pooled — untuk runtime)
DATABASE_URL_UNPOOLED      (direct — untuk prisma migrate)
RESEND_API_KEY
NEXT_PUBLIC_PUSHER_KEY
NEXT_PUBLIC_PUSHER_CLUSTER = ap1
PUSHER_APP_ID
PUSHER_SECRET
GEMINI_API_KEY
GROQ_API_KEY
OPENROUTER_API_KEY
GITHUB_TOKEN
SPOTIFY_CLIENT_ID          (Phase 5)
SPOTIFY_CLIENT_SECRET      (Phase 5)
SPOTIFY_REFRESH_TOKEN      (Phase 5)
```

### OAuth Callback URLs yang Harus Terdaftar

| Provider | URL                                                |
| -------- | -------------------------------------------------- |
| Google   | `https://darellrangga.me/api/auth/callback/google` |
| Google   | `http://localhost:3000/api/auth/callback/google`   |
| GitHub   | `https://darellrangga.me/api/auth/callback/github` |
| GitHub   | `http://localhost:3000/api/auth/callback/github`   |
| Spotify  | `https://darellrangga.me/api/spotify/callback`     |

> ⚠️ Google: **Authorized JavaScript origins** hanya domain (`https://darellrangga.me`), redirect URI taruh di **Authorized redirect URIs**

### Resend Domain Verification

1. Login [resend.com](https://resend.com) → Domains → Add Domain → `darellrangga.me`
2. Tambah DNS records yang diberikan ke provider domain kamu
3. Tunggu verified → baru bisa kirim email dari `portfolio@darellrangga.me`

### Pre-deploy Commands

```bash
npx prisma generate          # Selalu run sebelum build
npx prisma db push           # Sinkronkan schema ke Neon
npm run build                # Pastikan tidak ada error
```

---

## 12. Referensi

- [Prisma + Neon](https://www.prisma.io/docs/orm/overview/databases/neon)
- [NextAuth v5 (Auth.js) docs](https://authjs.dev)
- [NextAuth Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma)
- [Pusher Next.js tutorial](https://pusher.com/tutorials/realtime-app-next/)
- [Resend + Next.js](https://resend.com/docs/send-with-nextjs)
- [Shiki syntax highlighting](https://shiki.style)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)
- [Prisma Studio](https://www.prisma.io/studio)

---

_Update dokumen ini setiap kali ada perubahan rencana atau progress._

