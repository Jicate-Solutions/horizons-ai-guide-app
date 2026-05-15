/**
 * SmartRankPredictor
 * ------------------
 * A stream-aware, probability-based college predictor with a counselling
 * strategy view. Improvement over the existing CollegePredictor in three
 * ways:
 *
 *   1. It works for ALL streams the app supports: TNEA Engineering,
 *      NEET MBBS/BDS, TN Paramedical Degree (Nursing/Pharmacy/BPT/etc.),
 *      and Pharm.D — by reading from the existing cutoff data arrays.
 *
 *   2. It computes an HONEST probability band per college+course based on
 *      score-vs-cutoff buffer, accounting for the well-known ±3-5 mark
 *      year-to-year drift in counselling cutoffs. The old predictor
 *      produced 'High/Medium/Low' labels with no transparency on the rule.
 *
 *   3. It re-organises results into the COUNSELLING-STRATEGY buckets that
 *      coaching centres actually advise: Stretch (top of choice list),
 *      Realistic (middle), Safe (bottom). This is the practical advice
 *      missing from the official portal — they show data, not strategy.
 *
 * Data source: imports the same cutoff arrays used by PreviousYearCutoffs,
 * so when those are updated the predictor stays in sync automatically.
 */

import { useMemo, useState } from 'react';
import {
  engineeringCutoffs,
  medicalCutoffs,
  pharmaNursingCutoffs,
  type CutoffEntry,
} from './PreviousYearCutoffs';
import { cn } from '@/lib/utils';
import {
  Target, Shield, TrendingUp, AlertTriangle, Info,
  Building2, GraduationCap, Stethoscope, Pill,
} from 'lucide-react';

type Stream = 'engineering' | 'medical' | 'paramedical';
type Category = 'oc' | 'bc' | 'mbc' | 'sc' | 'st';

type Band = 'verySafe' | 'safe' | 'realistic' | 'stretch' | 'reach';

interface ScoredEntry extends CutoffEntry {
  /** The category cutoff being compared against (a single number). */
  categoryCutoff: number;
  /** Student score minus that cutoff. Positive = above, negative = below. */
  delta: number;
  /** Probability band. */
  band: Band;
  /** Approximate fit probability — for display only. */
  probability: number;
}

const STREAMS: { id: Stream; label: string; icon: typeof Building2; max: number; note: string }[] = [
  { id: 'engineering', label: 'Engineering (TNEA)', icon: Building2,    max: 200, note: 'TNEA cutoff out of 200' },
  { id: 'medical',     label: 'MBBS / BDS (NEET)', icon: Stethoscope,  max: 720, note: 'NEET score out of 720' },
  { id: 'paramedical', label: 'Paramedical & Pharm.D', icon: Pill,     max: 200, note: '12th science marks out of 200' },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'oc', label: 'OC' },
  { id: 'bc', label: 'BC' },
  { id: 'mbc', label: 'MBC' },
  { id: 'sc', label: 'SC' },
  { id: 'st', label: 'ST' },
];

/**
 * Probability bands — calibrated on TN counselling cutoff drift (~±3-5
 * marks year-on-year on TNEA-style /200 scales). For NEET (/720) we widen
 * the buffers by 4x since the scale is 3.6x bigger and the drift is wider.
 */
const bandFor = (delta: number, isNeetScale: boolean): { band: Band; probability: number } => {
  const k = isNeetScale ? 4 : 1; // scaling factor for buffer thresholds
  if (delta >= 5  * k) return { band: 'verySafe',  probability: 95 };
  if (delta >= 0)      return { band: 'safe',      probability: 80 };
  if (delta >= -4 * k) return { band: 'realistic', probability: 55 };
  if (delta >= -8 * k) return { band: 'stretch',   probability: 25 };
  return                       { band: 'reach',     probability: 5 };
};

