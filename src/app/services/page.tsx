import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ServicesClient from "./services-client";
import { ServicesMediaService } from "@/lib/services-media";

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Event Management Services | White Massif",
  description: "Corporate event services from White Massif: conferences, launches, annual days, awards, dealer meets, employee engagement and hybrid events in Bangalore.",
  keywords: [
    "event management services India",
    "corporate event services Bangalore",
    "business conference management",
    "product launch event services",
    "annual day celebration services",
    "team building services Bangalore",
    "hybrid event management India",
    "inauguration ceremony services",
    "dealer meet management",
    "special event projects India",
    "end-to-end event solutions",
    "White Massif services"
  ],
  openGraph: {
    type: "website",
    images: [ServicesMediaService.getServicesImages().servicesLanding]
  },
  path: "/services"
});

export default function ServicesPage() {
  return <ServicesClient />;
}