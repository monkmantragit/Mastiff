import { Metadata } from "next";
import SchemaMarkup from "@/components/schema-markup";
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-utils";
import { faqs } from "./faqs";
import IndustryConventionProjectEventsClient from "./industry-convention-project-events-client";

export const metadata: Metadata = generatePageMetadata({
    title: "Industry Convention & Project Events in Bangalore | White Massif",
    description: "Industry conventions and project milestone events in Bangalore: large-format planning, exhibitions, delegate management and on-ground execution.",
    keywords: [
        "industry convention organizers Bangalore",
        "project launch events",
        "industry summits management",
        "corporate convention planners",
        "large scale event management",
        "project milestone celebrations",
        "business convention agency"
    ],
    openGraph: {
        type: "website"
    },
    path: "/services/industry-convention-project-events"
});

export default function IndustryConventionProjectEventsPage() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: "Industry Convention and Project Events",
                        description: "Professional industry convention and project event management services in Bangalore. We organize large-scale conventions, project milestone events, and industry summits.",
                        serviceType: "Industry Convention and Project Events",
                        areaServed: ["Bangalore", "Karnataka", "India"],
                    }),
                    generateBreadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services" },
                        { name: "Industry Convention and Project Events", url: "/services/industry-convention-project-events" },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <IndustryConventionProjectEventsClient />
        </>
    );
}

