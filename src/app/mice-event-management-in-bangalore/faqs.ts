/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "What does MICE include?",
          a: "MICE stands for Meetings, Incentives, Conferences, and Exhibitions, covering corporate programs that often involve travel and multi-day planning."
      },
      {
          q: "Do you handle travel bookings?",
          a: "We coordinate with trusted travel and hospitality partners to manage flights, transfers, and accommodation while overseeing the complete event flow."
      },
      {
          q: "Can you organize international conferences in Bangalore?",
          a: "Yes. Bangalore is globally connected, and we can support visa coordination and compliance protocols in collaboration with specialized partners."
      },
      {
          q: "Do you manage MICE budgets?",
          a: "Absolutely. We maintain detailed, transparent budgets covering venue rentals, production, hospitality, travel, and contingency planning, along with cost optimization strategies."
      },
      {
          q: "What’s the typical planning timeline?",
          a: "For multi-day MICE programs, 3–6 months is ideal. For single-day meetings, 8–10 weeks may be sufficient depending on scale."
      }
];
