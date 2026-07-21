import { Metadata } from "next";
import { generatePageMetadata, generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import SchemaMarkup from "@/components/schema-markup";
import GiftingClient from "./gifting-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Gifting in Bangalore | Massif Gifting Studio by White Massif",
  description: "Massif Gifting Studio curates corporate gifting for every occasion - welcome kits, festive hampers, employee appreciation, client gifting and awards. Customized, branded and delivered PAN India.",
  keywords: [
    "corporate gifting company Bangalore",
    "corporate gifts India",
    "employee welcome kits Bangalore",
    "customized corporate gifting",
    "Diwali corporate hampers",
    "branded corporate merchandise",
    "employee appreciation gifts",
    "client gifting solutions India",
    "sustainable corporate gifting",
    "bulk corporate gift orders",
    "conference delegate kits",
    "Massif Gifting Studio"
  ],
  openGraph: {
    type: "website",
    images: ["/assets/media/Services/Celebration Galore.jpg"]
  },
  path: "/gifting"
});

const giftingFAQs = [
  {
    question: "Do you customize gifts?",
    answer: "Yes. Customisation is at the core of what we do, from logo application and branded packaging to personalized notes, names, and messages on individual gifts."
  },
  {
    question: "What's the minimum order quantity?",
    answer: "Minimum quantities depend on the product and the level of customisation involved. Share your requirement and we will recommend options that work for your order size."
  },
  {
    question: "Can you deliver across India?",
    answer: "Yes. We handle PAN India delivery, including multi-location dispatch to individual employee addresses and direct delivery to your event venue."
  },
  {
    question: "Can you create gifts within a specific budget?",
    answer: "Absolutely. Tell us your per-gift budget and audience, and we will curate options that maximise perceived value without exceeding it."
  },
  {
    question: "Can you match our brand guidelines?",
    answer: "Yes. We work to your brand guidelines across colours, logo usage, typography, and tone, so every gift and every box looks like it came from you."
  },
  {
    question: "Do you offer sustainable gifting options?",
    answer: "Yes. We offer eco-friendly gifts, plant and seed paper kits, recycled merchandise, and sustainable packaging for CSR and green gifting initiatives."
  }
];

export default function GiftingPage() {
  return (
    <>
      <SchemaMarkup schema={[
        generateServiceSchema({
          name: "Massif Gifting Studio - Corporate Gifting",
          description: "Curated corporate gifting for every occasion. We design, source, customize, package, and deliver gifts that reflect your brand, with PAN India delivery.",
          image: "/assets/media/Services/Celebration Galore.jpg",
          serviceType: "Corporate Gifting",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Corporate Gifting Categories",
            itemListElement: [
              "Employee Onboarding Gifts",
              "Employee Appreciation Gifts",
              "Festive Celebration Hampers",
              "Conference & Summit Delegate Kits",
              "Product Launch & PR Kits",
              "Dealer & Channel Partner Gifts",
              "Annual Day & Townhall Gifts",
              "Awards & Recognition Gifts",
              "CSR & Sustainable Gifting",
              "Retirement & Farewell Gifts"
            ].map((name, index) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name },
              position: index + 1
            }))
          }
        }),
        generateFAQSchema(giftingFAQs),
        generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gifting", url: "/gifting" }
        ])
      ]} />
      <GiftingClient />
    </>
  );
}
