# 🚀 Modern Stack: Next.js 14.2 + Directus CMS

A beautiful, modern web application built with the most stable and production-ready technologies available. This project showcases the perfect combination of cutting-edge frontend frameworks with a powerful headless CMS.

## ✨ Features

### 🎨 **Beautiful UI & UX**
- **Next.js 14.2** - Latest stable version with App Router
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Shadcn/UI** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide React** - Beautiful, customizable icons

### 🏗️ **Production Ready**
- **TypeScript** - Type safety throughout the application
- **ESLint** - Code quality and consistency
- **Responsive Design** - Works perfectly on all devices
- **Dark Mode Support** - Built-in theme switching
- **SEO Optimized** - Proper metadata and OpenGraph tags

### 📊 **Content Management**
- **Directus CMS** - Powerful, flexible headless CMS
- **Type-Safe API** - Fully typed Directus integration
- **Content Caching** - Optimized performance with Next.js caching
- **Real-time Updates** - Dynamic content management

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2 | React framework with App Router |
| **React** | 18 | UI library (stable version) |
| **TypeScript** | Latest | Type safety and developer experience |
| **Tailwind CSS** | Latest | Utility-first CSS framework |
| **Shadcn/UI** | Latest | Component library |
| **Framer Motion** | Latest | Animation library |
| **Directus** | Latest | Headless CMS |
| **Lucide React** | Latest | Icon library |

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or higher
- npm, yarn, or pnpm
- Directus instance (local or hosted)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd modern-stack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit your environment variables
   NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
   DIRECTUS_TOKEN=your-directus-token-here
   ```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   └── navigation.tsx    # Navigation component
└── lib/                  # Utilities and configurations
    ├── directus.ts       # Directus client setup
    └── directus-service.ts # Content fetching services
```

## 🎨 Design System

This project uses a consistent design system built on:

- **Colors**: Tailwind's slate palette with blue accents
- **Typography**: System fonts with Geist Sans & Geist Mono
- **Spacing**: Consistent spacing scale using Tailwind
- **Components**: Shadcn/UI for consistent, accessible components
- **Animations**: Framer Motion for smooth, purposeful animations

## 📊 Directus CMS Setup

### Required Collections

1. **Blog Collection**
   ```json
   {
     "id": "number (primary key)",
     "title": "string",
     "content": "text",
     "slug": "string (unique)",
     "featured_image": "string (URL)",
     "published_date": "datetime",
     "status": "string (published/draft)",
     "excerpt": "text",
     "tags": "array of strings"
   }
   ```

2. **Pages Collection**
   ```json
   {
     "id": "number (primary key)",
     "title": "string",
     "content": "text",
     "slug": "string (unique)",
     "status": "string (published/draft)",
     "meta_description": "string",
     "featured_image": "string (URL)"
   }
   ```

### Content Management

Use the Directus service to fetch content:

```typescript
import { DirectusService } from '@/lib/directus-service';

// Get all blog posts
const posts = await DirectusService.getBlogPosts();

// Get a single post
const post = await DirectusService.getBlogPost('my-post-slug');

// Search posts
const results = await DirectusService.searchBlogPosts('Next.js');
```

## 🔧 Customization

### Adding New Components

```bash
# Add Shadcn/UI components
npx shadcn@latest add [component-name]

# Example: Add a dialog component
npx shadcn@latest add dialog
```

### Styling

This project uses Tailwind CSS for styling. The design system is configured in `tailwind.config.js`:

- Custom colors
- Typography scales
- Component variants
- Dark mode support

### Animations

Framer Motion is used for animations. Common patterns:

```typescript
// Page entrance animation
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {content}
</motion.div>

// Scroll-triggered animation
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  {content}
</motion.div>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

This Next.js application can be deployed on:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform
- Any Node.js hosting provider

## 📈 Performance

This stack is optimized for performance:

- **Next.js 14.2** with App Router for optimal rendering
- **Server Components** for reduced JavaScript bundle
- **Image Optimization** built into Next.js
- **Automatic Code Splitting** for faster page loads
- **Static Generation** where possible
- **Caching Strategies** for Directus content

## 🔒 Security

Security best practices included:

- **Environment Variables** for sensitive data
- **TypeScript** for type safety
- **ESLint** for code quality
- **Content Security Policy** ready
- **HTTPS** enforced in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Shadcn** for the beautiful component library
- **Directus team** for the powerful CMS
- **Tailwind CSS** for the utility-first approach
- **Vercel** for the deployment platform

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](https://nextjs.org/docs)
2. Search existing [issues](https://github.com/your-repo/issues)
3. Create a new issue if needed

---

**Built with ❤️ using the most stable and modern web technologies available.**
