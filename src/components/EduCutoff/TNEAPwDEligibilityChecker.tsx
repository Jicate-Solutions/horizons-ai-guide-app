import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Heart,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  FileText,
  Eye,
  Ear,
  PersonStanding,
  Brain,
  Droplet,
  Layers,
  Shield,
} from 'lucide-react';
import {
  PWD_DISABILITIES,
  BRANCH_SUITABILITY,
  RESTRICTED_BRANCH_NORMS,
  type PwDDisability,
  type Suitability,
} from '@/data/tneaPwDData';

/**
 * TNEA 2026 PwD (Persons with Benchmark Disabilities) Eligibility Checker.
 *
 * Lets a candidate select their disability and instantly see which engineering
 * branches they can pursue under the 5 % horizontal reservation, plus which
 * Medical Certificate (II – VI) they'll need.
 */
export const TNEAPwDEligibilityChecker = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<PwDDisability | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PWD_DISABILITIES;
    return PWD_DISABILITIES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.group.toLowerCase().includes(q)
    );
  }, [query]);

  const groupedByCategory = useMemo(() => {
    const map: Record<string, PwDDisability[]> = {};
    for (const d of filtered) {
      if (!map[d.group]) map[d.group] = [];
      map[d.group].push(d);
    }
    return map;
  }, [filtered]);

  const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Visual: Eye,
    Hearing: Ear,
    Locomotor: PersonStanding,
    'Neurological / Mental': Brain,
    'Blood Disorder': Droplet,
    Multiple: Layers,
  };

  const suitabilityChip = (s: Suitability) => {
    if (s === 'suitable')
      return (
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 text-[10px] flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Suitable
        </Badge>
      );
    if (s === 'excluded')
      return (
        <Badge className="bg-rose-600 text-white hover:bg-rose-600 text-[10px] flex items-center gap-1">
          <XCircle className="w-3 h-3" /> Excluded
        </Badge>
      );
    return (
      <Badge className="bg-amber-500 text-white hover:bg-amber-500 text-[10px] flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> Depends on Severity
      </Badge>
    );
  };

  return (
    <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50/30 via-white to-pink-50/20 overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-rose-700 via-pink-700 to-rose-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-900/30">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge className="bg-amber-400 text-rose-900 hover:bg-amber-400 text-[10px] font-bold border-0 mb-1.5">
              5 % PwD HORIZONTAL RESERVATION
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              PwD Eligibility &amp; Branch Suitability
            </h2>
            <p className="text-rose-100/90 text-sm">
              All 21 disabilities specified in the TNEA 2026 brochure — find your
              branch options instantly.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 md:p-6 space-y-4">
        {/* Quick info strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <InfoStat label="Disabilities" value="21" sub="Recognised" />
          <InfoStat label="Min Impairment" value="40%" sub="Permanent" />
          <InfoStat label="Reservation" value="5%" sub="Horizontal" />
          <InfoStat label="Cert Board" value="3 Doctors" sub="District Medical" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search disabilities (e.g. low vision, dyslexia, hemophilia)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 border-2 border-gray-200 focus:border-rose-500"
          />
        </div>

        {/* List of disabilities grouped */}
        <div className="space-y-3">
          {Object.entries(groupedByCategory).map(([group, items]) => {
            const Icon = groupIcons[group] || Heart;
            return (
              <div key={group} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-sm text-gray-700">{group}</span>
                  <span className="text-[10px] text-gray-400">({items.length})</span>
                </div>
                <ul className="divide-y divide-gray-50">
                  {items.map((d) => (
                    <li key={d.serial}>
                      <button
                        onClick={() => setSelected(d)}
                        className={`w-full text-left p-3 hover:bg-rose-50/50 transition-colors ${
                          selected?.serial === d.serial ? 'bg-rose-50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-800">
                              {d.name}
                            </div>
                            <div className="text-[11px] text-gray-500 truncate">
                              {d.description}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px] flex-shrink-0">
                            Cert {d.certificate}
                          </Badge>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500 text-sm">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No disabilities match your search.
            </div>
          )}
        </div>

        {/* Selected disability — branch suitability */}
        {selected && (
          <Card className="border-2 border-rose-300 bg-rose-50/40">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base">{selected.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{selected.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-rose-600 text-white text-[10px]">
                      Medical Certificate No. {selected.certificate}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {selected.group}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Branch suitability list */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Branch Suitability
                </div>
                {BRANCH_SUITABILITY.map((row) => {
                  const verdict = row.perDisability[selected.serial];
                  return (
                    <div
                      key={row.branchFamily}
                      className={`p-3 rounded-lg border-2 ${
                        verdict === 'suitable'
                          ? 'border-emerald-200 bg-emerald-50/50'
                          : verdict === 'excluded'
                          ? 'border-rose-200 bg-rose-50/50'
                          : 'border-amber-200 bg-amber-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-semibold text-sm text-gray-800">
                          {row.branchFamily}
                        </div>
                        {suitabilityChip(verdict)}
                      </div>
                      <div className="text-[11px] text-gray-600 leading-relaxed">
                        {row.rule}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {row.examples.slice(0, 4).map((ex) => (
                          <span
                            key={ex}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-600"
                          >
                            {ex}
                          </span>
                        ))}
                        {row.examples.length > 4 && (
                          <span className="text-[10px] text-gray-500">
                            +{row.examples.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected(null)}
                className="w-full"
              >
                Clear selection
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Restricted branch norms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="font-bold text-sm text-blue-900 flex items-center gap-1.5 mb-2">
              <Shield className="w-4 h-4" />
              {RESTRICTED_BRANCH_NORMS.marine.branch}
            </div>
            <ul className="space-y-1 text-[11px] text-blue-900/90">
              {RESTRICTED_BRANCH_NORMS.marine.norms.map((n, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-blue-500">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="font-bold text-sm text-amber-900 flex items-center gap-1.5 mb-2">
              <Shield className="w-4 h-4" />
              {RESTRICTED_BRANCH_NORMS.mining.branch}
            </div>
            <ul className="space-y-1 text-[11px] text-amber-900/90">
              {RESTRICTED_BRANCH_NORMS.mining.norms.map((n, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-amber-500">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Note about certification */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex gap-2 text-xs text-purple-900">
          <FileText className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
          <div>
            <strong>Medical Certificate requirement:</strong> Must be issued by a
            District Medical Board comprising minimum 3 doctors. Individual-doctor
            certificates are NOT accepted. The certificate must state the nature
            and percentage of disability and confirm suitability for engineering
            studies (per Sections 5.1 and 5.2 of TNEA 2026 brochure).
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2 text-[11px] text-yellow-900">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-600" />
          <div>
            Information based on the official TNEA 2026 Information Brochure
            (Sections 5.1 & 5.2). Branch suitability per Letter
            9768/DAP-3.1/2017-24 dated 10.05.2024 from the Welfare of Differently
            Abled Persons Department, Government of Tamil Nadu. Always verify
            current rules at tneaonline.org.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoStat = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="bg-white rounded-xl p-3 border border-gray-100 text-center shadow-sm">
    <div className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">
      {label}
    </div>
    <div className="text-xl md:text-2xl font-black text-rose-700 my-1">{value}</div>
    <div className="text-[10px] text-gray-400">{sub}</div>
  </div>
);

export default TNEAPwDEligibilityChecker;
