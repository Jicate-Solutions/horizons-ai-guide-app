// Sends congratulations email when student completes all counselling steps

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const RESEND_KEY = process.env.RESEND_API_KEY || 're_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ';

  const { email, name, trackerName, trackerNameTamil, totalSteps, nextSteps } = req.body || {};
  if (!email || !trackerName) return res.status(400).json({ error: 'Missing required fields' });

  const firstName = (name || 'Student').split(' ')[0];

  const nextStepRows = (nextSteps || []).map(step => `
    <li style="padding: 6px 0; font-size: 14px; color: #374151; border-bottom: 1px solid #f3f4f6;">
      ${step}
    </li>
  `).join('');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f0fdf4;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #16a34a, #059669); color: white; padding: 32px 24px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 56px; margin-bottom: 12px;">🎉</div>
    <h1 style="margin: 0; font-size: 24px; font-weight: 900;">Congratulations!</h1>
    <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">You have completed all steps!</p>
    <div style="margin-top: 12px; background: rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 16px; display: inline-block;">
      <p style="margin: 0; font-size: 14px; font-weight: 700;">${trackerName} ✓</p>
      ${trackerNameTamil ? `<p style="margin: 2px 0 0 0; font-size: 12px; opacity: 0.9;">${trackerNameTamil}</p>` : ''}
    </div>
  </div>

  <!-- Body -->
  <div style="background: white; padding: 28px 24px; border: 1px solid #d1fae5;">
    <p style="font-size: 16px; color: #1f2937; margin: 0 0 12px 0;">
      Hi <strong>${firstName}</strong> 🌟
    </p>
    <p style="font-size: 14px; color: #4b5563; line-height: 1.7; margin: 0 0 20px 0;">
      You've successfully completed all <strong>${totalSteps} steps</strong> of your 
      <strong>${trackerName}</strong> counselling application tracker on VAZHIKATTI. 
      This is a big achievement — you're well on your way to securing your seat!
    </p>

    <!-- Achievement Badge -->
    <div style="background: linear-gradient(135deg, #fef9c3, #fef3c7); border: 2px solid #fbbf24; border-radius: 16px; padding: 20px; text-align: center; margin: 0 0 24px 0;">
      <div style="font-size: 40px; margin-bottom: 8px;">🏆</div>
      <p style="margin: 0; font-size: 16px; font-weight: 800; color: #92400e;">Application Tracker Complete!</p>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #b45309;">${totalSteps}/${totalSteps} steps done · ${trackerName} 2026</p>
    </div>

    ${nextSteps && nextSteps.length > 0 ? `
    <!-- What's Next -->
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #1d4ed8;">📋 What to do next:</p>
      <ul style="margin: 0; padding: 0; list-style: none;">
        ${nextStepRows}
      </ul>
    </div>
    ` : ''}

    <!-- Important Reminder -->
    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #dc2626;">⚠️ Important Reminders</p>
      <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #991b1b; line-height: 1.8;">
        <li>Keep checking the official website for updates</li>
        <li>Carry all original documents on counselling day</li>
        <li>Don't miss the fee payment deadline after seat allotment</li>
        <li>Save your application number and keep screenshots</li>
      </ul>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges/educutoff"
         style="display: inline-block; background: linear-gradient(135deg, #16a34a, #059669); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;">
        Open VAZHIKATTI → Explore More Features
      </a>
    </div>

    <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 16px;">
      Use VAZHIKATTI's Rank Predictor & College Finder to find your dream college!
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #1f2937; color: #9ca3af; padding: 16px 24px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
    <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: white;">வழிகாட்டி — VAZHIKATTI</p>
    <p style="margin: 0;">AI Career Guidance for 12th Students · Tamil Nadu 🌟</p>
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
        to: [email],
        subject: `🎉 ${firstName}, you completed your ${trackerName} application tracker!`,
        html,
      }),
    });

    if (emailRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      const err = await emailRes.json();
      return res.status(500).json({ error: err });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
