import { createDirectus, rest, authentication } from '@directus/sdk';

// Define your Directus collections interface
interface Blog {
  id: number;
  title: string;
  content?: string;
  slug?: string;
  featured_image?: string;
  published_date: string;
  status: 'published' | 'draft' | 'active';
  excerpt?: string;
  tags?: string[];
  author?: string;
  read_time?: string;
  category?: string;
}

interface Page {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: 'published' | 'draft' | 'active';
  meta_description?: string;
  featured_image?: string;
}

interface Testimonial {
  id: number;
  client_name: string;
  company_name: string;
  job_title?: string;
  testimonial_image: string | { id: string };
  image_alt_text?: string;
  company_logo?: string | { id: string };
  industry?: string;
  sort_order?: number;
  is_featured?: boolean;
  status: 'published' | 'draft' | 'archived';
  date_created?: string;
  date_updated?: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
  content?: string;
  featured_image?: string;
  gallery?: string[];
  features?: ServiceFeature[];
  status: 'published' | 'draft' | 'active';
  icon?: string;
  category?: string;
  stats?: ServiceStats;
  highlights?: string[];
  meta_title?: string;
  meta_description?: string;
  sort_order?: number;
}

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceStats {
  events: string;
  satisfaction: string;
  clients: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  team_member_image?: string | { id: string; [key: string]: any };
  bio?: string;
  department: string;
  email?: string;
  phone?: string;
  status: 'published' | 'draft' | 'active';
  sort_order?: number;
}

interface LandingPage {
  id: number;
  title: string;
  slug: string;
  template: 'service' | 'event' | 'campaign' | 'general';
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  hero_video?: string;
  cta_text?: string;
  cta_link?: string;
  content?: string;
  form_fields?: FormField[];
  status: 'published' | 'draft' | 'active';
  meta_description?: string;
  tracking_code?: string;
}

interface FormField {
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  label: string;
  required: boolean;
  options?: string[];
}

interface PortfolioCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  sort_order: number;
  status: 'published' | 'draft';
}

interface PortfolioProject {
  id: number;
  status: 'published' | 'draft';
  title: string;
  slug: string;
  year: number;
  category: PortfolioCategory;
  description: string;
  featured_image?: any;
  gallery?: any[];
  client_name?: string;
  event_date?: string;
  location?: string;
  sort_order: number;
}

interface DirectusSchema {
  blog: Blog[];
  pages: Page[];
  services: Service[];
  testimonials: Testimonial[];
  team_members: TeamMember[];
  landing_pages: LandingPage[];
  portfolio_categories: PortfolioCategory[];
  portfolio_projects: PortfolioProject[];
}

// Create Directus client with proper Next.js configuration
const directus = createDirectus<DirectusSchema>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
).with(
  rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
  })
).with(authentication('json'));

export { directus };
export type { 
  Blog, 
  Page, 
  Service, 
  ServiceFeature, 
  ServiceStats, 
  Testimonial,
  TeamMember, 
  LandingPage, 
  FormField, 
  PortfolioCategory,
  PortfolioProject,
  DirectusSchema 
}; 