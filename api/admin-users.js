export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vzk-admin-2026';
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }

  // Try multiple env var names + hardcoded fallback
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jahtuebykoledutqhzfx.supabase.co';
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODYzMjIsImV4cCI6MjA4MTc2MjMyMn0.ImYkXha0Ys1OB6r97IcOVoMwHLj6-VXHZu-MfUrPnv4';

  const hasServiceKey = !!SUPABASE_SERVICE_KEY;
  const apiKey = hasServiceKey ? SUPABASE_SERVICE_KEY : SUPABASE_ANON_KEY;

  const diag = {
    hasServiceKey,
    hasUrl: !!SUPABASE_URL,
    urlUsed: SUPABASE_URL.substring(0, 40),
    keyType: hasServiceKey ? 'service_role' : 'anon (fallback)',
    envKeysFound: Object.keys(process.env).filter(k => k.toLowerCase().includes('supabase')),
  };

  try {
    const allUsers = [];
    const seen = new Set();
    const errors = [];

    // Source 1: Auth users (ONLY works with service key)
    if (hasServiceKey) {
      try {
        let page = 1;
        let hasMore = true;
        while (hasMore) {
          const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=${page}&per_page=100`, {
            headers: { 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`, 'apikey': SUPABASE_SERVICE_KEY },
          });
          if (authRes.ok) {
            const authData = await authRes.json();
            const users = authData.users || [];
            users.forEach(u => {
              const meta = u.user_metadata || {};
              const phone = meta.phone || (u.email && u.email.includes('@vazhikatti.app') ? u.email.split('@')[0] : '') || '';
              const key = phone || u.email || u.id;
              if (!seen.has(key)) {
                seen.add(key);
                allUsers.push({
                  id: u.id, full_name: meta.display_name || meta.full_name || '',
                  phone, email: meta.user_email || (u.email && !u.email.includes('@vazhikatti.app') ? u.email : '') || '',
                  school_name: meta.school_name || meta.schoolName || '', stream: meta.stream || '',
                  pass_out_year: meta.pass_out_year || meta.passOutYear || '', district: meta.district || '',
                  career_interest: meta.career_interest || meta.careerInterest || '',
                  created_at: u.created_at, last_sign_in: u.last_sign_in_at || u.created_at,
                  provider: 'Auth User', source: 'auth',
                });
              }
            });
            hasMore = users.length === 100;
            page++;
          } else {
            const errText = await authRes.text();
            errors.push(`Auth ${authRes.status}: ${errText.substring(0, 100)}`);
            hasMore = false;
          }
        }
      } catch (e) { errors.push('Auth: ' + e.message); }
    }

    // Source 2: registrations_12th_learners (works with anon key if RLS allows, always with service key)
    try {
      const regRes = await fetch(`${SUPABASE_URL}/rest/v1/registrations_12th_learners?select=*&order=created_at.desc`, {
        headers: { 'apikey': apiKey, 'Authorization': `Bearer ${apiKey}` },
      });
      if (regRes.ok) {
        const regs = await regRes.json();
        (regs || []).forEach(r => {
          const key = r.phone || r.email || r.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: r.id, full_name: r.full_name || '', phone: r.phone || '', email: r.email || '',
              school_name: r.school_name || '', stream: r.stream || '',
              pass_out_year: r.preferred_course || '', district: r.preferred_institution || '',
              career_interest: Array.isArray(r.career_interests) ? r.career_interests.join(', ') : (r.career_interests || ''),
              created_at: r.created_at, last_sign_in: r.created_at,
              provider: '12th Learner', source: 'registration',
            });
          } else {
            const existing = allUsers.find(u => (u.phone && u.phone === r.phone) || (u.email && u.email === r.email));
            if (existing) {
              if (!existing.school_name && r.school_name) existing.school_name = r.school_name;
              if (!existing.stream && r.stream) existing.stream = r.stream;
              if (!existing.district && r.preferred_institution) existing.district = r.preferred_institution;
              if (!existing.full_name && r.full_name) existing.full_name = r.full_name;
              existing.provider = '12th Learner';
            }
          }
        });
      } else {
        errors.push(`Registrations ${regRes.status}: ${(await regRes.text()).substring(0, 100)}`);
      }
    } catch (e) { errors.push('Registrations: ' + e.message); }

    // Source 3: profiles table
    try {
      const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&order=created_at.desc`, {
        headers: { 'apikey': apiKey, 'Authorization': `Bearer ${apiKey}` },
      });
      if (profRes.ok) {
        const profs = await profRes.json();
        (profs || []).forEach(p => {
          const bio = p.bio || '';
          const parts = bio.split('|').map(s => s.trim());
          const phone = parts[0] && /^\d{10}$/.test(parts[0]) ? parts[0] : '';
          const key = phone || p.display_name || p.user_id || p.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: p.user_id || p.id, full_name: p.display_name || '', phone, email: parts[1] || '',
              school_name: parts[2] || '', stream: parts[3] || '',
              pass_out_year: parts[4] || '', district: parts[5] || '',
              career_interest: parts[6] || '',
              created_at: p.created_at, last_sign_in: p.updated_at || p.created_at,
              provider: 'App User', source: 'profile',
            });
          }
        });
      } else {
        errors.push(`Profiles ${profRes.status}: ${(await profRes.text()).substring(0, 100)}`);
      }
    } catch (e) { errors.push('Profiles: ' + e.message); }

    allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return res.status(200).json({
      users: allUsers,
      total: allUsers.length,
      setupNeeded: false,
      diagnostic: { ...diag, errors, sources: { auth: allUsers.filter(u => u.source === 'auth').length, registration: allUsers.filter(u => u.source === 'registration').length, profile: allUsers.filter(u => u.source === 'profile').length } },
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message, diagnostic: diag });
  }
}
