# PYQ PDF Builders

Scripts that generate the **Previous Year Question** PDFs that live in
`public/pyq-pdfs/` and are surfaced by the in-app "Previous Year Papers" screen.

## How the app uses these PDFs

1. The PDF is placed in `public/pyq-pdfs/<exam>-<year>.pdf` so it's served
   statically at `/pyq-pdfs/<exam>-<year>.pdf`.
2. The corresponding paper entry in `src/data/pyqFullPapers.ts` is given a
   `pdfUrl: '/pyq-pdfs/<exam>-<year>.pdf'`.
3. The `PYQPapers` page (`src/pages/PYQPapers.tsx`) automatically renders that
   paper as a "📄 Full PDF + Answer Key" card. Tapping it opens the PDF in a
   new tab — no in-app subject view, just the official paper.

## Regenerating an existing PDF

```bash
cd scripts/pyq-pdf-builders
pip install reportlab
python build_neet_2025.py
```

The output overwrites `public/pyq-pdfs/neet-2025.pdf`.

## Adding a new year (e.g. NEET 2026 once it's released)

1. Copy `build_neet_2025.py` to `build_neet_2026.py`.
2. Replace the `QUESTIONS` list and `ANSWER_KEY` dict with the new year's
   questions and official answer key.
3. Update the `OUT` path and the cover-page metadata (date, code).
4. Run the script — a new PDF appears in `public/pyq-pdfs/`.
5. Add a new entry in `src/data/pyqFullPapers.ts` with the matching
   `pdfUrl` and the standard fields (`id`, `exam`, `year`, etc.).

## Why ReportLab?

The original NTA PDFs contain images, watermarks, and rendering artefacts that
don't reproduce well. Building a clean, searchable, mobile-friendly PDF from
the question text gives learners a faster, smaller download (≈70 KB instead of
several MB) and better readability on phones.
