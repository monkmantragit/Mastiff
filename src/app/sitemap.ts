import { MetadataRoute } from 'next'
import { DirectusService, normalizeSlug } from '@/lib/directus-service'
import { DUPLICATE_SERVICE_SLUGS } from '@/lib/service-redirects'

// Regenerated hourly so new blog posts and services appear without a redeploy.
export const revalidate = 3600

const baseUrl = 'https://www.whitemassif.com'

/**
 * Indexable hand-built pages. An explicit list (instead of scanning src/app at runtime):
 * the standalone production server has no src/ folder, so the scanner silently fell back
 * to a stale list that still contained /work. Not listed on purpose:
 * - /feedback, /thank-you: noindex
 * - /landing/*: paid-campaign pages, noindex
 * - /work and the /services/* pages that 301 to their Bangalore equivalents
 */
const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: '', priority: 1.0 },
  { path: '/corporate-event-management-company-bangalore', priority: 0.9 },
  { path: '/event-management-company-in-bangalore', priority: 0.9 },
  { path: '/services', priority: 0.9 },
  { path: '/product-launch-event-management-in-bangalore', priority: 0.8 },
  { path: '/virtual-and-hybrid-events-in-bangalore', priority: 0.8 },
  { path: '/conference-and-summit-management-in-bangalore', priority: 0.8 },
  { path: '/mice-event-management-in-bangalore', priority: 0.8 },
  { path: '/annual-day-and-award-event-management-bangalore', priority: 0.8 },
  { path: '/services/employee-engagement-activities', priority: 0.8 },
  { path: '/services/dealer-and-customer-meet-events', priority: 0.8 },
  { path: '/services/industry-convention-project-events', priority: 0.8 },
  { path: '/gifting', priority: 0.8 },
  { path: '/portfolio', priority: 0.7 },
  { path: '/clients', priority: 0.7 },
  { path: '/about', priority: 0.7 },
  { path: '/team', priority: 0.6 },
  { path: '/contact', priority: 0.7 },
  { path: '/careers', priority: 0.5 },
  { path: '/blog', priority: 0.7 },
]

// CMS slugs are free text and have contained stray spaces and leading slashes
// ("/corporate-awards-night-planning" produced /blog/%2F... which 404s).
const encodeSlug = (slug: string) => encodeURIComponent(normalizeSlug(slug))

function toDate(value?: string): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages carry no lastModified: file mtimes on a fresh checkout are all "now",
  // and a lastmod that changes on every deploy teaches Google to ignore it.
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority,
  }))

  const [blogPosts, services] = await Promise.all([
    DirectusService.getBlogPosts(),
    DirectusService.getServices(),
  ])

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => normalizeSlug(post.slug) || post.id)
    .map((post) => ({
      url: `${baseUrl}/blog/${encodeSlug(post.slug || String(post.id))}`,
      lastModified: toDate(post.date_updated) || toDate(post.published_date),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  const serviceRoutes: MetadataRoute.Sitemap = services
    // These slugs 301 to their Bangalore equivalent; a redirect in the sitemap is a
    // "Page with redirect" error in Search Console.
    .filter((service) => service.slug && !DUPLICATE_SERVICE_SLUGS.has(normalizeSlug(service.slug)))
    .map((service) => ({
      url: `${baseUrl}/services/${encodeSlug(service.slug)}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  // A CMS slug can collide with a hand-built route (e.g. /services/<slug>).
  const seen = new Set<string>()
  return [...staticRoutes, ...blogRoutes, ...serviceRoutes].filter((entry) => {
    const url = entry.url.replace(/\/$/, '')
    if (seen.has(url)) return false
    seen.add(url)
    return true
  })
}
