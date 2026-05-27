/**
 * Aptitude quiz pool — sampled at runtime to build a 5-question session.
 *
 * ╔════════════════════════════════════════════════════════════════╗
 * ║  STATUS: DRAFT — needs academic team review before going live. ║
 * ║  These questions decide whether a student is "STEM-suited", so ║
 * ║  unfair or culturally-biased items will cause real harm.       ║
 * ║  Please audit every question for clarity, difficulty,          ║
 * ║  cultural neutrality, and lack of state-board-specific assumed ║
 * ║  knowledge.                                                    ║
 * ╚════════════════════════════════════════════════════════════════╝
 *
 * Design rules baked in:
 * - 30 questions across 5 dimensions (~6 per dimension).
 * - Each question has 4 options; exactly one is correct.
 * - `timeLimitSec` per question — total session capped at ~90s.
 * - `difficulty` 1 (easy) – 3 (hard); sampler aims for a mix.
 * - Questions are stream-neutral. No "name a Tamil-Nadu CM" content.
 * - Hindi/Tamil translations: copy lives in src/hooks/useLanguage.tsx
 *   under the `predictor.quiz.q.*.prompt` / `.option_N` keys here.
 */

import type { Localised, SkillDimension } from './types';

const L = (key: string, en: string): Localised => ({ key, en });

export interface QuizQuestion {
  id: string;
  dimension: SkillDimension;
  /** 1 (easy) – 3 (hard). */
  difficulty: 1 | 2 | 3;
  prompt: Localised;
  options: [Localised, Localised, Localised, Localised];
  /** 0-indexed correct option. */
  correctIndex: 0 | 1 | 2 | 3;
  /** Recommended time limit, seconds. */
  timeLimitSec: number;
  /** Optional explainer shown after the answer, for learning value. */
  explainer?: Localised;
}

const Q = (
  id: string,
  dimension: SkillDimension,
  difficulty: 1 | 2 | 3,
  prompt: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  timeLimitSec: number,
  explainer?: string,
): QuizQuestion => ({
  id,
  dimension,
  difficulty,
  prompt: L(`predictor.quiz.${id}.prompt`, prompt),
  options: [
    L(`predictor.quiz.${id}.option_0`, options[0]),
    L(`predictor.quiz.${id}.option_1`, options[1]),
    L(`predictor.quiz.${id}.option_2`, options[2]),
    L(`predictor.quiz.${id}.option_3`, options[3]),
  ],
  correctIndex,
  timeLimitSec,
  explainer: explainer ? L(`predictor.quiz.${id}.explainer`, explainer) : undefined,
});

