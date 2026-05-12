import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  RotateCcw,
  XCircle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trophy,
  Building2,
  ArrowRight,
  Sparkles,
  FileText,
  Clock,
  Info,
} from 'lucide-react';

/**
 * TNEA 2026 Counselling Flow Simulator
 *
 * Each counselling round has 4 stages (per Section 10 of the brochure):
 *   1. Choice Filling   (3 days, any number of choices in preference order)
 *   2. Tentative Allotment
 *   3. Confirmation     (2 days, candidate picks ONE of 6 options)
 *   4. Reporting        (5 days, college or TFC)
 *
 * This component walks the user through the 6 confirmation options visually,
 * explains the consequences, and helps them simulate scenarios.
 */

// Static color class maps. Tailwind JIT can't see template-string class
// names, so we list every combination we use as concrete strings.
const COLOR_CLASSES = {
  emerald: {
    selectedBorder: 'border-emerald-500 bg-emerald-50 shadow-md',
    iconSelected: 'bg-emerald-600 text-white',
    iconUnselected: 'bg-emerald-100 text-emerald-700',
    checkIcon: 'w-5 h-5 text-emerald-600 flex-shrink-0',
    outcomeCard: 'border-2 border-emerald-300 bg-emerald-50/40',
    sparkle: 'w-5 h-5 text-emerald-600',
    stageBorder: 'border-emerald-200',
    stageBadge: 'bg-emerald-600',
    stageIcon: 'text-emerald-600',
  },
  blue: {
    selectedBorder: 'border-blue-500 bg-blue-50 shadow-md',
    iconSelected: 'bg-blue-600 text-white',
    iconUnselected: 'bg-blue-100 text-blue-700',
    checkIcon: 'w-5 h-5 text-blue-600 flex-shrink-0',
    outcomeCard: 'border-2 border-blue-300 bg-blue-50/40',
    sparkle: 'w-5 h-5 text-blue-600',
    stageBorder: 'border-blue-200',
    stageBadge: 'bg-blue-600',
    stageIcon: 'text-blue-600',
  },
  amber: {
    selectedBorder: 'border-amber-500 bg-amber-50 shadow-md',
    iconSelected: 'bg-amber-600 text-white',
    iconUnselected: 'bg-amber-100 text-amber-700',
    checkIcon: 'w-5 h-5 text-amber-600 flex-shrink-0',
    outcomeCard: 'border-2 border-amber-300 bg-amber-50/40',
    sparkle: 'w-5 h-5 text-amber-600',
    stageBorder: 'border-amber-200',
    stageBadge: 'bg-amber-600',
    stageIcon: 'text-amber-600',
  },
  purple: {
    selectedBorder: 'border-purple-500 bg-purple-50 shadow-md',
    iconSelected: 'bg-purple-600 text-white',
    iconUnselected: 'bg-purple-100 text-purple-700',
    checkIcon: 'w-5 h-5 text-purple-600 flex-shrink-0',
    outcomeCard: 'border-2 border-purple-300 bg-purple-50/40',
    sparkle: 'w-5 h-5 text-purple-600',
    stageBorder: 'border-purple-200',
    stageBadge: 'bg-purple-600',
    stageIcon: 'text-purple-600',
  },
  rose: {
    selectedBorder: 'border-rose-500 bg-rose-50 shadow-md',
    iconSelected: 'bg-rose-600 text-white',
    iconUnselected: 'bg-rose-100 text-rose-700',
    checkIcon: 'w-5 h-5 text-rose-600 flex-shrink-0',
    outcomeCard: 'border-2 border-rose-300 bg-rose-50/40',
    sparkle: 'w-5 h-5 text-rose-600',
    stageBorder: 'border-rose-200',
    stageBadge: 'bg-rose-600',
    stageIcon: 'text-rose-600',
  },
  cyan: {
    selectedBorder: 'border-cyan-500 bg-cyan-50 shadow-md',
    iconSelected: 'bg-cyan-600 text-white',
    iconUnselected: 'bg-cyan-100 text-cyan-700',
    checkIcon: 'w-5 h-5 text-cyan-600 flex-shrink-0',
    outcomeCard: 'border-2 border-cyan-300 bg-cyan-50/40',
    sparkle: 'w-5 h-5 text-cyan-600',
    stageBorder: 'border-cyan-200',
    stageBadge: 'bg-cyan-600',
    stageIcon: 'text-cyan-600',
  },
} as const;

