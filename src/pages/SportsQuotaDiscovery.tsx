/**
 * Sports Quota Discovery
 * ──────────────────────
 * A standalone, filterable directory of sports-quota trials at colleges
 * across India for the 2026-27 academic year.
 *
 * This page surfaces ONLY entries whose id is on the DISCOVERY_COLLEGE_IDS
 * allowlist in src/data/sportsQuotaDiscoveryData.ts — i.e. the trial
 * notifications shared by the JKKN team. Other entries (legacy TNEA-default
 * colleges) are intentionally excluded — they remain in the data file for
 * the eligibility flow's scoring calculations but are not shown here.
 *
 * Filters (all combine with AND):
 *   • District       (multi-select)
 *   • Sport          (multi-select)
 *   • Gender         (Men / Women / Both)
 *   • Past / Future  (Upcoming · Past · All)
 *
 * Layout: filter bar on top, results below as cards with all the trial
 * details (date, time, venue, sports list, scholarship summary, contact).
 */

import { useMemo, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CalendarClock,
  CalendarX,
  Clock,
  Filter,
  GraduationCap,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  COLLEGE_SPORTS_QUOTA,
  ALL_SPORTS,
  getSportLabel,
  type CollegeSportsQuota,
  type Sport,
  type SportTrialDate,
} from '@/data/sportsQuotaData';
import { DISCOVERY_COLLEGE_IDS } from '@/data/sportsQuotaDiscoveryData';

// Single source of truth for which colleges appear on this page. The list is
// declared in sportsQuotaDiscoveryData.ts and shared with the eligibility
// splash banner so both surfaces stay in lock-step.
const DISCOVERY_ALLOWLIST = new Set<string>(DISCOVERY_COLLEGE_IDS);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type GenderFilter = 'all' | 'men' | 'women';
type TimeFilter = 'all' | 'upcoming' | 'past';

interface FlattenedTrial {
  collegeId: string;
  collegeName: string;
  collegeNameTa?: string;
  district: string;
  type: CollegeSportsQuota['type'];
  field: CollegeSportsQuota['field'];
  counsellingBody: CollegeSportsQuota['counsellingBody'];
  scholarship?: string;
  sourceNote?: string;
  contact: CollegeSportsQuota['contact'];
  trialDates: TrialOccurrence[];
  allSports: Sport[];
  acceptsMen: boolean;
  acceptsWomen: boolean;
  earliestDate: Date | null;
  latestDate: Date | null;
  applicationDeadline?: string;
}

interface TrialOccurrence {
  date: string;
  time: string;
  venue: string;
  sports: Sport[];
  genders: ('men' | 'women')[];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA FLATTENING
// ─────────────────────────────────────────────────────────────────────────────

const parseTrialDate = (iso: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(`${iso}T00:00:00+05:30`);
  return isNaN(d.getTime()) ? null : d;
};

const buildOccurrences = (
  trialsMen: SportTrialDate[] | undefined,
  trialsWomen: SportTrialDate[] | undefined,
): TrialOccurrence[] => {
  const map = new Map<string, TrialOccurrence>();

  const add = (t: SportTrialDate, gender: 'men' | 'women') => {
    const key = `${t.date}__${t.time}__${t.venue}`;
    let occ = map.get(key);
    if (!occ) {
      occ = { date: t.date, time: t.time, venue: t.venue, sports: [], genders: [] };
      map.set(key, occ);
    }
    if (!occ.sports.includes(t.sport)) occ.sports.push(t.sport);
    if (!occ.genders.includes(gender)) occ.genders.push(gender);
  };

  trialsMen?.forEach((t) => add(t, 'men'));
  trialsWomen?.forEach((t) => add(t, 'women'));

  return Array.from(map.values()).sort((a, b) => {
    const da = parseTrialDate(a.date)?.getTime() ?? 0;
    const db = parseTrialDate(b.date)?.getTime() ?? 0;
    return da - db;
  });
};

const flattenColleges = (): FlattenedTrial[] =>
  COLLEGE_SPORTS_QUOTA.filter((c) => DISCOVERY_ALLOWLIST.has(c.id)).map((c) => {
    const trialsMen = c.overrides?.trialsMen ?? [];
    const trialsWomen = c.overrides?.trialsWomen ?? [];
    const trialDates = buildOccurrences(trialsMen, trialsWomen);

    const allSports: Sport[] = [];
    const seen = new Set<Sport>();
    [...(c.overrides?.sportsForMen ?? []), ...(c.overrides?.sportsForWomen ?? [])].forEach((s) => {
      if (!seen.has(s)) { seen.add(s); allSports.push(s); }
    });

    const dates = trialDates.map((t) => parseTrialDate(t.date)).filter(Boolean) as Date[];
    const earliestDate = dates.length ? dates[0] : null;
    const latestDate = dates.length ? dates[dates.length - 1] : null;

    return {
      collegeId: c.id,
      collegeName: c.collegeName,
      collegeNameTa: c.collegeNameTa,
      district: c.district,
      type: c.type,
      field: c.field,
      counsellingBody: c.counsellingBody,
      scholarship: c.overrides?.sportsScholarship,
      sourceNote: c.sourceNote,
      contact: c.contact,
      trialDates,
      allSports,
      acceptsMen: (c.overrides?.sportsForMen?.length ?? 0) > 0,
      acceptsWomen: (c.overrides?.sportsForWomen?.length ?? 0) > 0,
      earliestDate,
      latestDate,
      applicationDeadline: c.overrides?.applicationDeadline,
    };
  });

// ─────────────────────────────────────────────────────────────────────────────
// FORMATTERS
// ─────────────────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  const d = parseTrialDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const isFutureDate = (d: Date | null): boolean => {
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() >= today.getTime();
};

