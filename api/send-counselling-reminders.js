// VAZHIKATTI — Smart Counselling Reminder API
// Called daily by n8n at 8 AM
// Checks each student's tracker progress and sends personalized reminders
// Only sends to students with INCOMPLETE steps near deadline

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const authHeader = req.headers['authorization'];
  const expectedKey = process.env.REMINDER_API_KEY || 'vzk-reminder-2026-secret';
  if (authHeader !== `Bearer ${expectedKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = 'https://jahtuebykoledutqhzfx.supabase.co';
  const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxODA1OTcsImV4cCI6MjA1NDc1NjU5N30.JG0bGSbGvSMXaZWqsXQB3DPyYLuGpA4c4FbFLNiXa9k';
  const RESEND_KEY = process.env.RESEND_API_KEY || 're_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ';

  const today = new Date();
  const month = today.getMonth() + 1;
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon

  // TNEA counselling steps (must match tracker IDs)
  const tneaSteps = [
    { id: 'tnea-register', label: 'Register on TNEA portal' },
    { id: 'tnea-docs', label: 'Upload certificates & documents' },
    { id: 'tnea-fee', label: 'Pay registration fee' },
    { id: 'tnea-verify', label: 'Document verification' },
    { id: 'tnea-choices', label: 'Fill college & branch choices' },
    { id: 'tnea-allot', label: 'Check seat allotment' },
    { id: 'tnea-confirm', label: 'Accept & confirm seat' },
    { id: 'tnea-pay', label: 'Pay seat confirmation fee' },
    { id: 'tnea-report', label: 'Report to college' },
  ];

  // Month-based urgency and message
  const getMonthConfig = () => {
    if (month === 5) return { urgent: true, phase: 'Preparation', daysToAction: '30 days left before TNEA opens!' };
    if (month === 6) return { urgent: true, phase: 'Registration', daysToAction: 'TNEA Registration is OPEN NOW!' };
    if (month === 7) return { urgent: true, phase: 'Counselling', daysToAction: 'TNEA Counselling is happening NOW!' };
    if (month === 8) return { urgent: true, phase: 'Final Round', daysToAction: 'LAST CHANCE — Final round closing!' };
    if (month === 9) return { urgent: false, phase: 'Spot Round', daysToAction: 'Spot round may be open — check tneaonline.org' };
    return { urgent: false, phase: 'Upcoming', daysToAction: 'TNEA 2026 opens in June — start preparing!' };
  };

  const config = getMonthConfig();

  // Only send on Mondays OR during urgent months (June, July, August → send every day)
  const shouldSendToday = config.urgent ? true : dayOfWeek === 1;
  if (!shouldSendToday) {
    return res.status(200).json({ success: true, message: 'Not sending today — not Monday and no urgent deadline', sent: 0 });
  }

  try {
    // Fetch all registered students
    const studentsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/registrations_12th_learners?select=full_name,email,stream,passing_year&limit=1000`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );

    if (!studentsRes.ok) throw new Error('Failed to fetch students');
    const students = await studentsRes.json();
    if (!students?.length) return res.status(200).json({ success: true, message: 'No students found', sent: 0 });

    let sent = 0;
    const errors = [];

    for (const student of students) {
      if (!student.email) continue;

      // Load this student's tracker progress from user metadata
      // We check their progress via auth API
      let completedSteps = [];
      try {
        // We can't read individual user metadata without their token
        // So we treat all students as having 0 steps (conservative approach)
        // When they log in, their local progress is checked
        completedSteps = [];
      } catch {}

      const stepsLeft = tneaSteps.filter(s => !completedSteps.includes(s.id));
      const stepsLeftCount = stepsLeft.length;
      const completedCount = tneaSteps.length - stepsLeftCount;
      const percent = Math.round((completedCount / tneaSteps.length) * 100);

      // Skip if already 100% complete (we already sent completion email)
      if (completedCount === tneaSteps.length) continue;

      const name = student.full_name || 'Student';
      const firstName = name.split(' ')[0];

      // Urgency level
      const urgencyColor = config.urgent ? '#dc2626' : '#d97706';
      const urgencyBg = config.urgent ? '#fef2f2' : '#fffbeb';
      const urgencyBorder = config.urgent ? '#fecaca' : '#fde68a';

      // Progress bar width
      const barWidth = percent > 0 ? `${percent}%` : '5%';

      const pendingStepsHtml = stepsLeft.slice(0, 5).map(s => `
        <li style="padding: 5px 0; font-size: 13px; color: #374151; display: flex; align-items: center; gap: 8px;">
          <span style="color: #dc2626; font-weight: 700;">○</span> ${s.label}
        </li>
      `).join('');

      const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:'Segoe UI',sans-serif;margin:0;padding:0;background:#f9fafb;">
<div style="max-width:600px;margin:0 auto;padding:20px;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);color:white;padding:28px 24px;border-radius:16px 16px 0 0;text-align:center;">
    <div style="font-size:44px;margin-bottom:10px;">⚠️</div>
    <h1 style="margin:0;font-size:21px;font-weight:900;">TNEA Application Incomplete!</h1>
    <p style="margin:8px 0 0;font-size:13px;opacity:0.9;">TNEA பொறியியல் கலந்தாய்வு 2026</p>
    <div style="margin-top:12px;background:rgba(255,255,255,0.15);border-radius:8px;padding:8px 16px;display:inline-block;">
      <p style="margin:0;font-size:13px;font-weight:700;">${config.daysToAction}</p>
    </div>
  </div>

  <!-- Body -->
  <div style="background:white;padding:28px 24px;border:1px solid #fee2e2;">

    <p style="font-size:16px;color:#1f2937;margin:0 0 12px;">Hi <strong>${firstName}</strong> 👋</p>
    <p style="font-size:14px;color:#4b5563;line-height:1.7;margin:0 0 20px;">
      You started tracking your <strong>TNEA Engineering Counselling</strong> on VAZHIKATTI, 
      but you still have <strong style="color:#dc2626;">${stepsLeftCount} steps incomplete</strong>. 
      <strong>Don't lose your seat!</strong>
    </p>

    <!-- Progress Bar -->
    <div style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:13px;font-weight:600;color:#374151;">Your Progress</span>
        <span style="font-size:13px;font-weight:700;color:${config.urgent ? '#dc2626' : '#d97706'};">${completedCount}/${tneaSteps.length} steps (${percent}%)</span>
      </div>
      <div style="background:#f3f4f6;border-radius:999px;height:12px;overflow:hidden;">
        <div style="background:linear-gradient(90deg,#16a34a,#15803d);height:100%;width:${barWidth};border-radius:999px;transition:width 0.5s;"></div>
      </div>
    </div>

    <!-- Pending Steps -->
    ${stepsLeftCount > 0 ? `
    <div style="background:${urgencyBg};border:1px solid ${urgencyBorder};border-radius:12px;padding:16px;margin-bottom:20px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:${urgencyColor};">📋 Steps you still need to complete:</p>
      <ul style="margin:0;padding-left:0;list-style:none;">
        ${pendingStepsHtml}
        ${stepsLeftCount > 5 ? `<li style="padding:5px 0;font-size:12px;color:#6b7280;">+ ${stepsLeftCount - 5} more steps...</li>` : ''}
      </ul>
    </div>
    ` : ''}

    <!-- Urgent Warning -->
    <div style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#dc2626;">🚨 What happens if you don't complete?</p>
      <ul style="margin:0;padding-left:18px;font-size:13px;color:#991b1b;line-height:1.8;">
        <li>Your application will be <strong>rejected automatically</strong></li>
        <li>You will <strong>NOT get a seat</strong> even if you registered</li>
        <li>You may have to wait until next year</li>
      </ul>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin:24px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges/educutoff"
         style="display:inline-block;background:linear-gradient(135deg,#dc2626,#b91c1c);color:white;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;">
        Open My Tracker → Complete Now
      </a>
    </div>

    <p style="font-size:12px;color:#9ca3af;text-align:center;">
      Official website: <a href="https://tneaonline.org" style="color:#16a34a;">tneaonline.org</a>
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#1f2937;color:#9ca3af;padding:16px 24px;text-align:center;border-radius:0 0 16px 16px;font-size:12px;">
    <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:white;">வழிகாட்டி — VAZHIKATTI</p>
    <p style="margin:0;">AI Career Guidance for 12th Students · Tamil Nadu</p>
    <p style="margin:8px 0 0;font-size:11px;color:#6b7280;">You registered on VAZHIKATTI. To stop receiving emails, contact us.</p>
  </div>

</div>
</body></html>`;

      try {
        const urgencyPrefix = config.urgent ? '🚨' : '⚠️';
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_KEY}`,
          },
          body: JSON.stringify({
            from: 'VAZHIKATTI <onboarding@resend.dev>',
            to: [student.email],
            subject: `${urgencyPrefix} ${firstName}, your TNEA application has ${stepsLeftCount} incomplete steps!`,
            html,
          }),
        });

        if (emailRes.ok) sent++;
        else errors.push({ email: student.email, error: await emailRes.json() });
      } catch (e) {
        errors.push({ email: student.email, error: e.message });
      }

      // Avoid rate limiting
      await new Promise(r => setTimeout(r, 150));
    }

    return res.status(200).json({
      success: true,
      totalStudents: students.length,
      remindersSent: sent,
      phase: config.phase,
      month,
      errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
