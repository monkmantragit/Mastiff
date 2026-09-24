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
  'business-events': '/corporate-event-management-company-bangalore',
  'corporate-annual-events': '/corporate-event-management-company-bangalore',
  'celebrations-galore': '/services/employee-engagement-activities',
  'inaugurations': '/product-launch-event-management-in-bangalore',
  'hybrid-events': '/virtual-and-hybrid-events-in-bangalore',
  'industry-convention-customer-dealers-meet': '/services/dealer-and-customer-meet-events',
  'special-projects': '/services/industry-convention-project-events',
}

/**
 * Hand-built /services/* pages that duplicated a Bangalore page (same intent, split
 * ranking signals). Decision (Sep 2026): the Bangalore URL wins; these 301 to it and the
 * old folders were removed. Targets above point straight at the winners, so no chains.
 */
export const DUPLICATE_STATIC_SERVICE_REDIRECTS: Record<string, string> = {
  '/services/corporate-event-management': '/corporate-event-management-company-bangalore',
  '/services/hybrid-and-virtual-events': '/virtual-and-hybrid-events-in-bangalore',
  '/services/product-brand-launch-events': '/product-launch-event-management-in-bangalore',
}

export const DUPLICATE_SERVICE_SLUGS = new Set(Object.keys(DUPLICATE_SERVICE_REDIRECTS))
