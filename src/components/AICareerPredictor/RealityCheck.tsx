import { motion } from 'framer-motion';
import {
  IndianRupee,
  TrendingUp,
  Gauge,
  Building2,
  LifeBuoy,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { CareerPathway } from '@/data/careerPathways';

interface RealityCheckProps {
  pathway: CareerPathway;
}

/** A small 1-10 dot meter — honest, not hype. */
const DotMeter = ({ score, tone }: { score: number; tone: string }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 10 }).map((_, i) => (
      <span
        key={i}
        className={`h-1.5 w-1.5 rounded-full ${i < score ? tone : 'bg-gray-200'}`}
      />
    ))}
  </div>
);

/**
 * The honesty layer. A reviewer — or a worried parent — should be able to read
 * this and feel the tool is telling the truth: real cutoffs, real fee ranges,
 * real demand, real backups, and the one uncomfortable caveat a good counsellor
 * would still say out loud. No inflated numbers, no false reassurance.
 */
export const RealityCheck = ({ pathway }: RealityCheckProps) => {
  return (
    <Card className="overflow-hidden border-gray-200">
      <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <Gauge className="h-4 w-4 text-slate-600" />
          The Honest Reality Check
        </h3>
        <p className="text-[13px] text-gray-500">
          நேர்மையான யதார்த்தம் — what a good counsellor would actually tell you
        </p>
      </div>

      <CardContent className="space-y-4 p-4">
        {/* Salary reality */}
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <IndianRupee className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800">Salary — the real picture</p>
            <p className="mt-0.5 text-[13px] leading-snug text-gray-600">
              <span className="font-semibold">Starting:</span>{' '}
              {pathway.salaryReality.startingLPA}
            </p>
            <p className="text-[13px] leading-snug text-gray-600">
              <span className="font-semibold">Mid-career:</span>{' '}
              {pathway.salaryReality.midCareerLPA}
            </p>
            <p className="mt-1 text-[12px] italic leading-snug text-gray-500">
              {pathway.salaryReality.note}
            </p>
          </div>
        </div>

        {/* Demand + difficulty meters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[13px] font-bold text-gray-800">
                Job demand
              </span>
              <span className="ml-auto text-[13px] tabular-nums text-gray-500">
                {pathway.demand.score}/10
              </span>
            </div>
            <div className="my-1.5">
              <DotMeter score={pathway.demand.score} tone="bg-blue-500" />
            </div>
            <p className="text-[12px] leading-snug text-gray-500">
              {pathway.demand.note}
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-2.5">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[13px] font-bold text-gray-800">
                Entry difficulty
              </span>
              <span className="ml-auto text-[13px] tabular-nums text-gray-500">
                {pathway.entryDifficulty.score}/10
              </span>
            </div>
            <div className="my-1.5">
              <DotMeter score={pathway.entryDifficulty.score} tone="bg-amber-500" />
            </div>
            <p className="text-[12px] leading-snug text-gray-500">
              {pathway.entryDifficulty.note}
            </p>
          </div>
        </div>

        {/* College tiers with real cutoffs + fees */}
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-gray-800">
            <Building2 className="h-3.5 w-3.5 text-violet-600" />
            Where you can study — by tier
          </p>
          <div className="space-y-1.5">
            {pathway.collegeTiers.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-gray-100 bg-white p-2.5"
              >
                <p className="text-[13px] font-semibold text-gray-800">
                  {tier.label}
                </p>
                <p className="mt-0.5 text-[12px] text-gray-500">
                  {tier.examples.join(' · ')}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                  <span className="text-[12px] text-gray-600">
                    <span className="font-semibold">Cutoff:</span> {tier.cutoffGuide}
                  </span>
                  <span className="text-[12px] text-gray-600">
                    <span className="font-semibold">Fees:</span> {tier.feeRange}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-1.5 text-[12px] italic text-gray-500">
            {pathway.costReality}
          </p>
        </div>

        {/* Backup options */}
        <div className="rounded-lg border border-sky-100 bg-sky-50/60 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
            <LifeBuoy className="h-3.5 w-3.5" />
            If the main plan does not work out — your backups
          </p>
          <ul className="mt-1.5 space-y-1">
            {pathway.backupOptions.map((opt) => (
              <li
                key={opt}
                className="flex gap-1.5 text-[13px] leading-snug text-sky-900"
              >
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                {opt}
              </li>
            ))}
          </ul>
        </div>

        {/* The honest caveat */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5" />
            The one thing to be honest with yourself about
          </p>
          <p className="mt-1 text-[13px] leading-snug text-amber-900">
            {pathway.honestCaveat}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealityCheck;
