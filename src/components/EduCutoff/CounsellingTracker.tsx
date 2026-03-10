import { useState, useEffect } from 'react';
import { CheckCircle, Circle, AlertTriangle, ChevronDown, RotateCcw, Shield, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackerStep {
  id: string;
  title: string;
  titleTamil: string;
  description: string;
  deadline?: string;
  link?: string;
  linkLabel?: string;
  critical?: boolean; // Steps that students commonly miss
}

interface CounsellingTracker {
  id: string;
  name: string;
  nameTamil: string;
  icon: string;
  color: string;
  bg: string;
  steps: TrackerStep[];
}

const trackers: CounsellingTracker[] = [
  {
    id: 'tnea',
    name: 'TNEA Engineering',
    nameTamil: 'TNEA பொறியியல்',
    icon: '⚙️',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    steps: [
      { id: 'tnea-1', title: 'Register on tneaonline.org', titleTamil: 'tneaonline.org இல் பதிவு', description: 'Create account with email & mobile. Get User ID & password.', link: 'https://www.tneaonline.org', linkLabel: 'Go to TNEA' },
      { id: 'tnea-2', title: 'Fill Application Form', titleTamil: 'விண்ணப்பம் நிரப்பு', description: 'Enter personal details, school info, address, parent details.', critical: true },
      { id: 'tnea-3', title: 'Upload Photo & Signature', titleTamil: 'புகைப்படம் & கையொப்பம் பதிவேற்று', description: 'Photo (jpg, max 50KB), Signature (jpg, max 50KB). Follow size limits.' },
      { id: 'tnea-4', title: 'Pay Registration Fee (₹500)', titleTamil: 'பதிவுக் கட்டணம் செலுத்து (₹500)', description: 'Pay online via net banking / credit / debit card. Save receipt.', critical: true },
      { id: 'tnea-5', title: 'Upload Certificates', titleTamil: 'சான்றிதழ்களை பதிவேற்று', description: '12th marksheet, community certificate, income certificate, Aadhar, nativity proof.', critical: true },
      { id: 'tnea-6', title: 'Certificate Verification', titleTamil: 'சான்றிதழ் சரிபார்ப்பு', description: 'Online verification OR visit TFC (TNEA Facilitation Centre) if asked.' },
      { id: 'tnea-7', title: 'Check Rank List', titleTamil: 'தரவரிசை பட்டியல் சரிபார்', description: 'Login → Check your Overall Rank + Community Rank. Note it down.' },
      { id: 'tnea-8', title: 'Pay Counselling Deposit', titleTamil: 'கலந்தாய்வு வைப்புத்தொகை செலுத்து', description: '₹5,000 (General) or ₹1,000 (SC/ST). This is mandatory before choice filling.', critical: true },
      { id: 'tnea-9', title: 'Fill College & Branch Choices', titleTamil: 'கல்லூரி & பிரிவு விருப்பங்கள் நிரப்பு', description: 'Add colleges + branches in preference order. Add at least 50-100 choices. MORE IS BETTER.', critical: true },
      { id: 'tnea-10', title: 'LOCK Your Choices (OTP)', titleTamil: 'விருப்பங்களை LOCK செய் (OTP)', description: '⚠️ MOST IMPORTANT STEP! Unlock choices can be edited. But you MUST lock using OTP before deadline. Unlocked choices = NO seat!', critical: true },
      { id: 'tnea-11', title: 'Check Seat Allotment', titleTamil: 'இடம் ஒதுக்கீடு சரிபார்', description: 'Login → Check if seat allotted. Options: Accept (Freeze), Accept (Float for better), Reject, Quit.' },
      { id: 'tnea-12', title: 'Report to College & Pay Fees', titleTamil: 'கல்லூரிக்கு சேரவும் & கட்டணம் செலுத்தவும்', description: 'Visit allotted college with ALL original documents. Pay full fees. Get admission confirmed.', critical: true },
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
      { id: 'neet-1', title: 'Register on tnmedicalselection.net', titleTamil: 'tnmedicalselection.net இல் பதிவு', description: 'Create counselling account with NEET roll number.', link: 'https://tnmedicalselection.net', linkLabel: 'Go to TN Medical' },
      { id: 'neet-2', title: 'Fill Counselling Application', titleTamil: 'கலந்தாய்வு விண்ணப்பம் நிரப்பு', description: 'Personal details, NEET score, 12th marks, category details.', critical: true },
      { id: 'neet-3', title: 'Upload All Certificates', titleTamil: 'அனைத்து சான்றிதழ்களை பதிவேற்று', description: 'NEET scorecard, 12th marksheet, community cert, income cert, Aadhar, TC.', critical: true },
      { id: 'neet-4', title: 'Pay Counselling Fee', titleTamil: 'கலந்தாய்வு கட்டணம் செலுத்து', description: '₹500 (General) / ₹250 (SC/ST). Without payment, application is INCOMPLETE.', critical: true },
      { id: 'neet-5', title: 'Attend Certificate Verification', titleTamil: 'சான்றிதழ் சரிபார்ப்பு கலந்துகொள்', description: 'Visit designated centre with ALL originals on your scheduled date.' },
      { id: 'neet-6', title: 'Fill College & Course Choices', titleTamil: 'கல்லூரி & படிப்பு விருப்பங்கள்', description: 'Select MBBS/BDS/BAMS/Nursing colleges in preference order.', critical: true },
      { id: 'neet-7', title: 'LOCK Choices Before Deadline', titleTamil: 'விருப்பங்களை LOCK செய்', description: '⚠️ If you don\'t lock, your choices WON\'T be considered. Lock = Final.', critical: true },
      { id: 'neet-8', title: 'Check Seat Allotment', titleTamil: 'இடம் ஒதுக்கீடு சரிபார்', description: 'Accept / Reject / Wait for next round.' },
      { id: 'neet-9', title: 'Report to College & Pay Fees', titleTamil: 'கல்லூரிக்கு சேர்', description: 'Join with originals + pay fees within deadline.', critical: true },
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
      { id: 'josaa-1', title: 'Register on josaa.nic.in', titleTamil: 'josaa.nic.in இல் பதிவு', description: 'After JEE results, register with JEE roll number.', link: 'https://josaa.nic.in', linkLabel: 'Go to JoSAA' },
      { id: 'josaa-2', title: 'Fill Personal & Academic Details', titleTamil: 'தனிப்பட்ட & கல்வி விவரங்கள்', description: 'JEE score, 12th marks, category, contact info.' },
      { id: 'josaa-3', title: 'Upload Documents', titleTamil: 'ஆவணங்கள் பதிவேற்று', description: 'JEE scorecard, 12th marksheet, category certificate, Aadhar.' },
      { id: 'josaa-4', title: 'Fill Choices (100+ recommended)', titleTamil: 'விருப்பங்கள் நிரப்பு (100+ பரிந்துரை)', description: 'Add Institute + Branch combinations. More choices = better chance.', critical: true },
      { id: 'josaa-5', title: 'LOCK Choices', titleTamil: 'விருப்பங்களை LOCK செய்', description: '⚠️ Lock before deadline! Unlocked = Not considered.', critical: true },
      { id: 'josaa-6', title: 'Check Round 1 Allotment', titleTamil: 'சுற்று 1 ஒதுக்கீடு', description: 'Options: Freeze / Float / Slide / Reject. Float = try for better next round.' },
      { id: 'josaa-7', title: 'Pay Seat Acceptance Fee', titleTamil: 'இட ஏற்பு கட்டணம்', description: '₹20,000–45,000 (refundable if you withdraw before deadline).', critical: true },
      { id: 'josaa-8', title: 'Document Verification at Reporting Centre', titleTamil: 'அறிக்கை மையத்தில் ஆவண சரிபார்ப்பு', description: 'Visit with ALL originals. If documents rejected = seat cancelled.', critical: true },
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
      { id: 'tnau-1', title: 'Register on tnau.ac.in', titleTamil: 'tnau.ac.in இல் பதிவு', description: 'Create account, get login credentials.', link: 'https://www.tnau.ac.in', linkLabel: 'Go to TNAU' },
      { id: 'tnau-2', title: 'Fill Application & Upload Docs', titleTamil: 'விண்ணப்பம் & ஆவணங்கள்', description: '12th marks, community cert, Aadhar, photo.', critical: true },
      { id: 'tnau-3', title: 'Pay Application Fee', titleTamil: 'விண்ணப்ப கட்டணம்', description: '₹500 online payment.', critical: true },
      { id: 'tnau-4', title: 'Check Merit List', titleTamil: 'தகுதிப் பட்டியல்', description: 'Rank based on 12th PCB/PCM marks.' },
      { id: 'tnau-5', title: 'Fill Course & Campus Choices', titleTamil: 'படிப்பு & வளாக விருப்பங்கள்', description: 'Select courses (Agriculture, Horticulture, etc.) and campus preference.', critical: true },
      { id: 'tnau-6', title: 'Attend Counselling & Join', titleTamil: 'கலந்தாய்வு & சேர்க்கை', description: 'Join allotted college with originals + fees.' },
    ],
  },
];

const STORAGE_KEY = 'vzk_counselling_tracker';

export const CounsellingTracker = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage
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

  const getProgress = (tracker: CounsellingTracker) => {
    const done = tracker.steps.filter(s => checked[s.id]).length;
    return { done, total: tracker.steps.length, percent: Math.round((done / tracker.steps.length) * 100) };
  };

  const getStatus = (tracker: CounsellingTracker) => {
    const { done, total } = getProgress(tracker);
    if (done === 0) return { label: 'Not Started', labelTamil: 'தொடங்கவில்லை', color: 'text-gray-500', bg: 'bg-gray-100', dot: 'bg-gray-400' };
    if (done === total) return { label: 'Completed ✅', labelTamil: 'நிறைவடைந்தது ✅', color: 'text-emerald-700', bg: 'bg-emerald-100', dot: 'bg-emerald-500' };
    // Check if any critical step is missed
    const missedCritical = tracker.steps.some(s => s.critical && !checked[s.id] && tracker.steps.indexOf(s) < tracker.steps.findIndex(x => checked[x.id] === false));
    if (missedCritical) return { label: '⚠️ Incomplete — Critical Steps Missing', labelTamil: '⚠️ முடிக்கப்படவில்லை', color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500' };
    return { label: 'In Progress', labelTamil: 'நடந்து கொண்டிருக்கிறது', color: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-500' };
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
            ⚠️ <strong>Don't lose your seat!</strong> Many students think creating a counselling ID = application complete. Use this tracker to make sure you haven't missed any step.
          </p>
          <p className="text-xs text-red-200 mt-1">
            ⚠️ <strong>உங்கள் இடத்தை இழக்காதீர்கள்!</strong> ஒவ்வொரு படிநிலையும் முடிந்ததா என்று சரிபார்க்கவும்.
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
              {/* Tracker Header */}
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
                  {/* Progress bar */}
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

              {/* Steps Checklist */}
              {isOpen && (
                <div className="px-4 pb-4">
                  {/* Warning if incomplete */}
                  {progress.done > 0 && progress.done < progress.total && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-3 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-red-800">Application NOT Complete!</p>
                        <p className="text-xs text-red-600">{progress.total - progress.done} step{progress.total - progress.done > 1 ? 's' : ''} remaining. Your seat is NOT confirmed until ALL steps are done.</p>
                        <p className="text-xs text-red-600 mt-0.5">உங்கள் விண்ணப்பம் முழுமையாகவில்லை! {progress.total - progress.done} படிநிலைகள் மீதமுள்ளன.</p>
                      </div>
                    </div>
                  )}

                  {/* Completed message */}
                  {progress.done === progress.total && (
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 mb-3 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-emerald-800">All Steps Completed! 🎉</p>
                        <p className="text-xs text-emerald-600">Your counselling application is fully complete. Wait for seat allotment.</p>
                      </div>
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-1">
                    {tracker.steps.map((step, i) => {
                      const isDone = checked[step.id];
                      return (
                        <div
                          key={step.id}
                          onClick={() => toggleStep(step.id)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all",
                            isDone ? "bg-emerald-50 border border-emerald-200" : step.critical ? "bg-red-50/50 border border-red-200" : "bg-gray-50 border border-gray-200",
                            "hover:shadow-md active:scale-[0.99]"
                          )}
                        >
                          {/* Checkbox */}
                          <div className="mt-0.5 flex-shrink-0">
                            {isDone ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className={cn("w-5 h-5", step.critical ? "text-red-400" : "text-gray-400")} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-gray-400">Step {i + 1}</span>
                              {step.critical && !isDone && (
                                <span className="text-xs font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">⚠️ Critical</span>
                              )}
                            </div>
                            <p className={cn("text-sm font-bold mt-0.5", isDone ? "text-emerald-700 line-through" : "text-gray-900")}>{step.title}</p>
                            <p className={cn("text-xs mt-0.5", isDone ? "text-emerald-600" : "text-gray-500")}>{step.titleTamil}</p>
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
                      );
                    })}
                  </div>

                  {/* Reset button */}
                  <button
                    onClick={() => resetTracker(tracker.id)}
                    className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:text-red-600 hover:border-red-200 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset This Tracker
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-red-50 border-t border-red-200">
        <p className="text-xs text-red-600 text-center font-medium">
          ⚠️ This tracker is for your personal reference. Always verify deadlines and requirements from official counselling websites.
        </p>
      </div>
    </div>
  );
};
