// Detail-page content for the nine service lines.
//
// Every page follows the same narrative arc as the OOS pitch carousels
// (Service 01 / Service 02 decks): hook → problem → why it breaks →
// reframe → four-phase system → what you get → the numbers → CTA.
// S1 and S2 use the deck copy verbatim; the rest are drafted in the same
// operator voice and can be refined in one place here.

export type ServicePhase = { name: string; body: string };
export type ServiceListItem = { title: string; body: string };
export type ServiceMetric = { k: string; dir?: "up" | "down"; body: string };

export type ServicePage = {
  /** URL slug under /services/ */
  slug: string;
  /** Matches services[].id in content.ts (S1–S9) so motifs & cards line up. */
  id: string;
  caption: string;
  title: string;
  tag: string;
  flagship?: boolean;
  /** Service family from the Service Delivery Excellence Framework. */
  family: "Managed Operations" | "Insight Services" | "Advisory & Enablement";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: {
    kicker: string;
    /** [plain part, gold part] — gold rendered as accent. */
    headline: [string, string];
    sub: string;
  };
  problem: { title: string; paras: string[] };
  gaps: { title: string; items: ServiceListItem[] };
  reframe: { muted: string; plain: string; gold: string; sub: string };
  phases: { title: string; sub: string; items: ServicePhase[]; benchmark: string };
  outcomes: { title: string; items: ServiceListItem[] };
  metrics: { title: string; sub: string; items: ServiceMetric[] };
  cta: { title: string; body: string; button: string };
  related: string[];
};

