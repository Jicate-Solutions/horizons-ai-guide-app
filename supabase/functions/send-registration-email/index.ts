import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  board: string;
  stream: string;
  expectedYear: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "re_P5gxzs8w_7KobNkHAQFbUSX9771wk78iQ";
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured, skipping email");
      return new Response(
        JSON.stringify({ success: true, message: "Email not configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { fullName, email, phone, school, board, stream, expectedYear }: RegistrationEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: true, message: "No email provided" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending registration confirmation to:", email);

    const boardDisplay = (board || '').toUpperCase();
    const streamDisplay = stream ? stream.charAt(0).toUpperCase() + stream.slice(1) : '';

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "AI Vazhikatti <onboarding@resend.dev>",
        to: [email],
        subject: `✅ You Have Successfully Registered In AI Vazhikatti, ${fullName}!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f0fdf4;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                <div style="font-size: 56px; margin-bottom: 12px;">🎓</div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 700;">You Have Successfully Registered</h1>
                <h2 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 600; color: #FFD700;">In AI Vazhikatti!</h2>
                <p style="margin: 12px 0 0 0; opacity: 0.9; font-size: 14px;">AI-Powered Career Guidance Platform</p>
              </div>
              <div style="height: 4px; background: linear-gradient(90deg, #DAA520, #FFD700, #DAA520);"></div>
              <div style="background: white; padding: 30px; border: 1px solid #C8E6C9;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h2 style="color: #1B5E20; margin: 0; font-size: 22px;">Welcome, ${fullName}! 🎉</h2>
                  <p style="color: #6b7280; font-size: 15px; margin-top: 8px;">Your registration is complete. You now have full access to AI Vazhikatti's career guidance tools.</p>
                </div>
                <div style="background: linear-gradient(135deg, #E8F5E9, #F1F8E9); padding: 24px; border-radius: 12px; border: 1px solid #C8E6C9; margin: 24px 0;">
                  <h3 style="margin: 0 0 16px 0; color: #1B5E20; font-size: 16px;">📋 Your Registration Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; width: 140px; font-size: 14px;">👤 Name</td><td style="padding: 10px 0; font-size: 14px;">${fullName}</td></tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">📞 Phone</td><td style="padding: 10px 0; font-size: 14px;">${phone}</td></tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">✉️ Email</td><td style="padding: 10px 0; font-size: 14px;">${email}</td></tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">🏫 School</td><td style="padding: 10px 0; font-size: 14px;">${school || 'Not provided'}</td></tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">📚 Board</td><td style="padding: 10px 0; font-size: 14px;">${boardDisplay || 'Not provided'}</td></tr>
                    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">🎯 Stream</td><td style="padding: 10px 0; font-size: 14px;">${streamDisplay || 'Not provided'}</td></tr>
                    <tr><td style="padding: 10px 0; font-weight: 600; color: #1B5E20; font-size: 14px;">📅 Passing Year</td><td style="padding: 10px 0; font-size: 14px;">${expectedYear || 'Not provided'}</td></tr>
                  </table>
                </div>
                <div style="text-align: center; margin: 24px 0;">
                  <a href="https://horizons-ai-guide-app.vercel.app/career-assessment/colleges" style="display: inline-block; background: linear-gradient(135deg, #1B5E20, #2E7D32); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">🎯 Start Your Career Journey</a>
                </div>
              </div>
              <div style="background: #1B5E20; color: #C8E6C9; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
                <p style="margin: 0 0 4px 0; color: #FFD700; font-weight: 600; font-size: 14px;">AI Vazhikatti</p>
                <p style="margin: 0;">AI-Powered Career Guidance Platform</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Registration email sent:", emailData);

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending registration email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
