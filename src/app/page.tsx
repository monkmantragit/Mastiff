import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import HomeClient from "./home-client";

export const metadata: Metadata = generatePageMetadata({
  title: "White Massif Event Management - Premier Corporate Events India",
  description: "Leading corporate event management company with 1000+ successful events across Bangalore, Mumbai, Delhi, Chennai. Specializing in conferences, celebrations, product launches, team building & brand experiences.",
  keywords: [
    "corporate event management company India",
    "event management companies Bangalore",
    "corporate event planners India",
    "best event management company Karnataka",
    "business event organizers Bangalore",
    "product launch events India",
    "annual day celebration organizers",
    "team building activities Bangalore",
    "conference management services India",
    "White Massif events",
    "event management HSR Layout Bangalore"
  ],
  openGraph: {
    type: "website",
    images: ["https://whitemassif.com/WM%20LOGO-01.png"]
  },
  path: "/"
});

export default function HomePage() {
  return <HomeClient />;
}