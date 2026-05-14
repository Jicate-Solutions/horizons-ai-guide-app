import { GraduationCap, Route, Clock } from 'lucide-react';
import type { CareerPathway } from '@/data/careerPathways';

interface PathwayTypeBannerProps {
  pathway: CareerPathway;
  /** 'compact' for the small summary cards, 'full' for the detail header */
  variant?: 'compact' | 'full';
}

/**
 * WHY THIS EXISTS:
 * Earlier, careers like "Civil Servant" appeared in the predictor with an
 * "Exam: None (direct admission)" chip — which wrongly implied a 12th student
 * could step into that role straight after board exams. Those degree-first
 * careers have since been removed from the dataset entirely.
 *
 * This banner remains to make the REAL route unmistakable for the careers that
 * ARE shown — every one of which a 12th student can act on now. It states the
 * route plainly and shows the honest `timeToCareer` so a student knows what
 * they are committing to before they get excited about a match score.
 *
 * There are only two pathway types now:
 *   - 'direct-after-12th'  — join the UG course straight after 12th
 *   - 'professional-track' — register for a professional course directly (CA)
 */

const TYPE_META: Record<
  CareerPathway['pathwayType'],
  {
    label: string;
    labelTa: string;
    icon: typeof GraduationCap;
    tone: 'direct' | 'professional';
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
};

const TONE_CLASSES: Record<
  'direct' | 'professional',
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
          <p className={`text-[12px] font-bold ${tone.label}`}>{meta.label}</p>
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
