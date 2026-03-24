# Vercel Environment Variables — VAZHIKATTI

Add these in Vercel → Settings → Environment Variables → then Redeploy.

## Required (without these, core features break)

| Variable | Where to get it | What breaks without it |
|---|---|---|
| `SUPABASE_URL` | `https://jahtuebykoledutqhzfx.supabase.co` | Admin panel API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role | Admin panel shows 0 users |
| `RESEND_API_KEY` | resend.com → API Keys | Registration emails won't send |
| `ADMIN_PASSWORD` | Choose any strong password | Admin panel login |

## Optional (nice to have)

| Variable | Where to get it | What it enables |
|---|---|---|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics → Admin → Data Streams | User analytics tracking |
| `VITE_ADMIN_EMAIL` | Default: admin@vazhikatti.app | Admin Supabase auth email |
| `VITE_ADMIN_SUPABASE_PASS` | Choose a strong password | Admin Supabase auth password |
| `MSG91_AUTH_KEY` | msg91.com → API Keys | SMS reminders for tracker |
| `MSG91_TEMPLATE_ID` | msg91.com → Templates | SMS template for reminders |

## Already set (check these exist)

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://jahtuebykoledutqhzfx.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | (the anon key) |
| `VITE_SUPABASE_PROJECT_ID` | `jahtuebykoledutqhzfx` |
