import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import ClientsClient from "./clients-client";

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
    images: ["https://whitemassif.com/WM%20LOGO-01.png"]
  },
  path: "/clients"
});

export default function ClientsPage() {
  return <ClientsClient />;
}
