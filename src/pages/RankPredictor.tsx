import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, TrendingUp, Building2, ChevronRight, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

// ═══ HISTORICAL DATA FOR SCORE → RANK PREDICTION ═══
interface RankRange { score: number; rankMin: number; rankMax: number; }
interface CollegeTier { tier: string; emoji: string; rankRange: string; examples: string[]; color: string; }

const neetRankData: RankRange[] = [
  { score: 720, rankMin: 1, rankMax: 5 },
  { score: 700, rankMin: 5, rankMax: 100 },
  { score: 680, rankMin: 100, rankMax: 500 },
  { score: 660, rankMin: 500, rankMax: 2000 },
  { score: 640, rankMin: 2000, rankMax: 5000 },
  { score: 620, rankMin: 5000, rankMax: 10000 },
  { score: 600, rankMin: 10000, rankMax: 20000 },
  { score: 580, rankMin: 20000, rankMax: 35000 },
  { score: 560, rankMin: 35000, rankMax: 55000 },
  { score: 540, rankMin: 55000, rankMax: 80000 },
  { score: 520, rankMin: 80000, rankMax: 110000 },
  { score: 500, rankMin: 110000, rankMax: 150000 },
  { score: 480, rankMin: 150000, rankMax: 200000 },
  { score: 450, rankMin: 200000, rankMax: 300000 },
  { score: 400, rankMin: 300000, rankMax: 500000 },
  { score: 350, rankMin: 500000, rankMax: 700000 },
  { score: 300, rankMin: 700000, rankMax: 1000000 },
];

const neetCollegeTiers: CollegeTier[] = [
  { tier: 'AIIMS / JIPMER / Top Govt', emoji: '👑', rankRange: 'Rank 1 – 100', examples: ['AIIMS Delhi', 'AIIMS Madurai', 'JIPMER Puducherry', 'Maulana Azad Medical College'], color: 'bg-amber-50 border-amber-300' },
  { tier: 'Top TN Govt Medical', emoji: '🏛️', rankRange: 'Rank 100 – 5,000', examples: ['Madras Medical College', 'Stanley Medical College', 'Kilpauk Medical College', 'Govt Medical College Coimbatore'], color: 'bg-emerald-50 border-emerald-300' },
  { tier: 'TN Govt Medical (Other)', emoji: '🏥', rankRange: 'Rank 5,000 – 20,000', examples: ['Govt Medical College Salem', 'Govt Medical College Thanjavur', 'Govt Medical College Tirunelveli', 'Govt Medical College Namakkal'], color: 'bg-blue-50 border-blue-300' },
  { tier: 'Top Private Medical', emoji: '🏫', rankRange: 'Rank 20,000 – 80,000', examples: ['CMC Vellore', 'SRM Medical College', 'PSG Medical College', 'Meenakshi Medical College'], color: 'bg-purple-50 border-purple-300' },
  { tier: 'Private / Management', emoji: '📋', rankRange: 'Rank 80,000 – 3,00,000', examples: ['Saveetha Medical College', 'Sree Balaji Medical College', 'Dhanalakshmi Medical College'], color: 'bg-gray-50 border-gray-300' },
  { tier: 'BDS / AYUSH / Nursing', emoji: '🦷', rankRange: 'Rank 3,00,000+', examples: ['Govt Dental Colleges', 'BAMS Colleges', 'BHMS Colleges', 'B.Sc Nursing Colleges'], color: 'bg-red-50 border-red-300' },
];

const jeeRankData: RankRange[] = [
  { score: 300, rankMin: 1, rankMax: 20 },
  { score: 280, rankMin: 20, rankMax: 200 },
  { score: 260, rankMin: 200, rankMax: 1000 },
  { score: 240, rankMin: 1000, rankMax: 3000 },
  { score: 220, rankMin: 3000, rankMax: 8000 },
  { score: 200, rankMin: 8000, rankMax: 15000 },
  { score: 180, rankMin: 15000, rankMax: 30000 },
  { score: 160, rankMin: 30000, rankMax: 50000 },
  { score: 140, rankMin: 50000, rankMax: 80000 },
  { score: 120, rankMin: 80000, rankMax: 120000 },
  { score: 100, rankMin: 120000, rankMax: 200000 },
  { score: 80, rankMin: 200000, rankMax: 400000 },
  { score: 60, rankMin: 400000, rankMax: 700000 },
];

