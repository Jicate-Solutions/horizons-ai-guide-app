import jsPDF from 'jspdf';
import type { CareerMatch } from '@/lib/careerScoring';
import { SCORING_METHODOLOGY } from '@/lib/careerScoring';

// ─────────────────────────────────────────────────────────────────────────────
// CAREER PREDICTOR — PDF REPORT
// ─────────────────────────────────────────────────────────────────────────────
// A 12th student can save this, print it, and show it to parents or a school
// counsellor. It mirrors the on-screen result honestly: the transparent score
// breakdown, the reality check, real colleges, the roadmap and the 90-day plan.
//
// Built on jsPDF (already a project dependency). Deliberately plain and
// readable — this is a document a parent will hold, not a marketing page.
// ─────────────────────────────────────────────────────────────────────────────

const bandLabel: Record<CareerMatch['band'], string> = {
  strong: 'Strong match',
  good: 'Good match',
  stretch: 'Reach option',
};

const priorityLabel: Record<'high' | 'medium' | 'low', string> = {
  high: 'This week',
  medium: 'This month',
  low: 'Within 90 days',
};

// Brand-ish greens, kept muted so the document prints cleanly.
const GREEN: [number, number, number] = [4, 120, 87];
const DARK: [number, number, number] = [31, 41, 55];
const GREY: [number, number, number] = [107, 114, 128];
const LIGHT_BG: [number, number, number] = [240, 253, 244];

interface GeneratePDFOptions {
  matches: CareerMatch[];
  narrative?: string;
  /** Optional: a short profile summary line, e.g. "TN Group 102 - Science" */
  profileSummary?: string;
}

