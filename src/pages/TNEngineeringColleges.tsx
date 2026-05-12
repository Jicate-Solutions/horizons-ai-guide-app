import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Building2,
  Search,
  MapPin,
  GraduationCap,
  ExternalLink,
  Mail,
  Filter,
  X,
  Users,
  Hash,
  Sparkles,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  School,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  TNEA_COLLEGES,
  TNEA_DISTRICTS,
  TNEA_BRANCH_CODES,
  BRANCH_NAMES,
  COLLEGE_TYPE_LABELS,
  TOTAL_COLLEGES,
  type TneaCollege,
  type TneaCollegeType,
} from '@/data/tneaCollegesList';

const TYPE_TONES: Record<string, { chip: string; bg: string; ring: string }> = {
  emerald: {
    chip: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bg: 'from-emerald-50 to-white',
    ring: 'border-emerald-300',
  },
  blue: {
    chip: 'bg-blue-100 text-blue-700 border-blue-200',
    bg: 'from-blue-50 to-white',
    ring: 'border-blue-300',
  },
  teal: {
    chip: 'bg-teal-100 text-teal-700 border-teal-200',
    bg: 'from-teal-50 to-white',
    ring: 'border-teal-300',
  },
  amber: {
    chip: 'bg-amber-100 text-amber-700 border-amber-200',
    bg: 'from-amber-50 to-white',
    ring: 'border-amber-300',
  },
  purple: {
    chip: 'bg-purple-100 text-purple-700 border-purple-200',
    bg: 'from-purple-50 to-white',
    ring: 'border-purple-300',
  },
  rose: {
    chip: 'bg-rose-100 text-rose-700 border-rose-200',
    bg: 'from-rose-50 to-white',
    ring: 'border-rose-300',
  },
};

const PAGE_SIZE = 24;

