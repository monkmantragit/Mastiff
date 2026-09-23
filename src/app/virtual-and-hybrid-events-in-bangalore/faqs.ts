/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "What is a hybrid corporate event?",
          a: "A hybrid event combines in-person attendees and online participants into a single synchronized experience using professional audiovisual and streaming systems."
      },
      {
          q: "How do you ensure there are no technical disruptions?",
          a: "We use professional streaming encoders, dedicated high-speed internet connections, and backup mobile hotspots for redundancy."
      },
      {
          q: "Can virtual attendees interact during the event?",
          a: "Yes. We enable moderated Q&A sessions, real-time polls, chat discussions, and breakout rooms for active participation."
      },
      {
          q: "Are hybrid events more expensive than physical events?",
          a: "Hybrid events involve additional production costs, but savings on travel, accommodation, and large-scale catering often balance budgets. The extended audience reach and reusable content typically provide higher overall ROI."
      },
      {
          q: "How do participants join the event?",
          a: "Attendees receive a secure access link with simple login instructions. Our support team remains available for technical assistance if required."
      }
];
