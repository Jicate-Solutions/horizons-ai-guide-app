# Tracker Reminder System — Setup Guide

## How It Works

```
n8n (Daily 9 AM IST)
  → Calls Supabase Edge Function
    → Queries counselling_tracker table (is_complete = false)
    → Filters users not reminded in last 24 hours
    → Sends EMAIL via Resend (already configured)
    → Sends SMS via MSG91 (needs setup)
    → Updates last_reminder_sent_at timestamp
```

## What Users Receive

### Email
- Beautiful HTML email listing ALL missing steps
- Critical steps highlighted in RED with 🚨
- Progress bar showing X/Y steps complete
- Each step shows: name (English + Tamil), deadline, consequence if missed
- CTA button: "Open My Tracker & Complete Now →"

### SMS (if MSG91 is configured)
- Short text: step count, critical count, next step to do, deadline
- Link to the tracker page

---

## Step 1: Deploy the Edge Function

In Supabase Dashboard → Edge Functions → Deploy:

```bash
supabase functions deploy send-tracker-reminders --project-ref jahtuebykoledutqhzfx
```

Or deploy via Supabase CLI:
```bash
cd horizons-ai-guide-app
npx supabase functions deploy send-tracker-reminders
```

### Required Secrets (set in Supabase Dashboard → Edge Functions → Secrets):
- `SUPABASE_URL` — already set
- `SUPABASE_SERVICE_ROLE_KEY` — already set
- `RESEND_API_KEY` — already set (re_P5gxzs8w...)
- `MSG91_AUTH_KEY` — (optional, for SMS)
- `MSG91_TEMPLATE_ID` — (optional, for SMS)

---

## Step 2: Test the Edge Function

### Dry Run (no emails sent):
```bash
curl -X POST https://jahtuebykoledutqhzfx.supabase.co/functions/v1/send-tracker-reminders \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"dry_run": true}'
```

### Test for specific user:
```bash
curl -X POST https://jahtuebykoledutqhzfx.supabase.co/functions/v1/send-tracker-reminders \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "force": true}'
```

### Force send (ignore 24h cooldown):
```bash
curl -X POST ... -d '{"force": true}'
```

---

## Step 3: Import n8n Workflow

1. Open n8n at https://automation.jicate.solutions
2. Go to Workflows → Import from File
3. Select `n8n/tracker-reminder-workflow.json`
4. Update the Authorization header with your Supabase anon key
5. (Optional) Enable the Slack notification node and add your webhook
6. Activate the workflow

The workflow runs **every day at 9:00 AM IST**.

---

## Step 4: Setup SMS via MSG91 (Optional)

1. Create account at https://msg91.com
2. Get Auth Key from MSG91 Dashboard → API Keys
3. Create an SMS template with these variables:
   - `{name}` — Student name
   - `{tracker_name}` — e.g., "TNEA Engineering"
   - `{missing_count}` — Number of missing steps
   - `{critical_count}` — Number of critical steps
   - `{next_step}` — Next step to complete
   - `{next_deadline}` — Deadline for next step
4. Get the Template ID
5. Add to Supabase Edge Function secrets:
   - `MSG91_AUTH_KEY` = your auth key
   - `MSG91_TEMPLATE_ID` = your template ID

---

## API Reference

### POST /functions/v1/send-tracker-reminders

**Request Body (all optional):**
```json
{
  "dry_run": false,     // true = preview without sending
  "force": false,       // true = ignore 24h cooldown
  "email": null         // string = target specific user
}
```

**Response:**
```json
{
  "success": true,
  "sent": 5,
  "total_processed": 8,
  "total_incomplete": 12,
  "results": [
    {
      "email": "student@example.com",
      "phone": "9876543210",
      "counselling": "tnea",
      "missing_steps": 4,
      "critical_steps": 2,
      "email_sent": true,
      "sms_sent": true,
      "timestamp_updated": true
    }
  ]
}
```

---

## Safety Features

- **24-hour cooldown**: Users won't be spammed — max 1 reminder per day per tracker
- **Graceful failures**: If email fails, SMS still sends (and vice versa)
- **Dry run mode**: Test without sending any messages
- **Target mode**: Test with a specific email address
- **Timestamps**: `last_reminder_sent_at` tracked per user per tracker
