export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Simple admin password check
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vzk-admin-2026';

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    // Fallback: return basic info without service key
    return res.status(200).json({ 
      users: [],
      message: 'SUPABASE_SERVICE_ROLE_KEY not set in Vercel. Add it in Settings → Environment Variables.',
      setupNeeded: true
    });
  }

  try {
    // Fetch auth users using Supabase Admin API
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=100`, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'apikey': SUPABASE_SERVICE_KEY,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase admin API error:', response.status, err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    const data = await response.json();
    const users = (data.users || []).map(u => ({
      id: u.id,
      email: u.email || '',
      phone: u.phone || '',
      created_at: u.created_at,
      last_sign_in: u.last_sign_in_at,
      provider: u.app_metadata?.provider || 'email',
      confirmed: !!u.email_confirmed_at || !!u.phone_confirmed_at,
    }));

    return res.status(200).json({
      users,
      total: data.total || users.length,
      setupNeeded: false,
    });

  } catch (err) {
    console.error('Admin users error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
