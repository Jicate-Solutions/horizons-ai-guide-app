export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured');
      return res.status(200).json({ success: true, message: 'Email not configured' });
    }

    const { fullName, email, phone, school, board, stream, expectedYear } = req.body;
    if (!email) return res.status(200).json({ success: true, message: 'No email provided' });

    console.log('Sending registration confirmation to:', email);
    const boardDisplay = (board || '').toUpperCase();
    const streamDisplay = stream ? stream.charAt(0).toUpperCase() + stream.slice(1) : '';

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AI Vazhikatti <onboarding@resend.dev>',
        to: [email],
        subject: `✅ You Have Successfully Registered In AI Vazhikatti, ${fullName}!`,
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
              <div style="background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                <div style="font-size: 56px; margin-bottom: 12px;">🎓</div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 700;">You Have Successfully Registered</h1>
                <h2 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 600; color: #FFD700;">In AI Vazhikatti!</h2>
                <p style="margin: 12px 0 0 0; opacity: 0.9; font-size: 14px;">AI-Powered Career Guidance Platform</p>
              </div>

              <!-- Gold accent line -->
              <div style="height: 4px; background: linear-gradient(90deg, #DAA520, #FFD700, #DAA520);"></div>

              <!-- Content -->
              <div style="background: white; padding: 30px; border: 1px solid #C8E6C9;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h2 style="color: #1B5E20; margin: 0; font-size: 22px;">Welcome, ${fullName}! 🎉</h2>
                  <p style="color: #6b7280; font-size: 15px; margin-top: 8px;">
                    Your registration is complete. You now have full access to AI Vazhikatti's career guidance tools.
                  </p>
                </div>

                <!-- Registration Details -->
                <div style="background: linear-gradient(135deg, #E8F5E9, #F1F8E9); padding: 24px; border-radius: 12px; border: 1px solid #C8E6C9; margin: 24px 0;">
                  <h3 style="margin: 0 0 16px 0; color: #1B5E20; font-size: 16px;">📋 Your Registration Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #C8E6C9;">
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; width: 140px; font-size: 14px;">👤 Name</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${fullName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;">
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">📞 Phone</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${phone}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;">
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">✉️ Email</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${email}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;">
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">🏫 School</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${school || 'Not provided'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;">
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">📚 Board</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${boardDisplay || 'Not provided'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;">
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">🎯 Stream</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${streamDisplay || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">📅 Passing Year</td>
                      <td style="padding: 10px 0; font-size: 14px; color: #333;">${expectedYear || 'Not provided'}</td>
                    </tr>
                  </table>
                </div>

                <!-- What's Next -->
                <div style="background: #FFF8E1; padding: 20px; border-radius: 12px; border: 1px solid #FFE082; margin: 24px 0;">
                  <h3 style="margin: 0 0 12px 0; color: #F57F17; font-size: 15px;">🚀 What You Can Do Now</h3>
                  <table style="width: 100%;">
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #333;">✅ Take the AI Career Assessment</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #333;">✅ Chat with AI Career Counselor</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #333;">✅ Explore 61+ Scholarships</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #333;">✅ Browse 1,771 Tamil Nadu Colleges</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #333;">✅ Practice Previous Year Questions</td>
                    </tr>
                  </table>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 24px 0;">
                  <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges"
                     style="display: inline-block; background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">
                    🎯 Start Your Career Journey
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #1B5E20; color: #C8E6C9; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
                <p style="margin: 0 0 4px 0; color: #FFD700; font-weight: 600; font-size: 14px;">AI Vazhikatti</p>
                <p style="margin: 0 0 4px 0;">AI-Powered Career Guidance Platform</p>
                <p style="margin: 0;">
                  <a href="https://horizons-ai-guide-app.vercel.app" style="color: #FFD700; text-decoration: none;">
                    horizons-ai-guide-app.vercel.app
                  </a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log('Registration email response:', emailData);

    if (!emailResponse.ok) {
      console.error('Resend error:', emailData);
      return res.status(500).json({ error: 'Failed to send email', details: emailData });
    }

    return res.status(200).json({ success: true, emailId: emailData.id });
  } catch (error) {
    console.error('Error sending registration email:', error);
    return res.status(500).json({ error: error.message });
  }
}
