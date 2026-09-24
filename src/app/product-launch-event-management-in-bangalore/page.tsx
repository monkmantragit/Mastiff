import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import ProductLaunchEventClient from './product-launch-event-management-in-bangalore';

const PATH = '/product-launch-event-management-in-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'Product Launch Event Management in Bangalore | White Massif',
    description: 'Product, brand and facility launch events in Bangalore: concept, reveal moments, staging, media and guest management from White Massif.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'Product Launch Event Management',
                        description: 'Product, brand and facility launch events in Bangalore: concept, reveal moments, staging, media and guest management from White Massif.',
                        serviceType: 'Product Launch Event Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'Product Launch Event Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <ProductLaunchEventClient />
        </>
    );
}
