// Central content source for Optimal Offshore Solutions.
// Kept out of components so copy can be edited in one place (or later moved to Firestore).

export const company = {
  name: "Optimal Offshore Solutions",
  short: "Optimal Offshore",
  tagline: "Scalable operations. Trusted expertise. A KPO delivery team that runs to the number.",
  domain: "optimaloffshoresolutions.com",
  email: "hello@optimaloffshoresolutions.com",
  salesEmail: "sales@optimaloffshoresolutions.com",
  careersEmail: "careers@optimaloffshoresolutions.com",
  location: "Bohol, Philippines",
  serving: "Serving US & APAC",
};

// Public profiles that represent the SAME entity as the website — emitted as
// schema.org `sameAs` so Google ties them to the brand (and the verified
// Google Business Profile). Add the exact public URLs as they go live:
//   e.g. "https://www.linkedin.com/company/optimal-offshore-solutions",
//        the GBP "share" URL, Facebook page, etc.
export const socialLinks: string[] = [];

export const services = [
  {
    id: "S1",
    caption: "Site build",
    title: "Offshore Setup & Expansion",
    tag: "Consulting",
    body: "Stand up a new offshore or nearshore site — hiring, workflow, tooling and governance — without losing control of quality.",
  },
  {
    id: "S2",
    caption: "SLA recovery",
    title: "Program Recovery & Optimization",
    tag: "Recovery",
    body: "Turn around an underperforming account. We diagnose the gap, re-baseline the metrics, and get the program back in SLA.",
  },
  {
    id: "S3",
    caption: "Coverage",
    title: "HR & Workforce Strategy",
    tag: "Workforce",
    body: "Recruitment, ramp, retention and shift design built around your volume curve — not a generic staffing template.",
  },
  {
    id: "S4",
    caption: "Omnichannel",
    title: "Multichannel Customer Support",
    tag: "CX",
    body: "Voice, chat, email and back-office support run as one measured operation across every channel your customers use.",
  },
  {
    id: "S5",
    caption: "Clinical · tech",
    title: "Technical & Healthcare Ops",
    tag: "Specialised",
    body: "Regulated, complex queues handled by operators with real technical and clinical backgrounds — not a script.",
  },
  {
    id: "S6",
    caption: "Reporting",
    title: "Data Analysis & Reporting",
    tag: "Analytics",
    body: "Live dashboards and the analyst layer behind them, so every staffing and coverage decision is made on evidence.",
  },
  {
    id: "S7",
    caption: "Research",
    title: "Research & Insights",
    tag: "Insight",
    body: "Structured research, QA sampling and voice-of-customer analysis that explains why the numbers move.",
  },
  {
    id: "S8",
    caption: "SOP library",
    title: "Process Documentation & SOPs",
    tag: "Process",
    body: "Every workflow captured as a clear, auditable SOP so performance survives attrition and scales cleanly.",
  },
  {
    id: "S9",
    caption: "Growth",
    title: "Sales & Lead Generation",
    tag: "Growth",
    body: "Outbound prospecting, LinkedIn sourcing and appointment setting run as a measured pipeline — led by operators who have carried sales targets and opened new markets.",
  },
];

export const gauges = [
  { k: "CSAT target", count: 94, prefix: "", suffix: "%", note: "Customer satisfaction" },
  { k: "AHT trend", count: 18, prefix: "−", suffix: "%", note: "Handle-time reduction" },
  { k: "FCR target", count: 85, prefix: "", suffix: "%", note: "First-contact resolution" },
  { k: "SLA", count: 99, prefix: "", suffix: "%", note: "In-SLA delivery" },
];

export const steps = [
  {
    num: "STEP 01",
    title: "Pilot",
    body: "A small, low-risk placement so you can see exactly how we manage performance before committing anything to scale.",
  },
  {
    num: "STEP 02",
    title: "Measure",
    body: "We baseline your KPIs and report against them from day one — no black box, no surprises at the quarterly review.",
  },
  {
    num: "STEP 03",
    title: "Scale",
    body: "Once the numbers hold, we grow the team on a plan built around your volume curve — not ours.",
  },
];

