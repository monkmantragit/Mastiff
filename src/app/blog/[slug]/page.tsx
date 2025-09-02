import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { DirectusService, type Blog } from '@/lib/directus-service';
import SchemaMarkup from '@/components/schema-markup';
import { generateArticleSchema, generateBreadcrumbSchema, generatePageMetadata } from '@/lib/seo-utils';
import BlogPostClient from './blog-post-client';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Cache the blog post fetch for performance
const getBlogPost = cache(async (slug: string): Promise<Blog | null> => {
  try {
    const post = await DirectusService.getBlogPost(slug);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
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
    path: `/blog/${post.slug || post.id}`,
    images: post.featured_image ? [post.featured_image] : [],
    openGraph: {
      type: 'article',
      publishedTime: post.published_date,
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
  const allPosts = await DirectusService.getBlogPosts();
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  // Generate schemas for SEO
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || '',
    content: post.content || post.excerpt || '',
    author: post.author || 'White Massif Team',
    publishDate: post.published_date,
    modifiedDate: post.updated_at || post.published_date,
    image: post.featured_image,
    url: `/blog/${post.slug || post.id}`,
    keywords: post.tags
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug || post.id}` }
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
      slug: post.slug || post.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}