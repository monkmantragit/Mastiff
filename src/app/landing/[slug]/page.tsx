import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { DirectusService } from '@/lib/directus-service';
import { generatePageMetadata } from '@/lib/seo-utils';
import LandingClient from './landing-client';

/**
 * Paid-campaign landing pages. Rendered on the server (content in the initial HTML,
 * real 404 for unknown slugs) and kept out of the search index: they duplicate the
 * service pages and exist for ad traffic.
 */

export const revalidate = 3600;

const getLandingPage = cache((slug: string) => DirectusService.getLandingPage(slug));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) {
    return generatePageMetadata({ title: 'Page Not Found', description: 'This page could not be found.', noindex: true });
  }
  return generatePageMetadata({
    title: page.hero_title || page.title,
    description: page.meta_description || page.hero_subtitle || `${page.title} by White Massif, corporate event management in Bangalore.`,
    path: `/landing/${page.slug}`,
    noindex: true,
  });
}

export default async function LandingPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landingPage = await getLandingPage(slug);
  if (!landingPage) notFound();
  return <LandingClient landingPage={landingPage} />;
}
