import { useState } from 'react';
import { Shield, Copy, CheckCircle, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SETUP_SQL = `-- VAZHIKATTI ONE-TIME SETUP (paste this entire block and click RUN)
-- This makes the admin panel work + protects all learner data

-- 1. Let the admin user read ALL registrations
CREATE POLICY IF NOT EXISTS "Public read for admin API" 
ON public.registrations_12th_learners FOR SELECT 
USING (
  (SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@vazhikatti.app'
  OR auth.uid() = user_id
);

-- 2. Same for learner registrations
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='registrations_learners' AND policyname='Admin and self read learners') THEN
    CREATE POLICY "Admin and self read learners" ON public.registrations_learners FOR SELECT USING (
      (SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@vazhikatti.app'
      OR auth.uid() = user_id
    );
  END IF;
END $$;

-- 3. Same for employer registrations  
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='registrations_employers' AND policyname='Admin and self read employers') THEN
    CREATE POLICY "Admin and self read employers" ON public.registrations_employers FOR SELECT USING (
      (SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@vazhikatti.app'
      OR auth.uid() = user_id  
    );
  END IF;
END $$;

-- 4. Block DELETE on all registration tables (protect data forever)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='registrations_12th_learners' AND policyname='Block all deletes on registrations') THEN
    CREATE POLICY "Block all deletes on registrations" ON public.registrations_12th_learners FOR DELETE USING (false);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='registrations_learners' AND policyname='Block deletes learners') THEN
    CREATE POLICY "Block deletes learners" ON public.registrations_learners FOR DELETE USING (false);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='registrations_employers' AND policyname='Block deletes employers') THEN
    CREATE POLICY "Block deletes employers" ON public.registrations_employers FOR DELETE USING (false);
  END IF;
END $$;

-- 5. Backward-compatible view
CREATE OR REPLACE VIEW public.registrations_12th AS
SELECT id, user_id, full_name, email, phone, date_of_birth,
  school_name, board, stream, percentage,
  preferred_course, preferred_institution, career_interests,
  created_at, updated_at
FROM public.registrations_12th_learners;

-- DONE! Close this tab and go to /admin/monitor
SELECT 'SUCCESS: Admin panel + data protection configured!' as result;`;

const AdminSetupPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(SETUP_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">VAZHIKATTI Setup</h1>
          <p className="text-sm text-gray-400 mt-1">One-time admin panel activation (2 steps)</p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border ${step === 1 ? 'border-emerald-500/50' : 'border-white/10'} p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ${step > 1 ? 'bg-emerald-500 text-white' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Copy the setup code</h2>
                <p className="text-xs text-gray-400">Click the button below</p>
              </div>
            </div>
            
            <button
              onClick={handleCopy}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25'
              }`}
            >
              {copied ? (
                <><CheckCircle className="w-5 h-5" /> Copied! Now do Step 2 ↓</>
              ) : (
                <><Copy className="w-5 h-5" /> Copy Setup Code</>
              )}
            </button>
          </div>

          {/* Step 2 */}
          <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border ${step === 2 ? 'border-amber-500/50 animate-pulse' : 'border-white/10'} p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ${step > 2 ? 'bg-emerald-500 text-white' : step === 2 ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-gray-500'}`}>
                2
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Paste & Run in Supabase</h2>
                <p className="text-xs text-gray-400">Click the link → Paste → Click "RUN"</p>
              </div>
            </div>

            <a
              href="https://supabase.com/dashboard/project/jahtuebykoledutqhzfx/sql/new"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                step >= 2
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ExternalLink className="w-5 h-5" />
              Open Supabase SQL Editor
              <ArrowRight className="w-4 h-4" />
            </a>

            {step >= 2 && (
              <div className="mt-4 bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                <p className="text-xs text-amber-200 leading-relaxed">
                  <strong className="text-amber-100">After clicking:</strong><br />
                  1. The SQL Editor opens<br />
                  2. Click inside the editor area<br />
                  3. Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Ctrl+V</kbd> (or <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Cmd+V</kbd> on Mac) to paste<br />
                  4. Click the green <strong>"RUN"</strong> button<br />
                  5. You should see "SUCCESS" message<br />
                  6. Come back here and click "Done" below
                </p>
              </div>
            )}
          </div>

          {/* Done button */}
          {step >= 2 && (
            <button
              onClick={() => { setStep(3); navigate('/admin/monitor'); }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              Done! Take me to Admin Panel
            </button>
          )}
        </div>

        {/* Back link */}
        <button onClick={() => navigate('/')} className="w-full mt-6 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to App
        </button>
      </div>
    </div>
  );
};

export default AdminSetupPage;
