import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import VirtualHybridEventClient from './virtual-and-hybrid-events-client';

const PATH = '/virtual-and-hybrid-events-in-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'Virtual & Hybrid Corporate Events in Bangalore | White Massif',
    description: 'Virtual and hybrid corporate events in Bangalore: secure streaming, studio production, remote-audience engagement and on-site AV in one team.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'Virtual and Hybrid Event Management',
                        description: 'Virtual and hybrid corporate events in Bangalore: secure streaming, studio production, remote-audience engagement and on-site AV in one team.',
                        serviceType: 'Virtual and Hybrid Event Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'Virtual and Hybrid Event Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <VirtualHybridEventClient />
        </>
    );
}
