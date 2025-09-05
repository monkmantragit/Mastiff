import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import AboutClient from "./about-client";

export const metadata: Metadata = generatePageMetadata({
  title: "About White Massif - 12+ Years of Event Excellence",
  description: "Founded in 2013, White Massif has delivered 1000+ exceptional corporate events across India. Meet our team of event management experts in Bangalore leading innovation in corporate experiences.",
  keywords: [
    "about White Massif",
    "event management company history",
    "corporate event experts Bangalore",
    "event management team India",
    "White Massif founders",
    "event company background",
    "corporate event specialists",
    "Bangalore event planners about",
    "event management experience",
    "trusted event partners India"
  ],
  openGraph: {
    type: "website",
    images: ["https://whitemassif.com/WM%20LOGO-01.png"]
  },
  path: "/about"
});

export default function AboutPage() {
  return <AboutClient />;
}