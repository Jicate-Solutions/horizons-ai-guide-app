import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import type { CareerPathway } from '@/data/careerPathways';

interface CareerRoadmapProps {
  pathway: CareerPathway;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
};

const phaseMeta = {
  now: {
    label: 'You are here',
    node: 'bg-emerald-500 ring-4 ring-emerald-100',
    card: 'border-emerald-300 bg-emerald-50/60',
    badge: 'bg-emerald-500 text-white',
  },
  next: {
    label: 'Next',
    node: 'bg-blue-500',
    card: 'border-gray-200 hover:bg-gray-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  later: {
    label: 'Later',
    node: 'bg-gray-300',
    card: 'border-gray-200 hover:bg-gray-50',
    badge: 'bg-gray-100 text-gray-600',
  },
} as const;

/**
 * The roadmap is now genuinely per-career. A Doctor's roadmap talks about NEET
 * and counselling; a CA's roadmap talks about ICAI registration and articleship;
 * a Lawyer's roadmap talks about CLAT and the 5-year integrated degree. None of
 * this is shared boilerplate — it all comes from the curated CAREER_PATHWAYS
 * data, so the "Personalised" label is finally true.
 */
export const CareerRoadmap = ({ pathway }: CareerRoadmapProps) => {
  return (
    <Card className="overflow-hidden border-gray-200">
      <div className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <MapPin className="h-4 w-4 text-emerald-600" />
          Your Roadmap to {pathway.title}
        </h3>
        <p className="text-[13px] text-gray-500">
          {pathway.titleTa} — the actual sequence of steps from here
        </p>
      </div>

      <CardContent className="p-4">
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Timeline spine */}
          <div className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-gradient-to-b from-emerald-400 via-blue-300 to-gray-200" />

          <div className="space-y-4">
            {pathway.roadmap.map((stage, index) => {
              const meta = phaseMeta[stage.phase];
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-9"
                >
                  {/* Node */}
                  <div
                    className={`absolute left-0 top-1 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white shadow ${meta.node}`}
                  >
                    {stage.phase === 'now' ? (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    ) : (
                      <span className="text-[12px] font-bold text-white">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className={`rounded-lg border p-3 transition-all ${meta.card}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <p className="text-[14px] font-semibold text-gray-900">
                            {stage.title}
                          </p>
                          <Badge
                            className={`px-1.5 py-0 text-[11px] font-bold ${meta.badge}`}
                          >
                            {meta.label}
                          </Badge>
                        </div>
                        <p className="text-[12px] text-gray-500">
                          {stage.titleTa}
                        </p>
                      </div>
                      <span className="shrink-0 rounded bg-white/70 px-1.5 py-0.5 text-[11px] font-medium text-gray-500">
                        {stage.window}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-snug text-gray-600">
                      {stage.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CareerRoadmap;
