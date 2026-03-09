import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Calendar, ExternalLink, Bookmark, ChevronRight,
  GraduationCap, X, Shield, Train, FileText, Landmark,
  Flag, Users, Banknote, Clock, Target
} from 'lucide-react';
import { governmentExams } from './governmentExamsData';
import { CategoryType, StatusType } from './types';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

/* ─── category config ─── */
const CAT: Record<string, {
  icon: typeof Shield; label: string; ta: string;
  pill: string; pillActive: string; cardIcon: string; cardBg: string; bar: string;
}> = {
  defence: { icon: Shield, label: 'Defence', ta: 'பாதுகாப்பு',
    pill: 'text-emerald-700 border-emerald-200 hover:bg-emerald-50', pillActive: 'bg-emerald-600 text-white border-emerald-600',
    cardIcon: 'text-emerald-600', cardBg: 'bg-emerald-50', bar: 'bg-emerald-500' },
  railway: { icon: Train, label: 'Railway', ta: 'ரயில்வே',
    pill: 'text-blue-700 border-blue-200 hover:bg-blue-50', pillActive: 'bg-blue-600 text-white border-blue-600',
    cardIcon: 'text-blue-600', cardBg: 'bg-blue-50', bar: 'bg-blue-500' },
  ssc: { icon: FileText, label: 'SSC', ta: 'SSC',
    pill: 'text-violet-700 border-violet-200 hover:bg-violet-50', pillActive: 'bg-violet-600 text-white border-violet-600',
    cardIcon: 'text-violet-600', cardBg: 'bg-violet-50', bar: 'bg-violet-500' },
  state: { icon: Landmark, label: 'TN State', ta: 'தமிழ்நாடு',
    pill: 'text-rose-700 border-rose-200 hover:bg-rose-50', pillActive: 'bg-rose-600 text-white border-rose-600',
    cardIcon: 'text-rose-600', cardBg: 'bg-rose-50', bar: 'bg-rose-500' },
  central: { icon: Flag, label: 'Central Govt', ta: 'மத்திய அரசு',
    pill: 'text-amber-700 border-amber-200 hover:bg-amber-50', pillActive: 'bg-amber-600 text-white border-amber-600',
    cardIcon: 'text-amber-600', cardBg: 'bg-amber-50', bar: 'bg-amber-500' },
};

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