const jeeCollegeTiers: CollegeTier[] = [
  { tier: 'IIT (Top 7)', emoji: '👑', rankRange: 'Rank 1 – 3,000', examples: ['IIT Madras', 'IIT Bombay', 'IIT Delhi', 'IIT Kanpur'], color: 'bg-amber-50 border-amber-300' },
  { tier: 'IIT (Other) / NIT Top', emoji: '🏛️', rankRange: 'Rank 3,000 – 15,000', examples: ['IIT Hyderabad', 'IIT Ropar', 'NIT Trichy', 'NIT Surathkal'], color: 'bg-emerald-50 border-emerald-300' },
  { tier: 'NIT / IIIT / Top Private', emoji: '⚙️', rankRange: 'Rank 15,000 – 50,000', examples: ['NIT Calicut', 'IIIT Hyderabad', 'BITS Pilani', 'VIT Vellore (CSE)'], color: 'bg-blue-50 border-blue-300' },
  { tier: 'TNEA Top Colleges', emoji: '🏫', rankRange: 'Rank 50,000 – 2,00,000', examples: ['CEG Anna University', 'PSG Tech', 'CIT Coimbatore', 'TCE Madurai'], color: 'bg-purple-50 border-purple-300' },
  { tier: 'TNEA Other / SRM / VIT', emoji: '📋', rankRange: 'Rank 2,00,000+', examples: ['SRM (non-CSE)', 'VIT (non-CSE)', 'Sathyabama', 'KCG College'], color: 'bg-gray-50 border-gray-300' },
];

const tneaCutoffData = [
  { cutoff: 200, tier: 'CEG Anna University — CSE/IT/ECE', emoji: '👑', color: 'bg-amber-50 border-amber-300' },
  { cutoff: 197, tier: 'CEG — Mech/EEE/Civil + MIT — CSE', emoji: '🏛️', color: 'bg-emerald-50 border-emerald-300' },
  { cutoff: 195, tier: 'PSG Tech, TCE Madurai — CSE/IT', emoji: '⚙️', color: 'bg-blue-50 border-blue-300' },
  { cutoff: 190, tier: 'CIT, GCT, Thiagarajar — Core branches', emoji: '🏫', color: 'bg-purple-50 border-purple-300' },
  { cutoff: 185, tier: 'Top private — CSE/AI/Data Science', emoji: '📋', color: 'bg-violet-50 border-violet-300' },
  { cutoff: 175, tier: 'Govt Engineering Colleges — All branches', emoji: '🏛️', color: 'bg-cyan-50 border-cyan-300' },
  { cutoff: 160, tier: 'Good private colleges — Popular branches', emoji: '📋', color: 'bg-gray-50 border-gray-300' },
  { cutoff: 140, tier: 'Private colleges — Most branches available', emoji: '🏫', color: 'bg-orange-50 border-orange-300' },
  { cutoff: 100, tier: 'All engineering colleges — All branches', emoji: '✅', color: 'bg-green-50 border-green-300' },
];

type ExamType = 'neet' | 'jee' | 'tnea';

const examInfo: Record<ExamType, { label: string; emoji: string; maxScore: number; unit: string; scoreLabel: string }> = {
  neet: { label: 'NEET UG', emoji: '🏥', maxScore: 720, unit: '/720', scoreLabel: 'Your Expected NEET Score' },
  jee: { label: 'JEE Main', emoji: '⚙️', maxScore: 300, unit: '/300', scoreLabel: 'Your Expected JEE Score' },
  tnea: { label: 'TNEA Cutoff', emoji: '🏛️', maxScore: 200, unit: '/200', scoreLabel: 'Your TNEA Cutoff Score' },
};

const predictRank = (score: number, data: RankRange[]): { rankMin: number; rankMax: number } | null => {
  if (score >= data[0].score) return { rankMin: 1, rankMax: data[0].rankMax };
  for (let i = 0; i < data.length - 1; i++) {
    if (score >= data[i + 1].score && score < data[i].score) {
      const ratio = (data[i].score - score) / (data[i].score - data[i + 1].score);
      const rankMin = Math.round(data[i].rankMin + ratio * (data[i + 1].rankMin - data[i].rankMin));
      const rankMax = Math.round(data[i].rankMax + ratio * (data[i + 1].rankMax - data[i].rankMax));
      return { rankMin, rankMax };
    }
  }
  const last = data[data.length - 1];
  if (score < last.score) return { rankMin: last.rankMax, rankMax: last.rankMax * 2 };
  return null;
};

const formatRank = (n: number) => {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString('en-IN');
};

