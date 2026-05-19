import { TNEA_CUTOFFS_2024 } from './tneaCutoffs2024';
import type { CutoffEntry } from '@/components/EduCutoff/PreviousYearCutoffs';

/**
 * Full TNEA engineering cutoff list, adapted from the official DOTE 2024
 * dataset (825 college-branch records across 280 colleges) into the
 * `CutoffEntry` shape consumed by SmartRankPredictor.
 *
 * Why an adapter:
 * The published DOTE list records a community's closing mark only where a
 * 2024 admission actually happened, so most rows carry just one community
 * value. SmartRankPredictor skips any row that has no number for the
 * student's chosen community — which would hide most colleges. To keep
 * every branch usable for any community, missing community columns are
 * filled with a conservative reference: the OC closing mark if known,
 * otherwise the highest recorded mark for that branch. Reservation cutoffs
 * are always <= OC, so this never understates the bar a student must clear.
 *
 * For fully community-accurate prediction, swap in the general (academic)
 * TNEA cutoff list, which carries dense OC/BC/MBC/SC/ST values — this
 * adapter and the predictor need no other change.
 */
function buildTneaEngineeringCutoffs(): CutoffEntry[] {
  return TNEA_CUTOFFS_2024.map((e): CutoffEntry => {
    const c = e.cutoffs;
    const recorded = Object.values(c);
    // Reference mark used to fill any community without recorded data.
    const ref = c.OC ?? (recorded.length ? Math.max(...recorded) : 0);
    const val = (primary?: number, alt?: number): number =>
      primary ?? alt ?? ref;

    return {
      college:
        e.district && e.district !== 'Tamil Nadu'
          ? `${e.shortName}, ${e.district}`
          : e.shortName,
      course: e.branchName,
      oc: val(c.OC),
      bc: val(c.BC, c.BCM),
      mbc: val(c.MBC),
      sc: val(c.SC, c.SCA),
      st: val(c.ST),
      year: '2024',
      note: 'DOTE TNEA 2024 official cutoff',
    };
  });
}

/**
 * 825 college-branch engineering cutoff rows from the official 2024 list.
 * Used by SmartRankPredictor for the Engineering stream.
 */
export const tneaEngineeringCutoffs: CutoffEntry[] = buildTneaEngineeringCutoffs();
