import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  ChevronDown,
  ExternalLink,
  MapPin,
  Search,
  Info,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { CareerPathway } from '@/data/careerPathways';
import {
  resolveCollegesForCareer,
  groupByTier,
  TIER_LABELS,
  type CollegeTierKey,
} from '@/lib/collegeResolver';

interface CollegesForCareerProps {
  pathway: CareerPathway;
}

const tierTone: Record<CollegeTierKey, string> = {
  government: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  aided: 'bg-teal-100 text-teal-700 border-teal-200',
  private: 'bg-rose-100 text-rose-700 border-rose-200',
};

// How many colleges to show before the "see more" fold, per tier.
const PREVIEW_PER_TIER = 4;

/**
 * Answers the question every student asks after seeing a recommended course:
 * "Where can I actually study this?"
 *
 * It lists REAL Tamil Nadu colleges — pulled from the app's verified TNEA and
 * NEET datasets via collegeResolver — grouped government-first (which is itself
 * honest advice). For careers with no centralised college list (CA, Law,
 * Teacher, etc.) it shows clear guidance instead of a misleading half-list, and
 * every variant links out to the full College Finder for deeper search.
 */
export const CollegesForCareer = ({ pathway }: CollegesForCareerProps) => {
  const navigate = useNavigate();
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());

  const resolution = useMemo(
    () => resolveCollegesForCareer(pathway, { limit: 30 }),
    [pathway],
  );

  const grouped = useMemo(
    () => groupByTier(resolution.colleges),
    [resolution.colleges],
  );

  const toggleTier = (tier: string) =>
    setExpandedTiers((prev) => {
      const next = new Set(prev);
      next.has(tier) ? next.delete(tier) : next.add(tier);
      return next;
    });

  const goToFinder = () => {
    // The College Finder lives at this route. It has its own district / fee /
    // category filters; we send the student straight there to continue.
    navigate('/career-assessment/colleges/find-colleges');
  };

  const hasColleges = resolution.colleges.length > 0;

  return (
    <Card className="overflow-hidden border-gray-200">
      <div className="border-b border-gray-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <Building2 className="h-4 w-4 text-violet-600" />
          Where You Can Study This — Real Colleges
        </h3>
        <p className="text-[13px] text-gray-500">
          இந்தப் படிப்பை எங்கே படிக்கலாம் — actual Tamil Nadu colleges
        </p>
      </div>

      <CardContent className="space-y-3 p-4">
        {/* ── Honest guidance note (always shown when present) ───────── */}
        {resolution.guidanceNote && (
          <div className="flex gap-2 rounded-lg border border-sky-100 bg-sky-50/70 p-2.5">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
            <p className="text-[13px] leading-snug text-sky-900">
              {resolution.guidanceNote}
            </p>
          </div>
        )}

        {/* ── Real college list, grouped by tier ─────────────────────── */}
        {hasColleges &&
          grouped.map(({ tier, colleges }) => {
            const meta = TIER_LABELS[tier];
            const isExpanded = expandedTiers.has(tier);
            const visible = isExpanded
              ? colleges
              : colleges.slice(0, PREVIEW_PER_TIER);
            const hiddenCount = colleges.length - visible.length;

            return (
              <div key={tier}>
                <div className="mb-1.5 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`px-1.5 py-0 text-[12px] font-bold ${tierTone[tier]}`}
                  >
                    {meta.label}
                  </Badge>
                  <span className="text-[12px] text-gray-400">
                    {meta.note}
                  </span>
                  <span className="ml-auto text-[12px] tabular-nums text-gray-400">
                    {colleges.length} college{colleges.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {visible.map((college, i) => (
                    <motion.div
                      key={`${college.name}-${i}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-lg border border-gray-150 bg-white p-2.5"
                      style={{ borderColor: 'rgb(229 231 235)' }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-semibold leading-snug text-gray-900">
                            {college.name}
                          </p>
                          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            {college.district && (
                              <span className="flex items-center gap-0.5 text-[12px] text-gray-500">
                                <MapPin className="h-2.5 w-2.5" />
                                {college.district}
                              </span>
                            )}
                            <span className="text-[12px] text-gray-400">
                              {college.matchedCourse}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[12px] text-gray-400">
                            {college.detail}
                          </p>
                        </div>
                        {college.website && (
                          <a
                            href={
                              college.website.startsWith('http')
                                ? college.website
                                : `https://${college.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-md bg-gray-50 p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            aria-label="Official website"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hiddenCount > 0 && (
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={() => toggleTier(tier)}
                  >
                    <CollapsibleTrigger className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-md py-1 text-[12px] font-semibold text-violet-600 hover:bg-violet-50">
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                      {isExpanded
                        ? 'Show fewer'
                        : `Show ${hiddenCount} more ${meta.label.toLowerCase()} college${hiddenCount > 1 ? 's' : ''}`}
                    </CollapsibleTrigger>
                    <CollapsibleContent />
                  </Collapsible>
                )}
              </div>
            );
          })}

        {/* ── Source + total, for transparency ───────────────────────── */}
        {hasColleges && (
          <p className="text-[12px] italic text-gray-400">
            {resolution.totalFound} matching college
            {resolution.totalFound > 1 ? 's' : ''} found in Tamil Nadu
            {resolution.source === 'tnea' || resolution.source === 'tnea+guidance'
              ? ' (TNEA counselling list)'
              : resolution.source === 'neet'
                ? ' (NEET medical college data)'
                : ''}
            . Always verify current fees, cutoffs and seats on each college's
            official website before applying.
          </p>
        )}

        {/* ── Always-present link to the full College Finder ─────────── */}
        <button
          onClick={goToFinder}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 py-2 text-[13px] font-semibold text-violet-700 transition-colors hover:bg-violet-100"
        >
          <Search className="h-3.5 w-3.5" />
          {hasColleges
            ? 'Open the full College Finder to filter by district, fees & more'
            : 'Search colleges in the College Finder'}
        </button>
      </CardContent>
    </Card>
  );
};

export default CollegesForCareer;
