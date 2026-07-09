// Copy for the standalone company pages: /approach, /why-us, /team, /book-a-pilot.
// Sourced from the OOS Service Delivery Excellence Framework and QA Framework
// decks — same single-source-of-truth pattern as content.ts.

// ── /approach ─────────────────────────────────────────────────────────
export const approachPage = {
  metaTitle: "Our Approach — Pilot First, Measured Always",
  metaDescription:
    "How engagements work at Optimal Offshore Solutions: a small measured pilot, four quality gates, six balanced scorecard dimensions and a governance cadence from daily huddle to quarterly review.",
  hero: {
    kicker: "How engagements work",
    headline: ["Every engagement starts small,", "measured, and gated."] as [string, string],
    sub: "No big-bang transitions, no black box. A pilot proves the numbers, gates control the scale-up, and a governance rhythm keeps the scorecard open every day of the engagement.",
  },
  steps: [
    {
      num: "Step 01",
      title: "Pilot",
      body: "A small, low-risk placement so you can see exactly how we manage performance before committing anything to scale. Metrics chosen with you on day one — baselined to your KPIs, not ours.",
    },
    {
      num: "Step 02",
      title: "Measure",
      body: "We baseline your KPIs and report against them from day one — no black box, no surprises at the quarterly review. Red-amber-green, in the open, every single day.",
    },
    {
      num: "Step 03",
      title: "Scale",
      body: "Once the numbers hold, we grow the team on a plan built around your volume curve — not ours. Nothing scales until the gate before it is passed.",
    },
  ],
  gates: {
    kicker: "The delivery system",
    title: "One system. Four gates.",
    sub: "Every service line runs the same four-phase discipline — nothing scales until the gate before it is passed.",
    items: [
      {
        name: "Diagnose",
        body: "Before work begins: volume and complexity studied, critical-to-quality requirements defined, capacity modelled. We measure the problem before touching it.",
      },
      {
        name: "Build",
        body: "Staggered ramp waves, certification-gated training, day-one SOPs and QA calibration — governance stood up before go-live, not after.",
      },
      {
        name: "Sustain",
        body: "A written control plan, a live run-book, and red-amber-green governance running from week one — so gains lock in instead of walking out.",
      },
      {
        name: "Enable",
        body: "Train-the-trainer, evaluator calibration and coaching aimed at the bottom decile — the discipline that keeps the number where we put it.",
      },
    ],
  },
  dimensions: {
    kicker: "What we measure",
    title: "Six balanced dimensions. No metric can dominate.",
    sub: "Every scorecard draws from the same six dimensions — weights shift by service line, the dimensions never do. Chasing cost at the expense of quality becomes arithmetically impossible to hide.",
    items: [
      { title: "Client & Customer", body: "CSAT · client health · retention · first-pass acceptance" },
      { title: "Quality", body: "QA scores · first-pass accuracy · defect rates · DPMO" },
      { title: "Service Delivery", body: "SLA & TAT attainment · aging · on-time delivery" },
      { title: "Efficiency & Cost", body: "Cost per unit vs plan · utilization · automation · COPQ" },
      { title: "People", body: "Attrition · adherence · speed-to-proficiency · coverage" },
      { title: "Compliance & Risk", body: "Privacy incidents · audit scores · regulatory discipline" },
    ],
  },
  cadence: {
    kicker: "Operating rhythm",
    title: "A governance cadence that surfaces problems early.",
    sub: "~80% of review time is spent on controllable input metrics. A problem surfaced in the weekly review is resolved or escalated before it ever reaches the quarterly one.",
    items: [
      {
        k: "Daily",
        title: "LOB huddle",
        body: "Intraday SLA, staffing, yesterday's defects, today's risks. 15 minutes, actions logged.",
      },
      {
        k: "Weekly",
        title: "Business review",
        body: "Full input-metric review — every deviation gets an owner and a date.",
      },
      {
        k: "Monthly",
        title: "Scorecard review",
        body: "Scorecards per service line, sigma trends, cost of poor quality. Written pre-read; meeting time on yellow and red only.",
      },
      {
        k: "Quarterly",
        title: "QBR with you",
        body: "Outcomes, portfolio composite, target recalibration and the improvement roadmap — no surprises, because you watched it all quarter.",
      },
    ],
  },
  escalation: {
    kicker: "When a number slips",
    title: "Misses escalate automatically — not when someone notices.",
    items: [
      { k: "1 miss", body: "Action plan with a named owner and a date, tabled at the weekly review." },
      { k: "2 consecutive", body: "Formal corrective action with root-cause analysis at the monthly review." },
      {
        k: "3 consecutive / critical",
        body: "A chartered improvement project — Director-sponsored, with baseline, goal and a 90-day control plan.",
      },
    ],
  },
  cta: {
    title: "See the system on your own numbers.",
    body: "Tell us the program you're worried about. We'll come back with how a low-risk pilot would work — and the exact metrics we'd hold ourselves to.",
    button: "Book a pilot",
  },
};

