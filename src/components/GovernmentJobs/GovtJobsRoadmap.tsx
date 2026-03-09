import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle2, ArrowDown, Clock, BookOpen, FileText, Users, Dumbbell, FolderCheck, Stethoscope, PartyPopper, GraduationCap, Star, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props { ta: boolean; }

const WRITTEN_EXAMS = {
  central: [
    { name: 'SSC CHSL', ta: 'SSC CHSL', role: 'LDC, DEO, PA/SA', salary: '₹25K–81K', months: '4-6', hasPhysical: false },
    { name: 'SSC MTS', ta: 'SSC MTS', role: 'Multi Tasking Staff', salary: '₹18K–56K', months: '3-4', hasPhysical: false },
    { name: 'SSC GD Constable', ta: 'SSC GD', role: 'CAPFs Constable', salary: '₹21K–69K', months: '4-6', hasPhysical: true },
    { name: 'SSC Stenographer', ta: 'SSC ஸ்டெனோ', role: 'Steno Grade C & D', salary: '₹25K–81K', months: '5-6', hasPhysical: false },
    { name: 'RRB NTPC', ta: 'RRB NTPC', role: 'Station Master, Clerk', salary: '₹35K–1.1L', months: '5-8', hasPhysical: false },
    { name: 'RRB Group D', ta: 'RRB குரூப் D', role: 'Track Maintainer, Helper', salary: '₹18K–56K', months: '3-5', hasPhysical: true },
    { name: 'RPF Constable', ta: 'RPF காவலர்', role: 'Railway Protection Force', salary: '₹21K–69K', months: '4-6', hasPhysical: true },
    { name: 'NVS Lab Attendant', ta: 'NVS ஆய்வக', role: 'Lab Attendant (JNV)', salary: '₹18K–57K', months: '3-4', hasPhysical: false },
    { name: 'KVS Non-Teaching', ta: 'KVS பயிற்றா', role: 'JSA, Steno, Lab', salary: '₹18K–57K', months: '3-4', hasPhysical: false },
  ],
  state: [
    { name: 'TNPSC Group 4 / VAO', ta: 'TNPSC குரூப் 4', role: 'VAO, Jr Asst, Typist', salary: '₹19K–62K', months: '3-6', hasPhysical: false },
    { name: 'TN Police Constable', ta: 'TN போலீஸ்', role: 'Constable, Jail Warder', salary: '₹22K–70K', months: '4-6', hasPhysical: true },
    { name: 'TN Forest Guard', ta: 'TN வனக் காவலர்', role: 'Forest Guard (TNFUSRC)', salary: '₹20K–63K', months: '4-6', hasPhysical: true },
  ],
  defence: [
    { name: 'NDA', ta: 'NDA', role: 'Army/Navy/Air Force Officer', salary: '₹56K+', months: '6-12', hasPhysical: true },
    { name: 'Agniveer Army', ta: 'அக்னிவீர் ராணுவம்', role: 'GD, Technical, Clerk', salary: '₹30K–40K', months: '3-4', hasPhysical: true },
    { name: 'Agniveer Navy', ta: 'நேவி', role: 'SSR / MR', salary: '₹30K', months: '3-4', hasPhysical: true },
    { name: 'Agniveer Air Force', ta: 'விமானப்படை', role: 'Group X & Y', salary: '₹30K', months: '3-4', hasPhysical: true },
    { name: 'Coast Guard', ta: 'கடலோர காவல்', role: 'Navik GD / DB', salary: '₹21K–69K', months: '3-4', hasPhysical: true },
    { name: 'BSF Constable', ta: 'BSF', role: 'Border Security Force', salary: '₹23K–69K', months: '3-5', hasPhysical: true },
    { name: 'CRPF Constable', ta: 'CRPF', role: 'Central Reserve Police', salary: '₹23K–69K', months: '3-5', hasPhysical: true },
  ],
};

const MERIT_EXAMS = [
  { name: 'India Post GDS', ta: 'இந்திய தபால் GDS', role: 'Branch Postmaster, Dak Sevak', salary: '₹10K–29K', basis: '10th marks', icon: '📮' },
  { name: 'Railway Apprentice', ta: 'ரயில்வே பயிற்சி', role: 'Fitter, Electrician, Welder', salary: '₹7K–12K', basis: '10th + ITI avg', icon: '🔧' },
  { name: 'FCI Watchman', ta: 'FCI காவலர்', role: 'Watchman (Category IV)', salary: '₹23K–64K', basis: 'Written + PET', icon: '🏭' },
];

