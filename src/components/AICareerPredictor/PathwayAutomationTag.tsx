import { Sparkles, Heart, Brush, Cpu, AlertTriangle, Wrench, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CareerPathway } from '@/data/careerPathways';
import type { AutomationTag } from '@/data/predictor';

interface PathwayAutomationTagProps {
  /** The career pathway whose automation outlook should be shown. */
  pathway: CareerPathway;
}

/** Visual + label per automation outlook. Informational, never alarming. */
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
 * Renders the qualitative automation outlook for a career as a small
 * informational chip + one-line editorial note. NOT a score — see
 * AI_PREDICTOR_V2_DESIGN.md §7. Data comes from the CareerPathway itself
 * (single source of truth, no side-table join).
 *
 * Quietly returns null when no tag is set on the pathway, so untagged
 * careers don't show a misleading default outlook.
 */
export function PathwayAutomationTag({ pathway }: PathwayAutomationTagProps) {
  // Skip the callout entirely for untagged pathways rather than guess.
  if (!pathway.automation || !pathway.automationNote) return null;

  const style = TAG_STYLE[pathway.automation];
  if (!style) return null;

  const { Icon, label, chip, icon } = style;

  return (
    <div className="mt-3 rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Future of this work
        </span>
      </div>
      <div className="flex items-start gap-2.5">
        <span className={cn(
          'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
          chip,
        )}>
          <Icon className={cn('h-3.5 w-3.5', icon)} />
          {label}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {pathway.automationNote}
      </p>
    </div>
  );
}

export default PathwayAutomationTag;
