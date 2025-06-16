'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

// Mock blog data - In a real app, this would come from Directus
const mockBlogPosts = [
  {
    id: 1,
    title: "Building Modern Web Apps with Next.js 14.2",
    excerpt: "Discover the latest features and best practices for building production-ready applications with Next.js 14.2, including server components, streaming, and more.",
    slug: "building-modern-web-apps-nextjs-14",
    published_date: "2024-01-15",
    featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    tags: ["Next.js", "React", "Web Development"],
    status: "published" as const,
    author: "Modern Stack Team",
    read_time: "8 min read"
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS for Beautiful UIs",
    excerpt: "Learn advanced Tailwind CSS techniques to create stunning, responsive user interfaces that work perfectly across all devices and screen sizes.",
    slug: "mastering-tailwind-css-beautiful-uis",
    published_date: "2024-01-12",
    featured_image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
    tags: ["Tailwind CSS", "CSS", "Design"],
    status: "published" as const,
    author: "Design Team",
    read_time: "6 min read"
  },
  {
    id: 3,
    title: "Directus CMS: The Perfect Headless Solution",
    excerpt: "Explore how Directus CMS provides the perfect balance of flexibility and ease of use for modern content management in headless architectures.",
    slug: "directus-cms-perfect-headless-solution",
    published_date: "2024-01-10",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    tags: ["Directus", "CMS", "Backend"],
    status: "published" as const,
    author: "Backend Team",
    read_time: "10 min read"
  },
  {
    id: 4,
    title: "Shadcn/UI: Building Accessible Components",
    excerpt: "Deep dive into Shadcn/UI component library and learn how to build accessible, customizable UI components that enhance user experience.",
    slug: "shadcn-ui-building-accessible-components",
    published_date: "2024-01-08",
    featured_image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    tags: ["Shadcn/UI", "Accessibility", "Components"],
    status: "published" as const,
    author: "UI/UX Team",
    read_time: "7 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <Badge variant="secondary" className="mb-4">
            <User className="w-4 h-4 mr-2" />
            Content Management with Directus
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Blog & Insights
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover the latest insights, tutorials, and best practices for modern web development.
            All content powered by Directus CMS.
          </p>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {mockBlogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    {post.read_time}
                    <span className="mx-2">•</span>
                    {post.author}
                  </div>
                  
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline">
            Load More Articles
          </Button>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-blue-100 mb-8 text-lg">
                Get started with this powerful tech stack and create amazing web experiences.
              </p>
              <Button size="lg" variant="secondary" className="group">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
} 