import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import TeamClient from "./team-client";
import { TeamService } from "@/lib/team-service";

// Fetched on the server so team members are in the HTML; refreshed hourly from the CMS.
export const revalidate = 3600;

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
    images: ["/WM LOGO-01.png"]
  },
  path: "/team"
});

export default async function TeamPage() {
  const members = await TeamService.getAllTeamMembers();
  return <TeamClient teamStructure={TeamService.organize(members)} stats={TeamService.stats(members)} />;
}
