import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { StudentGroup, getGroupCategory, isEligibleForTNEA } from './types';
import { groupCategories } from './GroupSelector';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface MarksEntryFormProps {
  group: StudentGroup;
  onMarksChange: (marks: Record<string, number | null>) => void;
}

const getSubjectsForGroup = (groupCode: StudentGroup): { subject: string; icon: string }[] => {
  for (const cat of groupCategories) {
    const group = cat.groups.find(g => g.id === groupCode);
    if (group) {
      return group.subjects.map(subj => ({
        subject: subj,
        icon: getSubjectIcon(subj)
      }));
    }
  }
  return [];
};

const getSubjectIcon = (subject: string): string => {
  const icons: Record<string, string> = {
    'Physics': '📗', 'Chemistry': '📕', 'Mathematics': '📘',
    'Biology': '🧬', 'Statistics': '📊', 'Computer Science': '💻',
    'Bio-Chemistry': '🧪', 'Micro-Biology': '🦠', 'Nursing': '🩺',
    'Nutrition & Dietetics': '🥗', 'English for Communication': '📝',
    'Home Science': '🏠', 'Botany': '🌿', 'Zoology': '🦎',
    'Economics': '📈', 'Commerce': '💼', 'Accountancy': '🧮',
    'History': '📜', 'Geography': '🌍', 'Political Science': '🏛️',
    'Ethics & Indian Culture': '🕉️', 'Advanced Language': '📖',
    'Business Maths': '🔢',
  };
  return icons[subject] || '📚';
};

const getEligibleCoursesText = (groupCode: StudentGroup): string => {
  const category = getGroupCategory(groupCode);
  switch (category) {
    case 'science_maths':
      if (groupCode === '103' || groupCode === '104') {
        return 'Engineering (B.E/B.Tech) + Medical (MBBS/BDS with NEET), B.Sc, BCA, B.Arch';
      }
      return 'Engineering (B.E/B.Tech), B.Sc, BCA, B.Arch, Pilot Training, NDA, Merchant Navy';
    case 'science_bio':
      return 'With NEET: MBBS, BDS, BAMS, BHMS, BSMS, BNYS, Veterinary. Without NEET (12th marks only): B.Pharm, B.Sc Nursing, BPT, BMLT, B.Optom, Pharm.D, paramedical degrees, B.Sc Agriculture (TNAU), B.Sc Biotechnology.';
    case 'commerce':
      return 'B.Com, BBA, BCA, CA Foundation, CS, CMA, Banking, Hotel Management';
    case 'arts':
      return 'BA, BSW, B.Ed, LLB, Journalism, Mass Communication, Public Administration';
    default:
      return '';
  }
};

