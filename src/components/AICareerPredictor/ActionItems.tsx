import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ListChecks, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { CareerPathway } from '@/data/careerPathways';

interface ActionItemsProps {
  pathway: CareerPathway;
}

const priorityMeta = {
  high: {
    label: 'This week',
    chip: 'border-red-200 bg-red-50 text-red-700',
  },
  medium: {
    label: 'This month',
    chip: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  low: {
    label: 'Within 90 days',
    chip: 'border-blue-200 bg-blue-50 text-blue-700',
  },
} as const;

/**
 * The 90-day action plan. Unlike the old version — which showed the SAME six
 * generic items to every student — this is generated from the chosen career's
 * own `ninetyDayPlan`. A Commerce student aiming at CA never sees "Register for
 * NEET". Each item is concrete, prioritised by when to do it, and links either
 * to an official portal or to the relevant VAZHIKATTI tool.
 *
 * Progress is persisted in localStorage, keyed per career, so a student can
 * close the app and come back to their checklist.
 */
export const ActionItems = ({ pathway }: ActionItemsProps) => {
  const navigate = useNavigate();
  const storageKey = `vzk_action_plan_${pathway.id}`;

  const [checked, setChecked] = useState<Set<number>>(new Set());

  // Load saved progress for THIS career on mount / career change.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const arr = JSON.parse(raw) as number[];
        setChecked(new Set(arr));
      } else {
        setChecked(new Set());
      }
    } catch {
      setChecked(new Set());
    }
  }, [storageKey]);

  const toggle = useCallback(
    (index: number) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        try {
          localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
        } catch {
          /* storage unavailable — progress simply won't persist */
        }
        return next;
      });
    },
    [storageKey],
  );

  const items = pathway.ninetyDayPlan;
  const done = checked.size;
  const total = items.length;
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <Card className="overflow-hidden border-gray-200">
      <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <ListChecks className="h-4 w-4 text-orange-600" />
              Your Next 90 Days
            </h3>
            <p className="text-[11px] text-gray-500">
              அடுத்த 90 நாட்கள் — concrete steps for {pathway.title}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-orange-600">
              {done}
              <span className="text-sm text-gray-400">/{total}</span>
            </p>
            <p className="text-[10px] text-gray-500">done</p>
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <CardContent className="space-y-2 p-3">
        {items.map((item, index) => {
          const isChecked = checked.has(index);
          const meta = priorityMeta[item.priority];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <div
                className={`rounded-lg border p-3 transition-all ${
                  isChecked
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggle(index)}
                    className="mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p
                        className={`text-[12.5px] font-semibold ${
                          isChecked
                            ? 'text-gray-400 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {item.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={`px-1.5 py-0 text-[9px] font-bold ${meta.chip}`}
                      >
                        {meta.label}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-gray-400">{item.titleTa}</p>
                    <p
                      className={`mt-1 text-[11px] leading-snug ${
                        isChecked ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {item.detail}
                    </p>

                    {/* Action link — either an in-app tool or an official portal */}
                    {item.appRoute && (
                      <button
                        onClick={() => navigate(item.appRoute!)}
                        className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10.5px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                      >
                        Open the tool for this
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                    {item.link && !item.appRoute && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[10.5px] font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        Official link
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {isChecked && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        <p className="px-1 pt-1 text-[10px] italic text-gray-400">
          Your progress is saved on this device — come back any time and pick up
          where you left off.
        </p>
      </CardContent>
    </Card>
  );
};

export default ActionItems;
