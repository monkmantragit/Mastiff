# White Massif Scraped Content

This directory contains all the scraped content from the White Massif website (https://whitemassif.com) organized in a structured JSON format for easy integration with your Next.js application.

## Directory Structure

```
data/
├── index.json              # Master index of all content
├── README.md              # This documentation file
├── pages/                 # Static pages content
│   ├── our-team-corporate-events.json
│   ├── clients.json
│   ├── service-test.json
│   ├── event-planners-for-companies.json
│   ├── contact.json
│   └── careers.json
└── posts/                 # Blog posts content
    ├── corporate-event-theme-and-ideas-copy.json
    ├── seasonal-and-festive-content.json
    └── corporate-event-theme-and-ideas.json
```

## Content Overview

### Static Pages (6 pages)
1. **Team Page** - Meet the White Massif team with 26 team members
2. **Clients Page** - Client categories and testimonials
3. **Services Page** - Comprehensive service offerings and end-to-end solutions
4. **Portfolio Page** - Showcase of 11 recent corporate events
5. **Contact Page** - Contact information and inquiry form
6. **Careers Page** - Job opportunities and company culture

### Blog Posts (3 posts)
1. **Corporate Event Themes** - 5 dynamic themes (Retro Rewind, Night of Aces, etc.)
2. **Seasonal Events** - 3 seasonal themes (Summer Soiree, Denim Diwali, Winter Wonderland)
3. **Event Ideas** - Additional corporate event concepts

## JSON Structure

Each content file follows a consistent structure:

```json
{
  "slug": "page-slug",
  "title": "Page Title",
  "meta_title": "SEO Title",
  "meta_description": "SEO Description",
  "meta_keywords": "keyword1, keyword2",
  "url": "original-url",
  "date_created": "ISO-date",
  "status": "published",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "featured_image": null,
  "excerpt": "Brief description",
  "content": {
    // Structured content specific to each page/post
  },
  "navigation": ["SERVICES", "TEAM", "WORK", "CLIENTS", "CAREERS"]
}
```

## Usage in Next.js

### Reading Content
```javascript
// Read all content index
import contentIndex from './data/index.json';

// Read specific page
import teamPage from './data/pages/our-team-corporate-events.json';

// Read specific post
import eventThemes from './data/posts/corporate-event-theme-and-ideas.json';
```

### Dynamic Page Generation
```javascript
// pages/[...slug].js
export async function getStaticPaths() {
  const { pages, posts } = require('../data/index.json');
  
  const paths = [
    ...pages.map(page => ({ params: { slug: [page.slug] } })),
    ...posts.map(post => ({ params: { slug: ['blog', post.slug] } }))
  ];
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug[params.slug.length - 1];
  const isPost = params.slug[0] === 'blog';
  
  const contentPath = isPost 
    ? `./data/posts/${slug}.json`
    : `./data/pages/${slug}.json`;
    
  const content = require(contentPath);
  
  return { props: { content } };
}
```

### CMS Integration
The JSON structure is designed to be easily imported into a CMS like Directus:

```javascript
// lib/importContent.js
import { directus } from './directus';

async function importPages() {
  const { pages } = require('../data/index.json');
  
  for (const pageInfo of pages) {
    const pageContent = require(`../data/pages/${pageInfo.slug}.json`);
    
    await directus.items('pages').createOne({
      slug: pageContent.slug,
      title: pageContent.title,
      content: JSON.stringify(pageContent.content),
      meta_title: pageContent.meta_title,
      meta_description: pageContent.meta_description,
      status: 'published'
    });
  }
}
```

## Key Features

- **SEO Ready**: All content includes meta titles, descriptions, and keywords
- **Structured Data**: Content is organized in logical sections
- **Team Information**: Complete team directory with roles
- **Service Catalog**: Detailed service descriptions and offerings
- **Portfolio Items**: Event showcase with categories
- **Contact Details**: Multiple contact methods and office information
- **Blog Content**: Rich content with themes and highlights

## Content Categories

### Pages
- About (Team)
- Services
- Portfolio (Work)
- Clients
- Contact
- Careers

### Posts
- Event Themes
- Seasonal Events

## Contact Information Extracted
- **Phone**: Prakash (+91-990-0141-155), Vinay (+91-990-0141-177)
- **Email**: info@whitemassif.com, contact@whitemassif.com, work@whitemassif.com
- **Address**: #8, 4th Floor, New Bel Road, Sanjaynagar, Bangalore, Karnataka, India. 560094

## Next Steps

1. **Import to CMS**: Use the structured JSON to populate your Directus CMS
2. **Create Pages**: Generate Next.js pages using the content data
3. **Add Images**: Download and organize images referenced in the content
4. **SEO Setup**: Use the meta information for proper SEO implementation
5. **Styling**: Apply your brand colors and styling to match the content structure

## Notes

- All content maintains the original structure and hierarchy
- Navigation items are consistent across all pages
- Content is ready for immediate use in your Next.js application
- JSON structure supports easy expansion and modification
- All URLs and references are preserved for easy migration 