const STEPS = [
  { num: 1, icon: GraduationCap, title: 'Finish 12th / 10th', ta: '12 / 10ஆம் வகுப்பு முடி', desc: 'Score well — some exams need 50-60%', descTa: 'நல்ல மதிப்பெண் — சிலவற்றுக்கு 50-60%', color: 'from-slate-600 to-slate-700', time: 'Start' },
  { num: 2, icon: BookOpen, title: 'Pick Your Exam', ta: 'தேர்வைத் தேர்ந்தெடு', desc: 'Written or Merit? Central, State, or Defence?', descTa: 'எழுத்துத் தேர்வா? தகுதியா? மத்திய/மாநில/பாதுகாப்பு?', color: 'from-blue-500 to-blue-600', time: '1 week' },
  { num: 3, icon: Info, title: 'Check Eligibility', ta: 'தகுதி சரிபார்', desc: 'Age, education, physical standards, relaxations', descTa: 'வயது, கல்வி, உடல் தகுதி, தளர்வுகள்', color: 'from-violet-500 to-violet-600', time: 'Quick' },
  { num: 4, icon: FileText, title: 'Apply Online', ta: 'ஆன்லைன் விண்ணப்பம்', desc: 'Register → Upload photo & docs → Pay fee', descTa: 'பதிவு → புகைப்படம் & ஆவணங்கள் → கட்டணம்', color: 'from-amber-500 to-amber-600', time: '1-2 hrs' },
  { num: 5, icon: Zap, title: 'Prepare & Practice', ta: 'படிக்கவும் பயிற்சி செய்', desc: 'Syllabus → PYQs → Mock tests → 3–6 months', descTa: 'பாடம் → PYQ → மாதிரி → 3–6 மாதம்', color: 'from-rose-500 to-rose-600', time: '3-6 mo' },
  { num: 6, icon: Star, title: 'Clear the Exam', ta: 'தேர்வில் வெற்றி', desc: 'Score above cutoff → Shortlisted', descTa: 'கட்-ஆஃப் மதிப்பெண் → தேர்வு', color: 'from-indigo-500 to-indigo-600', time: 'D-Day' },
  { num: 7, icon: Dumbbell, title: 'Physical & Skills', ta: 'உடல் & திறன் தேர்வு', desc: 'Running, height (police/defence) · Typing (SSC)', descTa: 'ஓட்டம், உயரம் (போலீஸ்) · தட்டச்சு (SSC)', color: 'from-teal-500 to-teal-600', time: '1-2 days' },
  { num: 8, icon: FolderCheck, title: 'Document Verification', ta: 'ஆவண சரிபார்ப்பு', desc: 'Originals: marksheet, ID, caste, photo', descTa: 'மார்க்ஷீட், அடையாளம், சாதி, புகைப்படம்', color: 'from-cyan-500 to-cyan-600', time: '1 day' },
  { num: 9, icon: Stethoscope, title: 'Medical & Joining', ta: 'மருத்துவம் & சேர்க்கை', desc: 'Medical fitness → Appointment letter → Join! 🎉', descTa: 'மருத்துவம் → நியமனம் → பணி! 🎉', color: 'from-emerald-500 to-emerald-600', time: 'Final!' },
];

