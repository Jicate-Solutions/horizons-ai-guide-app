import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Users,
  Award,
  GraduationCap,
  IndianRupee,
  Calendar,
  Sparkles,
  ExternalLink,
  Trophy,
  Heart,
  Shield,
  Briefcase,
  BookOpen,
  Check,
} from 'lucide-react';

/**
 * TNEA 2026 Official Information Brochure (summarised for 12th students)
 * Source: Tamil Nadu Engineering Admissions 2026 — Official Brochure
 * Official portals: https://www.tneaonline.org | https://www.dte.tn.gov.in
 */
export const TNEA2026BrochureInfo = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Sparkles },
    { id: 'eligibility', title: 'Eligibility', icon: CheckCircle2 },
    { id: 'reservation', title: 'Reservation', icon: Users },
    { id: 'special', title: 'Special Quotas', icon: Award },
    { id: 'selection', title: 'Selection Formula', icon: Calculator },
    { id: 'fees', title: 'Fees', icon: IndianRupee },
    { id: 'documents', title: 'Documents', icon: FileText },
    { id: 'counselling', title: 'Counselling', icon: Calendar },
    { id: 'concessions', title: 'Concessions', icon: Heart },
  ];

  return (
    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-900/30">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-amber-400 text-emerald-900 hover:bg-amber-400 text-[10px] font-bold border-0">
                OFFICIAL 2026
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-[10px] hover:bg-white/20">
                Source: dte.tn.gov.in
              </Badge>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              TNEA 2026 — Information Brochure
            </h2>
            <p className="text-emerald-100/90 text-sm font-tamil">
              தமிழ்நாடு பொறியியல் சேர்க்கை 2026 — மாணவர்களுக்கான அதிகாரப்பூர்வ விவரங்கள்
            </p>
          </div>
          <a
            href="https://www.tneaonline.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/15 hover:bg-white/25 text-white border-white/30 border"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Official Portal
            </Button>
          </a>
        </div>
      </div>

      <CardContent className="p-4 md:p-6 space-y-3">
        {/* Quick Facts strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
          {[
            { label: 'Total Marks', value: '200', sub: 'M + P/2 + C/2' },
            { label: 'Min % (GEN)', value: '45%', sub: 'PCM Average' },
            { label: 'Min % (BC/SC/ST)', value: '40%', sub: 'PCM Average' },
            { label: 'Govt School Quota', value: '7.5%', sub: 'Preferential' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 border border-gray-100 text-center shadow-sm"
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">
                {stat.label}
              </div>
              <div className="text-xl md:text-2xl font-black text-emerald-700 my-1">
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-400">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Section navigation */}
        <div className="flex flex-wrap gap-1.5">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Section: Overview */}
        {activeSection === 'overview' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              What is TNEA 2026?
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              TNEA (Tamil Nadu Engineering Admissions) is a single-window online
              counselling system for B.E. / B.Tech. degree admissions across
              Tamil Nadu — Government colleges, Government-aided colleges, Anna
              University departments, Annamalai University and surrendered seats
              of self-financing colleges. <strong>No entrance exam.</strong>{' '}
              Admission is based on 12th PCM cutoff marks.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-sm text-emerald-900">
              <strong>One application</strong> covers all Government, Aided,
              Anna University &amp; Annamalai University seats — including
              surrendered self-financing seats.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                { label: 'B.E. / B.Tech.', dur: '4 years (8 semesters)' },
                { label: 'B.E. (Sandwich)', dur: '5 years (10 semesters)' },
                { label: 'M.Tech. CSE (Integrated)', dur: '5 years (10 semesters)' },
              ].map((d, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-2.5 text-xs">
                  <div className="font-semibold text-gray-800">{d.label}</div>
                  <div className="text-gray-500">{d.dur}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Eligibility */}
        {activeSection === 'eligibility' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Eligibility — Minimum PCM Marks
            </h3>
            <p className="text-xs text-gray-500">
              Average of Mathematics, Physics &amp; Chemistry in HSC (+2)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-2.5 font-semibold text-blue-900 rounded-tl-lg">
                      Community
                    </th>
                    <th className="text-center p-2.5 font-semibold text-blue-900 rounded-tr-lg">
                      Minimum Average %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { c: 'General (OC)', m: '45.00 %' },
                    { c: 'Backward Class (BC) including BC Muslim', m: '40.00 %' },
                    { c: 'MBC & DNC', m: '40.00 %' },
                    { c: 'SC / SCA / ST', m: '40.00 %' },
                  ].map((r, i) => (
                    <tr key={i} className={i % 2 ? 'bg-gray-50/50' : ''}>
                      <td className="p-2.5 text-gray-700">{r.c}</td>
                      <td className="p-2.5 text-center font-bold text-blue-700">
                        {r.m}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-900">
              <strong>Vocational stream:</strong> A pass in HSC Vocational with
              Maths / Physics / Chemistry as the related subject — same minimum
              percentages apply (theory + practical + related subject combined).
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-lg p-3 text-xs text-rose-900">
              <strong>Improvement marks are NOT considered.</strong> Per G.O. No.
              184/2005 and G.O. (st) No. 143/2008, only the original first-attempt
              marks are taken into account.
            </div>
          </div>
        )}

        {/* Section: Reservation */}
        {activeSection === 'reservation' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Tamil Nadu Rule of Reservation
            </h3>
            <div className="space-y-1.5">
              {[
                { cat: 'Open Competition (OC)', pct: 31.0, color: 'bg-blue-500' },
                { cat: 'Backward Class (BC)', pct: 26.5, color: 'bg-emerald-500' },
                { cat: 'BC Muslim (BCM)', pct: 3.5, color: 'bg-teal-500' },
                { cat: 'Most Backward & DNC', pct: 20.0, color: 'bg-amber-500' },
                { cat: 'Scheduled Caste (SC)', pct: 15.0, color: 'bg-orange-500' },
                { cat: 'SC Arunthathiyars (SCA)', pct: 3.0, color: 'bg-rose-500' },
                { cat: 'Scheduled Tribe (ST)', pct: 1.0, color: 'bg-purple-500' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-36 md:w-44 text-gray-700 text-xs">{r.cat}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 relative overflow-hidden">
                    <div
                      className={`${r.color} h-full rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${(r.pct / 31) * 100}%` }}
                    >
                      <span className="text-[10px] text-white font-bold">
                        {r.pct}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg">
              <div className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                7.5% Government School Quota
              </div>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Preferential reservation for students who studied 6th – 12th in
                Tamil Nadu Government / Corporation / Municipal / Adi-Dravidar /
                Forest / Tribal Welfare schools.{' '}
                <strong>Full tuition, hostel and development fees are waived</strong>{' '}
                by the State for these students (G.O. 221/2021).
              </p>
            </div>
            <div className="text-xs text-gray-500 italic">
              Note: The Community Certificate must be in permanent card / digitally
              signed e-Certificate format and obtained before the application
              deadline. Only Tamil Nadu native candidates are eligible for
              communal reservation.
            </div>
          </div>
        )}

        {/* Section: Special Quotas */}
        {activeSection === 'special' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Special Reservation Categories
            </h3>
            <p className="text-xs text-gray-500">Tamil Nadu native candidates only</p>

            <div className="flex gap-3 p-3 rounded-lg bg-blue-50/60 border border-blue-100">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Sons / Daughters of Ex-Servicemen
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  150 seats total (8 University + 34 Govt/Aided + 108 Self-Financing).
                  Requires dependency certificate from Asst. Director of Ex-Servicemen
                  Welfare Board of the district.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-rose-50/60 border border-rose-100">
              <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-rose-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Persons with Benchmark Disabilities (PwD)
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  5% reservation across all categories. 21 specified disabilities
                  including blindness, low vision, hearing impairment, locomotor,
                  cerebral palsy, autism, learning disabilities, and more. Minimum
                  40% permanent impairment required (District Medical Board cert).
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-100">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Eminent Sports Persons
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  500 seats (12 University + 488 Govt/Aided/Self-Financing). Marks
                  awarded for International / National / State / District
                  achievements in the last 4 years (Jun 2022 – May 2026).
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Vocational Stream Candidates
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  2% of Government seats reserved for HSC Vocational candidates
                  (G.O. 121/2022). Separate ranking and counselling. 5% of these
                  vocational seats are further reserved for PwD candidates.
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-3 text-xs text-cyan-900">
              <strong>Course-specific exclusions:</strong> Mining Engineering
              (per DGMS norms) and Marine Engineering (per IMU norms — min height
              157 cm, min weight 48 kg, normal colour vision, max age 25) have
              physical fitness requirements. Computer Science / IT / AI / Data
              Science branches are suitable for all disabilities; other B.E./B.Tech.
              programmes exclude only 100% blind candidates.
            </div>
          </div>
        )}

        {/* Section: Selection Formula */}
        {activeSection === 'selection' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-600" />
              Selection Formula &amp; Tie-Breaking
            </h3>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-4 text-center">
              <div className="text-xs text-indigo-600 font-semibold uppercase mb-1">
                Cutoff Formula (out of 200)
              </div>
              <div className="text-2xl md:text-3xl font-black text-indigo-700 my-2">
                Maths + (Physics ÷ 2) + (Chemistry ÷ 2)
              </div>
              <div className="text-xs text-gray-500">
                Maths : 100 marks | Physics : 50 marks | Chemistry : 50 marks
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-900">
              <strong>Mark Normalisation:</strong> For CBSE / ICSE / Other-State
              students, marks are normalised against the highest mark in that
              Board. Example — a CBSE student who scored 60 in Physics where
              the CBSE topper got 90 will have normalised marks of (60 ÷ 90) ×
              100 = 66.66.
            </div>
            <div>
              <div className="font-semibold text-gray-700 text-sm mb-2">
                Tie-breaker order (for same cutoff):
              </div>
              <ol className="space-y-1.5 text-xs text-gray-600 list-decimal list-inside ml-1">
                <li>Percentage in Mathematics</li>
                <li>Percentage in Physics</li>
                <li>Percentage in the Optional subject</li>
                <li>Total percentage in 12th Standard</li>
                <li>Date of Birth (elder gets preference)</li>
                <li>Random number assigned (higher value gets preference)</li>
              </ol>
            </div>
          </div>
        )}

        {/* Section: Fees */}
        {activeSection === 'fees' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-rose-600" />
              Registration Fees
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                <div className="text-xs text-blue-600 font-semibold uppercase mb-1">
                  OC / BC / BCM / MBC &amp; DNC
                </div>
                <div className="text-3xl font-black text-blue-700 my-2">
                  ₹ 500
                </div>
                <div className="text-xs text-gray-500">per application</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 text-center">
                <div className="text-xs text-emerald-600 font-semibold uppercase mb-1">
                  SC / SCA / ST
                </div>
                <div className="text-3xl font-black text-emerald-700 my-2">
                  ₹ 250
                </div>
                <div className="text-xs text-gray-500">per application</div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700">
              <strong>Payment modes:</strong> Credit Card / Debit Card /
              Net-Banking / UPI, OR Demand Draft in favour of{' '}
              <em>"The Secretary, TNEA"</em> payable at Chennai.
            </div>
          </div>
        )}

        {/* Section: Documents */}
        {activeSection === 'documents' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              Documents to Upload
            </h3>
            <p className="text-xs text-gray-500">
              Keep digital scans ready before starting your application.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                '10th Standard Marksheet',
                'HSC First Year (+1) Marksheet',
                'HSC Second Year (+2) / Equivalent Marksheet',
                'Transfer Certificate',
                'Govt School details — 6th to 12th (for 7.5% quota)',
                'Permanent Community Certificate (SC/ST/MBC/BC/BCM)',
                'Nativity Certificate (if studied outside TN)',
                'Income Certificate (for scholarships, if applicable)',
                'First Graduate Certificate & Joint Declaration',
                'Sri Lankan Tamil Refugee Certificate (if applicable)',
                'Aadhaar Card / Aadhaar Number',
                'Ex-Servicemen / PwD / Sports certificates',
              ].map((doc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 rounded-lg p-2.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-lg p-3 text-xs text-rose-900">
              <strong>Important:</strong> Community / Nativity / First-Graduate
              certificates must be in <strong>permanent card OR digitally
              signed e-Certificate</strong> format. Certificates obtained{' '}
              <em>after</em> the last date of application will not be considered.
            </div>
          </div>
        )}

        {/* Section: Counselling */}
        {activeSection === 'counselling' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              Online Counselling — 4 Stages per Round
            </h3>

            <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Choice Filling
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  3 days to fill any number of college + branch choices, in
                  preference order. Order matters!
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Tentative Allotment
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  System allots a seat based on overall + community rank and the
                  eligible seat matrix.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Confirmation (within 2 days)
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Choose one: <em>Accept &amp; Join</em> | <em>Accept &amp; Upward</em> |{' '}
                  <em>Decline &amp; Upward</em> | <em>Decline &amp; Next Round</em> |{' '}
                  <em>Decline &amp; Quit</em>.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Reporting to College / TFC
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Report within 5 days, pay fees and submit original certificates.
                  7.5% Govt-School and First-Graduate candidates are fee-exempt.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-900">
              <strong>Upward Movement:</strong> "Accept &amp; Upward" keeps your
              current seat while you wait for a higher preference. If no better
              choice opens up, you stay with the current one. Failing to report
              or pay fees on time cancels the seat — and you cannot participate
              in further rounds.
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-900">
              <strong>Withdrawal refund:</strong> If you withdraw originals
              after deciding not to join the allotted college, 75% of fees paid
              at TFC will be refunded after the approval process.
            </div>
          </div>
        )}

        {/* Section: Concessions */}
        {activeSection === 'concessions' && (
          <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-600" />
              Fee Concessions &amp; Scholarships
            </h3>

            <div className="flex gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  7.5% Govt School — Full Fee Waiver
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Tuition + Hostel + Development fees fully paid by the State
                  for students admitted under the 7.5% Govt-school reservation
                  (G.O. 221/2021). Govt school study from 6th to 12th required.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  First Graduate Tuition Fee Concession
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  If no one in your family (parents, grandparents, siblings) has
                  a graduate degree, tuition fee is waived (G.O. 85/2010). Joint
                  declaration + e-Certificate from HQ Deputy Tahsildar required.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  AICTE Tuition Fee Waiver (TFW)
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Up to 5% seats per course in self-financing colleges. For
                  students with annual family income below ₹8 lakhs. Tuition
                  waived by college management (institution cannot be changed
                  afterwards).
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <IndianRupee className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Post-Matric Scholarship (SC / SCA / ST)
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  For SC / SCA / ST and SC/SCA-converted Christian candidates
                  with parental annual income below ₹2.5 lakhs. Income certificate
                  required at the college.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2 text-xs text-yellow-900">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-600" />
          <div>
            Information summarised from the{' '}
            <strong>Official TNEA 2026 Information Brochure</strong>. For the
            definitive rules, latest schedules and government orders, always
            refer to{' '}
            <a
              href="https://www.tneaonline.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              tneaonline.org
            </a>{' '}
            and{' '}
            <a
              href="https://www.dte.tn.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              dte.tn.gov.in
            </a>
            .
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TNEA2026BrochureInfo;
