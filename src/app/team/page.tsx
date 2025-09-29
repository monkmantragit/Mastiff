import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import TeamClient from "./team-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Meet Our Team | White Massif Corporate Event Experts",
  description: "Discover the talented team at White Massif. Skilled event planners and creators delivering impactful corporate events with creativity and precision.",
  keywords: [
    "White Massif team",
    "corporate event team Bangalore",
    "event management experts",
    "White Massif staff",
    "event planning professionals",
    "corporate event specialists",
    "White Massif employees",
    "event management consultants",
    "Bangalore event planners",
    "corporate event management team"
  ],
  openGraph: {
    type: "website",
    images: ["https://whitemassif.com/WM%20LOGO-01.png"]
  },
  path: "/team"
});

export default function TeamPage() {
  return <TeamClient />;
}
