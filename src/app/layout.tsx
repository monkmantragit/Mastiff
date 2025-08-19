import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import Navigation from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import Footer from "@/components/footer";
import { PopupProvider } from "@/components/popup-provider";
import FloatingCTA from "@/components/floating-cta";
import Script from "next/script";
import "./globals.css";

// Brand primary font: Using Inter as closest alternative to Sinkin Sans
const sinkinSans = Inter({
  variable: "--font-sinkin-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Brand secondary font: Raleway
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "White Massif Event Management - Creating Moments That Matter",
  description: "Premier event management company in Bangalore specializing in corporate events, celebrations, inaugurations, and hybrid experiences. Creating extraordinary moments that matter since 2012.",
  keywords: ["Event Management", "Corporate Events", "Bangalore Events", "Event Planning", "Celebrations", "Inaugurations", "Hybrid Events", "Business Events"],
  authors: [{ name: "White Massif Event Management" }],
  creator: "White Massif Event Management",
  publisher: "White Massif Event Management",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/images/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: "wOFjHqwzvXVXcQ9xP0zeZCMDoj0s30z23U8QL10Avuc",
  },
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3JZS3H8914"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3JZS3H8914');
          `}
        </Script>
      </head>
      <body
        className={`${sinkinSans.variable} ${raleway.variable} antialiased`}
      >
        <PopupProvider>
          <Preloader />
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <FloatingCTA />
        </PopupProvider>
      </body>
    </html>
  );
}
