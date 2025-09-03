import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { DirectusService, type Service } from '@/lib/directus-service';
import SchemaMarkup from '@/components/schema-markup';
import { generateServiceSchema, generateBreadcrumbSchema, generatePageMetadata, companyInfo } from '@/lib/seo-utils';
import ServiceClient from './service-client';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Cache the service fetch for performance
const getService = cache(async (slug: string): Promise<Service | null> => {
  try {
    const service = await DirectusService.getService(slug);
    return service;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
});

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);
  
  if (!service) {
    return generatePageMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      noindex: true
    });
  }

  const keywords = [
    `${service.title.toLowerCase()} in India`,
    `${service.title.toLowerCase()} Bangalore`,
    `${service.title.toLowerCase()} event management`,
    `corporate ${service.title.toLowerCase()}`,
    `professional ${service.title.toLowerCase()} services`,
    service.category?.toLowerCase() || 'event services',
    'event management company India',
    'White Massif services',
    'corporate event planners Bangalore',
    'best event management services India'
  ];

  return generatePageMetadata({
    title: `${service.title} Services in India - White Massif Event Management`,
    description: service.description || `Professional ${service.title.toLowerCase()} services by White Massif - India's leading event management company. Specializing in corporate events, conferences, and brand experiences across major Indian cities.`,
    keywords,
    path: `/services/${service.slug || service.id}`,
    images: service.featured_image ? [service.featured_image] : [],
    openGraph: {
      type: 'article',
      section: 'Services',
      tags: [service.title, service.category || 'Event Management']
    }
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Fetch related services
  let relatedServices: Service[] = [];
  try {
    if (service.category) {
      const related = await DirectusService.getServicesByCategory(service.category);
      relatedServices = related.filter(s => s.id !== service.id).slice(0, 3);
    } else {
      // Fallback: get any services if no category
      const allServices = await DirectusService.getServices();
      relatedServices = allServices.filter(s => s.id !== service.id).slice(0, 3);
    }
  } catch (error) {
    console.error('Error fetching related services:', error);
  }

  // Generate schemas for SEO
  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.description || '',
    image: service.featured_image,
    serviceType: service.category || 'Event Management',
    areaServed: companyInfo.areaServed
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug || service.id}` }
  ]);

  return (
    <>
      {/* SEO Schemas */}
      <SchemaMarkup schema={[serviceSchema, breadcrumbSchema]} />
      
      {/* Client Component for Interactivity */}
      <ServiceClient service={service} relatedServices={relatedServices} />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const services = await DirectusService.getServices();
    return services.map((service) => ({
      slug: service.slug || service.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}