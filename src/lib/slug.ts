/** Client-safe slug helpers shared by pages, links and the sitemap. */

/** CMS slugs sometimes carry stray slashes or spaces (e.g. "/corporate-awards-night-planning"). */
export function normalizeSlug(slug: string | undefined | null): string {
  return (slug || '').trim().replace(/^\/+|\/+$/g, '');
}

/** Canonical path for a blog post. */
export function blogPath(post: { slug?: string | null; id: number | string }): string {
  return `/blog/${encodeURIComponent(normalizeSlug(post.slug) || String(post.id))}`;
}
