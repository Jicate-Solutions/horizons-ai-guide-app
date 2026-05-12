import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  BookOpen,
  Users,
  Accessibility,
  Wallet,
  GitBranch,
  Calculator,
  Trophy,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { TNEA2026BrochureInfo } from '@/components/EduCutoff/TNEA2026BrochureInfo';
import { TNEACommunityLookup } from '@/components/EduCutoff/TNEACommunityLookup';
import { TNEAPwDEligibilityChecker } from '@/components/EduCutoff/TNEAPwDEligibilityChecker';
import { TNEAFeeCalculator } from '@/components/EduCutoff/TNEAFeeCalculator';
import { TNEACounsellingFlowSimulator } from '@/components/EduCutoff/TNEACounsellingFlowSimulator';
import { EngineeringCalculator } from '@/components/EduCutoff/EngineeringCalculator';

/**
 * TNEA 2026 Hub
 * One consolidated page surfacing every brochure-derived tool:
 *   - Brochure summary (eligibility, reservation, fees, counselling)
 *   - Cutoff calculator (M + P/2 + C/2)
 *   - Annexure-I community lookup (371 entries)
 *   - PwD eligibility checker (21 disabilities × branch matrix)
 *   - Fee + concession calculator
 *   - Counselling flow simulator (6 confirmation options)
 *   - Link to Sports Quota eligibility checker
 *
 * All content is sourced from the official TNEA 2026 Information Brochure
 * (https://www.tneaonline.org). Last verified: May 2026.
 */
