import { Metadata } from "next";
import SchemaMarkup from "@/components/schema-markup";
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-utils";
import { faqs } from "./faqs";
import EmployeeEngagementActivitiesClient from "./employee-engagement-activities-client";

export const metadata: Metadata = generatePageMetadata({
    title: "Employee Engagement Activities in Bangalore | White Massif",
    description: "Leading employee engagement activities company in Bangalore delivering exceptional team building, annual day celebrations, and employee engagement experiences.",
    keywords: [
        "employee engagement activities Bangalore",
        "team building events Bangalore",
        "annual day celebration Bangalore",
        "employee engagement company Bangalore",
        "team offsite Bangalore",
        "rewards and recognition events",
        "themed celebrations Bangalore"
    ],
    openGraph: {
        type: "website"
    },
    path: "/services/employee-engagement-activities"
});

export default function EmployeeEngagementActivitiesPage() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: "Employee Engagement Activities",
                        description: "Leading employee engagement activities company in Bangalore delivering exceptional team building, annual day celebrations, and employee engagement experiences.",
                        serviceType: "Employee Engagement Activities",
                        areaServed: ["Bangalore", "Karnataka", "India"],
                    }),
                    generateBreadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Services", url: "/services" },
                        { name: "Employee Engagement Activities", url: "/services/employee-engagement-activities" },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <EmployeeEngagementActivitiesClient />
        </>
    );
}

