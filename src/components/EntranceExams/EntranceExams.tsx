import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, FileText, Building2, Bookmark, CalendarDays, Scale, MapPin, BookOpen, Target, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ExamCard } from './ExamCard';
import { ExamCompare } from './ExamCompare';
import { CategoryOverview } from './CategoryOverview';
import { PreparationTipsSection } from './PreparationTipsSection';
import { ExamCalendar } from './ExamCalendar';
import { ExamRecommendationQuiz } from './ExamRecommendationQuiz';
import { JeeTneaGuide } from './JeeTneaGuide';
import { PreviousYearQuestions } from '@/components/PreviousYearQuestions/PreviousYearQuestions';
import { examCategories, entranceExams, getExamsByCategory } from './examData';
import { ExamCategory } from './types';
import { useBookmarkedExams } from './useBookmarkedExams';
import { cn } from '@/lib/utils';

export const EntranceExams = () => {
  const [pageView, setPageView] = useState<'exams' | 'practice'>('practice');
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('engineering');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompare, setShowCompare] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  const { isBookmarked, toggleBookmark, getBookmarkedCount } = useBookmarkedExams();

  const filteredExams = useMemo(() => {
    let exams = getExamsByCategory(activeCategory);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      exams = exams.filter(exam => 
        exam.name.toLowerCase().includes(query) ||
        exam.fullForm.toLowerCase().includes(query) ||
        exam.conductingBody.toLowerCase().includes(query) ||
        exam.tamilName.toLowerCase().includes(query)
      );
    }
    if (showBookmarksOnly) {
      exams = exams.filter(exam => isBookmarked(exam.id));
    }
    return exams;
  }, [activeCategory, searchQuery, showBookmarksOnly, isBookmarked]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    examCategories.forEach(cat => {
      counts[cat.id] = getExamsByCategory(cat.id).length;
    });
    return counts;
  }, []);

  const bookmarkedCount = getBookmarkedCount();

  return (
    <div className="space-y-4">
      {/* ═══ HERO BANNER ═══ */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '240px' }}>
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=500&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-800/92 to-indigo-900/95" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/25 mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
            Entrance Exam <span className="text-amber-300">Guide</span>
          </h2>
          <p className="text-sm text-purple-300 font-medium mb-1">நுழைவுத் தேர்வு வழிகாட்டி</p>
          <p className="text-xs text-purple-200/60 max-w-md mb-5">Practice questions, exam calendar, comparison tools & AI-powered study planners — all in one place</p>

          <div className="flex items-center gap-6 md:gap-8 mb-4">
            {[
              { value: String(entranceExams.length), label: 'Exams', color: 'text-white' },
              { value: '149', label: 'Practice Qs', color: 'text-amber-300' },
              { value: '5', label: 'Categories', color: 'text-violet-300' },
              { value: 'AI', label: 'Study Plans', color: 'text-emerald-300' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className={cn("text-2xl md:text-3xl font-black leading-none", s.color)}>{s.value}</p>
                <p className="text-[10px] text-purple-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 bg-violet-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-400/30">
            <BookOpen className="w-3.5 h-3.5 text-violet-300" />
            <span className="text-xs font-bold text-violet-200">JEE • NEET • TNEA • CLAT • NDA & more</span>
          </div>
        </div>
      </div>

      {/* ═══ PAGE VIEW TOGGLE ═══ */}
      <div className="bg-white rounded-2xl p-2 border-2 border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setPageView('practice')}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-3.5 rounded-xl font-bold transition-all",
              pageView === 'practice'
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-gray-200"
            )}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">Practice Questions</span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-bold", pageView === 'practice' ? "bg-white/20" : "bg-violet-100 text-violet-700")}>149 Qs</span>
          </button>
          <button
            onClick={() => setPageView('exams')}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-3.5 rounded-xl font-bold transition-all",
              pageView === 'exams'
                ? "bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white shadow-lg"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-gray-200"
            )}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm">Exam Guide</span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-bold", pageView === 'exams' ? "bg-white/20" : "bg-green-100 text-green-700")}>39 Exams</span>
          </button>
        </div>
      </div>

      {/* ═══ PRACTICE VIEW ═══ */}
      {pageView === 'practice' && (
        <>
          {/* Quick tip */}
          <div className="rounded-xl p-3.5 flex items-start gap-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-bold text-violet-800">Practice Tip</p>
              <p className="text-xs text-violet-600 mt-0.5">Solve at least 10 questions daily. Focus on NCERT first, then move to previous year papers. Consistent practice beats last-minute cramming!</p>
            </div>
          </div>
          <PreviousYearQuestions />
        </>
      )}

      {/* ═══ EXAM GUIDE VIEW ═══ */}
      {pageView === 'exams' && (<>

      {/* Not sure banner */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-emerald-200">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤔</span>
            <div>
              <p className="text-sm font-bold text-emerald-800">Not sure which exam to take?</p>
              <p className="text-xs text-emerald-600 mt-0.5">Our AI quiz will recommend the best exams based on your stream & interest</p>
            </div>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg gap-1.5 flex-shrink-0" onClick={() => setShowMoreInfo(!showMoreInfo)}>
            <Target className="w-3.5 h-3.5" /> Take Quiz
          </Button>
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="overflow-x-auto pb-1 -mx-1 px-1">
        <div className="flex gap-2 min-w-max">
          {examCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border transition-all text-sm whitespace-nowrap",
                  isActive
                    ? "bg-[#1B5E20] text-white border-[#1B5E20] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#2E7D32] hover:bg-emerald-50"
                )}
              >
                <span className="text-base">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <Badge className={cn(
                  "text-[10px] h-5 px-1.5",
                  isActive ? "bg-white/20 text-white border-0" : "bg-gray-100 text-gray-500 border-0"
                )}>
                  {categoryCounts[category.id]}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SEARCH + ACTIONS ROW ── */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white border-gray-200 rounded-xl shadow-sm text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>
        <Button variant="outline" size="icon" onClick={() => setShowCompare(true)} className="h-10 w-10 border-gray-200 rounded-xl">
          <Scale className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setShowCalendar(true)} className="h-10 w-10 border-gray-200 rounded-xl">
          <CalendarDays className="h-4 w-4 text-gray-500" />
        </Button>
        <Button 
          variant="outline" size="icon"
          onClick={() => setShowBookmarksOnly(!showBookmarksOnly)} 
          className={cn("h-10 w-10 rounded-xl", showBookmarksOnly ? "bg-amber-50 border-amber-300 text-amber-600" : "border-gray-200")}
        >
          <Bookmark className={cn("h-4 w-4", showBookmarksOnly ? "fill-amber-500 text-amber-500" : "text-gray-500")} />
        </Button>
      </div>

      {/* ── EXAM CARDS ── */}
      {filteredExams.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">
            {showBookmarksOnly ? "No saved exams in this category" : "No exams found"}
          </p>
          <div className="flex justify-center gap-3 mt-3">
            {searchQuery && (
              <Button variant="link" className="text-[#2E7D32] text-sm" onClick={() => setSearchQuery('')}>Clear search</Button>
            )}
            {showBookmarksOnly && (
              <Button variant="link" className="text-[#2E7D32] text-sm" onClick={() => setShowBookmarksOnly(false)}>Show all</Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} isBookmarked={isBookmarked(exam.id)} onToggleBookmark={toggleBookmark} />
          ))}
        </div>
      )}

      {/* ── JEE vs TNEA Guide (engineering only) ── */}
      {activeCategory === 'engineering' && <JeeTneaGuide />}

      {/* ── Defence Exams Explanation ── */}
      {activeCategory === 'defence' && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-base flex items-center gap-2">🎖️ Why Defence Exams are Entrance Exams</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Defence exams like <strong className="text-white">NDA, Indian Navy B.Tech, Army TES, Coast Guard, and Agniveer</strong> are 
            listed here because they are <strong className="text-white">competitive entrance exams</strong> that 12th pass students 
            take to enter defence training academies — similar to how JEE is for IITs and NEET is for medical colleges.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="font-bold text-amber-300 text-xs mb-1">🎓 TRAINING YOU GET</p>
              <p className="text-slate-300 text-xs">NDA → 3 years at National Defence Academy (Pune), followed by 1 year at respective service academy. You get a B.Tech/B.A./B.Sc degree.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="font-bold text-amber-300 text-xs mb-1">💼 CAREER AFTER</p>
              <p className="text-slate-300 text-xs">Commissioned Officer in Army/Navy/Air Force — one of the most prestigious careers in India with ₹56,100+ salary, pension, housing, and lifetime benefits.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-600 pt-2">
            💡 For government job exams (SSC, Railway, etc.) with different selection processes, check the <strong>Govt Jobs</strong> tab.
          </p>
        </div>
      )}

      {/* ── MORE INFO (collapsible) ── */}
      <button
        onClick={() => setShowMoreInfo(!showMoreInfo)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all"
      >
        <BookOpen className="w-4 h-4" />
        {showMoreInfo ? 'Hide' : 'More'}: Stream Guide, Eligibility & Tips
        {showMoreInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showMoreInfo && (
        <div className="space-y-4">
          {/* Stream-wise Quick Reference */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="font-bold text-[#1B5E20] text-sm mb-3">📚 Your Stream → Your Exams</h3>
            <div className="space-y-1.5 text-xs">
              {[
                { stream: 'PCM (Maths)', exams: 'TNEA, JEE, VITEEE, SRMJEEE, BITSAT, COMEDK, WBJEE, MHT CET, KCET, AP EAMCET', bg: 'bg-blue-50', color: 'text-blue-700' },
                { stream: 'PCB (Biology)', exams: 'NEET, TNAU, TANUVAS, Nursing, B.Pharm, AYUSH, JIPMER', bg: 'bg-red-50', color: 'text-red-700' },
                { stream: 'PCMB (Both)', exams: 'All engineering + All medical exams eligible! ✅', bg: 'bg-emerald-50', color: 'text-emerald-700' },
                { stream: 'Commerce', exams: 'CA/CS/CMA, CLAT, BBA, CUET, SET, IPM (IIM)', bg: 'bg-purple-50', color: 'text-purple-700' },
                { stream: 'Arts', exams: 'CLAT, NIFT, NID, CUET, BA/BSW Direct, UCEED', bg: 'bg-amber-50', color: 'text-amber-700' },
                { stream: 'Any Stream', exams: 'NDA, CUET, IPM (IIM), SET (Symbiosis), Coast Guard', bg: 'bg-slate-50', color: 'text-slate-700' },
              ].map((r) => (
                <div key={r.stream} className={cn("flex items-center gap-2 p-2 rounded-lg", r.bg)}>
                  <span className={cn("font-bold min-w-[85px]", r.color)}>{r.stream}</span>
                  <span className="text-gray-600">{r.exams}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Overview */}
          <CategoryOverview category={activeCategory} />

          {/* Exam Recommendation Quiz */}
          <ExamRecommendationQuiz />

          {/* Preparation Tips */}
          <PreparationTipsSection />

          {/* Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-700">
              💡 Dates are tentative. Always verify from official websites before applying.
            </p>
          </div>
        </div>
      )}

      </>)}

      {/* Modals */}
      <ExamCompare isOpen={showCompare} onClose={() => setShowCompare(false)} />
      <ExamCalendar isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
    </div>
  );
};