type ColorKey = keyof typeof COLOR_CLASSES;

type Scenario =
  | 'top-choice-allotted'
  | 'middle-choice-allotted'
  | 'bottom-choice-allotted'
  | 'no-seat-allotted';

type Action =
  | 'accept-join'
  | 'accept-upward'
  | 'decline-upward'
  | 'decline-next'
  | 'decline-quit'
  | 'upward-or-next';

interface ScenarioInfo {
  id: Scenario;
  title: string;
  description: string;
  allottedRank: number | null;
  totalChoices: number;
}

const SCENARIOS: ScenarioInfo[] = [
  {
    id: 'top-choice-allotted',
    title: 'Allotted my #1 dream college',
    description: 'You got the top choice you filled — your most preferred branch and college.',
    allottedRank: 1,
    totalChoices: 10,
  },
  {
    id: 'middle-choice-allotted',
    title: 'Allotted my #5 choice',
    description: 'You got a middle-of-the-list option — decent, but you still hope for choices 1-4.',
    allottedRank: 5,
    totalChoices: 10,
  },
  {
    id: 'bottom-choice-allotted',
    title: 'Allotted my last choice',
    description: 'You only got your safety-net 9th choice — not happy.',
    allottedRank: 9,
    totalChoices: 10,
  },
  {
    id: 'no-seat-allotted',
    title: 'No seat allotted this round',
    description: 'None of your choices were available based on your rank in this round.',
    allottedRank: null,
    totalChoices: 10,
  },
];

interface ActionInfo {
  id: Action;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  whenToUse: string;
  whatHappens: string;
  pros: string[];
  cons: string[];
  color: ColorKey;
}

