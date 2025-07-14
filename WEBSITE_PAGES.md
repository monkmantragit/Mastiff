# White Massif Website Pages

## Overview
This document provides a comprehensive list of all pages in the White Massif website, including their URLs, page types, and Directus connectivity status.

**Domain:** `https://whitemassif.com` (or localhost:3000 for development)

---

## 🏠 Static Pages

### Main Pages
| Page | URL | Description | Status |
|------|-----|-------------|--------|
| **Homepage** | `/` | Main landing page with hero, services preview, and company overview | ✅ Static |
| **About** | `/about` | Company information, story, and mission | ✅ Static |
| **Contact** | `/contact` | Contact form, office details, and location | ✅ Static |
| **Portfolio** | `/portfolio` | Showcase of past events and projects | ✅ Static |
| **Work** | `/work` | Work showcase and case studies | ✅ Static |
| **Feedback** | `/feedback` | Client feedback and testimonials | ✅ Static |
| **Thank You** | `/thank-you` | Form submission confirmation page | ✅ Static |

### Service Pages
| Page | URL | Description | Status |
|------|-----|-------------|--------|
| **Services Overview** | `/services` | Main services page with all offerings | ✅ Static |
| **Individual Service** | `/services/[slug]` | Dynamic service detail pages | 🔗 **Connected to Directus** |

### Team & Careers
| Page | URL | Description | Status |
|------|-----|-------------|--------|
| **Team** | `/team` | Team members and company culture | 🔗 **Connected to Directus** |
| **Careers** | `/careers` | Job openings and career information | ✅ Static |
| **Clients** | `/clients` | Client showcase and testimonials | ✅ Static |

---

## 🔗 Dynamic Pages (Connected to Directus)

### Blog System
| Page | URL | Description | CMS Collection |
|------|-----|-------------|----------------|
| **Blog Listing** | `/blog` | All blog posts with filtering and pagination | `blog` |
| **Blog Post** | `/blog/[slug]` | Individual blog post detail page | `blog` |

### Services System
| Page | URL | Description | CMS Collection |
|------|-----|-------------|----------------|
| **Service Detail** | `/services/[slug]` | Individual service pages with features, gallery, stats | `services` |

### Team System
| Page | URL | Description | CMS Collection |
|------|-----|-------------|----------------|
| **Team Members** | `/team` | Team member profiles and departments | `team_members` |

### Landing Pages System
| Page | URL | Description | CMS Collection |
|------|-----|-------------|----------------|
| **Dynamic Landing** | `/landing/[slug]` | Custom landing pages for campaigns and ads | `landing_pages` |

---

## 📊 Content Management Status

### ✅ Fully Connected to Directus
- **Blog Posts** (`/blog/*`) - Dynamic content management
- **Individual Services** (`/services/[slug]`) - Service details, features, galleries
- **Team Members** (`/team`) - Team profiles and departments
- **Landing Pages** (`/landing/[slug]`) - Campaign and ad landing pages

### 📝 Static Content (Not in CMS)
- **Homepage** (`/`) - Static React components
- **About** (`/about`) - Static content
- **Contact** (`/contact`) - Static form and info
- **Portfolio** (`/portfolio`) - Static showcase
- **Services Overview** (`/services`) - Static service categories
- **Careers** (`/careers`) - Static job listings
- **Clients** (`/clients`) - Static client showcase
- **Work** (`/work`) - Static work showcase
- **Feedback** (`/feedback`) - Static testimonials

---

## 🎯 URL Structure & Examples

### Main Navigation URLs
```
https://whitemassif.com/
https://whitemassif.com/about
https://whitemassif.com/services
https://whitemassif.com/team
https://whitemassif.com/blog
https://whitemassif.com/portfolio
https://whitemassif.com/contact
https://whitemassif.com/careers
https://whitemassif.com/clients
```

### Dynamic Content URLs
```
https://whitemassif.com/blog/corporate-event-theme-and-ideas
https://whitemassif.com/blog/seasonal-and-festive-content
https://whitemassif.com/services/corporate-events
https://whitemassif.com/services/wedding-planning
https://whitemassif.com/services/hybrid-events
https://whitemassif.com/landing/corporate-event-planning
https://whitemassif.com/landing/wedding-services
```

### Utility URLs
```
https://whitemassif.com/work
https://whitemassif.com/feedback
https://whitemassif.com/thank-you
```

---

## 📱 Mobile & SEO Considerations

### Mobile-Optimized Pages
- All pages are fully responsive
- Mobile-first design approach
- Touch-friendly navigation and forms

### SEO-Friendly URLs
- Clean, descriptive URLs
- Slug-based routing for dynamic content
- Proper meta tags and structured data

---

## 🚀 Future Enhancements

### Potential CMS Migrations
1. **Homepage** - Move hero content and testimonials to CMS
2. **About Page** - Company story and team highlights
3. **Services Overview** - Service categories and descriptions
4. **Portfolio** - Project showcases and case studies
5. **Client Testimonials** - Client feedback and reviews

### Additional Landing Pages
- Service-specific landing pages
- Campaign-specific pages
- Event-specific microsites
- Partner collaboration pages

---

## 🛠️ Technical Details

### Framework
- **Next.js 15.3.3** with App Router
- **React 19** with TypeScript
- **Directus** as headless CMS

### Dynamic Routing
- `[slug]` - Dynamic route parameters
- Server-side rendering for SEO
- Static generation for performance

### Content Management
- **Directus Collections:** `blog`, `services`, `team_members`, `landing_pages`
- **API Endpoints:** REST API with Bearer token authentication
- **Image Management:** Directus file uploads and transformations

---

## 📞 Support & Maintenance

For technical support or content updates:
- **Development:** Contact development team
- **Content Management:** Access Directus admin panel
- **Emergency:** Use static fallbacks for dynamic content

---

**Last Updated:** July 14, 2025  
**Version:** 1.0  
**Status:** Active Production Website