export function generateCareerPredictorPDF({
  matches,
  narrative,
  profileSummary,
}: GeneratePDFOptions): void {
  if (!matches || matches.length === 0) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let y = 0;

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Move to a new page if the next block would overflow. */
  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 18) {
      addFooter();
      doc.addPage();
      y = 20;
    }
  };

  /** Wrapped paragraph text. Returns the new y. */
  const paragraph = (
    text: string,
    opts: {
      size?: number;
      color?: [number, number, number];
      bold?: boolean;
      indent?: number;
      gap?: number;
    } = {},
  ) => {
    const size = opts.size ?? 10;
    const color = opts.color ?? DARK;
    const indent = opts.indent ?? 0;
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentWidth - indent) as string[];
    const lineHeight = size * 0.5;
    for (const line of lines) {
      ensureSpace(lineHeight + 1);
      doc.text(line, marginX + indent, y);
      y += lineHeight + 1.6;
    }
    y += opts.gap ?? 0;
  };

  /** A section heading with an underline. */
  const sectionHeading = (text: string) => {
    ensureSpace(16);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...GREEN);
    doc.text(text, marginX, y);
    y += 2.5;
    doc.setDrawColor(...GREEN);
    doc.setLineWidth(0.4);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 7;
  };

  let pageNum = 0;
  const addFooter = () => {
    pageNum += 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...GREY);
    doc.text(
      'VAZHIKATTI Career Predictor - vazhikatti career guidance',
      marginX,
      pageHeight - 10,
    );
    doc.text(`Page ${pageNum}`, pageWidth - marginX, pageHeight - 10, {
      align: 'right',
    });
  };

  // ── Cover header ───────────────────────────────────────────────────────────
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageWidth, 42, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Your Career Analysis', pageWidth / 2, 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(
    'VAZHIKATTI - AI Career Predictor for 12th students',
    pageWidth / 2,
    29,
    { align: 'center' },
  );
  doc.setFontSize(9);
  doc.text(`Generated on ${today}`, pageWidth / 2, 36, { align: 'center' });

  y = 54;

  if (profileSummary) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...GREY);
    doc.text(`Profile: ${profileSummary}`, marginX, y);
    y += 8;
  }

  // ── Honest framing note ────────────────────────────────────────────────────
  doc.setFillColor(...LIGHT_BG);
  const noteLines = doc.splitTextToSize(
    'How to read this report: every match score below is calculated from your own answers, not guessed. The percentages compare your skills, priorities, 12th group and expected marks against each career. This is honest guidance to discuss with your family and teachers - not a fixed verdict.',
    contentWidth - 8,
  ) as string[];
  const noteBoxH = noteLines.length * 4.6 + 8;
  doc.roundedRect(marginX, y, contentWidth, noteBoxH, 2, 2, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  let ny = y + 6;
  for (const line of noteLines) {
    doc.text(line, marginX + 4, ny);
    ny += 4.6;
  }
  y += noteBoxH + 8;

  // ── AI narrative (if present) ──────────────────────────────────────────────
  if (narrative && narrative.trim().length > 0) {
    sectionHeading('Summary');
    paragraph(narrative.trim(), { size: 10, gap: 2 });
  }

  // ── Top matches overview ───────────────────────────────────────────────────
  sectionHeading('Your Top Career Matches');
  matches.forEach((m, i) => {
    ensureSpace(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...DARK);
    doc.text(
      `${i + 1}.  ${m.pathway.title}`,
      marginX,
      y,
    );
    doc.setTextColor(...GREEN);
    doc.text(`${m.score}%  -  ${bandLabel[m.band]}`, pageWidth - marginX, y, {
      align: 'right',
    });
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GREY);
    const hl = doc.splitTextToSize(m.headline, contentWidth) as string[];
    for (const line of hl) {
      ensureSpace(4.5);
      doc.text(line, marginX, y);
      y += 4.5;
    }
    y += 3;
  });

  // ── Per-career detail ──────────────────────────────────────────────────────
  matches.forEach((m, i) => {
    const p = m.pathway;
    addFooter();
    doc.addPage();
    y = 20;

    // Career title band
    doc.setFillColor(...GREEN);
    doc.rect(0, 0, pageWidth, 16, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(
      `#${i + 1}  ${p.title}  -  ${m.score}% (${bandLabel[m.band]})`,
      marginX,
      11,
    );
    y = 26;

    paragraph(p.whatIsIt, { size: 10, gap: 1 });

    // The real entry route — honest "what you actually do now"
    paragraph(`How you reach this: ${p.timeToCareer}`, {
      size: 9.5,
      color: GREEN,
      bold: true,
      gap: 1,
    });
    paragraph(`UG course(s): ${p.ugCourses.join(', ')}`, {
      size: 9,
      color: GREY,
    });
    const realExams = p.entranceExams.filter(
      (e) => e !== 'None (direct admission)',
    );
    if (realExams.length > 0) {
      paragraph(`Entrance exam(s): ${realExams.join(', ')}`, {
        size: 9,
        color: GREY,
        gap: 2,
      });
    } else {
      y += 2;
    }

    // Score breakdown — the transparent "show your working"
    sectionHeading('Why this score? The calculation');
    m.breakdown.forEach((c) => {
      ensureSpace(11);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...DARK);
      doc.text(`${c.label}`, marginX, y);
      doc.setTextColor(...GREEN);
      doc.text(`${c.earned} / ${c.max}`, pageWidth - marginX, y, {
        align: 'right',
      });
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...GREY);
      const reason = doc.splitTextToSize(c.reason, contentWidth) as string[];
      for (const line of reason) {
        ensureSpace(4);
        doc.text(line, marginX, y);
        y += 4;
      }
      y += 2;
    });

    // Reality check
    sectionHeading('The honest reality check');
    paragraph(`Salary - starting: ${p.salaryReality.startingLPA}`, {
      size: 9,
    });
    paragraph(`Salary - mid-career: ${p.salaryReality.midCareerLPA}`, {
      size: 9,
    });
    paragraph(p.salaryReality.note, { size: 8.5, color: GREY, gap: 1 });
    paragraph(
      `Job demand: ${p.demand.score}/10 - ${p.demand.note}`,
      { size: 9, gap: 1 },
    );
    paragraph(
      `Entry difficulty: ${p.entryDifficulty.score}/10 - ${p.entryDifficulty.note}`,
      { size: 9, gap: 1 },
    );
    paragraph(`Cost reality: ${p.costReality}`, { size: 9, gap: 1 });
    if (p.backupOptions.length > 0) {
      paragraph('If the main plan does not work out - your backups:', {
        size: 9,
        bold: true,
      });
      p.backupOptions.forEach((b) =>
        paragraph(`-  ${b}`, { size: 8.5, color: GREY, indent: 3 }),
      );
      y += 1;
    }
    paragraph(`Be honest with yourself: ${p.honestCaveat}`, {
      size: 9,
      color: DARK,
      bold: true,
      gap: 2,
    });

    // Colleges by tier
    if (p.collegeTiers.length > 0) {
      sectionHeading('Where you can study this');
      p.collegeTiers.forEach((tier) => {
        ensureSpace(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK);
        doc.text(tier.label, marginX, y);
        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...GREY);
        const ex = doc.splitTextToSize(
          `Examples: ${tier.examples.join(', ')}`,
          contentWidth,
        ) as string[];
        for (const line of ex) {
          ensureSpace(4);
          doc.text(line, marginX, y);
          y += 4;
        }
        const cg = doc.splitTextToSize(
          `Cutoff/entry: ${tier.cutoffGuide}   |   Fees: ${tier.feeRange}`,
          contentWidth,
        ) as string[];
        for (const line of cg) {
          ensureSpace(4);
          doc.text(line, marginX, y);
          y += 4;
        }
        y += 2;
      });
    }

    // Roadmap
    if (p.roadmap.length > 0) {
      sectionHeading('Your roadmap');
      p.roadmap.forEach((stage, idx) => {
        ensureSpace(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK);
        const phaseTag =
          stage.phase === 'now'
            ? '[YOU ARE HERE] '
            : stage.phase === 'next'
              ? '[NEXT] '
              : '[LATER] ';
        doc.text(`${idx + 1}. ${phaseTag}${stage.title}`, marginX, y);
        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...GREY);
        const det = doc.splitTextToSize(
          `${stage.detail}  (${stage.window})`,
          contentWidth,
        ) as string[];
        for (const line of det) {
          ensureSpace(4);
          doc.text(line, marginX, y);
          y += 4;
        }
        y += 2;
      });
    }

    // 90-day plan
    if (p.ninetyDayPlan.length > 0) {
      sectionHeading('Your next 90 days - action plan');
      p.ninetyDayPlan.forEach((a) => {
        ensureSpace(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK);
        doc.text(`[ ]  ${a.title}`, marginX, y);
        doc.setTextColor(...GREEN);
        doc.setFontSize(8);
        doc.text(priorityLabel[a.priority], pageWidth - marginX, y, {
          align: 'right',
        });
        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...GREY);
        const det = doc.splitTextToSize(a.detail, contentWidth) as string[];
        for (const line of det) {
          ensureSpace(4);
          doc.text(line, marginX, y);
          y += 4;
        }
        if (a.link) {
          ensureSpace(4);
          doc.setTextColor(...GREEN);
          doc.text(`Official link: ${a.link}`, marginX, y);
          y += 4;
        }
        y += 2;
      });
    }

    // Build-now skills
    if (p.buildNowSkills.length > 0) {
      sectionHeading('Skills to start building now');
      p.buildNowSkills.forEach((s, idx) => {
        ensureSpace(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...DARK);
        doc.text(`${idx + 1}. ${s.skill}`, marginX, y);
        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...GREY);
        const why = doc.splitTextToSize(
          `Why: ${s.why}`,
          contentWidth,
        ) as string[];
        for (const line of why) {
          ensureSpace(4);
          doc.text(line, marginX, y);
          y += 4;
        }
        const res = doc.splitTextToSize(
          `Free start: ${s.freeResource}`,
          contentWidth,
        ) as string[];
        for (const line of res) {
          ensureSpace(4);
          doc.text(line, marginX, y);
          y += 4;
        }
        y += 2;
      });
    }
  });

  // ── Closing methodology page ───────────────────────────────────────────────
  addFooter();
  doc.addPage();
  y = 24;
  sectionHeading('How these results were produced');
  paragraph(SCORING_METHODOLOGY.en, { size: 9.5, gap: 4 });
  paragraph(
    'This report is guidance, not a guarantee. Career decisions should be made together with your family, teachers and - where possible - a counsellor. Always verify current fees, cutoffs and exam dates on the official websites before you apply.',
    { size: 9, color: GREY },
  );
  addFooter();

  // ── Save ───────────────────────────────────────────────────────────────────
  const safeTop = (matches[0]?.pathway.title ?? 'career')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
  doc.save(`vazhikatti-career-analysis-${safeTop}.pdf`);
}

export default generateCareerPredictorPDF;
