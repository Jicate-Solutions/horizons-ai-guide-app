import { GraduationCap, Route, Briefcase, Landmark, Clock } from 'lucide-react';
import type { CareerPathway } from '@/data/careerPathways';

interface PathwayTypeBannerProps {
  pathway: CareerPathway;
  /** 'compact' for the small summary cards, 'full' for the detail header */
  variant?: 'compact' | 'full';
}

/**
 * WHY THIS EXISTS:
 * A 12th student seeing "Civil Servant — 84% Strong match" with an
 * "Exam: None (direct admission)" chip could reasonably think they can step
 * into that role straight after board exams. They cannot — it needs a full
 * degree first, then years of competitive exams.
 *
 * This banner makes the REAL route unmistakable. Every career is honestly
 * classified by HOW a 12th student reaches it, and the long-game careers carry
 * a clear, visually distinct warning-toned banner so nobody is misled.
 */

const TYPE_META: Record<
  CareerPathway['pathwayType'],
  {
    label: string;
    labelTa: string;
    icon: typeof GraduationCap;
    // tone: 'direct' = calm green, 'long' = amber so it visually reads as
    // "read this carefully, this is a longer commitment"
    tone: 'direct' | 'professional' | 'long';
  }
> = {
  'direct-after-12th': {
    label: 'Direct after 12th',
    labelTa: '12-க்குப் பிறகு நேரடி',
    icon: GraduationCap,
    tone: 'direct',
  },
  'professional-track': {
    label: 'Professional course after 12th',
    labelTa: '12-க்குப் பிறகு தொழில்முறை படிப்பு',
    icon: Route,
    tone: 'professional',
  },
  'degree-then-exam': {
    label: 'Needs a degree first, then a competitive exam',
    labelTa: 'முதலில் பட்டப்படிப்பு, பின் போட்டித் தேர்வு',
    icon: Landmark,
    tone: 'long',
  },
  'degree-then-build': {
    label: 'Needs a degree first, then years of building',
    labelTa: 'முதலில் பட்டப்படிப்பு, பின் பல ஆண்டு உழைப்பு',
    icon: Briefcase,
    tone: 'long',
  },
};

const TONE_CLASSES: Record<
  'direct' | 'professional' | 'long',
  { box: string; icon: string; label: string; time: string }
> = {
  direct: {
    box: 'border-emerald-200 bg-emerald-50',
    icon: 'text-emerald-600',
    label: 'text-emerald-800',
    time: 'text-emerald-700',
  },
  professional: {
    box: 'border-blue-200 bg-blue-50',
    icon: 'text-blue-600',
    label: 'text-blue-800',
    time: 'text-blue-700',
  },
  long: {
    box: 'border-amber-300 bg-amber-50',
    icon: 'text-amber-600',
    label: 'text-amber-900',
    time: 'text-amber-800',
  },
};

export const PathwayTypeBanner = ({
  pathway,
  variant = 'full',
}: PathwayTypeBannerProps) => {
  const meta = TYPE_META[pathway.pathwayType];
  const tone = TONE_CLASSES[meta.tone];
  const Icon = meta.icon;

  // Compact: a single inline pill for the summary cards.
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 ${tone.box}`}
      >
        <Icon className={`h-3 w-3 ${tone.icon}`} />
        <span className={`text-[9.5px] font-bold leading-tight ${tone.label}`}>
          {meta.label}
        </span>
      </div>
    );
  }

  // Full: the prominent banner shown in the career detail header.
  return (
    <div className={`rounded-lg border p-3 ${tone.box}`}>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 shrink-0">
          <Icon className={`h-5 w-5 ${tone.icon}`} />
        </div>
        <div className="min-w-0">
          <p className={`text-[12px] font-bold ${tone.label}`}>
            {meta.label}
          </p>
          <p className="text-[10px] text-gray-500">{meta.labelTa}</p>
          <div className="mt-1.5 flex items-start gap-1">
            <Clock className={`mt-0.5 h-3 w-3 shrink-0 ${tone.icon}`} />
            <p className={`text-[11px] font-medium leading-snug ${tone.time}`}>
              {pathway.timeToCareer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayTypeBanner;
