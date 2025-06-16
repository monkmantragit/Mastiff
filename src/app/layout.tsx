import type { Metadata } from "next";
import { Inter, Roboto_Condensed, Edu_NSW_ACT_Foundation } from "next/font/google";
import Navigation from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const eduNSW = Edu_NSW_ACT_Foundation({
  variable: "--font-edu-nsw",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "White Massif Event Management - Creating Moments That Matter",
  description: "Premier event management company in Bangalore specializing in corporate events, celebrations, inaugurations, and hybrid experiences. Creating extraordinary moments that matter since 2012.",
  keywords: ["Event Management", "Corporate Events", "Wedding Planning", "Bangalore Events", "Event Planning", "Celebrations", "Inaugurations", "Hybrid Events"],
  authors: [{ name: "White Massif Event Management" }],
  creator: "White Massif Event Management",
  publisher: "White Massif Event Management",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "White Massif Event Management - Creating Moments That Matter",
    description: "Premier event management company in Bangalore creating extraordinary experiences for corporate events, celebrations, and special occasions.",
    siteName: "White Massif Event Management",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Massif Event Management - Creating Moments That Matter",
    description: "Premier event management company in Bangalore creating extraordinary experiences for corporate events, celebrations, and special occasions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoCondensed.variable} ${eduNSW.variable} antialiased`}
      >
        <Preloader />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
