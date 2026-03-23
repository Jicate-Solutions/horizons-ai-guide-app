export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://jahtuebykoledutqhzfx.supabase.co';
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHR1ZWJ5a29sZWR1dHFoemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODYzMjIsImV4cCI6MjA4MTc2MjMyMn0.ImYkXha0Ys1OB6r97IcOVoMwHLj6-VXHZu-MfUrPnv4';
  
  // Use service key if available, otherwise anon
  const apiKey = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;

  const { user_id, full_name, phone, email, school_name, stream, pass_out_year, district, career_interest } = req.body;

  if (!full_name && !phone) {
    return res.status(400).json({ success: false, message: 'Name or phone required' });
  }

  const results = { registration: null, profile: null, errors: [] };

  // Save to registrations_12th_learners
  try {
    const regResponse = await fetch(`${SUPABASE_URL}/rest/v1/registrations_12th_learners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        user_id: user_id || null,
        full_name: full_name || phone || 'Unknown',
        phone: phone || null,
        email: email || null,
        school_name: school_name || null,
        stream: stream || null,
        preferred_course: pass_out_year || null,
        preferred_institution: district || null,
        career_interests: career_interest ? [career_interest] : [],
      }),
    });

    if (regResponse.ok || regResponse.status === 201) {
      results.registration = 'saved';
    } else {
      const errText = await regResponse.text();
      results.errors.push('registration: ' + regResponse.status + ' ' + errText.substring(0, 200));
      // Duplicate is OK
      if (errText.includes('duplicate') || errText.includes('unique')) {
        results.registration = 'already_exists';
      }
    }
  } catch (e) {
    results.errors.push('registration exception: ' + e.message);
  }

  // Save to profiles as backup
  try {
    const bioData = [phone || '', email || '', school_name || '', stream || '', pass_out_year || '', district || '', career_interest || ''].join(' | ');
    const profResponse = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        user_id: user_id || '00000000-0000-0000-0000-' + Date.now().toString().padStart(12, '0'),
        display_name: full_name || phone || 'Unknown',
        bio: bioData,
      }),
    });
    results.profile = profResponse.ok ? 'saved' : 'failed';
  } catch (e) {
    results.errors.push('profile: ' + e.message);
  }

  return res.status(200).json({ 
    success: results.registration === 'saved' || results.registration === 'already_exists' || results.profile === 'saved',
    results,
    keyUsed: SUPABASE_SERVICE_KEY ? 'service_role' : 'anon',
  });
}
