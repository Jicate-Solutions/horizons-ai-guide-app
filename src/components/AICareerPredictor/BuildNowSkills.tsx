import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, ArrowUpRight } from 'lucide-react';
import type { CareerPathway } from '@/data/careerPathways';

interface BuildNowSkillsProps {
  pathway: CareerPathway;
}

/**
 * "Start building these now." The old tool collected skill self-ratings but
 * never told the student what to actually DO with them. This closes that loop:
 * for the chosen career, it names the specific skills worth building before
 * college even starts — each with WHY it matters and a genuinely free resource.
 *
 * This is the part a 12th student can act on tonight, for free, regardless of
 * which college they eventually get into.
 */
export const BuildNowSkills = ({ pathway }: BuildNowSkillsProps) => {
  return (
    <Card className="overflow-hidden border-gray-200">
      <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <Dumbbell className="h-4 w-4 text-indigo-600" />
          Skills to Start Building Now
        </h3>
        <p className="text-sm text-gray-500">
          இப்போதே வளர்க்க வேண்டிய திறன்கள் — free, and you can begin today
        </p>
      </div>

      <CardContent className="space-y-2.5 p-3">
        {pathway.buildNowSkills.map((s, index) => (
          <motion.div
            key={s.skill}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-lg border border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-gray-900">
                {s.skill}
              </p>
            </div>
            <p className="mt-1 text-sm leading-snug text-gray-600">
              {s.why}
            </p>
            <div className="mt-1.5 flex items-start gap-1 rounded-md bg-indigo-50/70 px-2 py-1">
              <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 text-indigo-500" />
              <p className="text-xs leading-snug text-indigo-800">
                <span className="font-semibold">Free start:</span>{' '}
                {s.freeResource}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BuildNowSkills;
