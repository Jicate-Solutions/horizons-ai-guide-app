import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Users,
  MapPin,
  Info,
  X,
  AlertCircle,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  TNEA_COMMUNITIES,
  CATEGORY_META,
  CATEGORY_COUNTS,
  TOTAL_COMMUNITIES,
  searchCommunities,
  type TneaCommunity,
  type TneaCategory,
} from '@/data/tneaCommunityList';

// Static category color class map — Tailwind JIT can't read template
// strings, so we enumerate every concrete class we need.
const CATEGORY_COLOR_CLASSES: Record<string, { label: string; badge: string }> = {
  purple:  { label: 'text-purple-600',  badge: 'border-purple-300 text-purple-700 bg-purple-50' },
  orange:  { label: 'text-orange-600',  badge: 'border-orange-300 text-orange-700 bg-orange-50' },
  rose:    { label: 'text-rose-600',    badge: 'border-rose-300 text-rose-700 bg-rose-50' },
  amber:   { label: 'text-amber-600',   badge: 'border-amber-300 text-amber-700 bg-amber-50' },
  emerald: { label: 'text-emerald-600', badge: 'border-emerald-300 text-emerald-700 bg-emerald-50' },
  teal:    { label: 'text-teal-600',    badge: 'border-teal-300 text-teal-700 bg-teal-50' },
};

/**
 * TNEA 2026 Community Lookup
 * Lets 12th students find their community in the official list and confirm
 * their reservation category, district restrictions, and any special notes.
 *
 * Data source: Annexure I of the TNEA 2026 Information Brochure (371 entries
 * across 7 categories).
 */
