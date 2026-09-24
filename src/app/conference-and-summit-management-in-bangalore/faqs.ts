/**
 * FAQ content for this page. Shared by the visible FAQ section (client component) and
 * the FAQPage structured data (page.tsx), so the two can never drift apart.
 */
export const faqs: Array<{ q: string; a: string }> = [
      {
          q: "How far in advance should I plan a conference?",
          a: " For 500+ delegates, begin planning at least 3–4 months in advance. Large conventions or multi-day summits may require 6+ months for venue and sponsor alignment."
      },
      {
          q: "Do you handle delegate registration systems?",
          a: "Yes. We set up online registration portals, QR-based on-site check-in systems, badge printing stations, and self-service kiosks."
      },
      {
          q: "Can you coordinate international delegations?",
          a: "Yes. We collaborate with travel partners and DMCs to support visas, airport transfers, hotel bookings, and protocol management."
      },
      {
          q: "What technology capabilities do you provide?",
          a: "Professional A/V systems, live polling apps, interpretation equipment, Wi-Fi optimization, recording services, and secure streaming solutions."
      },
      {
          q: "Is on-site support included?",
          a: "Absolutely. Our team manages the event floor throughout the conference duration, often operating a centralized control room for multi-day events."
      }
];
