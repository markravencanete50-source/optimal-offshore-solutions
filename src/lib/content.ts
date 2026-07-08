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