export const differentiators = [
  {
    title: "Operators, not middlemen",
    body: "Every founder has carried a queue and owned a P&L. You work with the people who actually run the floor.",
  },
  {
    title: "Accountable to SLA",
    body: "CSAT, AHT, FCR and SLA are written into how we work — and reviewed on a dashboard you can see, any day.",
  },
  {
    title: "Real domain range",
    body: "Healthcare (with licensed RN leadership), telecom, financial services, tech support and logistics under one roof.",
  },
  {
    title: "Data-driven by default",
    body: "Forecasting, real-time analytics and reporting sit at the centre of every account — not bolted on later.",
  },
];

// Team photos intentionally omitted — being collected. `photo: null` renders an initials placeholder.
export const team = [
  {
    initials: "MR",
    role: "Founder",
    name: "Mark Raven Cañete",
    position: "Technology & Operations",
    photo: "/images/team/mark-raven-canete.jpg",
    bio: "Operations and automation specialist spanning BPO leadership, web development and business-process automation. Mark builds the technology backbone behind delivery — from AI-powered client tools to internal reporting — so every managed team runs on modern, transparent infrastructure.",
  },
  {
    initials: "KC",
    role: "Co-Founder",
    name: "Karl Ian Martin Cañeda",
    position: "Client Operations",
    photo: "/images/team/karl-ian-caneda.jpeg",
    bio: "15+ years of operations leadership across healthcare, telecom, financial services and logistics, including roles at Sagility, Tech Mahindra and Fusion BPO. Karl builds high-performing teams, closes performance gaps through structured coaching, and runs multi-account operations that hit SLA and financial targets at once.",
  },
  {
    initials: "RL",
    role: "Co-Founder",
    name: "Rizzie Lynne Larios",
    position: "Healthcare Operations",
    photo: "/images/team/rizzie-larios.jpg",
    bio: "15+ years of contact-centre and healthcare operations leadership, including account management at Optum Global Solutions and Fusion BPO's US Healthcare division. A licensed Registered Nurse by training — a rare pairing of clinical depth and operations expertise on every healthcare account.",
  },
  {
    initials: "LG",
    role: "Co-Founder",
    name: "Lynlee Gesoro",
    position: "Workforce Management",
    photo: "/images/team/lynlee-gesoro.jpg",
    bio: "Workforce specialist with hands-on experience in real-time analytics, demand forecasting and resource scheduling at Teleperformance and Tech Mahindra. Lynlee keeps every account properly staffed and SLA-compliant, turning performance data into proactive coverage decisions.",
  },
  {
    initials: "KC",
    role: "Co-Founder",
    name: "Karl Ivan David “KID” Cañeda",
    position: "Operations & Growth",
    photo: "/images/team/kid-caneda.jpg",
    bio: "Strategic operations leader with 13+ years across BPO, healthcare and tech — currently running a major US streaming account at Concentrix, with prior leadership at Tech Mahindra, Foundever and UnitedHealth's Optum. KID pairs LEAN operational rigour with hands-on HR and business-development experience: he drives CSAT, AHT and FCR against contractual SLAs, manages program budgets and attrition, and builds the sales pipelines that open new markets.",
  },
];

export const principles = [
  "Provide high-quality, scalable service operations for global clients.",
  "Improve customer satisfaction and operational efficiency together.",
  "Operate with performance accountability and customer-first service.",
  "Continuously optimise processes through data-driven decisions.",
];

export const industries = [
  "Healthcare",
  "Telecom",
  "Financial services",
  "Tech support",
  "Logistics",
  "Other",
];

// ---- Contact-form option lists ----
// Area the prospect wants help with. "Others" reveals a free-text detail field.
export const interestAreas = [
  "KPI performance",
  "Sales",
  "Leads / lead generation",
  "Management & operations",
  "CRM efficiency",
  "Others",
];

// Preferred way to be contacted.
export const contactMethods = [
  "Zoom meeting",
  "Google Meet",
  "Email",
  "WhatsApp",
  "Viber",
];

// Rough engagement budget (monthly). Ranges keep it easy + comparable.
export const budgetRanges = [
  "Under $1,000 / mo",
  "$1,000 – $3,000 / mo",
  "$3,000 – $7,500 / mo",
  "$7,500 – $15,000 / mo",
  "$15,000+ / mo",
  "Not sure yet",
];

// Scrolling industry strip under the hero.
export const marqueeIndustries = [
  "Healthcare",
  "Telecom",
  "Financial services",
  "Tech support",
  "Travel",
  "Logistics",
  "Digital platforms",
];

