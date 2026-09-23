import { Metadata } from 'next';
import SchemaMarkup from '@/components/schema-markup';
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-utils';
import { faqs } from './faqs';
import ConferenceSummitClient from './conference-and-summit-management-client';

const PATH = '/conference-and-summit-management-in-bangalore';

// generatePageMetadata sets canonical, Open Graph and Twitter tags for this URL. The old
// hand-written metadata only set a canonical, so shares and crawlers inherited the
// homepage's og:url and title.
export const metadata: Metadata = generatePageMetadata({
    title: 'Conference & Summit Management in Bangalore | White Massif',
    description: 'Conference and summit management in Bangalore: multi-track agendas, delegate management, AV, staging and logistics for large corporate events.',
    path: PATH,
});

export default function Page() {
    return (
        <>
            <SchemaMarkup
                schema={[
                    generateServiceSchema({
                        name: 'Conference and Summit Management',
                        description: 'Conference and summit management in Bangalore: multi-track agendas, delegate management, AV, staging and logistics for large corporate events.',
                        serviceType: 'Conference and Summit Management',
                        areaServed: ['Bangalore', 'Karnataka', 'India'],
                    }),
                    generateBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Services', url: '/services' },
                        { name: 'Conference and Summit Management', url: PATH },
                    ]),
                    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />
            <ConferenceSummitClient />
        </>
    );
}
