import { useState, useMemo } from 'react';
import { Trophy, ChevronDown, ExternalLink, Search, X, Shield, MapPin, Filter, AlertTriangle, Info, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allSQColleges, sqFieldCounts, sqDistricts, SQCollege } from './allCollegesHelper';

const GOLD = '#c9a84c';

const typeColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Govt': { bg: 'bg-emerald-900/60', text: 'text-emerald-300', border: 'border-emerald-600', dot: 'bg-emerald-400' },
  'Govt-Aided': { bg: 'bg-sky-900/60', text: 'text-sky-300', border: 'border-sky-600', dot: 'bg-sky-400' },
  'Autonomous': { bg: 'bg-violet-900/60', text: 'text-violet-300', border: 'border-violet-600', dot: 'bg-violet-400' },
  'Private': { bg: 'bg-orange-900/40', text: 'text-orange-300', border: 'border-orange-700', dot: 'bg-orange-400' },
};
const getTC = (t: string) => typeColors[t] || typeColors['Private'];

const fields = [
  { id: 'All', label: 'All Fields', icon: '📋' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️' },
  { id: 'arts', label: 'Arts & Science', icon: '🏛️' },
  { id: 'medical', label: 'Medical', icon: '⚕️' },
  { id: 'dental', label: 'Dental', icon: '🦷' },
  { id: 'nursing', label: 'Nursing', icon: '👩‍⚕️' },
  { id: 'pharmacy', label: 'Pharmacy', icon: '💊' },
  { id: 'allied', label: 'Allied Health', icon: '🏥' },
  { id: 'law', label: 'Law', icon: '⚖️' },
  { id: 'education', label: 'B.Ed', icon: '📚' },
  { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
  { id: 'physical_ed', label: 'Physical Ed', icon: '🏋️' },
  { id: 'polytechnic', label: 'Polytechnic', icon: '🔬' },
];

const allTypes = ['All', 'Govt', 'Govt-Aided', 'Autonomous', 'Private'];

// Counselling body per field
const counsellingInfo: Record<string, string> = {
  'engineering': 'TNEA (tneaonline.org)',
  'arts': 'TNGASA (tngasa.in)',
  'medical': 'DME TN Medical Selection (tnmedicalselection.net)',
  'dental': 'DME TN Medical Selection (tnmedicalselection.net)',
  'nursing': 'DME TN (tnhealth.tn.gov.in)',
  'pharmacy': 'DME TN (tnhealth.tn.gov.in)',
  'allied': 'DME TN (tnhealth.tn.gov.in)',
  'law': 'TNDALU (tndalu.ac.in)',
  'education': 'TNTEU (tnteu.ac.in)',
  'agriculture': 'TNAU (tnau.ac.in)',
  'physical_ed': 'University Sports Department',
  'polytechnic': 'DOTE (dte.tn.gov.in)',
};

export const SportsQuotaGuide = () => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedField, setSelectedField] = useState<string>('All');
  const [showInfo, setShowInfo] = useState(false);

  const fieldCounts = useMemo(() => sqFieldCounts(), []);
  const districts = useMemo(() => sqDistricts(), []);

  const filtered = useMemo(() => {
    let result = allSQColleges;
    if (selectedField !== 'All') result = result.filter(c => c.field === selectedField);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.district.toLowerCase().includes(q) || c.courses.toLowerCase().includes(q));
    }
    if (selectedDistrict !== 'All') result = result.filter(c => c.district === selectedDistrict);
    if (selectedType !== 'All') result = result.filter(c => c.type === selectedType);
    return result;
  }, [search, selectedDistrict, selectedType, selectedField]);

  const grouped = useMemo(() => {
    const map: Record<string, SQCollege[]> = {};
    filtered.forEach(c => { if (!map[c.district]) map[c.district] = []; map[c.district].push(c); });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const govtCount = filtered.filter(c => c.type !== 'Private').length;
  const totalAll = allSQColleges.length;
  const activeFieldLabel = fields.find(f => f.id === selectedField)?.label || '';
  const activeCounselling = selectedField !== 'All' ? counsellingInfo[selectedField] : '';

  return (
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
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'rgba(201,168,76,0.15)', color: GOLD }}>{totalAll} Colleges</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-900/50 text-emerald-300">{districts.length} Districts</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/5 text-gray-400">13 Fields</span>
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
            <p>• <span className="text-emerald-400 font-bold">5% seats</span> reserved in all colleges for sports achievers</p>
            <p>• Applies to: Engineering, Arts, Medical, Dental, Law — <span className="text-white font-bold">ALL fields</span></p>
            <p>• Certificate must be from <span className="text-amber-400 font-bold">last 2 years</span></p>
            <p>• Minimum: <span className="text-white font-bold">District level</span> representation</p>
            <p>• Priority: International → National → State → District</p>
            <p>• Each field has its own counselling body (TNEA, TNGASA, DME, etc.)</p>
          </div>
        </div>
      )}

      {/* FIELD FILTER */}
      <div className="px-3 py-2.5 overflow-x-auto" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
        <style>{`.overflow-x-auto::-webkit-scrollbar{display:none} .overflow-x-auto{-ms-overflow-style:none;scrollbar-width:none}`}</style>
        <div className="flex gap-1.5 min-w-max">
          {fields.map(f => {
            const isActive = selectedField === f.id;
            const count = fieldCounts[f.id] || 0;
            if (f.id !== 'All' && count === 0) return null;
            return (
              <button key={f.id} onClick={() => setSelectedField(f.id)}
                className={cn("flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
                  isActive ? "text-black" : "text-gray-400 hover:text-white"
                )}
                style={isActive ? { background: GOLD } : { background: '#1a1a24', border: '1px solid #2a2a35' }}>
                <span>{f.icon}</span><span>{f.label}</span>
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold", isActive ? "bg-black/20 text-black" : "bg-white/10 text-gray-500")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* COUNSELLING INFO BANNER */}
      {selectedField !== 'All' && activeCounselling && (
        <div className="px-4 py-2 flex items-center gap-2" style={{ background: '#1a1510', borderBottom: '1px solid #2a2a35' }}>
          <span className="text-xs text-gray-500">Counselling:</span>
          <span className="text-xs font-bold" style={{ color: GOLD }}>{activeCounselling}</span>
        </div>
      )}

      {/* SEARCH */}
      <div className="p-3" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search college, course, or district..."
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
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
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

      {/* RESULT STATS */}
      {(selectedDistrict !== 'All' || search.trim() || selectedField !== 'All') && filtered.length > 0 && (
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: '#111118', borderBottom: '1px solid #1f1f2a' }}>
          <span className="text-xs text-gray-500">{filtered.length} {selectedField !== 'All' ? activeFieldLabel + ' ' : ''}colleges</span>
          <span className="text-xs text-emerald-400 font-bold">{govtCount} Govt/Aided</span>
        </div>
      )}

      {/* COLLEGE LIST */}
      <div className="max-h-[calc(100vh-380px)] overflow-y-auto" style={{ background: '#0f0f14' }}>
        {selectedDistrict === 'All' && !search.trim() && selectedField === 'All' ? (
          <div className="p-10 text-center">
            <p className="text-3xl mb-3">📍</p>
            <p className="text-sm font-bold text-white">Select a Field or District</p>
            <p className="text-xs text-gray-500 mt-1">Choose a field (Engineering, Arts, Medical...) or district to see colleges</p>
            <p className="text-xs mt-3" style={{ color: GOLD }}>{totalAll} colleges · {districts.length} districts · 13 fields</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm text-gray-500">No colleges found</p>
            <p className="text-xs text-gray-600 mt-1">Try changing the field, district, or type filter</p>
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
              {colleges.map((college, idx) => {
                const tc = getTC(college.type);
                return (
                  <div key={`${college.name}-${idx}`} className="px-4 py-3" style={{ borderBottom: '1px solid #1a1a24' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#1a1a24', border: '1px solid #2a2a35' }}>
                        <GraduationCap className="w-4 h-4" style={{ color: GOLD }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white leading-tight">{college.name}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border inline-flex items-center", tc.bg, tc.text, tc.border)}>
                            <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1", tc.dot)} />{college.type}
                          </span>
                          {college.naacGrade && (
                            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700">NAAC {college.naacGrade}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{college.courses}</p>
                        {college.feeRange && <p className="text-xs mt-0.5" style={{ color: GOLD }}>💰 {college.feeRange}</p>}
                      </div>
                      {college.website && (
                        <a href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold flex-shrink-0 mt-1 transition-all active:scale-95"
                          style={{ background: 'rgba(201,168,76,0.15)', color: GOLD, border: '1px solid rgba(201,168,76,0.3)' }}
                          onClick={e => e.stopPropagation()}>
                          <ExternalLink className="w-3 h-3" /> Visit
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 text-center" style={{ background: '#111118', borderTop: '1px solid #2a2a35' }}>
        <p className="text-xs text-gray-600">All TN colleges have 5% Sports Quota · Verify with respective counselling body</p>
      </div>
    </div>
  );
};
