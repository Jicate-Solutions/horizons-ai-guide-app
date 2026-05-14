import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// ─────────────────────────────────────────────────────────────────────────────
// REAL SITUATION STEP
// ─────────────────────────────────────────────────────────────────────────────
// The single highest-value thing a real career counsellor knows that the old
// wizard did not: a 12th student's decision is rarely theirs alone. Family
// expectations, being the first in the family to reach college, and how
// urgently the family needs them earning are often THE deciding factors.
//
// A tool that scores skills and interests perfectly but does not know "this
// student must earn within 2 years to support the family" can confidently
// recommend a 6-year path and be actively wrong. This one short step closes
// that gap — and the scoring engine genuinely uses every answer (see
// lifeFitNudge in careerScoring.ts), so it is advice, not theatre.
// ─────────────────────────────────────────────────────────────────────────────

export type DecisionOwner = 'mine' | 'shared' | 'family';
export type EarningUrgency = 'flexible' | 'within3' | 'soon';
export type FirstGeneration = 'yes' | 'no';

interface RealSituationStepProps {
  decisionOwner: string;
  firstGeneration: string;
  earningUrgency: string;
  onChangeDecisionOwner: (v: string) => void;
  onChangeFirstGeneration: (v: string) => void;
  onChangeEarningUrgency: (v: string) => void;
}

const decisionOptions = [
  {
    id: 'mine',
    icon: '🧭',
    label: 'Mostly my own decision',
    desc: 'I choose; my family trusts me',
  },
  {
    id: 'shared',
    icon: '🤝',
    label: 'A shared decision with family',
    desc: 'We decide together',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    label: "Mostly my family's expectation",
    desc: 'My family has strong wishes for me',
  },
];

const firstGenOptions = [
  {
    id: 'yes',
    icon: '🌟',
    label: 'Yes — first in my family to go to college',
    desc: "We'll surface scholarships and first-graduate support",
  },
  {
    id: 'no',
    icon: '🎓',
    label: 'No — others in my family have degrees',
    desc: 'Family has been through this before',
  },
];

const urgencyOptions = [
  {
    id: 'flexible',
    icon: '🌳',
    label: 'I can take my time',
    desc: 'A longer path is fine if it is the right one',
  },
  {
    id: 'within3',
    icon: '⏳',
    label: 'I would like to be earning within ~3 years',
    desc: 'A shorter, job-ready path is preferable',
  },
  {
    id: 'soon',
    icon: '⚡',
    label: 'My family needs me earning soon',
    desc: 'We will prioritise faster routes to a real income',
  },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

interface OptionGroupProps {
  title: string;
  subtitle?: string;
  options: { id: string; icon: string; label: string; desc: string }[];
  selected: string;
  onSelect: (v: string) => void;
}

const OptionGroup = ({
  title,
  subtitle,
  options,
  selected,
  onSelect,
}: OptionGroupProps) => (
  <div className="space-y-2">
    <div>
      <p className="text-sm font-semibold">{title}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
    <div className="grid gap-2">
      {options.map((opt) => (
        <Card
          key={opt.id}
          className={`cursor-pointer transition-all ${
            selected === opt.id
              ? 'border-2 border-primary bg-primary/5'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => onSelect(opt.id)}
        >
          <CardContent className="flex items-center gap-3 p-3">
            <span className="text-lg">{opt.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{opt.label}</p>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
            </div>
            {selected === opt.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary"
              >
                <Check className="h-3 w-3 text-primary-foreground" />
              </motion.div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const RealSituationStep = ({
  decisionOwner,
  firstGeneration,
  earningUrgency,
  onChangeDecisionOwner,
  onChangeFirstGeneration,
  onChangeEarningUrgency,
}: RealSituationStepProps) => {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="mb-2 text-center">
        <h2 className="mb-1 text-xl font-semibold">
          🪷 Your Real Situation
        </h2>
        <p className="text-sm text-muted-foreground">
          உங்கள் உண்மையான சூழ்நிலை — a good counsellor asks this; it changes the
          advice
        </p>
      </div>

      <motion.div variants={itemVariants}>
        <OptionGroup
          title="Whose decision is this, really?"
          subtitle="There is no wrong answer — it just helps us advise you honestly."
          options={decisionOptions}
          selected={decisionOwner}
          onSelect={onChangeDecisionOwner}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OptionGroup
          title="Are you the first in your family to attend college?"
          options={firstGenOptions}
          selected={firstGeneration}
          onSelect={onChangeFirstGeneration}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OptionGroup
          title="How soon do you need to start earning?"
          subtitle="This genuinely shifts which careers we recommend first."
          options={urgencyOptions}
          selected={earningUrgency}
          onSelect={onChangeEarningUrgency}
        />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="rounded-lg bg-muted/50 p-3 text-center text-xs text-muted-foreground"
      >
        Every answer here is used to adjust your results — not just stored. A
        career that does not fit your real life is not a good recommendation,
        however well it matches your skills.
      </motion.p>
    </motion.div>
  );
};

export default RealSituationStep;
