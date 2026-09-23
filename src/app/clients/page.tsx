import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ClientsClient from "./clients-client";
import { ClientLogosService } from "@/lib/client-logos-service";
import { DirectusService } from "@/lib/directus-service";

// Fetched on the server so client logos and testimonials are in the HTML; refreshed hourly.
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Our Clients | Trusted By Leading Brands | White Massif",
  description: "Discover the top brands and businesses that have made White Massif their reliable event management partner. Our clients are proof of our creativity and event expertise.",
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
    type: "website",
    images: ["/WM LOGO-01.png"]
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