const TNEngineeringColleges = () => {
  const { language } = useLanguage();
  const isTa = language === 'ta';

  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  const [type, setType] = useState<TneaCollegeType | ''>('');
  const [selected, setSelected] = useState<TneaCollege | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list: TneaCollege[] = TNEA_COLLEGES;
    const term = query.trim().toLowerCase();

    if (term) {
      if (/^\d{1,4}$/.test(term)) {
        list = list.filter((c) => c.code.includes(term));
      } else {
        list = list.filter(
          (c) =>
            c.name.toLowerCase().includes(term) ||
            c.address.toLowerCase().includes(term) ||
            (c.district?.toLowerCase().includes(term) ?? false),
        );
      }
    }
    if (district) list = list.filter((c) => c.district === district);
    if (branch) list = list.filter((c) => c.branches.some((b) => b.code === branch));
    if (type) list = list.filter((c) => c.type === type);
    return list;
  }, [query, district, branch, type]);

  // Reset to page 1 whenever a filter changes
  useMemo(() => setPage(1), [query, district, branch, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasFilter = !!(query || district || branch || type);

  const clearAll = () => {
    setQuery('');
    setDistrict('');
    setBranch('');
    setType('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <NavigationBar />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Hero */}
        <div className="rounded-2xl mb-5 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-700 to-emerald-700" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative px-5 py-5 md:px-9 md:py-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-yellow-400 text-emerald-900 font-bold border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                {TOTAL_COLLEGES} {isTa ? 'கல்லூரிகள்' : 'COLLEGES'}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Hash className="w-3 h-3 mr-1" />
                TNEA Codes
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-black mb-1.5">
              {isTa
                ? 'தமிழ்நாடு பொறியியல் கல்லூரிகள் — அதிகாரப்பூர்வ பட்டியல்'
                : 'Tamil Nadu Engineering Colleges — Official Directory'}
            </h1>
            <p className="text-sm text-emerald-50 max-w-3xl">
              {isTa
                ? 'அண்ணா பல்கலைக்கழகத்தின் கீழ் உள்ள அனைத்து 468 பொறியியல் கல்லூரிகள் — TNEA குறியீடு, கிளைகள், மாவட்டம் வாரியாக தேடுங்கள்.'
                : 'All 468 engineering colleges affiliated to Anna University. Search by name, TNEA code, district, or branch.'}
            </p>
          </div>
        </div>

        {/* Data freshness banner */}
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 flex items-start gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
          <p className="leading-relaxed">
            <strong className="font-bold">
              {isTa ? 'தரவு ஆதாரம்:' : 'Data source:'}
            </strong>{' '}
            {isTa
              ? 'TNEA "Information About the Colleges" அதிகாரப்பூர்வ விவரக்குறிப்பு. கல்லூரிக் குறியீடு, பெயர், கிளைகள் — பெரும்பாலும் நிலையானவை. கட்டணம், ஹாஸ்டல் கட்டணம், NBA தற்போதைய நிலை ஆகியவற்றை கல்லூரியின் அதிகாரப்பூர்வ வலைத்தளத்தில் சரிபார்க்கவும்.'
              : 'Official TNEA "Information About the Colleges" booklet. College codes, names, addresses, and branch lists are generally stable. Always verify current tuition fees, hostel charges, and NBA accreditation status from the college\'s official website.'}
          </p>
        </div>

        {/* Search + filters */}
        <Card className="mb-4 border-2 border-emerald-100">
          <CardContent className="p-3 md:p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isTa
                    ? 'கல்லூரி பெயர் அல்லது TNEA குறியீடு (எ.கா. PSG, 2006)'
                    : 'College name or TNEA code (e.g. PSG, 2006)'
                }
                className="pl-9 h-11 text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Select
                label={isTa ? 'மாவட்டம்' : 'District'}
                value={district}
                onChange={setDistrict}
                options={[
                  { value: '', label: isTa ? 'அனைத்து' : 'All districts' },
                  ...TNEA_DISTRICTS.map((d) => ({ value: d, label: d })),
                ]}
              />
              <Select
                label={isTa ? 'கிளை' : 'Branch'}
                value={branch}
                onChange={setBranch}
                options={[
                  { value: '', label: isTa ? 'அனைத்து' : 'All branches' },
                  ...TNEA_BRANCH_CODES.map((b) => ({
                    value: b,
                    label: `${b} · ${BRANCH_NAMES[b] ?? b}`,
                  })),
                ]}
              />
              <Select
                label={isTa ? 'வகை' : 'Type'}
                value={type}
                onChange={(v) => setType(v as TneaCollegeType | '')}
                options={[
                  { value: '', label: isTa ? 'அனைத்து' : 'All types' },
                  ...Object.entries(COLLEGE_TYPE_LABELS).map(([k, v]) => ({
                    value: k,
                    label: isTa ? v.tamil : v.label,
                  })),
                ]}
              />
            </div>

            {hasFilter && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <Badge variant="outline" className="bg-emerald-50">
                  <Filter className="w-3 h-3 mr-1" />
                  {filtered.length} {isTa ? 'பொருந்தும்' : 'matches'}
                </Badge>
                <button
                  onClick={clearAll}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-medium underline"
                >
                  {isTa ? 'அழி' : 'Clear all filters'}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results grid */}
        {filtered.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="py-12 text-center">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-3">
                {isTa
                  ? 'பொருந்தக்கூடிய கல்லூரிகள் இல்லை'
                  : 'No colleges match these filters'}
              </p>
              <Button variant="outline" size="sm" onClick={clearAll}>
                {isTa ? 'வடிகட்டலை அழி' : 'Clear filters'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {paged.map((c) => (
                <CollegeCard key={c.code} c={c} onOpen={() => setSelected(c)} isTa={isTa} />
              ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> {isTa ? 'முந்தைய' : 'Prev'}
                </Button>
                <span className="text-xs text-gray-600 px-3 font-medium">
                  {isTa ? 'பக்கம்' : 'Page'} {page} / {pageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                >
                  {isTa ? 'அடுத்தது' : 'Next'} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Cross-link footer */}
        <Card className="mt-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <School className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-sm text-gray-800">
                    {isTa ? 'TNEA 2026 ஹப்' : 'TNEA 2026 Hub'}
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  {isTa
                    ? 'தகுதி, இடஒதுக்கீடு, கட்டணம், ஆலோசனை — அதிகாரப்பூர்வ TNEA 2026 விவரக்குறிப்பின் முழுமையான கருவிகள்.'
                    : 'Eligibility checks, reservation, fee calculator, counselling simulator — the full TNEA 2026 brochure toolkit.'}
                </p>
              </div>
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/tnea-2026">
                  {isTa ? 'திற' : 'Open Hub'} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Detail modal */}
      {selected && (
        <CollegeDetailModal
          c={selected}
          onClose={() => setSelected(null)}
          isTa={isTa}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────────────

const Select = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <label className="block">
    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
      {label}
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

const CollegeCard = ({
  c,
  onOpen,
  isTa,
}: {
  c: TneaCollege;
  onOpen: () => void;
  isTa: boolean;
}) => {
  const meta = COLLEGE_TYPE_LABELS[c.type];
  const tone = TYPE_TONES[meta.tone];
  return (
    <button
      onClick={onOpen}
      className={`text-left bg-gradient-to-br ${tone.bg} border border-gray-100 hover:${tone.ring} rounded-xl p-3.5 hover:shadow-md transition-all group`}
    >
      <div className="flex items-start gap-2 mb-2">
        <Badge variant="outline" className="font-mono font-bold bg-white text-gray-700">
          {c.code}
        </Badge>
        <Badge className={`${tone.chip} border text-[10px] font-bold uppercase`}>
          {isTa ? meta.tamil : meta.label}
        </Badge>
        {c.autonomous && (
          <Badge variant="outline" className="text-[10px] bg-white text-amber-700 border-amber-200">
            ★ {isTa ? 'தன்னாட்சி' : 'Autonomous'}
          </Badge>
        )}
      </div>

      <h3 className="font-bold text-sm text-gray-800 leading-snug mb-1.5 line-clamp-2 group-hover:text-emerald-700">
        {c.name}
      </h3>

      <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-2">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">
          {c.district || (isTa ? 'மாவட்டம் கிடைக்கவில்லை' : 'District unknown')}
          {c.pincode && ` · ${c.pincode}`}
        </span>
      </div>

      {c.branches.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-gray-500 font-medium">
            <GraduationCap className="w-3 h-3 inline mr-0.5" />
            {c.branches.length} {isTa ? 'கிளைகள்' : 'branches'}:
          </span>
          {c.branches.slice(0, 4).map((b) => (
            <span
              key={b.code}
              className="text-[10px] font-mono bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-700"
            >
              {b.code}
            </span>
          ))}
          {c.branches.length > 4 && (
            <span className="text-[10px] text-gray-400">
              +{c.branches.length - 4}
            </span>
          )}
        </div>
      )}
    </button>
  );
};

const CollegeDetailModal = ({
  c,
  onClose,
  isTa,
}: {
  c: TneaCollege;
  onClose: () => void;
  isTa: boolean;
}) => {
  const meta = COLLEGE_TYPE_LABELS[c.type];
  const tone = TYPE_TONES[meta.tone];
  const websiteUrl = c.website
    ? c.website.startsWith('http')
      ? c.website
      : `https://${c.website}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${tone.bg} p-4 md:p-5 sticky top-0 border-b border-gray-100`}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-mono font-bold bg-white">
                {c.code}
              </Badge>
              <Badge className={`${tone.chip} border font-bold text-[10px] uppercase`}>
                {isTa ? meta.tamil : meta.label}
              </Badge>
              {c.autonomous && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] font-bold">
                  ★ {isTa ? 'தன்னாட்சி' : 'Autonomous'}
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-800 flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="font-black text-base md:text-lg text-gray-800 leading-tight">
            {c.name}
          </h2>
        </div>

        {/* Body */}
        <div className="p-4 md:p-5 space-y-4">
          {/* Location */}
          <Section title={isTa ? 'இடம்' : 'Location'} icon={MapPin}>
            <p className="text-sm text-gray-700 leading-relaxed">{c.address}</p>
            <div className="flex flex-wrap gap-1.5 mt-2 text-xs">
              {c.district && (
                <Badge variant="outline" className="bg-white">
                  📍 {c.district}
                </Badge>
              )}
              {c.taluk && (
                <Badge variant="outline" className="bg-white">
                  {isTa ? 'வட்டம்:' : 'Taluk:'} {c.taluk}
                </Badge>
              )}
              {c.pincode && (
                <Badge variant="outline" className="bg-white font-mono">
                  PIN {c.pincode}
                </Badge>
              )}
            </div>
          </Section>

          {/* Contact */}
          {(websiteUrl || c.email) && (
            <Section title={isTa ? 'தொடர்பு' : 'Contact'} icon={ExternalLink}>
              <div className="space-y-1.5">
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900 hover:underline break-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    {c.website}
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900 hover:underline break-all"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    {c.email}
                  </a>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-2 italic">
                {isTa
                  ? 'தொடர்பு விவரங்கள் காலாவதியாகியிருக்கலாம் — அதிகாரப்பூர்வ வலைத்தளத்தில் சரிபார்க்கவும்.'
                  : 'Contact details may be outdated — verify on the official website.'}
              </p>
            </Section>
          )}

          {/* Branches */}
          {c.branches.length > 0 && (
            <Section
              title={`${isTa ? 'வழங்கப்படும் கிளைகள்' : 'Branches offered'} (${c.branches.length})`}
              icon={GraduationCap}
            >
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b">
                      <th className="px-1 py-1.5 w-10">{isTa ? 'குறியீடு' : 'Code'}</th>
                      <th className="px-1 py-1.5">{isTa ? 'கிளை பெயர்' : 'Branch'}</th>
                      <th className="px-1 py-1.5 text-right w-16">
                        {isTa ? 'இடங்கள்' : 'Intake'}
                      </th>
                      <th className="px-1 py-1.5 text-right w-14">
                        {isTa ? 'தொடக்கம்' : 'Since'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...c.branches]
                      .sort((a, b) => b.intake - a.intake)
                      .map((b) => (
                        <tr key={b.code} className="border-b border-gray-100 last:border-0">
                          <td className="px-1 py-1.5">
                            <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {b.code}
                            </span>
                          </td>
                          <td className="px-1 py-1.5 text-xs text-gray-700 leading-tight">
                            {BRANCH_NAMES[b.code] ?? b.code}
                          </td>
                          <td className="px-1 py-1.5 text-right text-xs font-bold text-gray-800">
                            {b.intake}
                          </td>
                          <td className="px-1 py-1.5 text-right text-xs text-gray-500">
                            {b.startYear}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 italic">
                {isTa
                  ? 'குறிப்பு: புதிய கிளைகள் சேர்க்கப்பட்டிருக்கலாம் அல்லது சில கிளைகள் நிறுத்தப்பட்டிருக்கலாம்.'
                  : 'Note: New branches may have been added or some discontinued since 2021.'}
              </p>
            </Section>
          )}

          {/* Total intake */}
          {c.branches.length > 0 && (
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
                {isTa ? 'மொத்த இடங்கள் (2021)' : 'Total Intake (2021)'}
              </div>
              <div className="text-2xl font-black text-emerald-900">
                {c.branches.reduce((sum, b) => sum + b.intake, 0)}
                <span className="text-xs font-medium text-emerald-700 ml-1">
                  {isTa ? 'மாணவர்கள் / ஆண்டு' : 'seats / year'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 md:px-5 pb-4 md:pb-5 pt-2 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[10px] text-gray-500 leading-tight">
              {isTa ? 'TNEA குறியீடு' : 'TNEA Code'}:{' '}
              <span className="font-mono font-bold text-gray-700">{c.code}</span>
            </div>
            <Button size="sm" variant="outline" onClick={onClose}>
              {isTa ? 'மூடு' : 'Close'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2 text-xs font-bold uppercase tracking-wider text-gray-600">
      <Icon className="w-3.5 h-3.5 text-emerald-600" />
      {title}
    </div>
    {children}
  </div>
);

export default TNEngineeringColleges;
