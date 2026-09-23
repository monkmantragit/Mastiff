import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ContactClient from "./contact-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact White Massif - Get Event Management Quote",
  description: "Contact White Massif for corporate event management in Bangalore. Call +91 74112 72227, WhatsApp or send your event brief for a proposal.",
  keywords: [
    "contact White Massif",
    "event management contact Bangalore",
    "corporate event quote India",
    "event planning consultation",
    "contact event managers",
    "event management inquiry",
    "White Massif office Bangalore",
    "HSR Layout event planners",
    "book event management services",
    "request event proposal",
    "event planning contact form"
  ],
  openGraph: {
    type: "website"
  },
  path: "/contact"
});

export default function ContactPage() {
  return <ContactClient />;
}