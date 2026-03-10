import { useState, useEffect } from 'react';
import { CheckCircle, Circle, AlertTriangle, ChevronDown, RotateCcw, Shield, ExternalLink, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackerStep {
  id: string;
  title: string;
  titleTamil: string;
  description: string;
  deadline: string;
  consequence: string;
  link?: string;
  linkLabel?: string;
  critical?: boolean;
}

interface CounsellingTrackerData {
  id: string;
  name: string;
  nameTamil: string;
  icon: string;
  color: string;
  bg: string;
  steps: TrackerStep[];
}

const trackers: CounsellingTrackerData[] = [
  {
    id: 'tnea',
    name: 'TNEA Engineering',
    nameTamil: 'TNEA பொறியியல்',
    icon: '⚙️',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    steps: [
      { id: 'tnea-1', title: 'Register on tneaonline.org', titleTamil: 'tneaonline.org இல் பதிவு', description: 'Create account with email & mobile. Get User ID & password.', deadline: 'May 1st week – June 1st week 2026', consequence: 'Cannot participate in TNEA counselling at all. Zero chance of govt/aided engineering seat.', link: 'https://www.tneaonline.org', linkLabel: 'Go to TNEA' },
      { id: 'tnea-2', title: 'Fill Application Form', titleTamil: 'விண்ணப்பம் நிரப்பு', description: 'Enter personal details, school info, address, parent details. Save after each section.', deadline: 'Same as registration deadline', consequence: 'Registration is INCOMPLETE. You will NOT get a rank even if you registered.', critical: true },
      { id: 'tnea-3', title: 'Upload Photo & Signature', titleTamil: 'புகைப்படம் & கையொப்பம் பதிவேற்று', description: 'Photo (jpg, max 50KB), Signature (jpg, max 50KB). Follow exact size limits or it gets rejected.', deadline: 'Before registration deadline', consequence: 'Application rejected. Photo/signature mismatch = certificate verification failure.' },
      { id: 'tnea-4', title: 'Pay Registration Fee (₹500)', titleTamil: 'பதிவுக் கட்டணம் செலுத்து (₹500)', description: 'Pay online via net banking / credit / debit card. Save payment receipt / screenshot.', deadline: 'Before registration deadline', consequence: 'Application is treated as NOT SUBMITTED. Even if you filled everything, no payment = no application.', critical: true },
      { id: 'tnea-5', title: 'Upload Certificates', titleTamil: 'சான்றிதழ்களை பதிவேற்று', description: '12th marksheet, community certificate, income certificate, Aadhar, nativity proof, TC.', deadline: 'June 2nd–3rd week 2026', consequence: 'Cannot be verified. Without verification, you won\'t appear in the rank list.', critical: true },
      { id: 'tnea-6', title: 'Certificate Verification', titleTamil: 'சான்றிதழ் சரிபார்ப்பு', description: 'Mostly online. If discrepancy found, visit nearest TFC (TNEA Facilitation Centre) with originals.', deadline: 'June 3rd–4th week 2026', consequence: 'Unverified = No rank. If called to TFC and you don\'t attend = automatically rejected.' },
      { id: 'tnea-7', title: 'Check Rank List', titleTamil: 'தரவரிசை பட்டியல் சரிபார்', description: 'Login → Check your Overall Rank + Community Rank. Screenshot and save both. You need these for choice filling.', deadline: 'June last week 2026', consequence: 'No consequence for checking late, but knowing your rank helps you make better choices.' },
      { id: 'tnea-8', title: 'Pay Counselling Deposit (₹5,000)', titleTamil: 'கலந்தாய்வு வைப்புத்தொகை (₹5,000)', description: '₹5,000 (General) or ₹1,000 (SC/ST). This amount is adjusted against your college fees later.', deadline: 'Before your counselling round starts', consequence: 'CANNOT fill choices. Without deposit, the choice filling option won\'t even open for you.', critical: true },
      { id: 'tnea-9', title: 'Fill College & Branch Choices', titleTamil: 'கல்லூரி & பிரிவு விருப்பங்கள்', description: 'Add colleges + branches in order of your preference. Add at least 50–100 choices. There is NO limit — more = better chance.', deadline: '3–4 days per round (July 2026)', consequence: 'If you add too few choices and your cutoff doesn\'t match any of them, you get NO seat in that round. Add MORE.', critical: true },
      { id: 'tnea-10', title: 'LOCK Your Choices (OTP)', titleTamil: 'விருப்பங்களை LOCK செய் (OTP)', description: 'After filling all choices, click LOCK and verify with OTP sent to your mobile. Unlocked choices are NOT considered.', deadline: 'Round-specific (usually 1 day after choice filling ends)', consequence: '🚨 THIS IS HOW STUDENTS LOSE SEATS. If you fill 100 choices but forget to LOCK = you get ZERO seats. The system ignores unlocked choices.', critical: true },
      { id: 'tnea-11', title: 'Check Seat Allotment Result', titleTamil: 'இடம் ஒதுக்கீடு சரிபார்', description: 'Login → See which college/branch allotted. Options: Accept & Freeze, Accept & Float (try for better next round), Reject, or Quit.', deadline: '2–3 days after allotment result', consequence: 'If you don\'t respond within deadline, your seat is automatically cancelled and given to someone else.' },
      { id: 'tnea-12', title: 'Report to College & Pay Fees', titleTamil: 'கல்லூரிக்கு சேர் & கட்டணம்', description: 'Visit allotted college with ALL original documents. Pay full fees. Get admission slip.', deadline: '3–5 days after accepting allotment', consequence: 'Seat cancelled. College will give your seat to the next person in the waiting list. You lose everything.', critical: true },
    ],
  },
  {
    id: 'neet-tn',
    name: 'NEET TN Medical',
    nameTamil: 'NEET தமிழ்நாடு மருத்துவம்',
    icon: '🏥',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    steps: [
      { id: 'neet-1', title: 'Register on tnmedicalselection.net', titleTamil: 'tnmedicalselection.net இல் பதிவு', description: 'Create counselling account using your NEET roll number and personal details.', deadline: 'July 1st–3rd week 2026', consequence: 'Cannot participate in TN state medical counselling. Will miss all govt medical college seats.', link: 'https://tnmedicalselection.net', linkLabel: 'Go to TN Medical' },
      { id: 'neet-2', title: 'Fill Counselling Application', titleTamil: 'கலந்தாய்வு விண்ணப்பம்', description: 'Personal details, NEET score, 12th marks, category, nativity. Fill every field — incomplete forms are rejected.', deadline: 'Same as registration deadline', consequence: 'Incomplete application = not considered. Many students register but don\'t fill the full form. This is the #1 mistake.', critical: true },
      { id: 'neet-3', title: 'Upload All Certificates', titleTamil: 'சான்றிதழ்கள் பதிவேற்று', description: 'NEET scorecard, admit card, 12th marksheet, community cert, income cert, Aadhar, nativity proof, TC.', deadline: 'Before verification deadline', consequence: 'Missing even 1 document = verification failure = no rank = no seat.', critical: true },
      { id: 'neet-4', title: 'Pay Counselling Fee (₹500)', titleTamil: 'கலந்தாய்வு கட்டணம் (₹500)', description: '₹500 (General) / ₹250 (SC/ST). Must pay online. Save the receipt.', deadline: 'Before registration deadline', consequence: 'Unpaid application = NOT submitted. This is the exact mistake that causes students to lose medical seats.', critical: true },
      { id: 'neet-5', title: 'Attend Certificate Verification', titleTamil: 'சான்றிதழ் சரிபார்ப்பு', description: 'Visit designated centre ON YOUR SCHEDULED DATE with ALL originals. They check each document physically.', deadline: 'July last week 2026 (date assigned to you)', consequence: 'If you miss your date without rescheduling, you are removed from the process. No second chance in that round.' },
      { id: 'neet-6', title: 'Fill College & Course Choices', titleTamil: 'கல்லூரி & படிப்பு விருப்பங்கள்', description: 'Select MBBS, BDS, BAMS, BHMS, BSMS, Nursing, Pharmacy colleges. Add as many as possible in preference order.', deadline: 'August 1st week 2026 (round-specific)', consequence: 'Too few choices + high competition = no allotment. Add 30+ choices minimum.', critical: true },
      { id: 'neet-7', title: 'LOCK Choices Before Deadline', titleTamil: 'விருப்பங்களை LOCK செய்', description: 'Click LOCK after finalizing choices. Verify with OTP. Once locked, cannot change.', deadline: 'Round-specific (usually 1 day after filling ends)', consequence: '🚨 UNLOCKED choices = NOT considered. Even if you added 50 colleges, unlocked = ZERO. Lock it!', critical: true },
      { id: 'neet-8', title: 'Check Seat Allotment', titleTamil: 'இடம் ஒதுக்கீடு சரிபார்', description: 'Login → Check allotment. Accept / Reject / Wait for next round.', deadline: '2–3 days after result', consequence: 'No response = seat auto-cancelled. The system doesn\'t wait for you.' },
      { id: 'neet-9', title: 'Report to College & Pay Fees', titleTamil: 'கல்லூரிக்கு சேர்', description: 'Visit allotted college with ALL originals + fees. Get admission letter.', deadline: '3–5 days after accepting', consequence: 'Seat given to next person. Your NEET score, your effort — all wasted if you miss this deadline.', critical: true },
    ],
  },
  {
    id: 'josaa',
    name: 'JoSAA (IIT/NIT/IIIT)',
    nameTamil: 'JoSAA (IIT/NIT)',
    icon: '🎯',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    steps: [
      { id: 'josaa-1', title: 'Register on josaa.nic.in', titleTamil: 'josaa.nic.in இல் பதிவு', description: 'After JEE results are out, register with your JEE roll number.', deadline: 'June 2026 (within 1 week of results)', consequence: 'Cannot participate. Miss IIT/NIT/IIIT admission entirely.', link: 'https://josaa.nic.in', linkLabel: 'Go to JoSAA' },
      { id: 'josaa-2', title: 'Fill Personal & Academic Details', titleTamil: 'விவரங்கள் நிரப்பு', description: 'JEE score, 12th marks, category, contact info. Double-check everything.', deadline: 'Same as registration', consequence: 'Incomplete profile = can\'t proceed to choice filling.' },
      { id: 'josaa-3', title: 'Upload Documents', titleTamil: 'ஆவணங்கள் பதிவேற்று', description: 'JEE scorecard, 12th marksheet, category certificate, Aadhar, photo.', deadline: 'Before choice filling opens', consequence: 'Unverified documents = seat can be cancelled even after allotment.' },
      { id: 'josaa-4', title: 'Fill Choices (100+ recommended)', titleTamil: 'விருப்பங்கள் (100+ பரிந்துரை)', description: 'Add Institute + Branch combinations. There is NO limit. Add every combination you\'d be okay with.', deadline: 'June last week 2026 (round-specific)', consequence: 'Fewer choices = lower chance. Students who add 100+ choices get better results than those who add 20.', critical: true },
      { id: 'josaa-5', title: 'LOCK Choices', titleTamil: 'விருப்பங்களை LOCK செய்', description: 'Lock your preference order. After locking, you cannot edit.', deadline: '1 day after choice filling ends', consequence: '🚨 Unlocked choices = completely ignored by the system. You get nothing.', critical: true },
      { id: 'josaa-6', title: 'Check Round 1 Allotment', titleTamil: 'சுற்று 1 ஒதுக்கீடு', description: 'See result. Freeze = final. Float = keep this + try better in Round 2. Slide = try better branch in same institute.', deadline: '2 days after each round result', consequence: 'No response = seat forfeited. You must actively choose an option.' },
      { id: 'josaa-7', title: 'Pay Seat Acceptance Fee', titleTamil: 'இட ஏற்பு கட்டணம்', description: '₹20,000–45,000 depending on category. Refundable if you withdraw properly before deadline.', deadline: 'Within 2 days of accepting seat', consequence: 'Seat cancelled immediately. Someone else gets your IIT/NIT seat.', critical: true },
      { id: 'josaa-8', title: 'Document Verification at Reporting Centre', titleTamil: 'ஆவண சரிபார்ப்பு', description: 'Visit nearest reporting centre with ALL originals. They physically verify every document.', deadline: 'Within 3 days of allotment', consequence: 'If any document is missing or fake, seat cancelled + possible blacklisting from future JoSAA.', critical: true },
    ],
  },
  {
    id: 'tnau',
    name: 'TNAU Agriculture',
    nameTamil: 'TNAU வேளாண்மை',
    icon: '🌾',
    color: 'text-green-700',
    bg: 'bg-green-50',
    steps: [
      { id: 'tnau-1', title: 'Register on tnau.ac.in', titleTamil: 'tnau.ac.in இல் பதிவு', description: 'Create account and get login credentials.', deadline: 'June–July 2026', consequence: 'Cannot apply for any TNAU course.', link: 'https://www.tnau.ac.in', linkLabel: 'Go to TNAU' },
      { id: 'tnau-2', title: 'Fill Application & Upload Docs', titleTamil: 'விண்ணப்பம் & ஆவணங்கள்', description: '12th marks, community cert, Aadhar, photo. Fill every section completely.', deadline: 'July 2026', consequence: 'Incomplete application = rejected. Even if you registered, unfilled form = no merit rank.', critical: true },
      { id: 'tnau-3', title: 'Pay Application Fee (₹500)', titleTamil: 'விண்ணப்ப கட்டணம் (₹500)', description: '₹500 online payment. Save receipt.', deadline: 'Before application deadline', consequence: 'Unpaid = not submitted. Same mistake that loses seats in TNEA/NEET.', critical: true },
      { id: 'tnau-4', title: 'Check Merit List', titleTamil: 'தகுதிப் பட்டியல்', description: 'Rank based on 12th PCB marks (for B.Sc Agri) or PCM (for Agri Engineering).', deadline: 'July end 2026', consequence: 'No direct consequence, but check early to plan your choices.' },
      { id: 'tnau-5', title: 'Fill Course & Campus Choices', titleTamil: 'படிப்பு & வளாக விருப்பங்கள்', description: 'Select courses (Agriculture, Horticulture, Forestry, etc.) and campus preference (Coimbatore, Madurai, etc.).', deadline: 'August 2026', consequence: 'Too few choices = no allotment if competition is high. Add all campuses you\'re willing to go to.', critical: true },
      { id: 'tnau-6', title: 'Attend Counselling & Join', titleTamil: 'கலந்தாய்வு & சேர்க்கை', description: 'Join allotted college with originals + fees within deadline.', deadline: '3–5 days after allotment', consequence: 'Seat given to next student. One year wasted.' },
    ],
  },
];

const STORAGE_KEY = 'vzk_counselling_tracker';

export const CounsellingTracker = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleStep = (stepId: string) => {
    setChecked(prev => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetTracker = (trackerId: string) => {
    const tracker = trackers.find(t => t.id === trackerId);
    if (!tracker) return;
    setChecked(prev => {
      const next = { ...prev };
      tracker.steps.forEach(s => delete next[s.id]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const getProgress = (tracker: CounsellingTrackerData) => {
    const done = tracker.steps.filter(s => checked[s.id]).length;
    return { done, total: tracker.steps.length, percent: Math.round((done / tracker.steps.length) * 100) };
  };

  const getStatus = (tracker: CounsellingTrackerData) => {
    const { done, total } = getProgress(tracker);
    if (done === 0) return { label: 'Not Started', color: 'text-gray-500', bg: 'bg-gray-100' };
    if (done === total) return { label: 'Completed ✅', color: 'text-emerald-700', bg: 'bg-emerald-100' };
    return { label: `${total - done} steps remaining`, color: 'text-red-700', bg: 'bg-red-100' };
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Counselling Application Tracker</h3>
            <p className="text-xs text-red-200">கலந்தாய்வு விண்ணப்ப நிலை கண்காணிப்பான்</p>
          </div>
        </div>
        <div className="bg-white/15 rounded-xl p-3 mt-2">
          <p className="text-sm text-white leading-relaxed">
            ⚠️ <strong>Don't lose your seat!</strong> Tap each step after you complete it. Each step shows the <strong>deadline</strong> and <strong>what happens if you miss it</strong>.
          </p>
        </div>
      </div>

      {/* Trackers */}
      <div className="divide-y divide-gray-100">
        {trackers.map(tracker => {
          const isOpen = expanded === tracker.id;
          const progress = getProgress(tracker);
          const status = getStatus(tracker);

          return (
            <div key={tracker.id}>
              <button
                onClick={() => setExpanded(isOpen ? null : tracker.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-2xl flex-shrink-0">{tracker.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-gray-900">{tracker.name}</p>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", status.bg, status.color)}>{status.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{tracker.nameTamil}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", progress.percent === 100 ? "bg-emerald-500" : progress.percent > 0 ? "bg-amber-500" : "bg-gray-300")}
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-600">{progress.done}/{progress.total}</span>
                  </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  {/* Status banner */}
                  {progress.done > 0 && progress.done < progress.total && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-3 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-red-800">Application NOT Complete!</p>
                        <p className="text-xs text-red-600">{progress.total - progress.done} step{progress.total - progress.done > 1 ? 's' : ''} remaining. Your seat is NOT confirmed.</p>
                      </div>
                    </div>
                  )}
                  {progress.done === progress.total && (
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 mb-3 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-emerald-800">All Steps Completed! 🎉</p>
                        <p className="text-xs text-emerald-600">Your counselling application is fully done.</p>
                      </div>
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-2">
                    {tracker.steps.map((step, i) => {
                      const isDone = checked[step.id];
                      return (
                        <div
                          key={step.id}
                          className={cn(
                            "rounded-xl border-2 overflow-hidden transition-all",
                            isDone ? "border-emerald-200 bg-emerald-50/50" : step.critical ? "border-red-200 bg-red-50/30" : "border-gray-200 bg-gray-50/50"
                          )}
                        >
                          {/* Clickable header */}
                          <div
                            onClick={() => toggleStep(step.id)}
                            className="flex items-start gap-3 p-3 cursor-pointer hover:bg-white/50 active:scale-[0.99] transition-all"
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              {isDone ? (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <Circle className={cn("w-5 h-5", step.critical ? "text-red-400" : "text-gray-400")} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-gray-400">Step {i + 1}</span>
                                {step.critical && !isDone && (
                                  <span className="text-xs font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">⚠️ Critical</span>
                                )}
                              </div>
                              <p className={cn("text-sm font-bold mt-0.5", isDone ? "text-emerald-700 line-through" : "text-gray-900")}>{step.title}</p>
                              <p className={cn("text-xs", isDone ? "text-emerald-600" : "text-gray-500")}>{step.titleTamil}</p>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</p>
                              {step.link && !isDone && (
                                <a
                                  href={step.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 mt-1.5 hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" /> {step.linkLabel || 'Open Website'}
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Deadline + Consequence (only show if NOT done) */}
                          {!isDone && (
                            <div className="border-t border-gray-200 bg-white/70 px-3 py-2 space-y-1.5">
                              <div className="flex items-start gap-2">
                                <Clock className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-blue-800"><span className="font-bold">Deadline:</span> {step.deadline}</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-red-700"><span className="font-bold">If you miss this:</span> {step.consequence}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => resetTracker(tracker.id)}
                    className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:text-red-600 hover:border-red-200 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Tracker
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 bg-red-50 border-t border-red-200">
        <p className="text-xs text-red-600 text-center font-medium">
          ⚠️ Dates are tentative. Always verify from official websites. This tracker saves on your device only.
        </p>
      </div>
    </div>
  );
};
