import { Metadata } from "next";
import { generatePageMetadata, generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema, companyInfo } from "@/lib/seo-utils";
import SchemaMarkup from "@/components/schema-markup";
import GiftingClient from "./gifting-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Gifting Company in Bangalore | Massif Gifting Studio",
  description: "From new-joiner kits to Diwali hampers, Massif Gifting Studio plans corporate gifts your people actually want - customised, branded and delivered PAN India from Bangalore.",
  keywords: [
    "corporate gifting company in Bangalore",
    "corporate gifts India",
    "employee welcome kits",
    "employee onboarding kits",
    "corporate gift hampers",
    "Diwali corporate hampers",
    "employee appreciation and rewards",
    "digital gifting and e-gift cards",
    "wellness gift kits",
    "gourmet and artisanal hampers",
    "tech corporate gifts",
    "eco-friendly corporate gifts",
    "sustainable corporate gifting",
    "executive and luxury gifts",
    "bulk corporate gifts",
    "conference delegate kits",
    "corporate awards and trophies",
    "PAN India delivery",
    "Massif Gifting Studio"
  ],
  openGraph: {
    type: "website",
    images: ["/assets/media/Gifting/gifting-hero.png"]
  },
  path: "/gifting"
});

const giftingFAQs = [
  {
    question: "Do you customise gifts with our branding?",
    answer: "Yes - branding is the point. Logos, brand colours, custom packaging and personalised notes or names go on every gift in the order."
  },
  {
    question: "What's your minimum order quantity?",
    answer: "It depends on the product and how much customisation you want. Tell us the plan and we'll suggest options that fit your numbers and budget."
  },
  {
    question: "Do you deliver outside Bangalore?",
    answer: "Yes. We're based in Bangalore and dispatch PAN India - to one office, to your event venue, or to hundreds of individual home addresses."
  },
  {
    question: "Can you work to a fixed per-gift budget?",
    answer: "Absolutely. Give us a per-head budget and who it's for, and we'll get you the best-looking, best-feeling gift that number allows."
  },
  {
    question: "Do you offer digital or choice-based gifting?",
    answer: "Yes. Alongside physical gifts, we set up e-gift cards, curated catalogues and reward points, so recipients pick what they actually want."
  },
  {
    question: "Do you have sustainable gifting options?",
    answer: "Yes. Plantable seed-paper kits, recycled and bamboo products, and eco-friendly packaging are all available for CSR and green gifting programmes."
  }
];

export default function GiftingPage() {
  return (
    <>
      <SchemaMarkup schema={[
        {
          ...generateServiceSchema({
            name: "Corporate Gifting by Massif Gifting Studio",
            description: "Corporate gifting from Bangalore, delivered PAN India. Massif Gifting Studio by White Massif designs, sources, customises, packs and delivers welcome kits, festive hampers, rewards, client gifts and digital gifting programmes.",
            image: "/assets/media/Gifting/gifting-hero.png",
            provider: "Massif Gifting Studio by White Massif",
            serviceType: "Corporate Gifting",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Corporate Gifting Categories",
              itemListElement: [
                "Onboarding & Welcome Kits",
                "Rewards & Recognition",
                "Festive & Diwali Hampers",
                "Client & Partner Gifting",
                "Conference & Event Kits",
                "Employee Wellbeing Gifting",
                "Digital & Choice-Based Gifting",
                "Awards & Trophies",
                "Sustainable & CSR Gifting",
                "Gourmet & Artisanal Hampers"
              ].map((name, index) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
                position: index + 1
              }))
            }
          }),
          // Ties the service to the site-wide Organization / LocalBusiness entity
          provider: {
            "@type": "Organization",
            "@id": `${companyInfo.url}/#organization`,
            name: "Massif Gifting Studio by White Massif",
            url: `${companyInfo.url}/gifting`,
            parentOrganization: {
              "@type": "Organization",
              name: companyInfo.legalName,
              url: companyInfo.url
            },
            address: {
              "@type": "PostalAddress",
              ...companyInfo.address
            }
          },
          areaServed: {
            "@type": "Country",
            name: "India"
          }
        },
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
