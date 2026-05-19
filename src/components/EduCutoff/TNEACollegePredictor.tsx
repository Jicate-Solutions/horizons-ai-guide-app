import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Building2, MapPin, Search, ShieldCheck, TrendingUp, Target,
  Landmark, GraduationCap, Minus, Plus, Info, ChevronDown,
} from 'lucide-react';
import { EngineeringResult } from './EngineeringCalculator';
import {
  predictColleges, TNEA_DISTRICTS, TNEA_BRANCH_FAMILIES, TNEA_DATA_META,
  type TneaCategory, type CollegePrediction, type ChanceTier,
} from '@/data/tneaCutoffs2024';

interface TNEACollegePredictorProps {
  engineeringResult?: EngineeringResult | null;
}

/**
 * The calculator supports a few extra TN sub-categories (MBC(V), DNC) that
 * the published 2024 cutoff sheet groups under MBC. Map them down so every
 * student still gets a prediction.
 */
const CATEGORY_MAP: Record<string, TneaCategory> = {
  OC: 'OC', BC: 'BC', BCM: 'BCM', MBC: 'MBC',
  MBC_V: 'MBC', DNC: 'MBC', SC: 'SC', SCA: 'SCA', ST: 'ST',
};

const TIER_STYLE: Record<ChanceTier, {
  label: string; tamil: string; icon: typeof ShieldCheck;
  text: string; bg: string; border: string; ring: string;
}> = {
  Safe: {
    label: 'Safe', tamil: 'உறுதி', icon: ShieldCheck,
    text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200',
    ring: 'data-[active=true]:ring-emerald-500',
  },
  Likely: {
    label: 'Likely', tamil: 'வாய்ப்பு', icon: TrendingUp,
    text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200',
    ring: 'data-[active=true]:ring-amber-500',
  },
  Reach: {
    label: 'Reach', tamil: 'கடினம்', icon: Target,
    text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200',
    ring: 'data-[active=true]:ring-orange-500',
  },
};

const PAGE_SIZE = 25;

