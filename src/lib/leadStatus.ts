// Lead pipeline stages, in funnel order. "booked" = pilot call booked — the
// headline conversion metric on the admin dashboard.
export const LEAD_STATUSES = ["new", "contacted", "qualified", "booked", "won", "lost"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  booked: "Pilot booked",
  won: "Won",
  lost: "Lost",
};
