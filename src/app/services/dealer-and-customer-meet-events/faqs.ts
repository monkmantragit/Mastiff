/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "What types of dealer and customer events do you manage?",
          a: "We manage dealer meets, customer appreciation events, channel partner conferences, and structured product demonstration events."
      },
      {
          q: "Can these events be customized for different audiences?",
          a: "Yes. Every event is tailored based on audience profile, business objectives, and brand positioning."
      },
      {
          q: "Do you handle end-to-end execution?",
          a: "Absolutely. From planning and logistics to live execution and post-event closure, we manage the complete lifecycle."
      },
      {
          q: "How early should dealer or customer meets be planned?",
          a: "Ideally 4–6 weeks in advance for larger events, though smaller meets can be organized on shorter timelines."
      },
      {
          q: "Do you provide post-event insights?",
          a: "Yes. We share feedback and engagement insights to help refine future dealer and customer engagement strategies."
      }
];