export const MarksEntryForm = ({ group, onMarksChange }: MarksEntryFormProps) => {
  const [marks, setMarks] = useState<Record<string, number | null>>({});
  const [neetScore, setNeetScore] = useState<number | null>(null);

  const subjects = getSubjectsForGroup(group);
  const category = getGroupCategory(group);
  const isTNEA = isEligibleForTNEA(group);

  // Separate PCM (cutoff subjects) from 4th subject
  const pcmSubjects = subjects.filter(s => ['Mathematics', 'Physics', 'Chemistry'].includes(s.subject));
  const otherSubjects = subjects.filter(s => !['Mathematics', 'Physics', 'Chemistry'].includes(s.subject));

  useEffect(() => {
    setMarks({});
    setNeetScore(null);
  }, [group]);

  useEffect(() => {
    const allMarks: Record<string, number | null> = { ...marks };
    if (neetScore !== null) {
      allMarks.neet = neetScore;
    }
    onMarksChange(allMarks);
  }, [marks, neetScore, onMarksChange]);

  const handleMarkChange = (subject: string, value: string) => {
    const numValue = value === '' ? null : Math.min(100, Math.max(0, parseInt(value) || 0));
    setMarks(prev => ({ ...prev, [subject]: numValue }));
  };

  const isValidMark = (value: number | null) => value !== null && value >= 0 && value <= 100;

  const renderInput = (
    label: string,
    icon: string,
    value: number | null,
    onChange: (value: string) => void,
    maxMarks: number = 100,
    size: 'normal' | 'small' = 'normal'
  ) => (
    <div className="space-y-1.5">
      <Label className={cn('font-medium flex items-center gap-2', size === 'small' ? 'text-xs' : 'text-sm')}>
        <span>{icon}</span> {label}
      </Label>
      <div className="relative">
        <Input
          type="number"
          min={0}
          max={maxMarks}
          placeholder={`/${maxMarks}`}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'font-semibold pr-10',
            size === 'small' ? 'text-base' : 'text-lg',
            value !== null && (isValidMark(value) ? 'border-green-500' : 'border-red-500')
          )}
        />
        {value !== null && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValidMark(value) ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  const getCategoryColor = () => {
    switch (category) {
      case 'science_maths': return { bg: 'bg-blue-50', text: 'text-blue-800' };
      case 'science_bio': return { bg: 'bg-green-50', text: 'text-green-800' };
      case 'commerce': return { bg: 'bg-orange-50', text: 'text-orange-800' };
      case 'arts': return { bg: 'bg-pink-50', text: 'text-pink-800' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-800' };
    }
  };

  const colors = getCategoryColor();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📝 Step 2: Enter Your Marks (Group {group})
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          உங்கள் 12-ஆம் வகுப்பு மதிப்பெண்களை உள்ளிடவும்
        </p>
      </div>

      <div className="space-y-5">

        {/* ─── FOR ENGINEERING GROUPS: PCM FIRST, THEN 4TH SUBJECT ─── */}
        {isTNEA && (
          <>
            {/* PCM = Required for cutoff */}
            <div className="rounded-xl border-2 border-blue-300 bg-blue-50/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full">CUTOFF SUBJECTS — REQUIRED</span>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                Only these 3 subjects decide your TNEA engineering cutoff (out of 200)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pcmSubjects.map((subj) => (
                  <div key={subj.subject}>
                    {renderInput(
                      subj.subject,
                      subj.icon,
                      marks[subj.subject] ?? null,
                      (v) => handleMarkChange(subj.subject, v)
                    )}
                  </div>
                ))}
              </div>
              {/* Live cutoff preview */}
              {marks.Mathematics != null && marks.Physics != null && marks.Chemistry != null && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200 text-center">
                  <p className="text-xs text-blue-600 mb-1">Your TNEA Cutoff</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {Math.round(((marks.Mathematics ?? 0) / 2 + (marks.Physics ?? 0) / 4 + (marks.Chemistry ?? 0) / 4) * 10) / 10}
                    <span className="text-sm font-normal text-blue-500"> / 100</span>
                    <span className="text-sm font-normal text-gray-400 mx-1">→</span>
                    {Math.round(((marks.Mathematics ?? 0) / 2 + (marks.Physics ?? 0) / 4 + (marks.Chemistry ?? 0) / 4) * 2 * 10) / 10}
                    <span className="text-sm font-normal text-blue-500"> / 200</span>
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    = {marks.Mathematics}/2 + {marks.Physics}/4 + {marks.Chemistry}/4
                  </p>
                </div>
              )}
            </div>

            {/* 4th subject = Optional */}
            {otherSubjects.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-400 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full">OPTIONAL — Not used in cutoff</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  This subject only affects your overall percentage, not your engineering cutoff.
                </p>
                <div className="max-w-xs">
                  {otherSubjects.map((subj) => (
                    <div key={subj.subject}>
                      {renderInput(
                        subj.subject,
                        subj.icon,
                        marks[subj.subject] ?? null,
                        (v) => handleMarkChange(subj.subject, v),
                        100,
                        'small'
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bio-Maths warning */}
            {(group === '103' || group === '104') && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>⚠️ Bio-Maths Student:</strong> Your Biology/{group === '104' ? 'Bio-Chemistry' : 'Biology'} mark is NOT used for engineering cutoff. 
                  It is only used for NEET medical eligibility (min 50% in PCB).
                </p>
              </div>
            )}
          </>
        )}

        {/* ─── BIO GROUPS: 12th marks /200 is the primary cutoff for paramedical ─── */}
        {category === 'science_bio' && (() => {
          // Live preview: sum of the 4 prescribed subjects / 2 = /200 score
          // (the actual TN Selection Committee formula for paramedical degrees).
          const subjectValues = subjects.map((s) => marks[s.subject] ?? 0);
          const filledCount = subjectValues.filter((v) => v > 0).length;
          const liveScore = filledCount >= 3
            ? Math.round((subjectValues.reduce((a, b) => a + b, 0) / 2) * 10) / 10
            : null;

          return (
            <div className="space-y-4">
              {/* ── PRIMARY: 12th marks (paramedical cutoff) ── */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">
                    📘
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-black text-emerald-900 leading-tight">
                      Your 12th Science Marks
                    </h3>
                    <p className="text-xs text-emerald-800/80 leading-snug mt-0.5">
                      Used for B.Pharm, B.Sc Nursing, BPT, B.Optom, Pharm.D and all paramedical
                      courses via TN Selection Committee. <strong>NEET is not required.</strong>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {subjects.map((subj) => (
                    <div key={subj.subject}>
                      {renderInput(
                        subj.subject,
                        subj.icon,
                        marks[subj.subject] ?? null,
                        (v) => handleMarkChange(subj.subject, v),
                      )}
                    </div>
                  ))}
                </div>

                {/* Live cutoff preview */}
                <div className={cn(
                  'mt-4 rounded-xl border-2 p-4 transition-all',
                  liveScore != null
                    ? 'border-emerald-400 bg-white'
                    : 'border-dashed border-emerald-200 bg-white/50',
                )}>
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                        Your Paramedical Cutoff Score
                      </p>
                      <p className="text-[10px] text-emerald-700/70 leading-tight mt-0.5">
                        (Physics + Chemistry + 2 Bio subjects) ÷ 2
                      </p>
                    </div>
                    <div className="text-right">
                      {liveScore != null ? (
                        <>
                          <p className="text-3xl font-black text-emerald-700 leading-none">
                            {liveScore.toFixed(1)}
                            <span className="text-base text-emerald-600/70 font-bold">/200</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-emerald-700/60 italic">
                          Enter at least 3 subject marks to see your score
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SECONDARY: NEET (only if the student appeared for it) ── */}
              <details className="rounded-xl border border-rose-200 bg-rose-50/30 overflow-hidden group">
                <summary className="cursor-pointer px-4 py-3 flex items-center justify-between gap-3 hover:bg-rose-50/60 transition-colors list-none">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">🏥</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-rose-800 leading-tight">
                        Did you appear for NEET? <span className="font-normal text-rose-600">(Optional)</span>
                      </p>
                      <p className="text-[11px] text-rose-700/80 leading-tight mt-0.5">
                        Only needed for MBBS, BDS, BAMS, BHMS — tap to add your score
                      </p>
                    </div>
                  </div>
                  <span className="text-rose-600 text-xs font-bold flex-shrink-0 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 pt-2 border-t border-rose-200">
                  <Label className="text-xs font-medium text-rose-700 mb-2 block">
                    NEET Score (out of 720)
                  </Label>
                  <div className="max-w-xs">
                    <Input
                      type="number"
                      min={0}
                      max={720}
                      placeholder="e.g. 615"
                      value={neetScore ?? ''}
                      onChange={(e) => {
                        const val = e.target.value === '' ? null : Math.min(720, Math.max(0, parseInt(e.target.value) || 0));
                        setNeetScore(val);
                      }}
                      className="text-lg font-semibold"
                    />
                  </div>
                  <p className="text-[11px] text-rose-600/80 mt-2 leading-snug">
                    Required for: MBBS, BDS, BAMS, BHMS, BNYS, BSMS.
                    Leave blank if you didn't sit NEET — your 12th marks above are enough for
                    B.Pharm, B.Sc Nursing, BPT and other paramedical courses.
                  </p>
                </div>
              </details>
            </div>
          );
        })()}

        {/* ─── FOR COMMERCE / ARTS: ALL SUBJECTS EQUALLY ─── */}
        {(category === 'commerce' || category === 'arts') && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">PART III — ALL SUBJECTS (Each out of 100)</Label>
            <p className="text-xs text-gray-500 mb-3">
              All 4 subjects contribute equally to your admission percentage. No cutoff formula needed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subj) => (
                <div key={subj.subject}>
                  {renderInput(
                    subj.subject,
                    subj.icon,
                    marks[subj.subject] ?? null,
                    (v) => handleMarkChange(subj.subject, v)
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEET Score — only for Bio-Maths cross-eligible groups (103, 104). */}
        {/* Pure Bio groups (201-208) get the NEET disclosure inside the bio block above. */}
        {(group === '103' || group === '104') && (
          <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4">
            <Label className="text-sm font-medium text-rose-700 mb-3 block">
              🏥 NEET SCORE (For Medical / Dental / AYUSH)
            </Label>
            <div className="max-w-xs">
              <Input
                type="number"
                min={0}
                max={720}
                placeholder="/720 (Enter if appeared)"
                value={neetScore ?? ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? null : Math.min(720, Math.max(0, parseInt(e.target.value) || 0));
                  setNeetScore(val);
                }}
                className="text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-rose-600 mt-2">
              NEET score is required for <strong>MBBS, BDS, BAMS, BHMS, BNYS, BSMS</strong>.
              <span className="block mt-1 text-rose-500">
                Leave blank if not appeared — you can still apply for B.Pharm, B.Sc Nursing,
                BPT and other paramedical courses through TN Selection Committee on 12th marks alone.
              </span>
            </p>
          </div>
        )}

        {/* Info boxes */}
        {isTNEA && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>📐 Formula:</strong> Cutoff = Maths/2 + Physics/4 + Chemistry/4 = out of 100 → ×2 = out of 200
            </p>
          </div>
        )}

        {(category === 'commerce' || category === 'arts') && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-800">
              <strong>✅ No Cutoff Formula.</strong> Your overall 12th percentage is used directly for admission. Higher % = better college.
            </p>
          </div>
        )}
      </div>

      <div className={cn('mt-5 p-3 rounded-lg', colors.bg)}>
        <p className={cn('text-xs', colors.text)}>
          <strong>ELIGIBLE COURSES:</strong> {getEligibleCoursesText(group)}
        </p>
      </div>
    </div>
  );
};