// ---- "Why us" (expanded differentiators) ----
export const whyLead =
  "Most outsourcers sell seats. We sell a number you can watch — run by operators who have carried the queue themselves, on a scorecard that stays open every day of the engagement.";

export const scorecardMetrics = [
  { k: "CSAT", v: "94%" },
  { k: "FCR", v: "85%" },
  { k: "In-SLA", v: "99%" },
];

export const whyReasons = [
  {
    title: "Operators, not middlemen",
    body: "Every founder has carried a queue and owned a P&L — you work with the people who actually run the floor.",
  },
  {
    title: "Accountable to SLA",
    body: "CSAT, AHT, FCR and SLA are written into how we work — and reviewed on a dashboard you can see, any day.",
  },
  {
    title: "Licensed RN leadership",
    body: "A registered nurse leads healthcare accounts — clinical depth most vendors simply can't put on the floor.",
  },
  {
    title: "Real domain range",
    body: "Healthcare, telecom, financial services, tech support and logistics — all under one roof.",
  },
  {
    title: "Data-driven by default",
    body: "Forecasting and real-time analytics sit at the centre of every account — not bolted on later.",
  },
  {
    title: "Pilot-first, low risk",
    body: "You prove the numbers on a small, measured pilot before a single seat scales.",
  },
];

export const whyStats = [
  { to: 50, suffix: "+", label: "Years combined ops leadership" },
  { to: 13, suffix: "+", label: "Avg years per team lead" },
  { to: 5, suffix: "", label: "Core industries served" },
  { to: 99, suffix: "%", label: "In-SLA delivery target" },
];

