import { useState, useMemo } from 'react';
import { Trophy, ChevronDown, ExternalLink, Search, X, Shield, MapPin, Hash, Filter, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tneaSportsQuotaColleges, getTotalColleges, getDistrictCount, getGovtCount, TNEASportsCollege } from './sportsQuotaData';

const GOLD = '#c9a84c';

const typeColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Govt': { bg: 'bg-emerald-900/60', text: 'text-emerald-300', border: 'border-emerald-600', dot: 'bg-emerald-400' },
  'Govt-Aided': { bg: 'bg-sky-900/60', text: 'text-sky-300', border: 'border-sky-600', dot: 'bg-sky-400' },
  'Central Govt': { bg: 'bg-emerald-900/60', text: 'text-emerald-300', border: 'border-emerald-600', dot: 'bg-emerald-400' },
  'Govt Deemed': { bg: 'bg-sky-900/60', text: 'text-sky-300', border: 'border-sky-600', dot: 'bg-sky-400' },
  'Private': { bg: 'bg-orange-900/40', text: 'text-orange-300', border: 'border-orange-700', dot: 'bg-orange-400' },
};
const getTC = (t: string) => typeColors[t] || typeColors['Private'];

interface FlatCollege extends TNEASportsCollege {
  district: string;
  districtTamil: string;
}

const allColleges: FlatCollege[] = tneaSportsQuotaColleges.flatMap(d =>
  d.colleges.map(c => ({ ...c, district: d.district, districtTamil: d.districtTamil }))
);

const allDistricts = tneaSportsQuotaColleges.map(d => d.district).sort();
const allTypes = ['All', 'Govt', 'Govt-Aided', 'Central Govt', 'Govt Deemed', 'Private'];

const fields = [
  { id: 'engineering', label: 'Engineering', icon: '⚙️', count: getTotalColleges(), active: true },
  { id: 'arts', label: 'Arts & Science', icon: '🏛️', count: 0, active: false },
  { id: 'medical', label: 'Medical', icon: '⚕️', count: 0, active: false },
  { id: 'dental', label: 'Dental', icon: '🦷', count: 0, active: false },
  { id: 'nursing', label: 'Nursing', icon: '👩‍⚕️', count: 0, active: false },
  { id: 'pharmacy', label: 'Pharmacy', icon: '💊', count: 0, active: false },
  { id: 'allied', label: 'Allied Health', icon: '🏥', count: 0, active: false },
  { id: 'law', label: 'Law', icon: '⚖️', count: 0, active: false },
  { id: 'education', label: 'B.Ed', icon: '📚', count: 0, active: false },
  { id: 'agriculture', label: 'Agriculture', icon: '🌾', count: 0, active: false },
  { id: 'physical_ed', label: 'Physical Ed', icon: '🏋️', count: 0, active: false },
  { id: 'polytechnic', label: 'Polytechnic', icon: '🔬', count: 0, active: false },
];

