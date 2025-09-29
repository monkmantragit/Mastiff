import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ServicesClient from "./services-client";

export const metadata: Metadata = generatePageMetadata({
  title: "White Massif Services | Successful Corporate Events",
  description: "Discover the top brands and businesses that White Massif has delivered successful corporate event management for the past decade, innovative brand experiences.",
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