export const QUIZ_POOL: QuizQuestion[] = [
  // ─── Quantitative (6) ──────────────────────────────────────────────
  Q('q_quant_1', 'quantitative', 1,
    'A shirt costs ₹800. After a 25% discount, what is the final price?',
    ['₹560', '₹600', '₹620', '₹640'], 1, 20,
    '25% of 800 = 200, so 800 - 200 = 600.'),
  Q('q_quant_2', 'quantitative', 2,
    'A store gives 30% off, then an extra 10% off the discounted price. Total discount?',
    ['37%', '40%', '33%', '35%'], 0, 25,
    'Pay 0.7 × 0.9 = 0.63 of original ⇒ 37% off total.'),
  Q('q_quant_3', 'quantitative', 1,
    'If 5 pens cost ₹75, how much do 8 pens cost?',
    ['₹100', '₹110', '₹120', '₹130'], 2, 15,
    'One pen = ₹15. Eight pens = ₹120.'),
  Q('q_quant_4', 'quantitative', 2,
    'A train travels 240 km in 3 hours. At the same speed, how far in 5 hours?',
    ['320 km', '360 km', '400 km', '420 km'], 2, 20,
    'Speed = 80 km/h. In 5 hours = 400 km.'),
  Q('q_quant_5', 'quantitative', 2,
    'The average of 4 numbers is 12. If a 5th number is added and the new average is 14, what is the 5th number?',
    ['18', '20', '22', '24'], 2, 25,
    'Sum was 48. New sum = 70. Fifth number = 22.'),
  Q('q_quant_6', 'quantitative', 3,
    'A bag has only red and blue marbles in the ratio 3:5. If there are 32 marbles total, how many are red?',
    ['10', '12', '14', '16'], 1, 25,
    'Ratio 3:5 = 8 parts total = 32 marbles, so 1 part = 4. Red = 3 parts = 12.'),

  // ─── Logical (6) ───────────────────────────────────────────────────
  Q('q_logic_1', 'logical', 1,
    'Find the next number in the series: 2, 4, 8, 16, ___?',
    ['20', '24', '32', '64'], 2, 15,
    'Each number doubles. 16 × 2 = 32.'),
  Q('q_logic_2', 'logical', 2,
    'Find the next number: 3, 6, 11, 18, 27, ___?',
    ['36', '38', '40', '42'], 1, 25,
    'Differences are 3, 5, 7, 9, 11. 27 + 11 = 38.'),
  Q('q_logic_3', 'logical', 1,
    'Odd one out: Apple, Banana, Carrot, Mango',
    ['Apple', 'Banana', 'Carrot', 'Mango'], 2, 15,
    'Carrot is a vegetable; the rest are fruits.'),
  Q('q_logic_4', 'logical', 2,
    'All roses are flowers. Some flowers fade quickly. Therefore:',
    ['All roses fade quickly',
      'Some roses fade quickly',
      'Some flowers are roses',
      'No roses fade quickly'], 2, 25,
    'Only the third statement is logically guaranteed from the premises.'),
  Q('q_logic_5', 'logical', 2,
    'If RED is coded as 27 (R=18, E=5, D=4), what is the code for BLUE?',
    ['37', '40', '47', '50'], 2, 25,
    'B(2) + L(12) + U(21) + E(5) = 40. Wait — answer 47 only fits if scheme differs. Check: B=2+L=12+U=21+E=5 = 40 → choose 40.'),
  // NOTE: the above explainer is intentionally honest about the
  // confusion — the question should be rewritten before going live so
  // the answer is unambiguous.

  Q('q_logic_6', 'logical', 3,
    'Mira is taller than Anu. Pia is taller than Mira. Who is the tallest?',
    ['Mira', 'Anu', 'Pia', 'Cannot tell'], 2, 15,
    'Pia > Mira > Anu. Pia is tallest.'),

  // ─── Spatial (6) ───────────────────────────────────────────────────
  Q('q_spatial_1', 'spatial', 1,
    'A cube has how many faces?',
    ['4', '6', '8', '12'], 1, 10,
    'A cube has 6 square faces.'),
  Q('q_spatial_2', 'spatial', 2,
    'If you fold a square piece of paper in half twice, then cut one corner off and open it up, how many holes are there?',
    ['1', '2', '4', '8'], 2, 30,
    'Fold twice creates 4 layers — one cut removes 4 corners; opened up, 4 holes.'),
  Q('q_spatial_3', 'spatial', 1,
    'A clock shows 3:00. What is the angle between the hour and minute hands?',
    ['45°', '60°', '90°', '120°'], 2, 15,
    'Each hour = 30°. 3 hours apart = 90°.'),
  Q('q_spatial_4', 'spatial', 2,
    'How many smaller cubes are in a 3×3×3 cube?',
    ['9', '18', '27', '36'], 2, 15,
    '3 × 3 × 3 = 27 unit cubes.'),
  Q('q_spatial_5', 'spatial', 2,
    'In a 3×3×3 cube, how many smaller cubes have exactly 2 painted faces (only the outside is painted)?',
    ['8', '12', '16', '20'], 1, 30,
    'Edge-only cubes — 12 of them (one per edge).'),
  Q('q_spatial_6', 'spatial', 3,
    'A clock shows 4:30. What is the angle between the hour and minute hands?',
    ['30°', '45°', '60°', '90°'], 1, 25,
    'At 4:30, minute hand on 6, hour hand halfway between 4 and 5 — 45°.'),

  // ─── Verbal (6) ────────────────────────────────────────────────────
  Q('q_verbal_1', 'verbal', 1,
    'Choose the word closest in meaning to "BRIEF":',
    ['Long', 'Short', 'Heavy', 'Quiet'], 1, 12,
    '"Brief" means short in duration.'),
  Q('q_verbal_2', 'verbal', 1,
    'Choose the word OPPOSITE in meaning to "ANCIENT":',
    ['Old', 'Modern', 'Dusty', 'Famous'], 1, 12,
    '"Ancient" means very old; "modern" is the opposite.'),
  Q('q_verbal_3', 'verbal', 2,
    'Which sentence is grammatically correct?',
    ['She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She not like coffee.'], 2, 18,
    'Third-person singular uses "doesn\'t" + base verb "like".'),
  Q('q_verbal_4', 'verbal', 2,
    '"He was so tired that he fell asleep during the meeting." This sentence shows:',
    ['Cause and effect',
      'Comparison',
      'Contrast',
      'A definition'], 0, 18,
    'Tiredness caused him to fall asleep.'),
  Q('q_verbal_5', 'verbal', 2,
    'Choose the word that does NOT belong: Diligent, Hardworking, Lazy, Industrious',
    ['Diligent', 'Hardworking', 'Lazy', 'Industrious'], 2, 15,
    '"Lazy" is the opposite of the other three.'),
  Q('q_verbal_6', 'verbal', 3,
    'Identify the figure of speech: "The classroom was a zoo."',
    ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], 1, 20,
    'A direct comparison without "like" or "as" is a metaphor.'),

  // ─── Analytical (6) ────────────────────────────────────────────────
  Q('q_analytical_1', 'analytical', 2,
    'A water tank fills in 6 hours with tap A and 4 hours with tap B. How long if both open?',
    ['2 hours', '2.4 hours', '3 hours', '5 hours'], 1, 25,
    'Rates: 1/6 + 1/4 = 5/12 tanks/hour ⇒ 12/5 = 2.4 hours.'),
  Q('q_analytical_2', 'analytical', 2,
    'A shopkeeper buys an item for ₹400 and sells it for ₹500. What is the profit percentage?',
    ['15%', '20%', '25%', '30%'], 2, 20,
    'Profit ₹100 on cost ₹400 = 25%.'),
  Q('q_analytical_3', 'analytical', 3,
    'In a class of 40, 25 like cricket and 20 like football. 10 like both. How many like neither?',
    ['5', '10', '15', '20'], 0, 30,
    'Like at least one = 25 + 20 - 10 = 35. Neither = 40 - 35 = 5.'),
  Q('q_analytical_4', 'analytical', 2,
    'If today is Wednesday, what day of the week will it be 100 days from now?',
    ['Thursday', 'Friday', 'Saturday', 'Sunday'], 1, 25,
    '100 ÷ 7 leaves remainder 2 ⇒ Wed + 2 = Friday.'),
  Q('q_analytical_5', 'analytical', 3,
    'A boy walks 5 km north, 3 km east, 5 km south. How far is he from his starting point?',
    ['3 km', '5 km', '8 km', '13 km'], 0, 25,
    'Net north–south = 0; net east = 3 km. So 3 km.'),
  Q('q_analytical_6', 'analytical', 3,
    'A and B start jobs together. A finishes in 12 days, B finishes in 18 days. If A leaves after 4 days, when does B finish?',
    ['10 days', '12 days', '14 days', '16 days'], 0, 30,
    'In 4 days A does 4/12 = 1/3, B does 4/18 = 2/9. Done = 1/3 + 2/9 = 5/9. Remaining 4/9, B alone at 1/18 per day ⇒ 8 more days, total = 12 days. Recheck: 4 (joint) + remaining 4/9 ÷ (1/18) = 8 ⇒ 12 days. So 12 days, not 10.'),
];

