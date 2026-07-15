import "server-only";
import { company } from "@/lib/content";

export type Lead = {
  firstName: string;
  email: string;
  company: string;
  phone?: string;
  availability?: string;
  contactMethod?: string;
  industry: string;
  interest?: string;
  budget?: string;
  challenge: string;
};

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);

/**
 * Sends lead emails via the Resend REST API (no SDK needed):
 *   1) internal notification to the sales inbox
 *   2) auto-reply confirmation to the person who submitted
 *
 * No-op (returns notified:false) when RESEND_API_KEY is unset, so the form
 * keeps working before email is configured. Never throws.
 *
 * Env:
 *   RESEND_API_KEY   (required to send)
 *   MAIL_FROM        default: "Optimal Offshore Solutions <hello@…>"
 *   LEAD_NOTIFY_TO   default: sales@…  (comma-separate for multiple)
 */
export async function sendLeadEmails(
  lead: Lead,
): Promise<{ notified: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { notified: false };

  const from = process.env.MAIL_FROM || `${company.name} <${company.email}>`;
  const notifyTo = (process.env.LEAD_NOTIFY_TO || company.salesEmail)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  try {
    // 1) internal notification — reply-to is the prospect so you can just hit reply
    const notify = await send({
      from,
      to: notifyTo,
      reply_to: lead.email,
      subject: `New pilot inquiry — ${lead.company}`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#111827">
          <h2 style="margin:0 0 12px">New pilot inquiry</h2>
          <p style="margin:4px 0"><strong>Name:</strong> ${esc(lead.firstName)}</p>
          <p style="margin:4px 0"><strong>Email:</strong> ${esc(lead.email)}</p>
          <p style="margin:4px 0"><strong>Phone:</strong> ${esc(lead.phone || "—")}</p>
          <p style="margin:4px 0"><strong>Preferred contact:</strong> ${esc(lead.contactMethod || "—")}</p>
          <p style="margin:4px 0"><strong>Best time:</strong> ${esc(lead.availability || "—")}</p>
          <p style="margin:4px 0"><strong>Company:</strong> ${esc(lead.company)}</p>
          <p style="margin:4px 0"><strong>Industry:</strong> ${esc(lead.industry)}</p>
          <p style="margin:4px 0"><strong>Looking for help with:</strong> ${esc(lead.interest || "—")}</p>
          <p style="margin:4px 0"><strong>Budget:</strong> ${esc(lead.budget || "—")}</p>
          <p style="margin:12px 0 4px"><strong>Details:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${esc(lead.challenge) || "—"}</p>
        </div>`,
    });

    if (!notify.ok) {
      const body = await notify.text();
      return { notified: false, error: `Resend ${notify.status}: ${body.slice(0, 300)}` };
    }

    // 2) auto-reply confirmation — best effort, don't fail the request on this
    await send({
      from,
      to: [lead.email],
      subject: `Thanks for reaching out to ${company.name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#111827;line-height:1.6">
          <p>Hi ${esc(lead.firstName)},</p>
          <p>Thanks for reaching out to ${company.name}. We've received your inquiry and a
          member of our operations team will get back to you within one business day —
          with how a low-risk pilot would work and the exact metrics we'd hold ourselves to.</p>
          <p>If anything is urgent in the meantime, just reply to this email.</p>
          <p>— The ${company.name} team</p>
        </div>`,
    }).catch(() => {});

    return { notified: true };
  } catch (e) {
    return { notified: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export type ReadinessLead = {
  firstName: string;
  email: string;
  company: string;
  industry: string;
  readinessScore: number;
  readinessBand: string;
  sectionScores: Record<string, number>;
};

/**
 * Emails for the offshore-readiness scorecard gate:
 *   1) internal notification to hello@ (READINESS_NOTIFY_TO overrides)
 *   2) auto-reply to the prospect with a link to the PDF breakdown
 *
 * Same contract as sendLeadEmails: no-op without RESEND_API_KEY, never throws.
 */
export async function sendReadinessEmails(
  lead: ReadinessLead,
  pdfUrl: string,
): Promise<{ notified: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { notified: false };

  const from = process.env.MAIL_FROM || `${company.name} <${company.email}>`;
  const notifyTo = (process.env.READINESS_NOTIFY_TO || company.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  const sectionRows = Object.entries(lead.sectionScores)
    .map(
      ([k, v]) =>
        `<p style="margin:4px 0"><strong style="text-transform:capitalize">${esc(k)}:</strong> ${v} / 25</p>`,
    )
    .join("");

  try {
    // 1) internal notification — a 76+ score should be called within the hour
    const notify = await send({
      from,
      to: notifyTo,
      reply_to: lead.email,
      subject: `Readiness scorecard lead — ${lead.company} (${lead.readinessScore}/100)`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#111827">
          <h2 style="margin:0 0 12px">Readiness scorecard lead</h2>
          <p style="margin:4px 0"><strong>Score:</strong> ${lead.readinessScore} / 100 (${esc(lead.readinessBand)})</p>
          ${sectionRows}
          <p style="margin:12px 0 4px"><strong>Name:</strong> ${esc(lead.firstName)}</p>
          <p style="margin:4px 0"><strong>Email:</strong> ${esc(lead.email)}</p>
          <p style="margin:4px 0"><strong>Company:</strong> ${esc(lead.company)}</p>
          <p style="margin:4px 0"><strong>Industry:</strong> ${esc(lead.industry)}</p>
        </div>`,
    });

    if (!notify.ok) {
      const body = await notify.text();
      return { notified: false, error: `Resend ${notify.status}: ${body.slice(0, 300)}` };
    }

    // 2) send the prospect the scorecard — best effort
    await send({
      from,
      to: [lead.email],
      subject: `Your offshore readiness scorecard — ${lead.readinessScore}/100`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#111827;line-height:1.6">
          <p>Hi ${esc(lead.firstName)},</p>
          <p>You scored <strong>${lead.readinessScore} / 100</strong> on the offshore readiness
          diagnostic. The full breakdown — every section explained, and the order we'd fix
          the gaps in — is here:</p>
          <p><a href="${pdfUrl}">Download the scorecard (PDF)</a></p>
          <p>If your score says you're ready and you want to see how a small, measured pilot
          would work against your own KPIs, just reply to this email.</p>
          <p>— The ${company.name} team</p>
        </div>`,
    }).catch(() => {});

    return { notified: true };
  } catch (e) {
    return { notified: false, error: e instanceof Error ? e.message : String(e) };
  }
}
