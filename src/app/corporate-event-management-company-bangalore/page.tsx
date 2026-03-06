import { Metadata } from 'next';
import CorporateEventManagementClient from './corporate-event-management-client';

export const metadata: Metadata = {
    title: 'Corporate Event Management Company in Bangalore | White Massif',
    description: 'Leading corporate event management company in Bangalore. End-to-end planning for conferences, annual days & hybrid events. Contact us.',
    alternates: {
        canonical: 'https://whitemassif.com/corporate-event-management-company-bangalore'
    }
};

export default function CorporateEventManagementPage() {
    return <CorporateEventManagementClient />;
}
