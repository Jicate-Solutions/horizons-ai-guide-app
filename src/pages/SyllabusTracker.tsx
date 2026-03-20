import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen, RotateCcw, Clock, ChevronRight, AlertTriangle } from 'lucide-react';
import { syllabusData, type ExamSyllabus } from '@/data/syllabusData';
import { cn } from '@/lib/utils';

type ChapterStatus = 'not_started' | 'in_progress' | 'completed' | 'revised';

interface ChapterProgress {
  status: ChapterStatus;
  lastUpdated: string; // ISO date
}

const STATUS_CONFIG: Record<ChapterStatus, { label: string; short: string; color: string; bg: string; border: string; icon: string; next: ChapterStatus }> = {
  not_started: { label: 'Not Started', short: '—', color: 'text-gray-400', bg: 'bg-gray-100', border: 'border-gray-200', icon: '', next: 'in_progress' },
  in_progress: { label: 'In Progress', short: '📖', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-300', icon: '📖', next: 'completed' },
  completed: { label: 'Completed', short: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-300', icon: '✅', next: 'revised' },
  revised: { label: 'Revised', short: '⭐', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-300', icon: '⭐', next: 'not_started' },
};

const STORAGE_KEY = 'vzk_syllabus_tracker';
const EXAM_KEY = 'vzk_selected_exam';

const SyllabusTracker = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, ChapterProgress>>({});

  // Load saved state
  useEffect(() => {
    try {
      const savedExam = localStorage.getItem(EXAM_KEY);
      if (savedExam && syllabusData[savedExam]) setSelectedExam(savedExam);
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) setProgress(JSON.parse(savedProgress));
    } catch {}
  }, []);

  // Save progress
  const saveProgress = useCallback((newProgress: Record<string, ChapterProgress>) => {
    setProgress(newProgress);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress)); } catch {}
  }, []);

  const selectExam = (examId: string) => {
    setSelectedExam(examId);
    setOpenSubject(null);
    try { localStorage.setItem(EXAM_KEY, examId); } catch {}
  };

  const toggleChapter = (chapterId: string) => {
    const current = progress[chapterId]?.status || 'not_started';
    const next = STATUS_CONFIG[current].next;
    saveProgress({
      ...progress,
      [chapterId]: { status: next, lastUpdated: new Date().toISOString() },
    });
  };

  const resetAll = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      saveProgress({});
    }
  };

  const exam = selectedExam ? syllabusData[selectedExam] : null;

  // Calculate stats
  const stats = useMemo(() => {
    if (!exam) return null;
    let total = 0, notStarted = 0, inProgress = 0, completed = 0, revised = 0, needsRevision = 0;
    const now = Date.now();
    const fourteenDays = 14 * 24 * 60 * 60 * 1000;

    exam.subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        total++;
        const s = progress[ch.id]?.status || 'not_started';
        if (s === 'not_started') notStarted++;
        else if (s === 'in_progress') inProgress++;
        else if (s === 'completed') {
          completed++;
          const updated = progress[ch.id]?.lastUpdated;
          if (updated && now - new Date(updated).getTime() > fourteenDays) needsRevision++;
        }
        else if (s === 'revised') revised++;
      });
    });

    const done = completed + revised;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, notStarted, inProgress, completed, revised, needsRevision, done, pct };
  }, [exam, progress]);

  // Subject stats
  const getSubjectStats = (subjectId: string) => {
    if (!exam) return { total: 0, done: 0, pct: 0 };
    const sub = exam.subjects.find(s => s.id === subjectId);
    if (!sub) return { total: 0, done: 0, pct: 0 };
    let total = sub.chapters.length;
    let done = sub.chapters.filter(ch => {
      const s = progress[ch.id]?.status;
      return s === 'completed' || s === 'revised';
    }).length;
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  // Check if chapter needs revision (completed > 14 days ago, not revised)
  const needsRevision = (chapterId: string): boolean => {
    const p = progress[chapterId];
    if (!p || p.status !== 'completed') return false;
    return Date.now() - new Date(p.lastUpdated).getTime() > 14 * 24 * 60 * 60 * 1000;
  };

  // ═══ EXAM SELECTION SCREEN ═══
  if (!selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="max-w-lg mx-auto space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-3xl shadow-lg mb-4">📚</div>
            <h1 className="text-2xl font-bold text-gray-900">Syllabus Tracker</h1>
            <p className="text-sm text-gray-500 mt-1">Track every chapter. Know exactly where you stand.</p>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">Which exam are you preparing for?</p>
            <div className="space-y-3">
              {Object.values(syllabusData).map((ex) => (
                <button key={ex.examId} onClick={() => selectExam(ex.examId)}
                  className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-emerald-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                  <span className="text-3xl">{ex.emoji}</span>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900">{ex.examName}</p>
                    <p className="text-xs text-gray-500">{ex.totalChapters} chapters across {ex.subjects.length} subjects</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══ TRACKER DASHBOARD ═══
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => { setSelectedExam(null); setOpenSubject(null); }} className="text-xs text-gray-400 hover:text-gray-600">Change Exam</button>
            <button onClick={resetAll} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Exam title + overall progress */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{exam!.emoji}</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{exam!.examName}</h1>
              <p className="text-xs text-gray-500">{stats?.total} chapters total</p>
            </div>
          </div>

          {/* Big progress bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-600">Overall Progress</span>
              <span className="text-lg font-black text-emerald-600">{stats?.pct}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500" style={{ width: `${stats?.pct || 0}%` }} />
            </div>
          </div>

          {/* Status counts */}
          <div className="grid grid-cols-4 gap-2">
            {([
              { label: 'Not Started', val: stats?.notStarted || 0, color: 'text-gray-500', bg: 'bg-gray-50' },
              { label: 'In Progress', val: stats?.inProgress || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Completed', val: stats?.completed || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Revised', val: stats?.revised || 0, color: 'text-amber-600', bg: 'bg-amber-50' },
            ] as const).map((s) => (
              <div key={s.label} className={cn("rounded-xl p-2 text-center", s.bg)}>
                <p className={cn("text-lg font-bold", s.color)}>{s.val}</p>
                <p className="text-[9px] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Revision alert */}
          {(stats?.needsRevision || 0) > 0 && (
            <div className="mt-3 bg-red-50 rounded-xl p-3 border border-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-700"><strong>{stats?.needsRevision} chapters</strong> completed 14+ days ago — needs revision!</p>
            </div>
          )}
        </div>

        {/* Subjects */}
        <div className="space-y-2">
          {exam!.subjects.map((sub) => {
            const ss = getSubjectStats(sub.id);
            const isOpen = openSubject === sub.id;

            return (
              <div key={sub.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Subject header */}
                <button onClick={() => setOpenSubject(isOpen ? null : sub.id)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-sm", sub.color)}>
                    {sub.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                      <p className="text-xs font-bold text-gray-500">{ss.done}/{ss.total}</p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-500", sub.color)} style={{ width: `${ss.pct}%` }} />
                    </div>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-90")} />
                </button>

                {/* Chapters list */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3">
                    {/* Status legend */}
                    <div className="flex items-center justify-center gap-4 py-2 text-[10px] text-gray-400">
                      <span>Tap to change status:</span>
                      <span>📖 In Progress</span>
                      <span>✅ Done</span>
                      <span>⭐ Revised</span>
                    </div>

                    <div className="space-y-1">
                      {sub.chapters.map((ch) => {
                        const status = progress[ch.id]?.status || 'not_started';
                        const cfg = STATUS_CONFIG[status];
                        const revFlag = needsRevision(ch.id);

                        return (
                          <button key={ch.id} onClick={() => toggleChapter(ch.id)}
                            className={cn("w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left active:scale-[0.98]", cfg.bg, cfg.border)}>

                            {/* Status icon */}
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border-2 flex-shrink-0", 
                              status === 'not_started' ? 'bg-gray-100 border-gray-300 text-gray-400' :
                              status === 'in_progress' ? 'bg-blue-100 border-blue-400 text-blue-600' :
                              status === 'completed' ? 'bg-emerald-100 border-emerald-400 text-emerald-600' :
                              'bg-amber-100 border-amber-400 text-amber-600'
                            )}>
                              {status === 'not_started' ? '—' : cfg.icon}
                            </div>

                            {/* Chapter info */}
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-medium", status === 'not_started' ? 'text-gray-700' : 'text-gray-900')}>
                                {ch.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                {ch.class && <span className="text-[10px] text-gray-400">Class {ch.class}</span>}
                                {ch.priority === 'high' && <span className="text-[10px] font-bold text-red-500">🔴 High Priority</span>}
                                {ch.expectedQuestions && <span className="text-[10px] text-gray-400">~{ch.expectedQuestions}Q</span>}
                                {revFlag && <span className="text-[10px] font-bold text-red-500 flex items-center gap-0.5"><AlertTriangle className="w-3 h-3" /> Revise!</span>}
                              </div>
                            </div>

                            {/* Tap hint */}
                            <span className="text-[9px] text-gray-300 flex-shrink-0">tap</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SyllabusTracker;
