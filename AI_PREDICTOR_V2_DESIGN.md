# AI Career Predictor v2 — Design Document

**Status:** v1 launch scope — schema and engine shipped (commit pending);
UI wiring is the next step after content review.
**Scope:** Course selection for 12th-standard students. Nothing else.
**Owner:** VAZHIKATTI engineering.

> ### What changed from the first draft
>
> The first draft of this doc included an objective aptitude quiz
> (5 dimensions, 30-question pool, ±20 STEM weighting). After review,
> the team rejected it. A 12th student usually does not *know* their
> analytical aptitude, and asking them to "prove" they belong in CSE
> via a 90-second puzzle is the wrong question for a course-choice tool.
> The right question is what they will enjoy, what they can afford, what
> their marks qualify them for, and what would burn them out.
>
> v1 therefore relies on **five signals only**: stream eligibility,
> interests, priorities, budget/marks, and aversions. The quiz pool,
> the `SkillDimension` type, the `ObjectiveScores` field on the profile,
> and the STEM weighting branch are removed from the engine.

---

## 1. Guiding principles

1. **Don't make the working flow worse for students who don't need extra friction.** The current 8-step predictor stays the default. The aversion check only triggers when the answers look incoherent — confidence-gated, never mandatory.
2. **Constraints are filters, not penalties.** Aversions, budget mismatches, and percentage cutoffs *remove* options rather than just lowering the score. A student who hates desks shouldn't see a desk job at 72% match.
3. **Editorial data, not generated data.** Aversion-to-course mappings, pivot pathways and automation tags are curated tables that counsellors can audit. We don't let an LLM hallucinate alternatives like "B.Sc. Underwater Robotics" that don't exist locally.

---

## 2. The unified UserProfile schema

A single typed object that flows through every step. New fields are optional, so the existing 8-step state shape fits unchanged inside `self`.

```ts
// src/data/predictor/types.ts — already in repo

export type LangCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml' | 'bn' | 'mr' | 'gu' | 'pa';

/** Localised copy: translation key + English fallback. */
export interface Localised { key: string; en: string; }

// ── Self-reported (the existing 8-step flow) ────────────────────────
export interface SelfReported {
  stream: Stream | '';
  percentage: number | null;
  interests: string[];          // interest card IDs
  priorities: Priority[];
  budgetINR: { min: number; max: number } | null;
  durationYears: number | null;
}

// ── Behavioural signals (aversion swipe) ────────────────────────────
export type AversionTag =
  | 'sitting_long' | 'public_speaking' | 'memorisation' | 'maths_heavy'
  | 'lab_practical' | 'shift_work' | 'field_outdoor' | 'patient_care'
  | 'creative_pressure' | 'high_competition' | 'paperwork' | 'sales_persuasion';

export interface BehaviouralSignals {
  aversions: AversionTag[];
  burnoutNote?: string;
}

// ── Real-world constraints ──────────────────────────────────────────
export interface Constraints {
  maxBudgetLakh: number | null;
  relocate: 'any' | 'within_state' | 'home_only' | null;
  supportYears: number | null;
}

// ── Confidence ──────────────────────────────────────────────────────
export interface ConfidenceReport {
  overall: number;              // 0–100
  reasons: Localised[];
  needsAversionCheck: boolean;
}

// ── The full profile ────────────────────────────────────────────────
export interface UserProfile {
  schemaVersion: 2;
  language: LangCode;
  self: SelfReported;
  behaviour?: BehaviouralSignals;
  constraints?: Constraints;
  confidence?: ConfidenceReport;
}
```

### Why this shape

- **Optional sub-objects** (`behaviour?`, `constraints?`) mean a student who finishes only the basic 8 steps has a valid profile.
- **No bare strings** anywhere a student sees text. `Localised` carries a key + English fallback, so the existing `t()` system in `src/hooks/useLanguage.tsx` can localise everything later without code changes.
- **`schemaVersion: 2`** keeps the door open for migrating saved profiles in localStorage / Supabase.

---

## 3. Confidence — when does the aversion check trigger?