export const SportsQuotaGuide = () => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedField, setSelectedField] = useState<string>('engineering');
  const [verifyCollege, setVerifyCollege] = useState<FlatCollege | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const filtered = useMemo(() => {
    let result = allColleges;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.district.toLowerCase().includes(q)
      );
    }
    if (selectedDistrict !== 'All') {
      result = result.filter(c => c.district === selectedDistrict);
    }
    if (selectedType !== 'All') {
      result = result.filter(c => c.type === selectedType);
    }
    return result;
  }, [search, selectedDistrict, selectedType]);

  const grouped = useMemo(() => {
    const map: Record<string, FlatCollege[]> = {};
    filtered.forEach(c => { if (!map[c.district]) map[c.district] = []; map[c.district].push(c); });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const govtCount = filtered.filter(c => c.type !== 'Private').length;

  return (
    <>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0f14' }}>

        {/* HEADER */}
        <div className="relative overflow-hidden p-5 pb-4" style={{ background: 'linear-gradient(135deg, #1a1a24 0%, #0f0f14 50%, #1a1510 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #c9a84c 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #a68a3a)' }}>
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">Sports Quota Directory</h2>
                <p className="text-xs" style={{ color: GOLD }}>விளையாட்டு ஒதுக்கீட்டு கல்லூரிகள்</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'rgba(201,168,76,0.15)', color: GOLD }}>{getTotalColleges()} Engineering Colleges</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-900/50 text-emerald-300">{getGovtCount()} Govt/Aided</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/5 text-gray-400">{getDistrictCount()} Districts</span>
            </div>
          </div>
        </div>

        {/* INFO */}
        <button onClick={() => setShowInfo(!showInfo)} className="w-full flex items-center justify-between px-4 py-2.5 text-left" style={{ background: '#16161e', borderBottom: '1px solid #2a2a35' }}>
          <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: GOLD }}><Info className="w-3.5 h-3.5" /> How Sports Quota Works</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", showInfo && "rotate-180")} style={{ color: GOLD }} />
        </button>
        {showInfo && (
          <div className="px-4 py-3" style={{ background: '#111118', borderBottom: '1px solid #2a2a35' }}>
            <div className="rounded-xl p-3 space-y-1 text-xs text-gray-400" style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
              <p>• <span className="text-emerald-400 font-bold">5% seats</span> reserved in all TNEA colleges for sports achievers</p>
              <p>• Certificate must be from <span className="text-amber-400 font-bold">last 2 years</span></p>
              <p>• Minimum: <span className="text-white font-bold">District level</span> representation</p>
              <p>• Priority: International → National → State → District</p>
              <p>• Separate sports counselling after general TNEA rounds</p>
            </div>
          </div>
        )}

        {/* FIELD FILTER */}
        <div className="px-3 py-2.5 overflow-x-auto" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
          <style>{`.overflow-x-auto::-webkit-scrollbar{display:none} .overflow-x-auto{-ms-overflow-style:none;scrollbar-width:none}`}</style>
          <div className="flex gap-1.5 min-w-max">
            {fields.map(f => {
              const isActive = selectedField === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => f.active && setSelectedField(f.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
                    isActive ? "text-black" : f.active ? "text-gray-400 hover:text-white" : "text-gray-600 opacity-40 cursor-not-allowed"
                  )}
                  style={isActive ? { background: GOLD } : { background: '#1a1a24', border: '1px solid #2a2a35' }}
                  disabled={!f.active}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                    isActive ? "bg-black/20 text-black" : f.active ? "bg-white/10 text-gray-500" : "bg-white/5 text-gray-700"
                  )}>{f.active ? f.count : 'Soon'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SEARCH */}
        <div className="p-3" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search college name, TNEA code, or district..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
              style={{ background: '#1a1a24', border: '1px solid #2a2a35' }} />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-500 hover:text-white" /></button>}
          </div>
        </div>

        {/* DISTRICT + TYPE */}
        <div className="px-3 py-2.5 flex gap-2" style={{ background: '#0f0f14', borderBottom: '1px solid #1f1f2a' }}>
          <div className="relative flex-1">
            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-lg text-xs font-bold text-white appearance-none cursor-pointer outline-none"
              style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
              <option value="All">All Districts</option>
              {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="relative flex-1">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-lg text-xs font-bold text-white appearance-none cursor-pointer outline-none"
              style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
              {allTypes.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
            </select>
          </div>
        </div>

        {/* RESULTS */}
        {selectedField !== 'engineering' ? (
          <div className="p-10 text-center" style={{ background: '#0f0f14' }}>
            <p className="text-3xl mb-3">{fields.find(f => f.id === selectedField)?.icon || '📋'}</p>
            <p className="text-sm font-bold text-white">{fields.find(f => f.id === selectedField)?.label} — Sports Quota</p>
            <p className="text-xs text-gray-400 mt-2">Verified sports quota college list for this field is coming soon.</p>
            <p className="text-xs text-gray-500 mt-1">We only show colleges with <span className="text-emerald-400">confirmed</span> sports quota admission.</p>
            <button onClick={() => setSelectedField('engineering')}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-bold text-black" style={{ background: GOLD }}>
              View Engineering (436 colleges)
            </button>
          </div>
        ) : (
          <>
            {(selectedDistrict !== 'All' || search.trim()) && filtered.length > 0 && (
              <div className="px-4 py-2 flex items-center justify-between" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
                <span className="text-xs text-gray-500">{filtered.length} Engineering colleges</span>
                <span className="text-xs text-emerald-400 font-bold">{govtCount} Govt/Aided</span>
              </div>
            )}

            <div className="max-h-[calc(100vh-380px)] overflow-y-auto" style={{ background: '#0f0f14' }}>
              {selectedDistrict === 'All' && !search.trim() ? (
                <div className="p-10 text-center">
                  <p className="text-3xl mb-3">📍</p>
                  <p className="text-sm font-bold text-white">Select a District</p>
                  <p className="text-xs text-gray-500 mt-1">Choose a district to see sports quota colleges</p>
                  <p className="text-xs mt-3" style={{ color: GOLD }}>{getTotalColleges()} colleges across {getDistrictCount()} districts</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-sm text-gray-500">No colleges found</p>
                </div>
              ) : (
                grouped.map(([district, colleges]) => (
                  <div key={district}>
                    <div className="sticky top-0 z-10 px-4 py-2 flex items-center justify-between" style={{ background: '#16161e', borderBottom: '1px solid #2a2a35' }}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} />
                        <span className="text-xs font-black text-white">{district}</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(201,168,76,0.15)', color: GOLD }}>{colleges.length}</span>
                    </div>
                    {colleges.map(college => {
                      const tc = getTC(college.type);
                      return (
                        <div key={college.code} className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid #1a1a24' }}>
                          <div className="w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0" style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
                            <Hash className="w-3 h-3 text-gray-600 -mb-0.5" />
                            <span className="text-xs font-black" style={{ color: GOLD }}>{college.code}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white leading-tight truncate">{college.name}</p>
                            <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border mt-1 inline-flex items-center", tc.bg, tc.text, tc.border)}>
                              <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1", tc.dot)} />{tc.text.includes('emerald') ? (college.type === 'Govt' ? 'Government' : 'Central Govt') : college.type === 'Govt-Aided' || college.type === 'Govt Deemed' ? college.type : 'Private'}
                            </span>
                          </div>
                          <button onClick={() => setVerifyCollege(college)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold flex-shrink-0 transition-all active:scale-95"
                            style={{ background: 'rgba(201,168,76,0.15)', color: GOLD, border: '1px solid rgba(201,168,76,0.3)' }}>
                            <Shield className="w-3 h-3" /> Verify
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <div className="px-4 py-3 text-center" style={{ background: '#111118', borderTop: '1px solid #2a2a35' }}>
          <p className="text-xs text-gray-600">Only verified sports quota colleges shown · Source: Official TNEA Portal</p>
        </div>
      </div>

      {/* VERIFY MODAL */}
      {verifyCollege && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={() => setVerifyCollege(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden"
            style={{ background: '#16161e', border: '1px solid #2a2a35' }} onClick={e => e.stopPropagation()}>
            <div className="p-5 text-center" style={{ borderBottom: '1px solid #2a2a35' }}>
              <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #a68a3a)' }}>
                <Shield className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-base font-black text-white">Verify College</h3>
              <p className="text-sm font-bold mt-1" style={{ color: GOLD }}>{verifyCollege.name}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md mt-2 inline-block" style={{ background: 'rgba(201,168,76,0.2)', color: GOLD }}>TNEA Code: {verifyCollege.code}</span>
            </div>
            <div className="mx-4 mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)' }}>
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-400">Search for code <strong style={{ color: GOLD }}>{verifyCollege.code}</strong> in the TNEA Sports Allotment PDF to confirm.</p>
            </div>
            <div className="p-4 space-y-2">
              {[
                { icon: '📄', label: 'TNEA Sports Allotment PDF', desc: 'Check college code in official list', url: 'https://static.tneaonline.org/docs/Sports_Allotment_List.pdf' },
                { icon: '🌐', label: 'TNEA Official Portal', desc: 'Registration & counselling', url: 'https://www.tneaonline.org' },
                { icon: '✅', label: 'AICTE Approval Check', desc: 'Verify AICTE approval', url: 'https://facilities.aicte-india.org/dashboard/pages/angulardashboard.php' },
                { icon: '🏛️', label: 'DOTE Official Website', desc: 'Directorate of Technical Education', url: 'https://dte.tn.gov.in' },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                  style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
                  <span className="text-lg flex-shrink-0">{link.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{link.label}</p>
                    <p className="text-xs text-gray-500">{link.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 flex-shrink-0" />
                </a>
              ))}
            </div>
            <div className="p-4 pt-0">
              <button onClick={() => setVerifyCollege(null)} className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#2a2a35' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
