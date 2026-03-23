export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const URL = 'https://jahtuebykoledutqhzfx.supabase.co';
  const AK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODYzMjIsImV4cCI6MjA4MTc2MjMyMn0.ImYkXha0Ys1OB6r97IcOVoMwHLj6-VXHZu-MfUrPnv4';
  
  // Get service key from request or env
  const sk = (req.body && req.body.sk) || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
  
  const results = {
    timestamp: new Date().toISOString(),
    env_vars_with_supabase: Object.keys(process.env).filter(k => k.toLowerCase().includes('supabase')),
    service_key_found: !!sk,
    service_key_source: sk ? (req.body && req.body.sk ? 'from_request' : 'from_env') : 'NOT_FOUND',
    service_key_prefix: sk ? sk.substring(0, 30) + '...' : 'NONE',
    tests: {},
  };

  // Test 1: Can we reach Supabase at all?
  try {
    const r = await fetch(`${URL}/rest/v1/`, { headers: { 'apikey': AK } });
    results.tests.supabase_reachable = { status: r.status, ok: r.ok };
  } catch (e) {
    results.tests.supabase_reachable = { error: e.message };
  }

  // Test 2: Read registrations with anon key
  try {
    const r = await fetch(`${URL}/rest/v1/registrations_12th_learners?select=id,full_name,phone&limit=5`, {
      headers: { 'apikey': AK, 'Authorization': `Bearer ${AK}` },
    });
    const data = await r.json();
    results.tests.registrations_anon = { status: r.status, count: Array.isArray(data) ? data.length : 0, data: Array.isArray(data) ? data : data };
  } catch (e) {
    results.tests.registrations_anon = { error: e.message };
  }

  // Test 3: Read registrations with service key
  if (sk) {
    try {
      const r = await fetch(`${URL}/rest/v1/registrations_12th_learners?select=id,full_name,phone&limit=5`, {
        headers: { 'apikey': sk, 'Authorization': `Bearer ${sk}` },
      });
      const data = await r.json();
      results.tests.registrations_service = { status: r.status, count: Array.isArray(data) ? data.length : 0, data: Array.isArray(data) ? data : data };
    } catch (e) {
      results.tests.registrations_service = { error: e.message };
    }
  }

  // Test 4: Read auth users with service key
  if (sk) {
    try {
      const r = await fetch(`${URL}/auth/v1/admin/users?page=1&per_page=10`, {
        headers: { 'Authorization': `Bearer ${sk}`, 'apikey': sk },
      });
      const data = await r.json();
      const users = data.users || [];
      results.tests.auth_users = {
        status: r.status,
        count: users.length,
        users: users.map(u => ({
          id: u.id,
          email: u.email,
          name: u.user_metadata?.display_name || u.user_metadata?.full_name || '',
          phone: u.user_metadata?.phone || '',
          created: u.created_at,
        })),
      };
    } catch (e) {
      results.tests.auth_users = { error: e.message };
    }
  }

  // Test 5: Read profiles with anon key
  try {
    const r = await fetch(`${URL}/rest/v1/profiles?select=user_id,display_name,bio&limit=5`, {
      headers: { 'apikey': AK, 'Authorization': `Bearer ${AK}` },
    });
    const data = await r.json();
    results.tests.profiles_anon = { status: r.status, count: Array.isArray(data) ? data.length : 0 };
  } catch (e) {
    results.tests.profiles_anon = { error: e.message };
  }

  return res.status(200).json(results);
}
