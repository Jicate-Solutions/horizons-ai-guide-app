export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AI Vazhikatti <onboarding@resend.dev>',
        to: [email],
        subject: '✅ You Have Successfully Registered In AI Vazhikatti!',
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <div style="font-size: 56px; margin-bottom: 12px;">🎓</div>
              <h1 style="margin: 0; font-size: 24px;">You Have Successfully Registered</h1>
              <h2 style="margin: 8px 0 0 0; font-size: 20px; color: #FFD700;">In AI Vazhikatti!</h2>
              <p style="margin: 12px 0 0 0; opacity: 0.9; font-size: 14px;">AI-Powered Career Guidance Platform</p>
            </div>
            <div style="height: 4px; background: linear-gradient(90deg, #DAA520, #FFD700, #DAA520);"></div>
            <div style="background: white; padding: 30px; border: 1px solid #C8E6C9;">
              <div style="text-align: center;">
                <h2 style="color: #1B5E20;">Welcome! 🎉</h2>
                <p style="color: #6b7280; font-size: 15px;">Your registration is complete. You now have full access to AI Vazhikatti's career guidance tools.</p>
                <div style="margin: 24px 0;">
                  <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges" style="display: inline-block; background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">🎯 Start Your Career Journey</a>
                </div>
              </div>
            </div>
            <div style="background: #1B5E20; color: #C8E6C9; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
              <p style="margin: 0; color: #FFD700; font-weight: 600; font-size: 14px;">AI Vazhikatti</p>
              <p style="margin: 4px 0 0 0;">AI-Powered Career Guidance Platform</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();
    console.log('Test email result:', data);

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed', details: data });
    }

    return res.status(200).json({ success: true, message: `Email sent to ${email}`, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
