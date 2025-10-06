import { Metadata } from 'next';

// Company information for White Massif - India focused
export const companyInfo = {
  name: "White Massif Event Management",
  legalName: "White Massif Event Management Private Limited",
  url: "https://whitemassif.com",
  logo: "https://whitemassif.com/WM%20LOGO-01.png",
  description: "Premier corporate event management company in India specializing in high-impact corporate events, conferences, team building activities, and brand experiences across Bangalore, Mumbai, Delhi, Chennai, Hyderabad, and Pune.",
  foundingDate: "2015",
  founders: ["Harsha", "Team White Massif"],
  email: "info@whitemassif.com",
  phone: "+91-80-4123-4567", // Add actual phone
  address: {
    streetAddress: "HSR Layout", // Update with actual address
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN"
  },
  geo: {
    latitude: "12.9121",
    longitude: "77.6446"
  },
  openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
  areaServed: [
    "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune",
    "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "India", "Karnataka"
  ],
  socialProfiles: [
    "https://www.linkedin.com/company/white-massif",
    "https://www.instagram.com/whitemassif",
    "https://www.facebook.com/whitemassif",
    "https://www.youtube.com/@whitemassif"
  ],
  serviceTypes: [
    "Corporate Events",
    "Product Launches",
    "Annual Day Celebrations",
    "Team Building Activities",
    "Conference Management",
    "Award Ceremonies",
    "Brand Activation",
    "Employee Engagement Programs",
    "Virtual Events",
    "Hybrid Events"
  ],
  keywords: {
    primary: [
      "corporate event management company in Bangalore",
      "event management companies in India",
      "corporate event planners Bangalore",
      "best event management company Karnataka",
      "corporate event organizers India"
    ],
    secondary: [
      "team building activities Bangalore",
      "product launch event management",
      "annual day celebration organizers",
      "conference management services India",
      "employee engagement event planners",
      "virtual event management India",
      "hybrid event solutions Bangalore"
    ],
    local: [
      "event management HSR Layout",
      "corporate events Koramangala",
      "event planners Indiranagar",
      "Whitefield event management",
      "Electronic City corporate events"
    ]
  }
};

// Organization Schema for Google Rich Results
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${companyInfo.url}/#organization`,
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: companyInfo.url,
    logo: {
      "@type": "ImageObject",
      url: companyInfo.logo,
      width: "200",
      height: "60"
    },
    description: companyInfo.description,
    foundingDate: companyInfo.foundingDate,
    founder: companyInfo.founders.map(founder => ({
      "@type": "Person",
      name: founder
    })),
    address: {
      "@type": "PostalAddress",
      ...companyInfo.address
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: companyInfo.phone,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada", "Tamil", "Telugu"]
      },
      {
        "@type": "ContactPoint",
        email: companyInfo.email,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      }
    ],
    sameAs: companyInfo.socialProfiles,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "175",
      bestRating: "5",
      worstRating: "1"
    }
  };
}

// LocalBusiness Schema for Local SEO in India
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${companyInfo.url}/#localbusiness`,
    name: companyInfo.name,
    image: [
      "https://whitemassif.com/assets/images/home/hero-image-1.jpg",
      "https://whitemassif.com/assets/images/home/hero-image-2.jpg",
      "https://whitemassif.com/assets/images/home/hero-image-3.jpg"
    ],
    url: companyInfo.url,
    telephone: companyInfo.phone,
    priceRange: companyInfo.priceRange,
    address: {
      "@type": "PostalAddress",
      ...companyInfo.address
    },
    geo: {
      "@type": "GeoCoordinates",
      ...companyInfo.geo
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00"
      }
    ],
    currenciesAccepted: companyInfo.currenciesAccepted,
    paymentAccepted: companyInfo.paymentAccepted,
    areaServed: companyInfo.areaServed.map(area => ({
      "@type": "City",
      name: area
    })),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", value: "Event Planning" },
      { "@type": "LocationFeatureSpecification", value: "Corporate Events" },
      { "@type": "LocationFeatureSpecification", value: "Virtual Events" }
    ]
  };
}

