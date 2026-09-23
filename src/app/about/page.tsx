import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import AboutClient from "./about-client";

export const metadata: Metadata = generatePageMetadata({
  title: "About White Massif | Corporate Event Experts Since 2013",
  description: "Founded in 2013 in Bangalore, White Massif has delivered 1000+ corporate events. Meet the founders and the team behind them.",
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
    type: "website"
  },
  path: "/about"
});

export default function AboutPage() {
  return <AboutClient />;
}