export const TNEACollegePredictor = ({ engineeringResult }: TNEACollegePredictorProps) => {
  const baseMark = engineeringResult?.cutoff ?? 0;
  const category: TneaCategory = CATEGORY_MAP[engineeringResult?.category ?? 'OC'] ?? 'OC';

  const [mark, setMark] = useState<number>(baseMark);
  const [tier, setTier] = useState<ChanceTier | 'All'>('All');
  const [family, setFamily] = useState<string>('All');
  const [district, setDistrict] = useState<string>('All');
  const [collegeType, setCollegeType] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  // keep the predictor in sync when the student recalculates above
  useEffect(() => {
    setMark(engineeringResult?.cutoff ?? 0);
  }, [engineeringResult?.cutoff]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [mark, tier, family, district, collegeType, search]);

  const predictions = useMemo<CollegePrediction[]>(
    () => (mark > 0 ? predictColleges(mark, category) : []),
    [mark, category],
  );

  const tierCounts = useMemo(() => {
    const c = { Safe: 0, Likely: 0, Reach: 0 };
    predictions.forEach((p) => { c[p.chance] += 1; });
    return c;
  }, [predictions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return predictions.filter((p) => {
      if (tier !== 'All' && p.chance !== tier) return false;
      if (family !== 'All' && p.branchFamily !== family) return false;
      if (district !== 'All' && p.district !== district) return false;
      if (collegeType !== 'All' && p.collegeType !== collegeType) return false;
      if (q && !p.collegeName.toLowerCase().includes(q)
        && !p.branchName.toLowerCase().includes(q)
        && !p.district.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [predictions, tier, family, district, collegeType, search]);

  // group eligible branches under their college
  const grouped = useMemo(() => {
    const map = new Map<string, { college: CollegePrediction; branches: CollegePrediction[] }>();
    for (const p of filtered) {
      const g = map.get(p.collegeCode);
      if (g) g.branches.push(p);
      else map.set(p.collegeCode, { college: p, branches: [p] });
    }
    const arr = Array.from(map.values());
    arr.forEach((g) => g.branches.sort((a, b) => b.referenceCutoff - a.referenceCutoff));
    arr.sort((a, b) => b.branches[0].referenceCutoff - a.branches[0].referenceCutoff);
    return arr;
  }, [filtered]);

  const clamp = (v: number) => Math.max(0, Math.min(200, Math.round(v * 4) / 4));
  const resetFilters = () => {
    setTier('All'); setFamily('All'); setDistrict('All');
    setCollegeType('All'); setSearch('');
  };

  if (!engineeringResult) {
    return (
      <Card className="border-2 border-dashed border-primary/30">
        <CardContent className="py-10 text-center text-muted-foreground">
          <GraduationCap className="h-10 w-10 mx-auto mb-3 text-primary/40" />
          Calculate your TNEA cutoff above to see the colleges you can get.
          <div className="text-xs font-tamil mt-1">
            கல்லூரிகளைப் பார்க்க மேலே உங்கள் கட்ஆஃப்பைக் கணக்கிடவும்.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Inputs strip ─────────────────────────────────────────── */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50/60 dark:from-emerald-950/20 dark:to-green-950/10">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground leading-tight">
                  Colleges You Can Get — TNEA 2024 Data
                </h3>
                <p className="text-xs text-muted-foreground font-tamil">
                  நீங்கள் சேரக்கூடிய பொறியியல் கல்லூரிகள்
                </p>
              </div>
            </div>

            {/* Expected-mark stepper */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Expected Cutoff
                </div>
                <div className="text-[10px] text-muted-foreground font-tamil">
                  எதிர்பார்க்கும் மதிப்பெண்
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline" size="icon" className="h-9 w-9 rounded-lg"
                  onClick={() => setMark((m) => clamp(m - 1))}
                  aria-label="Decrease expected cutoff"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={mark || ''}
                  onChange={(e) => setMark(clamp(parseFloat(e.target.value) || 0))}
                  className="h-9 w-20 text-center text-lg font-bold"
                />
                <Button
                  variant="outline" size="icon" className="h-9 w-9 rounded-lg"
                  onClick={() => setMark((m) => clamp(m + 1))}
                  aria-label="Increase expected cutoff"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                Community: {engineeringResult.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Summary tiles (also act as tier filter) ──────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          data-active={tier === 'All'}
          onClick={() => setTier('All')}
          className={cn(
            'rounded-xl border-2 p-3 text-left transition-all bg-white dark:bg-card',
            'hover:shadow-md data-[active=true]:ring-2 data-[active=true]:ring-primary',
            'border-border',
          )}
        >
          <div className="text-2xl font-black text-foreground">{predictions.length}</div>
          <div className="text-xs text-muted-foreground">Total branch matches</div>
        </button>
        {(['Safe', 'Likely', 'Reach'] as ChanceTier[]).map((t) => {
          const s = TIER_STYLE[t];
          const Icon = s.icon;
          return (
            <button
              key={t}
              data-active={tier === t}
              onClick={() => setTier(tier === t ? 'All' : t)}
              className={cn(
                'rounded-xl border-2 p-3 text-left transition-all hover:shadow-md',
                'data-[active=true]:ring-2', s.bg, s.border, s.ring,
              )}
            >
              <div className="flex items-center justify-between">
                <div className={cn('text-2xl font-black', s.text)}>{tierCounts[t]}</div>
                <Icon className={cn('h-5 w-5', s.text)} />
              </div>
              <div className={cn('text-xs font-medium', s.text)}>
                {s.label} <span className="font-tamil opacity-80">· {s.tamil}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Filters ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search college, branch or district…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Select value={family} onValueChange={setFamily}>
          <SelectTrigger className="h-10 w-[190px]"><SelectValue placeholder="Branch" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All branches</SelectItem>
            {TNEA_BRANCH_FAMILIES.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger className="h-10 w-[160px]"><SelectValue placeholder="District" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All districts</SelectItem>
            {TNEA_DISTRICTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={collegeType} onValueChange={setCollegeType}>
          <SelectTrigger className="h-10 w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Govt + Private</SelectItem>
            <SelectItem value="Government">Government only</SelectItem>
            <SelectItem value="Private">Private only</SelectItem>
          </SelectContent>
        </Select>
        {(tier !== 'All' || family !== 'All' || district !== 'All'
          || collegeType !== 'All' || search) && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-10">
            Clear filters
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Showing <strong className="text-foreground">{grouped.length}</strong> colleges
        {' · '}<strong className="text-foreground">{filtered.length}</strong> branches
        {filtered.length !== predictions.length && ` (filtered from ${predictions.length})`}
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      {grouped.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="py-10 text-center text-muted-foreground">
            <Search className="h-9 w-9 mx-auto mb-3 opacity-30" />
            No colleges match these filters.
            {predictions.length > 0
              ? ' Try clearing the filters.'
              : ' Your cutoff is below the 2024 range for this list — try a slightly higher mark.'}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {grouped.slice(0, visible).map(({ college, branches }) => (
            <Card key={college.collegeCode} className="border-2 hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                {/* college header */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="font-bold text-foreground leading-snug">
                      {college.shortName}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="outline" className="gap-1 text-xs">
                        <MapPin className="h-3 w-3" />{college.district}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          'gap-1 text-xs',
                          college.collegeType === 'Government'
                            ? 'border-emerald-300 text-emerald-700'
                            : 'border-sky-300 text-sky-700',
                        )}
                      >
                        <Landmark className="h-3 w-3" />{college.collegeType}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Code {college.collegeCode}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 shrink-0">
                    {branches.length} branch{branches.length > 1 ? 'es' : ''}
                  </Badge>
                </div>

                {/* branch rows */}
                <div className="mt-3 divide-y divide-border/70">
                  {branches.map((b) => {
                    const s = TIER_STYLE[b.chance];
                    const Icon = s.icon;
                    return (
                      <div
                        key={b.branchCode}
                        className="flex items-center justify-between gap-3 py-2"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {b.branchName}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            2024 cutoff{' '}
                            <strong className="text-foreground">{b.referenceCutoff}</strong>
                            {' · '}
                            {b.matchBasis === 'exact'
                              ? `${engineeringResult.category} community`
                              : b.matchBasis === 'oc-estimate'
                                ? 'estimated from OC cutoff'
                                : 'rough estimate'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-muted-foreground hidden sm:block">
                            {b.gap >= 0 ? `+${b.gap}` : b.gap} marks
                          </span>
                          <Badge
                            className={cn(
                              'gap-1 border', s.bg, s.text, s.border,
                              'hover:opacity-90',
                            )}
                            variant="outline"
                          >
                            <Icon className="h-3 w-3" />{s.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {visible < grouped.length && (
            <div className="flex justify-center pt-1">
              <Button
                variant="outline"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="gap-2"
              >
                <ChevronDown className="h-4 w-4" />
                Show {Math.min(PAGE_SIZE, grouped.length - visible)} more colleges
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── Legend + source ──────────────────────────────────────── */}
      <Card className="bg-muted/40 border-dashed">
        <CardContent className="py-3 text-xs text-muted-foreground space-y-1.5">
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              <strong className="text-foreground">Safe</strong> = your mark is well above
              the 2024 cutoff · <strong className="text-foreground">Likely</strong> = just
              above it · <strong className="text-foreground">Reach</strong> = slightly below
              (cutoffs shift a little every year, so borderline branches are still shown).
            </span>
          </div>
          <div>
            Where a cutoff for your community was not recorded for a branch, the OC cutoff
            is used as a conservative reference. Source:{' '}
            <strong className="text-foreground">{TNEA_DATA_META.source}</strong> —{' '}
            {TNEA_DATA_META.documentTitle} ({TNEA_DATA_META.totalRecords} branch records,{' '}
            {TNEA_DATA_META.totalColleges} colleges). Always confirm on the official TNEA
            counselling website before making decisions.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TNEACollegePredictor;
