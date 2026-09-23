import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import PortfolioClient from "./portfolio-client";
import { WorkMediaService } from "@/lib/work-media";

// Fetched on the server so projects are in the HTML; refreshed hourly from the CMS.
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "White Massif | Successful Corporate Events",
  description: "Showcasing White Massif's corporate portfolio with successful conferences, launches, corporate events, impact brand experiences in Bangalore",
  keywords: [
    "White Massif portfolio",
    "corporate events portfolio Bangalore",
    "event management showcase",
    "corporate event examples",
    "White Massif projects",
    "event planning portfolio India",
    "corporate event gallery",
    "successful events showcase",
    "event management case studies",
    "White Massif work examples"
  ],
  openGraph: {
    type: "website",
    images: ["/WM LOGO-01.png"]
  },
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const portfolioItems = await WorkMediaService.getPortfolioItems();
  return <PortfolioClient portfolioItems={portfolioItems} />;
}
