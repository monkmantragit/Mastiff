import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import Navigation from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import Footer from "@/components/footer";
import { PopupProvider } from "@/components/popup-provider";
import FloatingCTA from "@/components/floating-cta";
import SchemaMarkup from "@/components/schema-markup";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema, companyInfo, generatePageMetadata } from "@/lib/seo-utils";
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
  ...generatePageMetadata({
    title: "White Massif Event Management - Premier Corporate Event Managers in India",
    description: "Leading corporate event management company in India with 175+ successful events across Bangalore, Mumbai, Delhi, Chennai. Specializing in product launches, annual day celebrations, team building, conferences & brand activations.",
    keywords: [
      "corporate event management company in India",
      "event management companies in Bangalore",
      "corporate event planners Bangalore",
      "best event management company Karnataka",
      "corporate event organizers India",
      "team building activities Bangalore",
      "product launch event management India",
      "annual day celebration organizers",
      "conference management services India",
      "virtual event management India",
      "hybrid event solutions Bangalore",
      "employee engagement event planners",
      "brand activation events Mumbai",
      "corporate events Delhi NCR",
      "event management HSR Layout"
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      images: [companyInfo.logo]
    },
    images: [companyInfo.logo]
  }),
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>        
        {/* Essential SEO Schemas for Organization & Local Business */}
        <SchemaMarkup schema={[
          generateOrganizationSchema(),
          generateLocalBusinessSchema(),
          generateWebSiteSchema()
        ]} />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3JZS3H8914"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3JZS3H8914', {
              page_title: document.title,
              page_location: window.location.href,
              content_group1: 'Corporate Events',
              content_group2: 'India',
              custom_map: {'custom_parameter_1': 'business_type'},
              business_type: 'event_management'
            });
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "placeholder");
          `}
        </Script>
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://directus.whitemassif.com" />
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
