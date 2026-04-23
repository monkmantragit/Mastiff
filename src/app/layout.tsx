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
import { ServicesMediaService } from "@/lib/services-media";
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
  icons: [
    {
      rel: 'icon',
      url: '/favicon.png',
      type: 'image/png',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.png',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="wOFjHqwzvXVXcQ9xP0zeZCMDoj0s30z23U8QL10Avuc" />

        {/* Favicon - Force override Vercel default */}
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />

        {/* Critical CSS - Inline for faster FCP */}
        <style dangerouslySetInnerHTML={{ __html: `*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto}body{margin:0;line-height:inherit}.min-h-screen{min-height:100vh}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.text-center{text-align:center}.object-cover{object-fit:cover}.overflow-hidden{overflow:hidden}.animate-spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}` }} />

        {/* Essential SEO Schemas for Organization & Local Business */}
        <SchemaMarkup schema={[
          generateOrganizationSchema(),
          generateLocalBusinessSchema(),
          generateWebSiteSchema()
        ]} />


        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W9GQF7WR');`}
        </Script>

        {/* Google Analytics - Deferred for performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3JZS3H8914"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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

        {/* Google Ads - Click to Call Conversion Tracking */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-971911197/C5M0CMSGq4YcEJ3guM8D',
                  'value': 1.0,
                  'currency': 'INR',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>

        {/* Microsoft Clarity - Deferred for performance */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "placeholder");
          `}
        </Script>


        <link
          rel="preload"
          as="image"
          href={ServicesMediaService.getServicesImages().servicesLanding}
          fetchPriority="high"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://directus.whitemassif.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${sinkinSans.variable} ${raleway.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9GQF7WR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <PopupProvider>
          <Preloader />
          {/* <CustomCursor /> */}
          <Navigation />
          <main>{children}</main>
          <Footer />
          <FloatingCTA />
        </PopupProvider>
      </body>
    </html>
  );
}