const getCollegeTimeStatus = (t: FlattenedTrial): 'upcoming' | 'past' | 'unknown' => {
  if (!t.latestDate) return 'unknown';
  return isFutureDate(t.latestDate) ? 'upcoming' : 'past';
};

const formatPhone = (raw?: string): string => {
  if (!raw) return '';
  return raw.replace(/^\+91[-\s]?/, '').trim();
};

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-SELECT FILTER POPOVER
// ─────────────────────────────────────────────────────────────────────────────

interface MultiSelectFilterProps {
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string; count?: number }[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  placeholder?: string;
}

const MultiSelectFilter = ({
  label,
  icon,
  options,
  selected,
  onChange,
  placeholder = 'Search…',
}: MultiSelectFilterProps) => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const toggle = (value: string) => {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onChange(next);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 gap-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-emerald-400"
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
          {selected.size > 0 && (
            <Badge className="ml-1 h-5 bg-emerald-600 hover:bg-emerald-700 px-1.5 text-[10px]">
              {selected.size}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <div className="p-2 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-8 pl-8 text-sm"
            />
          </div>
        </div>
        <ScrollArea className="max-h-72">
          <div className="p-1">
            {filtered.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-gray-500">No matches</p>
            ) : (
              filtered.map((opt) => {
                const isChecked = selected.has(opt.value);
                return (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggle(opt.value)}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <span className="text-sm flex-1 text-gray-800">{opt.label}</span>
                    {typeof opt.count === 'number' && (
                      <span className="text-[10px] text-gray-500 tabular-nums">{opt.count}</span>
                    )}
                  </label>
                );
              })
            )}
          </div>
        </ScrollArea>
        {selected.size > 0 && (
          <div className="p-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-500">{selected.size} selected</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
              onClick={() => onChange(new Set())}
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SEGMENTED CONTROL
// ─────────────────────────────────────────────────────────────────────────────

interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon?: React.ReactNode }[];
}

function SegmentedControl<T extends string>({ value, onChange, options }: SegmentedControlProps<T>) {
  return (
    <div className="inline-flex h-10 rounded-md border border-gray-300 bg-white overflow-hidden">
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'px-3 sm:px-4 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5',
              active
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50',
              i > 0 ? 'border-l border-gray-300' : '',
            ].filter(Boolean).join(' ')}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIAL CARD
// ─────────────────────────────────────────────────────────────────────────────

interface TrialCardProps {
  trial: FlattenedTrial;
  matchingSports?: Set<Sport>;
}

const fieldLabels: Record<CollegeSportsQuota['field'], string> = {
  engineering: 'Engineering',
  medical: 'Medical',
  arts: 'Arts & Science',
  law: 'Law',
  agriculture: 'Agriculture',
  other: 'Multi-discipline',
};

const TrialCard = ({ trial, matchingSports }: TrialCardProps) => {
  const status = getCollegeTimeStatus(trial);
  const hasTrialDates = trial.trialDates.length > 0;

  const sportsToShow = (() => {
    const base = trial.allSports.filter((s) => s !== 'other');
    if (matchingSports && matchingSports.size > 0) {
      const matched = base.filter((s) => matchingSports.has(s));
      const rest = base.filter((s) => !matchingSports.has(s));
      return [...matched, ...rest];
    }
    return base;
  })();
  const hasOther = trial.allSports.includes('other');

  return (
    <Card className="overflow-hidden border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all">
      <div
        className={[
          'px-4 py-2 flex items-center justify-between',
          status === 'upcoming' ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-b border-emerald-200' : '',
          status === 'past' ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 border-b border-amber-200' : '',
          status === 'unknown' ? 'bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200' : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="flex items-center gap-2">
          {status === 'upcoming' && (
            <>
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                Upcoming Trial
              </span>
            </>
          )}
          {status === 'past' && (
            <>
              <CalendarX className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                Trial Held · Contact College
              </span>
            </>
          )}
          {status === 'unknown' && (
            <>
              <CalendarClock className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                Contact College for Dates
              </span>
            </>
          )}
        </div>
        <span className="text-[10px] text-gray-600 font-medium hidden sm:inline">
          {fieldLabels[trial.field]} · {trial.type}
        </span>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-[15px] text-gray-900 leading-tight">
            {trial.collegeName}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {trial.district}
            </span>
            <span className="flex items-center gap-1 sm:hidden">
              <GraduationCap className="w-3 h-3" />
              {fieldLabels[trial.field]}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {trial.acceptsMen && trial.acceptsWomen
                ? 'Men & Women'
                : trial.acceptsMen
                ? 'Men only'
                : trial.acceptsWomen
                ? 'Women only'
                : 'See college'}
            </span>
          </div>
        </div>

        {hasTrialDates && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Trial Schedule
            </p>
            <div className="space-y-1.5">
              {trial.trialDates.map((occ, i) => {
                const d = parseTrialDate(occ.date);
                const isPast = d ? !isFutureDate(d) : false;
                return (
                  <div
                    key={i}
                    className={[
                      'flex items-start gap-2 text-[12px] rounded-md px-2.5 py-1.5 border',
                      isPast
                        ? 'bg-amber-50/40 border-amber-100 text-amber-900'
                        : 'bg-emerald-50/40 border-emerald-100 text-emerald-900',
                    ].join(' ')}
                  >
                    <Calendar className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-bold">{formatDate(occ.date)}</span>
                        <span className="text-[10px] flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {occ.time}
                        </span>
                      </div>
                      <p className="text-[10px] mt-0.5 opacity-80">
                        {occ.sports
                          .filter((s) => s !== 'other')
                          .slice(0, 8)
                          .map((s) => getSportLabel(s))
                          .join(' · ')}
                        {occ.sports.length > 8 && ` +${occ.sports.length - 8} more`}
                      </p>
                      <p className="text-[10px] opacity-70 mt-0.5">{occ.venue}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sportsToShow.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Sports Offered
            </p>
            <div className="flex flex-wrap gap-1">
              {sportsToShow.slice(0, 14).map((s) => {
                const isMatch = matchingSports && matchingSports.has(s);
                return (
                  <Badge
                    key={s}
                    variant="outline"
                    className={[
                      'text-[10px] font-medium px-1.5 py-0',
                      isMatch
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200',
                    ].join(' ')}
                  >
                    {getSportLabel(s)}
                  </Badge>
                );
              })}
              {sportsToShow.length > 14 && (
                <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-500 border-gray-200">
                  +{sportsToShow.length - 14} more
                </Badge>
              )}
              {hasOther && (
                <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-500 border-gray-200">
                  + Other sport
                </Badge>
              )}
            </div>
          </div>
        )}

        {trial.scholarship && (
          <div className="rounded-md bg-purple-50 border border-purple-100 px-2.5 py-2">
            <div className="flex items-start gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-purple-700 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] leading-snug text-purple-900">
                {trial.scholarship.length > 220
                  ? `${trial.scholarship.slice(0, 220).trim()}…`
                  : trial.scholarship}
              </p>
            </div>
          </div>
        )}

        <div className="pt-1 flex flex-wrap items-center gap-2 border-t border-gray-100">
          {trial.contact.phone && (
            <a
              href={`tel:${trial.contact.phone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1.5 transition-colors"
            >
              <Phone className="w-3 h-3" />
              {trial.contact.sportsOfficer || 'Sports Officer'} · {formatPhone(trial.contact.phone)}
            </a>
          )}
          {trial.contact.phone2 && (
            <a
              href={`tel:${trial.contact.phone2.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1.5 transition-colors"
            >
              <Phone className="w-3 h-3" />
              {trial.contact.sportsOfficer2 || 'Alternate'} · {formatPhone(trial.contact.phone2)}
            </a>
          )}
          {trial.contact.website && (
            <a
              href={trial.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-[11px] font-semibold px-2.5 py-1.5 transition-colors"
            >
              Website
            </a>
          )}
          {trial.contact.applicationLink && (
            <a
              href={trial.contact.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-1.5 transition-colors"
            >
              Apply Online
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────

const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <div className="py-16 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
      <Search className="w-7 h-7 text-gray-400" />
    </div>
    <h3 className="text-base font-bold text-gray-900 mb-1">No trials match your filters</h3>
    <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">
      Try widening your search — remove a filter or browse upcoming trials.
    </p>
    <Button onClick={onReset} className="bg-emerald-600 hover:bg-emerald-700">
      <X className="w-3.5 h-3.5 mr-1.5" />
      Reset all filters
    </Button>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

const SportsQuotaDiscovery = () => {
  const navigate = useNavigate();

  const allTrials = useMemo(() => flattenColleges(), []);

  const [selectedDistricts, setSelectedDistricts] = useState<Set<string>>(new Set());
  const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());
  const [gender, setGender] = useState<GenderFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resetFilters = useCallback(() => {
    setSelectedDistricts(new Set());
    setSelectedSports(new Set());
    setGender('all');
    setTimeFilter('all');
    setSearchQuery('');
  }, []);

  const hasActiveFilters =
    selectedDistricts.size > 0 ||
    selectedSports.size > 0 ||
    gender !== 'all' ||
    timeFilter !== 'all' ||
    searchQuery.trim().length > 0;

  const districtOptions = useMemo(() => {
    const counts = new Map<string, number>();
    allTrials.forEach((t) => {
      counts.set(t.district, (counts.get(t.district) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, label: value, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allTrials]);

  const sportOptions = useMemo(() => {
    const counts = new Map<Sport, number>();
    allTrials.forEach((t) => {
      t.allSports.forEach((s) => {
        if (s === 'other') return;
        counts.set(s, (counts.get(s) ?? 0) + 1);
      });
    });
    return ALL_SPORTS
      .filter((sp) => sp.id !== 'other' && counts.has(sp.id))
      .map((sp) => ({
        value: sp.id,
        label: sp.en,
        count: counts.get(sp.id),
      }));
  }, [allTrials]);

  const filteredTrials = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allTrials
      .filter((t) => {
        if (selectedDistricts.size > 0 && !selectedDistricts.has(t.district)) return false;
        if (selectedSports.size > 0) {
          const has = t.allSports.some((s) => selectedSports.has(s));
          if (!has) return false;
        }
        if (gender === 'men' && !t.acceptsMen) return false;
        if (gender === 'women' && !t.acceptsWomen) return false;
        if (timeFilter !== 'all') {
          const status = getCollegeTimeStatus(t);
          if (timeFilter === 'upcoming' && status !== 'upcoming') return false;
          if (timeFilter === 'past' && status !== 'past') return false;
        }
        if (q) {
          const hay = `${t.collegeName} ${t.collegeNameTa ?? ''} ${t.district}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const sa = getCollegeTimeStatus(a);
        const sb = getCollegeTimeStatus(b);
        const order = (s: ReturnType<typeof getCollegeTimeStatus>) =>
          s === 'upcoming' ? 0 : s === 'past' ? 1 : 2;
        if (order(sa) !== order(sb)) return order(sa) - order(sb);
        if (sa === 'upcoming') {
          const ea = a.earliestDate?.getTime() ?? Number.POSITIVE_INFINITY;
          const eb = b.earliestDate?.getTime() ?? Number.POSITIVE_INFINITY;
          return ea - eb;
        }
        if (sa === 'past') {
          const la = a.latestDate?.getTime() ?? Number.NEGATIVE_INFINITY;
          const lb = b.latestDate?.getTime() ?? Number.NEGATIVE_INFINITY;
          return lb - la;
        }
        return a.collegeName.localeCompare(b.collegeName);
      });
  }, [allTrials, selectedDistricts, selectedSports, gender, timeFilter, searchQuery]);

  const matchingSportsSet = useMemo(() => {
    return new Set<Sport>(Array.from(selectedSports) as Sport[]);
  }, [selectedSports]);

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistricts, selectedSports, gender, timeFilter]);

  const stats = useMemo(() => {
    let upcoming = 0;
    let past = 0;
    allTrials.forEach((t) => {
      const s = getCollegeTimeStatus(t);
      if (s === 'upcoming') upcoming += 1;
      else if (s === 'past') past += 1;
    });
    return { total: allTrials.length, upcoming, past };
  }, [allTrials]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white pb-12">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/sports-quota')}
          className="mb-3 -ml-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Sports Quota Check
        </Button>

        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-emerald-900 leading-tight">
                Sports Quota Discovery
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Selection trials at colleges for the 2026-27 academic year.
                Filter by district, sport, gender, and trial date.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-lg bg-white border border-emerald-200 px-3 py-2 text-center">
              <div className="text-lg sm:text-xl font-black text-emerald-700">{stats.total}</div>
              <div className="text-[10px] text-emerald-800 font-medium leading-tight">
                Verified colleges
              </div>
            </div>
            <div className="rounded-lg bg-white border border-amber-200 px-3 py-2 text-center">
              <div className="text-lg sm:text-xl font-black text-amber-700">{stats.upcoming}</div>
              <div className="text-[10px] text-amber-800 font-medium leading-tight">
                Upcoming trials
              </div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 px-3 py-2 text-center">
              <div className="text-lg sm:text-xl font-black text-gray-700">{stats.past}</div>
              <div className="text-[10px] text-gray-600 font-medium leading-tight">
                Past trials (call college)
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-20 -mx-4 px-4 pb-3 pt-3 bg-gradient-to-b from-emerald-50/95 via-white/95 to-white/80 backdrop-blur-sm border-b border-emerald-100">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search college or district…"
              className="h-10 pl-9 pr-9 bg-white border-gray-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 hidden sm:inline" />

            <MultiSelectFilter
              label="District"
              icon={<MapPin className="w-3.5 h-3.5" />}
              options={districtOptions}
              selected={selectedDistricts}
              onChange={setSelectedDistricts}
              placeholder="Search district…"
            />

            <MultiSelectFilter
              label="Sport"
              icon={<Trophy className="w-3.5 h-3.5" />}
              options={sportOptions}
              selected={selectedSports}
              onChange={(next) => setSelectedSports(next)}
              placeholder="Search sport…"
            />

            <SegmentedControl<GenderFilter>
              value={gender}
              onChange={setGender}
              options={[
                { value: 'all', label: 'All' },
                { value: 'men', label: 'Men' },
                { value: 'women', label: 'Women' },
              ]}
            />

            <SegmentedControl<TimeFilter>
              value={timeFilter}
              onChange={setTimeFilter}
              options={[
                { value: 'all', label: 'All' },
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'past', label: 'Past' },
              ]}
            />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="ml-auto h-10 text-xs text-emerald-700 hover:bg-emerald-50"
              >
                <X className="w-3 h-3 mr-1" />
                Reset
              </Button>
            )}
          </div>

          {(selectedDistricts.size > 0 || selectedSports.size > 0) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {Array.from(selectedDistricts).map((d) => (
                <Badge
                  key={`d-${d}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 cursor-pointer pl-2 pr-1 py-0.5"
                  onClick={() => {
                    const next = new Set(selectedDistricts);
                    next.delete(d);
                    setSelectedDistricts(next);
                  }}
                >
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="text-[10px]">{d}</span>
                  <X className="w-2.5 h-2.5 ml-0.5 opacity-80" />
                </Badge>
              ))}
              {Array.from(selectedSports).map((s) => (
                <Badge
                  key={`s-${s}`}
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-1 cursor-pointer pl-2 pr-1 py-0.5"
                  onClick={() => {
                    const next = new Set(selectedSports);
                    next.delete(s);
                    setSelectedSports(next);
                  }}
                >
                  <Trophy className="w-2.5 h-2.5" />
                  <span className="text-[10px]">{getSportLabel(s as Sport)}</span>
                  <X className="w-2.5 h-2.5 ml-0.5 opacity-80" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 mb-3">
          <p className="text-xs text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredTrials.length}</span>
            {' '}of {stats.total} verified college
            {stats.total === 1 ? '' : 's'}
          </p>
          {filteredTrials.length > 0 && (
            <p className="text-[10px] text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified by JKKN team
            </p>
          )}
        </div>

        {filteredTrials.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredTrials.map((t) => (
              <TrialCard
                key={t.collegeId}
                trial={t}
                matchingSports={matchingSportsSet.size ? matchingSportsSet : undefined}
              />
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Trial details sourced from official college notifications.
            Always verify the latest schedule by calling the college.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SportsQuotaDiscovery;
