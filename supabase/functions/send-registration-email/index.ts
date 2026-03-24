import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmailRequest {
  fullName: string;
  email: string;
  phone?: string;
  school?: string;
  board?: string;
  stream?: string;
  expectedYear?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
    if (!resendApiKey) {
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

    const name = fullName || "Student";
    const boardDisplay = (board || "").toUpperCase();
    const streamDisplay = stream ? stream.charAt(0).toUpperCase() + stream.slice(1) : "";

    // Build registration details rows (only show what was provided)
    const detailRows = [
      { label: "👤 Name", value: name },
      phone && phone !== "-" ? { label: "📞 Phone", value: phone } : null,
      { label: "✉️ Email", value: email },
      school && school !== "-" ? { label: "🏫 School", value: school } : null,
      boardDisplay && boardDisplay !== "-" ? { label: "📚 Board", value: boardDisplay } : null,
      streamDisplay && streamDisplay !== "-" ? { label: "🎯 Stream", value: streamDisplay } : null,
      expectedYear && expectedYear !== "-" ? { label: "📅 Passing Year", value: expectedYear } : null,
    ].filter(Boolean);

    const detailsHTML = detailRows.map((r: any) =>
      `<tr style="border-bottom: 1px solid #d1fae5;"><td style="padding: 10px 0; font-weight: 600; color: #059669; width: 130px; font-size: 14px;">${r.label}</td><td style="padding: 10px 0; font-size: 14px;">${r.value}</td></tr>`
    ).join("");

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendApiKey}` },
      body: JSON.stringify({
        from: "VAZHIKATTI <onboarding@resend.dev>",
        to: [email],
        subject: `Welcome to VAZHIKATTI, ${name}! 🎓 Registration Successful`,
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0fdf4;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 8px;">🎓</div>
    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Registration Successful!</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">VAZHIKATTI — AI Career Guidance</p>
  </div>
  <div style="height: 3px; background: linear-gradient(90deg, #f59e0b, #eab308, #f59e0b);"></div>
  <div style="background: white; padding: 30px; border: 1px solid #d1fae5;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #059669; margin: 0;">Welcome, ${name}! 🎉</h2>
      <p style="color: #6b7280; font-size: 15px; margin: 10px 0 0 0;">Your registration is complete. You now have full access to VAZHIKATTI.</p>
    </div>
    <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #d1fae5; margin: 20px 0;">
      <h3 style="margin: 0 0 12px 0; color: #059669; font-size: 15px;">📋 Your Details</h3>
      <table style="width: 100%; border-collapse: collapse;">${detailsHTML}</table>
    </div>
    <div style="background: #f0fdf4; padding: 16px; border-radius: 10px; border: 1px solid #d1fae5; margin: 20px 0;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #059669; font-weight: 600;">What you can do now:</p>
      <p style="margin: 3px 0; font-size: 13px;">🏛️ 25 Govt Exams with syllabus & PYQ</p>
      <p style="margin: 3px 0; font-size: 13px;">📝 39 Entrance Exams (JEE, NEET, CUET & more)</p>
      <p style="margin: 3px 0; font-size: 13px;">📚 144 Courses across all streams</p>
      <p style="margin: 3px 0; font-size: 13px;">🎯 Personalized Dashboard for your stream</p>
    </div>
    <div style="text-align: center; margin: 25px 0;">
      <a href="https://horizons-ai-guide-app.vercel.app/student-dashboard" style="display: inline-block; background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 14px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">Open My Dashboard →</a>
    </div>
  </div>
  <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px;">
    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: white;">VAZHIKATTI — வழிகாட்டி</p>
    <p style="margin: 0;">AI-Powered Career Guidance for 12th Students</p>
  </div>
</div>
</body></html>`,
      }),
    });

    const emailData = await emailResponse.json();
    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
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
