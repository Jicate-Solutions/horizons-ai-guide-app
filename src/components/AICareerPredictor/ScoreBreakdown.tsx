import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calculator, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { CareerMatch } from '@/lib/careerScoring';
import { SCORING_METHODOLOGY } from '@/lib/careerScoring';

interface ScoreBreakdownProps {
  match: CareerMatch;
  /** Render expanded by default (used for the #1 result) */
  defaultOpen?: boolean;
}

const bandMeta: Record<
  CareerMatch['band'],
  { label: string; labelTa: string; tone: string; bar: string }
> = {
  strong: {
    label: 'Strong match',
    labelTa: 'வலுவான பொருத்தம்',
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    bar: 'bg-emerald-500',
  },
  good: {
    label: 'Good match',
    labelTa: 'நல்ல பொருத்தம்',
    tone: 'text-blue-700 bg-blue-50 border-blue-200',
    bar: 'bg-blue-500',
  },
  stretch: {
    label: 'Reach option',
    labelTa: 'சவாலான தேர்வு',
    tone: 'text-amber-700 bg-amber-50 border-amber-200',
    bar: 'bg-amber-500',
  },
};

/**
 * Shows EXACTLY how a career's match score was calculated — component by
 * component, with the reason for each. This is the single most important piece
 * of the credibility rebuild: the score is no longer a number to trust on
 * faith, it is arithmetic the student (or a reviewer) can verify.
 */
export const ScoreBreakdown = ({ match, defaultOpen = false }: ScoreBreakdownProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const meta = bandMeta[match.band];

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left transition-colors hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Calculator className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-700">
              Why {match.score}%? See the calculation
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Card className="mt-2 border-gray-200">
          <CardContent className="space-y-3 p-3">
            {/* Band label */}
            <div
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[13px] font-bold ${meta.tone}`}
            >
              {meta.label} · {match.score}/100
            </div>

            {/* Component bars */}
            <div className="space-y-2.5">
              {match.breakdown.map((c) => {
                const pct = c.max > 0 ? (c.earned / c.max) * 100 : 0;
                return (
                  <div key={c.label}>
                    <div className="mb-0.5 flex items-baseline justify-between">
                      <span className="text-[13px] font-semibold text-gray-700">
                        {c.label}
                      </span>
                      <span className="text-[13px] tabular-nums text-gray-500">
                        {c.earned}
                        <span className="text-gray-400"> / {c.max}</span>
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${meta.bar}`}
                      />
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-gray-500">
                      {c.reason}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Methodology note — the transparency statement */}
            <div className="flex gap-2 rounded-md bg-gray-50 p-2">
              <Info className="mt-0.5 h-3 w-3 shrink-0 text-gray-400" />
              <p className="text-[12px] leading-snug text-gray-500">
                {SCORING_METHODOLOGY.en}
              </p>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ScoreBreakdown;
