import { Metadata } from 'next';
import { DirectusService, type Blog } from '@/lib/directus-service';
import { generatePageMetadata } from '@/lib/seo-utils';
import BlogClient from './blog-client';

// Rendered on the server so every post card ships as a real <a href> in the initial HTML.
// While this fetched in a client-side useEffect, Googlebot received only a loading spinner
// and could not discover a single /blog/<slug> URL.
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: 'Corporate Event Insights & Ideas | White Massif Blog',
  description:
    'Expert insights on corporate event planning, conferences, product launches and employee engagement from White Massif, Bangalore’s leading event management company.',
  path: '/blog',
});

export default async function BlogPage() {
  let posts: Blog[] = [];

  try {
    posts = (await DirectusService.getBlogPosts()) || [];
  } catch (error) {
    console.error('Error fetching blog posts for listing:', error);
  }

  return <BlogClient posts={posts} />;
}
