/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "How much does a corporate event cost?",
          a: "Pricing depends on scale (venue, AV, and guest count). Budgets range from ₹5–20L for mid-size events to ₹50L+ for large summits. We provide detailed quotes after understanding your requirements."
      },
      {
          q: "Do you handle large conferences (1,000+ attendees)?",
          a: "Yes. We have managed conferences of up to 5,000 attendees, coordinating multiple halls and live-streaming to overflow rooms."
      },
      {
          q: "Can you run hybrid/virtual town halls?",
          a: "Absolutely. We execute secure hybrid setups with high-quality streaming (using approved platforms) so remote employees can fully participate."
      },
      {
          q: "What lead time is needed?",
          a: "For medium events, plan 6–8 weeks. For large-scale conferences or peak season (October–December), 3–4 months is advisable to secure venues and production teams."
      },
      {
          q: "Can you ensure ROI is measured?",
          a: "Yes. We define success metrics (engagement scores, survey feedback, and business outcomes) during planning and report on them post-event."
      }
];
