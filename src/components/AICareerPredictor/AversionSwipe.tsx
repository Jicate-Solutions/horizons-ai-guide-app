import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { ThumbsDown, ThumbsUp, SkipForward, ChevronLeft, AlertTriangle } from 'lucide-react';
import { AVERSION_CARDS, type AversionCard } from '@/data/predictor/aversionCards';
import type { AversionTag } from '@/data/predictor';

interface AversionSwipeProps {
  /** Called when the student finishes (or skips) the deck. */
  onComplete: (aversions: AversionTag[]) => void;
  /** Called when the student wants to go back to the form. */
  onBack?: () => void;
}

/**
 * High-stakes tags get a confirmation dialog before being locked in,
 * because they eliminate a whole family of aspirational courses.
 * The copy below explains exactly what will be removed.
 */
const HIGH_STAKES: Record<string, { title: string; body: string }> = {
  patient_care: {
    title: 'This will remove all medical and nursing paths',
    body: 'MBBS, BDS, BAMS/BHMS/BUMS, B.Sc. Nursing, BPT, BOT, Optometry, BVSc and most allied-health courses centre on close contact with patients. If you choose this, none of them will appear in your results. Are you sure?',
  },
  maths_heavy: {
    title: 'This will remove most engineering and data courses',
    body: 'B.Tech CSE/IT/AI/Data Science, B.Sc. Maths/Stats and several engineering paths depend on daily mathematics. If you choose this, they will not appear in your results. Are you sure?',
  },
};

export function AversionSwipe({ onComplete, onBack }: AversionSwipeProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<AversionTag[]>([]);
  const [pendingConfirm, setPendingConfirm] = useState<AversionCard | null>(null);
  /** Slide-out animation direction for the current card: 'right' = hated, 'left' = fine. */
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);

  const total = AVERSION_CARDS.length;
  const card = AVERSION_CARDS[index];
  const done = index >= total;

  const advance = useCallback(() => {
    setAnimDir(null);
    setIndex((i) => i + 1);
  }, []);

  /** Called once the student has *committed* to "I hate this" (post-confirmation if any). */
  const commitHate = useCallback(
    (tag: AversionTag) => {
      setSelected((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
      setAnimDir('right');
      window.setTimeout(advance, 220);
    },
    [advance],
  );

  const handleHate = useCallback(() => {
    if (!card) return;
    const stakes = HIGH_STAKES[card.tag];
    if (stakes) {
      setPendingConfirm(card);
      return;
    }
    commitHate(card.tag);
  }, [card, commitHate]);

  const handleFine = useCallback(() => {
    if (!card) return;
    setAnimDir('left');
    window.setTimeout(advance, 220);
  }, [card, advance]);

  const handleSkipAll = () => onComplete(selected);

  // Auto-emit completion when deck is exhausted (no further user input needed).
  useEffect(() => {
    if (done) onComplete(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // Keyboard shortcuts: ← fine, → hate, Esc skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (pendingConfirm) return;
      if (e.key === 'ArrowRight') handleHate();
      else if (e.key === 'ArrowLeft') handleFine();
      else if (e.key === 'Escape') handleSkipAll();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingConfirm, card?.tag]);

  if (done || !card) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        {onBack ? (
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
        ) : <span />}
        <Button variant="ghost" size="sm" onClick={handleSkipAll}>
          <SkipForward className="h-4 w-4 mr-1" /> Skip to results
        </Button>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          What would burn you out?
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          A quick honesty check. Swipe right (or tap <span className="text-red-600 font-medium">Hate</span>) for things you genuinely cannot stand. We&apos;ll remove careers built around them.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Card {index + 1} of {total}</span>
          <span>{selected.length} aversion{selected.length === 1 ? '' : 's'} so far</span>
        </div>
        <Progress value={((index) / total) * 100} className="h-1.5" />
      </div>

      {/* Card */}
      <Card
        className={cn(
          'border-2 transition-all duration-200 relative overflow-hidden',
          'min-h-[280px] flex items-center',
          animDir === 'right' && 'translate-x-[120%] rotate-6 opacity-0',
          animDir === 'left'  && '-translate-x-[120%] -rotate-6 opacity-0',
        )}
      >
        <CardContent className="p-8 w-full text-center">
          <div className="text-6xl mb-4">{card.emoji}</div>
          <h3 className="text-xl md:text-2xl font-semibold leading-snug mb-3">
            {card.headline.en}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {card.detail.en}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={handleFine}
          className="h-14 gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
        >
          <ThumbsUp className="h-5 w-5" />
          <span>
            <span className="block font-semibold">I&apos;m fine with this</span>
            <span className="block text-[10px] opacity-70">← arrow key</span>
          </span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleHate}
          className="h-14 gap-2 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <ThumbsDown className="h-5 w-5" />
          <span>
            <span className="block font-semibold">I&apos;d hate this</span>
            <span className="block text-[10px] opacity-70">→ arrow key</span>
          </span>
        </Button>
      </div>

      {/* High-stakes confirmation */}
      <AlertDialog
        open={pendingConfirm !== null}
        onOpenChange={(open) => { if (!open) setPendingConfirm(null); }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <span>{pendingConfirm ? HIGH_STAKES[pendingConfirm.tag]?.title : ''}</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed pt-2">
              {pendingConfirm ? HIGH_STAKES[pendingConfirm.tag]?.body : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingConfirm(null)}>
              No, keep them in
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingConfirm) {
                  commitHate(pendingConfirm.tag);
                  setPendingConfirm(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, I&apos;m sure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AversionSwipe;