const ACTIONS: ActionInfo[] = [
  {
    id: 'accept-join',
    title: 'Accept and Join',
    shortTitle: 'Accept & Join',
    icon: ThumbsUp,
    whenToUse: 'You are happy with the seat allotted and ready to commit.',
    whatHappens:
      'Download provisional allotment, report to college within 5 days, pay fees and submit originals. You are now enrolled.',
    pros: [
      'Your seat is confirmed and locked.',
      'No more uncertainty — you can plan ahead.',
      '7.5% Govt-School and First-Graduate beneficiaries are fee-exempt.',
    ],
    cons: [
      'You cannot participate in any later rounds.',
      'If you fail to report within 5 days, you lose the seat.',
    ],
    color: 'emerald',
  },
  {
    id: 'accept-upward',
    title: 'Accept and Upward',
    shortTitle: 'Accept & Upward',
    icon: ArrowUp,
    whenToUse:
      'OK with current seat, but hoping a higher preference opens up in upward movement.',
    whatHappens:
      'Get tentative allotment. Report to TFC within deadline, pay tuition fees and surrender originals. If a higher choice opens during upward movement, you get it. Otherwise you stay with current choice.',
    pros: [
      'You hold the current seat as a safety net.',
      'Chance to get a better choice without risk.',
      'Originals are safely held by TFC.',
    ],
    cons: [
      'Must pay tuition fees up-front at TFC.',
      'Fail to report → seat cancelled, no further rounds.',
    ],
    color: 'blue',
  },
  {
    id: 'decline-upward',
    title: 'Decline and Upward',
    shortTitle: 'Decline & Upward',
    icon: ArrowUp,
    whenToUse:
      "Not happy with allotted seat. Wait only for higher preferences.",
    whatHappens:
      "You give up the current allotment. System looks for higher choices in upward movement. If none open, you move to next round.",
    pros: [
      'No commitment to a seat you dislike.',
      'Still in the game for higher choices.',
    ],
    cons: [
      'You completely lose the current allotted seat.',
      'No safety net if upward fails — back to next round.',
    ],
    color: 'amber',
  },
  {
    id: 'decline-next',
    title: 'Decline and Move to Next Round',
    shortTitle: 'Decline & Next Round',
    icon: RotateCcw,
    whenToUse:
      'Not happy and willing to wait for the next full round (not upward movement).',
    whatHappens:
      'Current allotment cancelled. You participate in next counselling round with new seat matrix.',
    pros: [
      'Fresh chance with updated seat matrix.',
      'New choices possible (vacant seats, surrendered seats).',
    ],
    cons: [
      'Higher-rank candidates also re-enter — competition resets.',
      'No guarantee of better outcome.',
    ],
    color: 'purple',
  },
  {
    id: 'decline-quit',
    title: 'Decline and Quit',
    shortTitle: 'Decline & Quit',
    icon: XCircle,
    whenToUse:
      "Not happy and don't want to continue with TNEA at all (e.g., joining elsewhere).",
    whatHappens:
      'You exit TNEA completely. Your candidature is closed for all future rounds.',
    pros: ['Clean exit — no further obligations.'],
    cons: [
      'You CANNOT come back to TNEA in later rounds.',
      'Decision is final.',
    ],
    color: 'rose',
  },
  {
    id: 'upward-or-next',
    title: 'Upward OR Move to Next Round',
    shortTitle: 'Upward / Next',
    icon: RefreshCw,
    whenToUse:
      'No seat was allotted this round. The system asks: try upward movement OR wait for next round?',
    whatHappens:
      'If a seat opens in upward movement, you get it. Otherwise you move to the next round.',
    pros: [
      'Two chances in one — upward + next round.',
      'No commitment if nothing matches.',
    ],
    cons: [
      'Only shown when zero seats were allotted.',
      'Outcome depends on vacancies.',
    ],
    color: 'cyan',
  },
];

