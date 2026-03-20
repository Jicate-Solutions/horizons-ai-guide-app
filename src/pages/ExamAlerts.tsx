import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, AlertTriangle, Calendar, Check, ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// ═══ DATE-SPECIFIC EVENTS ═══
// Each event is a specific upcoming action students need to know about
interface ExamEvent {
  id: string;
  examName: string;
  emoji: string;
  eventType: 'registration' | 'exam' | 'result' | 'counselling';
  description: string;
  date: string; // approximate date for sorting (YYYY-MM-DD)
  displayDate: string; // human readable
  category: 'engineering' | 'medical' | 'law' | 'management' | 'agriculture' | 'design';
  important?: boolean;
  website?: string;
}

const allEvents: ExamEvent[] = [
  // ═══ MARCH 2026 ═══
  { id: 'icar-reg', examName: 'ICAR AIEEA', emoji: '🌾', eventType: 'registration', description: 'Registration opens for agriculture entrance', date: '2026-03-01', displayDate: 'March 2026', category: 'agriculture' },
  { id: 'jee1-result', examName: 'JEE Main Session 1', emoji: '⚙️', eventType: 'result', description: 'Session 1 results expected', date: '2026-03-15', displayDate: 'Mid March 2026', category: 'engineering' },

  // ═══ APRIL 2026 ═══
  { id: 'tndalu-reg', examName: 'TNDALU (TN Law)', emoji: '⚖️', eventType: 'registration', description: 'TN Law College merit admission opens — no exam needed!', date: '2026-04-01', displayDate: 'April 2026', category: 'law', important: true, website: 'https://tndalu.ac.in' },
  { id: 'jee2-exam', examName: 'JEE Main Session 2', emoji: '⚙️', eventType: 'exam', description: 'Session 2 exam: April 2-9, 2026', date: '2026-04-02', displayDate: 'April 2-9, 2026', category: 'engineering', important: true },
  { id: 'bitsat-reg', examName: 'BITSAT', emoji: '⚙️', eventType: 'registration', description: 'Last date to register (extended to March 19)', date: '2026-04-01', displayDate: 'Registration open', category: 'engineering', website: 'https://www.bitsadmission.com' },
  { id: 'aiims-para-reg', examName: 'AIIMS Paramedical', emoji: '🏥', eventType: 'registration', description: 'Registration for AIIMS paramedical courses', date: '2026-04-01', displayDate: 'April 2026', category: 'medical' },
  { id: 'aiims-nurse-reg', examName: 'AIIMS B.Sc Nursing', emoji: '🏥', eventType: 'registration', description: 'Registration for AIIMS nursing entrance', date: '2026-04-15', displayDate: 'April 2026', category: 'medical' },
  { id: 'kcet-exam', examName: 'KCET', emoji: '⚙️', eventType: 'exam', description: 'Karnataka CET exam', date: '2026-04-15', displayDate: 'April 2026', category: 'engineering' },
  { id: 'wbjee-exam', examName: 'WBJEE', emoji: '⚙️', eventType: 'exam', description: 'West Bengal JEE exam', date: '2026-04-20', displayDate: 'April 2026', category: 'engineering' },
  { id: 'bitsat1-exam', examName: 'BITSAT Session 1', emoji: '⚙️', eventType: 'exam', description: 'BITS entrance: April 15-17', date: '2026-04-15', displayDate: 'April 15-17, 2026', category: 'engineering', important: true },
  { id: 'mhtcet-exam', examName: 'MHT CET', emoji: '⚙️', eventType: 'exam', description: 'Maharashtra CET exam', date: '2026-04-20', displayDate: 'April-May 2026', category: 'engineering' },
  { id: 'srmjeee1-exam', examName: 'SRMJEEE Phase 1', emoji: '⚙️', eventType: 'exam', description: 'SRM entrance: April 23-28', date: '2026-04-23', displayDate: 'April 23-28, 2026', category: 'engineering', important: true },
  { id: 'viteee-exam', examName: 'VITEEE', emoji: '⚙️', eventType: 'exam', description: 'VIT entrance: April 28 - May 3', date: '2026-04-28', displayDate: 'April 28 - May 3, 2026', category: 'engineering', important: true },

  // ═══ MAY 2026 ═══
  { id: 'neet-exam', examName: 'NEET UG 2026', emoji: '🏥', eventType: 'exam', description: '⭐ THE medical entrance exam — May 3, 2026', date: '2026-05-03', displayDate: 'May 3, 2026', category: 'medical', important: true, website: 'https://neet.nta.nic.in' },
  { id: 'tnea-reg', examName: 'TNEA', emoji: '⚙️', eventType: 'registration', description: 'TN Engineering Admissions registration opens', date: '2026-05-01', displayDate: 'May 2026', category: 'engineering', important: true, website: 'https://www.tneaonline.org' },
  { id: 'tnau-reg', examName: 'TNAU', emoji: '🌾', eventType: 'registration', description: 'TN Agriculture University admission opens', date: '2026-05-01', displayDate: 'May 2026', category: 'agriculture', important: true },
  { id: 'jee-adv-reg', examName: 'JEE Advanced', emoji: '⚙️', eventType: 'registration', description: 'Registration for IIT entrance (top 2.5L from JEE Main)', date: '2026-05-01', displayDate: 'May 2026', category: 'engineering' },
  { id: 'jee-adv-exam', examName: 'JEE Advanced', emoji: '⚙️', eventType: 'exam', description: 'IIT entrance exam', date: '2026-05-18', displayDate: 'May 2026', category: 'engineering', important: true },
  { id: 'cuet-exam', examName: 'CUET-UG', emoji: '💼', eventType: 'exam', description: 'Central University entrance (DU, JNU, BHU)', date: '2026-05-15', displayDate: 'May 2026', category: 'management', important: true },
  { id: 'nchmct-exam', examName: 'NCHMCT JEE', emoji: '🏨', eventType: 'exam', description: 'Hotel Management entrance (IHM Chennai)', date: '2026-05-10', displayDate: 'May 2026', category: 'management' },
  { id: 'ipm-exam', examName: 'IPM (IIM)', emoji: '💼', eventType: 'exam', description: 'IIM integrated programme entrance', date: '2026-05-15', displayDate: 'May 2026', category: 'management' },
  { id: 'slat-exam', examName: 'SLAT (Symbiosis Law)', emoji: '⚖️', eventType: 'exam', description: 'Symbiosis Law School entrance', date: '2026-05-10', displayDate: 'May 2026', category: 'law' },
  { id: 'ca-may', examName: 'CA Foundation', emoji: '💼', eventType: 'exam', description: 'CA Foundation exam (May session)', date: '2026-05-15', displayDate: 'May 2026', category: 'management' },
  { id: 'bitsat2-exam', examName: 'BITSAT Session 2', emoji: '⚙️', eventType: 'exam', description: 'BITS entrance session 2: May 24-26', date: '2026-05-24', displayDate: 'May 24-26, 2026', category: 'engineering' },
  { id: 'bba-reg', examName: 'BBA/BCA/B.Com (TN)', emoji: '💼', eventType: 'registration', description: 'TN college direct admission opens', date: '2026-05-15', displayDate: 'May-June 2026', category: 'management' },
  { id: 'ap-eamcet-exam', examName: 'AP EAMCET', emoji: '⚙️', eventType: 'exam', description: 'Andhra Pradesh entrance exam', date: '2026-05-20', displayDate: 'May 2026', category: 'engineering' },

  // ═══ JUNE 2026 ═══
  { id: 'neet-result', examName: 'NEET UG', emoji: '🏥', eventType: 'result', description: 'NEET results declaration', date: '2026-06-10', displayDate: 'June 2026', category: 'medical', important: true },
  { id: 'jee-adv-result', examName: 'JEE Advanced', emoji: '⚙️', eventType: 'result', description: 'IIT entrance results', date: '2026-06-15', displayDate: 'June 2026', category: 'engineering' },
  { id: 'tn-neet-reg', examName: 'TN NEET Counselling', emoji: '🏥', eventType: 'registration', description: 'TN Medical counselling registration — 85% state quota!', date: '2026-06-20', displayDate: 'June 2026', category: 'medical', important: true },
  { id: 'tanuvas-reg', examName: 'TANUVAS', emoji: '🌾', eventType: 'registration', description: 'TN Veterinary admission opens', date: '2026-06-15', displayDate: 'June 2026', category: 'agriculture' },
  { id: 'nursing-reg', examName: 'B.Sc Nursing (TN)', emoji: '🏥', eventType: 'registration', description: 'TN nursing college admission opens', date: '2026-06-15', displayDate: 'June 2026', category: 'medical' },
  { id: 'pharmacy-reg', examName: 'B.Pharm (TN)', emoji: '🏥', eventType: 'registration', description: 'TN pharmacy college admission opens', date: '2026-06-15', displayDate: 'June 2026', category: 'medical' },
  { id: 'allied-reg', examName: 'Allied Health (TN)', emoji: '🏥', eventType: 'registration', description: 'BPT/BOT/BMLT admission opens in TN', date: '2026-06-15', displayDate: 'June 2026', category: 'medical' },
  { id: 'icar-exam', examName: 'ICAR AIEEA', emoji: '🌾', eventType: 'exam', description: 'National agriculture entrance exam', date: '2026-06-15', displayDate: 'June 2026', category: 'agriculture' },
  { id: 'aiims-nurse-exam', examName: 'AIIMS B.Sc Nursing', emoji: '🏥', eventType: 'exam', description: 'AIIMS nursing entrance exam', date: '2026-06-15', displayDate: 'June 2026', category: 'medical' },
  { id: 'srmjeee2-exam', examName: 'SRMJEEE Phase 2', emoji: '⚙️', eventType: 'exam', description: 'SRM entrance phase 2: June 10-15', date: '2026-06-10', displayDate: 'June 10-15, 2026', category: 'engineering' },

  // ═══ JULY 2026 ═══
  { id: 'tnea-result', examName: 'TNEA Counselling', emoji: '⚙️', eventType: 'counselling', description: 'TN Engineering counselling begins!', date: '2026-07-01', displayDate: 'July 2026', category: 'engineering', important: true },
  { id: 'tn-neet-counsel', examName: 'TN Medical Counselling', emoji: '🏥', eventType: 'counselling', description: 'TN Medical seat allotment — fill preferences carefully!', date: '2026-07-15', displayDate: 'July-Aug 2026', category: 'medical', important: true },
  { id: 'tnau-counsel', examName: 'TNAU Counselling', emoji: '🌾', eventType: 'counselling', description: 'Agriculture counselling', date: '2026-07-10', displayDate: 'July 2026', category: 'agriculture' },
  { id: 'aiims-para-exam', examName: 'AIIMS Paramedical', emoji: '🏥', eventType: 'exam', description: 'AIIMS Paramedical entrance: July 4', date: '2026-07-04', displayDate: 'July 4, 2026', category: 'medical' },

  // ═══ AUG-DEC 2026 ═══
  { id: 'clat-reg', examName: 'CLAT 2027', emoji: '⚖️', eventType: 'registration', description: 'CLAT registration opens for 26 NLUs', date: '2026-08-01', displayDate: 'Aug-Nov 2026', category: 'law', important: true, website: 'https://consortiumofnlus.ac.in' },
  { id: 'ailet-reg', examName: 'AILET (NLU Delhi)', emoji: '⚖️', eventType: 'registration', description: 'NLU Delhi entrance registration', date: '2026-09-01', displayDate: 'Sep-Nov 2026', category: 'law' },
  { id: 'ca-nov', examName: 'CA Foundation', emoji: '💼', eventType: 'exam', description: 'CA Foundation exam (November session)', date: '2026-11-15', displayDate: 'November 2026', category: 'management' },
  { id: 'clat-exam', examName: 'CLAT 2027', emoji: '⚖️', eventType: 'exam', description: 'CLAT exam for 26 NLUs: December 6', date: '2026-12-06', displayDate: 'December 6, 2026', category: 'law', important: true },
  { id: 'ailet-exam', examName: 'AILET', emoji: '⚖️', eventType: 'exam', description: 'NLU Delhi entrance exam', date: '2026-12-15', displayDate: 'December 2026', category: 'law' },
];

