import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/feedback'],
    },
    sitemap: 'https://whitemassif.com/sitemap.xml',
  }
}