// Service Schema for Event Management Services
export function generateServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
  provider?: string;
  serviceType?: string;
  areaServed?: string[];
  hasOfferCatalog?: any;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: service.image,
    provider: {
      "@type": "Organization",
      name: service.provider || companyInfo.name,
      url: companyInfo.url
    },
    serviceType: service.serviceType || "Event Management",
    areaServed: service.areaServed || companyInfo.areaServed,
    hasOfferCatalog: service.hasOfferCatalog || {
      "@type": "OfferCatalog",
      name: `${service.name} Services`,
      itemListElement: companyInfo.serviceTypes.map((type, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: type
        },
        position: index + 1
      }))
    }
  };
}

// Article Schema for Blog Posts
export function generateArticleSchema(article: {
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    articleBody: article.content.substring(0, 1000),
    author: {
      "@type": "Person",
      name: article.author,
      url: `${companyInfo.url}/team`
    },
    publisher: {
      "@type": "Organization",
      name: companyInfo.name,
      logo: {
        "@type": "ImageObject",
        url: companyInfo.logo
      }
    },
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    image: article.image || companyInfo.logo,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url
    },
    keywords: article.keywords?.join(", ") || companyInfo.keywords.primary.join(", ")
  };
}

// Event Schema for Portfolio Items
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  image?: string;
  organizer?: string;
  eventType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.location ? {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      }
    } : undefined,
    image: event.image || companyInfo.logo,
    organizer: {
      "@type": "Organization",
      name: event.organizer || companyInfo.name,
      url: companyInfo.url
    },
    performer: {
      "@type": "Organization",
      name: companyInfo.name
    }
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${companyInfo.url}${item.url}`
    }))
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Person Schema for Team Members
export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
  telephone?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    email: person.email,
    telephone: person.telephone,
    worksFor: {
      "@type": "Organization",
      name: companyInfo.name,
      url: companyInfo.url
    }
  };
}

// JobPosting Schema for Careers
export function generateJobPostingSchema(job: {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  salary?: {
    currency: string;
    minValue?: number;
    maxValue?: number;
  };
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.employmentType || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: companyInfo.name,
      sameAs: companyInfo.url,
      logo: companyInfo.logo
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      }
    },
    baseSalary: job.salary ? {
      "@type": "MonetaryAmount",
      currency: job.salary.currency || "INR",
      value: job.salary.maxValue ? {
        "@type": "QuantitativeValue",
        minValue: job.salary.minValue,
        maxValue: job.salary.maxValue,
        unitText: "YEAR"
      } : job.salary.minValue
    } : undefined
  };
}

// WebSite Schema with SearchAction
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${companyInfo.url}/#website`,
    url: companyInfo.url,
    name: companyInfo.name,
    description: companyInfo.description,
    publisher: {
      "@id": `${companyInfo.url}/#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${companyInfo.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: ["en-IN", "en", "hi", "kn", "ta", "te"]
  };
}

// Generate comprehensive metadata for pages
export function generatePageMetadata({
  title,
  description,
  keywords,
  openGraph,
  path = "",
  images = [],
  noindex = false,
  alternates = {}
}: {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: any;
  path?: string;
  images?: string[];
  noindex?: boolean;
  alternates?: any;
}): Metadata {
  const fullUrl = `${companyInfo.url}${path}`;
  
  return {
    title: `${title}`,
    description,
    keywords: keywords?.join(", ") || companyInfo.keywords.primary.join(", "),
    authors: [{ name: companyInfo.name }],
    creator: companyInfo.name,
    publisher: companyInfo.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(companyInfo.url),
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-IN': fullUrl,
        'en': fullUrl,
        ...alternates
      }
    },
    openGraph: {
      title: `${title}`,
      description,
      url: fullUrl,
      siteName: companyInfo.name,
      images: images.length > 0 ? images : [companyInfo.logo],
      locale: 'en_IN',
      type: openGraph?.type || 'website',
      ...openGraph
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title}`,
      description,
      images: images.length > 0 ? images : [companyInfo.logo],
      creator: '@whitemassif'
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'pHX0F5J-O1NzC0IdjnmN3RgKaspBaSc2c5N4Zr8T5co',
    }
  };
}

