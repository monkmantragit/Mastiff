import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ServicesClient from "./services-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Event Management Services - Corporate Events, Celebrations & More",
  description: "Comprehensive event management services including business conferences, celebrations, product launches, inaugurations, hybrid events and special projects across India. End-to-end event solutions.",
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
    images: ["https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/services/Services-%20Landing%20page_.jpg"]
  },
  path: "/services"
});

export default function ServicesPage() {
  return <ServicesClient />;
}