import { Sparkles, Heart, Brush, Cpu, AlertTriangle, Wrench, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COURSE_TAGS, type AutomationTag } from '@/data/predictor';

interface AutomationTagCalloutProps {
  /** courseId — must match an entry in courseDatabase. */
  courseId: string;
}

/** Visual + label per automation outlook. Keep tones informational, not alarming. */
const TAG_STYLE: Record<AutomationTag, {
  label: string;
  Icon: typeof Sparkles;
  /** Tailwind classes for the chip. */
  chip: string;
  /** Tailwind classes for the icon. */
  icon: string;
}> = {
  high_human_judgment: {
    label: 'High human judgment',
    Icon: Lightbulb,
    chip: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    icon: 'text-emerald-600',
  },
  human_facing: {
    label: 'People-facing work',
    Icon: Heart,
    chip: 'bg-rose-50 border-rose-200 text-rose-800',
    icon: 'text-rose-600',
  },
  creative_judgment: {
    label: 'Creative judgment',
    Icon: Brush,
    chip: 'bg-violet-50 border-violet-200 text-violet-800',
    icon: 'text-violet-600',
  },
  ai_augmented: {
    label: 'AI-augmented role',
    Icon: Cpu,
    chip: 'bg-sky-50 border-sky-200 text-sky-800',
    icon: 'text-sky-600',
  },
  increasingly_automated: {
    label: 'Routine work increasingly automated',
    Icon: AlertTriangle,
    chip: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: 'text-amber-600',
  },
  physical_skilled: {
    label: 'Physical, skilled trade',
    Icon: Wrench,
    chip: 'bg-stone-50 border-stone-300 text-stone-800',
    icon: 'text-stone-600',
  },
};

/**
 * Renders the qualitative automation outlook for a course as a small
 * informational chip + one-line editorial note. NOT a score; tags are
 * curated, editorial labels (see src/data/predictor/courseTags.ts).
 *
 * Quietly returns null when no tag is registered for the course, so
 * untagged courses don't show a misleading default outlook.
 */
export function AutomationTagCallout({ courseId }: AutomationTagCalloutProps) {
  const tags = COURSE_TAGS[courseId];
  // Skip the callout entirely for untagged courses rather than guess
  // — surfacing the FALLBACK tag here would be misleading.
  if (!tags) return null;

  const style = TAG_STYLE[tags.automation];
  if (!style) return null;

  const { Icon, label, chip, icon } = style;

  return (
    <div className="mt-4 p-3 rounded-lg border bg-card">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Future of this work
        </span>
      </div>
      <div className="flex items-start gap-2.5">
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium shrink-0',
          chip,
        )}>
          <Icon className={cn('h-3.5 w-3.5', icon)} />
          {label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
        {tags.automationNote.en}
      </p>
    </div>
  );
}

export default AutomationTagCallout;
