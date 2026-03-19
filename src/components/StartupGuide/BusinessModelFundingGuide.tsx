import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronDown, ChevronUp, ExternalLink, Check, ArrowRight, ArrowLeft,
  Puzzle, Banknote, Save, RotateCcw, Sparkles, CheckCircle2, Circle,
  Download, Share2, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ═══════ CANVAS DATA ═══════
const canvasBlocks = [
  { id: 'problem', step: 1, icon: '🔍', title: 'The Problem', titleTa: 'பிரச்சனை', color: 'border-red-400 bg-red-50', activeColor: 'ring-red-400', dotColor: 'bg-red-500',
    prompt: 'Describe a real problem you\'ve seen around you. Think about your school, home, or neighbourhood.',
    hint: 'Focus on WHO has the problem and HOW OFTEN they face it.',
    tnExample: { startup: 'Sakthi Masala', text: 'Working women in Tamil Nadu didn\'t have time to grind fresh spices daily. They needed ready-made masalas that tasted like home.' },
    placeholder: 'e.g. Students in my school waste hours traveling to coaching centers because there\'s no good online option in Tamil...' },
  { id: 'customer', step: 2, icon: '👥', title: 'Your Customer', titleTa: 'வாடிக்கையாளர்', color: 'border-blue-400 bg-blue-50', activeColor: 'ring-blue-400', dotColor: 'bg-blue-500',
    prompt: 'Who exactly has this problem? Be specific — age, location, income level.',
    hint: 'The more specific your customer, the easier it is to sell.',
    tnExample: { startup: 'Zoho', text: 'Small and medium businesses worldwide who couldn\'t afford expensive enterprise software like SAP or Oracle.' },
    placeholder: 'e.g. 12th-pass students from rural Tamil Nadu towns (age 17-19), families earning less than ₹5L/year...' },
  { id: 'solution', step: 3, icon: '💡', title: 'Your Solution', titleTa: 'தீர்வு', color: 'border-amber-400 bg-amber-50', activeColor: 'ring-amber-400', dotColor: 'bg-amber-500',
    prompt: 'What will you build/offer to solve this problem? Keep it simple.',
    hint: 'Can you explain it in ONE sentence? If not, simplify.',
    tnExample: { startup: 'Aachi Group', text: 'Pre-ground, branded spice mixes at affordable prices — sold in small sachets that even low-income families could afford.' },
    placeholder: 'e.g. A WhatsApp-based tutoring service where local college students teach 12th subjects in Tamil for ₹99/month...' },
  { id: 'uniqueness', step: 4, icon: '⭐', title: 'What Makes You Different', titleTa: 'தனித்துவம்', color: 'border-purple-400 bg-purple-50', activeColor: 'ring-purple-400', dotColor: 'bg-purple-500',
    prompt: 'Why would someone choose YOU over existing options?',
    hint: 'Think: cheaper? faster? in Tamil? local? more personal?',
    tnExample: { startup: 'Zepto', text: 'Groceries delivered in 10 minutes — when BigBasket took 2-4 hours. Speed was the only differentiator, but it changed everything.' },
    placeholder: 'e.g. All classes in Tamil, by tutors from the same district, on WhatsApp (no app download needed)...' },
  { id: 'revenue', step: 5, icon: '💰', title: 'How You\'ll Earn Money', titleTa: 'வருவாய்', color: 'border-emerald-400 bg-emerald-50', activeColor: 'ring-emerald-400', dotColor: 'bg-emerald-500',
    prompt: 'How will this business actually make money? Be specific about pricing.',
    hint: 'Start with: "Customers pay ₹___ per ___"',
    tnExample: { startup: 'OYO Rooms', text: 'Commission model: take 20-25% from every hotel booking. Hotels get more customers, OYO gets a cut. Win-win.' },
    placeholder: 'e.g. Students pay ₹99/month subscription. Schools pay ₹25,000/year for bulk access for all students...' },
  { id: 'cost', step: 6, icon: '📊', title: 'What You\'ll Spend', titleTa: 'செலவு', color: 'border-gray-400 bg-gray-50', activeColor: 'ring-gray-400', dotColor: 'bg-gray-500',
    prompt: 'What are your costs to run this? Be realistic about what you need to spend.',
    hint: 'List monthly costs. If total cost > revenue, rethink your model.',
    tnExample: { startup: 'Papers N Parcels (Tilak Mehta)', text: 'Started with ₹0 — used existing delivery networks (dabbawalas). No warehouse, no vehicles. Just a platform connecting people.' },
    placeholder: 'e.g. WhatsApp Business: Free. Internet: ₹500/mo. Paying tutors: ₹3,000/mo. Marketing (pamphlets): ₹1,000/mo. Total: ~₹4,500/mo...' },
];

