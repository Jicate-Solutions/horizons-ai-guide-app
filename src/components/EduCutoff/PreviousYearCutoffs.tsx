import { useState } from 'react';
import { ChevronDown, Search, GraduationCap, Building2, Stethoscope, Landmark, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type CourseType = 'engineering' | 'medical' | 'govt';

interface CutoffEntry {
  college: string;
  course: string;
  oc: number | string;
  bc: number | string;
  mbc: number | string;
  sc: number | string;
  st: number | string;
  year: string;
  note?: string;
}

// ═══ DATA (same as before) ═══
const engineeringCutoffs: CutoffEntry[] = [
  { college: 'CEG, Anna University', course: 'Computer Science (CSE)', oc: 199, bc: 199, mbc: 199, sc: 185, st: 175, year: '2024' },
  { college: 'CEG, Anna University', course: 'Electronics & Comm (ECE)', oc: 198, bc: 197, mbc: 196, sc: 180, st: 168, year: '2024' },
  { college: 'CEG, Anna University', course: 'Information Technology', oc: 197, bc: 196, mbc: 195, sc: 178, st: 165, year: '2024' },
  { college: 'CEG, Anna University', course: 'Electrical (EEE)', oc: 189.5, bc: 188, mbc: 186, sc: 165, st: 145, year: '2024' },
  { college: 'CEG, Anna University', course: 'Mechanical', oc: 188.5, bc: 187, mbc: 185, sc: 160, st: 140, year: '2024' },
  { college: 'CEG, Anna University', course: 'Civil', oc: 184, bc: 182, mbc: 178, sc: 150, st: 130, year: '2024' },
  { college: 'MIT, Anna University', course: 'Computer Science (CSE)', oc: 198.5, bc: 198, mbc: 197, sc: 183, st: 170, year: '2024' },
  { college: 'MIT, Anna University', course: 'AI & Data Science', oc: 197, bc: 196, mbc: 195, sc: 180, st: 168, year: '2024' },
  { college: 'MIT, Anna University', course: 'Electronics & Comm (ECE)', oc: 195, bc: 194, mbc: 192, sc: 175, st: 160, year: '2024' },
  { college: 'NIT Trichy', course: 'CSE (JEE Main)', oc: '98.5%ile', bc: '95%ile', mbc: '92%ile', sc: '75%ile', st: '60%ile', year: '2024', note: 'JEE Main Percentile' },
  { college: 'NIT Trichy', course: 'ECE (JEE Main)', oc: '97%ile', bc: '93%ile', mbc: '90%ile', sc: '72%ile', st: '55%ile', year: '2024', note: 'JEE Main Percentile' },
  { college: 'PSG Tech, Coimbatore', course: 'Computer Science (CSE)', oc: 197, bc: 196, mbc: 195, sc: 178, st: 160, year: '2024' },
  { college: 'PSG Tech, Coimbatore', course: 'Electronics & Comm (ECE)', oc: 194, bc: 193, mbc: 191, sc: 170, st: 155, year: '2024' },
  { college: 'PSG Tech, Coimbatore', course: 'Mechanical', oc: 186, bc: 184, mbc: 180, sc: 155, st: 135, year: '2024' },
  { college: 'GCT, Coimbatore', course: 'Computer Science (CSE)', oc: 195, bc: 194, mbc: 192, sc: 175, st: 158, year: '2024' },
  { college: 'GCT, Coimbatore', course: 'Electronics & Comm (ECE)', oc: 191, bc: 189, mbc: 186, sc: 165, st: 145, year: '2024' },
  { college: 'TCE, Madurai', course: 'Computer Science (CSE)', oc: 193, bc: 191, mbc: 189, sc: 170, st: 152, year: '2024' },
  { college: 'CIT, Coimbatore', course: 'Computer Science (CSE)', oc: 190, bc: 188, mbc: 185, sc: 165, st: 145, year: '2024' },
  { college: 'Govt CE, Salem', course: 'CSE', oc: 188, bc: 186, mbc: 183, sc: 162, st: 140, year: '2024' },
  { college: 'Govt CE, Tirunelveli', course: 'CSE', oc: 186, bc: 184, mbc: 180, sc: 158, st: 135, year: '2024' },
  { college: 'Govt CE, Erode', course: 'CSE', oc: 178, bc: 176, mbc: 172, sc: 148, st: 125, year: '2024' },
  { college: 'SASTRA, Thanjavur', course: 'CSE (TNEA)', oc: 185, bc: 183, mbc: 180, sc: 160, st: 140, year: '2024' },
];

const medicalCutoffs: CutoffEntry[] = [
  { college: 'Madras Medical College', course: 'MBBS', oc: 645, bc: 610, mbc: 590, sc: 480, st: 380, year: '2024', note: 'NEET Score / 720' },
  { college: 'Stanley Medical College', course: 'MBBS', oc: 635, bc: 600, mbc: 580, sc: 465, st: 370, year: '2024', note: 'NEET Score / 720' },
  { college: 'Kilpauk Medical College', course: 'MBBS', oc: 625, bc: 590, mbc: 570, sc: 455, st: 360, year: '2024', note: 'NEET Score / 720' },
  { college: 'JIPMER, Puducherry', course: 'MBBS', oc: 650, bc: '-', mbc: '-', sc: 520, st: 420, year: '2024', note: 'NEET All India' },
  { college: 'Govt Medical, Coimbatore', course: 'MBBS', oc: 615, bc: 580, mbc: 560, sc: 445, st: 350, year: '2024', note: 'NEET Score / 720' },
  { college: 'Govt Medical, Madurai', course: 'MBBS', oc: 610, bc: 575, mbc: 555, sc: 440, st: 345, year: '2024', note: 'NEET Score / 720' },
  { college: 'Govt Dental College, Chennai', course: 'BDS', oc: 520, bc: 480, mbc: 460, sc: 370, st: 300, year: '2024', note: 'NEET Score / 720' },
  { college: 'B.Sc Nursing (Govt)', course: 'B.Sc Nursing', oc: 450, bc: 410, mbc: 390, sc: 320, st: 260, year: '2024', note: 'NEET Score / 720' },
  { college: 'B.Pharm (TN)', course: 'B.Pharm', oc: 380, bc: 340, mbc: 320, sc: 270, st: 220, year: '2024', note: 'NEET / Merit' },
  { college: 'Govt Siddha Medical', course: 'BSMS (Siddha)', oc: 350, bc: 320, mbc: 300, sc: 250, st: 200, year: '2024', note: 'NEET Score / 720' },
];

const govtExamCutoffs: CutoffEntry[] = [
  { college: 'TNPSC Group 4', course: 'VAO', oc: 210, bc: 195, mbc: 185, sc: 155, st: 140, year: '2023-24', note: 'Out of 300' },
  { college: 'TNPSC Group 4', course: 'Junior Assistant', oc: 205, bc: 190, mbc: 180, sc: 150, st: 135, year: '2023-24', note: 'Out of 300' },
  { college: 'SSC CHSL', course: 'LDC / Junior Assistant', oc: 195, bc: 180, mbc: '-', sc: 155, st: 138, year: '2024', note: 'Out of 200' },
  { college: 'SSC MTS', course: 'Multi Tasking Staff', oc: 135, bc: 120, mbc: '-', sc: 105, st: 95, year: '2024', note: 'Out of 270' },
  { college: 'SSC GD Constable', course: 'GD Constable', oc: 170, bc: 155, mbc: '-', sc: 135, st: 120, year: '2024', note: 'Out of 300' },
  { college: 'RRB NTPC', course: 'Junior Clerk', oc: 75, bc: 68, mbc: '-', sc: 55, st: 48, year: '2024', note: 'Out of 100' },
  { college: 'TN Police', course: 'Constable', oc: 105, bc: 95, mbc: 85, sc: 70, st: 60, year: '2023', note: 'Out of 150' },
  { college: 'NDA (UPSC)', course: 'Written Cutoff', oc: 355, bc: '-', mbc: '-', sc: '-', st: '-', year: '2024', note: 'Out of 900' },
  { college: 'India Post GDS', course: 'BPM / Dak Sevak', oc: '85%', bc: '78%', mbc: '72%', sc: '65%', st: '60%', year: '2024', note: '10th Mark %' },
];

const categoryColors: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  oc: { label: 'OC (General)', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  bc: { label: 'BC', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  mbc: { label: 'MBC / DNC', bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  sc: { label: 'SC', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  st: { label: 'ST', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
};

const tabs = [
  { id: 'engineering' as CourseType, label: 'Engineering', subLabel: 'TNEA 2024', icon: Building2, info: 'Cutoff out of 200' },
  { id: 'medical' as CourseType, label: 'Medical', subLabel: 'NEET 2024', icon: Stethoscope, info: 'NEET score out of 720' },
  { id: 'govt' as CourseType, label: 'Govt Exams', subLabel: '2023-24', icon: Landmark, info: 'Exam-specific marks' },
];

export const PreviousYearCutoffs = () => {
  const [activeTab, setActiveTab] = useState<CourseType>('engineering');
  const [search, setSearch] = useState('');
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);

  const data = activeTab === 'engineering' ? engineeringCutoffs : activeTab === 'medical' ? medicalCutoffs : govtExamCutoffs;
  const currentTab = tabs.find(t => t.id === activeTab)!;

  const filtered = search.trim()
    ? data.filter(e => e.college.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase()))
    : data;

  const grouped: Record<string, CutoffEntry[]> = {};
  filtered.forEach(e => { if (!grouped[e.college]) grouped[e.college] = []; grouped[e.college].push(e); });
  const collegeNames = Object.keys(grouped);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* ── HEADER ── */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Previous Year Cutoff Marks</h3>
            <p className="text-xs text-gray-400">முந்தைய ஆண்டு கட்ஆஃப் மதிப்பெண்கள்</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          Check minimum marks needed for your dream college. Compare across categories (OC, BC, MBC, SC, ST).
        </p>
      </div>

      {/* ── TABS ── */}
      <div className="grid grid-cols-3 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearch(''); setExpandedCollege(null); }}
            className={cn(
              "flex flex-col items-center py-3 transition-all border-b-3",
              activeTab === tab.id
                ? "border-b-2 border-gray-900 bg-white"
                : "border-b-2 border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100"
            )}
          >
            <tab.icon className={cn("w-5 h-5 mb-1", activeTab === tab.id ? "text-gray-900" : "text-gray-400")} />
            <span className={cn("text-xs font-bold", activeTab === tab.id ? "text-gray-900" : "text-gray-500")}>{tab.label}</span>
            <span className="text-[10px] text-gray-400">{tab.subLabel}</span>
          </button>
        ))}
      </div>

      {/* ── WHAT THE NUMBERS MEAN ── */}
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-blue-800">{currentTab.info}</p>
            <p className="text-xs text-blue-600 mt-0.5">
              {activeTab === 'engineering' && 'TNEA Cutoff = Maths/2 + Physics/4 + Chemistry/4 (max 200). Higher = harder to get.'}
              {activeTab === 'medical' && 'Minimum NEET score needed for admission. Out of 720 marks total.'}
              {activeTab === 'govt' && 'Minimum marks to clear the exam. Total marks vary by exam.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── CATEGORY LEGEND ── */}
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex gap-2 overflow-x-auto scrollbar-hide">
        {Object.entries(categoryColors).map(([key, c]) => (
          <span key={key} className={cn("text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap", c.bg, c.text)}>
            {c.label}
          </span>
        ))}
      </div>

      {/* ── SEARCH ── */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={`Search ${activeTab === 'engineering' ? 'college or branch' : activeTab === 'medical' ? 'college or course' : 'exam or post'}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-11 text-sm bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* ── RESULTS — Card-based layout ── */}
      <div className="max-h-[600px] overflow-y-auto">
        {collegeNames.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm font-medium">No results found</p>
          </div>
        ) : (
          collegeNames.map(collegeName => {
            const entries = grouped[collegeName];
            const isOpen = expandedCollege === collegeName || collegeNames.length <= 4;
            return (
              <div key={collegeName} className="border-b border-gray-100 last:border-b-0">
                {/* College header */}
                <button
                  onClick={() => setExpandedCollege(expandedCollege === collegeName ? null : collegeName)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-all text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 leading-tight">{collegeName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{entries.length} course{entries.length > 1 ? 's' : ''} · {entries[0].year} data</p>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
                </button>

                {/* ── Course cards (vertical, readable) ── */}
                {isOpen && (
                  <div className="px-4 pb-4 space-y-2">
                    {entries.map((entry, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-3.5">
                        {/* Course name */}
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-bold text-gray-900">{entry.course}</p>
                          {entry.note && (
                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">{entry.note}</span>
                          )}
                        </div>

                        {/* Cutoff marks — 2 column grid, big and clear */}
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'oc', val: entry.oc },
                            { key: 'bc', val: entry.bc },
                            { key: 'mbc', val: entry.mbc },
                            { key: 'sc', val: entry.sc },
                            { key: 'st', val: entry.st },
                          ].map(item => {
                            const cat = categoryColors[item.key];
                            return (
                              <div key={item.key} className={cn("flex items-center justify-between px-3 py-2 rounded-lg", cat.bg)}>
                                <span className={cn("text-xs font-bold", cat.text)}>{cat.label}</span>
                                <span className={cn("text-sm font-extrabold", cat.text)}>{item.val}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── FOOTER ── */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          ⚠️ Cutoff marks are approximate based on {activeTab === 'engineering' ? 'TNEA 2024 DOTE data' : activeTab === 'medical' ? 'NEET 2024 TN counselling' : 'previous year results'}. Actual cutoffs vary each year. Always verify from official sources.
        </p>
      </div>
    </div>
  );
};
