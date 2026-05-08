// Simple tracker progress API — stores in Supabase using existing anon key
// No new tables needed — uses user_metadata via Supabase Auth

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const SUPABASE_URL = 'https://jahtuebykoledutqhzfx.supabase.co';
  const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxODA1OTcsImV4cCI6MjA1NDc1NjU5N30.JG0bGSbGvSMXaZWqsXQB3DPyYLuGpA4c4FbFLNiXa9k';

  // Get user token from request
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No auth token' });
  }
  const token = authHeader.replace('Bearer ', '');

  if (req.method === 'POST') {
    // Save progress
    const { trackerData } = req.body || {};
    if (!trackerData) return res.status(400).json({ error: 'No data' });

    try {
      // Save to user metadata (works with existing Supabase setup)
      const updateRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: { tracker_progress: trackerData, tracker_updated: new Date().toISOString() }
        }),
      });

      if (updateRes.ok) {
        return res.status(200).json({ success: true });
      } else {
        const err = await updateRes.json();
        return res.status(500).json({ error: err });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'GET') {
    // Load progress
    try {
      const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (userRes.ok) {
        const user = await userRes.json();
        const trackerData = user?.user_metadata?.tracker_progress || {};
        return res.status(200).json({ success: true, trackerData });
      } else {
        return res.status(500).json({ error: 'Failed to load' });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
