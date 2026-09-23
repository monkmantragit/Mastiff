import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ClientsClient from "./clients-client";
import { ClientLogosService } from "@/lib/client-logos-service";
import { DirectusService } from "@/lib/directus-service";

// Fetched on the server so client logos and testimonials are in the HTML; refreshed hourly.
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Our Clients | Brands That Trust White Massif",
  description: "175+ corporate clients, from Fortune 500 companies to fast-growing startups, trust White Massif with their conferences, launches and celebrations.",
  keywords: [
    "White Massif clients",
    "corporate clients Bangalore",
    "event management clients",
    "trusted brands White Massif",
    "corporate event clients India",
    "event planning testimonials",
    "White Massif testimonials",
    "client success stories",
    "corporate event case studies",
    "White Massif portfolio clients"
  ],
  openGraph: {
    type: "website"
  },
  path: "/clients"
});

export default async function ClientsPage() {
  const [testimonials, allLogos] = await Promise.all([
    DirectusService.getFeaturedTestimonials(),
    ClientLogosService.getAllClientLogos(),
  ]);
  return <ClientsClient testimonials={testimonials} allLogos={allLogos} />;
}
