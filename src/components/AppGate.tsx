/**
 * AppGate — POPUP/MODAL password screen that appears OVER the landing
 * page, not in place of it. The landing page renders behind the modal
 * (blurred + dimmed), just like a popup on a college website.
 *
 * HONEST CAVEAT:
 * This is a SOFT gate, not real security. The expected password lives
 * in the frontend bundle so anyone with browser DevTools can read it.
 * Works for keeping casual visitors out during private-preview, not
 * for protecting sensitive data.
 *
 * Behaviour:
 *   - Renders children (the rest of the app) immediately, always.
 *   - On top of the children, a blurred/dimmed backdrop + centred
 *     white popup asks for the access code IF the user hasn't unlocked.
 *   - On correct code, the popup is removed and the unlock is
 *     remembered in localStorage for 30 days.
 *   - Wrong code shakes the input and shows an inline error.
 *   - Body scroll is locked while the popup is up.
 */

import { useEffect, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const GATE_PASSWORD = '739727';
const GATE_VERSION = 'v1';
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
    /* ignore */
  }
};

export const AppGate = ({ children }: { children: React.ReactNode }) => {
  const [locked, setLocked] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setLocked(!isUnlocked());
    setChecked(true);
  }, []);

  // Lock body scroll while popup is up; restore when unlocked.
  useEffect(() => {
    if (locked && checked) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [locked, checked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === GATE_PASSWORD) {
      recordUnlock();
      setLocked(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <>
      {/* App renders always — sits behind the modal */}
      {children}

      {/* Modal overlay — only while locked, after the initial check */}
      {checked && locked && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
        >
          {/* Dimmed + blurred backdrop showing the landing page through */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Centred popup card */}
          <div
            className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-7 ${
              shake ? 'animate-gate-shake' : ''
            }`}
          >
            {/* Brand header */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md mb-3">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h1 id="gate-title" className="text-lg font-black text-gray-900 tracking-tight">
                VAZHIKATTI
              </h1>
              <p className="text-[10px] text-gray-500 tracking-[0.15em] uppercase font-bold mt-0.5">
                வழிகாட்டி
              </p>
            </div>

            <p className="text-sm text-gray-700 text-center mb-4 leading-relaxed">
              Please enter the access code to continue.
            </p>

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
                className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-base shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                Unlock
              </button>
            </form>
          </div>

          {/* Shake keyframes for wrong-password feedback */}
          <style>{`
            @keyframes gate-shake-kf {
              0%, 100% { transform: translateX(0); }
              20%, 60% { transform: translateX(-6px); }
              40%, 80% { transform: translateX(6px); }
            }
            .animate-gate-shake { animation: gate-shake-kf 0.4s ease-in-out; }
          `}</style>
        </div>
      )}
    </>
  );
};
