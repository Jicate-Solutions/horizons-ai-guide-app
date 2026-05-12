import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  ChevronLeft, ChevronRight, Trophy, CheckCircle2, AlertCircle,
  XCircle, Phone, Globe, MapPin, Calendar, Download, Share2,
  HelpCircle, ShieldCheck, ShieldAlert, FileText, Sparkles,
  GraduationCap, Dumbbell, Award, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  ALL_SPORTS, SPORT_LEVELS, TNEA_RULES, checkTNEAEligibility,
  Sport, SportLevel, Gender, CandidateProfile, EligibilityResult,
} from '@/data/sportsQuotaData';
import {
  buildAllEngineeringQuotaColleges, findMatchingColleges, sortByDistrict,
  CollegeMatch,
} from '@/data/sportsQuotaHelpers';
import { ReportIncorrectInfo } from '@/components/ReportIncorrectInfo';
import { useLanguage } from '@/hooks/useLanguage';

// =============================================================================
// Bilingual labels — kept inline so each screen is easy to read/translate.
// =============================================================================

const t = (lang: 'en' | 'ta') => ({
  pageTitle: lang === 'ta' ? 'விளையாட்டு கோட்டா பரிசோதனை' : 'Sports Quota Check',
  subtitle: lang === 'ta'
    ? 'எந்த கல்லூரிகள் உங்களை விளையாட்டு கோட்டாவில் சேர்க்கும் என்று தெரிந்து கொள்ளுங்கள்'
    : 'Find out which colleges will accept you under sports quota',
  back: lang === 'ta' ? 'பின்னால்' : 'Back',
  next: lang === 'ta' ? 'அடுத்து' : 'Next',
  startOver: lang === 'ta' ? 'மீண்டும் தொடங்கு' : 'Start over',
  step: lang === 'ta' ? 'படி' : 'Step',
  of: lang === 'ta' ? 'இல்' : 'of',
  // Q1
  q1Title: lang === 'ta' ? 'எந்த விளையாட்டு விளையாடுகிறீர்கள்?' : 'Which sport do you play?',
  q1Subtitle: lang === 'ta' ? 'உங்கள் முக்கிய விளையாட்டை தேர்ந்தெடுக்கவும்' : 'Pick your main sport',
  showMore: lang === 'ta' ? 'மேலும் காட்டு' : 'Show more',
  showLess: lang === 'ta' ? 'குறைவாக காட்டு' : 'Show less',
  // Q2
  q2Title: lang === 'ta' ? 'நீங்கள் என்ன அளவில் விளையாடி இருக்கிறீர்கள்?' : 'What level have you played at?',
  q2Subtitle: lang === 'ta' ? 'உங்கள் மிக உயர்ந்த சாதனை' : 'Your highest achievement',
  whatDoesThisMean: lang === 'ta' ? 'என்ன அர்த்தம்?' : 'What does this mean?',
  // Q3
  q3Title: lang === 'ta' ? 'எந்த ஆண்டில் இந்த சாதனை?' : 'Which year was this achievement?',
  q3Subtitle: lang === 'ta'
    ? 'பெரும்பாலான கல்லூரிகள் கடந்த 4 ஆண்டுகளுக்குள்ளான சான்றிதழ்களை மட்டுமே ஏற்கின்றன'
    : 'Most colleges only accept certificates from the last 4 years',
  older: lang === 'ta' ? '4 ஆண்டுகளுக்கு முந்தைய' : 'Older than 4 years',
  // Q4
  q4Title: lang === 'ta' ? '12-ஆம் வகுப்பில் உங்கள் சராசரி மதிப்பெண் என்ன?' : 'What is your 12th standard mark percentage?',
  q4Subtitle: lang === 'ta' ? 'அண்ணளவாக போதும். மாற்றலாம்.' : 'Rough estimate is fine. You can change later.',
  q4Slider: lang === 'ta' ? 'மதிப்பெண்' : 'Marks',
  // Q5
  q5Title: lang === 'ta' ? 'நீங்கள் ஆணா பெண்ணா?' : 'Are you male or female?',
  q5Subtitle: lang === 'ta'
    ? 'சில கல்லூரிகள் ஆண்களுக்கும் பெண்களுக்கும் வெவ்வேறு விளையாட்டுகளை ஏற்கின்றன'
    : 'Some colleges accept different sports for men vs women',
  male: lang === 'ta' ? 'ஆண்' : 'Male',
  female: lang === 'ta' ? 'பெண்' : 'Female',
  other: lang === 'ta' ? 'பிற' : 'Other',
  // Q6
  q6Title: lang === 'ta' ? 'உங்கள் பிரிவு (சாதி)?' : 'Your category?',
  q6Subtitle: lang === 'ta'
    ? 'பொது பிரிவுக்கு குறைந்தபட்சம் 45%. SC/ST/MBC/DNC/SCA-வுக்கு 40%.'
    : 'General needs minimum 45%. SC/ST/MBC/DNC/SCA needs only 40%.',
  general: lang === 'ta' ? 'பொது (General / BC / OBC)' : 'General (General / BC / OBC)',
  reserved: lang === 'ta' ? 'SC / ST / MBC / DNC / SCA' : 'SC / ST / MBC / DNC / SCA',
  // Q7
  q7Title: lang === 'ta' ? 'உங்கள் மாவட்டம் எது? (விரும்பினால்)' : 'Which district are you from? (optional)',
  q7Subtitle: lang === 'ta'
    ? 'உங்களுக்கு அருகில் உள்ள கல்லூரிகளை முதலில் காட்டுவோம்'
    : 'We\'ll show colleges near you first',
  skip: lang === 'ta' ? 'தவிர்' : 'Skip',
  // Results
  seeColleges: lang === 'ta' ? 'எனக்கான கல்லூரிகளைப் பார்க்க →' : 'See my colleges →',
  goodNews: lang === 'ta' ? 'நல்ல செய்தி!' : 'Good news!',
  resultsFor: lang === 'ta' ? 'உங்களுக்கான முடிவுகள்' : 'Your results',
  qualifyHeading: lang === 'ta' ? 'நீங்கள் தகுதியானவர்' : 'You qualify',
  borderlineHeading: lang === 'ta' ? 'எல்லைக்கோடு' : 'Borderline',
  aimHigherHeading: lang === 'ta' ? 'இதற்கு மேல் முயற்சி செய்' : 'Aim higher',
  collegesCount: lang === 'ta' ? 'கல்லூரிகள்' : 'colleges',
  documentsTitle: lang === 'ta' ? 'நீங்கள் சமர்ப்பிக்க வேண்டிய ஆவணங்கள்' : 'Documents you need to submit',
  callCollege: lang === 'ta' ? 'அழைக்க' : 'Call',
  visitWebsite: lang === 'ta' ? 'வலைத்தளம்' : 'Website',
  verified: lang === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified',
  unverified: lang === 'ta' ? 'அழைத்து உறுதிப்படுத்தவும்' : 'Call to confirm',
  applyDeadline: lang === 'ta' ? 'விண்ணப்ப கடைசி நாள்' : 'Apply by',
  contactSports: lang === 'ta' ? 'விளையாட்டு அலுவலர் தொடர்பு' : 'Sports officer contact',
  acceptedSports: lang === 'ta' ? 'ஏற்கப்படும் விளையாட்டுகள்' : 'Accepted sports',
  selectionProcess: lang === 'ta' ? 'தேர்வு செயல்முறை' : 'Selection process',
  whyThisVerdict: lang === 'ta' ? 'ஏன் இந்த முடிவு?' : 'Why this verdict?',
  growthPath: lang === 'ta' ? 'நீங்கள் என்ன செய்ய வேண்டும்?' : 'What you should do',
  showAllColleges: lang === 'ta' ? 'அனைத்து கல்லூரிகளையும் காட்டு' : 'Show all colleges',
  showLess2: lang === 'ta' ? 'குறைவாக காட்டு' : 'Show less',
  saveResults: lang === 'ta' ? 'முடிவுகளை சேமி' : 'Save results',
  shareWhatsApp: lang === 'ta' ? 'WhatsApp-ல் பகிர்' : 'Share on WhatsApp',
  documentChecklist: lang === 'ta' ? 'ஆவண பட்டியல்' : 'Document checklist',
  important: lang === 'ta' ? 'முக்கியம்' : 'Important',
  optional: lang === 'ta' ? 'விருப்பத்தேர்வு' : 'Optional',
  commonMistakes: lang === 'ta' ? 'சாதாரண தவறுகள் - இவற்றை தவிர்க்கவும்' : 'Common rejection reasons — avoid these!',
  checkAnother: lang === 'ta' ? 'மற்றொன்றை சரிபார்' : 'Check another',
});

