import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

export type VerificationStatus = 'verified' | 'unverified' | 'flagged';

interface VerificationBadgeProps {
  status: VerificationStatus;
  /** ISO date string of last verification — optional */
  lastVerified?: string;
  /** Show only the icon, no label text */
  iconOnly?: boolean;
  className?: string;
}

const config: Record<VerificationStatus, {
  label: string;
  Icon: typeof ShieldCheck;
  badgeClass: string;
  tooltip: (date?: string) => string;
}> = {
  verified: {
    label: 'Verified',
    Icon: ShieldCheck,
    badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    tooltip: (date) =>
      date
        ? `Verified against official source on ${date}`
        : 'Verified against official source',
  },
  unverified: {
    label: 'Unverified',
    Icon: ShieldQuestion,
    badgeClass: 'text-amber-700 bg-amber-50 border-amber-200',
    tooltip: () =>
      'Compiled from public sources. Please confirm with the institution before deciding.',
  },
  flagged: {
    label: 'Under review',
    Icon: ShieldAlert,
    badgeClass: 'text-red-700 bg-red-50 border-red-200',
    tooltip: () =>
      'A user has reported this data may be incorrect. We are reviewing it.',
  },
};

/**
 * Small badge showing whether a record's data has been verified against an
 * official source. Tooltip explains the status. Use next to college names,
 * cutoff values, fees, etc.
 */
export function VerificationBadge({
  status,
  lastVerified,
  iconOnly = false,
  className,
}: VerificationBadgeProps) {
  const cfg = config[status];
  const Icon = cfg.Icon;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium',
              cfg.badgeClass,
              className
            )}
          >
            <Icon className="h-3 w-3" />
            {!iconOnly && <span>{cfg.label}</span>}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs">
          {cfg.tooltip(lastVerified)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default VerificationBadge;