export const GovtJobsRoadmap = ({ ta }: Props) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');
  const [selectedExamType, setSelectedExamType] = useState<'central' | 'state' | 'defence'>('central');
  const toggle = (id: string) => setExpandedSection(prev => prev === id ? null : id);

  return (
    <div className="space-y-4">

      {/* ═══ SECTION 1: THE BIG PICTURE ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button onClick={() => toggle('overview')} className="w-full p-4 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-md">🗺️</div>
          <div className="flex-1">
            <p className="font-extrabold text-slate-800 text-sm">{ta ? 'பெரிய படம் — அரசு வேலை எப்படி?' : 'The Big Picture — How to Get a Govt Job?'}</p>
            <p className="text-xs text-slate-500 mt-0.5">{ta ? '2 பாதைகள் — எது உனக்கு சரி?' : '2 clear paths — which one suits you?'}</p>
          </div>
          {expandedSection === 'overview' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </button>

        <AnimatePresence>
          {expandedSection === 'overview' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="px-4 pb-5 space-y-4">
                {/* START */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-5 py-2.5 rounded-2xl shadow-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    <div><p className="font-extrabold text-sm">🎓 {ta ? 'நீ 12ஆம் வகுப்பு முடித்தாய்' : 'You Passed 12th'}</p><p className="text-xs text-slate-400">{ta ? 'பயணம் தொடங்குகிறது!' : 'Your journey begins!'}</p></div>
                  </div>
                </div>
                <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>

                {/* TWO PATHS */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-white p-3.5 space-y-2.5">
                    <div className="text-center">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">📝 {ta ? 'பாதை 1' : 'PATH 1'}</span>
                      <p className="font-extrabold text-blue-800 text-sm mt-1.5">{ta ? 'எழுத்துத் தேர்வு' : 'Written Exam'}</p>
                    </div>
                    <div className="space-y-1 text-xs">
                      {[
                        { e: '🇮🇳', l: ta ? 'மத்திய' : 'Central', s: 'SSC, Railway, NVS' },
                        { e: '🏛️', l: ta ? 'மாநிலம்' : 'TN State', s: 'TNPSC, Police, Forest' },
                        { e: '🎖️', l: ta ? 'பாதுகாப்பு' : 'Defence', s: 'NDA, Agniveer, BSF' },
                      ].map(r => (
                        <div key={r.l} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-blue-100">
                          <span>{r.e}</span><div><p className="font-bold text-blue-800">{r.l}</p><p className="text-blue-500">{r.s}</p></div>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-xs font-bold text-blue-600">22 {ta ? 'தேர்வுகள்' : 'exams'}</p>
                  </div>

                  <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-3.5 space-y-2.5">
                    <div className="text-center">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">🏆 {ta ? 'பாதை 2' : 'PATH 2'}</span>
                      <p className="font-extrabold text-emerald-800 text-sm mt-1.5">{ta ? 'தேர்வு இல்லை!' : 'No Exam!'}</p>
                    </div>
                    <div className="space-y-1 text-xs">
                      {MERIT_EXAMS.map(e => (
                        <div key={e.name} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-emerald-100">
                          <span>{e.icon}</span><div className="min-w-0"><p className="font-bold text-emerald-800 truncate">{ta ? e.ta : e.name}</p><p className="text-emerald-500 truncate">{e.basis}</p></div>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-xs font-bold text-emerald-600">{ta ? 'நேரடி தேர்வு!' : 'Direct selection!'}</p>
                  </div>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-slate-300" /></div>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-2xl shadow-lg flex items-center gap-2">
                    <PartyPopper className="w-5 h-5" />
                    <div><p className="font-extrabold text-sm">🎉 {ta ? 'அரசு வேலை!' : 'Govt Job Secured!'}</p><p className="text-xs text-emerald-200">{ta ? 'சம்பளம் + ஓய்வூதியம் + பாதுகாப்பு' : 'Salary + Pension + Lifetime Security'}</p></div>
                  </div>
                </div>

                {/* Key facts */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { i: '💰', t: ta ? '₹18K–₹1L+/மாதம்' : '₹18K–₹1L+/mo', l: ta ? 'சம்பளம்' : 'Salary' },
                    { i: '📜', t: ta ? 'பட்டம் வேண்டாம்' : 'No degree needed', l: ta ? 'தகுதி' : 'Eligibility' },
                    { i: '🔄', t: ta ? 'ஒவ்வொரு ஆண்டும்' : 'Every year', l: ta ? 'தேர்வு' : 'Exams repeat' },
                    { i: '🛡️', t: ta ? 'ஓய்வூதியம்+மருத்துவம்' : 'Pension+Medical', l: ta ? 'நன்மைகள்' : 'Benefits' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-amber-50 rounded-xl p-2.5 border border-amber-100">
                      <span className="text-lg">{f.i}</span><div><p className="text-xs font-bold text-amber-800">{f.l}</p><p className="text-xs text-amber-700">{f.t}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ SECTION 2: WRITTEN EXAM JOBS ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button onClick={() => toggle('written')} className="w-full p-4 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-md">📝</div>
          <div className="flex-1">
            <p className="font-extrabold text-slate-800 text-sm">{ta ? 'எழுத்துத் தேர்வு வேலைகள்' : 'Written Exam Jobs'} — 22</p>
            <p className="text-xs text-slate-500 mt-0.5">{ta ? 'சம்பளம், தயாரிப்பு நேரம், தேர்வு வகை' : 'Salary, prep time, physical test indicator'}</p>
          </div>
          {expandedSection === 'written' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </button>
        <AnimatePresence>
          {expandedSection === 'written' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="px-4 pb-4 space-y-3">
                <div className="flex gap-2">
                  {([
                    { id: 'central' as const, l: '🇮🇳 Central', t: '🇮🇳 மத்திய', c: WRITTEN_EXAMS.central.length, ac: 'bg-amber-500 text-white border-amber-500' },
                    { id: 'state' as const, l: '🏛️ TN State', t: '🏛️ மாநிலம்', c: WRITTEN_EXAMS.state.length, ac: 'bg-rose-500 text-white border-rose-500' },
                    { id: 'defence' as const, l: '🎖️ Defence', t: '🎖️ பாதுகாப்பு', c: WRITTEN_EXAMS.defence.length, ac: 'bg-emerald-600 text-white border-emerald-600' },
                  ]).map(t => (
                    <button key={t.id} onClick={() => setSelectedExamType(t.id)} className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border", selectedExamType === t.id ? t.ac : 'bg-white text-slate-600 border-slate-200')}>
                      {ta ? t.t : t.l} ({t.c})
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {WRITTEN_EXAMS[selectedExamType].map((e, i) => (
                    <motion.div key={e.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800">{ta ? e.ta : e.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{e.role}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {e.hasPhysical && <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold">💪</span>}
                        <div className="text-right">
                          <p className="text-xs font-bold text-emerald-600">{e.salary}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-0.5 justify-end"><Clock className="w-2.5 h-2.5" /> {e.months}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-100">
                  <span>💪 = Physical test</span><span><Clock className="w-3 h-3 inline" /> = Prep time</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ SECTION 3: MERIT JOBS ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button onClick={() => toggle('merit')} className="w-full p-4 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-md">🏆</div>
          <div className="flex-1">
            <p className="font-extrabold text-slate-800 text-sm">{ta ? 'தேர்வு இல்லா வேலைகள்' : 'No-Exam Jobs — Merit Based'}</p>
            <p className="text-xs text-slate-500 mt-0.5">{ta ? 'மதிப்பெண் = தகுதி. தேர்வு வேண்டாம்!' : 'Your marks = your merit. No exam stress!'}</p>
          </div>
          {expandedSection === 'merit' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </button>
        <AnimatePresence>
          {expandedSection === 'merit' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="px-4 pb-4 space-y-2.5">
                {MERIT_EXAMS.map((e, i) => (
                  <motion.div key={e.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{e.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-emerald-800">{ta ? e.ta : e.name}</p>
                        <p className="text-xs text-emerald-600 mt-0.5">{e.role}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-bold text-emerald-700">💰 {e.salary}</span>
                          <span className="text-xs text-emerald-600">📊 {e.basis}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800 leading-snug">{ta ? '💡 India Post GDS-க்கு 10ஆம் மதிப்பெண் மட்டும்! Railway Apprentice-க்கு 10ஆம் + ITI சராசரி.' : '💡 GDS = 10th marks only! Apprentice = 10th + ITI average. No exam!'}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ SECTION 4: 9-STEP JOURNEY ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button onClick={() => toggle('journey')} className="w-full p-4 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-lg shadow-md">🚀</div>
          <div className="flex-1">
            <p className="font-extrabold text-slate-800 text-sm">{ta ? 'முழு பயணம் — 9 படிகள்' : 'Complete Journey — 9 Steps'}</p>
            <p className="text-xs text-slate-500 mt-0.5">{ta ? '12ஆம் வகுப்பு → அரசு வேலை' : '12th Pass → Govt Job Secured'}</p>
          </div>
          {expandedSection === 'journey' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </button>
        <AnimatePresence>
          {expandedSection === 'journey' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="p-4">
                <div className="relative">
                  <div className="absolute left-5 top-7 bottom-12 w-0.5 bg-gradient-to-b from-slate-300 via-blue-300 via-rose-300 to-emerald-400 rounded-full" />
                  <div className="space-y-1">
                    {STEPS.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.div key={s.num} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="relative flex items-start gap-3 py-2">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 z-10 shadow-md bg-gradient-to-br", s.color)}>{s.num}</div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Icon className="w-3.5 h-3.5 text-slate-500" />
                              <p className="text-sm font-bold text-slate-800">{ta ? s.ta : s.title}</p>
                              <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{s.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{ta ? s.descTa : s.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl">🎉</div>
                      <div><p className="font-extrabold text-base">{ta ? 'அரசு வேலை பெற்றது!' : 'Govt Job Secured!'}</p><p className="text-xs text-emerald-100 mt-0.5">💰 {ta ? 'சம்பளம்' : 'Salary'} • 🏠 {ta ? 'வீடு' : 'Housing'} • 🏥 {ta ? 'மருத்துவம்' : 'Medical'} • 💼 {ta ? 'ஓய்வூதியம்' : 'Pension'} • 🛡️ {ta ? 'பாதுகாப்பு' : 'Security'}</p></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