const RankPredictor = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState<ExamType | null>(null);
  const [score, setScore] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const info = exam ? examInfo[exam] : null;

  const prediction = useMemo(() => {
    if (!exam || !score) return null;
    const s = parseInt(score);
    if (isNaN(s)) return null;

    if (exam === 'tnea') {
      const eligible = tneaCutoffData.filter(t => s >= t.cutoff);
      return { type: 'tnea' as const, cutoff: s, tiers: eligible };
    }

    const data = exam === 'neet' ? neetRankData : jeeRankData;
    const rank = predictRank(s, data);
    if (!rank) return null;

    const tiers = exam === 'neet' ? neetCollegeTiers : jeeCollegeTiers;
    return { type: 'rank' as const, score: s, rankMin: rank.rankMin, rankMax: rank.rankMax, tiers };
  }, [exam, score]);

  const handlePredict = () => {
    if (!score || !exam) return;
    setShowResult(true);
  };

  // ═══ EXAM SELECTION ═══
  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-5">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl shadow-lg mb-4">🎯</div>
            <h1 className="text-2xl font-bold text-gray-900">Rank Predictor</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your score → See your expected rank → Know your college options</p>
          </div>
          <div className="space-y-3">
            {(['neet', 'jee', 'tnea'] as ExamType[]).map(e => (
              <button key={e} onClick={() => setExam(e)}
                className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-indigo-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                <span className="text-3xl">{examInfo[e].emoji}</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900">{examInfo[e].label}</p>
                  <p className="text-xs text-gray-500">Max score: {examInfo[e].maxScore}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══ SCORE INPUT + RESULTS ═══
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={() => { setExam(null); setShowResult(false); setScore(''); }} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Change Exam
          </button>
        </div>

        {/* Score Input */}
        <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{info!.emoji}</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{info!.label} Rank Predictor</h2>
              <p className="text-xs text-gray-500">Based on 2024-2025 historical data</p>
            </div>
          </div>

          <label className="text-xs font-bold text-gray-600 block mb-2">{info!.scoreLabel}</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input type="number" value={score} onChange={e => { setScore(e.target.value); setShowResult(false); }}
                placeholder={`0 – ${info!.maxScore}`} min="0" max={info!.maxScore}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg font-bold text-gray-900 focus:border-indigo-400 focus:ring-0 outline-none" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{info!.unit}</span>
            </div>
            <button onClick={handlePredict} disabled={!score}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm disabled:opacity-50 hover:from-indigo-600 hover:to-violet-700 transition-all active:scale-[0.98]">
              Predict
            </button>
          </div>
        </div>

        {/* Results */}
        {showResult && prediction && (
          <div className="space-y-4">
            {/* Rank prediction */}
            {prediction.type === 'rank' && (
              <>
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-5 border-2 border-indigo-200 text-center">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Expected Rank Range</p>
                  <p className="text-3xl font-black text-gray-900">
                    {formatRank(prediction.rankMin)} – {formatRank(prediction.rankMax)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">For score {prediction.score}{info!.unit}</p>
                  <p className="text-[10px] text-gray-400 mt-2">⚠️ This is an estimate based on 2024-2025 trends. Actual rank may vary.</p>
                </div>

                {/* College tiers */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-gray-800">College Options at Your Rank</h3>
                  </div>
                  <div className="space-y-2">
                    {prediction.tiers.map((tier, i) => {
                      const isInRange = prediction.rankMax <= parseInt(tier.rankRange.replace(/[^0-9,]/g, '').split(',').pop() || '999999999');
                      const isExpanded = expandedTier === tier.tier;
                      return (
                        <div key={i} className={cn("rounded-xl border-2 overflow-hidden", tier.color, isInRange ? 'opacity-100' : 'opacity-50')}>
                          <button onClick={() => setExpandedTier(isExpanded ? null : tier.tier)}
                            className="w-full p-3 flex items-center gap-3 text-left">
                            <span className="text-lg">{tier.emoji}</span>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gray-800">{tier.tier}</p>
                              <p className="text-[10px] text-gray-500">{tier.rankRange}</p>
                            </div>
                            {isInRange && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Possible ✓</span>}
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                          </button>
                          {isExpanded && (
                            <div className="px-3 pb-3 border-t border-gray-200 pt-2 space-y-1">
                              {tier.examples.map((c, j) => (
                                <p key={j} className="text-xs text-gray-600">🎓 {c}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* TNEA cutoff prediction */}
            {prediction.type === 'tnea' && (
              <>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border-2 border-emerald-200 text-center">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Your TNEA Cutoff</p>
                  <p className="text-3xl font-black text-gray-900">{prediction.cutoff}/200</p>
                  <p className="text-xs text-gray-500 mt-1">{prediction.tiers.length} college tiers available for you</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-gray-800">Colleges You Can Get</h3>
                  </div>
                  <div className="space-y-2">
                    {prediction.tiers.length > 0 ? prediction.tiers.map((tier, i) => (
                      <div key={i} className={cn("rounded-xl p-3 border-2 flex items-center gap-3", tier.color)}>
                        <span className="text-lg">{tier.emoji}</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{tier.tier}</p>
                          <p className="text-[10px] text-gray-500">Cutoff needed: {tier.cutoff}+</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-xs text-gray-500 text-center py-4">Score too low for TNEA counselling. Minimum is usually ~100/200.</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="text-[10px] text-amber-700">⚠️ <strong>Disclaimer:</strong> Predictions are based on historical data from 2024-2025. Actual cutoffs vary every year based on difficulty, number of applicants, and reservation policies. Use this as a reference, not a guarantee.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankPredictor;
