import { CalendarClock, FileWarning, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// LATEST NEWS — landing page section
// ─────────────────────────────────────────────────────────────────────────────
// Placed high on the landing page (right after the hero) as top-priority
// content. Deliberately shows ONLY the most urgent, action-oriented updates
// for a TN 12th student following the May 8, 2026 results — the things with a
// real deadline attached. Softer items (emerging fields, proposed schemes) are
// intentionally left out so this section stays focused and scannable.
//
// When these dates pass, this section should be updated or removed — it is
// time-sensitive by design.
// ─────────────────────────────────────────────────────────────────────────────

interface NewsItem {
  icon: typeof CalendarClock;
  tag: string;
  tagTa: string;
  title: string;
  titleTa: string;
  detail: string;
  deadline: string;
  urgent?: boolean;
  /** Optional in-app route to a directly relevant tool */
  to?: string;
  toLabel?: string;
}

const newsItems: NewsItem[] = [
  {
    icon: CalendarClock,
    tag: 'TNEA Engineering',
    tagTa: 'TNEA பொறியியல்',
    title: 'TNEA registration is open — closes June 2',
    titleTa: 'TNEA பதிவு தொடங்கியது — ஜூன் 2 கடைசி',
    detail:
      'The Tamil Nadu Engineering Admissions portal is live. Register by June 2, with document upload closing June 6. Certificate verification runs June 8–20 and the rank list is expected June 29.',
    deadline: 'Register by Jun 2 · Documents by Jun 6',
    urgent: true,
    to: '/career-assessment/colleges/educutoff',
    toLabel: 'Check your cutoff & colleges',
  },
  {
    icon: FileWarning,
    tag: 'Supplementary Exam',
    tagTa: 'துணைத் தேர்வு',
    title: 'Supplementary exam registration: May 18 – June 2',
    titleTa: 'துணைத் தேர்வு பதிவு: மே 18 – ஜூன் 2',
    detail:
      'Students who need to clear papers can register from May 18 to June 2. The exams will be held from June 29 to July 7, 2026.',
    deadline: 'Apply May 18 – Jun 2 · Exams Jun 29 – Jul 7',
  },
  {
    icon: RotateCcw,
    tag: 'Revaluation',
    tagTa: 'மறுமதிப்பீடு',
    title: 'Revaluation & scanned scripts — apply on time',
    titleTa: 'மறுமதிப்பீடு & ஸ்கேன் செய்த விடைத்தாள்கள்',
    detail:
      'Applications for scanned answer scripts are open May 12–16. The window to apply for revaluation is June 5–8, 2026.',
    deadline: 'Scripts May 12–16 · Revaluation Jun 5–8',
  },
];

const LatestNews = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50/60 to-white py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex items-start gap-3 mb-6">
          <span className="relative flex h-3 w-3 mt-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Latest News &amp; Deadlines
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              சமீபத்திய செய்திகள் &amp; கடைசி தேதிகள் — TN +2 results announced May 8, 2026
            </p>
          </div>
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`relative flex flex-col rounded-2xl border-2 p-5 transition-all ${
                  item.urgent
                    ? 'border-red-200 bg-red-50/50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {item.urgent && (
                  <span className="absolute -top-2.5 left-5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    Act now
                  </span>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.urgent
                        ? 'bg-red-100 text-red-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight ${
                        item.urgent ? 'text-red-700' : 'text-emerald-700'
                      }`}
                    >
                      {item.tag}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-tight">
                      {item.tagTa}
                    </p>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5 mb-2">
                  {item.titleTa}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed flex-1">
                  {item.detail}
                </p>

                {/* Deadline chip */}
                <div
                  className={`mt-3 inline-flex items-start gap-1.5 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 ${
                    item.urgent
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <CalendarClock className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                  <span>{item.deadline}</span>
                </div>

                {/* Optional in-app action */}
                {item.to && item.toLabel && (
                  <Link
                    to={item.to}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-800 hover:gap-1.5 transition-all"
                  >
                    {item.toLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>

        {/* Context + honesty note */}
        <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
          Tamil Nadu recorded a 95.20% pass rate this year. Dates above are based
          on official announcements following the May 8, 2026 results — always
          confirm on the official TNEA / DGE portals before acting, as schedules
          can change.
        </p>
      </div>
    </section>
  );
};

export default LatestNews;
