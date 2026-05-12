import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  IndianRupee,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  GraduationCap,
  BookOpen,
  Award,
  Heart,
  Info,
  TrendingUp,
} from 'lucide-react';

/**
 * TNEA 2026 Fee Concession Calculator
 * Walks the candidate through Sections 7.1 – 7.4 of the brochure:
 *  • 7.5 % Govt-School full-fee waiver (G.O. 221/2021)
 *  • First Graduate concession (G.O. 85/2010)
 *  • AICTE Tuition Fee Waiver (5 % seats, income ≤ ₹8 L)
 *  • Post-Matric Scholarship for SC/SCA/ST (income ≤ ₹2.5 L)
 *
 * Also computes the registration fee (₹500 / ₹250).
 */

type Community = 'OC' | 'BC' | 'BCM' | 'MBC' | 'DNC' | 'SC' | 'SCA' | 'ST';

interface Inputs {
  community: Community;
  studiedGovtSchool: boolean; // 6th-12th in Govt-class school
  isFirstGraduate: boolean; // first graduate in family (no sibling already used it)
  siblingUsedFirstGraduate: boolean;
  annualIncome: number; // ₹ lakhs
  collegeType: 'govt' | 'aided' | 'self_financing';
}

interface ConcessionResult {
  key: string;
  title: string;
  description: string;
  status: 'eligible' | 'not_eligible' | 'maybe';
  benefit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const TNEAFeeCalculator = () => {
  const [inputs, setInputs] = useState<Inputs>({
    community: 'OC',
    studiedGovtSchool: false,
    isFirstGraduate: false,
    siblingUsedFirstGraduate: false,
    annualIncome: 5,
    collegeType: 'govt',
  });
  const [showResult, setShowResult] = useState(false);

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setShowResult(false);
  };

  const registrationFee = ['SC', 'SCA', 'ST'].includes(inputs.community) ? 250 : 500;

  const results = useMemo<ConcessionResult[]>(() => {
    const list: ConcessionResult[] = [];

    // 7.1 — 7.5 % Government School Full Fee Waiver
    if (inputs.studiedGovtSchool) {
      list.push({
        key: 'govt_school',
        title: '7.5 % Government School — FULL Fee Waiver',
        description:
          'Studied 6th–12th in Government / Corporation / Municipal / Adi-Dravidar / Forest / Tribal Welfare school (G.O. 221/2021).',
        status: 'eligible',
        benefit:
          'Tuition + Hostel + Development fees fully paid by the State. NO fee at the college.',
        icon: GraduationCap,
        color: 'emerald',
      });
    } else {
      list.push({
        key: 'govt_school',
        title: '7.5 % Government School Fee Waiver',
        description:
          'Requires 6th–12th in a Government / Corporation / Aided-Welfare school.',
        status: 'not_eligible',
        benefit: 'Not applicable based on your school history.',
        icon: GraduationCap,
        color: 'gray',
      });
    }

    // 7.2 — First Graduate concession
    if (inputs.isFirstGraduate && !inputs.siblingUsedFirstGraduate) {
      list.push({
        key: 'first_grad',
        title: 'First Graduate — Tuition Fee Concession',
        description:
          'No graduate in family (parents, grandparents, siblings) AND no sibling has previously claimed this concession (G.O. 85/2010).',
        status: 'eligible',
        benefit:
          'Tuition fee is waived. Other fees (hostel, exam, development) still payable.',
        icon: BookOpen,
        color: 'blue',
      });
    } else if (inputs.isFirstGraduate && inputs.siblingUsedFirstGraduate) {
      list.push({
        key: 'first_grad',
        title: 'First Graduate — Already Claimed by Sibling',
        description:
          'A sibling has already availed this concession, so you cannot claim it again.',
        status: 'not_eligible',
        benefit: 'Per G.O. 85/2010, only one child per family.',
        icon: BookOpen,
        color: 'gray',
      });
    } else {
      list.push({
        key: 'first_grad',
        title: 'First Graduate Concession',
        description:
          'For students with no graduate in immediate family AND no sibling has used it before.',
        status: 'not_eligible',
        benefit: 'You have indicated a graduate already exists in the family.',
        icon: BookOpen,
        color: 'gray',
      });
    }

    // 7.3 — AICTE TFW (only self-financing and aided self-supporting)
    const aicteApplies = inputs.collegeType !== 'govt';
    if (aicteApplies && inputs.annualIncome < 8) {
      list.push({
        key: 'aicte_tfw',
        title: 'AICTE Tuition Fee Waiver (TFW)',
        description:
          'Up to 5 % seats per course in Self-Financing colleges and Self-Supporting courses in Aided colleges. Family income below ₹8 lakhs.',
        status: 'eligible',
        benefit:
          'Tuition fee waived by college management. Other fees still payable. Cannot change college/course later.',
        icon: Award,
        color: 'purple',
      });
    } else if (aicteApplies && inputs.annualIncome >= 8) {
      list.push({
        key: 'aicte_tfw',
        title: 'AICTE TFW — Income Too High',
        description: 'Family income must be under ₹8 lakhs to qualify.',
        status: 'not_eligible',
        benefit: 'Not applicable based on income.',
        icon: Award,
        color: 'gray',
      });
    } else {
      list.push({
        key: 'aicte_tfw',
        title: 'AICTE TFW',
        description:
          'Applies only to Self-Financing colleges and Self-Supporting courses in Aided colleges.',
        status: 'maybe',
        benefit:
          'Selected Government college — AICTE TFW does not apply here. Re-check if you accept a self-financing seat.',
        icon: Award,
        color: 'amber',
      });
    }

    // 7.4 — Post-Matric Scholarship
    const isSCST = ['SC', 'SCA', 'ST'].includes(inputs.community);
    if (isSCST && inputs.annualIncome < 2.5) {
      list.push({
        key: 'post_matric',
        title: 'Post-Matric Scholarship (SC / SCA / ST)',
        description:
          'For SC / SCA / ST and SC/SCA-converted Christian candidates with parental income below ₹2.5 lakhs (G.O. 6/2012, 92/2012, 16/2014).',
        status: 'eligible',
        benefit: 'Scholarship paid through the college after admission.',
        icon: Heart,
        color: 'pink',
      });
    } else if (isSCST && inputs.annualIncome >= 2.5) {
      list.push({
        key: 'post_matric',
        title: 'Post-Matric Scholarship — Income Too High',
        description:
          'Parental annual income must be below ₹2.5 lakhs for SC/SCA/ST candidates.',
        status: 'not_eligible',
        benefit: 'Family income exceeds the ₹2.5 L limit.',
        icon: Heart,
        color: 'gray',
      });
    } else {
      list.push({
        key: 'post_matric',
        title: 'Post-Matric Scholarship',
        description: 'Only for SC / SCA / ST and SC/SCA-converted Christian candidates.',
        status: 'not_eligible',
        benefit: 'Not applicable based on your community.',
        icon: Heart,
        color: 'gray',
      });
    }

    return list;
  }, [inputs]);

