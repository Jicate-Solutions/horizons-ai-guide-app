import type { Scholarship } from './types';

interface UserProfile {
  fullName: string;
  stream: string;
  board: string;
  percentage: string;
  schoolName: string;
  careerInterests: string[];
  preferredCourse: string;
  gender: string;        // 'male' | 'female' | 'other' | ''
  category: string;      // 'general' | 'sc' | 'st' | 'obc' | 'bc-mbc' | 'ews' | 'minority'
  familyIncome: string;  // 'below_1_lakh' | '1_2_lakh' | '2_3_lakh' | '3_5_lakh' | '5_8_lakh' | 'above_8_lakh' | ''
  state: string;
  isFirstGraduate: boolean;
  isRural: boolean;
}

interface ScholarshipRecommendation {
  scholarshipId: string;
  scholarshipName: string;
  matchPercentage: number;
  status: 'highly_eligible' | 'eligible' | 'partially_eligible' | 'not_eligible';
  metCriteria: string[];
  unmetCriteria: string[];
  applicationTip: string;
}

export interface EligibilityAnalysis {
  recommendations: ScholarshipRecommendation[];
  overallSummary: string;
  improvementTips: string[];
  topRecommendation: string;
}

const INCOME_VALUE: Record<string, number> = {
  below_1_lakh: 1,
  '1_2_lakh': 2,
  '2_3_lakh': 3,
  '3_5_lakh': 5,
  '5_8_lakh': 8,
  above_8_lakh: 12,
};

const INCOME_LABEL: Record<string, string> = {
  below_1_lakh: 'Below ₹1 Lakh',
  '1_2_lakh': '₹1 – 2 Lakh',
  '2_3_lakh': '₹2 – 3 Lakh',
  '3_5_lakh': '₹3 – 5 Lakh',
  '5_8_lakh': '₹5 – 8 Lakh',
  above_8_lakh: 'Above ₹8 Lakh',
};

/** Parse an "incomeLimit" string from the scholarship data into a lakh number. */
function parseIncomeLimit(limit?: string): number | null {
  if (!limit) return null;
  const m = limit.match(/([\d.]+)\s*(L|Lakh|lakh|Cr|cr|Crore)/);
  if (!m) {
    if (/no income limit/i.test(limit) || /no limit/i.test(limit)) return Infinity;
    return null;
  }
  const n = parseFloat(m[1]);
  const unit = m[2].toLowerCase();
  if (unit.startsWith('cr')) return n * 100;
  return n;
}