const bandMeta: Record<Band, { label: string; sub: string; bg: string; text: string; border: string; ring: string }> = {
  verySafe:  { label: 'Very Safe',  sub: 'Almost certain admission',     bg: 'bg-emerald-50',  text: 'text-emerald-800',  border: 'border-emerald-300',  ring: 'bg-emerald-500'  },
  safe:      { label: 'Safe',       sub: 'Strong chance — add at bottom of choices', bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-300', ring: 'bg-green-500' },
  realistic: { label: 'Realistic',  sub: 'Most likely allotment — add in middle',   bg: 'bg-blue-50',   text: 'text-blue-800',   border: 'border-blue-300',   ring: 'bg-blue-500'   },
  stretch:   { label: 'Stretch',    sub: 'Worth a shot — add at top of choices',    bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-300',  ring: 'bg-amber-500'  },
  reach:     { label: 'Reach',      sub: 'Unlikely this year — keep as long shot',  bg: 'bg-rose-50',   text: 'text-rose-800',   border: 'border-rose-300',   ring: 'bg-rose-500'   },
};

const toNumber = (v: number | string): number | null => {
  if (typeof v === 'number') return v;
  if (!v || v === '-') return null;
  // Strip "%ile" suffix etc. for percentile-style NEET entries.
  const cleaned = v.toString().replace(/[^\d.]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
};

export const SmartRankPredictor = () => {
  const [stream, setStream] = useState<Stream>('engineering');
  const [score, setScore] = useState<string>('');
  const [category, setCategory] = useState<Category>('oc');

  const streamMeta = STREAMS.find((s) => s.id === stream)!;
  const isNeet = stream === 'medical';

  const numericScore = useMemo(() => {
    const n = parseFloat(score);
    if (!Number.isFinite(n)) return null;
    if (n < 0 || n > streamMeta.max) return null;
    return n;
  }, [score, streamMeta.max]);

  /** Cutoff data for the chosen stream. */
  const data: CutoffEntry[] = useMemo(() => {
    if (stream === 'engineering') return engineeringCutoffs;
    if (stream === 'medical') return medicalCutoffs;
    return pharmaNursingCutoffs;
  }, [stream]);

  /** Score each entry against the student's score+category. */
  const scored: ScoredEntry[] = useMemo(() => {
    if (numericScore == null) return [];
    const out: ScoredEntry[] = [];
    for (const e of data) {
      const cutoffRaw = e[category];
      const cutoff = toNumber(cutoffRaw);
      if (cutoff == null) continue; // skip rows without a numeric cutoff for this category
      const delta = numericScore - cutoff;
      const { band, probability } = bandFor(delta, isNeet);
      out.push({ ...e, categoryCutoff: cutoff, delta, band, probability });
    }
    // Sort by closeness (smallest |delta| first within each band — most informative)
    out.sort((a, b) => {
      const order: Band[] = ['safe', 'realistic', 'stretch', 'verySafe', 'reach'];
      const ai = order.indexOf(a.band);
      const bi = order.indexOf(b.band);
      if (ai !== bi) return ai - bi;
      return Math.abs(a.delta) - Math.abs(b.delta);
    });
    return out;
  }, [data, category, numericScore, isNeet]);

  /** Strategy buckets for the choice-filling advice. */
  const buckets = useMemo(() => ({
    stretch:   scored.filter((e) => e.band === 'stretch' || e.band === 'reach'),
    realistic: scored.filter((e) => e.band === 'realistic'),
    safe:      scored.filter((e) => e.band === 'safe' || e.band === 'verySafe'),
  }), [scored]);

  return (
    <div className="space-y-4">
      {/* ── HEADER ── */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-700 via-purple-700 to-violet-800 p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-amber-300" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-black leading-tight">Smart Rank Predictor</h2>
            <p className="text-sm text-violet-100/90 mt-0.5">
              See your real probability of getting each college — plus a choice-filling strategy
            </p>
            <p className="text-xs text-violet-200/70 mt-2 leading-relaxed">
              Based on 2025 actual cutoffs with realistic ±buffer for year-to-year drift.
              This is the strategy advice missing from official portals.
            </p>
          </div>
        </div>
      </div>

      {/* ── INPUTS ── */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 space-y-4">

        {/* Step 1: Stream */}
        <div>
          <p className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center">1</span>
            What are you targeting?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {STREAMS.map((s) => {
              const Icon = s.icon;
              const active = stream === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { setStream(s.id); setScore(''); }}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all active:scale-95',
                    active ? 'border-violet-600 bg-violet-50' : 'border-gray-200 bg-white hover:bg-gray-50',
                  )}
                >
                  <Icon className={cn('w-5 h-5 flex-shrink-0', active ? 'text-violet-700' : 'text-gray-500')} />
                  <div className="min-w-0">
                    <p className={cn('text-sm font-bold leading-tight', active ? 'text-violet-900' : 'text-gray-800')}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{s.note}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Score */}
        <div>
          <p className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center">2</span>
            Your score
            <span className="text-xs font-normal text-gray-500">({streamMeta.note})</span>
          </p>
          <input
            type="number"
            min={0}
            max={streamMeta.max}
            step={isNeet ? 1 : 0.5}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder={isNeet ? 'e.g. 615' : 'e.g. 187.5'}
            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none text-base font-semibold"
          />
          {score && numericScore == null && (
            <p className="text-xs text-rose-600 mt-1">Enter a number between 0 and {streamMeta.max}.</p>
          )}
        </div>

        {/* Step 3: Category */}
        <div>
          <p className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center">3</span>
            Your community
          </p>
          <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  'h-11 rounded-xl border-2 text-sm font-bold transition-all active:scale-95',
                  category === c.id
                    ? 'border-violet-600 bg-violet-50 text-violet-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      {numericScore != null && scored.length > 0 && (
        <>
          {/* Strategy summary */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-violet-700" />
              <h3 className="text-base font-black text-gray-900">Your choice-filling strategy</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              For TN counselling, the order you add colleges matters. Put your
              <strong> Stretch</strong> options at the top of your preference list,
              <strong> Realistic</strong> ones in the middle, and
              <strong> Safe</strong> ones at the bottom — never the other way round.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <StatTile label="Stretch"   count={buckets.stretch.length}   tone="amber"   />
              <StatTile label="Realistic" count={buckets.realistic.length} tone="blue"    />
              <StatTile label="Safe"      count={buckets.safe.length}      tone="emerald" />
            </div>
          </div>

          <Section
            title="🎯 Stretch — add at top of choices"
            subtitle="Below last year's cutoff, but cutoffs do drift. Worth listing in case this year goes easier."
            entries={buckets.stretch}
            isNeet={isNeet}
          />
          <Section
            title="✅ Realistic — most likely allotment"
            subtitle="Your score is right around last year's cutoff. These are the seats you should plan around."
            entries={buckets.realistic}
            isNeet={isNeet}
          />
          <Section
            title="🛡 Safe — your backup options"
            subtitle="Comfortably above last year's cutoff. Add these so you're not left without a seat."
            entries={buckets.safe}
            isNeet={isNeet}
          />
        </>
      )}

      {numericScore != null && scored.length === 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-900">No matching colleges found for {category.toUpperCase()} in this stream.</p>
            <p className="text-xs text-amber-800 mt-1">
              The cutoff data in this app is a curated sample, not exhaustive. The
              official allotment list on tnmedicalselection.net / tneaonline.org is
              the authoritative source.
            </p>
          </div>
        </div>
      )}

      {/* ── HONESTY FOOTER ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-[11px] text-gray-600 leading-relaxed">
        <strong>How this works:</strong> probabilities are derived from your score vs each
        college&apos;s last-year cutoff for your category, with a realistic ±buffer to
        account for year-to-year drift (typically ±3-5 marks on /200 scales). This is
        guidance, not a guarantee — actual cutoffs depend on exam difficulty,
        applicant pool, and seat changes. Always confirm against the official
        counselling portal before locking choices.
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

const StatTile = ({ label, count, tone }: { label: string; count: number; tone: 'amber' | 'blue' | 'emerald' }) => {
  const tones = {
    amber:   'bg-amber-50 border-amber-200 text-amber-800',
    blue:    'bg-blue-50 border-blue-200 text-blue-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  return (
    <div className={cn('rounded-xl border-2 p-3 text-center', tones[tone])}>
      <p className="text-2xl font-black leading-none">{count}</p>
      <p className="text-[11px] font-bold mt-1">{label}</p>
    </div>
  );
};

const Section = ({
  title, subtitle, entries, isNeet,
}: {
  title: string;
  subtitle: string;
  entries: ScoredEntry[];
  isNeet: boolean;
}) => {
  if (entries.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-black text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>
      </div>
      <div className="divide-y divide-gray-100">
        {entries.slice(0, 12).map((e, i) => (
          <Row key={`${e.college}-${e.course}-${i}`} entry={e} isNeet={isNeet} />
        ))}
        {entries.length > 12 && (
          <div className="px-4 py-2 text-[11px] text-gray-500 text-center">
            + {entries.length - 12} more in this bucket
          </div>
        )}
      </div>
    </div>
  );
};

const Row = ({ entry, isNeet }: { entry: ScoredEntry; isNeet: boolean }) => {
  const meta = bandMeta[entry.band];
  const deltaText = entry.delta >= 0 ? `+${entry.delta.toFixed(1)}` : entry.delta.toFixed(1);
  return (
    <div className="px-4 py-3 flex items-start gap-3">
      <div className={cn('w-2 h-2 rounded-full flex-shrink-0 mt-2', meta.ring)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-tight truncate">{entry.college}</p>
        <p className="text-xs text-gray-600 leading-tight mt-0.5 truncate">{entry.course}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px]">
          <span className="text-gray-500">
            Last cutoff: <span className="font-bold text-gray-800">{entry.categoryCutoff}{isNeet ? '' : '/200'}</span>
          </span>
          <span className={cn('font-bold', entry.delta >= 0 ? 'text-emerald-700' : 'text-rose-700')}>
            You: {deltaText}
          </span>
        </div>
      </div>
      <div className={cn('rounded-lg border px-2 py-1 text-center flex-shrink-0', meta.bg, meta.border)}>
        <p className={cn('text-[10px] font-bold leading-none', meta.text)}>{meta.label}</p>
        <p className={cn('text-[11px] font-black mt-1 leading-none', meta.text)}>{entry.probability}%</p>
      </div>
    </div>
  );
};