const TNEA2026Hub = () => {
  const { language } = useLanguage();
  const [tab, setTab] = useState('overview');

  const isTa = language === 'ta';

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <NavigationBar />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Hero */}
        <div className="rounded-2xl mb-6 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          <div className="relative px-5 py-6 md:px-10 md:py-10 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-yellow-400 text-emerald-900 font-bold border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                {isTa ? 'அதிகாரப்பூர்வம்' : 'OFFICIAL 2026'}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Calendar className="w-3 h-3 mr-1" />
                {isTa ? 'புதிய பதிப்பு' : 'New Brochure'}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-4xl font-black mb-2">
              {isTa ? 'TNEA 2026 முழுமையான வழிகாட்டி' : 'TNEA 2026 — Complete Hub'}
            </h1>
            <p className="text-sm md:text-base text-emerald-50 mb-5 max-w-3xl">
              {isTa
                ? 'தமிழ்நாடு பொறியியல் சேர்க்கை 2026 — அதிகாரப்பூர்வ விவரக்குறிப்பு ஆவணத்தின் அனைத்து பயனுள்ள கருவிகளும் ஒரே இடத்தில். தகுதி, இடஒதுக்கீடு, கட்டணம், ஆலோசனை — அனைத்தும்.'
                : 'Every useful tool derived from the official TNEA 2026 Information Brochure — eligibility checks, the 371-entry community list, PwD branch matrix, fee + concession calculator, and a counselling flow simulator. All in one place.'}
            </p>

            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                size="sm"
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold"
              >
                <a
                  href="/tnea-2026-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  {isTa ? 'விவரக்குறிப்பு PDF' : 'Download Brochure'}
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="bg-transparent text-white border-white/40 hover:bg-white/10"
              >
                <a
                  href="https://www.tneaonline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  tneaonline.org
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="bg-transparent text-white border-white/40 hover:bg-white/10"
              >
                <Link to="/sports-quota-check">
                  <Trophy className="w-4 h-4 mr-1.5" />
                  {isTa ? 'விளையாட்டு ஒதுக்கீடு' : 'Sports Quota Check'}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
          <StatCard
            value="200"
            label={isTa ? 'அதிகபட்ச மதிப்பெண்' : 'Max Cutoff (M+P/2+C/2)'}
            color="emerald"
          />
          <StatCard
            value="371"
            label={isTa ? 'சமூகங்கள் (Annexure-I)' : 'Communities Listed'}
            color="blue"
          />
          <StatCard
            value="21"
            label={isTa ? 'PwD வகைகள்' : 'PwD Disability Types'}
            color="purple"
          />
          <StatCard
            value="7.5%"
            label={isTa ? 'அரசுப் பள்ளி ஒதுக்கீடு' : 'Govt-School Quota'}
            color="amber"
          />
        </div>

        {/* Feature cards quick nav */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          <FeatureChip
            icon={BookOpen}
            label={isTa ? 'மேலோட்டம்' : 'Overview'}
            active={tab === 'overview'}
            onClick={() => setTab('overview')}
            color="emerald"
          />
          <FeatureChip
            icon={Calculator}
            label={isTa ? 'கட்-ஆஃப் கணக்கீடு' : 'Cutoff'}
            active={tab === 'cutoff'}
            onClick={() => setTab('cutoff')}
            color="teal"
          />
          <FeatureChip
            icon={Users}
            label={isTa ? 'சமூகம் தேடல்' : 'Community'}
            active={tab === 'community'}
            onClick={() => setTab('community')}
            color="blue"
          />
          <FeatureChip
            icon={Accessibility}
            label="PwD"
            active={tab === 'pwd'}
            onClick={() => setTab('pwd')}
            color="rose"
          />
          <FeatureChip
            icon={Wallet}
            label={isTa ? 'கட்டணம்' : 'Fees'}
            active={tab === 'fees'}
            onClick={() => setTab('fees')}
            color="amber"
          />
          <FeatureChip
            icon={GitBranch}
            label={isTa ? 'ஆலோசனை' : 'Counselling'}
            active={tab === 'counselling'}
            onClick={() => setTab('counselling')}
            color="purple"
          />
        </div>

        {/* Tabbed content */}
        <Tabs value={tab} onValueChange={setTab}>
          {/* Hidden tab list — we drive tabs via the chip strip above */}
          <TabsList className="hidden">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cutoff">Cutoff</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="pwd">PwD</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="counselling">Counselling</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <SectionHeader
              icon={BookOpen}
              title={isTa ? 'அதிகாரப்பூர்வ விவரக்குறிப்பு சுருக்கம்' : 'Official Brochure Summary'}
              hint={isTa
                ? 'தகுதி • இடஒதுக்கீடு • சிறப்பு ஒதுக்கீடு • தேர்வு • கட்டணம் • ஆலோசனை'
                : 'Eligibility • Reservation • Special quotas • Selection • Fees • Counselling'}
            />
            <TNEA2026BrochureInfo />
          </TabsContent>

          <TabsContent value="cutoff" className="space-y-4">
            <SectionHeader
              icon={Calculator}
              title={isTa ? 'கட்-ஆஃப் மதிப்பெண் கணக்கீட்டாளர்' : 'Cutoff Mark Calculator'}
              hint={isTa
                ? 'கணிதம் + இயற்பியல்/2 + வேதியியல்/2 = அதிகபட்சம் 200'
                : 'Maths + Physics/2 + Chemistry/2 = max 200'}
            />
            <Card className="border-2 border-emerald-100">
              <CardContent className="p-4 md:p-6">
                <EngineeringCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <SectionHeader
              icon={Users}
              title={isTa ? 'அதிகாரப்பூர்வ சமூக பட்டியல்' : 'Official Community Lookup'}
              hint={isTa
                ? 'Annexure I — 371 சமூகங்கள் (BC / BCM / MBC / DNC / SC / SCA / ST)'
                : 'Annexure I — 371 communities (BC / BCM / MBC / DNC / SC / SCA / ST)'}
            />
            <TNEACommunityLookup />
          </TabsContent>

          <TabsContent value="pwd" className="space-y-4">
            <SectionHeader
              icon={Accessibility}
              title={isTa ? 'மாற்றுத்திறனாளி தகுதி சரிபார்ப்பு' : 'PwD Eligibility Checker'}
              hint={isTa
                ? '21 வகை குறைபாடுகள் × கிளை பொருத்தம் (5% இடஒதுக்கீடு)'
                : '21 disabilities × branch suitability matrix (5% reservation)'}
            />
            <TNEAPwDEligibilityChecker />
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            <SectionHeader
              icon={Wallet}
              title={isTa ? 'கட்டணம் + சலுகை கணக்கீடு' : 'Fee & Concession Calculator'}
              hint={isTa
                ? 'பதிவு கட்டணம் + அனைத்து சலுகைகள் (7.5% அரசுப் பள்ளி, முதல் பட்டதாரி, AICTE TFW, பின்-மெட்ரிக்)'
                : 'Registration fee + all concessions (7.5% Govt-School, First Graduate, AICTE TFW, Post-Matric)'}
            />
            <TNEAFeeCalculator />
          </TabsContent>

          <TabsContent value="counselling" className="space-y-4">
            <SectionHeader
              icon={GitBranch}
              title={isTa ? 'ஆலோசனை ஓட்ட சிமுலேட்டர்' : 'Counselling Flow Simulator'}
              hint={isTa
                ? '4 நிலைகள் × 6 உறுதிப்படுத்தல் விருப்பங்கள் (Accept&Join, Accept&Upward, Decline&Upward, …)'
                : '4 stages × 6 confirmation options (Accept&Join, Accept&Upward, Decline&Upward, …)'}
            />
            <TNEACounsellingFlowSimulator />
          </TabsContent>
        </Tabs>

        {/* Cross-links */}
        <Card className="mt-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-gray-800 text-sm">
                {isTa ? 'தொடர்புடைய கருவிகள்' : 'Related tools'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <CrossLink
                to="/tn-engineering-colleges"
                icon={Building2}
                title={isTa ? '468 கல்லூரிகள் அடைவு' : '468-College Directory'}
                desc={isTa
                  ? 'TNEA குறியீடு, கிளைகள், மாவட்டம் — அதிகாரப்பூர்வ பட்டியல்'
                  : 'TNEA codes, branches, district — official booklet data'}
              />
              <CrossLink
                to="/sports-quota-check"
                icon={Trophy}
                title={isTa ? 'விளையாட்டு ஒதுக்கீடு தகுதி' : 'Sports Quota Eligibility'}
                desc={isTa
                  ? '500 இடங்கள் — சர்வதேச / தேசிய / மாநில சாதனைகள்'
                  : '500 seats across International / National / State levels'}
              />
              <CrossLink
                to="/edu-cutoff"
                icon={FileText}
                title={isTa ? 'மருத்துவம் + கல்லூரி கணிப்பு' : 'Medical + College Predictor'}
                desc={isTa
                  ? 'NEET-UG தகுதி & உங்கள் மதிப்பெண்ணுக்கான கல்லூரி'
                  : 'NEET-UG eligibility and college predictor for your score'}
              />
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-500 text-center mt-6 max-w-3xl mx-auto leading-relaxed">
          {isTa
            ? 'அனைத்து தகவல்களும் TNEA 2026 அதிகாரப்பூர்வ விவரக்குறிப்பிலிருந்து (https://www.tneaonline.org) எடுக்கப்பட்டுள்ளன. சேர்க்கை தொடர்பான இறுதி முடிவுக்கு அதிகாரப்பூர்வ அறிவிப்புகளை மட்டுமே நம்புங்கள்.'
            : 'All information is derived from the official TNEA 2026 Information Brochure (https://www.tneaonline.org). For binding admission decisions, always refer to the official portals and notifications.'}
        </p>
      </main>

      <Footer />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────────────

const STAT_COLOR: Record<string, string> = {
  emerald: 'from-emerald-500 to-teal-600',
  blue: 'from-blue-500 to-indigo-600',
  purple: 'from-purple-500 to-fuchsia-600',
  amber: 'from-amber-500 to-orange-600',
};

const StatCard = ({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: keyof typeof STAT_COLOR;
}) => (
  <div className={`rounded-xl bg-gradient-to-br ${STAT_COLOR[color]} text-white p-3 shadow-md`}>
    <div className="text-2xl md:text-3xl font-black leading-none">{value}</div>
    <div className="text-[10px] md:text-xs font-medium opacity-90 mt-1 leading-tight">
      {label}
    </div>
  </div>
);

const CHIP_COLOR: Record<string, { active: string; idle: string }> = {
  emerald: {
    active: 'bg-emerald-600 text-white border-emerald-600 shadow',
    idle: 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50',
  },
  teal: {
    active: 'bg-teal-600 text-white border-teal-600 shadow',
    idle: 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50',
  },
  blue: {
    active: 'bg-blue-600 text-white border-blue-600 shadow',
    idle: 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50',
  },
  rose: {
    active: 'bg-rose-600 text-white border-rose-600 shadow',
    idle: 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50',
  },
  amber: {
    active: 'bg-amber-600 text-white border-amber-600 shadow',
    idle: 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50',
  },
  purple: {
    active: 'bg-purple-600 text-white border-purple-600 shadow',
    idle: 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50',
  },
};

const FeatureChip = ({
  icon: Icon,
  label,
  active,
  onClick,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
  color: keyof typeof CHIP_COLOR;
}) => {
  const cls = active ? CHIP_COLOR[color].active : CHIP_COLOR[color].idle;
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 font-bold text-xs md:text-sm transition-all ${cls}`}
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      <span className="truncate">{label}</span>
    </button>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
}) => (
  <div className="flex items-start gap-3 mb-2">
    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <h2 className="text-base md:text-lg font-bold text-gray-800 leading-tight">
        {title}
      </h2>
      {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
    </div>
  </div>
);

const CrossLink = ({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) => (
  <Link
    to={to}
    className="group bg-white rounded-xl p-3 border border-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all flex items-start gap-2.5"
  >
    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-bold text-sm text-gray-800 flex items-center gap-1">
        {title}
        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-[11px] text-gray-600 leading-relaxed mt-0.5">{desc}</p>
    </div>
  </Link>
);

export default TNEA2026Hub;
