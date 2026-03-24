# VAZHIKATTI — வழிகாட்டி

**AI-Powered Career Guidance for 12th Students | Tamil Nadu**

🌐 **Live:** [horizons-ai-guide-app.vercel.app](https://horizons-ai-guide-app.vercel.app)

---

## What is VAZHIKATTI?

VAZHIKATTI is a free AI-powered platform that helps 12th-standard students in Tamil Nadu make informed decisions about their career, college, and future. It combines AI career prediction, cutoff calculators, counselling trackers, and comprehensive exam data — all in one bilingual (Tamil + English) application.

## Key Features

| Feature | Description |
|---------|-------------|
| 🤖 AI Career Predictor | Claude AI-powered career recommendations based on interests and aptitude |
| 📊 EduCutoff Calculator | TNEA engineering cutoff + NEET medical eligibility with college prediction |
| 📋 Counselling Tracker | Step-by-step tracker for TNEA, NEET, JoSAA, TNAU with cloud sync + email reminders |
| 🏛️ 109 Universities | IITs, NITs, IIMs, AIIMS, IISERs + TN state universities with courses, fees, eligibility |
| 📝 25 Govt Exams | TNPSC, UPSC, Banking, Railways — complete syllabus, pattern, and PYQ practice |
| 💬 AI Career Chat | Conversational AI that answers career questions in Tamil or English |
| 💼 Job Portal | Employers post jobs, students apply — built-in placement pipeline |
| 🔔 Exam Reminders | Push notifications + email alerts before registration deadlines |
| 📱 PWA Installable | Works on any phone — install like an app, works offline |
| 🌐 Bilingual | Full Tamil + English support (461 translation keys) |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| UI | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Auth, Database, Edge Functions) |
| AI | Claude AI (Anthropic) — 12 Edge Functions |
| Hosting | Vercel (auto-deploy on push) |
| Automation | n8n (email/SMS reminders) |
| Email | Resend API |

## Quick Start

```bash
git clone https://github.com/JKKN-Institutions/horizons-ai-guide-app.git
cd horizons-ai-guide-app
npm install
cp .env.example .env   # fill in values
npm run dev
```

## Environment Variables

See [VERCEL-ENV-VARS.md](VERCEL-ENV-VARS.md) for complete setup guide.

## Project Structure

```
src/
├── pages/          # 46 page components
├── components/     # 270+ reusable components
├── hooks/          # Auth, language, student profile
├── data/           # Static data (universities, exams, courses)
├── lib/            # Utilities (notifications, validation)
├── integrations/   # Supabase client
└── App.tsx         # Routes with lazy loading

supabase/
├── functions/      # 17 Edge Functions (AI, email, admin)
└── migrations/     # Database schema + RLS policies

api/                # 12 Vercel serverless functions
```

## Performance

- Initial load: ~1MB (code-split from 6.6MB — 85% reduction)
- 130 lazy-loaded chunks
- Service worker for offline caching
- Hashed assets cached 1 year (immutable)

## License

Proprietary — JKKN Institutions
