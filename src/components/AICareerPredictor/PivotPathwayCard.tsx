import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, GraduationCap, IndianRupee, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/data/courseDatabase';
import type { PivotPathway } from '@/data/predictor';

export interface PivotMatch {
  /** The course the student aspired to but was filtered out (for context). */
  aspiration: Course;
  /** The reason it was filtered out, in plain language. */
  filterReason: string;
  /** Editorial pathway: 2–4 viable alternatives. */
  pathway: PivotPathway;
  /** The resolved Course objects for each alternative (in pathway order). */
  resolvedAlternatives: Course[];
}

interface PivotPathwayCardProps {
  pivot: PivotMatch;
  /** Show the detail dialog for a course (reuses the existing course-detail viewer). */
  onCourseClick?: (course: Course) => void;
}

/**
 * Displayed at the TOP of the results page when the student's top
 * aspiration was hard-filtered out by their aversion choices, their
 * percentage, or their budget. The card acknowledges what they wanted
 * and offers curated alternatives — never silently drops the
 * aspiration.
 */
export function PivotPathwayCard({ pivot, onCourseClick }: PivotPathwayCardProps) {
  const { aspiration, filterReason, pathway, resolvedAlternatives } = pivot;

  if (!resolvedAlternatives.length) return null;

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10 mb-4 shadow-md">
      <CardContent className="p-5 md:p-6">
        {/* Header: aspiration acknowledgement */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-sm">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="border-amber-400 text-amber-700 bg-white/60 mb-1.5">
              Closest viable option
            </Badge>
            <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">
              {pathway.label.en}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
              You showed strong interest in <strong className="text-foreground">{aspiration.name}</strong>,
              but {filterReason}. Here are realistic alternatives that lead to a similar place.
            </p>
          </div>
        </div>

        {/* Alternative course cards */}
        <div className="space-y-2.5">
          {resolvedAlternatives.map((course, i) => {
            const alt = pathway.alternatives[i];
            return (
              <button
                key={course.id}
                onClick={() => onCourseClick?.(course)}
                className={cn(
                  'w-full text-left bg-white dark:bg-card rounded-lg border-2 border-amber-200 hover:border-amber-400',
                  'transition-all p-3.5 group',
                  onCourseClick && 'cursor-pointer hover:shadow-sm',
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{course.name}</span>
                      <Badge variant="outline" className="text-[10px] py-0 h-5 border-amber-300 text-amber-700">
                        {alt.closeness}% close to {aspiration.name.split(' ')[0]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {alt.rationale.en}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" /> {course.feesRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" /> {course.entranceExam}
                      </span>
                    </div>
                  </div>
                  {onCourseClick && (
                    <ArrowRight className="h-4 w-4 text-amber-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Honest footer */}
        <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
          These suggestions come from a curated list reviewed by counsellors. Your full ranked
          list of <strong className="text-foreground">{aspiration.name}-compatible</strong> options
          continues below.
        </p>
      </CardContent>
    </Card>
  );
}

export default PivotPathwayCard;
