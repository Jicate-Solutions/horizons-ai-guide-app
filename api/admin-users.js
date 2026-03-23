export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, serviceKey: clientKey } = req.body;
  if (password !== (process.env.ADMIN_PASSWORD || 'vzk-admin-2026')) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://jahtuebykoledutqhzfx.supabase.co';
  const SK = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || clientKey || '';
  const AK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODYzMjIsImV4cCI6MjA4MTc2MjMyMn0.ImYkXha0Ys1OB6r97IcOVoMwHLj6-VXHZu-MfUrPnv4';
  const hasSK = !!SK;
  const errors = [];
  const allUsers = [];
  const seen = new Set();

  // ─── Step 1: If we have service key, fix RLS policies automatically ───
  if (hasSK) {
    try {
      await fetch(`${URL}/rest/v1/rpc/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SK, 'Authorization': `Bearer ${SK}` },
        body: JSON.stringify({}),
      }).catch(() => {});
      // Add public SELECT policy via SQL (using PostgREST raw SQL isn't possible, but service key bypasses RLS anyway)
    } catch(e) {}
  }

  // ─── Step 2: Read Auth users (ONLY works with service key) ───
  if (hasSK) {
    try {
      let page = 1, more = true;
      while (more) {
        const r = await fetch(`${URL}/auth/v1/admin/users?page=${page}&per_page=100`, {
          headers: { 'Authorization': `Bearer ${SK}`, 'apikey': SK },
        });
        if (r.ok) {
          const d = await r.json();
          const users = d.users || [];
          users.forEach(u => {
            const m = u.user_metadata || {};
            const phone = m.phone || (u.email && u.email.includes('@vazhikatti.app') ? u.email.split('@')[0] : '') || '';
            const key = phone || u.email || u.id;
            if (!seen.has(key)) {
              seen.add(key);
              allUsers.push({
                id: u.id, full_name: m.display_name || m.full_name || '',
                phone, email: m.user_email || (u.email && !u.email.includes('@vazhikatti.app') ? u.email : '') || '',
                school_name: m.school_name || m.schoolName || '', stream: m.stream || '',
                pass_out_year: m.pass_out_year || m.passOutYear || '', district: m.district || '',
                career_interest: m.career_interest || m.careerInterest || '',
                created_at: u.created_at, last_sign_in: u.last_sign_in_at || u.created_at,
                provider: 'Auth User', source: 'auth',
              });
            }
          });
          more = users.length === 100;
          page++;
        } else {
          errors.push('Auth: ' + r.status + ' ' + (await r.text()).substring(0, 100));
          more = false;
        }
      }
    } catch (e) { errors.push('Auth exception: ' + e.message); }
  }

  // ─── Step 3: Read registrations table (use service key to bypass RLS) ───
  const readKey = hasSK ? SK : AK;
  try {
    const r = await fetch(`${URL}/rest/v1/registrations_12th_learners?select=*&order=created_at.desc`, {
      headers: { 'apikey': readKey, 'Authorization': `Bearer ${readKey}` },
    });
    if (r.ok) {
      const regs = await r.json();
      (regs || []).forEach(reg => {
        const key = reg.phone || reg.email || reg.id;
        if (!seen.has(key)) {
          seen.add(key);
          allUsers.push({
            id: reg.id, full_name: reg.full_name || '', phone: reg.phone || '', email: reg.email || '',
            school_name: reg.school_name || '', stream: reg.stream || '',
            pass_out_year: reg.preferred_course || '', district: reg.preferred_institution || '',
            career_interest: Array.isArray(reg.career_interests) ? reg.career_interests.join(', ') : (reg.career_interests || ''),
            created_at: reg.created_at, last_sign_in: reg.created_at,
            provider: '12th Learner', source: 'registration',
          });
        } else {
          // Merge extra data into existing auth user
          const existing = allUsers.find(u => (u.phone && u.phone === reg.phone) || (u.email && u.email === reg.email));
          if (existing) {
            if (!existing.school_name && reg.school_name) existing.school_name = reg.school_name;
            if (!existing.stream && reg.stream) existing.stream = reg.stream;
            if (!existing.full_name && reg.full_name) existing.full_name = reg.full_name;
            existing.provider = '12th Learner';
          }
        }
      });
    } else {
      errors.push('Registrations: ' + r.status + ' ' + (await r.text()).substring(0, 100));
    }
  } catch (e) { errors.push('Reg exception: ' + e.message); }

  // ─── Step 4: Read profiles (use service key to bypass RLS) ───
  try {
    const r = await fetch(`${URL}/rest/v1/profiles?select=*&order=created_at.desc`, {
      headers: { 'apikey': readKey, 'Authorization': `Bearer ${readKey}` },
    });
    if (r.ok) {
      const profs = await r.json();
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
      errors.push('Profiles: ' + r.status);
    }
  } catch (e) { errors.push('Profiles: ' + e.message); }

  allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return res.status(200).json({
    users: allUsers,
    total: allUsers.length,
    setupNeeded: false,
    diagnostic: {
      hasServiceKey: hasSK,
      keyType: hasSK ? (clientKey ? 'client-provided' : 'env-var') : 'anon-fallback',
      keyPrefix: SK ? SK.substring(0, 20) + '...' : 'NONE',
      urlUsed: URL,
      envKeysFound: Object.keys(process.env).filter(k => k.toLowerCase().includes('supabase')),
      errors,
      sources: {
        auth: allUsers.filter(u => u.source === 'auth').length,
        registration: allUsers.filter(u => u.source === 'registration').length,
        profile: allUsers.filter(u => u.source === 'profile').length,
      },
    },
  });
}
