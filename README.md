# ☕ Kopi Kita — AI-Powered Coffee Shop CRM

A smart customer relationship management app for Mimi's coffee shop, **Kopi Kita**. Built with Next.js 15, Supabase, Prisma, and Qwen3 AI to generate intelligent promo ideas based on real customer interest data.

---

## 🚀 Live Demo

- **App:** [https://kopi-kita.vercel.app](https://kopi-kita.vercel.app)
- **Demo login:** `mimi@kopikita.id` / `kopikita123`

---

## ✨ Features

- **🔐 Authentication** — Supabase Auth with protected routes via middleware
- **👥 Customer Management** — Add, edit, delete, search & filter by name/tags/drinks
- **🤖 AI Promo Generator** — Qwen3 AI analyzes all customers and generates 2–3 smart promo themes with target segments, reasons, and WhatsApp-ready messages
- **💬 AI Chatbot (Kiko)** — Conversational assistant that knows your customer data and answers business questions in Indonesian/English
- **📊 Dashboard** — Visual overview of top interests (bar chart), recent customers, and this week's AI campaigns
- **🌱 Seed Data** — 30 realistic customers pre-loaded for demo purposes

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design system |
| Auth & DB | Supabase |
| ORM | Prisma |
| AI | OpenRouter (`qwen/qwen3-next-80b-a3b-instruct`) |
| Charts | Recharts |
| Animations | Framer Motion |
| Deployment | Vercel |
| DB Hosting | Supabase (PostgreSQL) |

---

## 🗂 Project Structure

```
kopi-kita/
├── app/
│   ├── (app)/               # Authenticated app shell
│   │   ├── dashboard/       # Dashboard overview
│   │   ├── customers/       # Customer list + CRUD
│   │   ├── promos/          # AI promo generation
│   │   └── chat/            # AI chatbot
│   ├── api/
│   │   ├── customers/       # REST endpoints
│   │   ├── promos/generate/ # AI promo endpoint
│   │   └── chat/            # AI chat endpoint
│   ├── auth/callback/       # Supabase auth callback
│   ├── login/               # Login page
│   └── layout.tsx
├── components/
│   └── layout/
|   └── customers/
|   └── chat/
|   └── promos/
|   └── ui/
├── lib/
│   ├── prisma.ts            # Prisma singleton
│   ├── prompts.ts           # 🔑 AI prompts (documented)
│   ├── supabase/            # Client + server helpers
│   └── utils.ts             # Helpers + tag colors
├── prisma/
│   ├── schema.prisma        # DB schema
│   └── seed.ts              # 30 demo customers
└── middleware.ts             # Route protection
```

---

## 🤖 AI Prompts

The AI prompts are documented and stored in [`lib/prompts.ts`](./lib/prompts.ts).

### Promo Generation Prompt
Used in `POST /api/promos/generate`. Sends aggregated customer data (tag counts, top drinks, sample customers) to Openrouter (Qwen3 model) and asks it to return **2–3 promo themes** in structured JSON:

```json
{
  "promos": [{
    "theme": "Caramel Week 🍮",
    "emoji": "🍮",
    "segment": "Sweet drinks lovers",
    "segmentSize": 18,
    "whyNow": "sweet-drink interest is the largest group this month",
    "message": "Hi! New Caramel Cold Brew masuk minggu ini...",
    "timeWindow": "morning rush 7–11am",
    "tags": ["sweet drinks", "caramel"],
    "discount": "10% off"
  }],
  "weeklyInsight": "...",
  "generatedAt": "ISO date"
}
```

### Chat System Prompt (Kiko)
Used in `POST /api/chat`. Injects full customer data as context, gives the AI a warm, bilingual persona ("Kiko"), and constrains it to answer business-relevant questions only.

---

## ⚙️ Setup

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project
- An OpenRouter API key

### 1. Clone & install

```bash
git clone https://github.com/fidellr/kopi-kita
cd kopi-kita
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in `.env`:

```env
# Supabase
DATABASE_URL="postgresql://postgres.[ref]:[password]@..."
DIRECT_URL="postgresql://postgres.[ref]:[password]@..."
NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# OpenRouter
OPENROUTER_API_KEY="..."
OPENROUTER_MODEL="..."
```

### 3. Set up Supabase Auth

In your Supabase dashboard:
1. Go to **Authentication → Providers → Email** and enable it
2. Create a user: `mimi@kopikita.id` with password `kopikita123`
3. Add your app URL to **Authentication → URL Configuration**

### 4. Set up database

```bash
npm run db:push      # Push schema to Supabase
npm run db:generate  # Generate Prisma client
npm run db:seed      # Load 30 demo customers
```

### 5. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with the demo credentials.

---

## 🔒 Security Best Practices Implemented

- **Auth middleware** on all app routes — unauthenticated requests redirect to login
- **Server-side auth checks** in every API route using Supabase `getUser()`
- **Input validation** with Zod schemas on all API endpoints
- **Prisma** prevents SQL injection by default
- **Environment variables** for all secrets — never committed to code
- **AI response parsing** wrapped in try/catch to handle malformed outputs

---

## 🌱 Seed Data

30 realistic Indonesian coffee shop customers are seeded via `prisma/seed.ts`, covering diverse interest tags:
- `sweet drinks`, `caramel`, `oat milk`, `pastry lover`
- `black coffee`, `cold brew`, `workshop`, `latte art`
- `matcha`, `health conscious`, `extra ice`, `morning buyer`

---