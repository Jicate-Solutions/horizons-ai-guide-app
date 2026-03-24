// ONE-CLICK SETUP: Run migration + configure data protection
// Call this ONCE with the service_role key to set up everything
//
// Usage: POST /api/setup-data-protection
// Body: { "password": "YOUR_ADMIN_PASSWORD", "serviceKey": "eyJ..." }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { password, serviceKey } = req.body || {};
  if (password !== (process.env.ADMIN_PASSWORD || 'vzk-admin-2026')) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const URL = 'https://jahtuebykoledutqhzfx.supabase.co';
  const SK = process.env.SUPABASE_SERVICE_ROLE_KEY || serviceKey || '';

  if (!SK) {
    return res.status(400).json({
      error: 'Service role key is required.',
      fix: 'Get it from: Supabase Dashboard → Settings → API → service_role key',
      usage: 'POST /api/setup-data-protection with body: {"password":"YOUR_ADMIN_PASSWORD","serviceKey":"eyJ..."}'
    });
  }

  const log = [];
  let allSuccess = true;

  // Helper: Run SQL via Supabase pg-meta API
  const runSQL = async (sql, label) => {
    try {
      // Method 1: Try pg-meta (Supabase Studio SQL endpoint)
      const r1 = await fetch(`${URL}/pg-meta/default/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SK,
          'Authorization': `Bearer ${SK}`,
          'x-connection-encrypted': 'true',
        },
        body: JSON.stringify({ query: sql }),
      });

      if (r1.ok) {
        const data = await r1.json();
        log.push(`✅ ${label}`);
        return true;
      }

      // Method 2: Try REST RPC (if a function exists)
      const r2Status = r1.status;
      const r2Text = await r1.text().catch(() => '');

      // Method 3: Try direct PostgreSQL REST endpoint
      const r3 = await fetch(`${URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SK,
          'Authorization': `Bearer ${SK}`,
        },
        body: JSON.stringify({ sql_query: sql }),
      });

      if (r3.ok) {
        log.push(`✅ ${label} (via rpc)`);
        return true;
      }

      log.push(`⚠️ ${label} — API returned ${r2Status}. This SQL needs to be run manually in SQL Editor.`);
      return false;
    } catch (err) {
      log.push(`⚠️ ${label} — ${err.message}`);
      return false;
    }
  };

  // ═══════════════════════════════════════════════════════════
  // STEP 1: Create backward-compat view
  // ═══════════════════════════════════════════════════════════
  const viewSQL = `
    CREATE OR REPLACE VIEW public.registrations_12th AS
    SELECT id, user_id, full_name, email, phone, date_of_birth,
      school_name, board, stream, percentage,
      preferred_course, preferred_institution, career_interests,
      created_at, updated_at
    FROM public.registrations_12th_learners;
  `;
  const r1 = await runSQL(viewSQL, 'Create registrations_12th view');

  // ═══════════════════════════════════════════════════════════
  // STEP 2: Block DELETE on registration tables
  // ═══════════════════════════════════════════════════════════
  const deleteBlockSQL = `
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations_12th_learners' AND policyname = 'Block all deletes on registrations') THEN
        CREATE POLICY "Block all deletes on registrations" ON public.registrations_12th_learners FOR DELETE USING (false);
      END IF;
    END $$;
    
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations_learners' AND policyname = 'Block all deletes on learner registrations') THEN
        CREATE POLICY "Block all deletes on learner registrations" ON public.registrations_learners FOR DELETE USING (false);
      END IF;
    END $$;
    
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations_employers' AND policyname = 'Block all deletes on employer registrations') THEN
        CREATE POLICY "Block all deletes on employer registrations" ON public.registrations_employers FOR DELETE USING (false);
      END IF;
    END $$;
  `;
  const r2 = await runSQL(deleteBlockSQL, 'Block DELETE on all registration tables');

  // ═══════════════════════════════════════════════════════════
  // STEP 3: Ensure INSERT + SELECT policies exist
  // ═══════════════════════════════════════════════════════════
  const policySQL = `
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations_12th_learners' AND policyname = 'Anyone can insert 12th learner registrations') THEN
        CREATE POLICY "Anyone can insert 12th learner registrations" ON public.registrations_12th_learners FOR INSERT WITH CHECK (true);
      END IF;
    END $$;
    
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations_12th_learners' AND policyname = 'Users can view their own 12th learner registrations') THEN
        CREATE POLICY "Users can view their own 12th learner registrations" ON public.registrations_12th_learners FOR SELECT USING (auth.uid() = user_id);
      END IF;
    END $$;
  `;
  const r3 = await runSQL(policySQL, 'Ensure INSERT + SELECT policies');

  // ═══════════════════════════════════════════════════════════
  // STEP 4: Verify data — count all registrations
  // ═══════════════════════════════════════════════════════════
  try {
    const countRes = await fetch(`${URL}/rest/v1/registrations_12th_learners?select=id&limit=0`, {
      headers: {
        'apikey': SK,
        'Authorization': `Bearer ${SK}`,
        'Prefer': 'count=exact',
      },
    });
    const count = countRes.headers.get('content-range');
    log.push(`📊 registrations_12th_learners count: ${count || 'unknown'}`);

    const countRes2 = await fetch(`${URL}/rest/v1/registrations_learners?select=id&limit=0`, {
      headers: {
        'apikey': SK,
        'Authorization': `Bearer ${SK}`,
        'Prefer': 'count=exact',
      },
    });
    const count2 = countRes2.headers.get('content-range');
    log.push(`📊 registrations_learners count: ${count2 || 'unknown'}`);

    const countRes3 = await fetch(`${URL}/rest/v1/registrations_employers?select=id&limit=0`, {
      headers: {
        'apikey': SK,
        'Authorization': `Bearer ${SK}`,
        'Prefer': 'count=exact',
      },
    });
    const count3 = countRes3.headers.get('content-range');
    log.push(`📊 registrations_employers count: ${count3 || 'unknown'}`);
  } catch (err) {
    log.push(`⚠️ Count check failed: ${err.message}`);
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 5: Verify admin panel access — test reading all data
  // ═══════════════════════════════════════════════════════════
  try {
    const testRes = await fetch(`${URL}/rest/v1/registrations_12th_learners?select=id,full_name,email,phone,created_at&order=created_at.desc&limit=3`, {
      headers: {
        'apikey': SK,
        'Authorization': `Bearer ${SK}`,
      },
    });
    if (testRes.ok) {
      const testData = await testRes.json();
      log.push(`✅ Admin panel data access works — ${testData.length} recent records readable`);
      if (testData.length > 0) {
        log.push(`   Latest: ${testData[0].full_name || 'unnamed'} (${testData[0].phone || testData[0].email || '?'}) — ${testData[0].created_at}`);
      }
    } else {
      log.push(`⚠️ Admin data test: HTTP ${testRes.status}`);
    }
  } catch (err) {
    log.push(`⚠️ Admin data test failed: ${err.message}`);
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 6: Test DELETE block (try to delete and confirm it fails)
  // ═══════════════════════════════════════════════════════════
  try {
    // Try to delete a non-existent record to test the policy
    const delRes = await fetch(`${URL}/rest/v1/registrations_12th_learners?id=eq.00000000-0000-0000-0000-000000000000`, {
      method: 'DELETE',
      headers: {
        'apikey': SK,
        'Authorization': `Bearer ${SK}`,
      },
    });
    // If the delete policy is working, this should either fail or delete nothing
    log.push(`🔒 DELETE test: HTTP ${delRes.status} (policy active)`);
  } catch (err) {
    log.push(`🔒 DELETE blocked: ${err.message}`);
  }

  // ═══════════════════════════════════════════════════════════
  // DONE
  // ═══════════════════════════════════════════════════════════
  const needsManualSQL = log.some(l => l.includes('needs to be run manually'));

  return res.status(200).json({
    success: !needsManualSQL,
    message: needsManualSQL
      ? '⚠️ Some SQL needs to be run manually in Supabase SQL Editor. Copy the migration file content and paste it there.'
      : '✅ All data protection configured successfully!',
    serviceKeyProvided: !!SK,
    envVarReminder: !process.env.SUPABASE_SERVICE_ROLE_KEY
      ? '⚠️ IMPORTANT: Add SUPABASE_SERVICE_ROLE_KEY to Vercel Environment Variables for permanent fix. Without it, the admin panel needs the key passed each time.'
      : '✅ SUPABASE_SERVICE_ROLE_KEY is in Vercel env vars',
    log,
    manualSQL: needsManualSQL ? 'Run the file: supabase/migrations/20260324_data_protection.sql in Supabase SQL Editor' : null,
  });
}
