# White Massif Next.js 14.2 Implementation Plan

## Overview
Transform the scraped White Massif content into a premium Next.js 14.2 website with App Router, TypeScript, Tailwind CSS, Shadcn/UI, and Directus CMS integration, following the official brand guidelines.

## Brand Guidelines Integration ✅
- **Primary Colors**: Blue (#2A3959), Yellow (#F9A625), White (#FFFFFF), Gray (#333333), Black (#000000)
- **Typography**: Sinkin Sans (titles), Raleway (secondary)
- **Logo**: WM stylized letters with "WHITE MASSIF Event Management Co."
- **Design**: Bold, clean, professional corporate identity

## Current Project Structure ✅ (Complete)
- [x] Next.js 14.2 with App Router
- [x] TypeScript configuration
- [x] Tailwind CSS + Shadcn/UI components
- [x] Framer Motion animations
- [x] Custom cursor and preloader
- [x] Directus CMS integration setup
- [x] Premium fonts and styling

## Phase 1: Brand Color System Update

### Step 1: Update Global Styles with Brand Colors
**Files to modify:** `src/app/globals.css`
**Estimated time:** 1 hour

**Tasks:**
1. Replace current color scheme with official brand colors
2. Update CSS variables for brand consistency
3. Add Sinkin Sans and Raleway fonts
4. Update component color classes

## Phase 2: Data Integration & Page Implementation

### Step 2: Homepage with Real Content
**Files to modify:** `src/app/page.tsx`
**Estimated time:** 3 hours

**Data source:** `data/index.json`
**Tasks:**
1. Replace placeholder content with real White Massif data
2. Add hero section with brand messaging
3. Integrate services preview from `data/pages/service-test.json`
4. Add client logos section
5. Implement contact information from data
6. Add proper brand colors and typography

### Step 3: Services Page
**Files to create:** `src/app/services/page.tsx`
**Estimated time:** 4 hours

**Data source:** `data/pages/service-test.json`
**Tasks:**
1. Create comprehensive services page
2. Implement 6 main service categories:
   - Business Events
   - Celebrations Galore
   - Inaugurations
   - Hybrid Events
   - Industry Convention & Dealer Meets
   - Special Projects
3. Add end-to-end services section (6 services)
4. Implement "Why Trust Us" section (6 points)
5. Add contact integration

### Step 4: Team Page
**Files to create:** `src/app/team/page.tsx`
**Estimated time:** 3 hours

**Data source:** `data/pages/our-team-corporate-events.json`
**Tasks:**
1. Create team showcase page
2. Implement team member profiles
3. Add company culture content
4. Integrate team photos from `public copy/assets/images/team/`
5. Add team statistics and achievements

### Step 5: Work/Portfolio Page
**Files to create:** `src/app/work/page.tsx`
**Estimated time:** 4 hours

**Data source:** `data/pages/event-planners-for-companies.json`
**Tasks:**
1. Create portfolio showcase
2. Implement event categories and filtering
3. Add case studies with images
4. Create interactive portfolio gallery
5. Integrate portfolio images from `public copy/assets/images/portfolio/`

### Step 6: Clients Page
**Files to create:** `src/app/clients/page.tsx`
**Estimated time:** 3 hours

**Data source:** `data/pages/clients.json`
**Tasks:**
1. Create client showcase page
2. Implement client logos grid (160+ clients)
3. Add industry-wise client categorization
4. Integrate client logos from `public copy/assets/images/clients/`
5. Add testimonials and case studies

### Step 7: Contact Page
**Files to create:** `src/app/contact/page.tsx`
**Estimated time:** 2 hours

**Data source:** `data/pages/contact.json`
**Tasks:**
1. Create contact page with brand styling
2. Add contact form with validation
3. Display contact information:
   - Prakash: +91-990-0141-155
   - Vinay: +91-990-0141-177
   - Email: info@whitemassif.com, contact@whitemassif.com
   - Address: #8, 4th Floor, New Bel Road, Sanjaynagar, Bangalore
4. Add location map integration

### Step 8: Careers Page
**Files to create:** `src/app/careers/page.tsx`
**Estimated time:** 2 hours

**Data source:** `data/pages/careers.json`
**Tasks:**
1. Create careers page
2. Add company culture section
3. Implement job application form
4. Add team photos and company values
5. Contact: work@whitemassif.com

## Phase 3: Blog Implementation

### Step 9: Blog Index Page
**Files to create:** `src/app/blog/page.tsx`
**Estimated time:** 2 hours

**Data sources:** 
- `data/posts/corporate-event-theme-and-ideas.json`
- `data/posts/corporate-event-theme-and-ideas-copy.json`
- `data/posts/seasonal-and-festive-content.json`

**Tasks:**
1. Create blog listing with 3 posts
2. Implement category filtering (Event Themes, Seasonal Events)
3. Add search functionality
4. Integrate blog images

### Step 10: Dynamic Blog Posts
**Files to create:** `src/app/blog/[slug]/page.tsx`
**Estimated time:** 3 hours

**Tasks:**
1. Create dynamic blog post pages
2. Implement rich content display
3. Add related posts section
4. Integrate blog post images
5. Add social sharing

## Phase 4: Asset Integration

### Step 11: Move and Optimize Assets
**Files to modify:** Asset structure
**Estimated time:** 2 hours

**Tasks:**
1. Move assets from `public copy/assets/` to `public/assets/`
2. Organize images by category:
   - `/public/assets/images/home/` (home page images)
   - `/public/assets/images/team/` (team photos)
   - `/public/assets/images/clients/` (client logos - 160+)
   - `/public/assets/images/portfolio/` (portfolio images)
   - `/public/assets/images/blog/` (blog images)
3. Optimize images for Next.js Image component
4. Add proper alt texts

### Step 12: Component Library Enhancement
**Files to create:** Multiple component files
**Estimated time:** 4 hours

**Components to create:**
1. `src/components/service-card.tsx` - Service display cards
2. `src/components/team-member.tsx` - Team member profiles
3. `src/components/client-logo.tsx` - Client logo display
4. `src/components/portfolio-item.tsx` - Portfolio showcase
5. `src/components/blog-card.tsx` - Blog post cards
6. `src/components/contact-form.tsx` - Contact form
7. `src/components/hero-section.tsx` - Reusable hero sections
8. `src/components/stats-section.tsx` - Statistics display

## Phase 5: Navigation & Layout Updates

### Step 13: Update Navigation
**Files to modify:** `src/components/navigation.tsx`
**Estimated time:** 1 hour

**Tasks:**
1. Update navigation items: SERVICES, TEAM, WORK, CLIENTS, CAREERS
2. Add White Massif logo
3. Apply brand colors
4. Add contact CTA button

### Step 14: Footer Implementation
**Files to create:** `src/components/footer.tsx`
**Estimated time:** 1 hour

**Tasks:**
1. Add company information
2. Include contact details
3. Add social media links
4. Apply brand styling

## Phase 6: Performance & SEO

### Step 15: SEO Optimization
**Files to modify:** All page files
**Estimated time:** 2 hours

**Tasks:**
1. Add proper meta tags from JSON data
2. Implement structured data
3. Add Open Graph tags
4. Create XML sitemap
5. Optimize for local SEO (Bangalore)

### Step 16: Image Optimization
**Files to modify:** All components
**Estimated time:** 2 hours

**Tasks:**
1. Replace all img tags with Next.js Image component
2. Add proper alt texts from data
3. Implement lazy loading
4. Add image placeholders

## Phase 7: Advanced Features

### Step 17: Contact Form Backend
**Files to create:** `src/app/api/contact/route.ts`
**Estimated time:** 1 hour

**Tasks:**
1. Create contact form API endpoint
2. Add email validation
3. Implement email sending
4. Add spam protection

### Step 18: Search Functionality
**Files to create:** Search components
**Estimated time:** 2 hours

**Tasks:**
1. Implement site-wide search
2. Add search filters
3. Create search results page

## Implementation Priority

### Phase 1 (Immediate - 8 hours)
1. **Brand colors update** (1 hour)
2. **Homepage with real data** (3 hours)
3. **Services page** (4 hours)

### Phase 2 (Core Pages - 12 hours)
4. **Team page** (3 hours)
5. **Work/Portfolio page** (4 hours)
6. **Clients page** (3 hours)
7. **Contact page** (2 hours)

### Phase 3 (Content & Assets - 8 hours)
8. **Careers page** (2 hours)
9. **Blog implementation** (5 hours)
10. **Asset integration** (2 hours)

### Phase 4 (Polish & Performance - 6 hours)
11. **Component library** (4 hours)
12. **Navigation & Footer** (2 hours)
13. **SEO & Performance** (4 hours)

## Data Structure Summary

### Available Pages (6):
- **Homepage**: Main landing page
- **Services**: 6 main services + 5 end-to-end services
- **Team**: Team profiles and company culture
- **Work**: Portfolio of events and case studies
- **Clients**: 160+ client logos and testimonials
- **Contact**: Contact information and inquiry form
- **Careers**: Job opportunities and company culture

### Available Posts (3):
- **Corporate Event Themes**: Event theme ideas
- **Seasonal Content**: Seasonal event planning
- **Event Ideas Copy**: Additional theme concepts

### Media Assets:
- **291 images** across categories
- **4 videos** for hero sections
- **Client logos**: 160+ company logos
- **Team photos**: Professional headshots
- **Portfolio images**: Event photography

## Success Metrics

### Brand Compliance
- Official White Massif colors implemented
- Sinkin Sans and Raleway fonts integrated
- Logo usage following brand guidelines
- Professional corporate design aesthetic

### Performance Targets
- Lighthouse score: 90+ (all categories)
- First Contentful Paint: < 2s
- All images optimized with Next.js Image
- Mobile-first responsive design

### Content Integration
- All 6 pages implemented with real data
- 3 blog posts with rich content
- 160+ client logos displayed
- Complete contact information integrated

## Next Steps

1. **Start with brand colors** - Update global CSS with official colors
2. **Implement homepage** - Use real White Massif data
3. **Build services page** - Comprehensive service showcase
4. **Create remaining pages** - Team, Work, Clients, Contact, Careers
5. **Add blog functionality** - 3 posts with categories
6. **Optimize performance** - Images, SEO, mobile responsiveness
7. **Test thoroughly** - All pages and functionality

This updated plan reflects our current Next.js 14.2 project structure and the actual White Massif data available, ensuring we build a premium corporate website that matches the brand guidelines and showcases their decade of experience in Bangalore's corporate event space. 