import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/feedback'],
    },
    sitemap: 'https://www.whitemassif.com/sitemap.xml',
    host: 'https://www.whitemassif.com',
  }
}