export const TNEACommunityLookup = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TneaCategory | 'ALL'>('ALL');
  const [selectedCommunity, setSelectedCommunity] = useState<TneaCommunity | null>(null);

  const results = useMemo<TneaCommunity[]>(() => {
    let list = query.trim() ? searchCommunities(query) : TNEA_COMMUNITIES;
    if (activeCategory !== 'ALL') {
      list = list.filter((c) => c.category === activeCategory);
    }
    return list.slice(0, 50); // cap render for perf
  }, [query, activeCategory]);

  const allCategories: (TneaCategory | 'ALL')[] = ['ALL', 'BC', 'BCM', 'MBC', 'DNC', 'SC', 'SCA', 'ST'];

  return (
    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/30 overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-900/30">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge className="bg-amber-400 text-emerald-900 hover:bg-amber-400 text-[10px] font-bold border-0 mb-1.5">
              ANNEXURE I — OFFICIAL LIST
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              TNEA 2026 Community Lookup
            </h2>
            <p className="text-emerald-100/90 text-sm font-tamil">
              உங்கள் சாதியை சரிபார்த்து இடஒதுக்கீடு வகுப்பை அறிய — {TOTAL_COMMUNITIES} சமூகங்கள்
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 md:p-6 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by community name (e.g. Vanniyar, Nadar, Yadhava, Adi Dravida)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 h-11 border-2 border-gray-200 focus:border-emerald-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const meta = cat === 'ALL' ? null : CATEGORY_META[cat as TneaCategory];
            const count = cat === 'ALL' ? TOTAL_COMMUNITIES : CATEGORY_COUNTS[cat as TneaCategory];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                <span>{cat === 'ALL' ? 'All' : cat}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/20' : 'bg-gray-100'
                  }`}
                >
                  {count}
                </span>
                {meta && <span className="hidden md:inline text-[10px] opacity-75">{meta.reservation}%</span>}
              </button>
            );
          })}
        </div>

        {/* Quick stats by category */}
        {!query && activeCategory === 'ALL' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {(Object.keys(CATEGORY_META) as TneaCategory[]).map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-left bg-white border border-gray-100 rounded-lg p-2.5 hover:border-emerald-300 hover:shadow-sm transition-all"
                >
                  <div className={`${CATEGORY_COLOR_CLASSES[meta.color]?.label ?? 'text-gray-600'} text-[10px] font-bold uppercase tracking-wider`}>
                    {cat}
                  </div>
                  <div className="text-lg font-black text-gray-800 leading-none my-1">
                    {meta.reservation}%
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {CATEGORY_COUNTS[cat]} entries
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Results */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-600 flex items-center justify-between">
            <span>
              <strong className="text-gray-800">{results.length}</strong>{' '}
              {results.length === 1 ? 'community' : 'communities'} found
              {query && ` for "${query}"`}
              {activeCategory !== 'ALL' && ` in ${activeCategory}`}
            </span>
            {(query || activeCategory !== 'ALL') && (
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('ALL');
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <div>No communities match your search.</div>
                <div className="text-xs mt-1">
                  Try a different spelling — many communities have alternate names listed in the brochure.
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {results.map((c) => {
                  const meta = CATEGORY_META[c.category];
                  return (
                    <li key={c.serial}>
                      <button
                        onClick={() => setSelectedCommunity(c)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-emerald-50/50 transition-colors text-left"
                      >
                        <div className="text-[10px] font-mono text-gray-400 w-8 flex-shrink-0">
                          #{c.serial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800 truncate">
                            {c.name}
                          </div>
                          {(c.districts || c.note) && (
                            <div className="text-[11px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                              {c.districts && (
                                <>
                                  <MapPin className="w-3 h-3 inline" />
                                  {c.districts.slice(0, 2).join(', ')}
                                  {c.districts.length > 2 && ` +${c.districts.length - 2}`}
                                </>
                              )}
                              {!c.districts && c.note && (
                                <>
                                  <Info className="w-3 h-3 inline" />
                                  {c.note.slice(0, 60)}{c.note.length > 60 && '…'}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`flex-shrink-0 ${CATEGORY_COLOR_CLASSES[meta.color]?.badge ?? 'border-gray-200 text-gray-700 bg-gray-50'} text-[10px] font-bold`}
                        >
                          {c.category}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {results.length === 50 && (
            <div className="px-3 py-2 bg-amber-50 border-t border-amber-100 text-[11px] text-amber-800 text-center">
              Showing first 50 matches. Refine your search for more specific results.
            </div>
          )}
        </div>

        {/* Selected community detail card */}
        {selectedCommunity && (
          <Card className="border-2 border-emerald-300 bg-emerald-50/40">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-gray-500">
                      Serial #{selectedCommunity.serial}
                    </span>
                    <Badge className="bg-emerald-600 text-white text-[10px]">
                      {selectedCommunity.category}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-gray-800 text-base mb-1">
                    {selectedCommunity.name}
                  </h3>
                  <div className="text-sm text-gray-700">
                    <strong>{CATEGORY_META[selectedCommunity.category].full}</strong>
                    {' — '}
                    {CATEGORY_META[selectedCommunity.category].reservation}% reservation
                  </div>
                  {selectedCommunity.districts && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-900">
                      <MapPin className="inline w-3 h-3 mr-1" />
                      <strong>District-restricted:</strong> Valid only in{' '}
                      {selectedCommunity.districts.join(', ')}. Certificate must be
                      obtained from the respective district authority.
                    </div>
                  )}
                  {selectedCommunity.note && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded text-xs text-amber-900">
                      <Info className="inline w-3 h-3 mr-1" />
                      <strong>Note:</strong> {selectedCommunity.note}
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedCommunity(null)}
                      className="text-xs h-7"
                    >
                      <X className="w-3 h-3 mr-1" /> Close
                    </Button>
                    <a
                      href="https://www.tneaonline.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs h-7 px-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <FileText className="w-3 h-3 mr-1" /> Apply on TNEA Portal
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Issuing authority guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <FileText className="w-4 h-4" />
            Where to get your Community Certificate
          </div>
          <div className="space-y-1.5 text-blue-900/90">
            <div>
              <strong>Scheduled Tribe:</strong> Revenue Divisional Officer / Sub-Collector of native place (P.A. General for Chennai).
            </div>
            <div>
              <strong>Scheduled Caste / SCA:</strong> Tahsildar of the candidate's native taluk.
            </div>
            <div>
              <strong>BC / BCM / MBC / DNC:</strong> Headquarters Deputy Tahsildar / Zonal Deputy Tahsildar / Deputy Tahsildar (Certificates).
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2 text-[11px] text-yellow-900">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-600" />
          <div>
            This list is reproduced from Annexure I of the official TNEA 2026 Information
            Brochure. Certain communities have exceptions for specific districts or
            sub-groups. Always cross-verify with{' '}
            <a
              href="https://www.tneaonline.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              tneaonline.org
            </a>{' '}
            before applying.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TNEACommunityLookup;
