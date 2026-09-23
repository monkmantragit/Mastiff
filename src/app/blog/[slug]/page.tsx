import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { DirectusService, type Blog } from '@/lib/directus-service';
import { blogPath, normalizeSlug } from '@/lib/slug';
import { getDirectusAssetUrl } from '@/lib/directus-utils';
import SchemaMarkup from '@/components/schema-markup';
import { generateArticleSchema, generateBreadcrumbSchema, generatePageMetadata } from '@/lib/seo-utils';
import BlogPostClient from './blog-post-client';

// Rebuilt at most hourly so CMS edits and new posts go live without a redeploy.
export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Cache the blog post fetch for performance
// No try/catch: a CMS outage must throw (Next keeps serving the cached page) instead of
// returning null, which would render and cache a 404 for a page that exists.
const getBlogPost = cache((slug: string): Promise<Blog | null> => DirectusService.getBlogPost(slug));

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);
  
  if (!post) {
    return generatePageMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      noindex: true
    });
  }

  const keywords = [
    ...(post.tags || []),
    "corporate events",
    "event management",
    "Bangalore events",
    "India corporate events",
    "White Massif insights",
    post.category || "business insights"
  ];

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt || `${post.title} - Expert insights from White Massif Event Management on corporate events, planning strategies, and industry trends in India.`,
    keywords,
    path: blogPath(post),
    // featured_image is a Directus file id, not a URL; resolve it (via the asset proxy).
    images: [getDirectusAssetUrl(post.featured_image || post.main_image, { width: 1200, height: 630, fit: 'cover' })].filter((u): u is string => Boolean(u)),
    openGraph: {
      type: 'article',
      publishedTime: post.published_date,
      modifiedTime: post.date_updated || post.published_date,
      authors: [post.author || 'White Massif Team'],
      section: post.category || 'Event Management',
      tags: post.tags
    }
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const allPosts = await DirectusService.getBlogPosts().catch(() => [] as Blog[]);
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  // Generate schemas for SEO
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || '',
    content: post.content || post.excerpt || '',
    author: post.author || 'White Massif Team',
    publishDate: post.published_date,
    modifiedDate: post.date_updated || post.published_date,
    image: getDirectusAssetUrl(post.featured_image || post.main_image, { width: 1200, height: 630, fit: 'cover' }),
    url: blogPath(post),
    keywords: post.tags
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: blogPath(post) }
  ]);

  return (
    <>
      {/* SEO Schemas */}
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />
      
      {/* Client Component for Interactivity */}
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}

// Generate static params for static generation (ISG - Incremental Static Generation)
export async function generateStaticParams() {
  try {
    const posts = await DirectusService.getBlogPosts();
    return posts.map((post) => ({
      slug: normalizeSlug(post.slug) || String(post.id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}