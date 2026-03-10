export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ';
    if (!RESEND_API_KEY) return res.status(200).json({ success: true, message: 'Email not configured' });

    const { email, displayName } = req.body;
    if (!email) return res.status(200).json({ success: true, message: 'No email provided' });

    const name = displayName || 'Student';

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'VAZHIKATTI <onboarding@resend.dev>',
        to: [email],
        subject: `Welcome to VAZHIKATTI, ${name}! 🎓 Your Career Journey Starts Here`,
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f8fafc;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 8px;">🎓</div>
    <h1 style="margin: 0; font-size: 26px; font-weight: 800;">Welcome to VAZHIKATTI!</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.85; font-size: 14px;">AI-Powered Career Guidance for 12th Students</p>
  </div>
  <div style="height: 3px; background: linear-gradient(90deg, #f59e0b, #eab308, #f59e0b);"></div>

  <!-- Body -->
  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #059669; margin: 0;">Hi ${name}! 👋</h2>
      <p style="color: #6b7280; font-size: 15px; margin: 10px 0 0 0;">Thank you for signing up. Your personalized career guidance dashboard is ready!</p>
    </div>

    <!-- Features -->
    <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 20px 0;">
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #059669; font-weight: 700;">What you can do now:</p>
      <table style="width: 100%;"><tbody>
        <tr><td style="padding: 6px 0; font-size: 14px;">🏛️ <strong>25 Government Exams</strong> — Full syllabus, PYQ & mock tests</td></tr>
        <tr><td style="padding: 6px 0; font-size: 14px;">📝 <strong>39 Entrance Exams</strong> — JEE, NEET, CLAT, CUET & more</td></tr>
        <tr><td style="padding: 6px 0; font-size: 14px;">📚 <strong>144 Courses</strong> — Every course a 12th student can take</td></tr>
        <tr><td style="padding: 6px 0; font-size: 14px;">🎯 <strong>Personalized Dashboard</strong> — Exams filtered by your stream</td></tr>
        <tr><td style="padding: 6px 0; font-size: 14px;">📊 <strong>239 Practice Questions</strong> — With answers & explanations</td></tr>
        <tr><td style="padding: 6px 0; font-size: 14px;">📄 <strong>Download Syllabus PDF</strong> — Study offline anytime</td></tr>
      </tbody></table>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/student-dashboard" style="display: inline-block; background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 14px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">Open My Dashboard →</a>
    </div>

    <!-- Quick Start -->
    <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 14px; border-radius: 10px; margin: 15px 0;">
      <p style="margin: 0; font-size: 13px; color: #92400e;">💡 <strong>Quick Start:</strong> Go to Dashboard → Pick your stream (PCM/PCB/Commerce/Arts) → See exams recommended for YOU</p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: white;">VAZHIKATTI — வழிகாட்டி</p>
    <p style="margin: 0 0 6px 0;">AI-Powered Career Guidance for 12th Students</p>
    <p style="margin: 0;"><a href="https://horizons-ai-guide-app.vercel.app" style="color: #fbbf24; text-decoration: none;">horizons-ai-guide-app.vercel.app</a></p>
  </div>
</div>
</body></html>`,
      }),
    });

    const emailData = await emailResponse.json();
    if (!emailResponse.ok) {
      console.error('Resend error:', emailData);
      return res.status(500).json({ error: 'Failed to send email', details: emailData });
    }
    return res.status(200).json({ success: true, emailId: emailData.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
