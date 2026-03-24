import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// This Edge Function reads ALL registrations using the service_role key
// which is automatically available inside Supabase Edge Functions.
// No manual key configuration needed!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_PASS = Deno.env.get("ADMIN_PASSWORD") || "vzk-admin-2026";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate admin
    let password = "";
    try {
      const body = await req.json();
      password = body?.password || "";
    } catch {
      return new Response(
        JSON.stringify({ error: "Send JSON body with password" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (password !== ADMIN_PASS) {
      return new Response(
        JSON.stringify({ error: "Invalid admin password" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Use the built-in service role key (auto-available in Edge Functions)
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Service role key not found in Edge Function environment" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create admin client that bypasses RLS
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const allUsers: any[] = [];
    const seen = new Set<string>();
    const errors: string[] = [];

    // ─── 1. Read Auth users ───
    try {
      const { data: authData, error: authErr } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (authErr) {
        errors.push("Auth: " + authErr.message);
      } else {
        (authData?.users || []).forEach((u: any) => {
          const m = u.user_metadata || {};
          const phone = m.phone || (u.email?.includes("@vazhikatti.app") ? u.email.split("@")[0] : "") || "";
          const key = phone || u.email || u.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: u.id,
              full_name: m.display_name || m.full_name || "",
              phone,
              email: m.user_email || (u.email && !u.email.includes("@vazhikatti.app") ? u.email : "") || "",
              school_name: m.school_name || m.schoolName || "",
              stream: m.stream || "",
              pass_out_year: m.pass_out_year || m.passOutYear || "",
              district: m.district || "",
              career_interest: m.career_interest || m.careerInterest || "",
              created_at: u.created_at,
              last_sign_in: u.last_sign_in_at || u.created_at,
              provider: "Auth User",
              source: "auth",
            });
          }
        });
      }
    } catch (e: any) {
      errors.push("Auth exception: " + e.message);
    }

    // ─── 2. Read 12th Learner registrations ───
    try {
      const { data: regs, error: regErr } = await supabase
        .from("registrations_12th_learners")
        .select("*")
        .order("created_at", { ascending: false });

      if (regErr) {
        errors.push("Registrations: " + regErr.message);
      } else {
        (regs || []).forEach((reg: any) => {
          const key = reg.phone || reg.email || reg.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: reg.id,
              full_name: reg.full_name || "",
              phone: reg.phone || "",
              email: reg.email || "",
              school_name: reg.school_name || "",
              stream: reg.stream || "",
              pass_out_year: reg.preferred_course || "",
              district: reg.preferred_institution || "",
              career_interest: Array.isArray(reg.career_interests) ? reg.career_interests.join(", ") : (reg.career_interests || ""),
              created_at: reg.created_at,
              last_sign_in: reg.created_at,
              provider: "12th Learner",
              source: "registration",
            });
          } else {
            // Merge data into existing auth user
            const existing = allUsers.find(
              (u) => (u.phone && u.phone === reg.phone) || (u.email && u.email === reg.email)
            );
            if (existing) {
              if (!existing.school_name && reg.school_name) existing.school_name = reg.school_name;
              if (!existing.stream && reg.stream) existing.stream = reg.stream;
              if (!existing.full_name && reg.full_name) existing.full_name = reg.full_name;
              if (!existing.district && reg.preferred_institution) existing.district = reg.preferred_institution;
              if (!existing.career_interest && reg.career_interests) {
                existing.career_interest = Array.isArray(reg.career_interests) ? reg.career_interests.join(", ") : reg.career_interests;
              }
              existing.provider = "12th Learner";
            }
          }
        });
      }
    } catch (e: any) {
      errors.push("Registration exception: " + e.message);
    }

    // ─── 3. Read Learner registrations ───
    try {
      const { data: learners, error: lErr } = await supabase
        .from("registrations_learners")
        .select("*")
        .order("created_at", { ascending: false });

      if (lErr) {
        errors.push("Learners: " + lErr.message);
      } else {
        (learners || []).forEach((reg: any) => {
          const key = reg.phone || reg.email || reg.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: reg.id,
              full_name: reg.full_name || "",
              phone: reg.phone || "",
              email: reg.email || "",
              school_name: reg.institution || "",
              stream: reg.degree || "",
              pass_out_year: "",
              district: "",
              career_interest: reg.preferred_role || "",
              created_at: reg.created_at,
              last_sign_in: reg.created_at,
              provider: "Learner",
              source: "learner",
            });
          }
        });
      }
    } catch (e: any) {
      errors.push("Learner exception: " + e.message);
    }

    // ─── 4. Read Employer registrations ───
    try {
      const { data: employers, error: eErr } = await supabase
        .from("registrations_employers")
        .select("*")
        .order("created_at", { ascending: false });

      if (eErr) {
        errors.push("Employers: " + eErr.message);
      } else {
        (employers || []).forEach((reg: any) => {
          const key = reg.contact_email || reg.contact_phone || reg.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: reg.id,
              full_name: reg.contact_name || reg.company_name || "",
              phone: reg.contact_phone || "",
              email: reg.contact_email || "",
              school_name: reg.company_name || "",
              stream: reg.industry || "",
              pass_out_year: "",
              district: reg.job_location || "",
              career_interest: reg.roles_hiring || "",
              created_at: reg.created_at,
              last_sign_in: reg.created_at,
              provider: "Employer",
              source: "employer",
            });
          }
        });
      }
    } catch (e: any) {
      errors.push("Employer exception: " + e.message);
    }

    // ─── 5. Read profiles ───
    try {
      const { data: profiles, error: pErr } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (pErr) {
        errors.push("Profiles: " + pErr.message);
      } else {
        (profiles || []).forEach((p: any) => {
          const bio = p.bio || "";
          const parts = bio.split("|").map((s: string) => s.trim());
          const phone = parts[0] && /^\d{10}$/.test(parts[0]) ? parts[0] : "";
          const key = phone || p.display_name || p.user_id || p.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: p.user_id || p.id,
              full_name: p.display_name || "",
              phone,
              email: parts[1] || "",
              school_name: parts[2] || "",
              stream: parts[3] || "",
              pass_out_year: parts[4] || "",
              district: parts[5] || "",
              career_interest: parts[6] || "",
              created_at: p.created_at,
              last_sign_in: p.updated_at || p.created_at,
              provider: "App User",
              source: "profile",
            });
          }
        });
      }
    } catch (e: any) {
      errors.push("Profile exception: " + e.message);
    }

    // Sort newest first
    allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // ─── 6. Also run data protection (block deletes) ───
    try {
      // Block DELETE on registration tables
      await supabase.rpc("exec_sql", {
        sql_query: `
          DO $$ BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations_12th_learners' AND policyname = 'Block all deletes on registrations') THEN
              CREATE POLICY "Block all deletes on registrations" ON public.registrations_12th_learners FOR DELETE USING (false);
            END IF;
          END $$;
        `
      }).catch(() => {}); // Silent fail — policy might already exist or rpc might not exist
    } catch {}

    return new Response(
      JSON.stringify({
        users: allUsers,
        total: allUsers.length,
        sources: {
          auth: allUsers.filter((u) => u.source === "auth").length,
          registration: allUsers.filter((u) => u.source === "registration").length,
          learner: allUsers.filter((u) => u.source === "learner").length,
          employer: allUsers.filter((u) => u.source === "employer").length,
          profile: allUsers.filter((u) => u.source === "profile").length,
        },
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
