// Offshore Readiness Scorecard — questions, scoring bands and diagnosis copy.
// 4 sections × 5 statements, 5 points each, 100 total. The score computes
// client-side and is never gated; only the PDF breakdown sits behind email.

export type SectionKey = "operational" | "team" | "impact" | "technology";

export type Statement = {
  id: string;
  text: string;
};

export type Section = {
  key: SectionKey;
  num: string; // "01"–"04" — the only numbered sequence on the page
  title: string;
  // One-line frame shown under the section title inside the scorecard.
  frame: string;
  statements: Statement[];
};

export const POINTS_PER_STATEMENT = 5;
export const TOTAL_POINTS = 100;

export const sections: Section[] = [
  {
    key: "operational",
    num: "01",
    title: "Operational readiness",
    frame: "Could a smart stranger run your workflows from what's written down?",
    statements: [
      { id: "op1", text: "Processes are documented in writing" },
      { id: "op2", text: "Workflows can run 100% remotely" },
      { id: "op3", text: "The team communicates asynchronously by default" },
      { id: "op4", text: "Quality standards are defined and measurable" },
      { id: "op5", text: "Core systems and tools are cloud-based" },
    ],
  },
  {
    key: "team",
    num: "02",
    title: "Team & management",
    frame: "Every seat you outsource inherits your management system.",
    statements: [
      { id: "tm1", text: "There is a clear management framework in place" },
      { id: "tm2", text: "The team does not require constant supervision" },
      { id: "tm3", text: "Role responsibilities are written and unambiguous" },
      { id: "tm4", text: "Training material exists for every key process" },
      { id: "tm5", text: "Performance is measured by outcome, not activity" },
    ],
  },
  {
    key: "impact",
    num: "03",
    title: "Business impact",
    frame: "This section reads inverted: the more pain you admit to, the stronger the case.",
    statements: [
      { id: "bi1", text: "Hiring for these roles is slow or difficult" },
      { id: "bi2", text: "Labour is the largest line in operational cost" },
      { id: "bi3", text: "Headcount needs to scale faster than you can hire" },
      { id: "bi4", text: "Quality consistency is a live concern" },
      { id: "bi5", text: "Leadership time is being lost to queue management" },
    ],
  },
  {
    key: "technology",
    num: "04",
    title: "Technology & security",
    frame: "The unglamorous section — and the most common reason launches slip.",
    statements: [
      { id: "ts1", text: "A project management tool is already in use" },
      { id: "ts2", text: "Data security protocols are documented" },
      { id: "ts3", text: "Core tools expose APIs or integrate cleanly" },
      { id: "ts4", text: "Secure remote access can be provisioned" },
      { id: "ts5", text: "Data privacy obligations are understood and manageable" },
    ],
  },
];

export const allStatementIds: string[] = sections.flatMap((s) =>
  s.statements.map((q) => q.id),
);

export type BandSlug = "not-yet-ready" | "early-stage" | "ready" | "highly-ready";

export type Band = {
  slug: BandSlug;
  label: string;
  min: number;
  max: number;
  // Three-sentence diagnosis, operator voice. Honest, slightly uncomfortable
  // at the low end — that's the credibility.
  diagnosis: string;
  quickWins: string[];
};

export const bands: Band[] = [
  {
    slug: "not-yet-ready",
    label: "Not yet ready",
    min: 0,
    max: 25,
    diagnosis:
      "Offshore amplifies the process you already have — including the broken parts. Right now too much of your operation lives in people's heads, and moving it 8,000 miles away would turn undocumented habit into permanent rework. Document your core workflows and define what good looks like before you brief a single vendor.",
    quickWins: [
      "Pick your three highest-volume workflows and write a one-page SOP for each — trigger, steps, hand-offs, and what done looks like. Not a manual. One page.",
      "Define one measurable quality standard per workflow (e.g. processed within 24 hours, error rate under 2%). If you can't measure it, you can't hold anyone to it — onshore or off.",
      "Run one week where the team works as if it were remote: async updates only, no shoulder taps. Every failure that week is a documentation gap with a name on it.",
    ],
  },
  {
    slug: "early-stage",
    label: "Early stage",
    min: 26,
    max: 50,
    diagnosis:
      "You have real foundations and real gaps — which is normal, and fixable. A full-floor migration would expose those gaps fast; one narrow workflow, documented end to end and piloted against agreed numbers, would not. Pick the queue that hurts most and start there.",
    quickWins: [
      "Choose one narrow, high-volume, low-exception queue as your pilot candidate — triage, data entry, order processing. Boring is good. Boring is documentable.",
      "Write the management cadence before anyone is hired: who reviews which number, at what interval, and what happens when it misses.",
      "Time-stamp one full week of that queue. Volume by interval is the difference between a staffing plan and a guess.",
    ],
  },
  {
    slug: "ready",
    label: "Ready",
    min: 51,
    max: 75,
    diagnosis:
      "Your operation can support an offshore team today — the remaining gaps are the kind a structured pilot closes, not blockers. The risk now isn't readiness; it's choosing a partner who inherits your metrics rather than hiding from them. A measured pilot can be live and reporting inside 60 days.",
    quickWins: [
      "Baseline your KPIs now — handle time, quality rate, SLA, unit cost — so day one offshore has a number to beat, not a vibe.",
      "Draft the pilot scorecard before any vendor conversation. If a vendor won't commit to your metrics in their contract, that's your answer.",
      "Nominate one internal owner with real authority. Pilots die from having five stakeholders and no decider.",
    ],
  },
  {
    slug: "highly-ready",
    label: "Highly ready",
    min: 76,
    max: 100,
    diagnosis:
      "You're more prepared than most programs we've been asked to rescue — documentation, management structure and a live business case are already in place. The expensive part is done. A pilot can be live in 30 days and scaled on evidence; the only wrong move is staying at your current cost structure out of inertia.",
    quickWins: [
      "Scope the pilot to 60–90 days with explicit pass/fail gates, written down. Scale on evidence, not on relationship.",
      "Start provisioning access now — systems, permissions, secure remote setup. Security review is the most common reason a 30-day start becomes a 90-day one.",
      "Decide the scaling trigger in advance: which number, held for how long, unlocks the next seats. Then hold to it.",
    ],
  },
];

export function bandFor(score: number): Band {
  const clamped = Math.max(0, Math.min(TOTAL_POINTS, score));
  return bands.find((b) => clamped >= b.min && clamped <= b.max) ?? bands[0];
}

export const BAND_SLUGS: BandSlug[] = bands.map((b) => b.slug);

export const BAND_LABELS: Record<BandSlug, string> = Object.fromEntries(
  bands.map((b) => [b.slug, b.label]),
) as Record<BandSlug, string>;
