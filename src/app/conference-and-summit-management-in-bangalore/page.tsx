import { Metadata } from 'next';
import ConferenceSummitClient from './conference-and-summit-management-client';

export const metadata: Metadata = {
    title: 'Conference & Summit Management Bangalore | White Massif',
    description: 'Conference and summit event management in Bangalore. Delegate engagement, multi-track planning, AV and logistics for large-scale corporate events. Inquire today.',
    alternates: {
        canonical: 'https://whitemassif.com/conference-and-summit-management-in-bangalore'
    }
};

export default function ConferenceSummitPage() {
    return <ConferenceSummitClient />;
}