// ═══════ FUNDING DATA ═══════
const fundingSources = [
  { name: 'PMMY Mudra Loan', emoji: '🏦', amount: 'Up to ₹10 Lakhs', type: 'Loan (no collateral)', eligibility: 'Any Indian citizen 18+', difficulty: 'Easy', link: 'https://www.mudra.org.in', forWhom: ['anyone'], tags: ['loan', 'easy'] },
  { name: 'TANSIM Startup Grant', emoji: '🏛️', amount: 'Up to ₹30 Lakhs', type: 'Grant (free money)', eligibility: 'TN-based startup', difficulty: 'Medium', link: 'https://www.startuptn.in', forWhom: ['tn'], tags: ['grant', 'tn'] },
  { name: 'Startup India (DPIIT)', emoji: '🇮🇳', amount: 'Tax benefits + Fund access', type: 'Registration + Benefits', eligibility: 'Any startup < 10 years', difficulty: 'Medium', link: 'https://www.startupindia.gov.in', forWhom: ['anyone'], tags: ['registration'] },
  { name: 'Stand Up India', emoji: '👩', amount: '₹10L - ₹1 Crore', type: 'Loan', eligibility: 'SC/ST or Women entrepreneurs', difficulty: 'Easy', link: 'https://www.standupmitra.in', forWhom: ['women', 'sc-st'], tags: ['loan', 'women'] },
  { name: 'Atal Innovation Mission', emoji: '💡', amount: '₹10L - ₹20 Lakhs', type: 'Grant', eligibility: 'School/College innovators', difficulty: 'Medium', link: 'https://aim.gov.in', forWhom: ['student'], tags: ['grant', 'student'] },
  { name: 'Smart India Hackathon', emoji: '🏆', amount: '₹1L - ₹5 Lakhs prize', type: 'Competition prize', eligibility: 'College students', difficulty: 'Medium', forWhom: ['student'], tags: ['competition'] },
  { name: 'NIDHI Seed Support', emoji: '🌱', amount: 'Up to ₹25 Lakhs', type: 'Seed funding', eligibility: 'Incubated startups', difficulty: 'Hard', forWhom: ['incubated'], tags: ['seed'] },
  { name: 'IIT Madras Incubation', emoji: '🎓', amount: 'Office + ₹25L seed', type: 'Incubation + Seed', eligibility: 'Any startup (apply)', difficulty: 'Hard', link: 'https://www.iitm.ac.in', forWhom: ['tech'], tags: ['incubation', 'tn'] },
  { name: 'MSME/Udyam Registration', emoji: '📋', amount: 'Priority lending + subsidies', type: 'Registration', eligibility: 'All businesses', difficulty: 'Easy', link: 'https://udyamregistration.gov.in', forWhom: ['anyone'], tags: ['registration', 'easy'] },
  { name: 'Villgro (Social Impact)', emoji: '💚', amount: 'Up to ₹50 Lakhs', type: 'Impact investment', eligibility: 'Social impact focus', difficulty: 'Hard', link: 'https://villgro.org', forWhom: ['social'], tags: ['investment'] },
  { name: 'Anna University TBI', emoji: '🏫', amount: 'Workspace + Mentoring', type: 'Incubation', eligibility: 'TN students', difficulty: 'Medium', forWhom: ['student', 'tn'], tags: ['incubation', 'tn'] },
  { name: 'TiE Young Entrepreneurs', emoji: '🤝', amount: 'Mentorship + ₹5 Lakhs', type: 'Accelerator', eligibility: '18-28 years', difficulty: 'Hard', forWhom: ['anyone'], tags: ['accelerator'] },
];

const diffBadge: Record<string, string> = {
  'Easy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Medium': 'bg-amber-100 text-amber-700 border-amber-200',
  'Hard': 'bg-red-100 text-red-700 border-red-200',
};

const STORAGE_KEY = 'vzk_business_canvas';

