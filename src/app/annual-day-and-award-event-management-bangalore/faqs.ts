/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "When should we begin planning our annual day or awards night?",
          a: "Ideally 3–4 months in advance. Bangalore’s peak corporate event season (especially Q4) results in early venue bookings."
      },
      {
          q: "Do you provide complete audio and lighting for performances?",
          a: "Yes. We partner with leading production providers in Bangalore to deliver professional sound, lighting, and stage setups."
      },
      {
          q: "Can employees perform at the event?",
          a: "Absolutely. We facilitate rehearsals, manage stage coordination, and ensure appropriate audio-visual support for employee-led performances."
      },
      {
          q: "Can families be included in the celebration?",
          a: "Yes. We design separate kids’ activity zones or family-friendly layouts depending on company culture and preferences."
      },
      {
          q: "What safety measures are implemented?",
          a: "We coordinate crowd management with venue teams and arrange security oversight. Sanitization stations and spaced seating can also be implemented when required."
      }
];
