/**
 * AppGate — a simple password screen shown before the app loads.
 *
 * HONEST CAVEAT:
 * This is a SOFT gate, not real security. The expected password is
 * shipped in the frontend bundle, so anyone with browser DevTools can
 * find it. It works for keeping casual visitors out during private-
 * preview / pre-launch phases, not for protecting sensitive data.
 *
 * Behaviour:
 *   - Checks localStorage on mount for a valid unlock flag.
 *   - If found, renders children immediately.
 *   - If not, shows a centred password screen with brand colours.
 *   - On correct password, stores an unlock flag valid for 30 days.
 *   - Wrong password shows an error and shakes the input briefly.
 *
 * To change the password, edit GATE_PASSWORD below. To revoke all
 * existing unlocks (force everyone to re-enter), bump GATE_VERSION.
 */

import { useEffect, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const GATE_PASSWORD = '739727';
const GATE_VERSION = 'v1'; // bump to invalidate existing unlocks
const GATE_KEY = `vazhikatti.gate.${GATE_VERSION}`;
const GATE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const isUnlocked = (): boolean => {
  try {
    const raw = localStorage.getItem(GATE_KEY);
    if (!raw) return false;
    const { unlockedAt } = JSON.parse(raw) as { unlockedAt: number };
    if (!unlockedAt) return false;
    if (Date.now() - unlockedAt > GATE_TTL_MS) {
      localStorage.removeItem(GATE_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const recordUnlock = () => {
  try {
    localStorage.setItem(GATE_KEY, JSON.stringify({ unlockedAt: Date.now() }));
  } catch {
    /* ignore quota / private mode errors */
  }
};

export const AppGate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setUnlocked(isUnlocked());
    setChecked(true);
  }, []);

  // Don't render anything until we've checked localStorage — avoids a
  // flash of the password screen for users who are already unlocked.
  if (!checked) return null;

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === GATE_PASSWORD) {
      recordUnlock();
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
      {/* Subtle background pattern for visual interest */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className={`w-full max-w-sm relative z-10 ${shake ? 'animate-shake' : ''}`}>
        <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-8">
          {/* Brand mark */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg mb-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              VAZHIKATTI
            </h1>
            <p className="text-[11px] text-gray-500 tracking-[0.15em] uppercase font-bold mt-0.5">
              வழிகாட்டி
            </p>
          </div>

          {/* Prompt */}
          <p className="text-sm text-gray-700 text-center mb-5 leading-relaxed">
            This is a private preview. Enter the access code to continue.
          </p>

          {/* Password form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Access code"
                className={`w-full h-12 px-4 pr-11 rounded-xl border-2 text-base font-semibold tracking-widest text-center transition-colors focus:outline-none ${
                  error
                    ? 'border-rose-400 bg-rose-50 text-rose-900'
                    : 'border-gray-200 focus:border-emerald-500 bg-white text-gray-900'
                }`}
                aria-label="Access code"
                aria-invalid={error}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Hide code' : 'Show code'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-[12px] text-rose-600 text-center font-medium">
                Incorrect code. Try again.
              </p>
            )}

            <button
              type="submit"
              disabled={input.length === 0}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-base shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Unlock
            </button>
          </form>

          {/* Footer */}
          <p className="text-[10px] text-gray-400 text-center mt-5 leading-relaxed">
            Authorised users only.<br />
            Contact the VAZHIKATTI team if you need access.
          </p>
        </div>
      </div>

      {/* Inline keyframes for the shake animation on wrong password */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};