// ── /why-us ───────────────────────────────────────────────────────────
export const whyUsPage = {
  metaTitle: "Why Us — Operators, Accountable to the Number",
  metaDescription:
    "Why teams choose Optimal Offshore Solutions over a generic vendor: founder-operators on the floor, a scorecard that stays open, critical-error discipline and Lean Six Sigma improvement built in.",
  hero: {
    kicker: "Why us",
    headline: ["Most outsourcers sell seats.", "We sell a number you can watch."] as [string, string],
    sub: "Run by operators who have carried the queue themselves, on a scorecard that stays open every day of the engagement — with the discipline to keep it green.",
  },
  scoring: {
    kicker: "Defensible scoring",
    title: "How every month is scored.",
    sub: "Weighted KPIs across six dimensions, 0–5 attainment scoring with cited evidence, and result bands that mean the same thing on every account.",
    bands: [
      { k: "Exceeds", v: "≥ 95%" },
      { k: "Meets", v: "90 – 94.9%" },
      { k: "Needs improvement", v: "80 – 89.9%" },
      { k: "Fails", v: "< 80%" },
      { k: "Fail — critical", v: "→ 0%" },
    ],
    override: {
      title: "The critical-error override",
      body: "Any flagged breach — a data leak, falsified reporting, a concealed issue — forces the month to 0%, regardless of everything else. A 95% month that concealed a breach is not a 95% month.",
    },
  },
  sigma: {
    kicker: "The improvement engine",
    title: "Defects are counted, priced, and killed.",
    sub: "Every service line computes defects per million opportunities monthly. Improvement isn't claimed — it's verified in DPMO and cost of poor quality, with a 90-day control plan on every gain.",
    rows: [
      { sigma: "3.0σ", dpmo: "66,807 DPMO", label: "Industry average, unmanaged" },
      { sigma: "4.0σ", dpmo: "6,210 DPMO", label: "OOS minimum — mature service lines" },
      { sigma: "4.5σ", dpmo: "1,350 DPMO", label: "Healthcare & compliance work" },
      { sigma: "6.0σ", dpmo: "3.4 DPMO", label: "World-class" },
    ],
  },
  cta: {
    title: "Watch the scorecard from day one.",
    body: "Start with a small, measured pilot and see exactly how we manage performance — before anything scales.",
    button: "Book a pilot",
  },
};

// ── /team ─────────────────────────────────────────────────────────────
export const teamPage = {
  metaTitle: "Meet the Team — Operators Who Have Run the Floor",
  metaDescription:
    "Five founder-operators with 50+ combined years running BPO operations for Optum, Concentrix, Teleperformance, Sagility and Tech Mahindra — including licensed RN leadership on healthcare accounts.",
  hero: {
    kicker: "Meet the team",
    headline: ["Led by operators who have run", "the numbers you care about."] as [string, string],
    sub: "Every founder has carried a queue, coached a floor and owned a P&L at the world's biggest BPOs. You work directly with the people who run your operation — no account-manager buffer.",
  },
  cta: {
    title: "Meet us on your first call.",
    body: "The people on this page are the people on your pilot. Tell us the program you're thinking about and we'll walk you through exactly who would run it.",
    button: "Book a pilot",
  },
};

// ── /book-a-pilot ─────────────────────────────────────────────────────
export const pilotPage = {
  metaTitle: "Book a Pilot — Small, Measured, No Black Box",
  metaDescription:
    "Start with a low-risk offshore pilot: we reply within one business day, then send a pilot blueprint — team, scope, and the exact metrics we'd hold ourselves to. Small, measured, no black box.",
  hero: {
    kicker: "Get started",
    headline: ["Prove the numbers on a pilot", "before a single seat scales."] as [string, string],
    sub: "Tell us the program you're worried about. We'll come back with how a low-risk pilot would work — and the exact metrics we'd hold ourselves to. Small, measured, no black box.",
  },
  next: {
    kicker: "What happens next",
    title: "From this form to a running pilot.",
    items: [
      {
        k: "01 · Within one business day",
        title: "A real reply from an operator",
        body: "Not an SDR sequence — one of the founders reads your note and replies with first questions and a call slot in your timezone.",
      },
      {
        k: "02 · Within one week",
        title: "Your pilot blueprint",
        body: "A short, concrete plan: team profile, scope, the exact KPIs we'd baseline, targets, and the scorecard you'd watch. You'll know precisely what 'good' means before you commit.",
      },
      {
        k: "03 · Pilot · first 90 days",
        title: "A measured pilot, in the open",
        body: "A small placement, gated ramp, red-amber-green reporting from week one, and a weekly business review. Scale is your call — made on the numbers, not on our word.",
      },
    ],
  },
  faqs: [
    {
      q: "How big is a pilot?",
      a: "Deliberately small — typically 2 to 5 people, scoped to one queue or workflow. Big enough to prove the numbers, small enough that trying us is low-risk.",
    },
    {
      q: "What does a pilot cost?",
      a: "It depends on role complexity and coverage hours — and we quote it plainly in the pilot blueprint before you commit to anything. The pilot is priced to be a low-risk way to see the numbers for yourself.",
    },
    {
      q: "How fast can a pilot start?",
      a: "For most support and back-office roles, staffing typically takes a few weeks, followed by a certification-gated ramp. The blueprint gives you a dated wave plan — you'll see the ramp curve before we start.",
    },
    {
      q: "Which metrics will you commit to?",
      a: "Yours. We baseline your KPIs — CSAT, SLA, accuracy, TAT, whatever your account runs on — and report against them from day one on a dashboard you can open any day.",
    },
    {
      q: "Where is the team based?",
      a: "Bohol, Philippines, serving US and APAC hours — with founders who have led programs for Optum, Concentrix, Teleperformance, Sagility and Tech Mahindra.",
    },
    {
      q: "What happens after the pilot?",
      a: "If the numbers hold, we agree a scale plan built around your volume curve — wave by wave, gate by gate. If they don't, you walk away with the data and the SOPs we built. Either way, no black box.",
    },
  ],
};
