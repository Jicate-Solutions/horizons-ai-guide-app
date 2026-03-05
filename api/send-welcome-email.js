export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ';
    if (!RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured');
      return res.status(200).json({ success: true, message: 'Email not configured' });
    }

    const { email, displayName } = req.body;

    if (!email) {
      return res.status(200).json({ success: true, message: 'No email provided' });
    }

    const name = displayName || 'Learner';
    console.log('Sending welcome email to:', email);

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'VAZHIKATTI - JKKN <onboarding@resend.dev>',
        to: [email],
        subject: `🎓 Welcome to VAZHIKATTI, ${name}! Thank You for Signing Up`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f0fdf4;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #166534 0%, #15803d 50%, #ca8a04 100%); color: white; padding: 35px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 1px; margin-bottom: 15px;">JKKN INSTITUTIONS</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🎉 Welcome to VAZHIKATTI!</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Your AI-Powered Career Guide</p>
              </div>
              
              <!-- Content -->
              <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
                <div style="text-align: center;">
                  <div style="font-size: 56px; margin-bottom: 10px;">🙏</div>
                  <h2 style="color: #166534; margin: 0 0 5px 0;">Thank You for Signing Up, ${name}!</h2>
                  <p style="color: #6b7280; font-size: 15px; margin: 10px 0 25px 0;">
                    We're thrilled to have you join the VAZHIKATTI community. Your career journey starts here!
                  </p>
                </div>
                
                <!-- Welcome Message Box -->
                <div style="background: linear-gradient(135deg, #f0fdf4, #fefce8); padding: 24px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 20px 0;">
                  <p style="margin: 0 0 12px 0; font-size: 15px; color: #166534; font-weight: 600;">What you can do on VAZHIKATTI:</p>
                  <table style="width: 100%;">
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px;">🤖 <strong>AI Career Counselor</strong> — Get personalized career advice from our AI</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px;">📊 <strong>Career Assessment</strong> — Discover your ideal career path</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px;">🏛️ <strong>Find Colleges</strong> — Browse 200+ colleges across Tamil Nadu</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px;">📝 <strong>Govt Exam Prep</strong> — Practice PYQs for NEET, JEE, TNPSC & more</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px;">💼 <strong>Job Portal</strong> — Find internships & job opportunities</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px;">🚀 <strong>Startup Guide</strong> — Build your own startup with AI mentorship</td>
                    </tr>
                  </table>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://horizons-ai-guide-app.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #FF6B35, #e55a2a); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">🚀 Start Exploring Now</a>
                </div>

                <!-- Quick Tip -->
                <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 16px; border-radius: 10px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #92400e;">
                    💡 <strong>Quick Tip:</strong> Start by chatting with our AI Career Counselor — just click the chat icon on the bottom right corner of the app!
                  </p>
                </div>

                <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 25px;">
                  Need help? Reach out anytime at <a href="mailto:info@jkkn.ac.in" style="color: #166534; font-weight: 600;">info@jkkn.ac.in</a>
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #1f2937; color: #9ca3af; padding: 25px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
                <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 700; color: white;">VAZHIKATTI</p>
                <p style="margin: 0 0 8px 0;">AI Career Guide by JKKN Institutions</p>
                <p style="margin: 0 0 8px 0;">74+ Years of Excellence in Education | 7 Colleges | 50+ Programs</p>
                <p style="margin: 0;"><a href="https://horizons-ai-guide-app.vercel.app" style="color: #fbbf24; text-decoration: none;">horizons-ai-guide-app.vercel.app</a></p>
                <p style="margin: 10px 0 0 0; font-size: 11px; color: #6b7280;">© 2026 JKKN Institutions. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log('Welcome email response:', emailData);

    if (!emailResponse.ok) {
      console.error('Resend error:', emailData);
      return res.status(500).json({ error: 'Failed to send email', details: emailData });
    }

    return res.status(200).json({ success: true, emailId: emailData.id });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return res.status(500).json({ error: error.message });
  }
}