export const TNEACounsellingFlowSimulator = () => {
  const [step, setStep] = useState<'scenarios' | 'actions'>('scenarios');
  const [scenario, setScenario] = useState<ScenarioInfo | null>(null);
  const [chosenAction, setChosenAction] = useState<ActionInfo | null>(null);

  const availableActions: ActionInfo[] = scenario
    ? scenario.id === 'no-seat-allotted'
      ? ACTIONS.filter((a) => a.id === 'upward-or-next')
      : ACTIONS.filter((a) => a.id !== 'upward-or-next')
    : [];

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/30 via-white to-indigo-50/20 overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-900/30">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge className="bg-amber-400 text-purple-900 hover:bg-amber-400 text-[10px] font-bold border-0 mb-1.5">
              4 STAGES • 6 CONFIRMATION OPTIONS
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              Counselling Flow Simulator
            </h2>
            <p className="text-purple-100/90 text-sm">
              Practice the TNEA counselling decision in a safe sandbox before the
              real round.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 md:p-6 space-y-4">
        {/* 4 stages timeline */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">
            Each round has 4 stages
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            <StageCard num={1} title="Choice Filling" time="3 days" icon={FileText} color="blue" />
            <StageCard num={2} title="Tentative Allotment" time="System" icon={Sparkles} color="purple" />
            <StageCard num={3} title="Confirmation" time="2 days" icon={Clock} color="amber" />
            <StageCard num={4} title="Reporting" time="5 days" icon={Building2} color="emerald" />
          </div>
        </div>

        {/* Step 1: Scenario picker */}
        {step === 'scenarios' && (
          <div className="space-y-3">
            <div className="text-sm font-bold text-gray-700">
              Step 1 — Pick a tentative allotment scenario
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setScenario(s);
                    setStep('actions');
                    setChosenAction(null);
                  }}
                  className="text-left p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-sm text-gray-800">{s.title}</div>
                    {s.allottedRank ? (
                      <Badge variant="outline" className="text-[10px]">
                        Choice #{s.allottedRank}/{s.totalChoices}
                      </Badge>
                    ) : (
                      <Badge className="bg-rose-100 text-rose-700 text-[10px] hover:bg-rose-100">
                        No allotment
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-600">{s.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-purple-600 font-medium">
                    Pick this scenario <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Action picker */}
        {step === 'actions' && scenario && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStep('scenarios');
                  setChosenAction(null);
                }}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Different scenario
              </Button>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                Scenario: {scenario.title}
              </Badge>
            </div>

            <div className="text-sm font-bold text-gray-700">
              Step 2 — Pick your confirmation option
            </div>
            <p className="text-xs text-gray-500">
              You have <strong>2 days</strong> to confirm. Failing to confirm
              moves you to the next round automatically.
            </p>

            <div className="space-y-2">
              {availableActions.map((a) => {
                const Icon = a.icon;
                const isChosen = chosenAction?.id === a.id;
                const cc = COLOR_CLASSES[a.color];
                return (
                  <button
                    key={a.id}
                    onClick={() => setChosenAction(a)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      isChosen
                        ? cc.selectedBorder
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isChosen ? cc.iconSelected : cc.iconUnselected
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-gray-800">{a.title}</div>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          {a.whenToUse}
                        </p>
                      </div>
                      {isChosen && (
                        <CheckCircle2 className={cc.checkIcon} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Outcome */}
            {chosenAction && (
              <Card className={COLOR_CLASSES[chosenAction.color].outcomeCard}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-base text-gray-800">
                    <Sparkles className={COLOR_CLASSES[chosenAction.color].sparkle} />
                    What happens next
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {chosenAction.whatHappens}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <div className="text-xs font-bold text-emerald-700 mb-1.5 flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        Advantages
                      </div>
                      <ul className="space-y-1">
                        {chosenAction.pros.map((p, i) => (
                          <li key={i} className="text-[11px] text-gray-700 flex gap-1.5">
                            <span className="text-emerald-500">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-rose-200">
                      <div className="text-xs font-bold text-rose-700 mb-1.5 flex items-center gap-1">
                        <ThumbsDown className="w-3.5 h-3.5" />
                        Trade-offs
                      </div>
                      <ul className="space-y-1">
                        {chosenAction.cons.map((p, i) => (
                          <li key={i} className="text-[11px] text-gray-700 flex gap-1.5">
                            <span className="text-rose-500">✗</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setStep('scenarios');
                      setScenario(null);
                      setChosenAction(null);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                    Try another scenario
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tip block */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex gap-2 text-xs text-emerald-900">
          <Trophy className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <strong>Pro Tip:</strong> "Accept &amp; Upward" is the safest aggressive
            strategy — you lock in your current allotment while still chasing a
            higher preference. Just remember to actually report at TFC with the
            fees; non-reporting cancels everything.
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-[11px] text-amber-900">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
          <div>
            <strong>Withdrawal refund:</strong> If you withdraw originals after
            opting not to join, <strong>75 %</strong> of fees paid at TFC will be
            refunded after the approval process (per Section 10 of the brochure).
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StageCard = ({
  num,
  title,
  time,
  icon: Icon,
  color,
}: {
  num: number;
  title: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: ColorKey;
}) => {
  const cc = COLOR_CLASSES[color];
  return (
    <div className={`bg-white border-2 ${cc.stageBorder} rounded-lg p-2 relative`}>
      <div className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full ${cc.stageBadge} text-white text-[10px] font-bold flex items-center justify-center`}>
        {num}
      </div>
      <Icon className={`w-3.5 h-3.5 ${cc.stageIcon} mb-1`} />
      <div className="text-[11px] font-bold text-gray-800 leading-tight">{title}</div>
      <div className="text-[10px] text-gray-500">{time}</div>
    </div>
  );
};

export default TNEACounsellingFlowSimulator;
