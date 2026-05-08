// VAZHIKATTI — Counselling Reminder API
// Called daily by n8n at 8 AM
// Reads registered students from existing registrations_12th_learners table
// Sends deadline reminder emails via Resend — NO new Supabase table needed

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Auth check
  const authHeader = req.headers['authorization'];
  const expectedKey = process.env.REMINDER_API_KEY || 'vzk-reminder-2026-secret';
  if (authHeader !== `Bearer ${expectedKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = 'https://jahtuebykoledutqhzfx.supabase.co';
  const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxODA1OTcsImV4cCI6MjA1NDc1NjU5N30.JG0bGSbGvSMXaZWqsXQB3DPyYLuGpA4c4FbFLNiXa9k';
  const RESEND_KEY = process.env.RESEND_API_KEY || 're_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ';

  // 2026 counselling schedule
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12

  const getUpcomingDeadlines = () => {
    if (month <= 4) return [
      { exam: 'NEET UG 2026', date: 'May 4, 2026', action: 'Exam is coming! Complete your preparation now.', urgent: true },
      { exam: 'JEE Main Session 2', date: 'April 2026', action: 'Check jeeadv.ac.in for your hall ticket.', urgent: true },
    ];
    if (month === 5) return [
      { exam: 'NEET UG 2026', date: 'May 4, 2026', action: 'EXAM THIS MONTH! Final revision time.', urgent: true },
      { exam: 'TNEA Registration', date: 'Opens June 2026', action: 'Keep your 12th marks ready for TNEA.', urgent: false },
    ];
    if (month === 6) return [
      { exam: 'TNEA 2026 Registration', date: 'June 1st week', action: 'Register NOW at tneaonline.org', urgent: true },
      { exam: 'NEET Results', date: 'June 2026', action: 'Check results at neet.nta.nic.in', urgent: false },
    ];
    if (month === 7) return [
      { exam: 'TNEA Counselling', date: 'July 2026', action: 'Upload documents at tneaonline.org NOW', urgent: true },
      { exam: 'NEET TN Counselling', date: 'July 2026', action: 'Register at tnmedicalselection.net', urgent: true },
      { exam: 'JoSAA Round 1', date: 'July 2026', action: 'Fill choices at josaa.nic.in', urgent: true },
    ];
    if (month === 8) return [
      { exam: 'TNEA Final Round', date: 'August 2026', action: 'Last chance — fill college choices now!', urgent: true },
      { exam: 'NEET TN Round 2', date: 'August 2026', action: 'Don\'t miss Round 2 registration!', urgent: true },
    ];
    return [
      { exam: 'TNPSC Group 4 2026', date: 'Notification Expected', action: 'Start preparing now — check tnpsc.gov.in', urgent: false },
      { exam: 'SSC CHSL 2026', date: 'Notification Expected', action: 'Apply at ssc.gov.in when notified', urgent: false },
    ];
  };

  const deadlines = getUpcomingDeadlines();
  const hasUrgent = deadlines.some(d => d.urgent);

  try {
    // Fetch all registered students
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/registrations_12th_learners?select=full_name,email,stream,passing_year&limit=500`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase fetch failed: ${response.status}`);
    }

    const students = await response.json();

    if (!students || students.length === 0) {
      return res.status(200).json({ success: true, message: 'No students found', sent: 0 });
    }

    // Only send reminders every 7 days (use a simple date check)
    const dayOfWeek = today.getDay(); // 0=Sunday
    // Send only on Mondays (dayOfWeek === 1) OR if urgent
    if (dayOfWeek !== 1 && !hasUrgent) {
      return res.status(200).json({ 
        success: true, 
        message: 'Not Monday and no urgent deadlines — skipped', 
        sent: 0 
      });
    }

    let sent = 0;
    const errors = [];

    for (const student of students) {
      if (!student.email) continue;

      const name = student.full_name || 'Student';
      const firstName = name.split(' ')[0];
      const subjectLine = hasUrgent 
        ? `🚨 ${firstName}, important counselling deadline coming up!`
        : `📅 ${firstName}, your 2026 exam deadlines — don't miss these!`;

      const deadlineRows = deadlines.map(d => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">
            <strong style="color: #1f2937;">${d.exam}</strong>
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: ${d.urgent ? '#dc2626' : '#059669'}; font-weight: 600;">
            ${d.date}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
            ${d.action}
          </td>
        </tr>
      `).join('');

      const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f3f4f6;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 28px 24px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 36px; margin-bottom: 8px;">வழிகாட்டி</div>
    <h1 style="margin: 0; font-size: 20px; font-weight: 800;">VAZHIKATTI Career Guide</h1>
    <p style="margin: 6px 0 0 0; opacity: 0.85; font-size: 13px;">Your 2026 Exam & Counselling Reminder</p>
  </div>

  <!-- Body -->
  <div style="background: white; padding: 28px 24px; border: 1px solid #e5e7eb;">
    <p style="font-size: 16px; color: #1f2937; margin: 0 0 8px 0;">Hi <strong>${firstName}</strong> 👋</p>
    <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
      Here are your <strong>upcoming important dates</strong> for 2026. Don't miss these deadlines — 
      missing even one step can cost you your seat!
    </p>

    <!-- Deadlines Table -->
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <thead>
        <tr style="background: #f9fafb;">
          <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #6b7280; border-bottom: 2px solid #e5e7eb;">EXAM / EVENT</th>
          <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #6b7280; border-bottom: 2px solid #e5e7eb;">DATE</th>
          <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #6b7280; border-bottom: 2px solid #e5e7eb;">ACTION</th>
        </tr>
      </thead>
      <tbody>${deadlineRows}</tbody>
    </table>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges/educutoff" 
         style="display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;">
        Open My Tracker → Track Your Steps
      </a>
    </div>

    <!-- Tips -->
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-top: 20px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #15803d;">💡 Quick Tips</p>
      <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #166534; line-height: 1.8;">
        <li>Keep your 12th marksheet, Aadhaar, and passport photo ready</li>
        <li>Check official websites daily during counselling month</li>
        <li>Use VAZHIKATTI's Rank Predictor to know which colleges you qualify for</li>
      </ul>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #1f2937; color: #9ca3af; padding: 16px 24px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
    <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: white;">VAZHIKATTI — வழிகாட்டி</p>
    <p style="margin: 0;">AI Career Guidance for 12th Students · Tamil Nadu</p>
    <p style="margin: 8px 0 0 0; font-size: 11px; color: #6b7280;">You're receiving this because you registered on VAZHIKATTI.</p>
  </div>

</div>
</body></html>`;

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_KEY}`,
          },
          body: JSON.stringify({
            from: 'VAZHIKATTI <onboarding@resend.dev>',
            to: [student.email],
            subject: subjectLine,
            html,
          }),
        });

        if (emailRes.ok) sent++;
        else {
          const err = await emailRes.json();
          errors.push({ email: student.email, error: err });
        }
      } catch (e) {
        errors.push({ email: student.email, error: e.message });
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100));
    }

    return res.status(200).json({
      success: true,
      totalStudents: students.length,
      remindersSent: sent,
      errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
      month,
      deadlines: deadlines.map(d => d.exam),
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
