import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import MiceEventClient from './mice-event-management-client';

const PATH = '/mice-event-management-in-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'MICE Event Management in Bangalore | White Massif',
    description: 'MICE event management in Bangalore: meetings, incentive trips, conferences and exhibitions, with venues, travel and on-ground delivery handled end to end.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'MICE Event Management',
                        description: 'MICE event management in Bangalore: meetings, incentive trips, conferences and exhibitions, with venues, travel and on-ground delivery handled end to end.',
                        serviceType: 'MICE Event Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'MICE Event Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <MiceEventClient />
        </>
    );
}
