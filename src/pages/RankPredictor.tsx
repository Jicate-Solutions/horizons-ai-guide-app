import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, TrendingUp, Building2, Search, ExternalLink, Award, Info } from 'lucide-react';
import { tneaColleges, neetColleges, jeeColleges } from '@/data/college-cutoff-data';

type ExamType = 'tnea' | 'neet' | 'jee';

const examConfig = {
  tnea: { label: 'TNEA', fullLabel: 'TNEA Engineering', emoji: '🏛️', maxScore: 200, unit: '/200', placeholder: 'e.g. 185', color: 'emerald', desc: 'Enter your 12th mark cutoff (Maths×1 + Physics×0.5 + Chemistry×0.5)', sourceYear: '2024-25' },
  neet: { label: 'NEET UG', fullLabel: 'NEET UG Medical', emoji: '🏥', maxScore: 720, unit: '/720', placeholder: 'e.g. 580', color: 'blue', desc: 'Enter your expected NEET score out of 720', sourceYear: '2024' },
  jee: { label: 'JEE Main', fullLabel: 'JEE Main Engineering', emoji: '⚙️', maxScore: 300, unit: '/300', placeholder: 'e.g. 200', color: 'violet', desc: 'Enter your JEE Main score — we\'ll predict your rank', sourceYear: '2024' },
};

// JEE score → rank predictor
const jeeScoreToRank = (score: number): number => {
  if (score >= 290) return 50;
  if (score >= 280) return 200;
  if (score >= 260) return 1000;
  if (score >= 240) return 3000;
  if (score >= 220) return 8000;
  if (score >= 200) return 15000;
  if (score >= 180) return 30000;
  if (score >= 160) return 50000;
  if (score >= 140) return 80000;
  if (score >= 120) return 120000;
  if (score >= 100) return 200000;
  if (score >= 80) return 400000;
  return 700000;
};

const typeBadge = {
  govt: { label: 'Govt', bg: 'bg-emerald-100 text-emerald-700' },
  private: { label: 'Private', bg: 'bg-blue-100 text-blue-700' },
  deemed: { label: 'Deemed', bg: 'bg-purple-100 text-purple-700' },
  iit: { label: 'IIT', bg: 'bg-amber-100 text-amber-700' },
  nit: { label: 'NIT', bg: 'bg-emerald-100 text-emerald-700' },
  iiit: { label: 'IIIT', bg: 'bg-blue-100 text-blue-700' },
};

