import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import AnnualDayEventClient from './annual-day-event-client';

const PATH = '/annual-day-and-award-event-management-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'Annual Day & Awards Night Management in Bangalore | White Massif',
    description: 'Annual day and corporate awards night management in Bangalore: concept, stage, AV, entertainment and run-of-show, delivered end to end by White Massif.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'Annual Day and Awards Event Management',
                        description: 'Annual day and corporate awards night management in Bangalore: concept, stage, AV, entertainment and run-of-show, delivered end to end by White Massif.',
                        serviceType: 'Annual Day and Awards Event Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'Annual Day and Awards Event Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <AnnualDayEventClient />
        </>
    );
}
