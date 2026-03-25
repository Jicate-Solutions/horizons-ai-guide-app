import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, FileText, Play, ChevronDown,
  Check, X, Eye, EyeOff, Download, Award, Clock, Calendar,
  Banknote, GraduationCap, Users, Target, Sparkles,
  RotateCcw, ChevronRight, CircleCheck, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { getCategoryById, getExamById, Question } from '@/data/government-exams-data';
import { GovtMockTest, generateGovtExamPDF } from '@/components/GovernmentExams';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'syllabus' | 'pyq' | 'pattern';

const GovernmentExamDetail = () => {
  const { categoryId, examId } = useParams<{ categoryId: string; examId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const ta = language === 'ta';

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [showMockTest, setShowMockTest] = useState(false);
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [pyqMode, setPyqMode] = useState<'year' | 'subject' | 'practice'>('year');

  const category = getCategoryById(categoryId || '');
  const exam = getExamById(categoryId || '', examId || '');

  // Extract year from question ID (tnpsc-2024-xxx → 2024, tnpsc-gs-xxx → 'General')
  const getQuestionYear = (id: string): string => {
    const m = id.match(/(\d{4})/);
    return m ? m[1] : 'General';
  };

  // Available years and subjects for filtering
  const availableYears = useMemo(() => {
    if (!exam) return [];
    const years = new Set(exam.pyq.map(q => getQuestionYear(q.id)));
    return ['all', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [exam]);

  const availableSubjects = useMemo(() => {
    if (!exam) return [];
    const subjects = new Set(exam.pyq.map(q => q.subject));
    return ['all', ...Array.from(subjects).sort()];
  }, [exam]);

  // Filtered questions based on year and subject
  const filteredPYQ = useMemo(() => {
    if (!exam) return [];
    return exam.pyq.filter(q => {
      const matchYear = yearFilter === 'all' || getQuestionYear(q.id) === yearFilter;
      const matchSubject = subjectFilter === 'all' || q.subject === subjectFilter;
      return matchYear && matchSubject;
    });
  }, [exam, yearFilter, subjectFilter]);

  // PYQ grouped by subject (using filtered questions)
  const pyqBySubject = useMemo(() => {
    const g: Record<string, Question[]> = {};
    filteredPYQ.forEach(q => { if (!g[q.subject]) g[q.subject] = []; g[q.subject].push(q); });
    return g;
  }, [filteredPYQ]);

  // PYQ stats (filtered)
  const pyqStats = useMemo(() => {
    const total = filteredPYQ.length;
    const attempted = Object.keys(selectedAnswers).filter(k => filteredPYQ.some(q => q.id === k)).length;
    const revealed = Array.from(revealedAnswers).filter(k => filteredPYQ.some(q => q.id === k)).length;
    const correct = Object.entries(selectedAnswers).filter(([qid, ans]) => {
      const q = filteredPYQ.find(p => p.id === qid);
      return q && q.answer === ans;
    }).length;
    return { total, attempted, revealed, correct };
  }, [filteredPYQ, selectedAnswers, revealedAnswers]);

  // Syllabus stats
  const syllabusStats = useMemo(() => {
    if (!exam) return { sections: 0, topics: 0 };
    let sections = 0, topics = 0;
    Object.values(exam.syllabus).forEach(secs => {
      sections += secs.length;
      secs.forEach(s => { topics += s.topics.length; });
    });
    return { sections, topics };
  }, [exam]);

  if (!category || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm text-gray-500 font-medium">{ta ? 'தேர்வு கிடைக்கவில்லை' : 'Exam not found'}</p>
          <Button variant="link" className="mt-2 text-sm" onClick={() => navigate(-1)}>{ta ? 'பின் செல்' : 'Go back'}</Button>
        </div>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    const s = new Set(expandedSections);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpandedSections(s);
  };

  const handleAnswer = (qid: string, idx: number) => {
    if (!revealedAnswers.has(qid)) setSelectedAnswers(p => ({ ...p, [qid]: idx }));
  };

  const toggleReveal = (qid: string) => {
    const s = new Set(revealedAnswers);
    s.has(qid) ? s.delete(qid) : s.add(qid);
    setRevealedAnswers(s);
  };

  const resetPYQ = () => {
    setSelectedAnswers({});
    setRevealedAnswers(new Set());
  };

  const handleDownloadPDF = async (type: 'syllabus' | 'pyq') => {
    toast.loading(`Generating PDF...`);
    await generateGovtExamPDF({ type, exam, category, language: language as 'en' | 'ta' });
    toast.dismiss();
    toast.success('PDF downloaded!');
  };

  if (showMockTest) return <GovtMockTest exam={exam} category={category} onClose={() => setShowMockTest(false)} />;

  const tabs: { key: Tab; label: string; labelTa: string; icon: typeof BookOpen; count?: number }[] = [
    { key: 'overview', label: 'Overview', labelTa: 'கண்ணோட்டம்', icon: FileText },
    { key: 'syllabus', label: 'Syllabus', labelTa: 'பாடத்திட்டம்', icon: BookOpen, count: syllabusStats.topics },
    { key: 'pyq', label: 'PYQ', labelTa: 'PYQ', icon: Target, count: exam.pyq.length },
    { key: 'pattern', label: 'Pattern', labelTa: 'வடிவம்', icon: Award },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* ──── HEADER ──── */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 pt-3 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-[15px] font-bold truncate">{ta ? exam.nameTamil : exam.name}</h1>
              <p className="text-xs text-white/40">{ta ? exam.nameTamil : exam.name} • {category.icon} {ta ? category.nameTamil : category.name}</p>
            </div>
          </div>
          {/* Quick stats */}
          <div className="flex gap-2">
            {[
              { icon: '💰', value: exam.salary, label: ta ? 'சம்பளம்' : 'Salary' },
              { icon: '🎓', value: ta ? exam.qualificationTamil : exam.qualification, label: ta ? 'தகுதி' : 'Eligibility' },
              { icon: '👤', value: exam.age, label: ta ? 'வயது' : 'Age' },
            ].map((s, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-lg p-2 text-center border border-white/5">
                <p className="text-xs font-semibold text-white/80 truncate">{s.value}</p>
                <p className="text-xs text-white/30 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──── TAB BAR ──── */}
      <div className="container mx-auto px-4 -mt-0">
        <div className="flex bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-1 border border-gray-100 dark:border-slate-700 mb-4 mt-3">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === t.key ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md" : "text-gray-400"
            )}>
              <t.icon className="w-3.5 h-3.5" />
              <span>{ta ? t.labelTa : t.label}</span>
              {t.count !== undefined && t.count > 0 && <span className="text-xs opacity-60">{t.count}</span>}
            </button>
          ))}
        </div>

        {/* ════════════════════════════
             TAB: OVERVIEW
           ════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {/* Key info */}
            <Card><CardContent className="p-4 space-y-3">
              {[
                { label: ta ? 'தகுதி' : 'Qualification', value: ta ? exam.qualificationTamil : exam.qualification },
                { label: ta ? 'வயது வரம்பு' : 'Age Limit', value: exam.age },
                { label: ta ? 'சம்பளம்' : 'Salary', value: exam.salary, accent: true },
                { label: ta ? 'தேர்வு முறை' : 'Selection Process', value: ta ? exam.selectionProcessTamil : exam.selectionProcess },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-start gap-4">
                  <span className="text-xs text-gray-400 flex-shrink-0">{r.label}</span>
                  <span className={cn("text-xs font-semibold text-right", r.accent ? "text-emerald-600" : "text-gray-800 dark:text-gray-200")}>{r.value}</span>
                </div>
              ))}
            </CardContent></Card>

            {/* Posts */}
            {exam.posts && exam.posts.length > 0 && (
              <Card><CardContent className="p-4">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-2">{ta ? 'பதவிகள்' : 'Posts Available'}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(ta ? exam.postsTamil || exam.posts : exam.posts).map((p, i) => (
                    <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">{p}</span>
                  ))}
                </div>
              </CardContent></Card>
            )}

            {/* PYQ Year Distribution */}
            {exam.pyq.length > 10 && (
              <Card><CardContent className="p-4">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-500" />
                  {ta ? 'முந்தைய ஆண்டு வினாக்கள்' : 'Previous Year Questions'}
                  <span className="ml-auto text-emerald-600 font-extrabold text-sm">{exam.pyq.length}</span>
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {availableYears.filter(y => y !== 'all').map(year => {
                    const count = exam.pyq.filter(q => getQuestionYear(q.id) === year).length;
                    return (
                      <button key={year} onClick={() => { setActiveTab('pyq'); setYearFilter(year); }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 transition-colors">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{year}</span>
                        <span className="text-xs text-blue-500">({count})</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-1">
                  {availableSubjects.filter(s => s !== 'all').slice(0, 6).map(sub => (
                    <span key={sub} className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400">{sub}</span>
                  ))}
                  {availableSubjects.length > 7 && <span className="text-[10px] text-gray-400">+{availableSubjects.length - 7} more</span>}
                </div>
              </CardContent></Card>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button className="h-11 rounded-xl text-xs font-bold" onClick={() => setShowMockTest(true)}>
                <Play className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'மாக் டெஸ்ட்' : 'Mock Test'}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl text-xs font-bold" onClick={() => setActiveTab('pyq')}>
                <Target className="w-3.5 h-3.5 mr-1.5" /> PYQ ({exam.pyq.length})
              </Button>
              <Button variant="outline" className="h-11 rounded-xl text-xs font-bold" onClick={() => handleDownloadPDF('syllabus')}>
                <Download className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'பாடத்திட்டம் PDF' : 'Syllabus PDF'}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl text-xs font-bold" onClick={() => setActiveTab('syllabus')}>
                <BookOpen className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'பாடத்திட்டம்' : 'Syllabus'} ({syllabusStats.topics})
              </Button>
            </div>
          </div>
        )}

        {/* ════════════════════════════
             TAB: SYLLABUS
           ════════════════════════════ */}
        {activeTab === 'syllabus' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-400">{syllabusStats.sections} {ta ? 'பிரிவுகள்' : 'sections'} • {syllabusStats.topics} {ta ? 'தலைப்புகள்' : 'topics'}</p>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-lg" onClick={() => handleDownloadPDF('syllabus')}>
                <Download className="w-3.5 h-3.5" /> PDF
              </Button>
            </div>
            {Object.entries(exam.syllabus).length === 0 ? (
              <Card><CardContent className="p-10 text-center">
                <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">{ta ? 'பாடத்திட்டம் விரைவில் சேர்க்கப்படும்' : 'Syllabus coming soon'}</p>
              </CardContent></Card>
            ) : (
              Object.entries(exam.syllabus).map(([key, sections]) => (
                sections.map((section, sIdx) => (
                  <Card key={`${key}-${sIdx}`} className="overflow-hidden">
                    <button className="w-full p-3.5 text-left flex items-center gap-3" onClick={() => toggleSection(`${key}-${sIdx}`)}>
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">{section.title}</p>
                        <p className="text-xs text-gray-400">{section.topics.length} {ta ? 'தலைப்புகள்' : 'topics'}</p>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-gray-300 transition-transform", expandedSections.has(`${key}-${sIdx}`) && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {expandedSections.has(`${key}-${sIdx}`) && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-3.5 pb-3.5 border-t border-gray-50 dark:border-slate-800 pt-2.5">
                            <ul className="space-y-1.5">
                              {section.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                                  <span>{topic.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))
              ))
            )}
          </div>
        )}

        {/* ════════════════════════════
             TAB: PYQ (PREVIOUS YEAR QUESTIONS)
           ════════════════════════════ */}
        {activeTab === 'pyq' && (
          <div>
            {exam.pyq.length === 0 ? (
              /* ── Empty state ── */
              <Card><CardContent className="p-10 text-center">
                <Target className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-500 mb-1">{ta ? 'PYQ கேள்விகள் விரைவில்' : 'Previous Year Questions Coming Soon'}</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">{ta ? 'இந்த தேர்வுக்கான முந்தைய ஆண்டு கேள்விகளை விரைவில் சேர்ப்போம்.' : 'We are preparing previous year questions for this exam. Check back soon.'}</p>
              </CardContent></Card>
            ) : (
              <>
                {/* ══════ PRACTICE MODE SELECTOR ══════ */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-gray-100 dark:border-slate-700 mb-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setYearFilter('all'); setSubjectFilter('all'); setPyqMode('year'); }}
                      className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                        pyqMode === 'year' ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                      )}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {ta ? 'ஆண்டு வாரியாக' : 'Year-wise Papers'}
                    </button>
                    <button
                      onClick={() => { setYearFilter('all'); setSubjectFilter('all'); setPyqMode('subject'); }}
                      className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                        pyqMode === 'subject' ? "bg-purple-600 text-white shadow-sm" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                      )}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {ta ? 'பாடம் வாரியாக' : 'Subject-wise Practice'}
                    </button>
                  </div>
                </div>

                {/* ══════ MODE: YEAR-WISE PAPERS (like Testbook) ══════ */}
                {pyqMode === 'year' && yearFilter === 'all' && (
                  <div className="space-y-2.5 mb-3">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 px-1 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      {ta ? 'முந்தைய ஆண்டு வினாத்தாள்கள்' : 'Previous Year Question Papers'}
                      <span className="ml-auto text-gray-400">{availableYears.length - 1} {ta ? 'ஆண்டுகள்' : 'years'}</span>
                    </p>
                    {(exam as any).previousYearPapers && (exam as any).previousYearPapers.length > 0 ? (
                      (exam as any).previousYearPapers.map((paper: any) => {
                        const yearQuestions = exam.pyq.filter(q => {
                          const y = q.year || parseInt((q.id.match(/(\d{4})/) || ['0','0'])[1]);
                          return y === paper.year;
                        });
                        return (
                          <div key={paper.year} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                                    {exam.name.split('(')[0].trim()} — {paper.year}
                                  </h4>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {ta ? 'தாள் குறியீடு' : 'Paper Code'}: {paper.paperCode} • {paper.examDate}
                                  </p>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-lg">
                                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300">{yearQuestions.length}</p>
                                  <p className="text-[10px] text-blue-500">{ta ? 'கேள்விகள்' : 'Qs added'}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                                  <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{paper.totalQuestions}</p>
                                  <p className="text-[10px] text-gray-400">{ta ? 'கேள்விகள்' : 'Questions'}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                                  <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{paper.totalMarks}</p>
                                  <p className="text-[10px] text-gray-400">{ta ? 'மதிப்பெண்' : 'Marks'}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                                  <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{paper.duration}</p>
                                  <p className="text-[10px] text-gray-400">{ta ? 'நேரம்' : 'Duration'}</p>
                                </div>
                              </div>
                              {paper.parts && (
                                <div className="space-y-1 mb-3">
                                  {paper.parts.map((part: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-slate-700/30 rounded-lg px-3 py-1.5">
                                      <span className="text-gray-600 dark:text-gray-300">{ta ? part.nameTamil : part.name}</span>
                                      <span className="font-bold text-gray-500">{part.questionRange} • {part.marks} {ta ? 'மதிப்பெண்' : 'marks'}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Button size="sm" className="flex-1 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-9"
                                  onClick={() => { setYearFilter(String(paper.year)); }}
                                  disabled={yearQuestions.length === 0}
                                >
                                  <Play className="w-3.5 h-3.5 mr-1" />
                                  {yearQuestions.length > 0
                                    ? (ta ? `${yearQuestions.length} கேள்விகள் பயிற்சி` : `Practice ${yearQuestions.length} Questions`)
                                    : (ta ? 'விரைவில்' : 'Coming Soon')
                                  }
                                </Button>
                                {yearQuestions.length > 0 && (
                                  <Button variant="outline" size="sm" className="text-xs font-bold rounded-xl h-9" onClick={() => handleDownloadPDF('pyq')}>
                                    <Download className="w-3.5 h-3.5" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      /* Fallback: show year buttons if no paper metadata */
                      availableYears.filter(y => y !== 'all').map(year => {
                        const count = exam.pyq.filter(q => getQuestionYear(q.id) === year).length;
                        return (
                          <button key={year} onClick={() => setYearFilter(year)}
                            className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 text-left hover:border-blue-300 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-gray-800 dark:text-white">{exam.name.split('(')[0].trim()} — {year}</h4>
                                <p className="text-xs text-gray-400 mt-0.5">{count} {ta ? 'கேள்விகள்' : 'questions available'}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </button>
                        );
                      })
                    )}

                    {/* All Questions button */}
                    <button onClick={() => { setYearFilter('all'); setPyqMode('practice'); }}
                      className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-center"
                    >
                      <p className="text-xs font-bold text-white mb-0.5">{ta ? 'அனைத்து ஆண்டு கேள்விகளும்' : 'All Years Combined'}</p>
                      <p className="text-xs text-white/50">{exam.pyq.length} {ta ? 'கேள்விகள்' : 'questions'} — {ta ? 'அனைத்தையும் பயிற்சி செய்யுங்கள்' : 'Practice all questions together'}</p>
                    </button>
                  </div>
                )}

                {/* ══════ MODE: SUBJECT-WISE (like TNPSCMaster) ══════ */}
                {pyqMode === 'subject' && subjectFilter === 'all' && (
                  <div className="space-y-2 mb-3">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 px-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {ta ? 'பாடம் வாரியாக பயிற்சி' : 'Practice by Subject'}
                      <span className="ml-auto text-gray-400">{availableSubjects.length - 1} {ta ? 'பாடங்கள்' : 'subjects'}</span>
                    </p>
                    {availableSubjects.filter(s => s !== 'all').map(subject => {
                      const count = exam.pyq.filter(q => q.subject === subject).length;
                      const years = new Set(exam.pyq.filter(q => q.subject === subject).map(q => q.year || getQuestionYear(q.id)));
                      const subjectColors: Record<string, string> = {
                        'Indian Polity': 'from-blue-500 to-blue-600',
                        'History': 'from-amber-500 to-amber-600',
                        'Tamil Nadu History': 'from-orange-500 to-orange-600',
                        'Geography': 'from-green-500 to-green-600',
                        'General Science': 'from-teal-500 to-teal-600',
                        'General Knowledge': 'from-purple-500 to-purple-600',
                        'Aptitude': 'from-indigo-500 to-indigo-600',
                        'Indian Economy': 'from-emerald-500 to-emerald-600',
                        'Tamil Literature': 'from-rose-500 to-rose-600',
                        'Tamil Grammar': 'from-pink-500 to-pink-600',
                        'General English': 'from-cyan-500 to-cyan-600',
                      };
                      const gradient = subjectColors[subject] || 'from-gray-500 to-gray-600';

                      return (
                        <button key={subject} onClick={() => setSubjectFilter(subject)}
                          className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-3.5 text-left hover:border-purple-300 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0", gradient)}>
                              {count}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate">{subject}</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5">
                                {count} {ta ? 'கேள்விகள்' : 'questions'} • {ta ? 'ஆண்டுகள்' : 'from'} {Array.from(years).sort().join(', ')}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ══════ ACTIVE PRACTICE VIEW (when year or subject is selected) ══════ */}
                {(yearFilter !== 'all' || subjectFilter !== 'all' || pyqMode === 'practice') && (
                  <>
                    {/* Back + Header */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-gray-100 dark:border-slate-700 mb-3">
                      <div className="flex items-center justify-between mb-2.5">
                        <button onClick={() => { setYearFilter('all'); setSubjectFilter('all'); setPyqMode('year'); resetPYQ(); }}
                          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> {ta ? 'பின் செல்' : 'Back'}
                        </button>
                        <div className="flex gap-2">
                          {pyqStats.attempted > 0 && (
                            <button onClick={resetPYQ} className="text-xs font-semibold text-gray-400 hover:text-gray-600 flex items-center gap-1">
                              <RotateCcw className="w-3 h-3" /> {ta ? 'மீட்டமை' : 'Reset'}
                            </button>
                          )}
                          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 rounded-lg" onClick={() => handleDownloadPDF('pyq')}>
                            <Download className="w-3.5 h-3.5" /> PDF
                          </Button>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                        {yearFilter !== 'all' ? `${exam.name.split('(')[0].trim()} — ${yearFilter} Paper` :
                         subjectFilter !== 'all' ? subjectFilter :
                         (ta ? 'அனைத்து கேள்விகள்' : 'All Questions')}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        {filteredPYQ.length} {ta ? 'கேள்விகள்' : 'questions'}
                        {yearFilter !== 'all' && subjectFilter === 'all' && (
                          <> • {Object.keys(pyqBySubject).length} {ta ? 'பாடங்கள்' : 'subjects'}</>
                        )}
                      </p>

                      {/* Progress bar */}
                      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-green-600"
                          style={{ width: `${pyqStats.total > 0 ? (pyqStats.revealed / pyqStats.total) * 100 : 0}%` }}
                        />
                      </div>
                      {pyqStats.revealed > 0 && (
                        <div className="flex gap-3 mt-2">
                          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><CircleCheck className="w-3.5 h-3.5" /> {pyqStats.correct}</span>
                          <span className="text-xs text-red-500 font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {pyqStats.revealed - pyqStats.correct}</span>
                          <span className="text-xs text-gray-400">{pyqStats.total - pyqStats.revealed} {ta ? 'மீதம்' : 'left'}</span>
                          <span className="text-xs font-bold text-gray-600 ml-auto">
                            {pyqStats.revealed > 0 ? Math.round((pyqStats.correct / pyqStats.revealed) * 100) : 0}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Secondary filter (subject when year selected, year when subject selected) */}
                    {yearFilter !== 'all' && availableSubjects.length > 3 && pyqMode !== 'practice' && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {['all', ...new Set(exam.pyq.filter(q => {
                          const y = q.year || parseInt((q.id.match(/(\d{4})/) || ['0','0'])[1]);
                          return String(y) === yearFilter;
                        }).map(q => q.subject))].map(s => (
                          <button key={String(s)} onClick={() => setSubjectFilter(String(s))}
                            className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                              subjectFilter === String(s) ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-500"
                            )}
                          >{String(s) === 'all' ? (ta ? 'அனைத்தும்' : 'All') : String(s)}</button>
                        ))}
                      </div>
                    )}

                    {/* ── Questions rendered by subject groups ── */}
                    {Object.entries(pyqBySubject).map(([subject, questions]) => (
                      <div key={subject} className="mb-5">
                        <div className="flex items-center gap-2 mb-2.5 px-1">
                          <FileText className="w-3.5 h-3.5 text-indigo-500" />
                          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-200">{subject}</h3>
                          <span className="text-xs text-gray-400 ml-auto">{questions.length} {ta ? 'கேள்விகள்' : 'Qs'}</span>
                        </div>

                        <div className="space-y-2.5">
                          {questions.map((q, qIdx) => {
                            const isRevealed = revealedAnswers.has(q.id);
                            const selected = selectedAnswers[q.id];
                            const isCorrect = selected === q.answer;
                            const hasAnswered = selected !== undefined;
                            const qYear = q.year || getQuestionYear(q.id);

                            return (
                              <motion.div key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(qIdx * 0.02, 0.15) }}>
                                <div className={cn(
                                  "rounded-2xl border p-4 transition-all",
                                  isRevealed ? isCorrect
                                    ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900"
                                    : "border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900"
                                  : "border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/50"
                                )}>
                                  {/* Question header */}
                                  <div className="flex items-start gap-2.5 mb-3">
                                    <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-slate-700 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
                                      {qIdx + 1}
                                    </span>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                        {String(qYear) !== 'General' && String(qYear) !== '0' && (
                                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">{qYear}</span>
                                        )}
                                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded",
                                          q.difficulty === 'hard' ? "bg-red-100 text-red-600" : q.difficulty === 'medium' ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                                        )}>{q.difficulty === 'hard' ? (ta ? 'கடினம்' : 'Hard') : q.difficulty === 'medium' ? (ta ? 'நடுத்தரம்' : 'Medium') : (ta ? 'எளிது' : 'Easy')}</span>
                                      </div>
                                      <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                                        {ta && q.questionTamil ? q.questionTamil : q.question}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Options */}
                                  <div className="space-y-1.5 ml-8">
                                    {(ta && q.optionsTamil ? q.optionsTamil : q.options).map((opt, oIdx) => {
                                      const isSelected = selected === oIdx;
                                      const isAnswer = q.answer === oIdx;
                                      let style = "border-gray-100 dark:border-slate-700 hover:border-gray-300";
                                      if (isRevealed) {
                                        if (isAnswer) style = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
                                        else if (isSelected) style = "border-red-400 bg-red-50 dark:bg-red-900/30";
                                        else style = "border-gray-100 dark:border-slate-700 opacity-50";
                                      } else if (isSelected) {
                                        style = "border-blue-400 bg-blue-50 dark:bg-blue-900/20";
                                      }
                                      return (
                                        <button key={oIdx} onClick={() => handleAnswer(q.id, oIdx)} disabled={isRevealed}
                                          className={cn("w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center gap-2.5", style)}
                                        >
                                          <span className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                                            isRevealed && isAnswer ? "border-emerald-500 bg-emerald-500 text-white" :
                                            isRevealed && isSelected ? "border-red-500 bg-red-500 text-white" :
                                            isSelected ? "border-blue-500 bg-blue-500 text-white" :
                                            "border-gray-300 dark:border-gray-600 text-gray-400"
                                          )}>
                                            {isRevealed && isAnswer ? <Check className="w-3.5 h-3.5" /> :
                                             isRevealed && isSelected ? <X className="w-3.5 h-3.5" /> :
                                             String.fromCharCode(65 + oIdx)}
                                          </span>
                                          <span className="flex-1 text-gray-700 dark:text-gray-200">{opt}</span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Check answer button */}
                                  <div className="flex items-center justify-end mt-3 ml-8">
                                    <button onClick={() => toggleReveal(q.id)} disabled={!hasAnswered && !isRevealed}
                                      className={cn("text-xs font-semibold flex items-center gap-1 transition-colors",
                                        !hasAnswered && !isRevealed ? "text-gray-300 cursor-not-allowed" :
                                        isRevealed ? "text-gray-400 hover:text-gray-600" : "text-blue-500 hover:text-blue-700"
                                      )}>
                                      {isRevealed ? <><EyeOff className="w-3.5 h-3.5" /> {ta ? 'மறை' : 'Hide'}</> : <><Eye className="w-3.5 h-3.5" /> {ta ? 'விடை காண்' : 'Check Answer'}</>}
                                    </button>
                                  </div>

                                  {/* Explanation */}
                                  <AnimatePresence>
                                    {isRevealed && (q.explanation || q.explanationTamil) && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="mt-3 ml-8 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                                          <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                                            <span className="font-bold">{ta ? 'விளக்கம்: ' : 'Explanation: '}</span>
                                            {ta && q.explanationTamil ? q.explanationTamil : q.explanation}
                                          </p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Score card when all revealed */}
                    {pyqStats.revealed === pyqStats.total && pyqStats.total > 0 && (
                      <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-5 text-center text-white mb-3">
                        <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-80" />
                        <p className="text-lg font-bold">{pyqStats.correct}/{pyqStats.total}</p>
                        <p className="text-sm opacity-80 mb-1">{Math.round((pyqStats.correct / pyqStats.total) * 100)}% {ta ? 'மதிப்பெண்' : 'Score'}</p>
                        <p className="text-xs opacity-60 mb-3">
                          {pyqStats.correct === pyqStats.total ? (ta ? 'அருமை! சரியான மதிப்பெண்!' : 'Perfect Score! Excellent!') :
                           pyqStats.correct >= pyqStats.total * 0.7 ? (ta ? 'நல்ல முயற்சி!' : 'Great job!') :
                           (ta ? 'மேலும் பயிற்சி செய்யுங்கள்' : 'Keep practicing!')}
                        </p>
                        <Button size="sm" className="bg-white text-emerald-700 hover:bg-gray-100 text-xs font-bold rounded-xl" onClick={resetPYQ}>
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'மீண்டும் முயற்சிக்க' : 'Try Again'}
                        </Button>
                      </div>
                    )}

                    {/* Mock Test CTA */}
                    {pyqStats.revealed < pyqStats.total && (
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-center">
                        <p className="text-xs font-bold text-white mb-1">{ta ? 'முழு பயிற்சி தேர்வு எழுத விரும்புகிறீர்களா?' : 'Want a timed mock test?'}</p>
                        <p className="text-xs text-white/40 mb-3">{ta ? 'நேர அடிப்படையிலான தேர்வு' : 'Take a timed test with scoring'}</p>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold rounded-xl" onClick={() => setShowMockTest(true)}>
                          <Play className="w-3.5 h-3.5 mr-1.5" /> {ta ? 'மாக் டெஸ்ட்' : 'Start Mock Test'}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ════════════════════════════
             TAB: EXAM PATTERN
           ════════════════════════════ */}
        {activeTab === 'pattern' && (
          <div>
            {exam.examPattern && exam.examPattern.length > 0 ? (
              <div className="space-y-2.5">
                {exam.examPattern.map((p, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-3">{ta ? p.paperTamil : p.paper}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { label: ta ? 'மதிப்பெண்கள்' : 'Marks', value: p.marks, color: 'text-indigo-600' },
                          { label: ta ? 'நேரம்' : 'Duration', value: p.duration, color: 'text-amber-600' },
                          { label: ta ? 'கேள்விகள்' : 'Questions', value: p.questions, color: 'text-emerald-600' },
                        ].map((s, i) => (
                          <div key={i} className="text-center bg-gray-50 dark:bg-slate-800/50 rounded-xl p-2.5">
                            <p className={cn("text-sm font-extrabold", s.color)}>{s.value}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card><CardContent className="p-10 text-center">
                <Award className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">{ta ? 'தேர்வு வடிவம் விரைவில்' : 'Exam pattern coming soon'}</p>
              </CardContent></Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentExamDetail;
