/**
 * <DataFreshnessTag /> — a small honest indicator showing when a data set
 * was last verified, what source it came from, and a link out to the
 * authoritative source. Rendered at the top or bottom of any screen that
 * displays curated / time-sensitive data.
 *
 * Two visual variants:
 *   - 'inline' (default) — a compact one-line strip suitable for placement
 *     above or below a data table.
 *   - 'banner' — a slightly more prominent block, suitable for the top of
 *     a results page where students are most likely to act on the data.
 */

import { Clock, ExternalLink, Info } from 'lucide-react';
import { DATA_FRESHNESS, type DataKey } from './dataFreshness';
import { cn } from '@/lib/utils';

interface DataFreshnessTagProps {
  dataKey: DataKey;
  variant?: 'inline' | 'banner';
  className?: string;
}

export const DataFreshnessTag = ({
  dataKey,
  variant = 'inline',
  className,
}: DataFreshnessTagProps) => {
  const info = DATA_FRESHNESS[dataKey];
  if (!info) return null;

  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'rounded-xl border border-blue-200 bg-blue-50/50 p-3 flex items-start gap-2.5',
          className,
        )}
      >
        <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1 text-[12px] leading-relaxed">
          <p className="font-bold text-blue-900">
            Data current as of {info.lastUpdated}
          </p>
          <p className="text-blue-800 mt-0.5">
            Source: {info.source}
            {info.sourceUrl && (
              <>
                {' — '}
                <a
                  href={info.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 underline font-semibold hover:text-blue-900"
                >
                  verify on official site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </>
            )}
          </p>
          {info.note && (
            <p className="text-blue-700/80 mt-1 italic">{info.note}</p>
          )}
        </div>
      </div>
    );
  }

  // Default: inline strip.
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500',
        className,
      )}
    >
      <Clock className="w-3 h-3 flex-shrink-0" />
      <span>
        Data current as of <strong className="text-gray-700">{info.lastUpdated}</strong>
      </span>
      {info.sourceUrl && (
        <>
          <span className="text-gray-300">·</span>
          <a
            href={info.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 underline hover:text-gray-700"
          >
            verify on official site
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </>
      )}
    </div>
  );
};