export const GovernmentJobs = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const ta = language === 'ta';

  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<CategoryType>('all');
  const [activeStatus, setActiveStatus] = useState<StatusType>('all');
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => setSavedSet(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s;
  });

  /* computed */
  const filtered = useMemo(() => governmentExams.filter(e => {
    if (search) { const q = search.toLowerCase(); if (!e.name.toLowerCase().includes(q) && !e.nameTamil.includes(q) && !e.description.toLowerCase().includes(q)) return false; }
    if (activeCat !== 'all' && e.category !== activeCat) return false;
    if (activeStatus !== 'all' && e.applicationStatus !== activeStatus) return false;
    return true;
  }), [search, activeCat, activeStatus]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    governmentExams.forEach(e => { c[e.category] = (c[e.category] || 0) + 1; });
    return c;
  }, []);

  const openCount = useMemo(() => governmentExams.filter(e => e.applicationStatus === 'open').length, []);
  const topSalary = useMemo(() => Math.max(...governmentExams.map(e => e.salaryMax)), []);

  return (
    <div className="space-y-5">

      {/* ══════════════════════ HERO BANNER ══════════════════════ */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        {/* glow accent */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[15px] font-extrabold text-white leading-tight tracking-tight">
                {ta ? 'அரசு வேலை வாய்ப்புகள்' : 'Government Job Opportunities'}
              </h2>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {ta ? '12ஆம் வகுப்பு தகுதி • பட்டம் தேவையில்லை' : '12th Pass Eligible • No Degree Required'}
              </p>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { val: governmentExams.length, label: ta ? 'தேர்வுகள்' : 'Exams', color: 'text-white' },
              { val: openCount, label: ta ? 'திறப்பு' : 'Open Now', color: 'text-emerald-400' },
              { val: 5, label: ta ? 'பிரிவுகள்' : 'Sectors', color: 'text-blue-400' },
              { val: fmt(topSalary), label: ta ? 'அதிகபட்சம்' : 'Top Salary', color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl py-2.5 px-1 text-center">
                <div className={cn("text-[17px] font-black leading-none", s.color)}>{s.val}</div>
                <div className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ CATEGORY PILLS ══════════════════════ */}
      <div className="overflow-x-auto -mx-3 px-3 pb-0.5">
        <div className="flex gap-2 min-w-max">
          {/* All pill */}
          <button onClick={() => setActiveCat('all')} className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap",
            activeCat === 'all'
              ? "bg-slate-800 text-white border-slate-800 shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          )}>
            {ta ? 'அனைத்தும்' : 'All'} <span className="ml-1 opacity-50">{governmentExams.length}</span>
          </button>

          {Object.entries(CAT).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const active = activeCat === key;
            return (
              <button key={key} onClick={() => setActiveCat(key as CategoryType)} className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap",
                active ? cfg.pillActive + " shadow-md" : "bg-white " + cfg.pill
              )}>
                <Icon className="w-3.5 h-3.5" />
                {ta ? cfg.ta : cfg.label}
                <span className="opacity-50 text-[10px]">{counts[key] || 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════ SEARCH + STATUS ══════════════════════ */}
      <div className="flex gap-2 items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={ta ? 'தேர்வைத் தேடுங்கள்...' : 'Search exams...'}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3 h-3 text-slate-300 hover:text-slate-500" />
            </button>
          )}
        </div>

        {/* Status chips */}
        <div className="flex bg-slate-100 rounded-xl p-0.5 shrink-0">
          {([
            { id: 'all' as StatusType, l: ta ? 'அனைத்தும்' : 'All' },
            { id: 'open' as StatusType, l: '🟢' },
            { id: 'upcoming' as StatusType, l: '🟡' },
          ]).map(s => (
            <button key={s.id} onClick={() => setActiveStatus(s.id)} className={cn(
              "px-3 py-2 rounded-lg text-[10px] font-bold transition-all",
              activeStatus === s.id ? "bg-white text-slate-800 shadow-sm" : "text-slate-400"
            )}>
              {s.l}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[10px] text-slate-400 -mt-2">
        {ta ? `${filtered.length} தேர்வுகள்` : `Showing ${filtered.length} of ${governmentExams.length} exams`}
      </p>

      {/* ══════════════════════ EXAM CARDS ══════════════════════ */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">{ta ? 'தேர்வுகள் கிடைக்கவில்லை' : 'No exams match your filters'}</p>
          <button onClick={() => { setSearch(''); setActiveCat('all'); setActiveStatus('all'); }}
            className="text-xs text-amber-600 font-bold mt-2 hover:underline">
            {ta ? 'வடிகட்டிகளை அழி' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((exam, idx) => {
            const cfg = CAT[exam.category] || CAT.central;
            const Icon = cfg.icon;
            const isSaved = savedSet.has(exam.id);
            const isOpen = exam.applicationStatus === 'open';
            const isUpcoming = exam.applicationStatus === 'upcoming';

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.025, 0.12), duration: 0.25 }}
              >
                <div className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">

                  {/* ─── top color bar ─── */}
                  <div className={cn("h-1", isOpen ? 'bg-emerald-500' : isUpcoming ? 'bg-amber-400' : 'bg-slate-200')} />

                  <div className="p-4">
                    {/* Row 1: icon + name + status + bookmark */}
                    <div className="flex items-start gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", cfg.cardBg)}>
                        <Icon className={cn("w-5 h-5", cfg.cardIcon)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-800 truncate">{exam.name}</h3>
                          {isOpen && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />}
                          {isUpcoming && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400 ring-2 ring-amber-400/20" />}
                        </div>
                        <p className="text-[10px] text-slate-400 font-tamil truncate mt-0.5">{exam.nameTamil}</p>
                      </div>
                      <button onClick={() => toggleSave(exam.id)} className={cn(
                        "p-2 rounded-xl transition-all shrink-0",
                        isSaved ? "text-amber-500 bg-amber-50" : "text-slate-200 hover:text-amber-400 hover:bg-slate-50"
                      )}>
                        <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
                      </button>
                    </div>

                    {/* Row 2: description */}
                    <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed line-clamp-2">{exam.description}</p>

                    {/* Row 3: info chips */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg">
                        <Banknote className="w-3 h-3" />
                        <span className="text-[10px] font-bold">{fmt(exam.salaryMin)} – {fmt(exam.salaryMax)}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                        <Users className="w-3 h-3" />
                        <span className="text-[10px] font-bold">{exam.ageMin}–{exam.ageMax} yrs</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 px-2 py-1 rounded-lg">
                        <GraduationCap className="w-3 h-3" />
                        <span className="text-[10px] font-bold">{exam.qualification}</span>
                      </div>
                      {exam.nextExamDate && (
                        <div className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-1 rounded-lg">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[10px] font-bold">
                            {new Date(exam.nextExamDate).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Row 4: posts (if any) */}
                    {exam.posts && exam.posts.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exam.posts.slice(0, 4).map((p, i) => (
                          <span key={i} className="text-[9px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{p}</span>
                        ))}
                        {exam.posts.length > 4 && (
                          <span className="text-[9px] text-slate-300 self-center">+{exam.posts.length - 4} more</span>
                        )}
                      </div>
                    )}

                    {/* Row 5: action buttons */}
                    <div className="flex gap-2 mt-4">
                      {isOpen ? (
                        <a href={exam.applyLink} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors shadow-sm shadow-emerald-600/20">
                          <ExternalLink className="w-3.5 h-3.5" />
                          {ta ? 'இப்போது விண்ணப்பி' : 'Apply Now'}
                        </a>
                      ) : isUpcoming ? (
                        <a href={exam.applyLink} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold transition-colors">
                          <Clock className="w-3.5 h-3.5" />
                          {ta ? 'அதிகாரப்பூர்வ தளம்' : 'Official Site'}
                        </a>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-[11px] font-bold cursor-default">
                          {ta ? 'மூடப்பட்டது' : 'Applications Closed'}
                        </div>
                      )}

                      <button
                        onClick={() => navigate(`/government-exams/${exam.category}/${exam.id}`)}
                        className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-[11px] font-bold text-slate-600 transition-all"
                      >
                        {ta ? 'விவரம்' : 'Details'}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════ FOOTER NOTICE ══════════════════════ */}
      <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-3.5 text-center">
        <p className="text-[10px] text-amber-700/80 font-medium leading-relaxed">
          💡 {ta
            ? 'தேதிகள் மாறக்கூடும். எப்போதும் அதிகாரப்பூர்வ இணையதளத்தில் சரிபார்க்கவும்.'
            : 'Dates are tentative and may change. Always verify from official websites before applying.'}
        </p>
      </div>
    </div>
  );
};

export default GovernmentJobs;