  const eligibleCount = results.filter((r) => r.status === 'eligible').length;

  return (
    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/20 overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-900/30">
            <IndianRupee className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge className="bg-yellow-400 text-amber-900 hover:bg-yellow-400 text-[10px] font-bold border-0 mb-1.5">
              SAVE LAKHS — KNOW YOUR ENTITLEMENTS
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              TNEA 2026 Fee &amp; Concession Calculator
            </h2>
            <p className="text-amber-100/90 text-sm">
              Find every scholarship and fee waiver you qualify for under the
              official TNEA rules.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 md:p-6 space-y-4">
        {/* Inputs */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Tell us about yourself
          </div>

          {/* Community */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 mb-2 block">
              Your Community
            </Label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5">
              {(['OC', 'BC', 'BCM', 'MBC', 'DNC', 'SC', 'SCA', 'ST'] as Community[]).map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => update('community', c)}
                    className={`px-2 py-1.5 rounded-md text-xs font-bold border-2 transition-all ${
                      inputs.community === c
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                    }`}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Govt school */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50/40 transition-colors">
            <Checkbox
              id="govt-school"
              checked={inputs.studiedGovtSchool}
              onCheckedChange={(v) => update('studiedGovtSchool', !!v)}
              className="mt-0.5"
            />
            <Label htmlFor="govt-school" className="text-sm leading-relaxed cursor-pointer">
              <span className="font-semibold">I studied 6th to 12th in a Government school</span>
              <span className="block text-[11px] text-gray-500 mt-0.5">
                Includes Govt / Corporation / Municipal / Adi-Dravidar / Forest / Tribal Welfare / Kallar Reclamation schools.
              </span>
            </Label>
          </div>

          {/* First graduate */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50/40 transition-colors">
            <Checkbox
              id="first-grad"
              checked={inputs.isFirstGraduate}
              onCheckedChange={(v) => update('isFirstGraduate', !!v)}
              className="mt-0.5"
            />
            <Label htmlFor="first-grad" className="text-sm leading-relaxed cursor-pointer">
              <span className="font-semibold">I am the first graduate in my family</span>
              <span className="block text-[11px] text-gray-500 mt-0.5">
                No graduate degree among parents, grandparents, siblings, or any close family.
              </span>
            </Label>
          </div>

          {/* Sibling used FG */}
          {inputs.isFirstGraduate && (
            <div className="ml-6 flex items-start gap-2.5 p-2 rounded-lg bg-yellow-50/40">
              <Checkbox
                id="sibling-fg"
                checked={inputs.siblingUsedFirstGraduate}
                onCheckedChange={(v) => update('siblingUsedFirstGraduate', !!v)}
                className="mt-0.5"
              />
              <Label htmlFor="sibling-fg" className="text-xs leading-relaxed cursor-pointer text-gray-700">
                My brother or sister has already used the First Graduate fee
                concession previously.
              </Label>
            </div>
          )}

          {/* Income */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 mb-2 block">
              Annual Family Income (₹ lakhs from all sources)
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                step={0.5}
                min={0}
                max={50}
                value={inputs.annualIncome}
                onChange={(e) => update('annualIncome', parseFloat(e.target.value) || 0)}
                className="w-32"
              />
              <div className="flex gap-1.5 flex-wrap">
                {[2, 5, 8, 12].map((v) => (
                  <button
                    key={v}
                    onClick={() => update('annualIncome', v)}
                    className="text-[11px] px-2 py-1 rounded border border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  >
                    ₹{v} L
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* College type */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 mb-2 block">
              College type you're targeting
            </Label>
            <div className="grid grid-cols-3 gap-1.5">
              {([
                { id: 'govt', label: 'Government', desc: 'CEG, MIT, ACT' },
                { id: 'aided', label: 'Govt Aided', desc: 'PSG, MIT' },
                { id: 'self_financing', label: 'Self-Financing', desc: 'Most others' },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => update('collegeType', t.id)}
                  className={`text-left p-2 rounded-md border-2 transition-all ${
                    inputs.collegeType === t.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className="text-xs font-bold text-gray-800">{t.label}</div>
                  <div className="text-[10px] text-gray-500">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setShowResult(true)}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Calculate My Benefits
          </Button>
        </div>

        {/* Registration fee strip */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-blue-600 font-bold uppercase">
              Your TNEA Registration Fee
            </div>
            <div className="text-[11px] text-gray-600">
              For community: <strong>{inputs.community}</strong>
            </div>
          </div>
          <div className="text-3xl font-black text-blue-700">₹{registrationFee}</div>
        </div>

        {/* Results */}
        {showResult && (
          <div className="space-y-3">
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                <TrendingUp className="w-4 h-4" />
                You qualify for {eligibleCount} of {results.length} concessions
              </div>
              <div className="text-[11px] text-emerald-800 mt-1">
                The state and central government have multiple schemes — claim
                what is rightfully yours.
              </div>
            </div>

            <div className="space-y-2">
              {results.map((r) => {
                const Icon = r.icon;
                const statusColors = {
                  eligible: 'border-emerald-300 bg-emerald-50/50',
                  not_eligible: 'border-gray-200 bg-gray-50/50',
                  maybe: 'border-amber-300 bg-amber-50/50',
                };
                return (
                  <div
                    key={r.key}
                    className={`p-3 rounded-lg border-2 ${statusColors[r.status]}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          r.status === 'eligible'
                            ? 'bg-emerald-100 text-emerald-700'
                            : r.status === 'maybe'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-bold text-sm text-gray-800">
                            {r.title}
                          </div>
                          {r.status === 'eligible' && (
                            <Badge className="bg-emerald-600 text-white text-[10px]">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Eligible
                            </Badge>
                          )}
                          {r.status === 'maybe' && (
                            <Badge className="bg-amber-500 text-white text-[10px]">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Check
                            </Badge>
                          )}
                          {r.status === 'not_eligible' && (
                            <Badge variant="outline" className="text-[10px] text-gray-500">
                              <XCircle className="w-3 h-3 mr-1" />
                              Not now
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-600 mb-1.5">
                          {r.description}
                        </p>
                        <div
                          className={`text-[11px] font-medium ${
                            r.status === 'eligible'
                              ? 'text-emerald-700'
                              : r.status === 'maybe'
                              ? 'text-amber-700'
                              : 'text-gray-600'
                          }`}
                        >
                          {r.benefit}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2 text-[11px] text-yellow-900">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-600" />
          <div>
            Each concession requires a separate certificate. Get them from the
            appropriate authority <strong>before the TNEA application deadline</strong>
            {' '}— certificates dated after the cutoff are not accepted.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TNEAFeeCalculator;
