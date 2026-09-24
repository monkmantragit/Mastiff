import { MetadataRoute } from 'next'

// Everything is crawlable, including by AI search crawlers (GPTBot, OAI-SearchBot,
// ClaudeBot, PerplexityBot, Google-Extended) via the wildcard rule. Pages that must stay
// out of the index (/feedback, /thank-you, /landing/*) use a noindex meta tag instead of
// a robots.txt block: a blocked page can't be crawled, so Google never sees its noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://www.whitemassif.com/sitemap.xml',
  }
}
