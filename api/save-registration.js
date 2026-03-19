export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(200).json({ success: false, message: 'Service key not configured' });
  }

  const { user_id, full_name, phone, email, school_name, stream, pass_out_year, district, career_interest } = req.body;

  if (!full_name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone required' });
  }

  try {
    // Save to registrations_12th_learners using service role (bypasses RLS)
    const regResponse = await fetch(`${SUPABASE_URL}/rest/v1/registrations_12th_learners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        user_id: user_id || null,
        full_name,
        phone,
        email: email || null,
        school_name: school_name || null,
        stream: stream || null,
        preferred_course: pass_out_year || null,
        preferred_institution: district || null,
        career_interests: career_interest ? [career_interest] : [],
      }),
    });

    if (!regResponse.ok) {
      const errText = await regResponse.text();
      console.error('[save-registration] Registration insert failed:', regResponse.status, errText);
      
      // If duplicate, that's OK
      if (errText.includes('duplicate') || errText.includes('unique')) {
        return res.status(200).json({ success: true, message: 'Already registered' });
      }
      return res.status(200).json({ success: false, message: 'Insert failed: ' + errText });
    }

    // Also save to profiles as backup
    try {
      const bioData = [phone, email || '', school_name || '', stream || '', pass_out_year || '', district || '', career_interest || ''].join(' | ');
      
      await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          user_id: user_id || '00000000-0000-0000-0000-000000000000',
          display_name: full_name,
          bio: bioData,
        }),
      });
    } catch (profileErr) {
      console.warn('[save-registration] Profile backup failed:', profileErr);
    }

    return res.status(200).json({ success: true, message: 'Registration saved' });

  } catch (err) {
    console.error('[save-registration] Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
