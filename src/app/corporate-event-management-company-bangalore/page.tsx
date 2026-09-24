import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import CorporateEventManagementClient from './corporate-event-management-client';

const PATH = '/corporate-event-management-company-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'Corporate Event Management Company in Bangalore | White Massif',
    description: 'Corporate event management in Bangalore since 2013: conferences, town halls, annual days and hybrid events, planned and produced end to end by White Massif.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'Corporate Event Management',
                        description: 'Corporate event management in Bangalore since 2013: conferences, town halls, annual days and hybrid events, planned and produced end to end by White Massif.',
                        serviceType: 'Corporate Event Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'Corporate Event Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <CorporateEventManagementClient />
        </>
    );
}
