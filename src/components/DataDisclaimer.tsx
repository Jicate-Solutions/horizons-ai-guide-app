import { Info } from 'lucide-react';
import { ReportIncorrectInfo } from './ReportIncorrectInfo';

interface DataDisclaimerProps {
  /** Type of data shown on this page — used to scope the report */
  entityType?: string;
  /** Optional compact variant */
  variant?: 'banner' | 'inline';
  className?: string;
}

/**
 * Honest disclaimer about data accuracy. Shows on pages that display
 * compiled public data (colleges, exams, courses) so users know to verify.
 */
export function DataDisclaimer({
  entityType = 'other',
  variant = 'banner',
  className,
}: DataDisclaimerProps) {
  if (variant === 'inline') {
    return (
      <p className={`text-xs text-muted-foreground flex items-center gap-1.5 ${className ?? ''}`}>
        <Info className="w-3 h-3 inline-block" />
        Data compiled from public sources. Verify directly with the institution before making decisions.
        <ReportIncorrectInfo entityType={entityType} variant="link" size="sm" className="h-auto p-0 text-xs" />
      </p>
    );
  }

  return (
    <div
      className={`bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2 ${className ?? ''}`}
      role="note"
    >
      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1 text-sm text-blue-900">
        <strong className="font-semibold">A note on accuracy: </strong>
        This information is compiled from public sources (official websites, AICTE, UGC, NAAC, NBA, NIRF) and is updated periodically.
        We recommend verifying directly with the institution before making any final decisions.
        Spotted something incorrect?
        <ReportIncorrectInfo
          entityType={entityType}
          variant="link"
          size="sm"
          className="h-auto p-0 ml-1 text-blue-700 underline"
        />
      </div>
    </div>
  );
}

export default DataDisclaimer;