// ---- /offshore-readiness — the interactive diagnostic page ----
// Prose paragraphs support inline links as [text](/path); the page renders them
// as real <a> elements so the links live in context, server-side.
export const readiness = {
  metaTitle:
    "Offshore Readiness Scorecard — Score Your Operation | Optimal Offshore Solutions",
  metaDescription:
    "A 20-point diagnostic built by BPO operators. Score your operation out of 100 in two minutes and see whether offshore fits your model — before it costs you.",

  hero: {
    kicker: "// Operations diagnostic",
    headline: "Is your offshore program drifting out of SLA?",
    // Answers the core query inside the first 40 words.
    standfirst:
      "If handle time is creeping, QA sampling is thinning and the QBR still says green, your program is drifting — the SLA number just hasn't caught up yet. Score your operation against the 20 signals that actually predict offshore performance.",
    cta: "Score your operation →",
    ctaNote: "Free · about two minutes · no email required for your score",
  },

  problem: {
    kicker: "The problem",
    title: "The QBR is a lagging indicator.",
    paragraphs: [
      "An offshore program almost never breaks in one visible moment. It drifts. Average handle time creeps eight seconds a week — nothing anyone escalates. QA sampling thins from ten contacts per agent to four because the team lead is now covering two queues. An experienced agent resigns and the backfill inherits the login but not the judgment. Each change is small enough to survive a weekly call. Together, they are a program quietly leaving SLA — and the quarterly review won't show it for another eight weeks.",
      "We've sat on both sides of that QBR table. The deck says green because monthly averages are generous: a 94% month can contain a 71% Tuesday, and it's the Tuesdays your customers remember. Underperformance has a vocabulary — ramp impact, seasonality, mix shift — and every one of those phrases is sometimes true, which is exactly what makes them dangerous.",
      "Here's the part most buyers get wrong: the drift usually isn't vendor dishonesty. It's the operating model. When a program is managed to occupancy and seat count, everything upstream of the SLA number is invisible by design. Nobody is paid to notice that the SOP no longer matches the workflow, that the exception queue has doubled, or that new-hire time-to-proficiency slid from six weeks to ten. Those are the numbers that break SLA later — and they're rarely on anyone's dashboard. It's why most of our [program recovery](/services/program-recovery) work starts with rebuilding the measurement, not the team.",
      "The uncomfortable truth is that drift starts before the contract is signed. Programs built on undocumented process, unmeasurable quality and heroic supervision drift by default, offshore or not — offshore just removes the hallway conversations that were quietly holding everything together. So the useful question isn't \"is my vendor underperforming?\" It's \"was this operation ready to be run at distance in the first place?\"",
      "That's a measurable question. The twenty signals below are what we check before we take on any program — the same list, ungated. Score yourself honestly; the low scores are the useful ones.",
    ],
  },

  signals: {
    kicker: "The four signals",
    title: "What actually predicts offshore success.",
    intro:
      "After enough program rescues, you stop believing the usual predictors. Vendor brand doesn't predict success. Hourly rate doesn't predict it in either direction. Even industry experience matters less than buyers assume. What predicts whether an offshore program still holds SLA at month twelve sits almost entirely on the client's side of the fence — and it comes down to four things.",
    items: [
      {
        title: "Process, written down",
        body: "Not aspirational documentation — the real workflow, including the exceptions, in a form a smart stranger could execute. When we take over a drifting program, the first artefact we ask for is the SOP, and the first thing we find is that it describes the process as it worked two systems ago. If your workflows are documented, measurable and genuinely runnable at distance — cloud systems, asynchronous communication — the hardest part of offshoring is already done.",
      },
      {
        title: "A management framework, not a manager",
        body: "Programs survive on structure: written role responsibilities, training material that exists before the vacancy does, performance measured on outcomes rather than visible effort. The floor-level tell is supervision. A team that needs constant shoulder-taps onshore will need them offshore too, where they aren't available. Every seat you outsource inherits your management system — it doesn't fix it.",
      },
      {
        title: "A real business case",
        body: "The programs that scale are the ones where offshore solves an actual constraint: roles you can't fill, labour as the dominant cost line, headcount that must move faster than local recruiting allows, leadership time bleeding into queue management. If none of those is true, offshore is a preference, not a strategy — and preferences get cancelled at the first rough quarter. The business-impact section of the scorecard reads inverted for exactly that reason: the more pain you admit to, the stronger your case.",
      },
      {
        title: "Technology and security posture",
        body: "The unglamorous one, and it delays more launches than everything else combined. A project management tool in live use, documented security protocols, systems with clean APIs or at least sane remote access, and a clear-eyed view of your data-privacy obligations. None of this is exotic; all of it takes weeks to retrofit under deadline. Security review is the most common reason a 30-day launch becomes a 90-day launch.",
      },
    ],
    outro: [
      "Notice what's not on the list: your industry, your size, your timezone, whether you've outsourced before. We've run healthcare queues under HIPAA with licensed clinical leadership, and we've run tech-support queues where the entire knowledge base was one shared document. Both can hold SLA. The difference was never the sector — it was these four signals. (If you want the mechanics of how we run an engagement against them, that's [our approach](/approach).)",
      "The scorecard below tests all four — five statements each, five points a statement, 100 in total. Answer honestly. The score computes on your device and never leaves it unless you ask for the full breakdown. A low score doesn't mean don't offshore; it means don't offshore yet — and it tells you exactly what to fix first, whether you fix it alone or with an [offshore setup partner](/services/offshore-setup-and-expansion).",
    ],
  },

  scorecard: {
    kicker: "The scorecard",
    title: "Twenty statements. Answer honestly.",
    instruction:
      "Mark each statement true or false for your operation today — not the operation you're planning to have. Your score updates live and is never sent anywhere.",
    resultPlaceholder: "Answer all 20 statements to see your band, diagnosis and quick wins.",
    yourScore: "Your score",
    quickWinsTitle: "Your three quick wins",
    quickWinsNote:
      "Free, specific, and worth doing whether or not you ever talk to us.",
  },

  gate: {
    title: "Get the full breakdown as a PDF",
    body: "The detailed scorecard: all four section scores explained, what each gap costs in practice, and the order we'd fix them in. Your score above stays free either way.",
    button: "Send me the scorecard",
    success: "Scorecard sent.",
    successBody: "Check your inbox — and you can download it directly here too:",
    downloadLabel: "Download the scorecard (PDF)",
    fineprint: "We reply within one business day. No spam, ever.",
  },

  whoBuilt: {
    kicker: "Who built this",
    title: "Written by operators, not marketers.",
    paragraphs: [
      "This diagnostic is the intake checklist we run before accepting any engagement at Optimal Offshore Solutions — a KPO delivery team in Bohol, Philippines, serving US and APAC clients. The founders have 50+ combined years running BPO floors: Karl Ian Martin Cañeda spent 15+ years leading operations across healthcare, telecom, financial services and logistics at Sagility, Tech Mahindra and Fusion BPO. Rizzie Lynne Larios — a licensed Registered Nurse — led US healthcare operations at Optum Global Solutions. Lynlee Gesoro ran workforce management and real-time analytics at Teleperformance and Tech Mahindra. Karl Ivan David Cañeda runs a major US streaming account at Concentrix, with prior leadership at Foundever and Optum.",
      "Every statement in the scorecard exists because we've watched its absence break a real program. [Meet the full team](/team), or see [how a pilot works](/book-a-pilot) if your score says you're ready.",
    ],
    attribution:
      "Written by the operators at Optimal Offshore Solutions · Reviewed by Karl Ian Martin Cañeda, Client Operations",
    lastReviewed: "2026-07-15",
    lastReviewedLabel: "Last reviewed 15 July 2026",
  },

  faqs: [
    {
      q: "How do I know if my company is ready to outsource offshore?",
      a: "You're ready when your processes are documented, quality is measurable, and the work can run without physical supervision. The fastest honest check: could a smart new hire do the job from your written material alone? If yes, offshore can work. The 20-point scorecard above measures exactly this.",
    },
    {
      q: "What is a KPO pilot and how long does it take?",
      a: "A pilot is a small, measured placement — typically one workflow and a small team — run against agreed KPIs for 60 to 90 days. It exists to prove performance on evidence before you commit to scale. We baseline your metrics on day one and report against them throughout.",
    },
    {
      q: "Why do offshore programs drift out of SLA?",
      a: "Because the leading indicators — handle-time creep, thinning QA samples, rising escalations, attrition backfill — move weeks before the SLA number does. Monthly averages hide interval-level misses, so the review deck still shows green. By the time SLA visibly breaks, the causes are months old.",
    },
    {
      q: "What's the difference between KPO and BPO?",
      a: "BPO delegates process execution: contact handling, data entry, back-office tasks. KPO — knowledge process outsourcing — delegates work that needs judgment and domain expertise: analysis, research, clinical review, reporting. Mature providers run both. The distinction that matters is whether the team is managed to outcomes or just occupancy.",
    },
    {
      q: "What should I document before offshoring a process?",
      a: "Four things per workflow: the trigger that starts it, the steps and decision points, the hand-offs and exceptions, and the definition of done with a measurable quality standard. One page per workflow beats a binder nobody reads. If exceptions outnumber rules, the process isn't ready to move.",
    },
    {
      q: "How is offshore performance actually measured?",
      a: "Against the same numbers you'd hold an internal team to: SLA, quality rate, handle time, first-contact resolution and unit cost — reported at interval level, not monthly averages. If your provider can't show you yesterday's numbers today, you're not measuring performance; you're receiving a newsletter.",
    },
    {
      q: "What does an in-SLA delivery target of 94% mean in practice?",
      a: "It means 94 of every 100 work items complete inside the agreed window — measured per interval, per day, not as a monthly average. The distribution matters more than the average: 94% overall can conceal one weekday running at 70%. Contract the target; publish the interval-level detail.",
    },
    {
      q: "Can I offshore if my data is sensitive or regulated?",
      a: "Yes, with controls: documented security protocols, least-privilege access, secure remote provisioning, and a provider who understands your obligations — HIPAA, GDPR, PCI or otherwise. Our healthcare accounts are led by a licensed Registered Nurse. If a vendor can't explain your regulation back to you, keep looking.",
    },
  ],

  finalCta: {
    title: "Your score says pilot? Prove it on a small one.",
    body: "One workflow, your KPIs, 60 days, no black box. We baseline the numbers on day one and you watch them on a live dashboard.",
    button: "Book a pilot →",
  },
};

// ---- Core values (Mission section). Icon is rendered in the component, keyed by `key`. ----
export const coreValues = [
  {
    key: "excellence",
    title: "Business Excellence",
    body: "A relentless focus on SLA, quality and measurable outcomes on every account we run.",
  },
  {
    key: "integrity",
    title: "Integrity",
    body: "Transparent reporting and honest numbers — even the hard ones. No black boxes, ever.",
  },
  {
    key: "innovation",
    title: "Innovation",
    body: "Automation, AI tooling and live analytics built into delivery — not bolted on after.",
  },
];
