// Centralized legal / business identity used across the legal pages
// (Privacy Policy, Terms of Use, Refund & Cancellation, Contact).
//
// Kept intentionally minimal and plain-spoken.
// Not legal advice — have these reviewed by counsel before relying on them.

export const LEGAL = {
  /** Product / service name (the core product). */
  brand: "Engram",
  /** Brand / trade name and the name we refer to ourselves by in the docs. */
  company: "hakuya.ai",
  /** Full registered company name (a private limited company). */
  legalName: "Hakuya.ai Private Limited",
  /** Primary marketing/site URL. */
  website: "https://hakuya.ai",
  /** Single contact inbox for support, privacy, and grievance requests. */
  contactEmail: "tech@hakuya.ai",
  /** Date the current versions take effect. Update when you revise the docs. */
  effectiveDate: "July 1, 2026",
  /** Payment processor used for managed-cloud subscriptions. */
  paymentProcessor: "Razorpay",
} as const;

// Footer / nav link table for the legal pages.
export const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "Refund & Cancellation", to: "/refunds" },
  { label: "Contact", to: "/contact" },
] as const;
