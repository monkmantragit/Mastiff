import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import CareersClient from "./careers-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Careers at White Massif | Build a Rewarding Career in Corporate Event Management",
  description: "Join White Massif and build a rewarding career in corporate event management. Explore opportunities to work with impactful brands and top brands.",
  keywords: [
    "White Massif careers",
    "event management jobs Bangalore",
    "corporate event careers",
    "event planning jobs India",
    "White Massif job openings",
    "event management opportunities",
    "career in events Bangalore",
    "event industry jobs",
    "corporate event job opportunities",
    "White Massif employment"
  ],
  openGraph: {
    type: "website",
    images: ["https://whitemassif.com/WM%20LOGO-01.png"]
  },
  path: "/careers"
});

export default function CareersPage() {
  return <CareersClient />;
}
