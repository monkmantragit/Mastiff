import { MetadataRoute } from 'next'
import { DirectusService } from '@/lib/directus-service'
import { DUPLICATE_SERVICE_SLUGS } from '@/lib/service-redirects'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.whitemassif.com'

  // Routes that must never appear in the sitemap: either blocked in robots.ts or
  // intentionally kept out of the index. Listing them here would contradict those signals.
  const excludedRoutes = new Set(['/feedback', '/thank-you'])

  // Dynamic Static Routes Scanner
  const srcAppDir = path.join(process.cwd(), 'src', 'app');
  let scannedStaticRoutes: MetadataRoute.Sitemap = [];

  try {
    const scanDir = (dir: string, baseRoute = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          // Ignore api folder, dynamic route folders [slug], and hidden folders
          if (entry.name === 'api' || entry.name.startsWith('[') || entry.name.startsWith('.') || entry.name === 'fonts' || entry.name === 'components' || entry.name === 'lib') {
            continue;
          }

          // Handle Route Groups (e.g. (main) -> ignore the folder name entirely in the route string)
          const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')');
          const newBaseRoute = isRouteGroup ? baseRoute : `${baseRoute}/${entry.name}`;

          scanDir(path.join(dir, entry.name), newBaseRoute);
        } else if (entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.jsx')) {
          // Found a page! If baseRoute is empty, it's the home page '/'
          const routePath = baseRoute === '' ? '' : baseRoute;

          if (excludedRoutes.has(routePath)) {
            continue;
          }

          // Use the page file's real mtime. A per-request `new Date()` marks every URL as
          // "just changed" on every fetch, which teaches Google to ignore our lastmod entirely.
          const pageFile = path.join(dir, entry.name);

          scannedStaticRoutes.push({
            url: `${baseUrl}${routePath}`,
            lastModified: fs.statSync(pageFile).mtime,
            changeFrequency: 'weekly' as const,
            priority: routePath === '' ? 1.0 : 0.8,
          });
        }
      }
    };

    scanDir(srcAppDir);
  } catch (error) {
    console.error('Error scanning static routes for sitemap:', error);

    // Fallback if scanning fails for any reason
    scannedStaticRoutes = [
      '',
      '/about',
      '/services',
      '/portfolio',
      '/work',
      '/team',
      '/clients',
      '/careers',
      '/blog',
      '/contact',
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }));
  }

  // Dynamic blog posts
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const blogPosts = await DirectusService.getBlogPosts()
    blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.published_date ? new Date(post.published_date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Dynamic services
  let serviceRoutes: MetadataRoute.Sitemap = []
  try {
    const services = await DirectusService.getServices()
    serviceRoutes = services
      // These slugs now 301 to their Bangalore equivalent; listing a redirect in the
      // sitemap is exactly the "Page with redirect" signal we are clearing out.
      .filter((service) => !DUPLICATE_SERVICE_SLUGS.has(service.slug))
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch (error) {
    console.error('Error fetching services for sitemap:', error)
  }

  // Dynamic landing pages
  let landingPageRoutes: MetadataRoute.Sitemap = []
  try {
    const landingPages = await DirectusService.getLandingPages()
    landingPageRoutes = landingPages.map((page) => ({
      url: `${baseUrl}/landing/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching landing pages for sitemap:', error)
  }

  // A CMS slug can collide with a hand-built route folder (e.g. /services/<slug>).
  // Emitting the same <loc> twice is a quality signal Google counts against the sitemap.
  const seen = new Set<string>()
  return [...scannedStaticRoutes, ...blogRoutes, ...serviceRoutes, ...landingPageRoutes]
    .filter((entry) => {
      const url = entry.url.replace(/\/$/, '')
      if (seen.has(url)) return false
      seen.add(url)
      return true
    })
}