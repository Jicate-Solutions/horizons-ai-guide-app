-- ═══════════════════════════════════════════════════════════
-- VAZHIKATTI: Data Protection & Backward Compatibility
-- ═══════════════════════════════════════════════════════════

-- 1. Create a VIEW for backward compatibility
-- Some code references 'registrations_12th' instead of 'registrations_12th_learners'
CREATE OR REPLACE VIEW public.registrations_12th AS
SELECT 
  id, user_id, full_name, email, phone, date_of_birth,
  school_name, board, stream, percentage,
  preferred_course, preferred_institution, career_interests,
  created_at, updated_at
FROM public.registrations_12th_learners;

-- 2. Ensure INSERT policy exists (anyone can register)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations_12th_learners' 
    AND policyname = 'Anyone can insert 12th learner registrations'
  ) THEN
    CREATE POLICY "Anyone can insert 12th learner registrations"
    ON public.registrations_12th_learners
    FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- 3. Ensure users can view their own registrations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations_12th_learners' 
    AND policyname = 'Users can view their own 12th learner registrations'
  ) THEN
    CREATE POLICY "Users can view their own 12th learner registrations"
    ON public.registrations_12th_learners
    FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

-- 4. BLOCK DELETE operations on registration tables (protect data permanently)
-- Revoke DELETE from all roles except service_role (which is used for admin operations)
DO $$
BEGIN
  -- Create a restrictive DELETE policy that blocks normal users
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations_12th_learners' 
    AND policyname = 'Block all deletes on registrations'
  ) THEN
    CREATE POLICY "Block all deletes on registrations"
    ON public.registrations_12th_learners
    FOR DELETE USING (false);
  END IF;
END $$;

-- 5. Same protection for learners table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations_learners' 
    AND policyname = 'Block all deletes on learner registrations'
  ) THEN
    CREATE POLICY "Block all deletes on learner registrations"
    ON public.registrations_learners
    FOR DELETE USING (false);
  END IF;
END $$;

-- 6. Same protection for employer table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations_employers' 
    AND policyname = 'Block all deletes on employer registrations'
  ) THEN
    CREATE POLICY "Block all deletes on employer registrations"
    ON public.registrations_employers
    FOR DELETE USING (false);
  END IF;
END $$;

-- 7. Ensure admin can read ALL registrations (for admin panel)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations_12th_learners' 
    AND policyname = 'Admins can view all 12th learner registrations'
  ) THEN
    CREATE POLICY "Admins can view all 12th learner registrations"
    ON public.registrations_12th_learners
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
END $$;
