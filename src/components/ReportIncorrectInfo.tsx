import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckCircle2, Flag, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReportIncorrectInfoProps {
  /** What kind of record this is: 'college' | 'course' | 'exam' | 'job' | 'other' */
  entityType: string;
  /** Internal id of the record, if available */
  entityId?: string;
  /** Human-readable name for admin triage */
  entityName?: string;
  /** Specific field to pre-fill (e.g. 'annualFee', 'cutoff') — optional */
  defaultField?: string;
  /** Value currently shown on the site — optional */
  currentValue?: string;
  /** Visual style of the trigger button */
  variant?: 'ghost' | 'outline' | 'link' | 'default';
  /** Size of the trigger button */
  size?: 'sm' | 'default' | 'icon';
  /** Optional class to apply to the trigger button */
  className?: string;
  /** Show the flag icon only, no text */
  iconOnly?: boolean;
}

/**
 * Universal "Report incorrect info" button. Opens a small modal where the user
 * can describe what's wrong. Saves to the `data_corrections` table in Supabase.
 *
 * Works without login (anonymous reports are allowed).
 */
export function ReportIncorrectInfo({
  entityType,
  entityId,
  entityName,
  defaultField,
  currentValue,
  variant = 'ghost',
  size = 'sm',
  className,
  iconOnly = false,
}: ReportIncorrectInfoProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [fieldName, setFieldName] = useState(defaultField ?? '');
  const [suggestedValue, setSuggestedValue] = useState('');
  const [description, setDescription] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  const reset = () => {
    setFieldName(defaultField ?? '');
    setSuggestedValue('');
    setDescription('');
    setSourceUrl('');
    setReporterEmail('');
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    if (description.trim().length < 5) {
      toast({
        title: 'Please add a description',
        description: "Tell us what's incorrect so we can review it.",
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .from('data_corrections' as any)
        .insert({
          entity_type: entityType,
          entity_id: entityId ?? null,
          entity_name: entityName ?? null,
          field_name: fieldName.trim() || null,
          current_value: currentValue ?? null,
          suggested_value: suggestedValue.trim() || null,
          description: description.trim(),
          source_url: sourceUrl.trim() || null,
          reporter_email: reporterEmail.trim() || user?.email || null,
          reporter_user_id: user?.id ?? null,
          page_url: typeof window !== 'undefined' ? window.location.href : null,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          status: 'open',
        });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Thanks for reporting!',
        description: 'Our team will review this and update if needed.',
      });
    } catch (err) {
      console.error('Report submission failed:', err);
      toast({
        title: 'Could not submit',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          aria-label="Report incorrect information"
        >
          <Flag className="w-3.5 h-3.5" />
          {!iconOnly && <span className="ml-1.5 text-xs">Report incorrect info</span>}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-1">Thanks for letting us know</h3>
            <p className="text-sm text-muted-foreground">
              We'll review your report and update the information if needed.
            </p>
            <Button className="mt-5" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Report incorrect info</DialogTitle>
              <DialogDescription>
                {entityName ? (
                  <>
                    Spotted something wrong about{' '}
                    <strong className="text-foreground">{entityName}</strong>? Tell us and we'll
                    verify it.
                  </>
                ) : (
                  "Tell us what's wrong and we'll review it."
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              {currentValue ? (
                <div className="rounded-md bg-muted/50 px-3 py-2 text-xs">
                  <span className="text-muted-foreground">Currently shown: </span>
                  <span className="font-medium">{currentValue}</span>
                </div>
              ) : null}

              <div className="space-y-1.5">
                <Label htmlFor="field-name" className="text-xs">
                  Which field is wrong? (optional)
                </Label>
                <Input
                  id="field-name"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="e.g. cutoff, annual fee, location"
                  className="h-9 text-sm"
                  maxLength={100}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs">
                  What looks wrong? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. The cutoff shown is 192.5 but the actual 2025 cutoff was 194.0"
                  className="min-h-[80px] text-sm"
                  maxLength={1000}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="suggested" className="text-xs">
                  Suggest correction (optional)
                </Label>
                <Input
                  id="suggested"
                  value={suggestedValue}
                  onChange={(e) => setSuggestedValue(e.target.value)}
                  placeholder="e.g. Should be 194.0"
                  className="h-9 text-sm"
                  maxLength={500}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="source-url" className="text-xs">
                  Source link (optional)
                </Label>
                <Input
                  id="source-url"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://official-site/..."
                  className="h-9 text-sm"
                  maxLength={500}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Your email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="So we can let you know when it's fixed"
                  className="h-9 text-sm"
                  maxLength={200}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)} disabled={submitting} size="sm">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting} size="sm">
                {submitting ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  'Submit report'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ReportIncorrectInfo;
