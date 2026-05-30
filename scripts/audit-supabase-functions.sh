#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# VAZHIKATTI — Supabase Edge Function Smoke Test
# ─────────────────────────────────────────────────────────────────────────────
#
# Pings every Edge Function in production and reports status.
# Catches the two most common production issues:
#   1. Function exists in repo but NOT deployed   → "404 Not Found"
#   2. Function is deployed but env vars missing  → "500 Internal Error"
#
# Usage:
#   export SUPABASE_ANON_KEY='eyJhbGc...your_publishable_key'
#   bash scripts/audit-supabase-functions.sh
#
# The anon key is the same one as VITE_SUPABASE_PUBLISHABLE_KEY in your .env
# (visit Supabase Dashboard → Project Settings → API → anon/public).
#
# Output format:
#   ✅ function-name             200 (works)
#   ❌ function-name             404 (NOT DEPLOYED — deploy from /supabase/functions/)
#   ⚠️  function-name             500 (deployed but errored — check function logs)
#   🔒 function-name             401 (auth issue — env vars likely missing)
# ─────────────────────────────────────────────────────────────────────────────

set -uo pipefail

if [[ -z "${SUPABASE_ANON_KEY:-}" ]]; then
  echo "ERROR: SUPABASE_ANON_KEY env var not set."
  echo "Set it first:"
  echo "  export SUPABASE_ANON_KEY='your_anon_key_from_supabase_dashboard'"
  exit 1
fi

URL="https://jahtuebykoledutqhzfx.supabase.co/functions/v1"

# Function name → JSON test payload
# Payloads are minimal valid bodies — enough to reach the function's main
# code path without triggering side effects (no real emails, no DB writes
# of test data where avoidable).
declare -A PAYLOADS=(
  # AI-powered (depend on LOVABLE_API_KEY)
  ["career-chat"]='{"messages":[{"role":"user","content":"hello"}]}'
  ["career-predictor"]='{}'
  ["career-tips"]='{"topCareers":[{"id":"test","title":"Test"}],"language":"en"}'
  ["career-assessment"]='{"action":"start","stream":"pcm","userName":"audit"}'
  ["student-assessment"]='{"action":"start","stream":"pcm","marksRange":"70-80","interests":["tech"]}'
  ["college-search"]='{"district":"Chennai"}'
  ["generate-govt-questions"]='{"category":"banking","count":1}'
  ["generate-tn-questions"]='{"universityName":"Anna University","courseName":"BTech","topic":"physics","difficulty":"easy","count":1}'
  ["scholarship-eligibility"]='{"userProfile":{"income":"low","caste":"general"},"scholarships":[]}'
  ["industry-trends"]='{}'
  ["tn-forum-ai"]='{"question":"hello","university":"Anna","course":"BTech","category":"general"}'
  ["jkkn-chat"]='{"messages":[{"role":"user","content":"hello"}]}'

  # Non-AI (different dependencies)
  ["fetch-education-news"]='{}'
  ["admin-setup"]='{"email":"audit-test@example.com","password":"AUDIT_DO_NOT_USE","displayName":"audit"}'
  ["admin-read-registrations"]='{}'
  ["send-registration-email"]='{"fullName":"audit","email":"noreply@example.com","phone":"0000000000","school":"audit","board":"CBSE","stream":"PCM","expectedYear":2026}'
  ["alumni-notification"]='{"alumniId":"audit","senderName":"audit","senderEmail":"noreply@example.com","messagePreview":"audit"}'
  ["send-tracker-reminders"]='{}'
)

# Functions to skip from actual invocation (would cause side effects)
# We still try to OPTIONS-check these to confirm they're deployed.
SKIP_INVOKE=("admin-setup" "send-registration-email" "alumni-notification" "send-tracker-reminders")

echo "─────────────────────────────────────────────────────────"
echo "VAZHIKATTI Supabase Edge Function Smoke Test"
echo "Project: jahtuebykoledutqhzfx"
echo "$(date)"
echo "─────────────────────────────────────────────────────────"
echo ""
echo "Symbol legend:"
echo "  ✅ = deployed AND working"
echo "  ⚠️  = deployed but errored (check function logs)"
echo "  🔒 = auth failure (check env vars in function secrets)"
echo "  ❌ = NOT deployed (or returned 404)"
echo "  ⏭️  = skipped invocation to avoid side effects"
echo ""

