import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calculator, Plus, Trash2, TrendingUp, Award, Trophy,
  Medal, ChevronDown, ChevronUp, AlertCircle, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  TNEA_MARKS_TABLE,
  calculateTNEASportsScore,
  SportAchievement,
  MarksRow,
  MedalType,
} from '@/data/sportsQuotaData';

interface TNEAScoreCalculatorProps {
  lang: 'en' | 'ta';
  /** Lift the calculated score up to the parent so it can be embedded in the share card */
  onScoreChange?: (score: number, achievements: SportAchievement[]) => void;
}

// Group rows by category for the picker
const CATEGORY_LABELS: Record<MarksRow['category'], { en: string; ta: string; emoji: string }> = {
  international: { en: 'International', ta: 'சர்வதேச', emoji: '🌍' },
  national:      { en: 'National',      ta: 'தேசிய',     emoji: '🇮🇳' },
  state:         { en: 'State',         ta: 'மாநில',    emoji: '🏛️' },
  regional:      { en: 'Regional',      ta: 'மண்டல',    emoji: '🗺️' },
  district:      { en: 'District',      ta: 'மாவட்ட',   emoji: '📍' },
};

const MEDAL_LABELS: Record<MedalType, { en: string; ta: string; emoji: string; colour: string }> = {
  gold:          { en: 'Gold',          ta: 'தங்கம்',  emoji: '🥇', colour: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  silver:        { en: 'Silver',        ta: 'வெள்ளி', emoji: '🥈', colour: 'bg-gray-100 text-gray-900 border-gray-300' },
  bronze:        { en: 'Bronze',        ta: 'வெண்கலம்', emoji: '🥉', colour: 'bg-orange-100 text-orange-900 border-orange-300' },
  participation: { en: 'Participation', ta: 'பங்கேற்பு', emoji: '🎽', colour: 'bg-blue-100 text-blue-900 border-blue-300' },
};

// Reference cutoffs (approximate, based on historical TNEA sports quota patterns)
// These are illustrative — actual cutoffs vary year to year.
const SCORE_BANDS = [
  {
    min: 1000,
    labelEn: 'Elite tier — Top government colleges',
    labelTa: 'உயரிய நிலை — சிறந்த அரசு கல்லூரிகள்',
    examplesEn: 'CEG Guindy, MIT Chennai, PSG Tech CSE',
    colour: 'from-purple-500 to-pink-500',
    textColour: 'text-purple-900',
    bgColour: 'bg-purple-50 border-purple-300',
  },
  {
    min: 400,
    labelEn: 'Strong tier — Top private engineering',
    labelTa: 'வலுவான நிலை — சிறந்த தனியார் பொறியியல்',
    examplesEn: 'SSN, PSG Tech, CIT, KCT, Thiagarajar',
    colour: 'from-emerald-500 to-teal-500',
    textColour: 'text-emerald-900',
    bgColour: 'bg-emerald-50 border-emerald-300',
  },
  {
    min: 150,
    labelEn: 'Good tier — Quality engineering colleges',
    labelTa: 'நல்ல நிலை — தரமான பொறியியல் கல்லூரிகள்',
    examplesEn: 'Kongu, Velammal, St. Joseph\'s, Sona, etc.',
    colour: 'from-amber-500 to-orange-500',
    textColour: 'text-amber-900',
    bgColour: 'bg-amber-50 border-amber-300',
  },
  {
    min: 50,
    labelEn: 'Entry tier — Many private colleges',
    labelTa: 'நுழைவு நிலை — பல தனியார் கல்லூரிகள்',
    examplesEn: 'Wide range of self-financing colleges',
    colour: 'from-blue-500 to-cyan-500',
    textColour: 'text-blue-900',
    bgColour: 'bg-blue-50 border-blue-300',
  },
  {
    min: 5,
    labelEn: 'Minimum qualifying — Limited options',
    labelTa: 'குறைந்தபட்ச தகுதி — வரம்புள்ள விருப்பங்கள்',
    examplesEn: 'Try direct-admission colleges (SRMIST, PSGCAS) too',
    colour: 'from-rose-400 to-pink-400',
    textColour: 'text-rose-900',
    bgColour: 'bg-rose-50 border-rose-300',
  },
  {
    min: 0,
    labelEn: 'Below TNEA threshold (need 5+ marks)',
    labelTa: 'TNEA எல்லைக்கு கீழே (குறைந்தபட்சம் 5 மதிப்பெண் தேவை)',
    examplesEn: 'Aim for at least one district-level participation',
    colour: 'from-gray-400 to-slate-400',
    textColour: 'text-gray-900',
    bgColour: 'bg-gray-50 border-gray-300',
  },
];

const getBand = (score: number) => SCORE_BANDS.find(b => score >= b.min) || SCORE_BANDS[SCORE_BANDS.length - 1];

export function TNEAScoreCalculator({ lang, onScoreChange }: TNEAScoreCalculatorProps) {
  const [achievements, setAchievements] = useState<SportAchievement[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [pickerCategory, setPickerCategory] = useState<MarksRow['category'] | null>(null);
  const [pickerRowId, setPickerRowId] = useState<string | null>(null);
  const [pickerMedal, setPickerMedal] = useState<MedalType | null>(null);

  const result = useMemo(() => calculateTNEASportsScore(achievements), [achievements]);
  const band = getBand(result.totalMarks);

  // Notify parent of score changes so it can be put on the share card
  useMemo(() => {
    onScoreChange?.(result.totalMarks, achievements);
  }, [result.totalMarks, achievements, onScoreChange]);

  const rowsByCategory = useMemo(() => {
    const map: Record<MarksRow['category'], MarksRow[]> = {
      international: [], national: [], state: [], regional: [], district: [],
    };
    TNEA_MARKS_TABLE.forEach(r => { map[r.category].push(r); });
    return map;
  }, []);

  const addAchievement = () => {
    if (!pickerRowId || !pickerMedal) return;
    setAchievements([...achievements, { marksRowId: pickerRowId, medal: pickerMedal }]);
    setAdding(false);
    setPickerCategory(null);
    setPickerRowId(null);
    setPickerMedal(null);
  };

  const removeAchievement = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx));
  };

  const resetAll = () => {
    setAchievements([]);
    setAdding(false);
    setPickerCategory(null);
    setPickerRowId(null);
    setPickerMedal(null);
  };

  const L = lang === 'ta' ? {
    title: 'என் TNEA விளையாட்டு மதிப்பெண் என்ன?',
    subtitle: 'உங்கள் சாதனைகளைச் சேர்த்து TNEA-க்காக உங்கள் மதிப்பெண்ணை கணக்கிடுங்கள்',
    addBtn: 'சாதனை சேர்க்க',
    yourScore: 'உங்கள் TNEA விளையாட்டு மதிப்பெண்',
    marks: 'மதிப்பெண்',
    noAchievementsTitle: 'இன்னும் ஒரு சாதனையும் சேர்க்கப்படவில்லை',
    noAchievementsBody: 'மேலே "சேர்" என்பதைத் தட்டி தொடங்கவும்.',
    selectCategory: 'போட்டியின் அளவு:',
    selectCompetition: 'போட்டியைத் தேர்ந்தெடுக்கவும்:',
    selectMedal: 'நீங்கள் என்ன சாதித்தீர்கள்?',
    addThis: 'இந்த சாதனையை சேர்',
    cancel: 'இரத்து',
    breakdown: 'மதிப்பெண் விவரம்',
    remove: 'அகற்று',
    reset: 'எல்லாவற்றையும் அழி',
    seeBreakdown: 'விரிவான விவரத்தைப் பார்',
    hideBreakdown: 'விவரத்தை மறை',
    couldFit: 'இது உங்களை இங்கே சேர்க்கலாம்:',
    important: 'முக்கியம்',
    disclaimer: 'இது TNEA விளையாட்டு கோட்டா மதிப்பெண்களை அதிகாரப்பூர்வ பட்டியலில் இருந்து கணக்கிடுகிறது. உண்மையான தரப்படுத்தல் சர்வதேச சான்றிதழ்கள் கூட சரிபார்ப்பு மற்றும் நிலையற்ற கட் ஆஃப் ஆகியவற்றைப் பொறுத்தது.',
    minNote: 'குறைந்தபட்சம் 5 மதிப்பெண்கள் TNEA விளையாட்டு கோட்டாவில் கருதப்படத் தேவை.',
  } : {
    title: 'What\'s my TNEA Sports Score?',
    subtitle: 'Add your sports achievements to estimate your TNEA quota score',
    addBtn: 'Add achievement',
    yourScore: 'Your TNEA Sports Score',
    marks: 'marks',
    noAchievementsTitle: 'No achievements added yet',
    noAchievementsBody: 'Tap "Add" above to begin.',
    selectCategory: 'Level of competition:',
    selectCompetition: 'Pick the competition:',
    selectMedal: 'What did you achieve?',
    addThis: 'Add this achievement',
    cancel: 'Cancel',
    breakdown: 'Score breakdown',
    remove: 'Remove',
    reset: 'Clear all',
    seeBreakdown: 'See breakdown',
    hideBreakdown: 'Hide breakdown',
    couldFit: 'Where this score could place you:',
    important: 'Important',
    disclaimer: 'This calculates your TNEA sports quota score from the official marks table. Actual ranking also depends on certificate verification and yearly cut-offs (which vary).',
    minNote: 'Minimum 5 marks required to be considered for TNEA sports quota.',
  };

  return (
    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-amber-50/50 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-4">
          <div className="flex items-start gap-2.5">
            <div className="bg-amber-400 text-emerald-900 rounded-lg p-2 flex-shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base leading-tight">{L.title}</h3>
              <p className="text-xs text-emerald-100 mt-0.5">{L.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Score display */}
        <div className={cn('p-5 border-b text-center', band.bgColour)}>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {L.yourScore}
          </div>
          <div className={cn('text-5xl font-black mt-1', band.textColour)}>
            {result.totalMarks}
            <span className="text-xl ml-1 opacity-60">{L.marks}</span>
          </div>
          {achievements.length === 0 && (
            <div className="text-xs text-muted-foreground mt-2 italic">
              {L.minNote}
            </div>
          )}
          {achievements.length > 0 && (
            <div className="mt-3 pt-3 border-t border-current/10">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                {L.couldFit}
              </div>
              <div className={cn('text-sm font-bold', band.textColour)}>
                {lang === 'ta' ? band.labelTa : band.labelEn}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {band.examplesEn}
              </div>
            </div>
          )}
        </div>

        {/* Achievements list */}
        <div className="p-4 space-y-3">
          {achievements.length > 0 && (
            <div className="space-y-1.5">
              {result.breakdown.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border text-xs"
                >
                  <span className="text-base flex-shrink-0">
                    {MEDAL_LABELS[b.medal].emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-tight truncate">
                      {lang === 'ta' ? b.row.competitionTa : b.row.competitionEn}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {lang === 'ta' ? MEDAL_LABELS[b.medal].ta : MEDAL_LABELS[b.medal].en}
                      {' · '}+{b.marks} {L.marks}
                    </div>
                  </div>
                  <button
                    onClick={() => removeAchievement(i)}
                    className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                    aria-label={L.remove}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {achievements.length === 0 && !adding && (
            <div className="text-center py-4">
              <Trophy className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
              <p className="font-medium text-sm">{L.noAchievementsTitle}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{L.noAchievementsBody}</p>
            </div>
          )}

          {/* Add button or picker */}
          {!adding && (
            <Button
              onClick={() => setAdding(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {L.addBtn}
            </Button>
          )}

          {/* Picker — 3 steps */}
          {adding && (
            <div className="bg-white border-2 border-emerald-300 rounded-xl p-3 space-y-3">
              {/* Step 1: Category */}
              <div>
                <div className="text-xs font-semibold mb-1.5">{L.selectCategory}</div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {(Object.keys(CATEGORY_LABELS) as MarksRow['category'][]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setPickerCategory(cat);
                        setPickerRowId(null);
                        setPickerMedal(null);
                      }}
                      className={cn(
                        'p-2 rounded-lg text-[10px] font-medium leading-tight border transition',
                        pickerCategory === cat
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-foreground border-gray-200 hover:border-emerald-400'
                      )}
                    >
                      <div className="text-base">{CATEGORY_LABELS[cat].emoji}</div>
                      <div className="mt-0.5">{lang === 'ta' ? CATEGORY_LABELS[cat].ta : CATEGORY_LABELS[cat].en}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Competition */}
              {pickerCategory && (
                <div>
                  <div className="text-xs font-semibold mb-1.5">{L.selectCompetition}</div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {rowsByCategory[pickerCategory].map(row => (
                      <button
                        key={row.id}
                        onClick={() => { setPickerRowId(row.id); setPickerMedal(null); }}
                        className={cn(
                          'w-full text-left p-2 rounded-lg text-[11px] leading-tight border transition',
                          pickerRowId === row.id
                            ? 'bg-emerald-100 border-emerald-500'
                            : 'bg-white border-gray-200 hover:border-emerald-400'
                        )}
                      >
                        <div className="font-medium">
                          {lang === 'ta' ? row.competitionTa : row.competitionEn}
                        </div>
                        {row.frequencyEn && (
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            {row.frequencyEn}
                          </div>
                        )}
                        <div className="text-[10px] mt-1 flex gap-2 text-muted-foreground">
                          {row.gold != null && <span>🥇 {row.gold}</span>}
                          {row.silver != null && <span>🥈 {row.silver}</span>}
                          {row.bronze != null && <span>🥉 {row.bronze}</span>}
                          {row.participation != null && <span>🎽 {row.participation}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Medal */}
              {pickerRowId && (
                <div>
                  <div className="text-xs font-semibold mb-1.5">{L.selectMedal}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(['gold', 'silver', 'bronze', 'participation'] as MedalType[]).map(m => {
                      const row = TNEA_MARKS_TABLE.find(r => r.id === pickerRowId);
                      if (!row) return null;
                      const value = row[m];
                      if (value == null) return null;
                      return (
                        <button
                          key={m}
                          onClick={() => setPickerMedal(m)}
                          className={cn(
                            'p-2 rounded-lg border text-center transition',
                            pickerMedal === m
                              ? MEDAL_LABELS[m].colour + ' border-current'
                              : 'bg-white border-gray-200 hover:border-emerald-400'
                          )}
                        >
                          <div className="text-base">{MEDAL_LABELS[m].emoji}</div>
                          <div className="text-[10px] font-medium mt-0.5">
                            {lang === 'ta' ? MEDAL_LABELS[m].ta : MEDAL_LABELS[m].en}
                          </div>
                          <div className="text-[10px] font-bold mt-0.5">
                            +{value}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action row */}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  className="flex-1 h-9 text-xs"
                  onClick={() => { setAdding(false); setPickerCategory(null); setPickerRowId(null); setPickerMedal(null); }}
                >
                  {L.cancel}
                </Button>
                <Button
                  disabled={!pickerRowId || !pickerMedal}
                  onClick={addAchievement}
                  className="flex-1 h-9 text-xs bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  {L.addThis}
                </Button>
              </div>
            </div>
          )}

          {/* Reset */}
          {achievements.length > 0 && !adding && (
            <button
              onClick={resetAll}
              className="w-full text-xs text-muted-foreground hover:text-red-600 py-1 underline"
            >
              {L.reset}
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <div className="px-4 pb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <strong>{L.important}:</strong> {L.disclaimer}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TNEAScoreCalculator;
