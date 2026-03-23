import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ═══════════════════════════════════════════════════════════
//  FULL STEP DATABASE — maps step IDs → names, deadlines
// ═══════════════════════════════════════════════════════════

interface StepInfo {
  id: string;
  title: string;
  titleTamil: string;
  deadline: string;
  consequence: string;
  critical?: boolean;
}

interface TrackerInfo {
  id: string;
  name: string;
  nameTamil: string;
  icon: string;
  steps: StepInfo[];
}

const allTrackers: TrackerInfo[] = [
  {
    id: "tnea",
    name: "TNEA Engineering",
    nameTamil: "TNEA பொறியியல்",
    icon: "⚙️",
    steps: [
      { id: "tnea-1", title: "Register on tneaonline.org", titleTamil: "tneaonline.org இல் பதிவு", deadline: "May 1st week – June 1st week 2026", consequence: "Cannot participate in TNEA counselling at all.", critical: true },
      { id: "tnea-2", title: "Fill Application Form", titleTamil: "விண்ணப்பம் நிரப்பு", deadline: "Same as registration deadline", consequence: "Registration is INCOMPLETE. You will NOT get a rank.", critical: true },
      { id: "tnea-3", title: "Upload Photo & Signature", titleTamil: "புகைப்படம் & கையொப்பம் பதிவேற்று", deadline: "Before registration deadline", consequence: "Application rejected." },
      { id: "tnea-4", title: "Pay Registration Fee (₹500)", titleTamil: "பதிவுக் கட்டணம் செலுத்து (₹500)", deadline: "Before registration deadline", consequence: "Application is treated as NOT SUBMITTED.", critical: true },
      { id: "tnea-5", title: "Upload Certificates", titleTamil: "சான்றிதழ்களை பதிவேற்று", deadline: "June 2nd–3rd week 2026", consequence: "Cannot be verified. Won't appear in rank list.", critical: true },
      { id: "tnea-6", title: "Certificate Verification", titleTamil: "சான்றிதழ் சரிபார்ப்பு", deadline: "June 3rd–4th week 2026", consequence: "Unverified = No rank." },
      { id: "tnea-7", title: "Check Rank List", titleTamil: "தரவரிசை பட்டியல் சரிபார்", deadline: "June last week 2026", consequence: "Knowing rank helps make better choices." },
      { id: "tnea-8", title: "Pay Counselling Deposit (₹5,000)", titleTamil: "கலந்தாய்வு வைப்புத்தொகை (₹5,000)", deadline: "Before counselling round starts", consequence: "CANNOT fill choices.", critical: true },
      { id: "tnea-9", title: "Fill College & Branch Choices", titleTamil: "கல்லூரி & பிரிவு விருப்பங்கள்", deadline: "3–4 days per round (July 2026)", consequence: "No seat in that round.", critical: true },
      { id: "tnea-10", title: "LOCK Your Choices (OTP)", titleTamil: "விருப்பங்களை LOCK செய்", deadline: "Round-specific (1 day after choice filling ends)", consequence: "Unlocked choices = ZERO seats.", critical: true },
      { id: "tnea-11", title: "Check Seat Allotment Result", titleTamil: "இடம் ஒதுக்கீடு சரிபார்", deadline: "2–3 days after allotment result", consequence: "Seat automatically cancelled." },
      { id: "tnea-12", title: "Report to College & Pay Fees", titleTamil: "கல்லூரிக்கு சேர் & கட்டணம்", deadline: "3–5 days after accepting allotment", consequence: "Seat cancelled. You lose everything.", critical: true },
    ],
  },
  {
    id: "neet-tn",
    name: "NEET TN Medical",
    nameTamil: "NEET தமிழ்நாடு மருத்துவம்",
    icon: "🏥",
    steps: [
      { id: "neet-1", title: "Register on tnmedicalselection.net", titleTamil: "tnmedicalselection.net இல் பதிவு", deadline: "July 1st–3rd week 2026", consequence: "Cannot participate in TN medical counselling.", critical: true },
      { id: "neet-2", title: "Fill Counselling Application", titleTamil: "கலந்தாய்வு விண்ணப்பம்", deadline: "Same as registration deadline", consequence: "Incomplete application = not considered.", critical: true },
      { id: "neet-3", title: "Upload All Certificates", titleTamil: "சான்றிதழ்கள் பதிவேற்று", deadline: "Before verification deadline", consequence: "Missing document = no rank = no seat.", critical: true },
      { id: "neet-4", title: "Pay Counselling Fee (₹500)", titleTamil: "கலந்தாய்வு கட்டணம் (₹500)", deadline: "Before registration deadline", consequence: "Unpaid = NOT submitted.", critical: true },
      { id: "neet-5", title: "Attend Certificate Verification", titleTamil: "சான்றிதழ் சரிபார்ப்பு", deadline: "July last week 2026", consequence: "Miss date = removed from process." },
      { id: "neet-6", title: "Fill College & Course Choices", titleTamil: "கல்லூரி & படிப்பு விருப்பங்கள்", deadline: "August 1st week 2026", consequence: "Too few choices = no allotment.", critical: true },
      { id: "neet-7", title: "LOCK Choices Before Deadline", titleTamil: "விருப்பங்களை LOCK செய்", deadline: "Round-specific", consequence: "Unlocked choices = ZERO.", critical: true },
      { id: "neet-8", title: "Check Seat Allotment", titleTamil: "இடம் ஒதுக்கீடு சரிபார்", deadline: "2–3 days after result", consequence: "No response = seat auto-cancelled." },
      { id: "neet-9", title: "Report to College & Pay Fees", titleTamil: "கல்லூரிக்கு சேர்", deadline: "3–5 days after accepting", consequence: "Seat given to next person.", critical: true },
    ],
  },
  {
    id: "josaa",
    name: "JoSAA (IIT/NIT/IIIT)",
    nameTamil: "JoSAA (IIT/NIT)",
    icon: "🎯",
    steps: [
      { id: "josaa-1", title: "Register on josaa.nic.in", titleTamil: "josaa.nic.in இல் பதிவு", deadline: "June 2026 (within 1 week of results)", consequence: "Cannot participate. Miss IIT/NIT entirely.", critical: true },
      { id: "josaa-2", title: "Fill Personal & Academic Details", titleTamil: "விவரங்கள் நிரப்பு", deadline: "Same as registration", consequence: "Can't proceed to choice filling." },
      { id: "josaa-3", title: "Upload Documents", titleTamil: "ஆவணங்கள் பதிவேற்று", deadline: "Before choice filling opens", consequence: "Seat can be cancelled after allotment." },
      { id: "josaa-4", title: "Fill Choices (100+ recommended)", titleTamil: "விருப்பங்கள் (100+ பரிந்துரை)", deadline: "June last week 2026", consequence: "Fewer choices = lower chance.", critical: true },
      { id: "josaa-5", title: "LOCK Choices", titleTamil: "விருப்பங்களை LOCK செய்", deadline: "1 day after choice filling ends", consequence: "Unlocked = completely ignored.", critical: true },
      { id: "josaa-6", title: "Check Round 1 Allotment", titleTamil: "சுற்று 1 ஒதுக்கீடு", deadline: "2 days after each round result", consequence: "No response = seat forfeited." },
      { id: "josaa-7", title: "Pay Seat Acceptance Fee", titleTamil: "இட ஏற்பு கட்டணம்", deadline: "Within 2 days of accepting seat", consequence: "Seat cancelled immediately.", critical: true },
      { id: "josaa-8", title: "Document Verification at Reporting Centre", titleTamil: "ஆவண சரிபார்ப்பு", deadline: "Within 3 days of allotment", consequence: "Seat cancelled + possible blacklisting.", critical: true },
    ],
  },
  {
    id: "tnau",
    name: "TNAU Agriculture",
    nameTamil: "TNAU வேளாண்மை",
    icon: "🌾",
    steps: [
      { id: "tnau-1", title: "Register on tnau.ac.in", titleTamil: "tnau.ac.in இல் பதிவு", deadline: "June–July 2026", consequence: "Cannot apply for any TNAU course.", critical: true },
      { id: "tnau-2", title: "Fill Application & Upload Docs", titleTamil: "விண்ணப்பம் & ஆவணங்கள்", deadline: "July 2026", consequence: "Incomplete = rejected.", critical: true },
      { id: "tnau-3", title: "Pay Application Fee (₹500)", titleTamil: "விண்ணப்ப கட்டணம் (₹500)", deadline: "Before application deadline", consequence: "Unpaid = not submitted.", critical: true },
      { id: "tnau-4", title: "Check Merit List", titleTamil: "தகுதிப் பட்டியல்", deadline: "July end 2026", consequence: "Check early to plan choices." },
      { id: "tnau-5", title: "Fill Course & Campus Choices", titleTamil: "படிப்பு & வளாக விருப்பங்கள்", deadline: "August 2026", consequence: "Too few choices = no allotment.", critical: true },
      { id: "tnau-6", title: "Attend Counselling & Join", titleTamil: "கலந்தாய்வு & சேர்க்கை", deadline: "3–5 days after allotment", consequence: "Seat given to next student." },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
//  HELPER: Find missing steps for a tracker
// ═══════════════════════════════════════════════════════════

function getMissingSteps(trackerId: string, completedSteps: string[]): StepInfo[] {
  const tracker = allTrackers.find(t => t.id === trackerId);
  if (!tracker) return [];
  return tracker.steps.filter(s => !completedSteps.includes(s.id));
}

function getTrackerInfo(trackerId: string): TrackerInfo | undefined {
  return allTrackers.find(t => t.id === trackerId);
}

// ═══════════════════════════════════════════════════════════
//  EMAIL TEMPLATE
// ═══════════════════════════════════════════════════════════

function buildEmailHTML(
  name: string,
  trackerName: string,
  trackerNameTamil: string,
  trackerIcon: string,
  missingSteps: StepInfo[],
  completedCount: number,
  totalCount: number
): string {
  const criticalSteps = missingSteps.filter(s => s.critical);
  const normalSteps = missingSteps.filter(s => !s.critical);
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const criticalHTML = criticalSteps.map(s => `
    <tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid #fecaca;">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="font-size: 16px; line-height: 1;">🚨</span>
          <div>
            <p style="margin: 0; font-weight: 700; font-size: 14px; color: #991b1b;">${s.title}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #b91c1c;">${s.titleTamil}</p>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #7f1d1d;">
              <strong>⏰ Deadline:</strong> ${s.deadline}
            </p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #dc2626;">
              <strong>⚠️ If you miss:</strong> ${s.consequence}
            </p>
          </div>
        </div>
      </td>
    </tr>
  `).join("");

  const normalHTML = normalSteps.map(s => `
    <tr>
      <td style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="font-size: 14px; line-height: 1;">⬜</span>
          <div>
            <p style="margin: 0; font-weight: 600; font-size: 14px; color: #1f2937;">${s.title}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">${s.titleTamil}</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #374151;">
              <strong>⏰ Deadline:</strong> ${s.deadline}
            </p>
          </div>
        </div>
      </td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #fef2f2;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%); color: white; padding: 30px 24px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 40px; margin-bottom: 8px;">⚠️</div>
    <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Incomplete Counselling Steps!</h1>
    <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 13px;">முடிக்கப்படாத கலந்தாய்வு படிகள்!</p>
    <p style="margin: 8px 0 0 0; opacity: 0.8; font-size: 12px;">VAZHIKATTI — Counselling Application Tracker</p>
  </div>

  <!-- Gold accent -->
  <div style="height: 3px; background: linear-gradient(90deg, #f59e0b, #eab308, #f59e0b);"></div>

  <div style="background: white; padding: 24px; border: 1px solid #fecaca;">

    <!-- Greeting -->
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #dc2626; margin: 0; font-size: 18px;">Hello ${name},</h2>
      <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">
        Your <strong>${trackerIcon} ${trackerName}</strong> application is <strong style="color: #dc2626;">NOT complete</strong>.
      </p>
    </div>

    <!-- Progress Bar -->
    <div style="background: #f3f4f6; padding: 16px; border-radius: 12px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-size: 13px; font-weight: 600; color: #374151;">Progress</span>
        <span style="font-size: 13px; font-weight: 700; color: ${progressPercent >= 70 ? '#059669' : progressPercent >= 40 ? '#d97706' : '#dc2626'};">${completedCount}/${totalCount} (${progressPercent}%)</span>
      </div>
      <div style="height: 8px; background: #e5e7eb; border-radius: 99px; overflow: hidden;">
        <div style="height: 100%; width: ${progressPercent}%; background: ${progressPercent >= 70 ? '#059669' : progressPercent >= 40 ? '#d97706' : '#dc2626'}; border-radius: 99px;"></div>
      </div>
      <p style="text-align: center; margin: 8px 0 0 0; font-size: 13px; color: #dc2626; font-weight: 700;">
        🚨 ${missingSteps.length} step${missingSteps.length > 1 ? 's' : ''} remaining — Don't lose your seat!
      </p>
    </div>

    <!-- Critical Steps (if any) -->
    ${criticalSteps.length > 0 ? `
    <div style="margin-bottom: 20px;">
      <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; overflow: hidden;">
        <div style="background: #dc2626; padding: 10px 16px;">
          <p style="margin: 0; color: white; font-weight: 700; font-size: 14px;">🚨 CRITICAL — Complete these FIRST (${criticalSteps.length})</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${criticalHTML}
        </table>
      </div>
    </div>
    ` : ""}

    <!-- Normal Steps (if any) -->
    ${normalSteps.length > 0 ? `
    <div style="margin-bottom: 20px;">
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #374151; padding: 10px 16px;">
          <p style="margin: 0; color: white; font-weight: 700; font-size: 14px;">⬜ Other Pending Steps (${normalSteps.length})</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${normalHTML}
        </table>
      </div>
    </div>
    ` : ""}

    <!-- CTA Button -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/edu-cutoff" style="display: inline-block; background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 14px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Open My Tracker & Complete Now →
      </a>
    </div>

    <!-- Warning -->
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px; text-align: center;">
      <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 600;">
        ⚠️ Missing even ONE step can cost you your college seat.
      </p>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #a16207;">
        ஒரு படியைக் கூட தவறவிட்டால் உங்கள் கல்லூரி இடம் பறிபோகும்.
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: white;">VAZHIKATTI — வழிகாட்டி</p>
    <p style="margin: 0;">AI-Powered Career Guidance for 12th Students</p>
    <p style="margin: 8px 0 0 0; font-size: 11px; opacity: 0.6;">This is an automated reminder from your Counselling Tracker.</p>
  </div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════
//  SMS TEXT BUILDER
// ═══════════════════════════════════════════════════════════

function buildSMSText(
  name: string,
  trackerName: string,
  missingCount: number,
  criticalCount: number,
  nextCriticalStep: string,
  nextDeadline: string
): string {
  return `⚠️ VAZHIKATTI Alert!\n\nHi ${name}, your ${trackerName} application has ${missingCount} pending step${missingCount > 1 ? 's' : ''}${criticalCount > 0 ? ` (${criticalCount} CRITICAL)` : ''}.\n\nNext: ${nextCriticalStep}\nDeadline: ${nextDeadline}\n\n👉 Complete now: https://horizons-ai-guide-app.vercel.app/edu-cutoff\n\nDon't lose your seat!`;
}

// ═══════════════════════════════════════════════════════════
//  MAIN HANDLER
// ═══════════════════════════════════════════════════════════

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "re_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ";
    const msg91AuthKey = Deno.env.get("MSG91_AUTH_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase credentials" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse optional request body
    let dryRun = false;
    let forceSend = false;
    let targetEmail: string | null = null;
    try {
      const body = await req.json();
      dryRun = body?.dry_run === true;
      forceSend = body?.force === true;
      targetEmail = body?.email || null;
    } catch {
      // No body — that's fine
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Query: get all incomplete trackers
    // Only send reminders to users who haven't been reminded in last 24 hours
    let query = supabase
      .from("counselling_tracker")
      .select("*")
      .eq("is_complete", false);

    if (targetEmail) {
      query = query.eq("email", targetEmail);
    }

    const { data: incompleteTrackers, error: fetchError } = await query;

    if (fetchError) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch trackers", details: fetchError.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!incompleteTrackers || incompleteTrackers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No incomplete trackers found", sent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Filter: only users not reminded in last 24 hours (unless force)
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const toNotify = incompleteTrackers.filter(t => {
      if (forceSend) return true;
      if (!t.last_reminder_sent_at) return true;
      return new Date(t.last_reminder_sent_at) < twentyFourHoursAgo;
    });

    if (toNotify.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "All users already reminded within 24h", sent: 0, total_incomplete: incompleteTrackers.length }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Process each incomplete tracker
    const results: any[] = [];

    for (const tracker of toNotify) {
      const trackerInfo = getTrackerInfo(tracker.counselling_id);
      if (!trackerInfo) continue;

      const completedSteps = (tracker.completed_steps as string[]) || [];
      const missingSteps = getMissingSteps(tracker.counselling_id, completedSteps);

      if (missingSteps.length === 0) continue;

      const criticalSteps = missingSteps.filter(s => s.critical);
      const name = tracker.full_name || tracker.email?.split("@")[0] || "Student";

      // ─── Build messages ───
      const emailHtml = buildEmailHTML(
        name,
        trackerInfo.name,
        trackerInfo.nameTamil,
        trackerInfo.icon,
        missingSteps,
        completedSteps.length,
        trackerInfo.steps.length
      );

      const smsText = buildSMSText(
        name,
        trackerInfo.name,
        missingSteps.length,
        criticalSteps.length,
        (criticalSteps[0] || missingSteps[0]).title,
        (criticalSteps[0] || missingSteps[0]).deadline
      );

      const result: any = {
        email: tracker.email,
        phone: tracker.phone,
        counselling: tracker.counselling_id,
        missing_steps: missingSteps.length,
        critical_steps: criticalSteps.length,
        email_sent: false,
        sms_sent: false,
      };

      if (dryRun) {
        result.dry_run = true;
        result.would_send_email = !!tracker.email;
        result.would_send_sms = !!(tracker.phone && msg91AuthKey);
        result.sms_text = smsText;
        results.push(result);
        continue;
      }

      // ─── SEND EMAIL via Resend ───
      if (tracker.email && resendApiKey) {
        try {
          const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: "VAZHIKATTI <onboarding@resend.dev>",
              to: [tracker.email],
              subject: `⚠️ ${missingSteps.length} Incomplete Steps — ${trackerInfo.name} | VAZHIKATTI`,
              html: emailHtml,
            }),
          });
          const emailData = await emailRes.json();
          result.email_sent = true;
          result.email_id = emailData.id;
        } catch (err: any) {
          result.email_error = err.message;
        }
      }

      // ─── SEND SMS via MSG91 (if configured) ───
      if (tracker.phone && msg91AuthKey) {
        try {
          // Clean phone number (ensure +91 prefix for India)
          let phone = tracker.phone.replace(/\s+/g, "").replace(/^0+/, "");
          if (!phone.startsWith("+")) {
            phone = phone.startsWith("91") ? `+${phone}` : `+91${phone}`;
          }

          const smsRes = await fetch("https://control.msg91.com/api/v5/flow/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authkey": msg91AuthKey,
            },
            body: JSON.stringify({
              template_id: Deno.env.get("MSG91_TEMPLATE_ID") || "",
              short_url: "0",
              recipients: [{
                mobiles: phone,
                name: name,
                tracker_name: trackerInfo.name,
                missing_count: String(missingSteps.length),
                critical_count: String(criticalSteps.length),
                next_step: (criticalSteps[0] || missingSteps[0]).title,
                next_deadline: (criticalSteps[0] || missingSteps[0]).deadline,
              }],
            }),
          });
          const smsData = await smsRes.json();
          result.sms_sent = true;
          result.sms_response = smsData;
        } catch (err: any) {
          result.sms_error = err.message;
        }
      }

      // ─── Update last_reminder_sent_at ───
      try {
        await supabase
          .from("counselling_tracker")
          .update({ last_reminder_sent_at: now.toISOString() })
          .eq("user_id", tracker.user_id)
          .eq("counselling_id", tracker.counselling_id);
        result.timestamp_updated = true;
      } catch (err: any) {
        result.timestamp_error = err.message;
      }

      results.push(result);
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent: results.filter(r => r.email_sent || r.sms_sent).length,
        total_processed: results.length,
        total_incomplete: incompleteTrackers.length,
        results,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
