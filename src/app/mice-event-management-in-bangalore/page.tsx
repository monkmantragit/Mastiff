import { Metadata } from 'next';
import MiceEventClient from './mice-event-management-client';

export const metadata: Metadata = {
    title: 'MICE Event Management Bangalore | White Massif',
    description: 'Meetings, Incentives, Conferences & Exhibitions (MICE) event management in Bangalore. End-to-end planning for corporate retreats, conventions, and incentive travel. Learn more.',
    alternates: {
        canonical: 'https://whitemassif.com/mice-event-management-in-bangalore'
    }
};

export default function MiceEventPage() {
    return <MiceEventClient />;
}