const EVENT_TYPE_CONFIG = {
  registration: { label: 'Registration', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50', borderColor: 'border-blue-200', icon: '📝' },
  exam: { label: 'Exam', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50', borderColor: 'border-red-200', icon: '📋' },
  result: { label: 'Result', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', borderColor: 'border-emerald-200', icon: '📊' },
  counselling: { label: 'Counselling', color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-50', borderColor: 'border-purple-200', icon: '🎓' },
};

const CAT_FILTER = [
  { id: 'all', label: 'All', emoji: '📅' },
  { id: 'engineering', label: 'Engineering', emoji: '⚙️' },
  { id: 'medical', label: 'Medical', emoji: '🏥' },
  { id: 'law', label: 'Law', emoji: '⚖️' },
  { id: 'management', label: 'Management', emoji: '💼' },
  { id: 'agriculture', label: 'Agriculture', emoji: '🌾' },
];

const STORAGE_KEY = 'vzk_exam_alerts_filter';

const ExamAlerts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFilter(saved);
    } catch {}
  }, []);

  const setFilterAndSave = (f: string) => {
    setFilter(f);
    try { localStorage.setItem(STORAGE_KEY, f); } catch {}
  };

  const today = new Date('2026-03-20'); // Current date

  const filteredEvents = useMemo(() => {
    let events = allEvents.filter(e => new Date(e.date) >= today);
    if (filter !== 'all') events = events.filter(e => e.category === filter);
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filter]);

  // Group by month
  const months = useMemo(() => {
    const groups: Record<string, ExamEvent[]> = {};
    filteredEvents.forEach(e => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return Object.entries(groups).map(([key, events]) => ({
      key,
      label: new Date(key + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      events,
    }));
  }, [filteredEvents]);

  const getDaysUntil = (dateStr: string): number => {
    return Math.ceil((new Date(dateStr).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getUrgency = (dateStr: string): { label: string; color: string } | null => {
    const days = getDaysUntil(dateStr);
    if (days <= 0) return { label: 'TODAY', color: 'bg-red-600 text-white' };
    if (days <= 3) return { label: `${days}d left`, color: 'bg-red-500 text-white animate-pulse' };
    if (days <= 7) return { label: `${days}d left`, color: 'bg-red-100 text-red-700' };
    if (days <= 14) return { label: `${days}d left`, color: 'bg-amber-100 text-amber-700' };
    if (days <= 30) return { label: `${days}d`, color: 'bg-gray-100 text-gray-600' };
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Title */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-2xl shadow-lg">🔔</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Exam Alerts 2026</h1>
              <p className="text-xs text-gray-500">Never miss a deadline. {filteredEvents.length} upcoming events.</p>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 mt-3 -mx-1 px-1">
            {CAT_FILTER.map(c => (
              <button key={c.id} onClick={() => setFilterAndSave(c.id)}
                className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border-2",
                  filter === c.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400')}>
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-5">
          {months.map((month) => (
            <div key={month.key}>
              {/* Month header */}
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-bold text-gray-700">{month.label}</h2>
                <span className="text-xs text-gray-400">{month.events.length} events</span>
              </div>

              {/* Events */}
              <div className="space-y-2 ml-2 border-l-2 border-gray-200 pl-4">
                {month.events.map((event) => {
                  const cfg = EVENT_TYPE_CONFIG[event.eventType];
                  const urgency = getUrgency(event.date);

                  return (
                    <div key={event.id}
                      className={cn("bg-white rounded-xl p-4 border-2 transition-all",
                        event.important ? `${cfg.borderColor} shadow-sm` : 'border-gray-100',
                        event.website && 'cursor-pointer hover:shadow-md'
                      )}
                      onClick={() => event.website && window.open(event.website, '_blank')}>

                      <div className="flex items-start gap-3">
                        {/* Event type dot */}
                        <div className="relative mt-1">
                          <div className={cn("w-3 h-3 rounded-full", cfg.color)} />
                          {/* Timeline connector dot */}
                          <div className="absolute -left-[22px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-300" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm">{event.emoji}</span>
                            <p className="text-sm font-bold text-gray-900">{event.examName}</p>
                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", cfg.bgLight, cfg.textColor)}>
                              {cfg.icon} {cfg.label}
                            </span>
                            {urgency && (
                              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", urgency.color)}>
                                {urgency.label}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{event.description}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{event.displayDate}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm text-gray-500">No upcoming events for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamAlerts;
