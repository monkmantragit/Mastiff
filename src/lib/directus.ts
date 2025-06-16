import { createDirectus, rest } from '@directus/sdk';

// Define your Directus collections interface
interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  featured_image?: string;
  published_date: string;
  status: 'published' | 'draft';
  excerpt?: string;
  tags?: string[];
}

interface Page {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: 'published' | 'draft';
  meta_description?: string;
  featured_image?: string;
}

interface DirectusSchema {
  blog: Blog[];
  pages: Page[];
}

// Create Directus client
const directus = createDirectus<DirectusSchema>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
).with(rest());

export { directus };
export type { Blog, Page, DirectusSchema }; 