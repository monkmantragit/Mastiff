/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "How much lead time is needed to plan a Bangalore event?",
          a: "Typically 8–12 weeks. For large conferences or holiday periods, we suggest 4–6 months."
      },
      {
          q: "Can you handle city permits and local requirements?",
          a: "Yes. We coordinate with local authorities (e.g. traffic police for road shows, noise permits) and venue management as needed."
      },
      {
          q: "Do you provide audio-visual equipment?",
          a: "Absolutely. We supply professional sound systems, lighting rigs, LED screens, interpretation equipment, and streaming platforms for hybrid events."
      },
      {
          q: "Is there a local White Massif manager?",
          a: "Yes. Every Bangalore event has a dedicated Project Lead from our local team, backed by specialists in production and design."
      },
      {
          q: "What does a proposal include?",
          a: "Our proposal outlines concept ideas, budget estimates (venue, AV, staffing, etc.), a draft schedule, and projected outcomes. It’s usually delivered within 3 business days of briefing."
      }
];
