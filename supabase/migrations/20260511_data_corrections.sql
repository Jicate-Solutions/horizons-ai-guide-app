-- ═══════════════════════════════════════════════════════════
-- VAZHIKATTI: data_corrections table
-- Backs the ReportIncorrectInfo component / DataDisclaimer.
-- Stores user-reported corrections to public listings
-- (colleges, exams, courses, jobs, etc).
-- Created: 2026-05-11
-- ═══════════════════════════════════════════════════════════

-- 1. Create the table -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.data_corrections (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- What is being reported
  entity_type       TEXT NOT NULL,          -- 'college' | 'course' | 'exam' | 'job' | 'other'
  entity_id         TEXT,                   -- internal id/slug of the record (nullable for free-form reports)
  entity_name       TEXT,                   -- human-readable name shown to admin during triage
  field_name        TEXT,                   -- which field is wrong (e.g. 'cutoff', 'annualFee')
  current_value     TEXT,                   -- what the site currently shows
  suggested_value   TEXT,                   -- what the reporter says is correct
  description       TEXT NOT NULL,          -- free-text description of the issue
  source_url        TEXT,                   -- where the reporter saw the correct info (e.g. official site)
  -- Who reported
  reporter_email    TEXT,                   -- optional contact for follow-up
  reporter_user_id  UUID,                   -- set if the reporter is signed in
  -- Context
  page_url          TEXT,                   -- URL on our site where the report was triggered
  user_agent        TEXT,                   -- browser UA for spam/abuse triage
  -- Admin workflow
  status            TEXT NOT NULL DEFAULT 'open',  -- 'open' | 'reviewing' | 'resolved' | 'rejected'
  admin_notes       TEXT,
  resolved_at       TIMESTAMPTZ,
  resolved_by       UUID,
  -- Timestamps
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for admin triage ----------------------------------------------
CREATE INDEX IF NOT EXISTS idx_data_corrections_status      ON public.data_corrections(status);
CREATE INDEX IF NOT EXISTS idx_data_corrections_entity      ON public.data_corrections(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_data_corrections_created_at  ON public.data_corrections(created_at DESC);

-- 3. Auto-update updated_at -------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_data_corrections_updated_at ON public.data_corrections;
CREATE TRIGGER trg_data_corrections_updated_at
  BEFORE UPDATE ON public.data_corrections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Row Level Security -----------------------------------------------------
ALTER TABLE public.data_corrections ENABLE ROW LEVEL SECURITY;

-- 4a. Anyone (anon or signed-in) can submit a correction.
--     They cannot read, update, or delete reports.
DROP POLICY IF EXISTS "Anyone can submit a correction" ON public.data_corrections;
CREATE POLICY "Anyone can submit a correction"
  ON public.data_corrections
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4b. A signed-in user can see their own submissions.
DROP POLICY IF EXISTS "Users can see their own reports" ON public.data_corrections;
CREATE POLICY "Users can see their own reports"
  ON public.data_corrections
  FOR SELECT
  TO authenticated
  USING (reporter_user_id = auth.uid());

-- 4c. Admins (via profiles.role) can read/update all reports.
--     Falls back gracefully if a 'profiles' table with a 'role' column does
--     not exist - the EXISTS check simply returns false.
DROP POLICY IF EXISTS "Admins can view all corrections" ON public.data_corrections;
CREATE POLICY "Admins can view all corrections"
  ON public.data_corrections
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND COALESCE(p.role, '') IN ('admin', 'superadmin')
    )
  );

DROP POLICY IF EXISTS "Admins can update corrections" ON public.data_corrections;
CREATE POLICY "Admins can update corrections"
  ON public.data_corrections
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND COALESCE(p.role, '') IN ('admin', 'superadmin')
    )
  );

-- 5. Documentation ----------------------------------------------------------
COMMENT ON TABLE  public.data_corrections IS
  'User-submitted reports of incorrect or outdated data in public listings (colleges, exams, courses, jobs). Captured by the ReportIncorrectInfo component.';
COMMENT ON COLUMN public.data_corrections.entity_type      IS 'Kind of record being reported (college, course, exam, job, other).';
COMMENT ON COLUMN public.data_corrections.entity_id        IS 'Stable id/slug of the specific record, when available.';
COMMENT ON COLUMN public.data_corrections.field_name       IS 'Which field the report is about (e.g. cutoff, annualFee).';
COMMENT ON COLUMN public.data_corrections.status           IS 'Admin triage status: open | reviewing | resolved | rejected.';
