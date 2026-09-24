import { Metadata } from "next";
import SchemaMarkup from "@/components/schema-markup";
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-utils";
import { faqs } from "./faqs";
import DealerAndCustomerMeetEventsClient from "./dealer-and-customer-meet-events-client";

export const metadata: Metadata = generatePageMetadata({
    title: "Dealer & Customer Meet Events in Bangalore | White Massif",
    description: "Dealer, distributor and customer meet management in Bangalore: agenda, venues, recognition shows and logistics for channel-partner events.",
    keywords: [
        "dealer meet organizers Bangalore",
        "customer meet management",
        "channel partner events",
        "industry conventions Bangalore",
        "distributor meet planners",
        "corporate networking events",
        "business convention organizers"
    ],
    openGraph: {
        type: "website"
    },
    path: "/services/dealer-and-customer-meet-events"
});

export default function DealerAndCustomerMeetEventsPage() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: "Dealer and Customer Meet Events",
                        description: "Professional dealer and customer meet event management services in Bangalore. We organize impactful industry conventions, channel partner meets, and customer engagement events.",
                        serviceType: "Dealer and Customer Meet Events",
                        areaServed: ["Bangalore", "Karnataka", "India"],
                    }),
                    generateBreadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services" },
                        { name: "Dealer and Customer Meet Events", url: "/services/dealer-and-customer-meet-events" },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <DealerAndCustomerMeetEventsClient />
        </>
    );
}

