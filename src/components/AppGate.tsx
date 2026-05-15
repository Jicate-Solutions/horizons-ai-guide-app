/**
 * AppGate — POPUP/MODAL password screen that appears OVER the landing
 * page every time the app is opened. No "remember me", no skip — every
 * fresh page load shows the popup until the access code is entered.
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
 *     white popup asks for the access code on every page load.
 *   - On correct code, the popup is removed for THIS browsing session
 *     only — reloading the page or revisiting the URL will show the
 *     popup again.
 *   - Wrong code shakes the input and shows an inline error.
 *   - Body scroll is locked while the popup is up.
 */

import { useEffect, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const GATE_PASSWORD = '739727';

// One-time cleanup: previous versions of this gate stored a 30-day
// "remember me" flag in localStorage under these keys. Now that every
// page load should ask for the password, those stale flags must be
// removed or returning users will silently skip the popup.
const OLD_GATE_KEYS = [
  'vazhikatti.gate.v1',
  'vazhikatti.gate.v2',
];

const purgeOldGateKeys = () => {
  try {
    for (const k of OLD_GATE_KEYS) localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
};

export const AppGate = ({ children }: { children: React.ReactNode }) => {
  // Wipe any stale "remember me" flags from earlier versions on mount.
  // Synchronous module-load purge ensures it happens before the first
  // render, so there's no flash of unlocked-state.
  purgeOldGateKeys();

  // Always start locked. No persistence — every fresh page load shows
  // the popup. (The component lives in memory while the user is on the
  // site, so it only re-prompts on reload / revisit.)
  const [locked, setLocked] = useState<boolean>(true);
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  // Lock body scroll while popup is up; restore when unlocked.
  useEffect(() => {
    if (locked) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [locked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === GATE_PASSWORD) {
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

      {/* Modal overlay — visible until the user enters the correct code */}
      {locked && (
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
