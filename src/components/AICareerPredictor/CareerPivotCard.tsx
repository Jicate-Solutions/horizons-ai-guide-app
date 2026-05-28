import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CAREER_PIVOT_PATHWAYS,
  resolvePivotAlternatives,
} from '@/data/careerPivotPathways';
import { CAREER_PATHWAYS } from '@/data/careerPathways';
import type { CareerMatch } from '@/lib/careerScoring';

interface CareerPivotCardProps {
  /** The CareerMatch that was hard-filtered out by aversions. */
  filteredAspiration: CareerMatch;
  /** Called when a student taps an alternative career card. */
  onSelectAlternative?: (pathwayId: string) => void;
}

/**
 * Renders the "Closest viable option" card at the top of the results
 * dashboard when the aversion swipe deck eliminated a high-aspiration
 * career. The aspiration is acknowledged by name, NOT silently
 * discarded.
 *
 * Returns null when no curated pivot exists for the filtered career —
 * that's intentional. We'd rather omit the card than guess.
 */
export function CareerPivotCard({
  filteredAspiration,
  onSelectAlternative,
}: CareerPivotCardProps) {
  const aspiration = filteredAspiration.pathway;
  const pivot = CAREER_PIVOT_PATHWAYS.find(
    (p) => p.fromPathwayId === aspiration.id,
  );
  if (!pivot) return null;

  const resolved = resolvePivotAlternatives(pivot, CAREER_PATHWAYS);
  if (resolved.length === 0) return null;

  return (
    <Card className="mb-4 overflow-hidden border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-md">
      <CardContent className="p-5 md:p-6">
        {/* Header: aspiration acknowledgement */}
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <Badge
              variant="outline"
              className="mb-1.5 border-amber-400 bg-white/60 text-amber-700"
            >
              Closest viable option
            </Badge>
            <h3 className="text-base font-bold leading-snug text-foreground md:text-lg">
              {pivot.label}
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground md:text-sm">
              You showed strong interest in{' '}
              <strong className="text-foreground">{aspiration.title}</strong>,
              but your aversion choices rule it out. Here are realistic
              alternatives that lead to a similar place.
            </p>
          </div>
        </div>

        {/* Alternative career cards */}
        <div className="space-y-2.5">
          {resolved.map(({ alt, pathway }) => (
            <button
              key={pathway.id}
              type="button"
              onClick={() => onSelectAlternative?.(pathway.id)}
              className={cn(
                'group w-full rounded-lg border-2 border-amber-200 bg-white p-3.5 text-left',
                'transition-all hover:border-amber-400 hover:shadow-sm',
                onSelectAlternative && 'cursor-pointer',
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none">{pathway.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {pathway.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="h-5 border-amber-300 py-0 text-[10px] text-amber-700"
                    >
                      {alt.closeness}% close to {aspiration.title.split(' ')[0]}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {alt.rationale}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    UG route: {pathway.ugCourses[0]}
                    {pathway.ugCourses.length > 1 ? ' (and others)' : ''}
                    {' · '}Time to career: {pathway.timeToCareer}
                  </p>
                </div>
                {onSelectAlternative && (
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-600 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Honest footer */}
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          These suggestions come from a curated list reviewed by counsellors.
          Your ranked list of <strong className="text-foreground">{aspiration.title}-compatible</strong>{' '}
          alternatives continues below.
        </p>
      </CardContent>
    </Card>
  );
}

export default CareerPivotCard;
