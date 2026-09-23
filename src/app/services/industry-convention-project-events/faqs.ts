/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "What types of industry events do you manage?",
          a: "We manage trade shows, exhibitions, industry conventions, specialized workshops, and fully customized event projects."
      },
      {
          q: "Can you handle large-scale, multi-day events?",
          a: "Yes. We have experience managing large, multi-day conventions with multiple stakeholders, sessions, and exhibitors."
      },
      {
          q: "Do you offer customized event formats?",
          a: "Absolutely. We design custom event solutions based on unique objectives, audiences, and environments."
      },
      {
          q: "How early should industry conventions be planned?",
          a: "Large-scale events ideally require 2–4 months of planning, depending on complexity and scale."
      },
      {
          q: "Do you support post-event reporting and insights?",
          a: "Yes. We provide feedback summaries and insights to help evaluate event success and guide future planning."
      }
];
