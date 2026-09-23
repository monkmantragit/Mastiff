import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import BangaloreClient from './bangalore-client';

const PATH = '/event-management-company-in-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'Event Management Company in Bangalore | White Massif',
    description: 'Bangalore event management company since 2013. Corporate events, conferences, MICE, hybrid events and awards nights, planned end to end. 1000+ events delivered.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'Event Management',
                        description: 'Bangalore event management company since 2013. Corporate events, conferences, MICE, hybrid events and awards nights, planned end to end. 1000+ events delivered.',
                        serviceType: 'Event Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'Event Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <BangaloreClient />
        </>
    );
}