function scoreOne(p: UserProfile, s: Scholarship): ScholarshipRecommendation {
  const met: string[] = [];
  const unmet: string[] = [];

  // ---- Category --------------------------------------------------------
  const userCat = p.category;
  if (s.category && s.category.length) {
    if (s.category.includes(userCat)) {
      met.push(`Open to your community (${userCat.toUpperCase()})`);
    } else {
      unmet.push(`Targeted at ${s.category.map((c) => c.toUpperCase()).join(', ')} — not your community`);
    }
  }

  // ---- Gender ----------------------------------------------------------
  if (s.gender && s.gender !== 'all') {
    if (p.gender && p.gender === s.gender) {
      met.push(`Open to ${s.gender} students`);
    } else if (p.gender && p.gender !== s.gender) {
      unmet.push(`Only for ${s.gender} students`);
    }
  } else {
    met.push('Open to all genders');
  }

  // ---- Family income ---------------------------------------------------
  const limitLakh = parseIncomeLimit(s.incomeLimit);
  const userIncomeLakh = INCOME_VALUE[p.familyIncome];
  if (limitLakh !== null && userIncomeLakh !== undefined) {
    if (userIncomeLakh <= limitLakh) {
      met.push(
        limitLakh === Infinity
          ? 'No family income limit'
          : `Family income (${INCOME_LABEL[p.familyIncome]}) is within the ₹${limitLakh}L limit`,
      );
    } else {
      unmet.push(
        `Family income (${INCOME_LABEL[p.familyIncome]}) is above the ₹${limitLakh}L limit`,
      );
    }
  } else if (!s.incomeLimit || s.incomeLimit.toLowerCase().includes('no income')) {
    met.push('No family income limit');
  }

  // ---- State -----------------------------------------------------------
  if (s.state && s.state !== 'All India' && s.state.toLowerCase() !== 'india') {
    if (p.state && s.state.toLowerCase().includes(p.state.toLowerCase())) {
      met.push(`Applicable in your state (${p.state})`);
    } else if (p.state) {
      unmet.push(`State-specific to ${s.state} — you're in ${p.state}`);
    }
  } else {
    met.push('Available pan-India');
  }

  // ---- Education level -------------------------------------------------
  // Treat a 12th-passed learner as eligible for "12th-passed" and "ug" tracks.
  const userLevels = new Set(['12th-passed', '12th-studying', 'ug']);
  if (s.educationLevel && s.educationLevel.length) {
    const overlap = s.educationLevel.some((l) => userLevels.has(l));
    if (overlap) {
      met.push('Matches your education level (12th / starting UG)');
    } else {
      unmet.push(`For ${s.educationLevel.join(', ')} students — not your stage right now`);
    }
  }

  // ---- Soft bonuses ----------------------------------------------------
  const elig = (s.eligibility || []).join(' ').toLowerCase();
  if (p.isFirstGraduate && /first.?gen|first graduate/.test(elig)) {
    met.push('First-generation graduate bonus applies');
  }
  if (p.isRural && /rural|village/.test(elig)) {
    met.push('Rural-area bonus applies');
  }

  // ---- Percentage ------------------------------------------------------
  const pct = parseFloat(p.percentage);
  const pctReq = (s.eligibility || []).join(' ').match(/(\d{2,3})\s*%/);
  if (!isNaN(pct) && pctReq) {
    const need = parseInt(pctReq[1], 10);
    if (pct >= need) met.push(`Your ${pct}% meets the ${need}% requirement`);
    else unmet.push(`Needs ${need}%+ — you have ${pct}%`);
  }

  // ---- Score & status --------------------------------------------------
  const totalChecks = met.length + unmet.length || 1;
  const pctScore = Math.round((met.length / totalChecks) * 100);

  // Hard disqualifiers: wrong gender / above income limit / wrong state.
  const hardFails = unmet.filter(
    (u) =>
      u.includes('Only for') ||
      u.includes('above the') ||
      u.startsWith('State-specific'),
  );

  let status: ScholarshipRecommendation['status'];
  if (hardFails.length) status = 'not_eligible';
  else if (pctScore >= 85) status = 'highly_eligible';
  else if (pctScore >= 65) status = 'eligible';
  else status = 'partially_eligible';

  const tip = (() => {
    if (status === 'not_eligible') {
      return `This scholarship has a strict requirement you don't meet right now (${hardFails[0] || unmet[0]}). Skip it and focus on the others.`;
    }
    if (status === 'highly_eligible') {
      return `You're a strong fit. Apply via ${s.applicationUrl || 'the official portal'} before the deadline (${s.deadline}). Keep these documents ready: ${(s.documents || []).slice(0, 3).join(', ')}.`;
    }
    if (status === 'eligible') {
      return `You meet most criteria. Tighten your application — ${unmet[0] || 'check the fine print'}. Apply via ${s.applicationUrl || 'the official portal'}.`;
    }
    return `Possible match but a few gaps: ${unmet.slice(0, 2).join('; ')}. Worth a shot if the deadline gives you time.`;
  })();

  return {
    scholarshipId: s.id,
    scholarshipName: s.name,
    matchPercentage: hardFails.length ? Math.min(pctScore, 30) : pctScore,
    status,
    metCriteria: met,
    unmetCriteria: unmet,
    applicationTip: tip,
  };
}

/**
 * Pure-frontend eligibility analysis — no API, no edge function.
 * Used as a guaranteed fallback when the AI eligibility function is
 * unreachable, and works offline.
 */
export function analyseEligibilityLocally(
  profile: UserProfile,
  scholarships: Scholarship[],
): EligibilityAnalysis {
  const all = scholarships.map((s) => scoreOne(profile, s));

  // Sort: highly_eligible, eligible, partially_eligible, then not_eligible.
  const order: Record<ScholarshipRecommendation['status'], number> = {
    highly_eligible: 0,
    eligible: 1,
    partially_eligible: 2,
    not_eligible: 3,
  };
  all.sort(
    (a, b) => order[a.status] - order[b.status] || b.matchPercentage - a.matchPercentage,
  );

  const eligibleCount = all.filter(
    (r) => r.status === 'highly_eligible' || r.status === 'eligible',
  ).length;
  const partial = all.filter((r) => r.status === 'partially_eligible').length;

  const top = all[0];
  const topRecommendation = top
    ? `Start with ${top.scholarshipName} — it's your strongest match.`
    : '';

  const tips: string[] = [];
  if (!profile.percentage) tips.push('Add your 12th percentage — many scholarships have a marks cutoff.');
  if (!profile.gender) tips.push('Set your gender to surface gender-specific scholarships like Pudhumai Penn / Tamil Pudhalvan.');
  if (profile.familyIncome && INCOME_VALUE[profile.familyIncome] > 2)
    tips.push('Many top schemes need family income under ₹2L — gather your income certificate either way.');
  if (!profile.isFirstGraduate)
    tips.push('If anyone in your family is the first to attend college, check first-generation graduate schemes.');
  tips.push('Apply early — schemes like the National Means-cum-Merit Scholarship have limited seats.');

  return {
    recommendations: all,
    overallSummary: `Based on your profile, ${eligibleCount} scholarships are a strong fit and ${partial} more are partial matches you can still consider.`,
    improvementTips: tips.slice(0, 5),
    topRecommendation,
  };
}