// Helper to inject schema into page
export function renderSchema(schema: any | any[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return schemas.map(s => 
    `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(s)}) }} />`
  ).join('\n');
}

// India-specific SEO optimizations
export const indianSEOKeywords = {
  cities: [
    "Bangalore", "Bengaluru", "Mumbai", "Delhi", "Chennai", "Hyderabad",
    "Pune", "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "Kochi",
    "Jaipur", "Lucknow", "Chandigarh", "Indore", "Nagpur", "Surat"
  ],
  regions: [
    "Karnataka", "Maharashtra", "Tamil Nadu", "Telangana", "NCR",
    "Delhi NCR", "Gujarat", "Rajasthan", "Kerala", "Andhra Pradesh"
  ],
  eventTypes: [
    "corporate events", "product launches", "annual day",
    "team building", "conferences", "seminars", "workshops",
    "award ceremonies", "dealer meets", "employee engagement",
    "brand activation", "roadshows", "trade shows"
  ],
  industries: [
    "IT companies", "software companies", "MNCs", "startups",
    "pharmaceutical", "manufacturing", "banking", "finance",
    "healthcare", "education", "retail", "ecommerce"
  ]
};

// Generate location-specific content
export function generateLocationContent(city: string, region?: string) {
  return {
    title: `Event Management Company in ${city}${region ? `, ${region}` : ''}`,
    h1: `Leading Corporate Event Management Services in ${city}`,
    description: `White Massif - Your trusted corporate event management partner in ${city}. Specializing in corporate events, product launches, team building activities, and conferences. Serving ${region || city} with 175+ successful events for Fortune 500 companies.`,
    keywords: [
      `event management company in ${city}`,
      `corporate event planners ${city}`,
      `event organizers in ${city}`,
      `${city} event management services`,
      `best event company in ${region || city}`,
      `corporate events ${city}`,
      `team building activities ${city}`,
      `product launch events ${city}`
    ]
  };
}

// Generate FAQ content for common queries
export const commonFAQs = [
  {
    question: "What types of corporate events does White Massif manage in India?",
    answer: "White Massif specializes in managing various corporate events across India including product launches, annual day celebrations, team building activities, conferences, seminars, award ceremonies, dealer meets, employee engagement programs, and virtual/hybrid events."
  },
  {
    question: "Which cities in India does White Massif provide event management services?",
    answer: "We provide comprehensive event management services across major Indian cities including Bangalore, Mumbai, Delhi NCR, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, and other tier-1 and tier-2 cities across India."
  },
  {
    question: "How much does corporate event management cost in Bangalore?",
    answer: "Event management costs vary based on the scale, type, and requirements of your event. We offer customized packages starting from ₹50,000 for small corporate events to premium solutions for large-scale conferences and product launches. Contact us for a detailed quote."
  },
  {
    question: "What makes White Massif the best event management company in Karnataka?",
    answer: "With over 175+ successful events, a decade of experience, and partnerships with Fortune 500 companies, White Massif brings creativity, reliability, and seamless execution to every event. Our team of 20+ professionals ensures end-to-end event management with attention to detail."
  },
  {
    question: "Does White Massif handle virtual and hybrid events?",
    answer: "Yes, we specialize in virtual and hybrid event management with cutting-edge technology, professional streaming services, and engaging digital experiences that connect audiences across India and globally."
  }
];