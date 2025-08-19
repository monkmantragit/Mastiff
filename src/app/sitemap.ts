import { MetadataRoute } from 'next'
import { DirectusService } from '@/lib/directus-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://whitemassif.com'
  
  // Static routes
  const staticRoutes = [
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
  }))

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
    serviceRoutes = services.map((service) => ({
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

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes, ...landingPageRoutes]
}