export const servicePages: ServicePage[] = [
  // ── S1 · Offshore Setup & Expansion ────────────────────────────────
  {
    slug: "offshore-setup-and-expansion",
    id: "S1",
    caption: "Site build",
    title: "Offshore Setup & Expansion",
    tag: "Consulting",
    family: "Advisory & Enablement",
    metaTitle: "Offshore Team Setup & Expansion in the Philippines",
    metaDescription:
      "Stand up an offshore site that is productive on a plan — gated ramp waves, day-one SOPs, capacity modelling and a live scorecard. Built by BPO operators in the Philippines.",
    keywords: [
      "offshore team setup Philippines",
      "build offshore team",
      "offshore site build",
      "BPO transition management",
      "offshore expansion consulting",
    ],
    hero: {
      kicker: "Service 01 · Site build",
      headline: ["Most offshore teams fail", "in the first 90 days."],
      sub: "It's almost never the people. It's the setup — a team dropped in and hoped for, with no plan and no gates.",
    },
    problem: {
      title: "The QBR nobody wants to run.",
      paras: [
        "You hand a vendor your customers and hope the quarterly review looks good.",
        "Programs drift out of SLA. Reporting turns into a black box. And by the time the numbers surface — the damage is already done.",
      ],
    },
    gaps: {
      title: "Five gaps every offshore build hits.",
      items: [
        { title: "Bodies, not a plan.", body: "Full rate from day one — for a team that isn't productive yet." },
        { title: "No quality gates.", body: "Agents go live before they're certified. Quality craters early." },
        { title: "Capacity by guesswork.", body: "No demand model — so you overstaff and burn cash, or understaff and miss SLA." },
        { title: "Knowledge in one head.", body: "No run-book, no KB. The first resignation sends you back to square one." },
        { title: "A blind ramp.", body: "You find out it failed only when it has already failed." },
      ],
    },
    reframe: {
      muted: "You don't need more seats.",
      plain: "You need a site that's productive",
      gold: "on a plan.",
      sub: "Quality gated at every step. Knowledge that stays. And a number you can watch — red-amber-green, in the open, every single day.",
    },
    phases: {
      title: "One system. Four gates.",
      sub: "Nothing scales until the gate before it is passed.",
      items: [
        {
          name: "Diagnose",
          body: "Before a seat is filled: volume + complexity study, a CTQ tree, and an Erlang capacity model. Tooling and telephony audited first.",
        },
        {
          name: "Build",
          body: "Staggered ramp waves, a supported nesting bay, day-one SOPs and QA calibration — governance stood up before go-live, not after.",
        },
        {
          name: "Sustain",
          body: "Sign-off gates, a live run-book, a locally-owned knowledge base, and a RAG governance board running from week one.",
        },
        {
          name: "Enable",
          body: "Train-the-trainer. Graduation from nesting to production is gated on certification — not on the calendar.",
        },
      ],
      benchmark: "Benchmarked to the Genpact / Accenture transition-wave method — KT → reverse-KT → gated cut-over.",
    },
    outcomes: {
      title: "A site that's live on a plan — not a gamble.",
      items: [
        { title: "Productive on a schedule", body: "A ramp curve you agreed to — hit wave by wave, not hoped for." },
        { title: "Quality gated at nesting", body: "No agent touches your customers before they're certified." },
        { title: "Knowledge that stays", body: "A run-book and knowledge base that survive attrition." },
        { title: "A number in the open", body: "RAG governance from week one, on a dashboard you can see." },
        { title: "Cost per seat that holds", body: "Capacity modelled, not guessed — so the economics don't drift." },
      ],
    },
    metrics: {
      title: "Four numbers we hold ourselves to.",
      sub: "Chosen with you on day one. Baselined to your KPIs, not ours.",
      items: [
        { k: "Time-to-green", body: "How fast the new site hits SLA — measured, not promised." },
        { k: "Ramp adherence", body: "Actual productivity vs. the planned curve, wave by wave." },
        { k: "Quality @ nesting", body: "Certified before live — quality gated at the door." },
        { k: "Cost / seat", body: "Modelled and controlled from the capacity plan up." },
      ],
    },
    cta: {
      title: "Tell us the site you're worried about standing up.",
      body: "We'll come back with how a low-risk pilot would work — and the exact metrics we'd hold ourselves to. Small, measured, no black box.",
      button: "Book a pilot",
    },
    related: ["program-recovery", "workforce-strategy", "process-documentation-and-sops"],
  },

  // ── S2 · Program Recovery & Optimization (flagship) ────────────────
  {
    slug: "program-recovery",
    id: "S2",
    caption: "SLA recovery",
    title: "Program Recovery & Optimization",
    tag: "Recovery",
    flagship: true,
    family: "Advisory & Enablement",
    metaTitle: "BPO Program Recovery — Get Back in SLA and Stay There",
    metaDescription:
      "A 48-hour war-room diagnostic, DMAIC-grade root cause work and a control plan that holds. We turn around underperforming BPO and offshore programs — and keep them in SLA.",
    keywords: [
      "BPO program recovery",
      "SLA recovery",
      "call center turnaround",
      "underperforming outsourcing program",
      "DMAIC contact center",
    ],
    hero: {
      kicker: "Service 02 · SLA recovery · Flagship",
      headline: ["Get the number back in SLA — and", "keep it there."],
      sub: "Most turnarounds buy you one good week. Ours holds after the war-room leaves — because we fix the driver, then lock the gain.",
    },
    problem: {
      title: "One good week isn't a recovery.",
      paras: [
        "The account dips out of SLA. Everyone scrambles. It looks fixed for a week — then it slides right back.",
        "Escalations pile up. CSAT slips. And the client quietly starts asking who else is out there.",
      ],
    },
    gaps: {
      title: "Five reasons the number won't hold.",
      items: [
        { title: "Firefighting, not fixing.", body: "Symptoms get patched every week; the root driver never actually gets found." },
        { title: "The average hides it.", body: "A decent mean masks a bottom decile quietly dragging the whole line down." },
        { title: "Opinion over evidence.", body: "Calls made on gut feel instead of Pareto, 5-Why and control charts." },
        { title: "Coaching sprayed everywhere.", body: "Effort spread across everyone — not aimed at the few who move the number." },
        { title: "No control plan.", body: "Nothing locks the gain in, so it walks out with the next good week." },
      ],
    },
    reframe: {
      muted: "You don't need a new vendor.",
      plain: "You need the number back —",
      gold: "and holding.",
      sub: "Recovery isn't heroics. It's DMAIC discipline — find the true driver, drive it down, then lock the gain with a control plan and a named owner on every variance.",
    },
    phases: {
      title: "A 48-hour war-room. Then a plan that holds.",
      sub: "Four phases — from diagnostic to a gain that stays locked in.",
      items: [
        {
          name: "Diagnose",
          body: "A 48-hour war-room: Pareto the defects, 5-Why the top drivers, control-chart the metric to split signal from noise, and decile agents by performance.",
        },
        {
          name: "Recover",
          body: "Top-3 defect drive-down sprints, bottom-decile coaching, real-time queue triage, and quick-win poka-yokes dropped straight into the workflow.",
        },
        {
          name: "Sustain",
          body: "A written control plan with control charts, a weekly business review, and a named owner on every variance driver.",
        },
        {
          name: "Enable",
          body: "Calibration to shrink QA variance; coaching aimed at moving the bottom decile — not flattering the average.",
        },
      ],
      benchmark: "Benchmarked to Concentrix / Teleperformance turnaround SWAT + GE-grade DMAIC discipline.",
    },
    outcomes: {
      title: "Back in SLA — and staying there.",
      items: [
        { title: "Fast time-to-green", body: "The war-room moves in hours — recovery measured in weeks, not quarters." },
        { title: "Root cause, not symptoms", body: "The actual driver found and driven down — so it doesn't come back." },
        { title: "The bottom decile lifted", body: "Coaching aimed where the number actually moves, not at the average." },
        { title: "A control plan that holds", body: "Control charts and a named owner on every variance driver." },
        { title: "A weekly business review", body: "The number stays visible — not reconstructed at month-end." },
      ],
    },
    metrics: {
      title: "The numbers we drive.",
      sub: "Chosen with you on day one. Baselined to your account — not ours.",
      items: [
        { k: "In-SLA", dir: "up", body: "Back above target — and holding, not just for one good week." },
        { k: "CSAT", dir: "up", body: "The customer feels the recovery, not only the dashboard." },
        { k: "FCR", dir: "up", body: "Fixed first time — fewer repeats, less rework downstream." },
        { k: "AHT & backlog", dir: "down", body: "Faster handling and a queue that's actually draining." },
      ],
    },
    cta: {
      title: "Tell us the program that's slipping.",
      body: "We'll come back with how a low-risk recovery pilot would work — a 48-hour diagnostic and the exact metrics we'd hold ourselves to. Small, measured, no black box.",
      button: "Book a diagnostic",
    },
    related: ["offshore-setup-and-expansion", "data-analysis-and-reporting", "workforce-strategy"],
  },

  // ── S3 · HR & Workforce Strategy ────────────────────────────────────
  {
    slug: "workforce-strategy",
    id: "S3",
    caption: "Coverage",
    title: "HR & Workforce Strategy",
    tag: "Workforce",
    family: "Advisory & Enablement",
    metaTitle: "Offshore Workforce Management & Staffing Strategy",
    metaDescription:
      "Forecast-led staffing for offshore teams: demand modelling, shift design, ramp and retention built around your volume curve. Workforce management by operators from Teleperformance and Tech Mahindra.",
    keywords: [
      "offshore workforce management",
      "contact center staffing strategy",
      "workforce forecasting outsourcing",
      "shift design call center",
      "offshore recruitment Philippines",
    ],
    hero: {
      kicker: "Service 03 · Coverage",
      headline: ["Your volume isn't flat.", "Your staffing shouldn't be either."],
      sub: "Recruitment, ramp, retention and shift design built around your volume curve — not a generic staffing template.",
    },
    problem: {
      title: "Staffed to the average, missed at the peak.",
      paras: [
        "Most vendors staff to a headcount, not a curve. The result is the same everywhere: overstaffed at 10am, buried at 7pm, and an SLA that misses exactly when your customers show up.",
        "Then attrition hits, the schedule never adjusts, and every miss gets explained after the fact instead of prevented before it.",
      ],
    },
    gaps: {
      title: "Five ways coverage quietly breaks.",
      items: [
        { title: "Hired to a headcount, not a curve.", body: "A flat roster against a volume pattern that is anything but flat." },
        { title: "No forecast discipline.", body: "Staffing decisions made on last month's gut feel instead of a demand model." },
        { title: "Shrinkage unplanned.", body: "Training, breaks and absence eat 25–35% of capacity — and nobody budgeted for it." },
        { title: "Attrition unmanaged.", body: "Backfill starts after the resignation, so every exit becomes a coverage hole." },
        { title: "Static schedules.", body: "The curve moves with seasons and campaigns; the roster is still January's." },
      ],
    },
    reframe: {
      muted: "You don't need more agents.",
      plain: "You need the right agents,",
      gold: "at the right hours.",
      sub: "Coverage is an engineering problem: forecast the demand, model the capacity, design the shifts — then manage adherence and attrition on a live dashboard.",
    },
    phases: {
      title: "Forecast first. Then staff to it.",
      sub: "Four phases from demand model to a roster that holds.",
      items: [
        {
          name: "Forecast",
          body: "Interval-level demand modelling from your history: volume, AHT, seasonality and campaign spikes — with an Erlang capacity model on top.",
        },
        {
          name: "Design",
          body: "Shift patterns and coverage maps built to the curve, with shrinkage budgeted honestly and peak hours protected first.",
        },
        {
          name: "Staff",
          body: "Recruitment, structured ramp waves and certification gates — new hires reach proficiency on a plan, not by osmosis.",
        },
        {
          name: "Retain",
          body: "Adherence coaching, engagement and career paths that hold attrition down — plus a bench plan so an exit never becomes an SLA event.",
        },
      ],
      benchmark: "Built on hands-on WFM leadership at Teleperformance and Tech Mahindra — real-time analytics, forecasting and scheduling at scale.",
    },
    outcomes: {
      title: "Coverage that survives contact with reality.",
      items: [
        { title: "A forecast you can audit", body: "Interval-level demand vs. actuals, reviewed weekly — accuracy is a tracked number." },
        { title: "Peaks covered by design", body: "Shifts engineered to the curve, so SLA holds at 7pm — not just at 10am." },
        { title: "Honest shrinkage math", body: "Training, breaks and absence budgeted up front instead of discovered later." },
        { title: "Ramp on a schedule", body: "Certification-gated proficiency, wave by wave." },
        { title: "Attrition contained", body: "Bench planning and retention work that keeps exits from becoming misses." },
      ],
    },
    metrics: {
      title: "The numbers we run coverage on.",
      sub: "Forecast to interval, staffed to forecast, reviewed every week.",
      items: [
        { k: "Forecast accuracy", dir: "up", body: "Predicted vs. actual volume, tracked at interval level." },
        { k: "Schedule adherence", dir: "up", body: "The right people in seat at the right time — measured, coached." },
        { k: "Speed-to-proficiency", dir: "down", body: "Time from day one to certified, productive work." },
        { k: "Attrition", dir: "down", body: "Managed with a bench plan — never an excuse on a QBR slide." },
      ],
    },
    cta: {
      title: "Tell us the queue you can't seem to cover.",
      body: "We'll come back with a demand model of your curve and the staffing plan we'd run against it — with the metrics we'd hold ourselves to.",
      button: "Book a pilot",
    },
    related: ["offshore-setup-and-expansion", "customer-support-outsourcing", "program-recovery"],
  },

  // ── S4 · Multichannel Customer Support ─────────────────────────────
  {
    slug: "customer-support-outsourcing",
    id: "S4",
    caption: "Omnichannel",
    title: "Multichannel Customer Support",
    tag: "CX",
    family: "Managed Operations",
    metaTitle: "Omnichannel Customer Support Outsourcing — Philippines",
    metaDescription:
      "Voice, chat, email and back-office support run as one measured operation — QA-scored per channel, SLA-accountable, on a live scorecard. Offshore customer support from Bohol, Philippines.",
    keywords: [
      "customer support outsourcing Philippines",
      "omnichannel support outsourcing",
      "outsourced customer service SLA",
      "voice chat email support team",
      "offshore customer support",
    ],
    hero: {
      kicker: "Service 04 · Omnichannel",
      headline: ["Every channel.", "One measured operation."],
      sub: "Voice, chat, email and back-office support run as one operation across every channel your customers use — scored to the same standard, on the same scorecard.",
    },
    problem: {
      title: "Channels run as silos, quality runs on luck.",
      paras: [
        "Voice has a dashboard, chat has a spreadsheet, email has a backlog nobody talks about. Three channels, three definitions of good, and a customer who experiences all of them as one brand.",
        "When quality is measured differently per channel — or not at all — the number that finally surfaces at the QBR is whatever survived the averaging.",
      ],
    },
    gaps: {
      title: "Five ways multichannel support drifts.",
      items: [
        { title: "Per-channel silos.", body: "Separate teams, separate metrics — no single view of the customer's actual experience." },
        { title: "Email ages in the dark.", body: "Voice SLA gets watched by the minute; the email queue quietly ages past promise." },
        { title: "Chat concurrency unmanaged.", body: "Agents juggling four chats deliver one-chat quality — nobody measures the cost." },
        { title: "QA inconsistency.", body: "The same interaction scores 95% with one evaluator and 78% with another." },
        { title: "Back office invisible.", body: "The work behind the contact — orders, disputes, records — has no SLA at all." },
      ],
    },
    reframe: {
      muted: "You don't need another channel tool.",
      plain: "You need one standard,",
      gold: "every channel.",
      sub: "One queue view, one QA framework with a critical-error override, one scorecard — so 'good' means the same thing on a call, in a chat, and in the inbox.",
    },
    phases: {
      title: "One standard, four moves.",
      sub: "How we take a multichannel queue and run it as one operation.",
      items: [
        {
          name: "Unify",
          body: "One routing and queue view across voice, chat, email and back office — volumes, SLAs and aging visible in one place.",
        },
        {
          name: "Standardize",
          body: "Channel scorecards from our QA framework — weighted parameters, 0–5 scoring, and a critical-error override that fails any breach outright.",
        },
        {
          name: "Staff",
          body: "Blended coverage built to each channel's curve — concurrency managed on chat, aging SLAs protected on email, AHT coached on voice.",
        },
        {
          name: "Improve",
          body: "Weekly calibration, defect-theme analysis and coaching aimed at the bottom decile — quality compounds instead of drifting.",
        },
      ],
      benchmark: "Run on the OOS Quality Assurance Framework — calibrated evaluators at 90%+ agreement, critical-error override, 48-hour evaluation turnaround.",
    },
    outcomes: {
      title: "Support your customers feel — and you can verify.",
      items: [
        { title: "One scorecard for everything", body: "Voice, chat, email and back office on the same live dashboard." },
        { title: "Quality that means something", body: "Calibrated QA with evidence-based deductions — not evaluator mood." },
        { title: "No channel left to age", body: "Email and back-office SLAs watched as closely as the phone queue." },
        { title: "Critical errors caught", body: "Privacy, compliance and integrity breaches auto-fail — an average can't hide them." },
        { title: "CSAT that holds", body: "Because the drivers behind it are managed daily, not discovered quarterly." },
      ],
    },
    metrics: {
      title: "The numbers we run support on.",
      sub: "Targets configured to your contract — reviewed on a dashboard you can see.",
      items: [
        { k: "CSAT ≥ 90", dir: "up", body: "Customer satisfaction across every channel, not just voice." },
        { k: "FCR ≥ 80", dir: "up", body: "Resolved first contact — fewer repeats, lower cost per resolution." },
        { k: "In-SLA ≥ 95", dir: "up", body: "Every channel against its own promise, including the inbox." },
        { k: "QA ≥ 90", dir: "up", body: "Calibrated, evidence-based quality — with critical-error override." },
      ],
    },
    cta: {
      title: "Tell us the queue your customers complain about.",
      body: "We'll come back with how a low-risk support pilot would work — channels, staffing, QA standard and the exact metrics we'd hold ourselves to.",
      button: "Book a pilot",
    },
    related: ["workforce-strategy", "healthcare-and-technical-operations", "program-recovery"],
  },

  // ── S5 · Technical & Healthcare Ops ─────────────────────────────────
  {
    slug: "healthcare-and-technical-operations",
    id: "S5",
    caption: "Clinical · tech",
    title: "Technical & Healthcare Ops",
    tag: "Specialised",
    family: "Managed Operations",
    metaTitle: "Healthcare BPO & Technical Support Operations — RN-Led",
    metaDescription:
      "Regulated healthcare and technical queues run by operators with clinical and technical backgrounds — RN-led healthcare accounts, HIPAA-aware QA, first-pass accuracy ≥98% and zero-PHI-incident discipline.",
    keywords: [
      "healthcare BPO Philippines",
      "RN-led healthcare operations",
      "HIPAA compliant outsourcing",
      "technical support outsourcing",
      "healthcare back office outsourcing",
    ],
    hero: {
      kicker: "Service 05 · Clinical / tech",
      headline: ["Regulated queues need", "more than a script."],
      sub: "Healthcare and technical operations handled by operators with real clinical and technical backgrounds — including licensed RN leadership on every healthcare account.",
    },
    problem: {
      title: "Complexity handled by script is a breach waiting to happen.",
      paras: [
        "Generic vendors put generic agents on regulated work. It looks fine until a PHI slip, a wrong disposition, or a Tier-1 queue that escalates everything it touches.",
        "In healthcare and technical work, the cost of a miss isn't a bad survey — it's compliance exposure, rework, and a client asking how it got through.",
      ],
    },
    gaps: {
      title: "Five failure modes of scripted specialist work.",
      items: [
        { title: "No clinical judgment on the floor.", body: "Nobody who can tell a coding error from a clinical one — until the audit does." },
        { title: "Compliance bolted on.", body: "HIPAA is a slide in training, not a parameter scored on every interaction." },
        { title: "Escalation as default.", body: "Tier-1 that resolves nothing is just an expensive routing layer." },
        { title: "Accuracy unmeasured.", body: "First-pass accuracy nobody tracks becomes rework everybody pays for." },
        { title: "Reopens ignored.", body: "A closed ticket that reopens is a defect — unless nobody's counting." },
      ],
    },
    reframe: {
      muted: "You don't need cheaper seats.",
      plain: "You need specialists,",
      gold: "held to compliance-grade numbers.",
      sub: "Clinical and technical depth on the floor, a vertical compliance module scored into every QA evaluation, and a 4.5-sigma accuracy target — by design, not by hope.",
    },
    phases: {
      title: "Compliance-grade by design.",
      sub: "Four phases from requirements to audited, running queues.",
      items: [
        {
          name: "Assess",
          body: "Map the regulatory surface — HIPAA, PHI handling, disclosure requirements — and bolt the vertical compliance module onto every scorecard.",
        },
        {
          name: "Certify",
          body: "Clinical and technical training with certification gates. Nobody touches a regulated queue before passing — the calendar doesn't graduate anyone.",
        },
        {
          name: "Run",
          body: "RN-led healthcare queues and technically-led support tiers, with first-pass accuracy, TAT and reopen rates on a live dashboard.",
        },
        {
          name: "Audit",
          body: "Documentation discipline, audit-ready trails and a 4.5σ accuracy standard — the level regulated work actually demands.",
        },
      ],
      benchmark: "Led by a licensed Registered Nurse with US healthcare account leadership at Optum and Fusion BPO's healthcare division.",
    },
    outcomes: {
      title: "Specialist work that survives an audit.",
      items: [
        { title: "RN leadership on healthcare", body: "Clinical depth most vendors simply can't put on the floor." },
        { title: "Zero-PHI-incident discipline", body: "Privacy breaches are critical errors — they fail the month, not just the interaction." },
        { title: "Tier-1 that resolves", body: "Technical queues measured on the fix, not just the reply." },
        { title: "Accuracy at 4.5σ", body: "First-pass accuracy targeted at 98%+ — compliance-grade, trended monthly." },
        { title: "Audit-ready always", body: "Documentation and regulatory trails maintained as part of the work, not after it." },
      ],
    },
    metrics: {
      title: "The numbers regulated work runs on.",
      sub: "Compliance targets aren't aspirations — they're gates.",
      items: [
        { k: "First-pass accuracy ≥ 98", dir: "up", body: "Right the first time — audited, not assumed." },
        { k: "TAT ≥ 95", dir: "up", body: "Turnaround against promise on every queue." },
        { k: "PHI incidents = 0", body: "A privacy breach overrides everything to zero. Non-negotiable." },
        { k: "Reopen ≤ 5", dir: "down", body: "Closed means fixed — reopens are counted as defects." },
      ],
    },
    cta: {
      title: "Tell us the regulated queue you need handled properly.",
      body: "We'll come back with how a compliance-grade pilot would work — team profile, QA module and the exact accuracy targets we'd hold ourselves to.",
      button: "Book a pilot",
    },
    related: ["customer-support-outsourcing", "process-documentation-and-sops", "data-analysis-and-reporting"],
  },

  // ── S6 · Data Analysis & Reporting ──────────────────────────────────
  {
    slug: "data-analysis-and-reporting",
    id: "S6",
    caption: "Reporting",
    title: "Data Analysis & Reporting",
    tag: "Analytics",
    family: "Insight Services",
    metaTitle: "Outsourced Data Analysis & Live Operations Reporting",
    metaDescription:
      "Live dashboards and the analyst layer behind them — validated data, defect-free reporting and insight you can act on. Offshore data analysis and reporting for operations teams.",
    keywords: [
      "outsourced data analysis",
      "operations reporting outsourcing",
      "live KPI dashboards BPO",
      "offshore data analyst team",
      "business reporting services",
    ],
    hero: {
      kicker: "Service 06 · Reporting",
      headline: ["Decisions deserve better than", "last month's deck."],
      sub: "Live dashboards and the analyst layer behind them — so every staffing and coverage decision is made on evidence, not memory.",
    },
    problem: {
      title: "By the time the deck is built, the moment is gone.",
      paras: [
        "Most operations reporting is archaeology: numbers assembled at month-end to explain what already happened, in a format nobody can drill into.",
        "Worse, nobody validates it. A broken formula or a stale extract quietly steers real decisions — and no one finds out until the numbers stop adding up.",
      ],
    },
    gaps: {
      title: "Five ways reporting fails the people who rely on it.",
      items: [
        { title: "Month-end archaeology.", body: "Reports that explain the past instead of steering the present." },
        { title: "Unvalidated numbers.", body: "No data validation step — so errors ship with the same confidence as facts." },
        { title: "Metric soup.", body: "Fifty KPIs, no definitions, and three versions of the same number in one meeting." },
        { title: "No analyst layer.", body: "Dashboards without anyone accountable for explaining why the line moved." },
        { title: "Manual and fragile.", body: "One person's spreadsheet holds the whole reporting stack together." },
      ],
    },
    reframe: {
      muted: "You don't need more reports.",
      plain: "You need numbers you can act on,",
      gold: "while they still matter.",
      sub: "Defined metrics, validated pipelines, live dashboards — and analysts accountable for the 'why' behind every movement.",
    },
    phases: {
      title: "From source to decision, governed.",
      sub: "Four phases from raw data to a reporting operation you can trust.",
      items: [
        {
          name: "Baseline",
          body: "Audit sources and definitions. Every metric gets a written definition and one owner — so one number means one thing.",
        },
        {
          name: "Build",
          body: "Live dashboards on your KPIs with validation built into the pipeline — 100% of deliverables pass a documented check before anyone sees them.",
        },
        {
          name: "Analyze",
          body: "The analyst layer: variance commentary, driver analysis and recommendations — insight actionability is a scored dimension, not a bonus.",
        },
        {
          name: "Govern",
          body: "Version control, methodology documentation, automation coverage — and a defect-free rate tracked like any other SLA.",
        },
      ],
      benchmark: "Scored on our Service Delivery Excellence Framework — fabricated or unvalidated data is a critical error that fails the month outright.",
    },
    outcomes: {
      title: "A reporting operation, not a deck factory.",
      items: [
        { title: "Live, not lagging", body: "Dashboards that show today — month-end becomes a review, not a revelation." },
        { title: "Validated by process", body: "Every deliverable passes documented validation before it ships." },
        { title: "One version of truth", body: "Defined metrics with owners — no more three versions of the same number." },
        { title: "Insight with the numbers", body: "Analysts explain why the line moved and what to do about it." },
        { title: "Automation that compounds", body: "Manual steps retired systematically — coverage tracked as a metric." },
      ],
    },
    metrics: {
      title: "The numbers behind the numbers.",
      sub: "Reporting is a service line — it gets a scorecard too.",
      items: [
        { k: "Defect-free ≥ 98", dir: "up", body: "Deliverables right the first time, measured per cycle." },
        { k: "On-time ≥ 95", dir: "up", body: "Reporting SLAs hit like any other SLA." },
        { k: "Validation 100%", body: "No deliverable ships without its documented check. Ever." },
        { k: "Insight actionability", dir: "up", body: "Scored on whether analysis actually drives decisions." },
      ],
    },
    cta: {
      title: "Tell us the decision you're making blind.",
      body: "We'll come back with the dashboard and analyst layer we'd stand up — and the exact accuracy and turnaround metrics we'd hold ourselves to.",
      button: "Book a pilot",
    },
    related: ["research-and-insights", "program-recovery", "process-documentation-and-sops"],
  },

  // ── S7 · Research & Insights ────────────────────────────────────────
  {
    slug: "research-and-insights",
    id: "S7",
    caption: "Research",
    title: "Research & Insights",
    tag: "Insight",
    family: "Insight Services",
    metaTitle: "Outsourced Research Services — Verified, Citable Insights",
    metaDescription:
      "Structured research, QA sampling and voice-of-customer analysis with verified findings and citation integrity — research operations that explain why your numbers move.",
    keywords: [
      "outsourced research services",
      "voice of customer analysis",
      "market research outsourcing Philippines",
      "research support services",
      "QA sampling analysis",
    ],
    hero: {
      kicker: "Service 07 · Research",
      headline: ["Know why", "the numbers move."],
      sub: "Structured research, QA sampling and voice-of-customer analysis that explains the movement behind every metric — verified, sourced, and ready to act on.",
    },
    problem: {
      title: "Unverified research is just expensive opinion.",
      paras: [
        "Cheap research is easy to buy and impossible to trust: findings without sources, summaries that flatter the brief, and the occasional citation that doesn't exist.",
        "When research feeds real decisions — product, market entry, customer strategy — a fabricated source isn't a quality issue. It's a liability.",
      ],
    },
    gaps: {
      title: "Five ways bought research lets you down.",
      items: [
        { title: "Findings without sources.", body: "Conclusions you can't trace are conclusions you can't defend." },
        { title: "The brief flattered.", body: "Research that tells you what you wanted to hear instead of what's there." },
        { title: "Coverage gaps unflagged.", body: "What wasn't searched never gets mentioned — silence reads as completeness." },
        { title: "No acceptance standard.", body: "Deliverables land unstructured, unreviewed and unusable without rework." },
        { title: "Fabrication risk.", body: "Under deadline pressure, sources get invented. Unless integrity is scored, it happens." },
      ],
    },
    reframe: {
      muted: "You don't need more information.",
      plain: "You need findings you can",
      gold: "defend.",
      sub: "Every claim sourced and logged, every deliverable scored against the brief, and zero tolerance for fabrication — enforced by scorecard, not by promise.",
    },
    phases: {
      title: "Research as an operation.",
      sub: "Four phases from brief to verified, decision-ready findings.",
      items: [
        {
          name: "Scope",
          body: "A structured brief with critical-to-quality requirements — what must be answered, to what depth, by when.",
        },
        {
          name: "Gather",
          body: "Multi-source research with a full source log — every finding traceable back to where it came from.",
        },
        {
          name: "Verify",
          body: "Citation integrity checks and completeness review against the brief — gaps flagged, never hidden.",
        },
        {
          name: "Deliver",
          body: "Structured findings built for first-pass acceptance — formatted to be used, not reworked.",
        },
      ],
      benchmark: "Scored on our Excellence Framework — fabricated sources or plagiarism are critical errors that fail the engagement outright.",
    },
    outcomes: {
      title: "Findings that hold up in the room.",
      items: [
        { title: "Every claim traceable", body: "Full source logs — anyone can walk a finding back to its evidence." },
        { title: "Gaps declared", body: "What wasn't covered is flagged, so silence never masquerades as completeness." },
        { title: "First-pass usable", body: "Structured to the brief — usable on arrival, not after your team rebuilds it." },
        { title: "Integrity enforced", body: "Zero-tolerance fabrication policy, scored into the QA standard." },
        { title: "VoC that explains", body: "Voice-of-customer analysis tied to the metrics it explains." },
      ],
    },
    metrics: {
      title: "The numbers research runs on.",
      sub: "Quality standards written into the scorecard, not the proposal.",
      items: [
        { k: "Verified findings ≥ 95", dir: "up", body: "Claims that pass citation-integrity checks." },
        { k: "First-pass acceptance ≥ 85", dir: "up", body: "Delivered right the first time, measured per brief." },
        { k: "Citation integrity 100%", body: "Fabricated sources fail the engagement. Zero tolerance." },
        { k: "Completeness vs brief", dir: "up", body: "Scored against what was asked — gaps flagged explicitly." },
      ],
    },
    cta: {
      title: "Tell us the question you need answered properly.",
      body: "We'll come back with the research plan we'd run — sources, verification standard, and the acceptance metrics we'd hold ourselves to.",
      button: "Book a pilot",
    },
    related: ["data-analysis-and-reporting", "customer-support-outsourcing", "sales-and-lead-generation"],
  },

  // ── S8 · Process Documentation & SOPs ───────────────────────────────
  {
    slug: "process-documentation-and-sops",
    id: "S8",
    caption: "SOP library",
    title: "Process Documentation & SOPs",
    tag: "Process",
    family: "Advisory & Enablement",
    metaTitle: "SOP Writing & Process Documentation Services",
    metaDescription:
      "Every workflow captured as a clear, auditable SOP — versioned, maintained, and adopted. Process documentation and knowledge management that survives attrition.",
    keywords: [
      "SOP writing services",
      "process documentation outsourcing",
      "knowledge base management",
      "standard operating procedures BPO",
      "knowledge management services",
    ],
    hero: {
      kicker: "Service 08 · SOP library",
      headline: ["Performance that survives", "the resignation letter."],
      sub: "Every workflow captured as a clear, auditable SOP — so performance survives attrition and scales cleanly instead of living in one person's head.",
    },
    problem: {
      title: "Your best process is about to walk out the door.",
      paras: [
        "In most operations, the real process lives in the heads of two or three tenured people. The documentation — if it exists — describes how things worked eighteen months ago.",
        "Then someone resigns, and with them goes the only accurate copy of how the work actually gets done. Training reverts to shadowing. Quality reverts to luck.",
      ],
    },
    gaps: {
      title: "Five ways knowledge quietly leaks.",
      items: [
        { title: "Tribal knowledge.", body: "The process exists — in someone's head, leaving with their two-week notice." },
        { title: "Stale documentation.", body: "SOPs describing a process that changed three tool-migrations ago." },
        { title: "No versioning.", body: "Five copies on five drives, and nobody knows which one is current." },
        { title: "Written, never adopted.", body: "Documentation nobody uses is documentation you paid for twice." },
        { title: "No review cycle.", body: "Without scheduled review, every SOP is decaying from the day it's published." },
      ],
    },
    reframe: {
      muted: "You don't need a wiki.",
      plain: "You need a knowledge base",
      gold: "that matches the live process.",
      sub: "Captured from the people doing the work, versioned like code, reviewed on a cycle — and measured on accuracy, coverage and adoption.",
    },
    phases: {
      title: "Capture. Codify. Keep current.",
      sub: "Four phases from tribal knowledge to a governed SOP library.",
      items: [
        {
          name: "Capture",
          body: "Sit with the people who do the work — map the real process including the exceptions, not the idealized flowchart.",
        },
        {
          name: "Codify",
          body: "Clear, auditable SOPs with owners, effective dates and version control — written to be followed, not filed.",
        },
        {
          name: "Publish",
          body: "A structured knowledge base with search, adoption tracking and a feedback loop from the floor.",
        },
        {
          name: "Maintain",
          body: "Scheduled review cycles and update SLAs — when the process changes, the documentation changes with it.",
        },
      ],
      benchmark: "The same discipline behind our own site builds — day-one SOPs and locally-owned knowledge bases are how new offshore teams survive attrition.",
    },
    outcomes: {
      title: "An operation that doesn't forget.",
      items: [
        { title: "Attrition-proof", body: "The process survives any single resignation — including your best person's." },
        { title: "Audit-ready", body: "Versioned, owned, dated — documentation that stands up to compliance review." },
        { title: "Faster ramp", body: "New hires train on the real process, cutting speed-to-proficiency." },
        { title: "Adopted, not archived", body: "Usage tracked — documentation that's actually open on the floor." },
        { title: "Current by contract", body: "Review currency is a scored metric, so staleness has an owner." },
      ],
    },
    metrics: {
      title: "The numbers documentation runs on.",
      sub: "A knowledge base is a service line — it gets a scorecard too.",
      items: [
        { k: "SOP accuracy ≥ 98", dir: "up", body: "Documentation verified against the live process." },
        { k: "Coverage ≥ 95", dir: "up", body: "Share of workflows with a current, owned SOP." },
        { k: "Versioning 100%", body: "One current version, full history, zero ambiguity." },
        { k: "Review currency", dir: "up", body: "Every SOP inside its scheduled review window." },
      ],
    },
    cta: {
      title: "Tell us the process that lives in one person's head.",
      body: "We'll come back with the capture plan we'd run and the accuracy, coverage and adoption metrics we'd hold ourselves to.",
      button: "Book a pilot",
    },
    related: ["offshore-setup-and-expansion", "healthcare-and-technical-operations", "data-analysis-and-reporting"],
  },

  // ── S9 · Sales & Lead Generation ────────────────────────────────────
  {
    slug: "sales-and-lead-generation",
    id: "S9",
    caption: "Growth",
    title: "Sales & Lead Generation",
    tag: "Growth",
    family: "Managed Operations",
    metaTitle: "Outsourced Sales Development & Lead Generation",
    metaDescription:
      "Outbound prospecting, LinkedIn sourcing and appointment setting run as a measured pipeline — qualified meetings, show rates and pipeline value on a live scorecard.",
    keywords: [
      "outsourced lead generation",
      "appointment setting services Philippines",
      "outbound sales development offshore",
      "LinkedIn prospecting service",
      "SDR outsourcing",
    ],
    hero: {
      kicker: "Service 09 · Growth",
      headline: ["A pipeline you can audit —", "not a pile of dials."],
      sub: "Outbound prospecting, LinkedIn sourcing and appointment setting run as a measured pipeline — led by operators who have carried sales targets and opened new markets.",
    },
    problem: {
      title: "Activity is not pipeline.",
      paras: [
        "Most outsourced lead gen sells you activity: dials made, emails sent, connections requested. The report looks busy. The calendar stays empty.",
        "Without qualification discipline and pipeline accountability, you're paying for motion — and hoping motion turns into meetings by accident.",
      ],
    },
    gaps: {
      title: "Five reasons outsourced lead gen underdelivers.",
      items: [
        { title: "Vanity activity.", body: "Dials and sends reported proudly; meetings booked barely mentioned." },
        { title: "No ICP discipline.", body: "Spray-and-pray lists that burn your brand on the wrong prospects." },
        { title: "Cadence chaos.", body: "Touches improvised per rep instead of a designed, tested sequence." },
        { title: "Unqualified 'qualified' leads.", body: "Meetings that no-show or never had budget — booked to hit a count." },
        { title: "CRM left dirty.", body: "No hygiene standard, so handoffs leak and reporting can't be trusted." },
      ],
    },
    reframe: {
      muted: "You don't need more dials.",
      plain: "You need qualified meetings,",
      gold: "on a measured pipeline.",
      sub: "ICP-targeted lists, designed cadences, honest qualification and clean CRM handoffs — with show rates and pipeline value on the scorecard, not just activity.",
    },
    phases: {
      title: "Pipeline as an operation.",
      sub: "Four phases from ICP to a calendar with qualified meetings on it.",
      items: [
        {
          name: "Target",
          body: "Ideal customer profile defined with you, list building and enrichment against it — quality of target measured before the first touch.",
        },
        {
          name: "Engage",
          body: "Designed multi-channel cadences — outbound calls, email and LinkedIn — tested and iterated on reply data, not opinion.",
        },
        {
          name: "Qualify",
          body: "Honest qualification against agreed criteria. A meeting that shouldn't be booked, isn't — your closers' time is the constraint we protect.",
        },
        {
          name: "Hand off",
          body: "Clean CRM records, context-rich handoffs and a feedback loop from your closers back into targeting.",
        },
      ],
      benchmark: "Led by operators who have carried quotas, managed program budgets and built the sales pipelines that opened new markets.",
    },
    outcomes: {
      title: "Growth you can inspect, week by week.",
      items: [
        { title: "Meetings, not motion", body: "The scorecard leads with qualified appointments — activity is context." },
        { title: "Your brand protected", body: "ICP discipline means the right prospects hear from you, properly." },
        { title: "Cadences that learn", body: "Sequences iterated on reply and conversion data every week." },
        { title: "Show rates managed", body: "Confirmation workflows that get booked meetings to actually happen." },
        { title: "CRM you can trust", body: "Hygiene as a standard — pipeline reporting that survives scrutiny." },
      ],
    },
    metrics: {
      title: "The numbers growth runs on.",
      sub: "Pipeline metrics on a live scorecard — activity is a footnote.",
      items: [
        { k: "Qualified meetings", dir: "up", body: "Appointments that meet the agreed qualification bar." },
        { k: "Show rate", dir: "up", body: "Booked meetings that happen — confirmed and managed." },
        { k: "Pipeline value", dir: "up", body: "Dollar-weighted pipeline created, tracked to close." },
        { k: "Cost per meeting", dir: "down", body: "The economics of the engine, visible and managed." },
      ],
    },
    cta: {
      title: "Tell us the market you need meetings in.",
      body: "We'll come back with the ICP, cadence design and pipeline metrics we'd hold ourselves to — on a pilot sized to prove it.",
      button: "Book a pilot",
    },
    related: ["research-and-insights", "data-analysis-and-reporting", "workforce-strategy"],
  },
];

export const serviceFamilies = [
  {
    name: "Managed Operations",
    tagline: "Run the work, own the number",
    blurb:
      "Customer, technical and healthcare operations run end-to-end — the queue is the product, and it ships with a scorecard.",
  },
  {
    name: "Insight Services",
    tagline: "Turn data into decisions",
    blurb:
      "Reporting, analysis and research with validation built in — the deliverable is the product, and it's verified before you see it.",
  },
  {
    name: "Advisory & Enablement",
    tagline: "Build it right, fix it fast",
    blurb:
      "Site builds, program recovery, workforce strategy and documentation — the operating system your offshore operation runs on.",
  },
] as const;

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