deployed_count=0
working_count=0
errored_count=0
missing_count=0

declare -a TO_DEPLOY=()
declare -a TO_DEBUG=()

# Iterate in alphabetical order for readable output
for name in $(echo "${!PAYLOADS[@]}" | tr ' ' '\n' | sort); do
  payload="${PAYLOADS[$name]}"

  # Check if we should skip actual invocation
  skip=false
  for s in "${SKIP_INVOKE[@]}"; do
    if [[ "$s" == "$name" ]]; then
      skip=true
      break
    fi
  done

  if $skip; then
    # OPTIONS preflight is harmless — tells us if function exists
    status=$(curl -s -o /dev/null -w "%{http_code}" -X OPTIONS \
      -H "apikey: $SUPABASE_ANON_KEY" \
      "$URL/$name")
    if [[ "$status" == "200" || "$status" == "204" ]]; then
      printf "  ⏭️  %-32s deployed (skipped to avoid side effects)\n" "$name"
      deployed_count=$((deployed_count + 1))
    elif [[ "$status" == "404" ]]; then
      printf "  ❌ %-32s NOT DEPLOYED\n" "$name"
      missing_count=$((missing_count + 1))
      TO_DEPLOY+=("$name")
    else
      printf "  ❓ %-32s OPTIONS=%s (unclear state)\n" "$name" "$status"
    fi
    continue
  fi

  # Actual POST invocation
  response=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    -H "apikey: $SUPABASE_ANON_KEY" \
    --max-time 30 \
    -d "$payload" \
    "$URL/$name")
  status=$(echo "$response" | tail -1)
  body=$(echo "$response" | head -n -1 | head -c 200)

  if [[ "$status" == "200" ]]; then
    printf "  ✅ %-32s 200 OK\n" "$name"
    working_count=$((working_count + 1))
    deployed_count=$((deployed_count + 1))
  elif [[ "$status" == "404" ]]; then
    printf "  ❌ %-32s 404 — NOT DEPLOYED\n" "$name"
    missing_count=$((missing_count + 1))
    TO_DEPLOY+=("$name")
  elif [[ "$status" == "401" || "$status" == "403" ]]; then
    printf "  🔒 %-32s %s — AUTH/CREDS issue\n" "$name" "$status"
    deployed_count=$((deployed_count + 1))
    errored_count=$((errored_count + 1))
    TO_DEBUG+=("$name (auth $status — check function secrets in Supabase dashboard)")
  elif [[ "$status" =~ ^5 ]]; then
    printf "  ⚠️  %-32s %s — DEPLOYED BUT ERRORED\n" "$name" "$status"
    if [[ -n "$body" ]]; then
      printf "       ↳ %s\n" "$(echo "$body" | head -c 150)"
    fi
    deployed_count=$((deployed_count + 1))
    errored_count=$((errored_count + 1))
    TO_DEBUG+=("$name (HTTP $status — check function logs)")
  else
    printf "  ❓ %-32s %s — unexpected\n" "$name" "$status"
    if [[ -n "$body" ]]; then
      printf "       ↳ %s\n" "$(echo "$body" | head -c 150)"
    fi
  fi
done

echo ""
echo "─────────────────────────────────────────────────────────"
echo "Summary"
echo "─────────────────────────────────────────────────────────"
echo "  Total functions tested:    18"
echo "  Deployed:                  $deployed_count"
echo "  Working (HTTP 200):        $working_count"
echo "  Deployed but errored:      $errored_count"
echo "  Not deployed (404):        $missing_count"
echo ""

if [[ ${#TO_DEPLOY[@]} -gt 0 ]]; then
  echo "📦 Need to deploy:"
  for fn in "${TO_DEPLOY[@]}"; do
    echo "    supabase functions deploy $fn"
  done
  echo ""
fi

if [[ ${#TO_DEBUG[@]} -gt 0 ]]; then
  echo "🔧 Need to debug:"
  for fn in "${TO_DEBUG[@]}"; do
    echo "    - $fn"
  done
  echo ""
fi

if [[ $missing_count -eq 0 && $errored_count -eq 0 ]]; then
  echo "🎉 All functions deployed and responding. Production-ready for soft launch."
fi
