import 'server-only';
import {
  type Blog,
  type Page,
  type Service,
  type Testimonial,
  type TeamMember,
  type Job,
  type LandingPage
} from './directus';
import { directusItems } from './directus-server';

/**
 * Server-only CMS reads. Client components receive this data as props from their
 * server page; they must import types from '@/lib/directus', not from this module.
 *
 * All filters are passed as objects and serialised + URL-encoded by directusItems, so
 * slugs or categories containing quotes, '&' or '#' can no longer break or reshape a query.
 */

const BLOG_FIELDS = 'id,title,slug,content,featured_image,main_image,published_date,status,excerpt,tags,category,author,read_time,date_updated';

/** CMS slugs sometimes carry stray slashes or spaces (e.g. "/corporate-awards-night-planning"). */
export function normalizeSlug(slug: string | undefined | null): string {
  return (slug || '').trim().replace(/^\/+|\/+$/g, '');
}

export class DirectusService {
  /** All published blog posts, newest first. */
  static async getBlogPosts(): Promise<Blog[]> {
    return directusItems<Blog>('blog', {
      fields: BLOG_FIELDS,
      filter: { status: { _eq: 'published' } },
      sort: '-published_date',
      limit: -1,
    });
  }

  /** A single published blog post. Matches the slug with or without a stray leading slash. */
  static async getBlogPost(slug: string): Promise<Blog | null> {
    const clean = normalizeSlug(decodeURIComponent(slug));
    if (!clean) return null;
    const posts = await directusItems<Blog>('blog', {
      fields: BLOG_FIELDS,
      filter: { slug: { _in: [clean, `/${clean}`] }, status: { _eq: 'published' } },
      limit: 1,
    });
    return posts[0] || null;
  }

  static async getServices(): Promise<Service[]> {
    return directusItems<Service>('services', {
      fields: '*',
      filter: { status: { _eq: 'active' } },
      sort: 'id',
    });
  }

  static async getService(slug: string): Promise<Service | null> {
    const services = await directusItems<Service>('services', {
      fields: '*',
      filter: { slug: { _eq: slug }, status: { _eq: 'active' } },
      limit: 1,
    });
    return services[0] || null;
  }

  static async getServicesByCategory(category: string): Promise<Service[]> {
    return directusItems<Service>('services', {
      fields: '*',
      filter: { _and: [{ status: { _eq: 'active' } }, { category: { _eq: category } }] },
      sort: 'id',
    });
  }

  static async getTeamMembers(): Promise<TeamMember[]> {
    return directusItems<TeamMember>('team_members', {
      fields: '*,team_member_image.*',
      filter: { status: { _eq: 'active' } },
      sort: 'name',
    });
  }

  static async getLandingPages(): Promise<LandingPage[]> {
    return directusItems<LandingPage>('landing_pages', {
      fields: '*',
      filter: { status: { _eq: 'active' } },
      sort: 'title',
    });
  }

  static async getLandingPage(slug: string): Promise<LandingPage | null> {
    const pages = await directusItems<LandingPage>('landing_pages', {
      fields: '*',
      filter: { slug: { _eq: slug }, status: { _eq: 'active' } },
      limit: 1,
    });
    return pages[0] || null;
  }

  static async getTestimonials(): Promise<Testimonial[]> {
    return directusItems<Testimonial>('testimonials', {
      fields: '*',
      filter: { status: { _eq: 'published' } },
      sort: 'sort_order,-date_created',
    });
  }

  static async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return directusItems<Testimonial>('testimonials', {
      fields: '*',
      filter: { status: { _eq: 'published' }, is_featured: { _eq: true } },
      sort: 'sort_order,-date_created',
    });
  }

  static async getJobs(): Promise<Job[]> {
    return directusItems<Job>('jobs', {
      fields: '*',
      filter: { status: { _eq: 'published' } },
      sort: 'sort_order',
    });
  }
}

export type { Blog, Page, Service, Testimonial, TeamMember, Job, LandingPage };
