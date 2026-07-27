/**
 * The site grew two parallel sets of service pages: CMS-driven `/services/<slug>` entries
 * with generic "... Services in India" titles, and hand-built folder routes optimised for
 * "... in Bangalore". Seven CMS slugs targeted the same queries as a Bangalore page, so the
 * two URLs competed with each other and split their own ranking signals.
 *
 * Each duplicate is permanently redirected into the page we want to rank, which also passes
 * its accumulated link equity across. These slugs are excluded from the sitemap and from
 * static generation so nothing points at a URL that only returns a redirect.
 *
 * The mapping follows the labels already used in `services-client.tsx` (e.g. "Celebrations
 * Galore" is the label for /services/employee-engagement-activities).
 *
 * To undo: remove an entry here and the slug returns to being a normal, indexable page.
 */
export const DUPLICATE_SERVICE_REDIRECTS: Record<string, string> = {
  'business-events': '/services/corporate-event-management',
  'corporate-annual-events': '/services/corporate-event-management',
  'celebrations-galore': '/services/employee-engagement-activities',
  'inaugurations': '/services/product-brand-launch-events',
  'hybrid-events': '/services/hybrid-and-virtual-events',
  'industry-convention-customer-dealers-meet': '/services/dealer-and-customer-meet-events',
  'special-projects': '/services/industry-convention-project-events',
}

export const DUPLICATE_SERVICE_SLUGS = new Set(Object.keys(DUPLICATE_SERVICE_REDIRECTS))