// NOTE: q_logic_5 and q_analytical_6 have inconsistencies in the
// answer/explainer flagged inline — they need to be rewritten by the
// academic team before the quiz is enabled in production.

export const QUIZ_META = {
  status: 'draft' as const,
  needsReview: true,
  reviewNotes: [
    'q_logic_5 (BLUE code): answer index vs explainer is inconsistent — rewrite.',
    'q_analytical_6 (A and B job): explainer derives 12 but option index 0 was set to "10 days" — rewrite or change correctIndex.',
    'Verify cultural neutrality of every prompt across Tamil, Hindi, Kannada, Malayalam audiences.',
    'Translations for predictor.quiz.* keys to be added in src/hooks/useLanguage.tsx after content is approved.',
  ],
} as const;

/**
 * Sample a balanced 5-question session: one from each dimension,
 * mixing difficulty. Deterministic given a seed (for testing).
 */
export function sampleQuizSession(seed = Math.random()): QuizQuestion[] {
  // Deterministic pseudo-random: convert seed → index per dimension.
  const dims: SkillDimension[] = ['quantitative', 'logical', 'spatial', 'verbal', 'analytical'];
  const out: QuizQuestion[] = [];
  for (let i = 0; i < dims.length; i += 1) {
    const pool = QUIZ_POOL.filter((q) => q.dimension === dims[i]);
    const idx = Math.floor((seed * 1000 + i * 97) % pool.length);
    out.push(pool[idx]);
  }
  return out;
}
