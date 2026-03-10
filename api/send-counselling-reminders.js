import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// n8n calls this API daily → reads incomplete trackers → sends email reminders
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Simple auth — n8n sends this secret
  const authHeader = req.headers['authorization'];
  const expectedKey = process.env.REMINDER_API_KEY || 'vzk-reminder-2026-secret';
  if (authHeader !== `Bearer ${expectedKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://jahtuebykoledutqhzfx.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODYzMjIsImV4cCI6MjA4MTc2MjMyMn0.ImYkXha0Ys1OB6r97IcOVoMwHLj6-VXHZu-MfUrPnv4';
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ';

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Get all incomplete trackers
    const { data: trackers, error } = await supabase
      .from('counselling_tracker')
      .select('*')
      .eq('is_complete', false);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch trackers', details: error.message });
    }

    if (!trackers || trackers.length === 0) {
      return res.status(200).json({ success: true, message: 'No incomplete trackers', sent: 0 });
    }

    // Counselling deadlines (tentative 2026)
    const deadlines = {
      'tnea': { name: 'TNEA Engineering', nextDeadline: 'Registration closes June 1st week', urgency: 'Apply at tneaonline.org NOW' },
      'neet-tn': { name: 'NEET TN Medical', nextDeadline: 'Registration opens July 1st week', urgency: 'Prepare documents NOW' },
      'josaa': { name: 'JoSAA IIT/NIT', nextDeadline: 'Registration after JEE results (June)', urgency: 'Keep JEE scorecard ready' },
      'tnau': { name: 'TNAU Agriculture', nextDeadline: 'Registration June-July 2026', urgency: 'Check tnau.ac.in for dates' },
    };

    let sent = 0;
    const errors = [];

    for (const tracker of trackers) {
      // Skip if we sent a reminder in last 3 days
      if (tracker.last_reminder_sent_at) {
        const lastSent = new Date(tracker.last_reminder_sent_at);
        const daysSince = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSince < 3) continue;
      }

      const info = deadlines[tracker.counselling_id] || { name: tracker.counselling_id, nextDeadline: 'Check official website', urgency: 'Complete your application' };
      const stepsRemaining = tracker.total_steps - (tracker.completed_steps?.length || 0);
      const name = tracker.full_name || 'Student';

      // Send email via Resend
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: 'VAZHIKATTI Reminders <onboarding@resend.dev>',
            to: [tracker.email],
            subject: `⚠️ ${info.name}: ${stepsRemaining} steps incomplete — Don't lose your seat!`,
            html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #fef2f2;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #dc2626, #e11d48); color: white; padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 40px; margin-bottom: 8px;">⚠️</div>
    <h1 style="margin: 0; font-size: 22px; font-weight: 800;">Your Application is Incomplete!</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">${info.name} Counselling</p>
  </div>
  <div style="background: white; padding: 25px; border: 1px solid #fecaca;">
    <p style="font-size: 16px; color: #1f2937;">Hi ${name},</p>
    <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
      You started tracking your <strong>${info.name}</strong> counselling application, but 
      <strong style="color: #dc2626;">${stepsRemaining} out of ${tracker.total_steps} steps are still not completed</strong>.
    </p>
    
    <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #dc2626; font-weight: 700;">🚨 What happens if you don't complete?</p>
      <p style="margin: 0; font-size: 14px; color: #991b1b;">You will NOT get a seat. Even if you registered, incomplete applications are rejected. ${info.urgency}.</p>
    </div>

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0 0 4px 0; font-size: 13px; color: #059669; font-weight: 600;">📅 Next Deadline:</p>
      <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: 700;">${info.nextDeadline}</p>
    </div>

    <div style="text-align: center; margin: 25px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges/educutoff" 
         style="display: inline-block; background: linear-gradient(135deg, #dc2626, #e11d48); color: white; padding: 14px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Open My Tracker → Complete Now
      </a>
    </div>

    <p style="font-size: 13px; color: #6b7280; margin-top: 20px;">
      Steps completed: ${tracker.completed_steps?.length || 0} / ${tracker.total_steps}<br>
      Steps remaining: ${stepsRemaining}
    </p>
  </div>
  <div style="background: #1f2937; color: #9ca3af; padding: 16px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
    <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: white;">VAZHIKATTI — வழிகாட்டி</p>
    <p style="margin: 0;">AI Career Guidance · Counselling Reminders</p>
  </div>
</div>
</body></html>`,
          }),
        });

        const emailData = await emailRes.json();

        if (emailRes.ok) {
          sent++;
          // Update last_reminder_sent_at
          await supabase
            .from('counselling_tracker')
            .update({ last_reminder_sent_at: new Date().toISOString() })
            .eq('id', tracker.id);
        } else {
          errors.push({ email: tracker.email, error: emailData });
        }
      } catch (emailErr) {
        errors.push({ email: tracker.email, error: emailErr.message });
      }
    }

    return res.status(200).json({
      success: true,
      totalIncomplete: trackers.length,
      remindersSent: sent,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Reminder error:', error);
    return res.status(500).json({ error: error.message });
  }
}