export const BusinessModelFundingGuide = ({ defaultSection = 'canvas' }: { defaultSection?: 'canvas' | 'funding' }) => {
  const [section, setSection] = useState<'canvas' | 'funding'>(defaultSection);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Funding matcher
  const [fmStep, setFmStep] = useState(0);
  const [fmAnswers, setFmAnswers] = useState({ location: '', category: '', stage: '' });

  // Load saved answers
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAnswers(JSON.parse(saved));
    } catch {}
  }, []);

  const saveAnswers = useCallback((newAnswers: Record<string, string>) => {
    setAnswers(newAnswers);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers)); } catch {}
  }, []);

  const updateAnswer = (id: string, val: string) => {
    const updated = { ...answers, [id]: val };
    saveAnswers(updated);
  };

  const filledCount = canvasBlocks.filter(b => (answers[b.id] || '').trim().length > 10).length;
  const progress = Math.round((filledCount / canvasBlocks.length) * 100);

  const resetCanvas = () => {
    saveAnswers({});
    setCurrentStep(0);
    toast.success('Canvas cleared. Start fresh!');
  };

  // Funding matcher filter
  const matchedFunding = fundingSources.filter(f => {
    if (!fmAnswers.location && !fmAnswers.category && !fmAnswers.stage) return true;
    let score = 0;
    if (fmAnswers.location === 'tn' && f.forWhom.includes('tn')) score++;
    if (fmAnswers.location === 'other' && f.forWhom.includes('anyone')) score++;
    if (fmAnswers.category === 'women' && f.forWhom.includes('women')) score++;
    if (fmAnswers.category === 'sc-st' && f.forWhom.includes('sc-st')) score++;
    if (fmAnswers.category === 'general' && f.forWhom.includes('anyone')) score++;
    if (fmAnswers.stage === 'idea' && (f.tags.includes('competition') || f.tags.includes('grant'))) score++;
    if (fmAnswers.stage === 'started' && (f.tags.includes('loan') || f.tags.includes('incubation'))) score++;
    if (fmAnswers.stage === 'growing' && (f.tags.includes('seed') || f.tags.includes('investment'))) score++;
    if (f.forWhom.includes('anyone')) score++;
    if (f.forWhom.includes('student') && fmAnswers.stage === 'idea') score++;
    return score > 0;
  });

  const block = canvasBlocks[currentStep];

  return (
    <div className="space-y-4">
      {/* ═══ SECTION TOGGLE ═══ */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setSection('canvas')}
          className={cn("flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all border-2",
            section === 'canvas' ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-gray-500 border-gray-200 hover:border-violet-300')}>
          <Puzzle className="w-5 h-5" />
          <div className="text-left">
            <p>Business Model</p>
            <p className={cn("text-[10px] font-normal", section === 'canvas' ? 'text-violet-200' : 'text-gray-400')}>{filledCount}/6 completed</p>
          </div>
        </button>
        <button onClick={() => setSection('funding')}
          className={cn("flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all border-2",
            section === 'funding' ? 'bg-gradient-to-br from-emerald-600 to-green-700 text-white border-emerald-600 shadow-lg shadow-emerald-200' : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-300')}>
          <Banknote className="w-5 h-5" />
          <div className="text-left">
            <p>Funding Finder</p>
            <p className={cn("text-[10px] font-normal", section === 'funding' ? 'text-emerald-200' : 'text-gray-400')}>12 sources</p>
          </div>
        </button>
      </div>

      {/* ═══════════════════════════════════════════
           BUSINESS MODEL CANVAS — INTERACTIVE
         ═══════════════════════════════════════════ */}
      {section === 'canvas' && !showPreview && (
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-700">Your Business Model Canvas</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-violet-600">{progress}%</span>
                {filledCount === 6 && <button onClick={() => setShowPreview(true)} className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline"><Eye className="w-3 h-3" /> Preview</button>}
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            {/* Step dots */}
            <div className="flex justify-between mt-3">
              {canvasBlocks.map((b, i) => {
                const filled = (answers[b.id] || '').trim().length > 10;
                return (
                  <button key={b.id} onClick={() => setCurrentStep(i)} className="flex flex-col items-center gap-1 group">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all",
                      i === currentStep ? `ring-2 ${b.activeColor} bg-white shadow-md` : filled ? `${b.dotColor} text-white` : 'bg-gray-100 text-gray-400')}>
                      {filled ? <Check className="w-4 h-4" /> : b.icon}
                    </div>
                    <span className={cn("text-[9px] font-medium", i === currentStep ? 'text-gray-900' : 'text-gray-400')}>{b.title.split(' ').pop()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current block */}
          <div className={cn("rounded-2xl border-2 p-5 transition-all", block.color)}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{block.icon}</span>
              <div>
                <h3 className="text-base font-bold text-gray-900">Step {block.step}: {block.title}</h3>
                <p className="text-[10px] text-gray-500 font-medium">{block.titleTa}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 font-medium mt-3 mb-1">{block.prompt}</p>
            <p className="text-xs text-gray-500 mb-3">💡 {block.hint}</p>

            <Textarea
              value={answers[block.id] || ''}
              onChange={(e) => updateAnswer(block.id, e.target.value)}
              placeholder={block.placeholder}
              className="min-h-[100px] text-sm bg-white border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-violet-300"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-[10px] text-gray-400">{(answers[block.id] || '').length}/500 characters</p>
              {(answers[block.id] || '').trim().length > 10 && <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Saved</span>}
            </div>

            {/* TN Example */}
            <div className="mt-4 bg-white rounded-xl p-3 border border-gray-200">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">🌟 Real Example — {block.tnExample.startup}</p>
              <p className="text-xs text-gray-600 italic leading-relaxed">"{block.tnExample.text}"</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="flex-1 gap-1 rounded-xl">
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            {currentStep < 5 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 gap-1 rounded-xl bg-violet-600 hover:bg-violet-700">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={() => setShowPreview(true)} className="flex-1 gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700">
                <Eye className="w-4 h-4" /> View My Canvas
              </Button>
            )}
          </div>

          {/* Reset */}
          <div className="text-center">
            <button onClick={resetCanvas} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 mx-auto">
              <RotateCcw className="w-3 h-3" /> Reset & start over
            </button>
          </div>
        </div>
      )}

      {/* ═══ CANVAS PREVIEW ═══ */}
      {section === 'canvas' && showPreview && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">📋 Your Business Model Canvas</h3>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(false)} className="text-xs gap-1 rounded-lg">
              <ArrowLeft className="w-3 h-3" /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {canvasBlocks.map((b) => {
              const val = (answers[b.id] || '').trim();
              return (
                <div key={b.id} className={cn("rounded-xl border-2 p-3 cursor-pointer hover:shadow-md transition-all", b.color)} onClick={() => { setCurrentStep(canvasBlocks.indexOf(b)); setShowPreview(false); }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-lg">{b.icon}</span>
                    <p className="text-xs font-bold text-gray-800">{b.title}</p>
                  </div>
                  {val.length > 10 ? (
                    <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-4">{val}</p>
                  ) : (
                    <p className="text-[11px] text-gray-400 italic">Tap to fill in...</p>
                  )}
                </div>
              );
            })}
          </div>
          {filledCount === 6 && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200 text-center">
              <p className="text-sm font-bold text-emerald-800">🎉 Canvas Complete! You have a business model.</p>
              <p className="text-xs text-emerald-600 mt-1">Now find funding in the "Funding Finder" tab →</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════
           FUNDING FINDER — SMART MATCHER
         ═══════════════════════════════════════════ */}
      {section === 'funding' && (
        <div className="space-y-4">
          {/* Quick matcher */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
            <p className="text-sm font-bold text-emerald-800 mb-3">🎯 Find Funding That Matches You</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Location */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1.5">Your Location</p>
                <div className="flex gap-1.5">
                  {[{ id: 'tn', label: '📍 Tamil Nadu' }, { id: 'other', label: '🇮🇳 Other State' }].map(o => (
                    <button key={o.id} onClick={() => setFmAnswers(p => ({ ...p, location: p.location === o.id ? '' : o.id }))}
                      className={cn("flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all",
                        fmAnswers.location === o.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200')}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Category */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1.5">Your Category</p>
                <div className="flex gap-1.5">
                  {[{ id: 'general', label: 'General' }, { id: 'women', label: '👩 Women' }, { id: 'sc-st', label: 'SC/ST' }].map(o => (
                    <button key={o.id} onClick={() => setFmAnswers(p => ({ ...p, category: p.category === o.id ? '' : o.id }))}
                      className={cn("flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all",
                        fmAnswers.category === o.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200')}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Stage */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1.5">Your Stage</p>
                <div className="flex gap-1.5">
                  {[{ id: 'idea', label: '💡 Idea' }, { id: 'started', label: '🚀 Started' }, { id: 'growing', label: '📈 Growing' }].map(o => (
                    <button key={o.id} onClick={() => setFmAnswers(p => ({ ...p, stage: p.stage === o.id ? '' : o.id }))}
                      className={cn("flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all",
                        fmAnswers.stage === o.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200')}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-emerald-600 mt-2 text-center">Showing {matchedFunding.length} of {fundingSources.length} funding sources</p>
          </div>

          {/* Results */}
          <div className="space-y-2.5">
            {matchedFunding.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-emerald-300 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{f.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-bold text-gray-900">{f.name}</p>
                      <Badge className={cn("text-[9px] border", diffBadge[f.difficulty])}>{f.difficulty}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="bg-emerald-50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500 uppercase">Amount</p>
                        <p className="text-xs font-bold text-emerald-700">{f.amount}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500 uppercase">Type</p>
                        <p className="text-xs font-bold text-blue-700">{f.type}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">👤 {f.eligibility}</p>
                    {f.link && (
                      <button onClick={() => window.open(f.link, '_blank')} className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1 hover:underline">
                        Apply Now <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
