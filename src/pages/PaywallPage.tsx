import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePayment } from '@/hooks/usePayment';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Lock, Star, BookOpen, Briefcase, GraduationCap, MessageCircle, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window { Razorpay: any; }
}

const RAZORPAY_KEY = 'rzp_test_Sep5DjakMvzmcD';
const AMOUNT = 99;

const features = [
  { icon: MessageCircle, text: 'AI Career Chat — Ask anything, get instant answers', color: 'text-blue-500' },
  { icon: GraduationCap, text: 'Full Career Assessment — Discover your best career path', color: 'text-purple-500' },
  { icon: BookOpen, text: 'Government Exam Prep — TNPSC, SSC, Railway, Banking', color: 'text-emerald-500' },
  { icon: TrendingUp, text: 'College & Cutoff Predictor — Know which college you can get', color: 'text-orange-500' },
  { icon: Briefcase, text: 'Job Portal — Find jobs that match your skills', color: 'text-rose-500' },
  { icon: Star, text: 'Study Guides & PYQ Practice — Prepare smarter', color: 'text-amber-500' },
];

const PaywallPage = () => {
  const { user } = useAuth();
  const { refreshPayment } = usePayment();
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadRazorpay = () => new Promise<boolean>(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePayment = async () => {
    if (!user) { navigate('/auth'); return; }
    setPaying(true);

    const loaded = await loadRazorpay();
    if (!loaded) { alert('Payment service failed to load. Please try again.'); setPaying(false); return; }

    const options = {
      key: RAZORPAY_KEY,
      amount: AMOUNT * 100, // paise
      currency: 'INR',
      name: 'VAZHIKATTI',
      description: 'Full Access — Career Guidance Platform',
      image: 'https://horizons-ai-guide-app.vercel.app/favicon.ico',
      prefill: { email: user.email || '' },
      theme: { color: '#16a34a' },
      handler: async (response: any) => {
        try {
          // Save to localStorage immediately (works without Supabase)
          const localKey = `vzk_paid_${user.id}`;
          localStorage.setItem(localKey, 'true');

          // Also try saving to Supabase if available
          try {
            await (supabase as any).from('user_payments').insert({
              user_id: user.id,
              payment_id: response.razorpay_payment_id,
              amount: AMOUNT,
              status: 'paid',
            });
          } catch { /* Supabase not available, localStorage is enough */ }

          setSuccess(true);
          refreshPayment();
          setTimeout(() => navigate('/student-dashboard'), 2000);
        } catch {
          alert('Payment recorded. Please refresh the page.');
        }
      },
      modal: { ondismiss: () => setPaying(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setPaying(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful! 🎉</h2>
          <p className="text-gray-600">Welcome to VAZHIKATTI. Taking you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 font-serif font-bold text-2xl text-white shadow-xl" style={{backgroundColor: '#ea580c'}}>
            வ
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">VAZHIKATTI</h1>
          <p className="text-emerald-300 text-sm">வழிகாட்டி — Your Career Guide</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Top banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 text-center">
            <p className="text-emerald-100 text-xs font-medium mb-1">ONE-TIME PAYMENT • LIFETIME ACCESS</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-white/60 text-lg line-through">₹499</span>
              <span className="text-4xl font-black text-white">₹99</span>
            </div>
            <p className="text-emerald-200 text-xs mt-1">Less than the cost of a textbook</p>
          </div>

          {/* Features */}
          <div className="px-6 py-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What you get:</p>
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <f.icon className={`w-4 h-4 mt-0.5 shrink-0 ${f.color}`} />
                  <p className="text-sm text-gray-700">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pay button */}
          <div className="px-6 pb-6">
            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-2xl text-base transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {paying ? (
                <span>Opening Payment...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Unlock Full Access — ₹99
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-xs text-gray-400">Secure payment via Razorpay • UPI, Cards, NetBanking accepted</p>
            </div>

            {!user && (
              <p className="text-center text-xs text-gray-500 mt-3">
                Already have an account?{' '}
                <button onClick={() => navigate('/auth')} className="text-emerald-600 font-semibold underline">
                  Sign in first
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Trust note */}
        <p className="text-center text-emerald-400/60 text-xs mt-4">
          5000+ students already using VAZHIKATTI
        </p>
      </div>
    </div>
  );
};

export default PaywallPage;
