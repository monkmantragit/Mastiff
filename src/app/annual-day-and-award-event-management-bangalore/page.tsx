import { Metadata } from "next";
import AnnualDayEventClient from "./annual-day-event-client";

export const metadata: Metadata = {
    title: "Annual Day & Awards Night Bangalore | White Massif",
    description: "Annual day and corporate awards night management in Bangalore. Celebrate achievements with professional stage, AV, entertainment and flawless execution. Contact us.",
    alternates: {
        canonical: 'https://whitemassif.com/annual-day-and-award-event-management-bangalore'
    }
};

export default function AnnualDayEventPage() {
    return <AnnualDayEventClient />;
}
