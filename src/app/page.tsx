import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import HomeClient from "./home-client";

export const metadata: Metadata = generatePageMetadata({
  title: "White Massif - Trusted Corporate Event Management Company",
  description: "White Massif is a leading corporate event management company delivering seamless events, conferences, and celebrations tailored for businesses.",
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