const RankPredictor = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState<ExamType>('tnea');
  const [score, setScore] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const cfg = examConfig[exam];
  const numScore = Number(score);
  const isValidScore = score !== '' && numScore >= 0 && numScore <= cfg.maxScore;

  const predictedRank = exam === 'jee' && isValidScore ? jeeScoreToRank(numScore) : null;

  const eligibleColleges = useMemo(() => {
    if (!isValidScore) return [];
    if (exam === 'tnea') {
      return tneaColleges.filter(c => numScore >= c.cutoff).sort((a, b) => b.cutoff - a.cutoff);
    }
    if (exam === 'neet') {
      return neetColleges.filter(c => numScore >= c.cutoffScore).sort((a, b) => b.cutoffScore - a.cutoffScore);
    }
    if (exam === 'jee' && predictedRank) {
      return jeeColleges.filter(c => predictedRank <= c.cutoffRank * 1.2).sort((a, b) => a.cutoffRank - b.cutoffRank);
    }
    return [];
  }, [exam, numScore, isValidScore, predictedRank]);

  const filtered = eligibleColleges.filter(c => {
    const q = search.toLowerCase();
    if (!q) return true;
    const name = 'name' in c ? c.name : '';
    const branch = 'branch' in c ? c.branch : ('course' in c ? c.course : '');
    const district = 'district' in c ? c.district : ('state' in c ? c.state : '');
    return name.toLowerCase().includes(q) || branch.toLowerCase().includes(q) || district.toLowerCase().includes(q);
  });

  const displayed = showAll ? filtered : filtered.slice(0, 15);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-bold text-gray-900">Rank & College Predictor</h1>
          <p className="text-xs text-gray-500">Based on {cfg.sourceYear} cutoff data</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        {/* Exam Selector */}
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(examConfig) as [ExamType, typeof examConfig.tnea][]).map(([key, c]) => (
            <button
              key={key}
              onClick={() => { setExam(key); setScore(''); setSearch(''); setShowAll(false); }}
              className={`py-3 px-2 rounded-xl border-2 text-center transition-all ${
                exam === key ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-xl mb-0.5">{c.emoji}</div>
              <div className={`text-xs font-bold ${exam === key ? 'text-emerald-700' : 'text-gray-700'}`}>{c.label}</div>
            </button>
          ))}
        </div>

        {/* Score Input */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {cfg.emoji} {cfg.fullLabel} Score
          </label>
          <p className="text-xs text-gray-500 mb-3">{cfg.desc}</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={cfg.maxScore}
              value={score}
              onChange={e => { setScore(e.target.value); setShowAll(false); setSearch(''); }}
              placeholder={cfg.placeholder}
              className="flex-1 text-2xl font-bold text-gray-900 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none"
            />
            <span className="text-gray-400 font-semibold text-sm">{cfg.unit}</span>
          </div>

          {/* JEE rank prediction */}
          {exam === 'jee' && isValidScore && predictedRank && (
            <div className="mt-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-violet-600 shrink-0" />
              <div>
                <p className="text-xs text-violet-600 font-medium">Predicted Rank (Approx)</p>
                <p className="text-lg font-black text-violet-700">
                  {predictedRank >= 100000 ? `${(predictedRank/100000).toFixed(1)}L` : predictedRank >= 1000 ? `${(predictedRank/1000).toFixed(0)}K` : predictedRank}
                </p>
              </div>
              <p className="text-xs text-violet-500 ml-auto">Based on 2024 trends</p>
            </div>
          )}
        </div>

        {/* Results */}
        {isValidScore && (
          <div className="space-y-3">
            {/* Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-gray-800">
                  {eligibleColleges.length} Eligible College{eligibleColleges.length !== 1 ? 's' : ''} Found
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-full border border-amber-200">
                <Info className="w-3 h-3" />
                {cfg.sourceYear} Data
              </div>
            </div>

            {eligibleColleges.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-sm font-semibold text-gray-700">No colleges found for this score</p>
                <p className="text-xs text-gray-500 mt-1">Try increasing your score or check other exam options</p>
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search college, branch, or district..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
                  />
                </div>

                {/* College Cards */}
                <div className="space-y-2">
                  {displayed.map((c, i) => {
                    const name = 'name' in c ? c.name : '';
                    const branch = 'branch' in c ? c.branch : ('course' in c ? (c as any).course : '');
                    const location = 'district' in c ? (c as any).district : ('state' in c ? (c as any).state : '');
                    const cutoffVal = 'cutoff' in c ? (c as any).cutoff : ('cutoffScore' in c ? (c as any).cutoffScore : (c as any).cutoffRank);
                    const cutoffLabel = exam === 'jee' ? `Rank ${cutoffVal.toLocaleString()}` : `Cutoff: ${cutoffVal}`;
                    const typeKey = (c as any).type as keyof typeof typeBadge;
                    const badge = typeBadge[typeKey] || typeBadge.private;

                    return (
                      <div key={i} className="bg-white rounded-xl border border-gray-200 p-3.5 flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                          <Building2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 leading-tight">{name}</p>
                          <p className="text-xs text-emerald-700 font-medium mt-0.5">{branch}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-xs text-gray-500">📍 {location}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badge.bg}`}>{badge.label}</span>
                            <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-semibold border border-orange-200">{cutoffLabel}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show more */}
                {filtered.length > 15 && !showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-full py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all"
                  >
                    Show All {filtered.length} Colleges ↓
                  </button>
                )}

                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    Cutoffs are based on <strong>{cfg.sourceYear} OC category data</strong>. Actual cutoffs vary by category (BC/MBC/SC/ST) and may change slightly each year. Always verify on the official counselling portal before applying.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Empty state */}
        {!isValidScore && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Enter your score above</p>
            <p className="text-xs text-gray-500 mt-1">We'll show you all colleges you're eligible for</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankPredictor;
