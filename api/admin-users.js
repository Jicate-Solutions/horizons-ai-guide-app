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

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(200).json({ users: [], setupNeeded: true, message: 'Add SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables' });
  }

  try {
    const allUsers = [];
    const seen = new Set();

    // Source 1: Auth users (guaranteed to have ALL signups with metadata)
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
                id: u.id,
                full_name: meta.display_name || meta.full_name || '',
                phone: phone,
                email: meta.user_email || (u.email && !u.email.includes('@vazhikatti.app') ? u.email : '') || '',
                school_name: meta.school_name || '',
                stream: meta.stream || '',
                pass_out_year: meta.pass_out_year || '',
                district: meta.district || '',
                career_interest: meta.career_interest || '',
                created_at: u.created_at,
                last_sign_in: u.last_sign_in_at || u.created_at,
                provider: 'Auth User',
                source: 'auth',
              });
            }
          });
          hasMore = users.length === 100;
          page++;
        } else { hasMore = false; }
      }
    } catch (e) { console.warn('Auth users fetch failed:', e); }

    // Source 2: registrations_12th_learners table
    try {
      const regRes = await fetch(`${SUPABASE_URL}/rest/v1/registrations_12th_learners?select=*&order=created_at.desc`, {
        headers: { 'apikey': SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}` },
      });
      if (regRes.ok) {
        const regs = await regRes.json();
        (regs || []).forEach(r => {
          const key = r.phone || r.email || r.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: r.id,
              full_name: r.full_name || '',
              phone: r.phone || '',
              email: r.email || '',
              school_name: r.school_name || '',
              stream: r.stream || '',
              pass_out_year: r.preferred_course || '',
              district: r.preferred_institution || '',
              career_interest: Array.isArray(r.career_interests) ? r.career_interests.join(', ') : (r.career_interests || ''),
              created_at: r.created_at,
              last_sign_in: r.created_at,
              provider: '12th Learner',
              source: 'registration',
            });
          } else {
            // Merge details into existing user if they have more data
            const existing = allUsers.find(u => (u.phone && u.phone === r.phone) || (u.email && u.email === r.email));
            if (existing) {
              if (!existing.school_name && r.school_name) existing.school_name = r.school_name;
              if (!existing.stream && r.stream) existing.stream = r.stream;
              if (!existing.district && r.preferred_institution) existing.district = r.preferred_institution;
              if (!existing.pass_out_year && r.preferred_course) existing.pass_out_year = r.preferred_course;
              if (!existing.career_interest && r.career_interests) {
                existing.career_interest = Array.isArray(r.career_interests) ? r.career_interests.join(', ') : r.career_interests;
              }
              if (!existing.full_name && r.full_name) existing.full_name = r.full_name;
              existing.provider = '12th Learner';
            }
          }
        });
      }
    } catch (e) { console.warn('Registrations fetch failed:', e); }

    // Source 3: profiles table
    try {
      const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&order=created_at.desc`, {
        headers: { 'apikey': SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}` },
      });
      if (profRes.ok) {
        const profs = await profRes.json();
        (profs || []).forEach(p => {
          const bio = p.bio || '';
          const parts = bio.split('|').map(s => s.trim());
          const phone = parts[0] && /^\d{10}$/.test(parts[0]) ? parts[0] : '';
          const key = phone || p.display_name || p.id;
          if (!seen.has(key)) {
            seen.add(key);
            allUsers.push({
              id: p.id,
              full_name: p.display_name || '',
              phone: phone,
              email: parts[1] || '',
              school_name: parts[2] || '',
              stream: parts[3] || '',
              pass_out_year: parts[4] || '',
              district: parts[5] || '',
              career_interest: parts[6] || '',
              created_at: p.created_at,
              last_sign_in: p.updated_at || p.created_at,
              provider: 'App User',
              source: 'profile',
            });
          }
        });
      }
    } catch (e) { console.warn('Profiles fetch failed:', e); }

    // Sort newest first
    allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return res.status(200).json({ users: allUsers, total: allUsers.length, setupNeeded: false });

  } catch (err) {
    console.error('Admin users error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
