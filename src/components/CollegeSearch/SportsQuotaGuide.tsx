import { useState } from 'react';
import { Trophy, ChevronDown, ExternalLink, Medal, MapPin, GraduationCap, Info, Search, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { tneaSportsQuotaColleges, getTotalColleges, getGovtCount, getDistrictCount } from './sportsQuotaData';

interface SportsCollege {
  name: string;
  location: string;
  type: 'Government' | 'Aided' | 'University' | 'Deemed';
  courses: string;
  sportsSeats: string;
  sportsAccepted: string[];
  eligibility: string;
  applyLink?: string;
  fee?: string;
}

const sportsColleges: SportsCollege[] = [
  // Top Government Colleges
  {
    name: 'Anna University (CEG & MIT), Chennai',
    location: 'Chennai',
    type: 'Government',
    courses: 'B.E / B.Tech (All branches)',
    sportsSeats: '5% of total seats (TNEA Sports Quota)',
    sportsAccepted: ['Cricket', 'Football', 'Hockey', 'Volleyball', 'Basketball', 'Athletics', 'Badminton', 'Table Tennis', 'Tennis', 'Swimming', 'Kabaddi', 'Kho-Kho', 'Chess', 'Handball', 'Weightlifting'],
    eligibility: 'Must have represented District/State/National level in last 2 years. TNEA registration mandatory. Separate sports counselling.',
    applyLink: 'https://www.tneaonline.org',
    fee: '₹7,500/year',
  },
  {
    name: 'Madras University Colleges, Chennai',
    location: 'Chennai',
    type: 'University',
    courses: 'B.A, B.Sc, B.Com, BBA, BCA',
    sportsSeats: '5% of sanctioned intake per course',
    sportsAccepted: ['Cricket', 'Football', 'Hockey', 'Volleyball', 'Basketball', 'Athletics', 'Badminton', 'Tennis', 'Kabaddi', 'Kho-Kho', 'Handball', 'Chess', 'Swimming', 'Boxing', 'Wrestling', 'Weightlifting'],
    eligibility: 'District/State/National level. Certificate from District Sports Authority or state association. Trials may be conducted.',
    fee: '₹5,000–15,000/year',
  },
  {
    name: 'Bharathiar University Colleges, Coimbatore',
    location: 'Coimbatore',
    type: 'University',
    courses: 'B.A, B.Sc, B.Com, BBA, M.A, M.Sc',
    sportsSeats: '5% supernumerary seats',
    sportsAccepted: ['Cricket', 'Football', 'Volleyball', 'Basketball', 'Athletics', 'Badminton', 'Tennis', 'Kabaddi', 'Chess', 'Hockey', 'Table Tennis', 'Swimming'],
    eligibility: 'State/National level participation certificate. Selection through sports trials conducted by University.',
    fee: '₹5,000–12,000/year',
  },
  {
    name: 'Madurai Kamaraj University Colleges',
    location: 'Madurai',
    type: 'University',
    courses: 'B.A, B.Sc, B.Com, BBA, BCA, MCA',
    sportsSeats: '5% sports quota',
    sportsAccepted: ['Cricket', 'Football', 'Volleyball', 'Basketball', 'Athletics', 'Kabaddi', 'Kho-Kho', 'Hockey', 'Badminton', 'Chess', 'Table Tennis', 'Boxing'],
    eligibility: 'District/State/National representation. Sports certificate from recognized body.',
    fee: '₹5,000–10,000/year',
  },
  {
    name: 'Annamalai University, Chidambaram',
    location: 'Chidambaram',
    type: 'University',
    courses: 'B.A, B.Sc, B.Com, B.Tech, BPE (Phys Ed), MPE',
    sportsSeats: '5% + BPE/MPE dedicated sports courses',
    sportsAccepted: ['Cricket', 'Football', 'Hockey', 'Volleyball', 'Basketball', 'Athletics', 'Kabaddi', 'Kho-Kho', 'Boxing', 'Wrestling', 'Weightlifting', 'Swimming', 'Tennis', 'Badminton', 'Handball', 'Cycling', 'Archery'],
    eligibility: 'District/State/National level. BPE/MPE: Sports background + physical fitness test.',
    applyLink: 'https://www.annamalaiuniversity.ac.in',
    fee: '₹8,000–25,000/year',
  },
  {
    name: 'SRMIST (SRM), Chennai',
    location: 'Chennai',
    type: 'Deemed',
    courses: 'B.Tech (All branches), BBA, B.Com',
    sportsSeats: '50+ sports scholarships per year',
    sportsAccepted: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Athletics', 'Badminton', 'Tennis', 'Swimming', 'Table Tennis', 'Hockey', 'Kabaddi', 'Chess'],
    eligibility: 'State/National level achievement. Full/partial fee waiver based on sports level.',
    applyLink: 'https://www.srmist.edu.in',
    fee: '₹2.5–3.5 Lakhs/year (waiver available)',
  },
  {
    name: 'VIT University, Vellore',
    location: 'Vellore',
    type: 'Deemed',
    courses: 'B.Tech (All branches)',
    sportsSeats: 'Sports scholarship available (up to 100% fee waiver)',
    sportsAccepted: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Athletics', 'Badminton', 'Tennis', 'Table Tennis', 'Chess', 'Swimming'],
    eligibility: 'National/International level athletes. Apply through sports cell during VITEEE counselling.',
    applyLink: 'https://vit.ac.in',
    fee: '₹1.8–2.5 Lakhs/year (waiver available)',
  },
  {
    name: 'PSG College of Technology, Coimbatore',
    location: 'Coimbatore',
    type: 'Aided',
    courses: 'B.E / B.Tech, B.Sc, BBA',
    sportsSeats: '3–5% management quota for sports achievers',
    sportsAccepted: ['Cricket', 'Football', 'Volleyball', 'Basketball', 'Athletics', 'Badminton', 'Tennis', 'Table Tennis', 'Chess'],
    eligibility: 'State/National level. Apply through management quota with sports certificate.',
    fee: '₹35,000–75,000/year',
  },
  {
    name: 'Loyola College, Chennai',
    location: 'Chennai',
    type: 'Aided',
    courses: 'B.A, B.Sc, B.Com, BBA, M.A, M.Sc',
    sportsSeats: '5% sports quota in each course',
    sportsAccepted: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Athletics', 'Hockey', 'Tennis', 'Badminton', 'Table Tennis', 'Chess', 'Swimming'],
    eligibility: 'State level minimum. Selection through sports trials. Good academic record also considered.',
    fee: '₹15,000–30,000/year',
  },
  {
    name: 'Govt Physical Education Colleges (TN)',
    location: 'Chennai, Coimbatore, Madurai',
    type: 'Government',
    courses: 'BPEd (Bachelor of Physical Education), MPEd',
    sportsSeats: '100% — entire course is sports-based',
    sportsAccepted: ['All recognized sports by SAI / Sports Authority of India'],
    eligibility: 'Any degree + State/National sports representation. Physical fitness test mandatory.',
    fee: '₹5,000–8,000/year',
  },
  // Central Universities
  {
    name: 'NIT Trichy (Sports Quota)',
    location: 'Trichy',
    type: 'Government',
    courses: 'B.Tech (All branches)',
    sportsSeats: '2% supernumerary seats',
    sportsAccepted: ['Athletics', 'Badminton', 'Basketball', 'Cricket', 'Football', 'Hockey', 'Table Tennis', 'Tennis', 'Volleyball', 'Chess', 'Swimming', 'Weightlifting'],
    eligibility: 'JEE Main qualified + National/State level sports certificate. Apply through JoSAA sports quota.',
    applyLink: 'https://josaa.nic.in',
    fee: '₹1.2 Lakhs/year',
  },
  {
    name: 'TNSPE (Tamil Nadu Sports School)',
    location: 'Multiple locations',
    type: 'Government',
    courses: 'Coaching Diploma, Sports Management',
    sportsSeats: '100% sports-based',
    sportsAccepted: ['All sports recognized by Tamil Nadu Olympic Association'],
    eligibility: 'Active sportspersons. Selection through physical & skill trials.',
    fee: 'Free / Minimal',
  },
];

// Certificate hierarchy
const certificateLevels = [
  { level: 'International', emoji: '🥇', desc: 'Olympics, Asian Games, Commonwealth, World Championship', priority: 'Highest — direct admission in most colleges + full scholarship' },
  { level: 'National', emoji: '🥈', desc: 'Khelo India, National Games, Federation Cups, Senior/Junior Nationals', priority: 'Very High — guaranteed seat in most sports quota' },
  { level: 'State', emoji: '🥉', desc: 'State-level championships, Inter-district tournaments', priority: 'High — eligible for most sports quotas. Minimum for top colleges.' },
  { level: 'District', emoji: '🏅', desc: 'District-level tournaments, Inter-school district meets', priority: 'Moderate — eligible for university colleges but not top institutes' },
  { level: 'Zonal/School', emoji: '📜', desc: 'Zonal meets, School-level sports day', priority: 'Low — generally NOT accepted for sports quota. Aim for district level minimum.' },
];

export const SportsQuotaGuide = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'districts'>('guide');
  const [search, setSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);
  const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);

  const filtered = search.trim()
    ? sportsColleges.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()) ||
        c.sportsAccepted.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
        c.courses.toLowerCase().includes(search.toLowerCase())
      )
    : sportsColleges;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Sports Quota Admission Guide</h3>
            <p className="text-xs text-orange-200">விளையாட்டு ஒதுக்கீட்டு சேர்க்கை வழிகாட்டி</p>
          </div>
        </div>
        <p className="text-sm text-orange-100 mt-2 leading-relaxed">
          Find colleges that offer sports quota seats. Check which sports, how many seats, and how to apply.
        </p>
      </div>

      {/* ═══ TWO TABS ═══ */}
      <div className="grid grid-cols-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('guide')}
          className={cn(
            "py-3 text-xs font-bold text-center border-b-2 transition-all",
            activeTab === 'guide' ? "border-orange-600 text-orange-700 bg-orange-50" : "border-transparent text-gray-500 hover:bg-gray-50"
          )}
        >
          🏆 Guide & Top Colleges
        </button>
        <button
          onClick={() => setActiveTab('districts')}
          className={cn(
            "py-3 text-xs font-bold text-center border-b-2 transition-all",
            activeTab === 'districts' ? "border-orange-600 text-orange-700 bg-orange-50" : "border-transparent text-gray-500 hover:bg-gray-50"
          )}
        >
          📍 District-wise Colleges ({getTotalColleges()})
        </button>
      </div>

      {/* ═══ TAB 1: GUIDE ═══ */}
      {activeTab === 'guide' && (
        <>
      {/* Quick Info Toggle */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="w-full flex items-center justify-between px-4 py-3 bg-amber-50 border-b border-amber-200 text-left"
      >
        <span className="text-sm font-bold text-amber-800 flex items-center gap-2">
          <Info className="w-4 h-4" /> How Sports Quota Works in Tamil Nadu
        </span>
        <ChevronDown className={cn("w-4 h-4 text-amber-600 transition-transform", showInfo && "rotate-180")} />
      </button>

      {showInfo && (
        <div className="px-4 py-3 bg-amber-50/50 border-b border-amber-200 space-y-3">
          {/* Rules */}
          <div className="bg-white rounded-xl border border-amber-200 p-3">
            <p className="text-xs font-bold text-gray-700 mb-2">TN Sports Quota Rules:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>• <strong>5% seats</strong> in all govt/aided colleges reserved for sports achievers</p>
              <p>• <strong>TNEA Engineering:</strong> Separate sports counselling after general rounds</p>
              <p>• <strong>Arts & Science:</strong> Apply directly to college sports cell with certificates</p>
              <p>• <strong>Central Unis (NIT/IIT):</strong> 2% supernumerary quota via JoSAA</p>
              <p>• <strong>Certificate must be</strong> from last 2 years (some colleges accept 3 years)</p>
              <p>• <strong>Issuing body:</strong> District Sports Authority, State Association, or SAI</p>
            </div>
          </div>

          {/* Certificate Priority */}
          <div className="bg-white rounded-xl border border-amber-200 p-3">
            <p className="text-xs font-bold text-gray-700 mb-2">Certificate Priority (Highest → Lowest):</p>
            <div className="space-y-2">
              {certificateLevels.map(c => (
                <div key={c.level} className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">{c.emoji}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{c.level}</p>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                    <p className="text-xs text-amber-700 font-medium">{c.priority}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-amber-200 p-3">
            <p className="text-xs font-bold text-gray-700 mb-2">Documents Needed for Sports Quota:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>✅ Sports certificate (District/State/National — original + 3 copies)</p>
              <p>✅ Certificate from recognized sports body (not school sports day)</p>
              <p>✅ 12th mark sheet</p>
              <p>✅ Community / Income certificate</p>
              <p>✅ Aadhar card + 4 photos</p>
              <p>✅ Transfer Certificate from school</p>
              <p>✅ Medical fitness certificate</p>
              <p>⚠️ Some colleges conduct physical trials — carry sports kit</p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by college, city, sport, or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-11 text-sm bg-gray-50 border-gray-200"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-center">{filtered.length} college{filtered.length !== 1 ? 's' : ''} with sports quota</p>
      </div>

      {/* College List */}
      <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
        {filtered.map(college => {
          const isOpen = expandedCollege === college.name;
          return (
            <div key={college.name}>
              <button
                onClick={() => setExpandedCollege(isOpen ? null : college.name)}
                className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-all text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{college.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{college.location}</span>
                    <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded",
                      college.type === 'Government' ? 'bg-green-100 text-green-700' :
                      college.type === 'Aided' ? 'bg-blue-100 text-blue-700' :
                      college.type === 'University' ? 'bg-violet-100 text-violet-700' :
                      'bg-amber-100 text-amber-700'
                    )}>{college.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{college.courses}</p>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mt-1", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {/* Seats Info */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-orange-800 mb-1 flex items-center gap-1.5">
                      <Medal className="w-3.5 h-3.5" /> Sports Seats
                    </p>
                    <p className="text-sm font-bold text-orange-900">{college.sportsSeats}</p>
                    {college.fee && <p className="text-xs text-orange-600 mt-1">Fee: {college.fee}</p>}
                  </div>

                  {/* Sports Accepted */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2">Sports Accepted ({college.sportsAccepted.length}):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {college.sportsAccepted.map(sport => (
                        <span key={sport} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">{sport}</span>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-blue-800 mb-1">Eligibility:</p>
                    <p className="text-xs text-blue-700 leading-relaxed">{college.eligibility}</p>
                  </div>

                  {/* Apply Link */}
                  {college.applyLink && (
                    <a
                      href={college.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-all active:scale-[0.98]"
                    >
                      <ExternalLink className="w-4 h-4" /> Visit College Website
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
        </>
      )}

      {/* ═══ TAB 2: DISTRICT-WISE TNEA COLLEGES ═══ */}
      {activeTab === 'districts' && (
        <div>
          {/* Stats Bar */}
          <div className="px-4 py-3 bg-orange-50 border-b border-orange-200 flex flex-wrap gap-3">
            <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2.5 py-1 rounded-lg">{getTotalColleges()} Colleges</span>
            <span className="text-xs font-bold text-green-800 bg-green-100 px-2.5 py-1 rounded-lg">{getGovtCount()} Govt/Aided</span>
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-lg">{getDistrictCount()} Districts</span>
            <span className="text-xs text-gray-500 ml-auto">All under TNEA 5% Sports Quota</span>
          </div>

          {/* District Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by district or college name..."
                value={districtSearch}
                onChange={e => setDistrictSearch(e.target.value)}
                className="pl-9 h-11 text-sm bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* District List */}
          <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
            {tneaSportsQuotaColleges
              .filter(d => {
                if (!districtSearch.trim()) return true;
                const q = districtSearch.toLowerCase();
                return d.district.toLowerCase().includes(q) ||
                  d.colleges.some(c => c.name.toLowerCase().includes(q) || c.code.includes(q));
              })
              .map(district => {
                const isOpen = expandedDistrict === district.district;
                const govtCount = district.colleges.filter(c => c.type === 'Govt' || c.type === 'Govt-Aided' || c.type === 'Central Govt').length;
                return (
                  <div key={district.district}>
                    <button
                      onClick={() => setExpandedDistrict(isOpen ? null : district.district)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-all text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-gray-900">{district.district}</p>
                          <span className="text-xs text-gray-400">{district.districtTamil}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-600 font-medium">{district.colleges.length} colleges</span>
                          {govtCount > 0 && <span className="text-xs text-green-700 bg-green-100 px-1.5 py-0.5 rounded font-bold">{govtCount} Govt</span>}
                        </div>
                      </div>
                      <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3">
                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                          {/* Table Header */}
                          <div className="grid grid-cols-12 gap-px bg-gray-200">
                            <div className="bg-gray-100 px-3 py-2 col-span-2 text-xs font-bold text-gray-600">Code</div>
                            <div className="bg-gray-100 px-3 py-2 col-span-7 text-xs font-bold text-gray-600">College Name</div>
                            <div className="bg-gray-100 px-3 py-2 col-span-3 text-xs font-bold text-gray-600">Type</div>
                          </div>
                          {/* Rows */}
                          {district.colleges.map((college, i) => (
                            <div key={college.code} className="grid grid-cols-12 gap-px bg-gray-200">
                              <div className="bg-white px-3 py-2.5 col-span-2 text-xs font-mono font-bold text-gray-700">{college.code}</div>
                              <div className="bg-white px-3 py-2.5 col-span-7 text-xs font-medium text-gray-800 leading-tight">{college.name}</div>
                              <div className="bg-white px-3 py-2.5 col-span-3">
                                <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded",
                                  college.type === 'Govt' ? 'bg-green-100 text-green-700' :
                                  college.type === 'Govt-Aided' ? 'bg-blue-100 text-blue-700' :
                                  college.type === 'Central Govt' ? 'bg-emerald-100 text-emerald-700' :
                                  college.type === 'Deemed' ? 'bg-violet-100 text-violet-700' :
                                  'bg-orange-100 text-orange-700'
                                )}>{college.type}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 bg-amber-50 border-t border-amber-200">
        <p className="text-xs text-amber-600 text-center">
          ⚠️ Sports quota seats and rules vary each year. Contact the college sports cell directly for the latest information.
        </p>
      </div>
    </div>
  );
};