```
confidence = 100
  − 15 if interests > 4 selected           (over-broad picks)
  − 15 if interests < 2 selected           (under-specified)
  − 10 if percentage is blank
  − 15 if priorities conflict              (e.g. 'high_salary' + 'helping_others')
  − 10 if budget left blank
  − 10 per stream–interest mismatch        (e.g. Arts stream + 'technology')

Clamp to [0, 100].

needsAversionCheck = confidence < 75
```

- **≥ 75:** student sees results immediately — no extra step.
- **< 75:** the aversion swipe is shown before the results page.
- **< 40:** results page leads with "let's tighten this up" instead of recommendations.

Cutoffs are constants in `scoring.ts` (`CONFIDENCE_THRESHOLDS`), not magic numbers buried in JSX.

---

## 4. Scoring algorithm — the weighting

Simple shape (so it stays explainable) with hard filters in front.

### Step 1 — Hard filters (course is removed entirely if any fail)

- **Stream eligibility** — unchanged from today; courses are pre-filtered before scoring.
- **Aversion conflict** — the course's `aversionConflicts` tag set overlaps the student's `aversions` array. e.g. course tagged `['sitting_long']` + student aversions include `'sitting_long'` ⇒ drop.
- **Percentage cliff** — course needs ≥ X% in eligibility text, student is more than 10 points below.
- **Budget cliff** — course's typical fees upper bound exceeds `maxBudgetLakh × 1.2` (small slack — hard cliffs are bad UX).

If a hard filter removes the student's top-interest course, we don't silently drop it — we surface a **Pivot Pathway** (§5).

### Step 2 — Score the remaining courses (0 → 100)

```
                                                                Max
  base                                                          50
+ Interest match              6 pts per matching interest card  +36
+ Priority alignment          3 pts per matching priority        +9
+ Budget fit                                                     +8
    – within budget                +8
    – within budget × 1.2          +4
+ Duration preference                                            +5

  Clamp 0–100. Round to integer.
```

### Why these numbers

- **Base 50** keeps a comfortable spread (final scores cluster 50–95) so the UI's match badge has meaningful gradation.
- **Interest weight per match is +6 with cap +36** — a strong signal but capped so a student selecting many interests doesn't max out the score on interests alone.
- The total possible is 108 before clamp, so a student matching everything lands at 100, and there's a real ceiling effect for fit.

### Step 3 — Match reason generation

Every reason in the result card uses `Localised` keys, so they show in any of the 10 supported languages once translations are added. Today they're hardcoded English in the existing component; the new schema makes this a content task, not a code task.

---

## 5. Pivot Pathway — replacement for "low match score"

When budget or marks disqualify the student's top aspiration, we suggest the closest viable alternatives — by hand, from an editorial table, not by generation.

```ts
// src/data/predictor/pivotPathways.ts — already in repo (DRAFT)

export interface PivotPathway {
  fromCourseId: string;
  label: Localised;
  alternatives: Array<{
    courseId: string;     // must exist in courseDatabase
    rationale: Localised;
    closeness: number;    // 0–100, sort order within this pathway
  }>;
}
```

### Drafted pathways (need counsellor review before launch)

| From (aspiration) | Pivot 1 | Pivot 2 | Pivot 3 | Pivot 4 |
|---|---|---|---|---|
| MBBS | B.Sc. Nursing | B.Pharm | B.Sc. Radiology | BPT |
| BDS | B.Sc. Optometry | B.Sc. MLT | BASLP | — |
| B.Tech CSE | BCA | B.Sc. CS | B.Tech IT | B.Tech ECE |
| B.Tech AI/DS | B.Sc. Data Science | B.Tech CSE | B.Sc. Statistics | — |
| CA | B.Com (Hons.) | CMA | BBA Finance | B.Sc. Economics |
| NDA | B.Sc. Physics → CDS | Merchant Navy | CPL | — |
| B.Arch | B.Des. Interior | B.Tech Civil | B.Plan | — |
| BA-LLB | LL.B. (3-year) | BBA-LLB | B.Com-LLB | — |

### When does the pivot fire?

After hard filters, before the ranked list is returned:

```
1. Take the student's top interest (first in their `interests` array).
2. Find the highest-scoring course in courseDatabase that matches it.
3. If that course was hard-filtered out, look up its pivot in pivotPathways.
4. Inject a "Closest viable option" card at the top of the results.
```

The pivot sits **alongside** the regular ranked list, not instead of it. The aspiration is acknowledged, not silently discarded.

---

## 6. Future-proof tag — qualitative, not a score

Original ask was an "automation risk score." We've used a **qualitative tag** instead — see the previous discussion for why a number would be irresponsible.

```ts
// in courseTags.ts — already in repo (DRAFT)

export type AutomationTag =
  | 'high_human_judgment'    // doctor, judge, teacher, counsellor — AI assists
  | 'human_facing'           // nurse, salesperson, hospitality, social work
  | 'creative_judgment'      // designer, writer (with AI tools)
  | 'ai_augmented'           // analyst, engineer, lawyer — workflow changing
  | 'increasingly_automated' // data entry, basic accounting, basic copywriting
  | 'physical_skilled';      // electrician, surgeon, lab tech — slow to automate
```

Tags are attached to courses, not computed. Shown as a one-line callout on the course detail card. Editorial list, reviewed annually. Honest and useful; not a fake number.

---

## 7. Data-flow summary

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1–8 (existing)        → SelfReported                   │
│                                                              │
│ computeConfidence(self)    → ConfidenceReport                │
│                                                              │
│   confidence ≥ 75 ──────────────────────────────► RESULTS    │
│                                                              │
│   confidence < 75:                                           │
│     Aversion swipe         → BehaviouralSignals.aversions    │
│                                                              │
│ scoreCourses({self, behaviour?, constraints?})               │
│   → ScoredCourse[] (filtered + ranked + reasoned)            │
│                                                              │
│ if top-interest course was hard-filtered:                    │
│   inject pivotPathway(topInterest) at top of results         │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. What we deliberately are NOT building

For honesty's sake, and to keep v1 shippable.

- **No aptitude / reasoning quiz.** The original prompt requested it; the team's call was to remove it from v1. The right question for a 12th student is what they'll enjoy and afford, not whether they can solve a 25-second puzzle.
- **No micro-tasks** per career. Designing one good micro-task per career takes real effort. Defer to v2.1 if ever.
- **No new course database fields.** We *add* sibling tag files (`courseTags.ts`, `pivotPathways.ts`) that join by `courseId`. The existing course data stays untouched.
- **No translation rollout in v1 code.** The schema is i18n-ready; actual Hindi, Malayalam, Kannada, etc. strings are a parallel content workstream.

---

## 9. Open questions for the team

Still need answers before the UI step begins.

1. **Aversion taxonomy** — the 12 tags in §2 are my draft. Anything missing for Indian contexts (e.g. "family-business obligation"?) the team wants in?
2. **Pivot pathway list** — 8 pathways drafted. Need a counsellor sign-off pass before any pivot is shown to a student. Bad pivots are worse than no pivots.
3. **Course tag table** — ~50 most-trafficked courses tagged with aversion conflicts + automation outlook. Needs a counsellor audit because wrong tags silently hide courses.
4. **Where does the profile live?** localStorage only, or also synced to Supabase? Affects schema-migration story.
5. **What to do when *no* match clears the filters?** (Student who hates everything.) Right now the engine returns an empty ranked list. The UI step needs a friendly "let's adjust your filters" state.

---

## 10. Build order (revised — quiz removed)

| Step | Task | Status | Blocker |
|---|---|---|---|
| 1 | Types + scoring engine | ✅ in repo | — |
| 2 | Confidence + gating logic | ✅ in repo | — |
| 3 | Aversion swipe UI + integration | next | aversion-cards copy review |
| 4 | Pivot pathways injection in results UI | next | pivot table review |
| 5 | Automation tags callout on course detail | next | tag table review |
| 6 | i18n keys filled in for English | next | — |
| 7 | UI gating: trigger aversion check below 75 | next | step 3 first |

Estimated: **~4 engineering days for code** (down from 7 in the original plan). Content (pivot review, tag audit, copy review) is the parallel critical path.

---

*End of document. Review, mark up, and tell me which sections to change before any of this gets wired to the UI.*