type Step = 'sport' | 'level' | 'year' | 'marks' | 'gender' | 'category' | 'district' | 'results';

const STEP_ORDER: Step[] = ['sport', 'level', 'year', 'marks', 'gender', 'category', 'district', 'results'];

// Translate field name for display
const translateField = (field: string, lang: 'en' | 'ta'): string => {
  const map: Record<string, { en: string; ta: string }> = {
    engineering: { en: 'Engineering', ta: 'பொறியியல்' },
    medical:     { en: 'Medical',     ta: 'மருத்துவம்' },
    arts:        { en: 'Arts & Science', ta: 'கலை & அறிவியல்' },
    law:         { en: 'Law',         ta: 'சட்டம்' },
    agriculture: { en: 'Agriculture', ta: 'வேளாண்மை' },
    other:       { en: 'Other',       ta: 'பிற' },
  };
  return map[field]?.[lang] ?? field;
};

const TN_DISTRICTS = [
  'Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri',
  'Dindigul','Erode','Kallakurichi','Kanchipuram','Kanyakumari','Karur',
  'Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Namakkal','Nilgiris',
  'Perambalur','Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga',
  'Tenkasi','Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli',
  'Tirupathur','Tirupur','Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore',
  'Villupuram','Virudhunagar',
];

const SportsQuotaEligibility = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang: 'en' | 'ta' = language === 'ta' ? 'ta' : 'en';
  const L = t(lang);

  const [step, setStep] = useState<Step>('sport');
  const [showAllSports, setShowAllSports] = useState(false);
  const [showAllColleges, setShowAllColleges] = useState(false);
  const [showLevelHelp, setShowLevelHelp] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  // Candidate state
  const [sport, setSport] = useState<Sport | null>(null);
  const [level, setLevel] = useState<SportLevel | null>(null);
  const [yearOfAchievement, setYearOfAchievement] = useState<number | null>(null);
  const [marks12th, setMarks12th] = useState<number>(60);
  const [gender, setGender] = useState<Gender | null>(null);
  const [category, setCategory] = useState<'general' | 'reserved' | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const stepIndex = STEP_ORDER.indexOf(step);
  const progress = ((stepIndex + 1) / STEP_ORDER.length) * 100;

  const goNext = (next?: Step) => {
    if (next) { setStep(next); return; }
    const i = STEP_ORDER.indexOf(step);
    if (i < STEP_ORDER.length - 1) setStep(STEP_ORDER[i + 1]);
  };
  const goBack = () => {
    const i = STEP_ORDER.indexOf(step);
    if (i > 0) setStep(STEP_ORDER[i - 1]);
    else navigate(-1);
  };
  const reset = () => {
    setStep('sport');
    setSport(null); setLevel(null); setYearOfAchievement(null);
    setMarks12th(60); setGender(null); setCategory(null); setDistrict(null);
    setShowAllSports(false); setShowAllColleges(false);
  };

  // Eligibility computed once we have all required answers
  const candidateProfile = useMemo<CandidateProfile | null>(() => {
    if (!sport || !level || !yearOfAchievement || !gender || !category) return null;
    return { sport, level, yearOfAchievement, marks12th, gender, category, district: district || undefined };
  }, [sport, level, yearOfAchievement, marks12th, gender, category, district]);

  const eligibility = useMemo<EligibilityResult | null>(
    () => candidateProfile ? checkTNEAEligibility(candidateProfile) : null,
    [candidateProfile]
  );

  const matches = useMemo<CollegeMatch[]>(() => {
    if (!candidateProfile || !eligibility) return [];
    return sortByDistrict(findMatchingColleges(candidateProfile, eligibility), district || undefined);
  }, [candidateProfile, eligibility, district]);

  const qualified = matches.filter(m => m.verdict === 'qualified');
  const borderline = matches.filter(m => m.verdict === 'borderline');
  const aimHigher = matches.filter(m => m.verdict === 'aim-higher');

  // The overall verdict shown at the top is the BEST outcome available.
  // If ANY college will take this student, show 'qualified' even if TNEA itself says no.
  const overallEligibility = useMemo<EligibilityResult | null>(() => {
    if (!eligibility) return null;
    if (qualified.length > 0) {
      return {
        verdict: 'qualified',
        reasonEn: `Great news — ${qualified.length} college${qualified.length === 1 ? '' : 's'} will accept you under sports quota.`,
        reasonTa: `நல்ல செய்தி — ${qualified.length} கல்லூரி${qualified.length === 1 ? '' : 'கள்'} உங்களை விளையாட்டு கோட்டாவில் ஏற்கும்.`,
      };
    }
    if (borderline.length > 0) {
      return {
        verdict: 'borderline',
        reasonEn: `${borderline.length} college${borderline.length === 1 ? '' : 's'} run open trials — you can attend and try to qualify on the spot. ${eligibility.reasonEn}`,
        reasonTa: `${borderline.length} கல்லூரி${borderline.length === 1 ? '' : 'கள்'} திறந்த தேர்வுகளை நடத்துகின்றன — நீங்கள் கலந்துகொண்டு அங்கேயே தகுதி பெற முயற்சி செய்யலாம். ${eligibility.reasonTa}`,
        growthPathEn: eligibility.growthPathEn,
        growthPathTa: eligibility.growthPathTa,
      };
    }
    return eligibility;
  }, [eligibility, qualified.length, borderline.length]);

  // ─── RENDER ───────────────────────────────────────────────────────────────

  // PRIMARY sports — shown first (Tamil Nadu's most-played at school level)
  const PRIMARY_SPORT_IDS: Sport[] = [
    'cricket', 'kabaddi', 'athletics', 'football', 'volleyball',
    'basketball', 'badminton', 'hockey', 'kho-kho', 'chess',
  ];
  const primarySports = ALL_SPORTS.filter(s => PRIMARY_SPORT_IDS.includes(s.id));
  const otherSports = ALL_SPORTS.filter(s => !PRIMARY_SPORT_IDS.includes(s.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/40">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={goBack} className="px-2">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline ml-1">{L.back}</span>
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <h1 className="text-base sm:text-lg font-bold text-emerald-900 truncate">{L.pageTitle}</h1>
            </div>
          </div>
          {step !== 'sport' && step !== 'results' && (
            <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-muted-foreground">
              {L.startOver}
            </Button>
          )}
        </div>
        {step !== 'results' && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
              <span>{L.step} {stepIndex + 1} {L.of} {STEP_ORDER.length - 1}</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 max-w-2xl">

        {/* ─── Q1: Sport ─── */}
        {step === 'sport' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q1Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q1Subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {primarySports.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSport(s.id); goNext(); }}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                    sport === s.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                  )}
                >
                  <div className="font-semibold text-base">{lang === 'ta' ? s.ta : s.en}</div>
                  {lang === 'en' && s.ta && (
                    <div className="text-xs text-muted-foreground mt-0.5">{s.ta}</div>
                  )}
                </button>
              ))}
            </div>
            {!showAllSports ? (
              <button
                onClick={() => setShowAllSports(true)}
                className="w-full p-3 text-sm text-emerald-700 font-medium hover:bg-emerald-50 rounded-xl transition"
              >
                + {L.showMore} ({otherSports.length})
              </button>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {otherSports.map(s => (
                    <button
                      key={s.id}
                      onClick={() => { setSport(s.id); goNext(); }}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                        sport === s.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                      )}
                    >
                      <div className="font-semibold text-base">{lang === 'ta' ? s.ta : s.en}</div>
                      {lang === 'en' && s.ta && (
                        <div className="text-xs text-muted-foreground mt-0.5">{s.ta}</div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAllSports(false)}
                  className="w-full p-2 text-xs text-muted-foreground hover:bg-gray-100 rounded-xl"
                >
                  {L.showLess}
                </button>
              </>
            )}
          </div>
        )}

        {/* ─── Q2: Level ─── */}
        {step === 'level' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q2Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q2Subtitle}</p>
            </div>
            <div className="space-y-3">
              {SPORT_LEVELS.map(l => (
                <button
                  key={l.id}
                  onClick={() => { setLevel(l.id); goNext(); }}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                    level === l.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                  )}
                >
                  <div className="font-semibold text-base">{lang === 'ta' ? l.ta : l.en}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {lang === 'ta' ? l.helpTa : l.helpEn}
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
              <strong>{L.important}:</strong>{' '}
              {lang === 'ta'
                ? 'TNEA விளையாட்டு கோட்டாவுக்கு குறைந்தபட்சம் மாநில அளவு தேவை. மாவட்ட அளவு போதாது.'
                : 'TNEA sports quota requires minimum State level. District level is not enough.'}
            </div>
          </div>
        )}

        {/* ─── Q3: Year ─── */}
        {step === 'year' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q3Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q3Subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[2026, 2025, 2024, 2023].map(y => (
                <button
                  key={y}
                  onClick={() => { setYearOfAchievement(y); goNext(); }}
                  className={cn(
                    'p-5 rounded-xl border-2 text-center transition-all',
                    'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                    yearOfAchievement === y ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                  )}
                >
                  <div className="font-bold text-xl">{y}</div>
                </button>
              ))}
              <button
                onClick={() => { setYearOfAchievement(2020); goNext(); }}
                className={cn(
                  'p-5 rounded-xl border-2 text-center transition-all col-span-2',
                  'hover:border-amber-500 hover:bg-amber-50 active:scale-[0.98]',
                  yearOfAchievement && yearOfAchievement <= 2022 ? 'border-amber-600 bg-amber-50' : 'border-gray-200 bg-white',
                )}
              >
                <div className="font-semibold text-sm">{L.older}</div>
              </button>
            </div>
          </div>
        )}

        {/* ─── Q4: Marks ─── */}
        {step === 'marks' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q4Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q4Subtitle}</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-emerald-700">{marks12th}%</div>
              <div className="text-xs text-muted-foreground mt-1">{L.q4Slider}</div>
            </div>
            <Slider
              value={[marks12th]}
              onValueChange={(v) => setMarks12th(v[0])}
              min={35} max={100} step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>35%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <Button className="w-full h-12 text-base" onClick={() => goNext()}>
              {L.next} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* ─── Q5: Gender ─── */}
        {step === 'gender' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q5Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q5Subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {([
                { id: 'male', label: L.male },
                { id: 'female', label: L.female },
                { id: 'other', label: L.other },
              ] as { id: Gender; label: string }[]).map(g => (
                <button
                  key={g.id}
                  onClick={() => { setGender(g.id); goNext(); }}
                  className={cn(
                    'p-5 rounded-xl border-2 text-center transition-all text-lg font-semibold',
                    'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                    gender === g.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── Q6: Category ─── */}
        {step === 'category' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q6Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q6Subtitle}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => { setCategory('general'); goNext(); }}
                className={cn(
                  'w-full p-5 rounded-xl border-2 text-left transition-all',
                  'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                  category === 'general' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                )}
              >
                <div className="font-semibold text-base">{L.general}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {lang === 'ta' ? 'குறைந்தபட்சம் 45% 12-ஆம் வகுப்பு மதிப்பெண் தேவை' : 'Minimum 45% in 12th required'}
                </div>
              </button>
              <button
                onClick={() => { setCategory('reserved'); goNext(); }}
                className={cn(
                  'w-full p-5 rounded-xl border-2 text-left transition-all',
                  'hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.98]',
                  category === 'reserved' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white',
                )}
              >
                <div className="font-semibold text-base">{L.reserved}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {lang === 'ta' ? 'குறைந்தபட்சம் 40% 12-ஆம் வகுப்பு மதிப்பெண் தேவை' : 'Minimum 40% in 12th required'}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ─── Q7: District (optional) ─── */}
        {step === 'district' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">{L.q7Title}</h2>
              <p className="text-sm text-muted-foreground">{L.q7Subtitle}</p>
            </div>
            <select
              value={district || ''}
              onChange={(e) => setDistrict(e.target.value || null)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white text-base focus:border-emerald-500 focus:outline-none"
            >
              <option value="">— {lang === 'ta' ? 'தேர்ந்தெடு' : 'Select your district'} —</option>
              {TN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => { setDistrict(null); goNext('results'); }}>
                {L.skip}
              </Button>
              <Button onClick={() => goNext('results')} disabled={!district} className="h-12">
                {L.seeColleges}
              </Button>
            </div>
          </div>
        )}

        {/* ─── RESULTS ─── */}
        {step === 'results' && overallEligibility && candidateProfile && (
          <ResultsView
            lang={lang}
            L={L}
            eligibility={overallEligibility}
            qualified={qualified}
            borderline={borderline}
            aimHigher={aimHigher}
            candidateProfile={candidateProfile}
            showAllColleges={showAllColleges}
            setShowAllColleges={setShowAllColleges}
            showDocs={showDocs}
            setShowDocs={setShowDocs}
            onReset={reset}
          />
        )}
      </main>
    </div>
  );
};

// =============================================================================
// RESULTS VIEW — separate component to keep code clean
// =============================================================================

interface ResultsViewProps {
  lang: 'en' | 'ta';
  L: ReturnType<typeof t>;
  eligibility: EligibilityResult;
  qualified: CollegeMatch[];
  borderline: CollegeMatch[];
  aimHigher: CollegeMatch[];
  candidateProfile: CandidateProfile;
  showAllColleges: boolean;
  setShowAllColleges: (v: boolean) => void;
  showDocs: boolean;
  setShowDocs: (v: boolean) => void;
  onReset: () => void;
}

const ResultsView = ({
  lang, L, eligibility, qualified, borderline, aimHigher,
  candidateProfile, showAllColleges, setShowAllColleges,
  showDocs, setShowDocs, onReset,
}: ResultsViewProps) => {
  const verdictColor = {
    qualified: 'bg-green-50 border-green-300 text-green-900',
    borderline: 'bg-amber-50 border-amber-300 text-amber-900',
    'aim-higher': 'bg-rose-50 border-rose-300 text-rose-900',
  }[eligibility.verdict];

  const verdictIcon = {
    qualified: <CheckCircle2 className="w-8 h-8 text-green-600" />,
    borderline: <AlertCircle className="w-8 h-8 text-amber-600" />,
    'aim-higher': <XCircle className="w-8 h-8 text-rose-600" />,
  }[eligibility.verdict];

  const verdictHeading = {
    qualified: L.goodNews,
    borderline: lang === 'ta' ? 'நீங்கள் கிட்டத்தட்ட தகுதியானவர்' : 'You\'re close',
    'aim-higher': lang === 'ta' ? 'இன்னும் சிறிது தூரம்' : 'A bit more to go',
  }[eligibility.verdict];

  const shareText = encodeURIComponent(
    `${lang === 'ta' ? 'நான் VAZHIKATTI-ல் என் விளையாட்டு கோட்டா தகுதியை சரிபார்த்தேன்' : 'I checked my sports quota eligibility on VAZHIKATTI'}: ${verdictHeading}\n\n${qualified.length} ${L.collegesCount} ${lang === 'ta' ? 'என்னை ஏற்கும்' : 'will accept me'}.\n\nhttps://horizons-ai-guide-app.vercel.app/sports-quota-check`
  );

  return (
    <div className="space-y-5">
      {/* Verdict banner */}
      <Card className={cn('border-2', verdictColor)}>
        <CardContent className="p-5 flex items-start gap-4">
          {verdictIcon}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold mb-1">{verdictHeading}</h2>
            <p className="text-sm leading-relaxed">
              {lang === 'ta' ? eligibility.reasonTa : eligibility.reasonEn}
            </p>
            {eligibility.growthPathEn && (
              <div className="mt-3 pt-3 border-t border-current/20">
                <div className="text-xs font-semibold mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {L.growthPath}
                </div>
                <p className="text-sm">{lang === 'ta' ? eligibility.growthPathTa : eligibility.growthPathEn}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-green-700">{qualified.length}</div>
            <div className="text-[10px] text-green-800 leading-tight">{L.qualifyHeading}</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-amber-700">{borderline.length}</div>
            <div className="text-[10px] text-amber-800 leading-tight">{L.borderlineHeading}</div>
          </CardContent>
        </Card>
        <Card className="border-rose-200 bg-rose-50">
          <CardContent className="p-3">
            <div className="text-2xl font-bold text-rose-700">{aimHigher.length}</div>
            <div className="text-[10px] text-rose-800 leading-tight">{L.aimHigherHeading}</div>
          </CardContent>
        </Card>
      </div>

      {/* TNEA 2026 key dates + helpline — show only if student is on TNEA path */}
      {(eligibility.verdict === 'qualified' || eligibility.verdict === 'borderline') && (
        <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-amber-900">
                  {lang === 'ta' ? 'TNEA 2026 முக்கிய தேதிகள்' : 'TNEA 2026 key dates'}
                </h3>
                <p className="text-[11px] text-amber-700">
                  {lang === 'ta'
                    ? 'விளையாட்டு கோட்டாவுக்கு விண்ணப்பிக்கும் அனைவருக்கும் பொருந்தும்'
                    : 'Applies to anyone applying via TNEA sports quota'}
                </p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2 bg-red-100 border border-red-300 rounded-lg p-2">
                <Clock className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-red-900">
                    {lang === 'ta' ? 'விண்ணப்ப கடைசி நாள்' : 'Application deadline'}: {TNEA_RULES.dates.registrationDeadline}
                  </div>
                  <div className="text-[11px] text-red-800">
                    {lang === 'ta'
                      ? 'tneaonline.org-ல் இப்போதே பதிவு செய்யுங்கள்'
                      : 'Register on tneaonline.org now'}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-[11px]">
                <span className="text-muted-foreground">{lang === 'ta' ? 'ஆவண சரிபார்ப்பு' : 'Document verification'}:</span>
                <span className="font-medium">{TNEA_RULES.dates.tfcVerificationWindow}</span>
              </div>
              <div className="flex gap-2 text-[11px]">
                <span className="text-muted-foreground">{lang === 'ta' ? 'ரேங்க் லிஸ்ட்' : 'Rank list'}:</span>
                <span className="font-medium">{TNEA_RULES.dates.rankListRelease}</span>
              </div>
              <div className="flex gap-2 text-[11px]">
                <span className="text-muted-foreground">{lang === 'ta' ? 'ஆலோசனை' : 'Counselling'}:</span>
                <span className="font-medium">{TNEA_RULES.dates.counsellingMonth}</span>
              </div>
              <div className="text-[10px] text-amber-800 italic pt-1 border-t border-amber-200">
                {lang === 'ta'
                  ? 'விளையாட்டு கோட்டா ஆலோசனை நேரில் (in-person) நடக்கும், பொது ஆலோசனைக்கு முன்.'
                  : 'Sports quota counselling is held IN PERSON, before general counselling.'}
              </div>
            </div>
            {/* TNEA helpline */}
            <div className="pt-3 border-t border-amber-200 flex flex-wrap gap-2">
              <a
                href={`tel:${TNEA_RULES.helpline.phone}`}
                className="flex-1 flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition"
              >
                <Phone className="w-3.5 h-3.5" />
                {lang === 'ta' ? 'TNEA உதவி எண்' : 'TNEA helpline'}: {TNEA_RULES.helpline.phone}
              </a>
              <a
                href={TNEA_RULES.helpline.website}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-white border border-amber-400 text-amber-800 text-xs font-medium py-2 px-3 rounded-lg hover:bg-amber-50 transition"
              >
                <Globe className="w-3.5 h-3.5" />
                tneaonline.org
              </a>
            </div>
            <div className="text-[10px] text-muted-foreground text-center">
              {lang === 'ta'
                ? `விண்ணப்ப கட்டணம்: பொது ${TNEA_RULES.counsellingFees.general} · SC/SCA/ST (தமிழ்நாடு) ${TNEA_RULES.counsellingFees.reserved}`
                : `Counselling fee: General ${TNEA_RULES.counsellingFees.general} · SC/SCA/ST (TN) ${TNEA_RULES.counsellingFees.reserved}`}
              {' · '}
              {lang === 'ta' ? 'உதவி நேரம்' : 'Helpline'}: {TNEA_RULES.helpline.timing}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action row */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium text-sm transition"
        >
          <Share2 className="w-4 h-4" /> {L.shareWhatsApp}
        </a>
        <Button
          variant="outline"
          onClick={() => setShowDocs(!showDocs)}
          className="h-12 text-sm"
        >
          <FileText className="w-4 h-4 mr-1.5" />
          {L.documentChecklist}
        </Button>
      </div>

      {/* Document checklist (collapsible) */}
      {showDocs && <DocumentChecklist lang={lang} L={L} />}

      {/* College list */}
      {qualified.length > 0 && (
        <CollegeSection
          title={L.qualifyHeading}
          colour="green"
          matches={showAllColleges ? qualified : qualified.slice(0, 5)}
          lang={lang}
          L={L}
        />
      )}

      {qualified.length === 0 && borderline.length > 0 && (
        <CollegeSection
          title={L.borderlineHeading}
          colour="amber"
          matches={showAllColleges ? borderline : borderline.slice(0, 3)}
          lang={lang}
          L={L}
        />
      )}

      {qualified.length === 0 && borderline.length === 0 && aimHigher.length > 0 && (
        <Card className="bg-rose-50 border-rose-200">
          <CardContent className="p-5">
            <h3 className="font-semibold text-rose-900 mb-2">
              {lang === 'ta' ? 'TNEA விளையாட்டு கோட்டா இப்போது சாத்தியமில்லை' : 'TNEA sports quota not possible right now'}
            </h3>
            <p className="text-sm text-rose-800 leading-relaxed">
              {lang === 'ta' ? eligibility.growthPathTa || eligibility.reasonTa : eligibility.growthPathEn || eligibility.reasonEn}
            </p>
          </CardContent>
        </Card>
      )}

      {(qualified.length > 5 || borderline.length > 3) && (
        <Button
          variant="outline"
          onClick={() => setShowAllColleges(!showAllColleges)}
          className="w-full"
        >
          {showAllColleges ? L.showLess2 : L.showAllColleges}
        </Button>
      )}

      <Button variant="ghost" onClick={onReset} className="w-full text-sm">
        {L.checkAnother}
      </Button>
    </div>
  );
};

// =============================================================================
// DOCUMENT CHECKLIST
// =============================================================================

const DocumentChecklist = ({ lang, L }: { lang: 'en' | 'ta'; L: ReturnType<typeof t> }) => (
  <Card className="border-emerald-200">
    <CardContent className="p-5 space-y-4">
      <div>
        <h3 className="font-bold text-emerald-900 text-base mb-1">{L.documentsTitle}</h3>
        <p className="text-xs text-muted-foreground">
          {lang === 'ta'
            ? 'TNEA விளையாட்டு கோட்டாவுக்கு பொதுவான ஆவணங்கள்'
            : 'Universal documents required for TNEA sports quota'}
        </p>
      </div>
      <ul className="space-y-3">
        {TNEA_RULES.documents.map(doc => (
          <li key={doc.id} className="flex items-start gap-3">
            <div className={cn(
              'flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center',
              doc.critical ? 'border-red-400' : 'border-gray-300',
            )}>
              <div className="w-2 h-2 rounded-sm bg-transparent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">
                  {lang === 'ta' ? doc.titleTa : doc.titleEn}
                </span>
                {doc.critical
                  ? <Badge variant="outline" className="text-[9px] bg-red-50 text-red-700 border-red-200">{L.important}</Badge>
                  : <Badge variant="outline" className="text-[9px] bg-gray-50 text-gray-600">{L.optional}</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {lang === 'ta' ? doc.detailTa : doc.detailEn}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Common rejection reasons */}
      <div className="mt-4 pt-4 border-t bg-amber-50 -mx-5 px-5 pb-4 -mb-5">
        <h4 className="font-semibold text-amber-900 text-sm mb-2 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" /> {L.commonMistakes}
        </h4>
        <ul className="space-y-1.5">
          {TNEA_RULES.rejectionReasons.map((r, i) => (
            <li key={i} className="text-xs text-amber-900 flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>{lang === 'ta' ? r.ta : r.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

// =============================================================================
// COLLEGE SECTION (list of college cards)
// =============================================================================

const CollegeSection = ({
  title, colour, matches, lang, L,
}: {
  title: string;
  colour: 'green' | 'amber' | 'rose';
  matches: CollegeMatch[];
  lang: 'en' | 'ta';
  L: ReturnType<typeof t>;
}) => {
  const headerClass = {
    green: 'text-green-900',
    amber: 'text-amber-900',
    rose: 'text-rose-900',
  }[colour];

  return (
    <div className="space-y-3">
      <h3 className={cn('font-bold text-base flex items-center gap-2', headerClass)}>
        <div className={cn(
          'w-2.5 h-2.5 rounded-full',
          colour === 'green' && 'bg-green-500',
          colour === 'amber' && 'bg-amber-500',
          colour === 'rose' && 'bg-rose-500',
        )} />
        {title} <span className="text-sm font-normal text-muted-foreground">({matches.length})</span>
      </h3>
      <div className="space-y-3">
        {matches.map(m => <CollegeCard key={m.college.id} match={m} lang={lang} L={L} />)}
      </div>
    </div>
  );
};

// =============================================================================
// SINGLE COLLEGE CARD
// =============================================================================

const CollegeCard = ({ match, lang, L }: { match: CollegeMatch; lang: 'en' | 'ta'; L: ReturnType<typeof t> }) => {
  const { college } = match;
  const isVerified = college.verification === 'verified';

  return (
    <Card className="border-gray-200 hover:border-emerald-300 transition">
      <CardContent className="p-4 space-y-3">
        {/* Name + verified badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base text-emerald-900 leading-snug">
              {college.collegeName}
            </h4>
            {college.collegeNameTa && lang === 'en' && (
              <p className="text-xs text-muted-foreground mt-0.5">{college.collegeNameTa}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {college.district}</span>
              <span>•</span>
              <span>{college.type}</span>
              <span>•</span>
              <span className="capitalize">{lang === 'ta' ? translateField(college.field, 'ta') : translateField(college.field, 'en')}</span>
            </div>
          </div>
          {isVerified ? (
            <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] gap-0.5">
              <ShieldCheck className="w-3 h-3" /> {L.verified}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] gap-0.5">
              <ShieldAlert className="w-3 h-3" /> {L.unverified}
            </Badge>
          )}
        </div>

        {/* Verdict line */}
        <div className="text-xs leading-relaxed flex items-start gap-1.5">
          {match.verdict === 'qualified' && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />}
          {match.verdict === 'borderline' && <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />}
          {match.verdict === 'aim-higher' && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />}
          {match.verdict === 'sport-not-offered' && <XCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />}
          <span>{lang === 'ta' ? match.matchReasonTa : match.matchReasonEn}</span>
        </div>

        {/* FREE EDUCATION HIGHLIGHT — verified colleges only */}
        {isVerified && college.overrides?.freeEducation && (
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-lg p-3 flex items-start gap-2">
            <GraduationCap className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-sm leading-tight">
                {lang === 'ta' ? 'தகுதியான வீரர்களுக்கு இலவசக் கல்வி!' : 'FREE EDUCATION for deserving players!'}
              </div>
              {college.overrides.freeEducationNote && (
                <div className="text-xs mt-0.5 leading-snug">
                  {college.overrides.freeEducationNote}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRIAL DATE for this candidate's sport (if available) */}
        {isVerified && college.overrides?.trialsMen && (
          <TrialDateInline
            college={college}
            lang={lang}
          />
        )}

        {/* Infrastructure highlights */}
        {isVerified && college.overrides?.infrastructure && college.overrides.infrastructure.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {college.overrides.infrastructure.map((inf, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5">
                <Dumbbell className="w-2.5 h-2.5" />
                {lang === 'ta' ? inf.ta : inf.en}
              </span>
            ))}
          </div>
        )}

        {/* Schemes (Khelo India etc.) */}
        {isVerified && college.overrides?.schemes && college.overrides.schemes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {college.overrides.schemes.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2 py-0.5">
                <Award className="w-2.5 h-2.5" />
                {s}
              </span>
            ))}
          </div>
        )}

        {/* College-specific details if verified */}
        {isVerified && college.overrides && (college.overrides.achievementsRequired || college.overrides.selectionProcess || college.overrides.sportsScholarship) && (
          <div className="text-xs space-y-1.5 bg-emerald-50/50 rounded-lg p-2.5">
            {college.overrides.achievementsRequired && (
              <div>
                <span className="font-medium">
                  {lang === 'ta' ? 'தேவையான சாதனைகள்: ' : 'Achievements needed: '}
                </span>
                {college.overrides.achievementsRequired}{' '}
                {lang === 'ta' ? `(கடந்த ${college.overrides.achievementWindowYears || 4} ஆண்டுகளில்)` : `(in last ${college.overrides.achievementWindowYears || 4} years)`}
              </div>
            )}
            {college.overrides.selectionProcess && (
              <div>
                <span className="font-medium">{L.selectionProcess}: </span>
                {college.overrides.selectionProcess}
              </div>
            )}
            {college.overrides.sportsScholarship && (
              <div className="flex items-start gap-1.5 pt-1.5 mt-1 border-t border-emerald-200/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-700">
                    {lang === 'ta' ? 'கூடுதல் சலுகைகள்: ' : 'Bonus benefits: '}
                  </span>
                  <span>{college.overrides.sportsScholarship}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
          {college.contact.phone && (
            <a
              href={`tel:${college.contact.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition"
            >
              <Phone className="w-3.5 h-3.5" />
              {L.callCollege}
              {college.contact.sportsOfficer && (
                <span className="opacity-90">({college.contact.sportsOfficer.split(' ').slice(-1)[0]})</span>
              )}
            </a>
          )}
          {college.contact.website && (
            <a
              href={college.contact.website}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:border-emerald-500 text-xs font-medium py-2 px-3 rounded-lg transition"
            >
              <Globe className="w-3.5 h-3.5" />
              {L.visitWebsite}
            </a>
          )}
          <ReportIncorrectInfo
            entityType="college"
            entityId={college.id}
            entityName={college.collegeName}
            variant="ghost"
            size="sm"
            iconOnly
            className="text-amber-600 hover:text-amber-700"
          />
        </div>

        {/* Sports officer detail */}
        {isVerified && college.contact.sportsOfficer && (
          <div className="text-[11px] text-muted-foreground border-t pt-2 space-y-1">
            <div>
              <span className="font-medium">{L.contactSports}: </span>
              {college.contact.sportsOfficer}
              {college.contact.designation && <> · {college.contact.designation}</>}
              {college.contact.phone && (
                <a href={`tel:${college.contact.phone}`} className="text-emerald-700 ml-1 hover:underline">
                  · {college.contact.phone}
                </a>
              )}
            </div>
            {college.contact.sportsOfficer2 && (
              <div>
                <span className="font-medium">{lang === 'ta' ? '2-வது தொடர்பு: ' : '2nd contact: '}</span>
                {college.contact.sportsOfficer2}
                {college.contact.designation2 && <> · {college.contact.designation2}</>}
                {college.contact.phone2 && (
                  <a href={`tel:${college.contact.phone2}`} className="text-emerald-700 ml-1 hover:underline">
                    · {college.contact.phone2}
                  </a>
                )}
              </div>
            )}
            {college.contact.email && (
              <div className="break-all">
                📧 <a href={`mailto:${college.contact.email}`} className="text-emerald-700 hover:underline">
                  {college.contact.email}
                </a>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// =============================================================================
// TrialDateInline — Shows the trial date for the candidate's sport (if any)
// =============================================================================

const TrialDateInline = ({
  college, lang,
}: {
  college: CollegeMatch['college'];
  lang: 'en' | 'ta';
}) => {
  const trials = college.overrides?.trialsMen || [];
  if (trials.length === 0) return null;

  // For now, show all trials in a small compact list (since we don't know candidate sport here without prop)
  // To keep it tight, we'll just show the first 3 dates
  const upcoming = trials.slice(0, 4);
  const totalCount = trials.length;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 mb-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {lang === 'ta' ? `தேர்வு தேதிகள் (${totalCount})` : `Trial dates (${totalCount})`}
      </div>
      <div className="space-y-1">
        {upcoming.map((t, i) => {
          const d = new Date(t.date);
          const dateStr = d.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', {
            day: 'numeric', month: 'short',
          });
          return (
            <div key={i} className="flex items-center gap-2 text-[11px] text-blue-900">
              <span className="font-medium w-20 flex-shrink-0">{dateStr}</span>
              <span className="capitalize flex-1">{t.sport.replace('-', ' ')}</span>
              <Clock className="w-2.5 h-2.5 text-blue-500" />
              <span className="font-mono text-[10px]">{t.time}</span>
            </div>
          );
        })}
        {totalCount > 4 && (
          <div className="text-[10px] text-blue-600 italic pt-1">
            +{totalCount - 4} {lang === 'ta' ? 'மேலும்' : 'more — see college website'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsQuotaEligibility;
