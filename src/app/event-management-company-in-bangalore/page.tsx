import { Metadata } from 'next';
import BangaloreClient from './bangalore-client';

export const metadata: Metadata = {
    title: 'Event Management Company in Bangalore | White Massif',
    description: 'Leading Bangalore event management firm. End-to-end corporate, conference, MICE, hybrid & awards event planning. Trusted since 2013. Call us!',
    alternates: {
        canonical: 'https://whitemassif.com/event-management-company-in-bangalore'
    }
};

export default function BangalorePage() {
    return <BangaloreClient />;
}
